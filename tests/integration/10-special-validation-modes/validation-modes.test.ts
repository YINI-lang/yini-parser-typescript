import path from 'path'
import YINI from '../../../src'
import { isDebug } from '../../../src/config/env'
import { debugPrint, printObject } from '../../../src/utils/system'

/**
 * Validation modes tests.
 */
describe('Validation modes tests:', () => {
    test('1. Empty/missing value in non-strict mode gets null.', () => {
        // Arrange.
        const validYini = `^ Title
            nullVal = null
            empty_val =          # ← Implicit null (lenient mode)
        `

        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Title.nullVal).toEqual(null)
        expect(result.Title.empty_val).toEqual(null)
    })

    test('2. Should throw on empty (missing) value in strict mode.', () => {
        // Arrange.
        const isStrict = true
        const invalidInStrict = `^ Title
            nullVal = null
            empty_val =          # ← Implicit null (lenient mode)
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(invalidInStrict, isStrict)
        }).toThrow()
    })
})
