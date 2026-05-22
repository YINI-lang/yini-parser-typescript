// tests/integration/7-string-literals/triple-classic-strings.test.ts
import YINI from '../../../src'
import { toPrettyJSON } from '../../../src/utils/print'

/**
 * Triple-quoted Classic string literal tests.
 *
 * Covers:
 * - C/c-prefixed triple-quoted strings.
 * - Multi-line content.
 * - Escape interpretation.
 * - Full common escape coverage.
 * - Unicode, UTF-32, hex, and octal escapes.
 * - Invalid escape handling.
 * - Comment markers inside strings.
 * - Concatenation.
 */
describe('Triple-quoted Classic string literal tests:', () => {
    describe('Lenient mode:', () => {
        test('1. Should parse a simple C-triple-quoted string.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = C"""Hello World"""
            `

            const expected = {
                text: 'Hello World',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('2. Should parse c-prefix case-insensitively.', () => {
            // Arrange.
            const validYini = `
                @yini

                upper = C"""Hello"""
                lower = c"""World"""
            `

            const expected = {
                upper: 'Hello',
                lower: 'World',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('3. Should preserve real newlines in C-triple-quoted strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = C"""Line 1
Line 2
Line 3"""
            `

            const expected = {
                text: 'Line 1\nLine 2\nLine 3',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('4. Should interpret common escape sequences.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = C"""Line1\\nLine2\\tTabbed\\rCarriage"""
            `

            const expected = {
                text: 'Line1\nLine2\tTabbed\rCarriage',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('5. Should interpret escaped quotes and backslash.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = C"""\\\\ \\" \\'"""
            `

            const expected = {
                text: '\\ " \'',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('6. Should interpret hex, Unicode, UTF-32, and octal escapes.', () => {
            // Arrange.
            const validYini = `
                @yini

                hex = C"""\\x41"""
                unicode16 = C"""\\u0041"""
                unicode32 = C"""\\U00000041"""
                octal = C"""\\o101"""
            `

            const expected = {
                hex: 'A',
                unicode16: 'A',
                unicode32: 'A',
                octal: 'A',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('7. Should support all common Classic escape sequences.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = C"""\\\\ \\' \\" \\/ \\0 \\? \\a \\b \\f \\n \\r \\t \\v"""
            `

            const expected = {
                text: '\\ \' " / \0 ? \x07 \b \f \n \r \t \v',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('8. Should preserve comment markers inside C-triple-quoted strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = C"""This # is not a comment.
This // is not a comment.
This ; is not a comment.
This -- is not a disabled line."""
            `

            const expected = {
                text:
                    'This # is not a comment.\n' +
                    'This // is not a comment.\n' +
                    'This ; is not a comment.\n' +
                    'This -- is not a disabled line.',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('9. Should parse an empty C-triple-quoted string.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = C""""""
            `

            const expected = {
                text: '',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('10. Should concatenate C-triple-quoted strings with other strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = C"""Hello\\n""" + "World" + C"""!"""
            `

            const expected = {
                text: 'Hello\nWorld!',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test.each([
            ['invalid escape', 'text = C"""\\z"""'],
            ['incomplete hex escape', 'text = C"""\\x4"""'],
            ['incomplete Unicode escape', 'text = C"""\\u123"""'],
            ['incomplete UTF-32 escape', 'text = C"""\\U1234"""'],
            ['empty octal escape', 'text = C"""\\o"""'],
            ['invalid octal escape', 'text = C"""\\o378"""'],
        ])('11.%# Should throw on malformed escape: %s.', (_name, line) => {
            // Arrange.
            const invalidYini = `
                @yini

                ${line}
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('12. Should throw when C-triple-quoted string is unterminated.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                text = C"""Line 1
Line 2
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

    describe('Strict mode:', () => {
        test('1. Should parse a simple C-triple-quoted string.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                text = C"""Hello World"""

                /END
            `

            const expected = {
                App: {
                    text: 'Hello World',
                },
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('2. Should parse multi-line C-triple-quoted strings.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                text = C"""Line 1
Line 2
Line 3"""

                /END
            `

            const expected = {
                App: {
                    text: 'Line 1\nLine 2\nLine 3',
                },
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('3. Should interpret escapes in strict mode.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                text = C"""Line1\\nLine2\\tTabbed"""
                letter = C"""\\x41\\u0042\\U00000043\\o104"""

                /END
            `

            const expected = {
                App: {
                    text: 'Line1\nLine2\tTabbed',
                    letter: 'ABCD',
                },
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('4. Should concatenate only string operands in strict mode.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                text = C"""Hello\\n""" + """World""" + C"""!"""

                /END
            `

            const expected = {
                App: {
                    text: 'Hello\nWorld!',
                },
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('5. Should throw when strict-mode concatenation uses a non-string operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

                ^ App
                text = C"""port=""" + 8080

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

        test.each([
            ['invalid escape', 'text = C"""\\z"""'],
            ['incomplete hex escape', 'text = C"""\\x4"""'],
            ['incomplete Unicode escape', 'text = C"""\\u123"""'],
            ['incomplete UTF-32 escape', 'text = C"""\\U1234"""'],
            ['empty octal escape', 'text = C"""\\o"""'],
            ['invalid octal escape', 'text = C"""\\o378"""'],
        ])(
            '6.%# Should throw on malformed escape in strict mode: %s.',
            (_name, line) => {
                // Arrange.
                const invalidYini = `
                @yini strict

                ^ App
                ${line}

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

        test('7. Should throw when C-triple-quoted string is unterminated.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

                ^ App
                text = C"""Line 1
Line 2

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
})
