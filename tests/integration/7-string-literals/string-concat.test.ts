// tests/integration/7-string-literals/string-concat.test.ts
import YINI from '../../../src'
import { toPrettyJSON } from '../../../src/utils/print'

/**
 * String concatenation tests.
 */
describe('String concatenation tests:', () => {
    test('Strict mode should concatenate string literals only.', () => {
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

    test('Lenient mode should allow number, boolean, and null operands after an initial string literal.', () => {
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

    test('Strict mode should throw when concatenation contains a number operand.', () => {
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
            })
        }).toThrow()
    })

    test('Lenient mode should throw when the first concatenation operand is not a string literal.', () => {
        // Arrange.
        const invalidYini = `
            @yini

            message = 8080 + " is the port"
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(invalidYini, {
                strictMode: false,
            })
        }).toThrow()
    })

    test('Lenient mode should throw when concatenation continues after plus on the next line.', () => {
        // Arrange.
        const invalidYini = `
            @yini

            message = "Hello, " +
                "world"
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(invalidYini, {
                strictMode: false,
            })
        }).toThrow()
    })

    test('Lenient mode should throw when plus appears at the beginning of the next line.', () => {
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
            })
        }).toThrow()
    })

    test('Lenient mode should throw when a list is used as a concatenation operand.', () => {
        // Arrange.
        const invalidYini = `
            @yini

            message = "items=" + [1, 2]
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(invalidYini, {
                strictMode: false,
            })
        }).toThrow()
    })

    test('Lenient mode should throw when an inline object is used as a concatenation operand.', () => {
        // Arrange.
        const invalidYini = `
            @yini

            message = "object=" + { a: 1 }
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(invalidYini, {
                strictMode: false,
            })
        }).toThrow()
    })
})
