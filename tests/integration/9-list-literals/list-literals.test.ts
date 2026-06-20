// tests/integration/9-list-literals/list-literals.test.ts
import YINI from '../../../src'

describe('List literal tests:', () => {
    test('1. Should parse an empty list literal in lenient mode.', () => {
        // Arrange.
        const validYini = `
            ^ App
            items = []
        `

        // Act.
        const result = YINI.parse(validYini)

        // Assert.
        expect(result.App.items).toEqual([])
    })

    test('2. Should parse an empty list literal in strict mode.', () => {
        // Arrange.
        const validYini = `
            ^ App
            items = []
            /END
        `

        // Act.
        const result = YINI.parse(validYini, {
            strictMode: true,
        })

        // Assert.
        expect(result.App.items).toEqual([])
    })

    test('3. Should reject removed colon-list syntax.', () => {
        // Arrange.
        const invalidYini = `
            ^ App
            items:
                - "one"
                - "two"
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(invalidYini, {
                failLevel: 'errors',
            })
        }).toThrow()
    })
})
