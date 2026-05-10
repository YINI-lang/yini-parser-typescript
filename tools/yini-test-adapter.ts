#!/usr/bin/env tsx

// tools/yini-test-adapter.ts
import fs from 'node:fs'
import path from 'node:path'
import YINI from '../src'

type TMode = 'lenient' | 'strict'

/**
 * According to yini-test adapter-contact.
 */
interface IAdapterResult {
    // ok: boolean
    result: unknown | null
    // diagnostics: IAdapterDiagnostic[]
}

interface IAdapterDiagnostic {
    severity: 'error' | 'warning' | 'notice'
    message: string
    details?: string
}

interface IParsedArgs {
    input: string
    mode: TMode
}

function printUsage(): void {
    console.error(
        `
Usage:
  tsx tools/yini-test-adapter.ts --input <file> --mode <lenient|strict>

Example:
  tsx tools/yini-test-adapter.ts --input cases/example.yini --mode strict
`.trim(),
    )
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

            if (value !== 'lenient' && value !== 'strict') {
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
        throw new Error(`Missing required argument: --input <file>`)
    }

    return { input, mode }
}

function toDiagnostic(error: unknown): IAdapterDiagnostic {
    if (error instanceof Error) {
        return {
            severity: 'error',
            message: error.message,
            details: error.stack,
        }
    }

    return {
        severity: 'error',
        message: String(error),
    }
}

function makeYINIParseOptions(mode: TMode): any {
    const ret = {
        strictMode: mode === 'strict',
    }
    return ret
}

function main(): void {
    try {
        const args = parseArgs(process.argv.slice(2))
        const inputPath = path.resolve(args.input)

        const source = fs.readFileSync(inputPath, 'utf8')

        const parseOptions: any = makeYINIParseOptions(args.mode)
        // console.debug('YINI parse options:')
        // console.debug(parseOptions)

        const result = YINI.parse(source, parseOptions)

        const output: IAdapterResult = {
            // ok: true,
            result: result,
            // diagnostics: [],
        }

        process.stdout.write(`${JSON.stringify(result, null, 2)}\n`)
        process.exit(0) // NOTE: exit with zero on success, according to yini-test adapter-contact.
    } catch (error: unknown) {
        const output: IAdapterResult = {
            // ok: false,
            result: null,
            // diagnostics: [toDiagnostic(error)],
        }

        process.stdout.write(`${JSON.stringify(output, null, 2)}\n`)
        process.exit(2) // NOTE: exit with non-zero on error, according to yini-test adapter-contact.
    }
}

main()
