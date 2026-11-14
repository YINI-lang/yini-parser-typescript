// tools/yini-test-adapter.ts
import { isUtf8 } from 'node:buffer'
import fs from 'node:fs'
import path from 'node:path'
import YINI, { ToolingDiagnostic, YiniToolingParseResult } from '../src'

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

function isMode(value: string): value is TMode {
    return value === 'lenient' || value === 'strict'
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

function parseForYiniTest(source: string, mode: TMode): YiniToolingParseResult {
    return YINI.parseForTooling(source, {
        strictMode: mode === 'strict',
    })
}

function formatDiagnostic(diagnostic: ToolingDiagnostic): string {
    const location =
        diagnostic.line === undefined
            ? ''
            : ` at line ${diagnostic.line}${
                  diagnostic.column === undefined
                      ? ''
                      : `, column ${diagnostic.column}`
              }`

    return `${diagnostic.severity} ${diagnostic.code}${location}: ${diagnostic.message}`
}

function getDiagnosticsBySeverity(
    result: YiniToolingParseResult,
    severity: ToolingDiagnostic['severity'],
): ToolingDiagnostic[] {
    return result.diagnostics.filter(
        (diagnostic) => diagnostic.severity === severity,
    )
}

function formatParseFailure(result: YiniToolingParseResult): string {
    const errors = getDiagnosticsBySeverity(result, 'error')
    const warnings = getDiagnosticsBySeverity(result, 'warning')

    const header = `Parse failed with ${errors.length} error(s), ${warnings.length} warning(s).`
    const diagnosticsToPrint = errors.length > 0 ? errors : warnings

    return [header, ...diagnosticsToPrint.map(formatDiagnostic)].join('\n')
}

function writeWarnings(result: YiniToolingParseResult): void {
    const warnings = getDiagnosticsBySeverity(result, 'warning')

    for (const warning of warnings) {
        process.stderr.write(`${formatDiagnostic(warning)}\n`)
    }
}

function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error)
}

function stringifyResult(value: unknown, depth = 0): string {
    if (typeof value === 'bigint') return value.toString()
    if (value === null || typeof value !== 'object') {
        return JSON.stringify(value)
    }

    const indent = '  '.repeat(depth + 1)
    const closingIndent = '  '.repeat(depth)
    if (Array.isArray(value)) {
        if (value.length === 0) return '[]'
        const items = value.map((item) =>
            `${indent}${stringifyResult(item, depth + 1)}`,
        )
        return `[\n${items.join(',\n')}\n${closingIndent}]`
    }

    const entries = Object.entries(value).filter(([, item]) => item !== undefined)
    if (entries.length === 0) return '{}'
    const members = entries.map(
        ([key, item]) =>
            `${indent}${JSON.stringify(key)}: ${stringifyResult(item, depth + 1)}`,
    )
    return `{\n${members.join(',\n')}\n${closingIndent}}`
}

function main(): void {
    try {
        const args = parseArgs(process.argv.slice(2))
        const inputPath = path.resolve(args.input)
        const bytes = fs.readFileSync(inputPath)
        if (!isUtf8(bytes)) {
            throw new Error(
                'Invalid UTF-8 encoding. YINI files must contain valid UTF-8 bytes.',
            )
        }
        const source = bytes.toString('utf8')
        const result = parseForYiniTest(source, args.mode)

        if (!result.ok) {
            process.stderr.write(`${formatParseFailure(result)}\n`)
            process.exit(1)
        }

        writeWarnings(result)

        process.stdout.write(`${stringifyResult(result.result)}\n`)
        process.exit(0)
    } catch (error: unknown) {
        process.stderr.write(`${getErrorMessage(error)}\n`)
        process.exit(1)
    }
}

main()
