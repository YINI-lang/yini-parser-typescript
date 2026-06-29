// tests/integration/7-string-literals/raw-strings.test.ts
import YINI from '../../../src'
import { toPrettyJSON } from '../../../src/utils/print'

/**
 * Raw string literal tests.
 *
 * Covers:
 * - Default raw strings.
 * - Explicit R/r-prefixed raw strings.
 * - Single-quoted and double-quoted raw strings.
 * - Raw triple-quoted strings.
 * - Explicit R/r-prefixed raw triple-quoted strings.
 * - Backslashes are preserved.
 * - Escape sequences are not interpreted.
 * - Comment markers inside strings are preserved.
 * - Single-line raw strings must not span multiple lines.
 */
describe('Raw string literal tests:', () => {
    describe('Lenient mode:', () => {
        test('1. Should parse default raw strings with single and double quotes.', () => {
            // Arrange.
            const validYini = `
                @yini

                singleQuoted = 'Hello World'
                doubleQuoted = "Hello World"
            `

            const expected = {
                singleQuoted: 'Hello World',
                doubleQuoted: 'Hello World',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('2. Should parse explicit R/r-prefixed raw strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                upperDouble = R"Hello World"
                lowerDouble = r"Hello World"
                upperSingle = R'Hello World'
                lowerSingle = r'Hello World'
            `

            const expected = {
                upperDouble: 'Hello World',
                lowerDouble: 'Hello World',
                upperSingle: 'Hello World',
                lowerSingle: 'Hello World',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('3. Should preserve backslashes in raw strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                windowsPath = "C:\\Users\\marko\\project"
                regexText = R"^\\d+\\.\\w+$"
                shellPath = r"/usr/local/bin"
            `

            const expected = {
                windowsPath: 'C:\\Users\\marko\\project',
                regexText: '^\\d+\\.\\w+$',
                shellPath: '/usr/local/bin',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('4. Should not interpret escape sequences in raw strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                newlineText = "\\n"
                tabText = "\\t"
                unicodeText = "\\u0041"
                hexText = "\\x41"
                octalText = "\\o101"
            `

            const expected = {
                newlineText: '\\n',
                tabText: '\\t',
                unicodeText: '\\u0041',
                hexText: '\\x41',
                octalText: '\\o101',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('5. Should preserve comment markers inside raw strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                hashText = "value # not a comment"
                slashText = "value // not a comment"
                semicolonText = "value ; not a comment"
                disabledText = "value -- not a disabled line"
            `

            const expected = {
                hashText: 'value # not a comment',
                slashText: 'value // not a comment',
                semicolonText: 'value ; not a comment',
                disabledText: 'value -- not a disabled line',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('6. Should parse raw triple-quoted strings.', () => {
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

        test('7. Should parse explicit R/r-prefixed raw triple-quoted strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                upperText = R"""Line 1
Line 2"""
                lowerText = r"""Path: C:\\Users\\marko
Regex: ^\\d+$"""
            `

            const expected = {
                upperText: 'Line 1\nLine 2',
                lowerText: 'Path: C:\\Users\\marko\nRegex: ^\\d+$',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('8. Should allow quotes of the other kind inside raw strings.', () => {
            // Arrange.
            const validYini = `
                @yini

                singleQuoted = 'He said "hello"'
                doubleQuoted = "Amanda's Project"
            `

            const expected = {
                singleQuoted: 'He said "hello"',
                doubleQuoted: "Amanda's Project",
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        })

        test('9. Should throw when a single-line raw string spans multiple lines.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                text = "Line 1
Line 2"
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('10. Should throw when a raw string contains a literal tab.', () => {
            // Arrange.
            const invalidYini =
                '@yini\n\n^ Strings\nkey = "alpha\tbeta"\n'

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'errors',
                })
            }).toThrow(/control character/i)
        })
    })

    describe('Strict mode:', () => {
        test('1. Should parse default raw strings.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                path = "C:\\Users\\marko\\project"
                text = 'Hello World'

                /END
            `

            const expected = {
                App: {
                    path: 'C:\\Users\\marko\\project',
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

        test('2. Should parse explicit R/r-prefixed raw strings.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                upperRaw = R"\\n is not a newline"
                lowerRaw = r"\\t is not a tab"

                /END
            `

            const expected = {
                App: {
                    upperRaw: '\\n is not a newline',
                    lowerRaw: '\\t is not a tab',
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

        test('3. Should parse raw triple-quoted strings.', () => {
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

        test('4. Should parse explicit R/r-prefixed raw triple-quoted strings.', () => {
            // Arrange.
            const validYini = `
                @yini strict

                ^ App
                upperText = R"""Line 1
Line 2"""
                lowerText = r"""Path: C:\\Users\\marko
Regex: ^\\d+$"""

                /END
            `

            const expected = {
                App: {
                    upperText: 'Line 1\nLine 2',
                    lowerText: 'Path: C:\\Users\\marko\nRegex: ^\\d+$',
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

        test('5. Should throw when @yini strict is parsed in lenient mode.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

                ^ App
                value = "test"

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('6. Should throw when a single-line raw string spans multiple lines.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

                ^ App
                text = "Line 1
Line 2"

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

        test('7. Should throw when a raw string contains a literal tab.', () => {
            // Arrange.
            const invalidYini =
                '@yini strict\n\n^ App\ntext = "alpha\tbeta"\n\n/END\n'

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow(/control character/i)
        })
    })
})
