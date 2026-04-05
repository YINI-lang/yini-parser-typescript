import YINI from '../../../src'
import { debugPrint, toPrettyJSON } from '../../../src/utils/print'
import { parseUntilError } from '../../test-helpers'

/**
 * Null literal tests.
 */
describe('Null literal tests', () => {
    test('1.a) [lenient] Should parse explicit null literals and empty value as null.', () => {
        // Arrange.
        const yini = `^ NullLiterals
            value1 = 10
            value2 = null
            value3 = Null
            value4 = NULL
            value5 = nULL
            value6 =        // Empty value allowed in lenient mode.
            value20 = 20
        `

        const expected = {
            NullLiterals: {
                value1: 10,
                value2: null,
                value3: null,
                value4: null,
                value5: null,
                value6: null,
                value20: 20,
            },
        }

        // Act.
        const result = YINI.parse(yini, { strictMode: false })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('1.b) [lenient] Should throw when an empty value is used and treatEmptyValueAsNull = disallow.', () => {
        // Arrange.
        const yini = `^ NullLiterals
            value2 = null
            value6 =        // Empty value must fail when treatEmptyValueAsNull is disallow.
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(yini, {
                strictMode: false,
                treatEmptyValueAsNull: 'disallow',
                throwOnError: true,
                failLevel: 'errors',
            })
        }).toThrow()
    })

    test('2.a) [strict] Should fail when an empty value is used and treatEmptyValueAsNull = disallow.', () => {
        // Arrange.
        const yini = `^ NullLiterals
            value2 = null
            value6 =        // Empty value must fail in strict mode by default.
        `

        // Act & Assert.
        expect(() => {
            parseUntilError(yini, true)
        }).toThrow()
    })

    test('2.b) [strict] Should allow empty value as null when treatEmptyValueAsNull = allow.', () => {
        // Arrange.
        const yini = `^ NullLiterals
            value2 = null
            value6 =        // Allowed as null by option.
        `

        const expected = {
            NullLiterals: {
                value2: null,
                value6: null,
            },
        }

        // Act.
        const result = YINI.parse(yini, {
            strictMode: true,
            treatEmptyValueAsNull: 'allow',
        })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('2.c) [strict] Should allow empty value as null with warning when treatEmptyValueAsNull = allow-with-warning.', () => {
        // Arrange.
        const yini = `^ NullLiterals
            value2 = null
            value6 =        // Allowed as null with warning by option.
        `

        const expected = {
            NullLiterals: {
                value2: null,
                value6: null,
            },
        }

        // Act.
        const result = YINI.parse(yini, {
            strictMode: true,
            treatEmptyValueAsNull: 'allow-with-warning',
        })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('3. [strict] Should parse explicit null literals in any letter case.', () => {
        // Arrange.
        const yini = `^ NullLiterals
            value2 = null
            value3 = Null
            value4 = NULL
            value5 = nULL
        `

        const expected = {
            NullLiterals: {
                value2: null,
                value3: null,
                value4: null,
                value5: null,
            },
        }

        // Act.
        const result = YINI.parse(yini, { strictMode: true })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('4. [lenient] Should parse null inside a list.', () => {
        // Arrange.
        const yini = `^ NullLiterals
            items = [1, null, 3]
        `

        const expected = {
            NullLiterals: {
                items: [1, null, 3],
            },
        }

        // Act.
        const result = YINI.parse(yini, { strictMode: false })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('5. [lenient] Should parse null inside an inline object.', () => {
        // Arrange.
        const yini = `^ NullLiterals
            obj = { a: 1, b: null, c: true }
        `

        const expected = {
            NullLiterals: {
                obj: {
                    a: 1,
                    b: null,
                    c: true,
                },
            },
        }

        // Act.
        const result = YINI.parse(yini, { strictMode: false })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('6. [strict] Should parse explicit null inside an inline object.', () => {
        // Arrange.
        const yini = `^ NullLiterals
            obj = { value: null }
        `

        const expected = {
            NullLiterals: {
                obj: {
                    value: null,
                },
            },
        }

        // Act.
        const result = YINI.parse(yini, { strictMode: true })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })
})
