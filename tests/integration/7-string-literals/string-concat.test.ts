// tests/integration/7-string-literals/string-concat.test.ts
import YINI from '../../../src'
import { toPrettyJSON } from '../../../src/utils/print'

/**
 * String concatenation tests.
 */
describe('String concatenation tests:', () => {
    describe('Lenient mode:', () => {
        test('1. Should concatenate string literals.', () => {
            // Arrange.
            const validYini = `
                @yini

                message = "Hello, " + "world"
            `

            const answer = {
                message: 'Hello, world',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
        })

        test('2. Should allow number, boolean, and null operands after an initial string literal.', () => {
            // Arrange.
            const validYini = `
                @yini

                message = "port=" + 8080 + ", enabled=" + true + ", value=" + null
            `

            const answer = {
                message: 'port=8080, enabled=true, value=null',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
        })

        test('3. Should allow concatenation to continue after plus on the next line.', () => {
            // Arrange.
            const validYini = `
                @yini

                text = "hello " +
                    "world"
            `

            const answer = {
                text: 'hello world',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
        })

        test('4. Should throw when the first concatenation operand is not a string literal.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                message = 8080 + " is the port"
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('5. Should throw when plus appears at the beginning of the next line.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                message = "Hello, "
                    + "world"
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('6. Should throw when a list is used as a concatenation operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                message = "items=" + [1, 2]
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('7. Should throw when an inline object is used as a concatenation operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                message = "object=" + { a: 1 }
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
        test('1. Should concatenate string literals.', () => {
            // Arrange.
            const validYini = `
                @yini

                ^ App
                message = "Hello, " + "world"

                /END
            `

            const answer = {
                App: {
                    message: 'Hello, world',
                },
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
        })

        test('2. Should allow string concatenation to continue after plus on the next line.', () => {
            // Arrange.
            const validYini = `
                @yini

                ^ Config
                text = "hello " +
                    "world"

                /END
            `

            const answer = {
                Config: {
                    text: 'hello world',
                },
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: true,
                requireDocTerminator: 'required',
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
        })

        test('3. Should throw when concatenation contains a number operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                ^ App
                message = "port=" + 8080

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

        test('4. Should throw when concatenation contains a boolean operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                ^ App
                message = "enabled=" + true

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

        test('5. Should throw when concatenation contains a null operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                ^ App
                message = "value=" + null

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

        test('6. Should throw when plus appears at the beginning of the next line.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                ^ App
                message = "Hello, "
                    + "world"

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

        test('7. Should throw when a list is used as a concatenation operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                ^ App
                message = "items=" + [1, 2]

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

        test('8. Should throw when an inline object is used as a concatenation operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini

                ^ App
                message = "object=" + { a: 1 }

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
