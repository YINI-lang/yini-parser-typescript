// tools/yini-test-adapter.ts
import fs from 'node:fs'
import path from 'node:path'
import YINI, { IssuePayload, ParseOptions, YiniParseResult } from '../src'

type TMode = 'lenient' | 'strict'

interface IParsedArgs {
    input: string
    mode: TMode
}

const USAGE = `
Usage:
  tsx tools/yini-test-adapter.ts --input <file> [--mode <lenient|strict>]

Example:
  tsx tools/yini-test-adapter.ts --input cases/example.yini --mode strict
`.trim()

function printUsage(): void {
    process.stderr.write(`${USAGE}\n`)
}

function parseArgs(argv: string[]): IParsedArgs {
    let input = ''
    let mode: TMode = 'lenient'

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i]

        if (arg === '--input') {
            input = argv[++i] ?? ''
            continue
        }

        if (arg === '--mode') {
            const value = argv[++i] ?? ''

            if (!isMode(value)) {
                throw new Error(
                    `Invalid --mode value: '${value}'. Expected 'lenient' or 'strict'.`,
                )
            }

            mode = value
            continue
        }

        if (arg === '--help' || arg === '-h') {
            printUsage()
            process.exit(0)
        }

        throw new Error(`Unknown argument: ${arg}`)
    }

    if (!input) {
        throw new Error('Missing required argument: --input <file>')
    }

    return { input, mode }
}

function isMode(value: string): value is TMode {
    return value === 'lenient' || value === 'strict'
}

function makeYINIParseOptions(mode: TMode): ParseOptions {
    return {
        strictMode: mode === 'strict',
        failLevel: 'ignore-errors',
        includeDiagnostics: true,
        logDiagnostics: false,
        silent: true,
        throwOnError: false,
    }
}

function parseYini(source: string, mode: TMode): YiniParseResult {
    return YINI.parse(source, makeYINIParseOptions(mode)) as YiniParseResult
}

function hasParseErrors(result: YiniParseResult): boolean {
    return result.meta.totalErrors > 0
}

function formatIssue(issue: IssuePayload): string {
    const location =
        issue.line === undefined
            ? ''
            : ` at line ${issue.line}${
                  issue.column === undefined ? '' : `, column ${issue.column}`
              }`

    const details = [issue.advice, issue.hint]
        .filter((part): part is string => Boolean(part))
        .join(' ')

    return `${issue.typeKey}${location}: ${issue.message}${
        details ? ` ${details}` : ''
    }`
}

function formatParseFailure(result: YiniParseResult): string {
    const errors = result.meta.diagnostics?.errors.payload ?? []
    const warnings = result.meta.diagnostics?.warnings.payload ?? []

    const header = `Parse failed with ${result.meta.totalErrors} error(s), ${result.meta.totalWarnings} warning(s).`
    const issueLines = errors.length
        ? errors.map(formatIssue)
        : warnings.map(formatIssue)

    return [header, ...issueLines].join('\n')
}

function writeWarnings(result: YiniParseResult): void {
    const warnings = result.meta.diagnostics?.warnings.payload ?? []

    for (const warning of warnings) {
        process.stderr.write(`${formatIssue(warning)}\n`)
    }
}

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error)
}

function main(): void {
    try {
        const args = parseArgs(process.argv.slice(2))
        const inputPath = path.resolve(args.input)
        const source = fs.readFileSync(inputPath, 'utf8')
        const result = parseYini(source, args.mode)

        if (hasParseErrors(result)) {
            process.stderr.write(`${formatParseFailure(result)}\n`)
            process.exit(1)
        }

        writeWarnings(result)

        process.stdout.write(`${JSON.stringify(result.result, null, 2)}\n`)
        process.exit(0)
    } catch (error: unknown) {
        process.stderr.write(`${getErrorMessage(error)}\n`)
        process.exit(1)
    }
}

main()
