// tests/integration/10-special-and-validation-modes/empty-document.test.ts
import path from 'path'
import YINI from '../../../src'

/**
 * Empty document handling tests.
 */
describe('Empty document handling tests:', () => {
    const fixturesDir = path.join(__dirname, '../../fixtures')

    test.each(['Empty-1.yini', 'Empty-2.yini', 'Empty-3.yini'])(
        'Lenient mode should not fail for %s, but should report a warning.',
        (fileName) => {
            // Arrange.
            const fullPath = path.join(fixturesDir, fileName)

            // Act.
            const parsed = YINI.parseFile(fullPath, {
                strictMode: false,
                includeMetadata: true,
                includeDiagnostics: true,
            })

            const allText = JSON.stringify(parsed).toLowerCase()

            // Assert.
            expect(parsed).toBeTruthy()
            expect(parsed.meta).toBeTruthy()
            expect(parsed.meta.mode).toEqual('lenient')
            expect(parsed.meta.diagnostics).toBeTruthy()
            expect(
                parsed.meta.diagnostics.warnings.warningCount,
            ).toBeGreaterThan(0)

            expect(allText).toContain('empty')
            expect(allText).toContain('no meaningful content')
        },
    )

    test.each(['Empty-1.yini', 'Empty-2.yini', 'Empty-3.yini'])(
        'Strict mode should fail for %s.',
        (fileName) => {
            // Arrange.
            const fullPath = path.join(fixturesDir, fileName)

            // Act & Assert.
            expect(() => {
                YINI.parseFile(fullPath, {
                    strictMode: true,
                })
            }).toThrow()
        },
    )

    test('Lenient mode should allow an inline empty document and report a warning.', () => {
        // Arrange.
        const emptyYini = ''

        // Act.
        const parsed = YINI.parse(emptyYini, {
            strictMode: false,
            includeMetadata: true,
            includeDiagnostics: true,
        })

        const allText = JSON.stringify(parsed).toLowerCase()

        // Assert.
        expect(parsed).toBeTruthy()
        expect(parsed.meta).toBeTruthy()
        expect(parsed.meta.mode).toEqual('lenient')
        expect(parsed.meta.diagnostics).toBeTruthy()
        expect(parsed.meta.diagnostics.warnings.warningCount).toBeGreaterThan(0)

        expect(allText).toContain('empty')
        expect(allText).toContain('no meaningful content')
    })

    test('Lenient mode should allow an inline document containing only whitespace and report a warning.', () => {
        // Arrange.
        const emptyYini = `


            
        `

        // Act.
        const parsed = YINI.parse(emptyYini, {
            strictMode: false,
            includeMetadata: true,
            includeDiagnostics: true,
        })

        const allText = JSON.stringify(parsed).toLowerCase()

        // Assert.
        expect(parsed).toBeTruthy()
        expect(parsed.meta).toBeTruthy()
        expect(parsed.meta.mode).toEqual('lenient')
        expect(parsed.meta.diagnostics).toBeTruthy()
        expect(parsed.meta.diagnostics.warnings.warningCount).toBeGreaterThan(0)

        expect(allText).toContain('empty')
        expect(allText).toContain('no meaningful content')
    })

    test('Lenient mode should allow an inline document containing only comments and report a warning.', () => {
        // Arrange.
        const emptyYini = `
            // This document contains only comments.
            # This is also a comment.
            /*
                This is a block comment.
            */
        `

        // Act.
        const parsed = YINI.parse(emptyYini, {
            strictMode: false,
            includeMetadata: true,
            includeDiagnostics: true,
        })

        const allText = JSON.stringify(parsed).toLowerCase()

        // Assert.
        expect(parsed).toBeTruthy()
        expect(parsed.meta).toBeTruthy()
        expect(parsed.meta.mode).toEqual('lenient')
        expect(parsed.meta.diagnostics).toBeTruthy()
        expect(parsed.meta.diagnostics.warnings.warningCount).toBeGreaterThan(0)

        expect(allText).toContain('empty')
        expect(allText).toContain('no meaningful content')
    })

    test('Lenient mode should allow an inline document containing only disabled lines and report a warning.', () => {
        // Arrange.
        const emptyYini = `
            --name = "Disabled"
            --^ DisabledSection
            --enabled = true
        `

        // Act.
        const parsed = YINI.parse(emptyYini, {
            strictMode: false,
            includeMetadata: true,
            includeDiagnostics: true,
        })

        const allText = JSON.stringify(parsed).toLowerCase()

        // Assert.
        expect(parsed).toBeTruthy()
        expect(parsed.meta).toBeTruthy()
        expect(parsed.meta.mode).toEqual('lenient')
        expect(parsed.meta.diagnostics).toBeTruthy()
        expect(parsed.meta.diagnostics.warnings.warningCount).toBeGreaterThan(0)

        expect(allText).toContain('empty')
        expect(allText).toContain('no meaningful content')
    })

    test('Strict mode should reject an inline empty document.', () => {
        // Arrange.
        const emptyYini = ''

        // Act & Assert.
        expect(() => {
            YINI.parse(emptyYini, {
                strictMode: true,
            })
        }).toThrow()
    })

    test('Strict mode should reject an inline document containing only whitespace.', () => {
        // Arrange.
        const emptyYini = `


            
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(emptyYini, {
                strictMode: true,
            })
        }).toThrow()
    })

    test('Strict mode should reject an inline document containing only comments.', () => {
        // Arrange.
        const emptyYini = `
            // This document contains only comments.
            # This is also a comment.
            /*
                This is a block comment.
            */
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(emptyYini, {
                strictMode: true,
            })
        }).toThrow()
    })

    test('Strict mode should reject an inline document containing only disabled lines.', () => {
        // Arrange.
        const emptyYini = `
            --name = "Disabled"
            --^ DisabledSection
            --enabled = true
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(emptyYini, {
                strictMode: true,
            })
        }).toThrow()
    })
})
