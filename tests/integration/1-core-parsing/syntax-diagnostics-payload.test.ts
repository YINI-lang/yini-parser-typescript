import YINI from '../../../src'
import { ParseOptions, YiniParseResult } from '../../../src/types'

/**
 * Protect the structured error and warning data used by tools that consume
 * parser results, including the issue text, locations, payloads, and counts.
 */
const parseWithDiagnostics = (
    input: string,
    options: ParseOptions = {},
): YiniParseResult =>
    YINI.parse(input, {
        strictMode: false,
        ...options,
        includeMetadata: true,
        includeDiagnostics: true,
        failLevel: 'ignore-errors',
    }) as YiniParseResult

describe('Syntax diagnostics payload', () => {
    test('Returns a missing-value error with its explanation and hint', () => {
        const parsed = parseWithDiagnostics('^ App\nnum6 =\nvalid = 42\n', {
            treatEmptyValueAsNull: 'disallow',
        })
        const diagnostics = parsed.meta.diagnostics!

        expect(diagnostics.errors).toEqual({
            errorCount: 1,
            payload: [
                expect.objectContaining({
                    line: 2,
                    column: expect.any(Number),
                    typeKey: 'syntax_error',
                    message: "Missing value for key 'num6'.",
                    advice: expect.stringContaining("Expected a value after '='"),
                    hint: expect.stringContaining("Write 'null' explicitly"),
                }),
            ],
        })
        expect(diagnostics.warnings).toEqual({ warningCount: 0, payload: [] })
        expect(parsed.result.App.valid).toBe(42)
    })

    test('Returns a duplicate-key warning while retaining the first value', () => {
        const parsed = parseWithDiagnostics('^ App\nvalue = 1\nvalue = 2\n', {
            onDuplicateKey: 'warn-and-keep-first',
        })
        const diagnostics = parsed.meta.diagnostics!

        expect(diagnostics.errors).toEqual({ errorCount: 0, payload: [] })
        expect(diagnostics.warnings).toEqual({
            warningCount: 1,
            payload: [
                expect.objectContaining({
                    line: 3,
                    column: expect.any(Number),
                    typeKey: 'syntax_warning',
                    message:
                        'Hit a duplicate key (will keep first value) in this section and scope.',
                    advice: "Key 'value' already exists in section 'App' on level 1.",
                }),
            ],
        })
        expect(parsed.result.App.value).toBe(1)
    })

    test('Keeps error and warning payloads separate when both occur', () => {
        const parsed = parseWithDiagnostics('^ App\nnum6 =\nvalid = 42\n', {
            treatEmptyValueAsNull: 'disallow',
            requireDocTerminator: 'warn-if-missing',
        })
        const diagnostics = parsed.meta.diagnostics!

        expect(diagnostics.errors.errorCount).toBe(1)
        expect(diagnostics.errors.payload).toHaveLength(1)
        expect(diagnostics.errors.payload[0].typeKey).toBe('syntax_error')
        expect(diagnostics.warnings).toEqual({
            warningCount: 1,
            payload: [
                expect.objectContaining({
                    typeKey: 'syntax_warning',
                    message: "Missing '/END' at end of document.",
                    advice: expect.stringContaining('appears to be missing'),
                    hint: expect.stringContaining("Add '/END'"),
                }),
            ],
        })
        expect(diagnostics.warnings.payload[0]).not.toHaveProperty('line')
        expect(diagnostics.warnings.payload[0]).not.toHaveProperty('column')
        expect(parsed.meta.totalErrors).toBe(1)
        expect(parsed.meta.totalWarnings).toBe(1)
    })

    test('Returns a separate error payload entry for each missing value', () => {
        const parsed = parseWithDiagnostics(
            '^ App\nfirst =\nvalid = 42\nsecond =\nthird =\n',
            { treatEmptyValueAsNull: 'disallow' },
        )
        const diagnostics = parsed.meta.diagnostics!

        expect(diagnostics.errors.errorCount).toBe(3)
        expect(diagnostics.errors.payload).toEqual([
            expect.objectContaining({
                line: 2,
                typeKey: 'syntax_error',
                message: "Missing value for key 'first'.",
            }),
            expect.objectContaining({
                line: 4,
                typeKey: 'syntax_error',
                message: "Missing value for key 'second'.",
            }),
            expect.objectContaining({
                line: 5,
                typeKey: 'syntax_error',
                message: "Missing value for key 'third'.",
            }),
        ])
        expect(diagnostics.warnings).toEqual({ warningCount: 0, payload: [] })
        expect(parsed.meta.totalErrors).toBe(3)
        expect(parsed.result.App.valid).toBe(42)
    })
})
