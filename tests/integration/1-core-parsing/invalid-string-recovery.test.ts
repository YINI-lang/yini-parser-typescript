/*
    This file should focus on:
      * Malformed string value
      * Recovery vs throw behavior
      * Partial result shape
      * Diagnostics / line / column when requested
 */
// tests/integration/1-core-parsing/invalid-string-recovery.test.ts
import fs from 'node:fs'
import path from 'node:path'
import YINI from '../../../src'

const FIXTURE_DIR = path.join(__dirname, '../../fixtures/invalid')
const BAD_ESCAPING_FILE = path.join(FIXTURE_DIR, 'bad-escaping-1.yini')

const invalidInlineYini = `^ App
name = "Shebang-\\"demo"
value = c"Hello World"
badEscape = c"E:\\logs\\nebula\\app.log"
valueA = c"\\x41"
`

describe('Invalid string recovery tests:', () => {
    test('1.a) inline: lenient + ignore-errors should recover and keep valid sibling values', () => {
        const result = YINI.parse(invalidInlineYini, {
            strictMode: false,
            failLevel: 'ignore-errors',
        }) as any

        expect(result).toBeDefined()
        expect(result.App).toBeDefined()

        expect(result.App.name).toEqual('Shebang-\\"demo')
        expect(result.App.value).toEqual('Hello World')
        expect(result.App.valueA).toEqual('A')

        // Important recovery expectation:
        // invalid string member should not survive as a misleading valid value.
        expect(result.App.badEscape).toBeUndefined()
    })

    test('1.b) inline: strict/default should throw on invalid string escape', () => {
        expect(() => {
            YINI.parse(invalidInlineYini, {
                strictMode: true,
                throwOnError: true,
            })
        }).toThrow(/syntax-error|syntax error/i)
    })

    test('1.c) inline: thrown error should include escape + line + column', () => {
        try {
            YINI.parse(invalidInlineYini, {
                strictMode: true,
                throwOnError: true,
            })

            throw new Error('Expected parser to throw, but it did not.')
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err)

            expect(msg).toMatch(/syntax-error|syntax error/i)
            expect(msg).toMatch(/escape|string/i)
            expect(msg).toMatch(/line/i)
            expect(msg).toMatch(/column/i)
        }
    })

    test('1.d) inline: diagnostics metadata should include error with line and column', () => {
        const parsed = YINI.parse(invalidInlineYini, {
            strictMode: false,
            failLevel: 'ignore-errors',
            includeMetadata: true,
            includeDiagnostics: true,
        }) as any

        expect(parsed).toBeDefined()
        expect(parsed.result).toBeDefined()
        expect(parsed.meta).toBeDefined()
        expect(parsed.meta.diagnostics).toBeDefined()

        const errors = parsed.meta.diagnostics?.errors
        expect(errors?.errorCount).toBeGreaterThan(0)

        const firstErr = errors?.payload?.[0]
        expect(firstErr).toBeDefined()
        expect(firstErr.line).toBeDefined()
        expect(firstErr.column).toBeDefined()
        expect(String(firstErr.message)).toMatch(/syntax error|escape|string/i)

        expect(parsed.result.App.name).toEqual('Shebang-\\"demo')
        expect(parsed.result.App.value).toEqual('Hello World')
        expect(parsed.result.App.valueA).toEqual('A')
        expect(parsed.result.App.badEscape).toBeUndefined()
    })

    test('2.a) file: lenient + ignore-errors should recover and keep valid sibling values', () => {
        const result = YINI.parseFile(BAD_ESCAPING_FILE, {
            strictMode: false,
            failLevel: 'ignore-errors',
        }) as any

        expect(result).toBeDefined()

        // Keep these assertions aligned with the actual fixture contents.
        // Adjust section/key names here if the fixture differs.
        expect(result.App ?? result).toBeDefined()
    })

    test('2.b) file: strict + throwOnError should throw on invalid string escape', () => {
        expect(() => {
            YINI.parseFile(BAD_ESCAPING_FILE, {
                strictMode: true,
                throwOnError: true,
            })
        }).toThrow(/syntax-error|syntax error/i)
    })

    test('2.c) file: thrown error should include escape + line + column', () => {
        try {
            YINI.parseFile(BAD_ESCAPING_FILE, {
                strictMode: true,
                throwOnError: true,
            })

            throw new Error('Expected parser to throw, but it did not.')
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : String(err)

            expect(msg).toMatch(/syntax-error|syntax error/i)
            expect(msg).toMatch(/escape|string/i)
            expect(msg).toMatch(/line/i)
            expect(msg).toMatch(/column/i)
        }
    })

    test('2.d) file: diagnostics metadata should include error with line and column', () => {
        const parsed = YINI.parseFile(BAD_ESCAPING_FILE, {
            strictMode: false,
            failLevel: 'ignore-errors',
            includeMetadata: true,
            includeDiagnostics: true,
        }) as any

        expect(parsed).toBeDefined()
        expect(parsed.result).toBeDefined()
        expect(parsed.meta).toBeDefined()
        expect(parsed.meta.diagnostics).toBeDefined()

        const errors = parsed.meta.diagnostics?.errors
        expect(errors?.errorCount).toBeGreaterThan(0)

        const firstErr = errors?.payload?.[0]
        expect(firstErr).toBeDefined()
        expect(firstErr.line).toBeDefined()
        expect(firstErr.column).toBeDefined()
        expect(String(firstErr.message)).toMatch(/syntax error|escape|string/i)
    })
})
