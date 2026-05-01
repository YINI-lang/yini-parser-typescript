// tests/integration/10-special-and-validation-modes/empty-document.test.ts
import path from 'path'
import YINI from '../../../src'

describe('Empty document handling:', () => {
    const fixturesDir = path.join(__dirname, '../../fixtures')

    test.each(['Empty-1.yini', 'Empty-2.yini', 'Empty-3.yini'])(
        'Lenient mode: %s should not fail, but should warn.',
        (fileName) => {
            const fullPath = path.join(fixturesDir, fileName)

            expect(() => {
                const parsed = YINI.parseFile(fullPath, {
                    includeMetadata: true,
                    includeDiagnostics: true,
                })

                expect(parsed).toBeTruthy()
                expect(parsed.meta).toBeTruthy()
                expect(parsed.meta.diagnostics).toBeTruthy()

                const allText = JSON.stringify(parsed).toLowerCase()

                expect(allText).toContain('empty')
                expect(allText).toContain('no meaningful content')
            }).not.toThrow()
        },
    )

    test.each(['Empty-1.yini', 'Empty-2.yini', 'Empty-3.yini'])(
        'Strict mode: %s should fail.',
        (fileName) => {
            const fullPath = path.join(fixturesDir, fileName)

            expect(() => {
                YINI.parseFile(fullPath, {
                    strictMode: true,
                })
            }).toThrow()
        },
    )
})
