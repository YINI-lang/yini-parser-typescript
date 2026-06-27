// tests/integration/10-special-and-validation-modes/mode-declarations.test.ts
import YINI from '../../../src'

/**
 * Mode declaration tests.
 *
 * Covers:
 * - Plain @yini marker.
 * - Optional @yini strict and @yini lenient declarations.
 * - Mode mismatch diagnostics.
 * - Invalid mode declarations.
 * - Duplicate @yini marker handling.
 * - Directive placement rules.
 *
 * Important:
 * Mode declarations state the document's expected parsing mode.
 * They do not switch the parser mode automatically.
 */
describe('Mode declaration tests:', () => {
    describe('Plain @yini marker:', () => {
        test('1. Should allow plain @yini in lenient mode.', () => {
            // Arrange.
            const validYini = `
                @yini

                ^ App
                name = "demo"
            `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(result.App.name).toEqual('demo')
        })

        test('2. Should allow plain @yini in strict mode.', () => {
            // Arrange.
            const validYini = `
                @yini

                ^ App
                name = "demo"

                /END
            `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.App.name).toEqual('demo')
        })

        test('3. Should allow no @yini marker in lenient mode.', () => {
            // Arrange.
            const validYini = `
                ^ App
                name = "demo"
            `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(result.App.name).toEqual('demo')
        })

        test('4. Should allow no @yini marker in strict mode.', () => {
            // Arrange.
            const validYini = `
                ^ App
                name = "demo"

                /END
            `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.App.name).toEqual('demo')
        })
    })

    describe('@yini strict:', () => {
        test('1. Should allow @yini strict when parser runs in strict mode.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                name = "demo"

                /END
            `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.App.name).toEqual('demo')
        })

        test('2. Should throw when @yini strict is parsed in lenient mode.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

                ^ App
                name = "demo"
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'errors',
                })
            }).toThrow()
        })
    })

    describe('@yini lenient:', () => {
        test('1. Should allow @yini lenient when parser runs in lenient mode.', () => {
            // Arrange.
            const validYini = `
            @yini lenient

            ^ App
            name = "demo"
        `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(result.App.name).toEqual('demo')
        })

        test('2. Should allow @yini lenient in strict mode, but emit a warning.', () => {
            // Arrange.
            const validYini = `
            @yini lenient

            ^ App
            name = "demo"

            /END
        `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
                includeMetadata: true,
                includeDiagnostics: true,
                failLevel: 'errors',
            })

            // Assert.
            expect(result.result.App.name).toEqual('demo')

            const diagnostics = result.meta?.diagnostics ?? []
            const allDiagnosticsText = JSON.stringify(diagnostics).toLowerCase()

            expect(allDiagnosticsText).toContain('warning')
            expect(allDiagnosticsText).toContain('mode')
            expect(allDiagnosticsText).toContain('lenient')
            expect(allDiagnosticsText).toContain('strict')
        })

        test('3. Should throw on @yini lenient in strict mode when warnings are fatal.', () => {
            // Arrange.
            const invalidYini = `
            @yini lenient

            ^ App
            name = "demo"

            /END
        `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    includeMetadata: true,
                    includeDiagnostics: true,
                    failLevel: 'warnings-and-errors',
                })
            }).toThrow()
        })
    })

    describe('Case handling:', () => {
        test('1. Should allow @yini marker casing to vary.', () => {
            // Arrange.
            const validYini = `
                @YINI strict

                ^ App
                name = "demo"

                /END
            `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.App.name).toEqual('demo')
        })

        test('2. Should allow mode declaration casing to vary.', () => {
            // Arrange.
            const validYini = `
                @yini STRICT

                ^ App
                name = "demo"

                /END
            `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.App.name).toEqual('demo')
        })
    })

    describe('Invalid mode declarations:', () => {
        test.each([
            ['unknown mode', '@yini safe'],
            ['version-like text', '@yini 1.0'],
            ['extra unknown word', '@yini strict extra'],
        ])(
            '1.%# Should throw on invalid mode declaration: %s.',
            (_name, marker) => {
                // Arrange.
                const invalidYini = `
                ${marker}

                ^ App
                name = "demo"

                /END
            `

                // Act & Assert.
                expect(() => {
                    YINI.parse(invalidYini, {
                        strictMode: true,
                        requireDocTerminator: 'required',
                        failLevel: 'errors',
                    })
                }).toThrow()
            },
        )
    })

    describe('Duplicate @yini markers:', () => {
        test('1. Should warn or throw on duplicate @yini markers in lenient mode when warnings are fatal.', () => {
            // Arrange.
            const invalidYini = `
                @yini
                @yini

                ^ App
                name = "demo"
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'warnings-and-errors',
                })
            }).toThrow()
        })

        test('2. Should throw on duplicate @yini markers in strict mode.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict
                @yini strict

                ^ App
                name = "demo"

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })
    })

    describe('Directive placement:', () => {
        test('1. Should allow @yini after leading blank lines and comments.', () => {
            // Arrange.
            const validYini = `

                // Leading comment.
                # Another leading comment.
                ; One more leading comment.

                @yini strict

                ^ App
                name = "demo"

                /END
            `

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.App.name).toEqual('demo')
        })

        test('2. Should throw when @yini appears after a section in strict mode.', () => {
            // Arrange.
            const invalidYini = `
                ^ App
                name = "demo"

                @yini strict

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('3. Should throw when @yini appears after a section in lenient mode.', () => {
            // Arrange.
            const invalidYini = `
                ^ App

                @yini lenient
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('4. Should throw when @yini appears after a member in strict mode.', () => {
            // Arrange.
            const invalidYini = `
                name = "demo"

                @yini strict

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('5. Should throw when @yini appears after a member in lenient mode.', () => {
            // Arrange.
            const invalidYini = `
                ^ App
                name = "demo"

                @yini lenient
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'errors',
                })
            }).toThrow()
        })
    })
})
