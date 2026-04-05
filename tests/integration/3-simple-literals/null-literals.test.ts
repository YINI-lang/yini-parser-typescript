import YINI from '../../../src'
import { debugPrint, toPrettyJSON } from '../../../src/utils/print'

/**
 * Null literal tests.
 */
describe('Null literal tests:', () => {
    test('1. [lenient] Should succeed parsing a bunch of Null literals.', () => {
        // Arrange.
        const validYini = `^ NullLiterals
            value1 = 10
            value2 = null
            value3 = Null
            value4 = NULL
            value5 = nULL
            value6 =        // null in non-strict mode.
            value20 = 20
        `

        // Act.
        const result = YINI.parse(validYini, { strictMode: false })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            NullLiterals: {
                value1: 10,
                value2: null,
                value3: null,
                value4: null,
                value5: null,
                value6: null,
                value20: null,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('2.a) Should fail parsing empty value in strict-mode.', () => {
        // Arrange.
        const validYini = `^ NullLiterals
            value2 = null
            value6 =        // MUST fail in strict mode.
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(validYini, { strictMode: true })
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })
    test('2.b) Should parse empty value in strict-mode with treat allow.', () => {
        // Arrange.
        const validYini = `^ NullLiterals
            value2 = null
            value6 =        // MUST fail in strict mode.
        `

        // Act.
        const result = YINI.parse(validYini, {
            strictMode: true,
            treatEmptyValueAsNull: 'allow',
        })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            NullLiterals: {
                value2: null,
                value6: null,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })
    test('2.c) Should parse empty value in strict-mode but with a warning.', () => {
        // Arrange.
        const validYini = `^ NullLiterals
            value2 = null
            value6 =        // MUST fail in strict mode.
        `

        // Act.
        const result = YINI.parse(validYini, {
            strictMode: true,
            treatEmptyValueAsNull: 'allow-with-warning',
        })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            NullLiterals: {
                value2: null,
                value6: null,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3. [strict] Should succeed parsing a bunch of Null literals (buthout empty value).', () => {
        // Arrange.
        const validYini = `^ NullLiterals
            value2 = null
            value3 = Null
            value4 = NULL
            value5 = nULL
        `

        // Act.
        const result = YINI.parse(validYini, { strictMode: false })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            NullLiterals: {
                value2: null,
                value3: null,
                value4: null,
                value5: null,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })
})
