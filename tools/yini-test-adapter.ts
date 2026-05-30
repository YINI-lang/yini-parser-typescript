// tools/yini-test-adapter.ts
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

function main(): void {
    try {
        const args = parseArgs(process.argv.slice(2))
        const inputPath = path.resolve(args.input)
        const source = fs.readFileSync(inputPath, 'utf8')
        const result = parseForYiniTest(source, args.mode)

        if (!result.ok) {
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
