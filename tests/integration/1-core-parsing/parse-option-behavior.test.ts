/*
    This file should focus on:
      * strictMode: false vs true
      * failLevel: 'auto' vs 'ignore-errors'
      * throwOnError: false vs true
      * optional metadata/diagnostics
*/
// tests/integration/1-core-parsing/parse-option-behavior.test.ts
// tests/integration/1-core-parsing/parse-option-behavior.test.ts
import path from 'path'
import YINI from '../../../src'

const FIXTURE_DIR = path.join(__dirname, '../../fixtures/invalid')

const FILE_DEFECT_COMBO_2 = path.join(FIXTURE_DIR, 'defectConfig2Combo3.yini')
const FILE_DEFECT_COMBO_3 = path.join(FIXTURE_DIR, 'defectConfigCombo3.yini')
const FILE_BAD_ESCAPING = path.join(FIXTURE_DIR, 'bad-escaping-1.yini')

describe('Parse option behavior tests:', () => {
    describe('Recovery behavior:', () => {
        test('A.1) Lenient + ignore-errors should recover and return partial result.', () => {
            const result = YINI.parseFile(FILE_DEFECT_COMBO_2, {
                strictMode: false,
                failLevel: 'ignore-errors',
            }) as any

            expect(result).toBeDefined()
            expect(Object.keys(result).length).toBeGreaterThan(0)
        })

        test('A.2) Strict + ignore-errors should still return partial result.', () => {
            const result = YINI.parseFile(FILE_DEFECT_COMBO_2, {
                strictMode: true,
                failLevel: 'ignore-errors',
            }) as any

            expect(result).toBeDefined()
            expect(Object.keys(result).length).toBeGreaterThan(0)
        })

        test('A.3) Lenient + ignore-errors should recover from invalid string escaping.', () => {
            const result = YINI.parseFile(FILE_BAD_ESCAPING, {
                strictMode: false,
                failLevel: 'ignore-errors',
            }) as any

            expect(result).toBeDefined()
            expect(result.App ?? result).toBeDefined()
        })
    })

    describe('Throw behavior:', () => {
        test('B.1) Default mode + throwOnError should throw on syntax error.', () => {
            expect(() => {
                YINI.parseFile(FILE_DEFECT_COMBO_2, {
                    throwOnError: true,
                })
            }).toThrow(/syntax-error|syntax error/i)
        })

        test('B.2) Strict + throwOnError should throw on syntax error.', () => {
            expect(() => {
                YINI.parseFile(FILE_DEFECT_COMBO_2, {
                    strictMode: true,
                    throwOnError: true,
                })
            }).toThrow(/syntax-error|syntax error/i)
        })

        test('B.3) Invalid escaping + throwOnError should throw syntax error.', () => {
            expect(() => {
                YINI.parseFile(FILE_BAD_ESCAPING, {
                    strictMode: true,
                    throwOnError: true,
                })
            }).toThrow(/syntax-error|syntax error/i)
        })

        test('B.4) Thrown error should include line and column.', () => {
            try {
                YINI.parseFile(FILE_DEFECT_COMBO_2, {
                    strictMode: true,
                    throwOnError: true,
                })

                throw new Error('Expected parser to throw, but it did not.')
            } catch (err: unknown) {
                const msg = err instanceof Error ? err.message : String(err)

                expect(msg).toMatch(/syntax-error|syntax error/i)
                expect(msg).toMatch(/line/i)
                expect(msg).toMatch(/column/i)
            }
        })
    })

    describe('Diagnostics behavior:', () => {
        test('C.1) Lenient + ignore-errors + metadata should include diagnostics.', () => {
            const parsed = YINI.parseFile(FILE_DEFECT_COMBO_2, {
                strictMode: false,
                failLevel: 'ignore-errors',
                includeMetadata: true,
                includeDiagnostics: true,
            }) as any

            expect(parsed.result).toBeDefined()
            expect(parsed.meta).toBeDefined()
            expect(parsed.meta.diagnostics).toBeDefined()

            const errors = parsed.meta.diagnostics?.errors
            expect(errors?.errorCount).toBeGreaterThan(0)

            const firstErr = errors?.payload?.[0]
            expect(firstErr.line).toBeDefined()
            expect(firstErr.column).toBeDefined()
        })

        test('C.2) Strict + ignore-errors + metadata should include diagnostics.', () => {
            const parsed = YINI.parseFile(FILE_DEFECT_COMBO_3, {
                strictMode: true,
                failLevel: 'ignore-errors',
                includeMetadata: true,
                includeDiagnostics: true,
            }) as any

            expect(parsed.result).toBeDefined()
            expect(parsed.meta).toBeDefined()
            expect(parsed.meta.diagnostics).toBeDefined()
        })

        test('C.3). Invalid escaping diagnostics should include line and column.', () => {
            const parsed = YINI.parseFile(FILE_BAD_ESCAPING, {
                strictMode: false,
                failLevel: 'ignore-errors',
                includeMetadata: true,
                includeDiagnostics: true,
            }) as any

            const errors = parsed.meta.diagnostics?.errors
            expect(errors?.errorCount).toBeGreaterThan(0)

            const firstErr = errors?.payload?.[0]
            expect(firstErr).toBeDefined()
            expect(firstErr.line).toBeDefined()
            expect(firstErr.column).toBeDefined()
            expect(String(firstErr.message)).toMatch(
                /syntax error|escape|string/i,
            )
        })
    })
})
