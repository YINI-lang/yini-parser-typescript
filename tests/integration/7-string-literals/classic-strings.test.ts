// tests/integration/7-string-literals/classic-strings.test.ts
import YINI from '../../../src'

/**
 * Classic string literal tests.
 *
 * Covers:
 * - Basic Classic string parsing.
 * - Case-insensitive C/c prefix.
 * - Full escape coverage.
 * - Invalid escape handling.
 * - Unicode scalar validation.
 * - Single-line Classic string enforcement.
 * - C-Triple-Quoted String parsing.
 * - Concatenation with Classic strings.
 */
describe('Classic string literal tests:', () => {
    describe('Basic Classic strings:', () => {
        test('1.a) Should parse simple Classic string with double quotes.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"Hello World"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.value).toEqual('Hello World')
        })

        test('1.b) Should parse simple Classic string with single quotes.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = C'Hello World'

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.value).toEqual('Hello World')
        })

        test('1.c) Classic string prefix should be case-insensitive.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                a = c"test"
                b = C"test"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.a).toEqual('test')
            expect(result.Test.b).toEqual('test')
        })

        test('1.d) Should parse an empty Classic string.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c""

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.value).toEqual('')
        })
    })

    describe('Escape sequences:', () => {
        test('2.a) Should parse common escape sequences.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Escapes
                value = c"Line1\\nLine2\\tTabbed\\rCarriage"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Escapes.value).toEqual(
                'Line1\nLine2\tTabbed\rCarriage',
            )
        })

        test('2.b) Should parse escaped quotes and backslash.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Escapes
                value = c"\\\\ \\" \\'"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Escapes.value).toEqual('\\ " \'')
        })

        test('2.c) Should parse hexadecimal escape \\xhh.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Escapes
                value = c"\\x41"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Escapes.value).toEqual('A')
        })

        test('2.d) Should parse Unicode escape \\uhhhh.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Escapes
                value = c"\\u0041"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Escapes.value).toEqual('A')
        })

        test('2.e) Should parse extended Unicode escape \\Uhhhhhhhh.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Escapes
                value = c"\\U00000041"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Escapes.value).toEqual('A')
        })

        test('2.f) Should parse octal escape \\oNNN.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Escapes
                value = c"\\o101"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Escapes.value).toEqual('A')
        })

        test('2.g) Should support all simple Classic escape sequences.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Escapes
                value = c"\\\\ \\' \\" \\/ \\0 \\? \\a \\b \\f \\n \\r \\t \\v"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Escapes.value).toEqual(
                '\\ \' " / \0 ? \x07 \b \f \n \r \t \v',
            )
        })
    })

    describe('Invalid escapes:', () => {
        test('3.a) Should throw on unknown escape sequence.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"\\z"

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(yini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('3.b) Should throw on invalid octal escape.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"\\o378"

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(yini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('3.c) Should throw on incomplete hexadecimal escape.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"\\x4"

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(yini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('3.d) Should throw on incomplete Unicode \\u escape.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"\\u123"

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(yini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('3.e) Should throw on incomplete Unicode \\U escape.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"\\U1234"

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(yini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('3.f) Should throw on empty octal escape.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"\\o"

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(yini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('3.g) Should throw on surrogate Unicode code point.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"\\uD800"

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(yini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('3.h) Should throw on Unicode code point above U+10FFFF.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"\\U00110000"

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(yini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })
    })

    describe('Single-line enforcement:', () => {
        test('4.a) Classic strings must not span multiple lines.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"This
                is invalid"

                /END
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(yini, {
                    strictMode: true,
                    requireDocTerminator: 'required',
                    failLevel: 'errors',
                })
            }).toThrow()
        })
    })

    describe('C-Triple-Quoted Strings:', () => {
        test('5.a) Should parse C-Triple-Quoted String with escapes.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = C"""Line1\\nLine2\\tTabbed"""

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.value).toEqual('Line1\nLine2\tTabbed')
        })

        test('5.b) Should parse multi-line C-Triple-Quoted String.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = C"""Line1
Line2"""

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.value).toEqual('Line1\nLine2')
        })

        test('5.c) C-Triple-Quoted String prefix should be case-insensitive.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                a = C"""Line\\nA"""
                b = c"""Line\\nB"""

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.a).toEqual('Line\nA')
            expect(result.Test.b).toEqual('Line\nB')
        })
    })

    describe('Concatenation:', () => {
        test('6.a) Should concatenate Classic strings.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"Hello " + c"World"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.value).toEqual('Hello World')
        })

        test('6.b) Should concatenate raw and Classic strings.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = "Hello " + c"World"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.value).toEqual('Hello World')
        })

        test('6.c) Should concatenate C-Triple-Quoted Strings with regular strings.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = C"""Hello\\n""" + "World"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.value).toEqual('Hello\nWorld')
        })
    })

    describe('Edge cases:', () => {
        test('7.a) Should parse escaped space-like characters.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"Hello World\\t"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.value).toEqual('Hello World\t')
        })

        test('7.b) Should keep # as literal content inside Classic strings.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"Path # not a comment"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.value).toEqual('Path # not a comment')
        })

        test('7.c) Should keep // as literal content inside Classic strings.', () => {
            // Arrange.
            const yini = `
                @yini strict

                ^ Test
                value = c"https://example.com/path"

                /END
            `

            // Act.
            const result = YINI.parse(yini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(result.Test.value).toEqual('https://example.com/path')
        })
    })
})
