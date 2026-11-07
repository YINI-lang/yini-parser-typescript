// tests/integration/7-string-literals/triple-raw-strings.test.ts
import YINI from '../../../src'
import { toPrettyJSON } from '../../../src/utils/print'

/**
 * Triple-quoted raw string literal tests.
 *
 * Covers:
 * - Default raw triple-quoted strings.
 * - Explicit R/r-prefixed raw triple-quoted strings.
 * - Multi-line content preservation.
 * - Backslashes are preserved.
 * - Escape sequences are not interpreted.
 * - Comment markers inside strings are preserved.
 * - Empty triple-quoted strings.
 * - Concatenation with triple-quoted raw strings.
 */
describe('Triple-quoted raw string literal tests:', () => {
    describe('Lenient mode:', () => {
        test('1. Should parse a simple raw triple-quoted string.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = """Hello World"""
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

        test('2. Should parse a multi-line raw triple-quoted string.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = """Line 1
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

        test('3. Should parse explicit R/r-prefixed raw triple-quoted strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                upperRaw = R"""Line 1
Line 2"""
                lowerRaw = r"""Line A
Line B"""
            `

            const expected = {
                upperRaw: 'Line 1\nLine 2',
                lowerRaw: 'Line A\nLine B',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('3.b. Should normalize CRLF line breaks in raw triple-quoted strings.', () => {
            // Arrange.
            const validYini =
                '@yini\r\n\r\n' +
                '^ Strings\r\n' +
                'message = R"""Line one\r\n' +
                'Line two with \\n kept raw\r\n' +
                'Line three"""\r\n'

            const expected = {
                Strings: {
                    message:
                        'Line one\n' +
                        'Line two with \\n kept raw\n' +
                        'Line three',
                },
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('4. Should preserve backslashes in raw triple-quoted strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = """Path: C:\\Users\\marko\\project
Regex: ^\\d+\\.\\w+$"""
            `

            const expected = {
                text: 'Path: C:\\Users\\marko\\project\nRegex: ^\\d+\\.\\w+$',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('5. Should not interpret escape sequences in raw triple-quoted strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = """Line break marker: \\n
Tab marker: \\t
Unicode marker: \\u0041
Hex marker: \\x41
Octal marker: \\o101"""
            `

            const expected = {
                text:
                    'Line break marker: \\n\n' +
                    'Tab marker: \\t\n' +
                    'Unicode marker: \\u0041\n' +
                    'Hex marker: \\x41\n' +
                    'Octal marker: \\o101',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('6. Should preserve comment markers inside raw triple-quoted strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = """This # is not a comment.
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

        test('7. Should parse an empty raw triple-quoted string.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = """"""
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

        test('8. Should concatenate raw triple-quoted strings with regular raw strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = """Hello""" + ", " + """world"""
            `

            const expected = {
                text: 'Hello, world',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('9. Should throw when a raw triple-quoted string is unterminated.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                text = """Line 1
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
        test('1. Should parse a simple raw triple-quoted string.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                text = """Hello World"""

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

        test('2. Should parse a multi-line raw triple-quoted string.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                text = """Line 1
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

        test('3. Should parse explicit R/r-prefixed raw triple-quoted strings.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                upperRaw = R"""Line 1
Line 2"""
                lowerRaw = r"""Line A
Line B"""

                /END
            `

            const expected = {
                App: {
                    upperRaw: 'Line 1\nLine 2',
                    lowerRaw: 'Line A\nLine B',
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

        test('3.b. Should normalize CRLF line breaks in raw triple-quoted strings.', () => {
            // Arrange.
            const validYini =
                '@yini strict\r\n\r\n' +
                '^ Strings\r\n' +
                'message = R"""Line one\r\n' +
                'Line two with \\n kept raw\r\n' +
                'Line three"""\r\n\r\n' +
                '/END\r\n'

            const expected = {
                Strings: {
                    message:
                        'Line one\n' +
                        'Line two with \\n kept raw\n' +
                        'Line three',
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

        test('4. Should not interpret escape sequences in raw triple-quoted strings.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                text = """\\n stays literal
\\t stays literal
\\u0041 stays literal"""

                /END
            `

            const expected = {
                App: {
                    text:
                        '\\n stays literal\n' +
                        '\\t stays literal\n' +
                        '\\u0041 stays literal',
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

        test('5. Should concatenate only string operands in strict mode.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                text = """Hello""" + " " + """World"""

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

        test('6. Should throw when raw triple-quoted concatenation uses a non-string operand in strict mode.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

                ^ App
                text = """port=""" + 8080

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

        test('7. Should throw when a raw triple-quoted string is unterminated.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

                ^ App
                text = """Line 1
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
