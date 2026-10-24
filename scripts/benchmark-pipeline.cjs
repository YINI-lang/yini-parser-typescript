const { spawnSync } = require('node:child_process')
const { performance } = require('node:perf_hooks')
const { Worker, isMainThread, parentPort } = require('node:worker_threads')

const workloadNames = ['scalars', 'composites', 'nested-sections']

const makeDocument = (name) => {
    if (name === 'scalars') {
        return (
            '^ Root\n' +
            Array.from({ length: 10000 }, (_, i) => `key${i} = ${i}`).join(
                '\n',
            ) +
            '\n'
        )
    }

    if (name === 'composites') {
        return (
            '^ Root\n' +
            Array.from(
                { length: 3000 },
                (_, i) =>
                    `key${i} = { number: ${i}, items: [1, 2, 3, 4], label: "value" }`,
            ).join('\n') +
            '\n'
        )
    }

    if (name === 'nested-sections') {
        return (
            Array.from(
                { length: 1000 },
                (_, i) =>
                    `^ Parent${i}\nvalue = ${i}\n^^ Child${i}\nitems = [1, 2, 3]`,
            ).join('\n') + '\n'
        )
    }

    throw new Error(`Unknown workload: ${name}`)
}

const median = (values) => {
    const sorted = [...values].sort((a, b) => a - b)
    return sorted[Math.floor(sorted.length / 2)]
}

if (!isMainThread) {
    let interval
    let peakRss = 0

    parentPort.on('message', (message) => {
        if (message === 'start') {
            peakRss = process.memoryUsage().rss
            interval = setInterval(() => {
                peakRss = Math.max(peakRss, process.memoryUsage().rss)
            }, 1)
            parentPort.postMessage('ready')
        } else if (message === 'stop') {
            clearInterval(interval)
            peakRss = Math.max(peakRss, process.memoryUsage().rss)
            parentPort.postMessage(peakRss)
        }
    })
} else if (process.argv[2] === '--child') {
    const run = async () => {
        const YINI = require('../dist').default
        const document = makeDocument(process.argv[3])

        for (let i = 0; i < 3; i++) {
            YINI.parse(document)
        }
        global.gc()

        const worker = new Worker(__filename)
        const ready = new Promise((resolve) => worker.once('message', resolve))
        worker.postMessage('start')
        await ready

        const idleRss = process.memoryUsage().rss
        const startedAt = performance.now()
        const result = YINI.parse(document)
        const durationMs = performance.now() - startedAt

        const peak = new Promise((resolve) => worker.once('message', resolve))
        worker.postMessage('stop')
        const peakRss = await peak
        await worker.terminate()

        if (!result || Object.keys(result).length === 0) {
            throw new Error('The benchmark document did not parse into a result')
        }

        process.stdout.write(
            JSON.stringify({
                durationMs,
                incrementalPeakRssBytes: Math.max(0, peakRss - idleRss),
            }),
        )
    }

    run().catch((error) => {
        process.stderr.write(`${error.stack || error}\n`)
        process.exitCode = 1
    })
} else {
    const runs = Number(process.argv[2] || 7)
    if (!Number.isInteger(runs) || runs < 1) {
        throw new Error('Run count must be a positive integer')
    }

    const results = {}
    for (const name of workloadNames) {
        const samples = []
        for (let i = 0; i < runs; i++) {
            const child = spawnSync(
                process.execPath,
                ['--expose-gc', __filename, '--child', name],
                { encoding: 'utf8' },
            )
            if (child.status !== 0) {
                throw new Error(child.stderr || `Benchmark failed for ${name}`)
            }
            samples.push(JSON.parse(child.stdout))
        }

        results[name] = {
            samples,
            medianDurationMs: median(samples.map((sample) => sample.durationMs)),
            medianIncrementalPeakRssBytes: median(
                samples.map((sample) => sample.incrementalPeakRssBytes),
            ),
        }
    }

    process.stdout.write(
        `${JSON.stringify({ node: process.version, runs, results }, null, 2)}\n`,
    )
}
