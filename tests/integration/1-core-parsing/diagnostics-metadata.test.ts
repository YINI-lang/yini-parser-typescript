/*
    This file focues on:
      * When includeMetadata: true and includeDiagnostics: true are enabled,
      * Parser returns meta.diagnostics,
      * Diagnostics contain sensible structure,
      * Errors include line/column,
      * Recovery still returns useful partial data when using failLevel: 'ignore-errors'.    
 */
// tests/integration/1-core-parsing/diagnostics-metadata.test.ts
import path from 'path'
import YINI from '../../../src'

const FIXTURE_DIR = path.join(__dirname, '../../fixtures/invalid')

const FILE_DEFECT_COMBO_2 = path.join(FIXTURE_DIR, 'defectConfig2Combo3.yini')
const FILE_DEFECT_COMBO_3 = path.join(FIXTURE_DIR, 'defectConfigCombo3.yini')
const FILE_BAD_ESCAPING = path.join(FIXTURE_DIR, 'bad-escaping-1.yini')

const invalidInlineYini = `^ App
name = "Demo"
path = c"F:\\logs\\nebula\\app.log"
value = 123
`

function parseInlineWithDiagnostics(yini: string): any {
    return YINI.parse(yini, {
        strictMode: false,
        failLevel: 'ignore-errors',
        includeMetadata: true,
        includeDiagnostics: true,
    }) as any
}

function parseFileWithDiagnostics(filePath: string, strictMode = false): any {
    return YINI.parseFile(filePath, {
        strictMode,
        failLevel: 'ignore-errors',
        includeMetadata: true,
        includeDiagnostics: true,
    }) as any
}

function expectHasDiagnostics(parsed: any) {
    expect(parsed).toBeDefined()
    expect(parsed.result).toBeDefined()
    expect(parsed.meta).toBeDefined()
    expect(parsed.meta.diagnostics).toBeDefined()
    expect(parsed.meta.diagnostics.errors).toBeDefined()
}

function getErrors(parsed: any): any {
    return parsed.meta?.diagnostics?.errors
}

function expectHasAtLeastOneError(parsed: any) {
    const errors = getErrors(parsed)

    expect(errors).toBeDefined()
    expect(typeof errors.errorCount).toBe('number')
    expect(errors.errorCount).toBeGreaterThan(0)
    expect(Array.isArray(errors.payload)).toBe(true)
    expect(errors.payload.length).toBeGreaterThan(0)
}

function expectFirstErrorHasLineAndColumn(parsed: any) {
    expectHasAtLeastOneError(parsed)

    const firstErr = getErrors(parsed).payload[0]

    expect(firstErr).toBeDefined()
    expect(firstErr.line).toBeDefined()
    expect(firstErr.column).toBeDefined()
    expect(typeof firstErr.line).toBe('number')
    expect(typeof firstErr.column).toBe('number')
}

function expectEachErrorHasCoreFields(parsed: any) {
    expectHasAtLeastOneError(parsed)

    const issues = getErrors(parsed).payload

    for (const issue of issues) {
        expect(issue).toHaveProperty('line')
        expect(issue).toHaveProperty('column')
        expect(issue).toHaveProperty('typeKey')
        expect(issue).toHaveProperty('message')
    }
}

describe('Diagnostics metadata tests:', () => {
    describe('Inline parsing:', () => {
        test('1. Should include metadata and diagnostics for invalid inline YINI.', () => {
            const parsed = parseInlineWithDiagnostics(invalidInlineYini)

            expectHasDiagnostics(parsed)
        })

        test('2. Should include errors payload with line and column for invalid inline YINI.', () => {
            const parsed = parseInlineWithDiagnostics(invalidInlineYini)

            expectFirstErrorHasLineAndColumn(parsed)
        })

        test('3. Should include user-facing error content for invalid inline YINI.', () => {
            const parsed = parseInlineWithDiagnostics(invalidInlineYini)
            const firstErr = getErrors(parsed).payload[0]

            expect(String(firstErr.message)).toMatch(
                /syntax error|escape|string/i,
            )
        })

        test('4. Should still return partial parsed result when ignore-errors is enabled.', () => {
            const parsed = parseInlineWithDiagnostics(invalidInlineYini)

            expect(parsed.result).toBeDefined()
            expect(parsed.result.App).toBeDefined()
            expect(parsed.result.App.name).toEqual('Demo')
            expect(parsed.result.App.value).toEqual(123)
            expect(parsed.result.App.path).toBeUndefined()
        })
    })

    describe('File parsing:', () => {
        test('5. Should include metadata and diagnostics for invalid file input.', () => {
            const parsed = parseFileWithDiagnostics(FILE_DEFECT_COMBO_2)

            expectHasDiagnostics(parsed)
        })

        test('6. Should include one or more errors with line and column for invalid file input.', () => {
            const parsed = parseFileWithDiagnostics(FILE_DEFECT_COMBO_2)

            expectFirstErrorHasLineAndColumn(parsed)
        })

        test('7. Should return partial result together with diagnostics for invalid file input.', () => {
            const parsed = parseFileWithDiagnostics(FILE_DEFECT_COMBO_2)

            expect(parsed.result).toBeDefined()
            expect(Object.keys(parsed.result).length).toBeGreaterThan(0)
        })

        test('8. Strict + ignore-errors should still include diagnostics metadata.', () => {
            const parsed = parseFileWithDiagnostics(FILE_DEFECT_COMBO_3, true)

            expectHasDiagnostics(parsed)
            expectHasAtLeastOneError(parsed)
        })

        test('9. Invalid escaping file should report diagnostics with line and column.', () => {
            const parsed = parseFileWithDiagnostics(FILE_BAD_ESCAPING)

            expectFirstErrorHasLineAndColumn(parsed)
        })

        test('10. Invalid escaping file should include string or escape related error text.', () => {
            const parsed = parseFileWithDiagnostics(FILE_BAD_ESCAPING)
            const firstErr = getErrors(parsed).payload[0]

            expect(String(firstErr.message)).toMatch(
                /syntax error|escape|string/i,
            )
        })
    })

    describe('Diagnostics structure:', () => {
        test('11. Diagnostics should expose errors container with count and payload.', () => {
            const parsed = parseFileWithDiagnostics(FILE_DEFECT_COMBO_2)
            const diagnostics = parsed.meta?.diagnostics

            expect(diagnostics).toBeDefined()
            expect(diagnostics.errors).toBeDefined()
            expect(typeof diagnostics.errors.errorCount).toBe('number')
            expect(Array.isArray(diagnostics.errors.payload)).toBe(true)
        })

        test('12. Each diagnostic error should have the expected core fields.', () => {
            const parsed = parseFileWithDiagnostics(FILE_DEFECT_COMBO_2)

            expectEachErrorHasCoreFields(parsed)
        })

        test('13. Diagnostics should be present together with a parsed result object.', () => {
            const parsed = parseFileWithDiagnostics(FILE_DEFECT_COMBO_2)

            expect(parsed.result).toBeDefined()
            expect(parsed.meta).toBeDefined()
            expect(parsed.meta.diagnostics).toBeDefined()
        })
    })
})
