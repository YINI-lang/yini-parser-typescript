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
                @yini lenient

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
                @yini lenient

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

        test('3. Should throw when concatenation starts with a number operand.', () => {
            // Arrange.
            const invalidYini = `
        @yini lenient

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

        test('4.a) Should concatenate scalar operands in source order after an initial string literal.', () => {
            // Arrange.
            const validYini = `
        @yini lenient

        value1 = "1" + 2 + 3
        value2 = "enabled=" + true
        value3 = "value=" + null
    `

            const answer = {
                value1: '123',
                value2: 'enabled=true',
                value3: 'value=null',
            }

            // Act.
            const result = YINI.parse(validYini, {
                strictMode: false,
            })

            // Assert.
            expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
        })
        test('4.b) Should throw when concatenation starts with a boolean or null operand.', () => {
            // Arrange.
            const invalidYini = `
        @yini lenient

        value1 = true + " is enabled"
        value2 = null + " value"
    `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('5. Should allow concatenation to continue after plus on the next line.', () => {
            // Arrange.
            const validYini = `
                @yini lenient

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

        test('6. Should throw when a plus expression does not begin with a string literal.', () => {
            // Arrange.
            const invalidYini = `
                @yini lenient

                value = 1 + 2 + 3
            `

            // Act & Assert.
            expect(() => {
                YINI.parse(invalidYini, {
                    strictMode: false,
                    failLevel: 'errors',
                })
            }).toThrow()
        })

        test('7. Should throw when plus appears at the beginning of the next line.', () => {
            // Arrange.
            const invalidYini = `
                @yini lenient

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

        test('8. Should throw when a list is used as a concatenation operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini lenient

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

        test('9. Should throw when an inline object is used as a concatenation operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini lenient

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
                @yini strict

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
                @yini strict

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
                @yini strict

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

        test('4. Should throw when concatenation starts with a number operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

                ^ App
                message = 8080 + " is the port"

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

        test('5. Should throw when concatenation contains a boolean operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

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

        test('6. Should throw when concatenation contains a null operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

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

        test('7. Should throw when plus appears at the beginning of the next line.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

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

        test('8. Should throw when a list is used as a concatenation operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

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

        test('9. Should throw when an inline object is used as a concatenation operand.', () => {
            // Arrange.
            const invalidYini = `
                @yini strict

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
