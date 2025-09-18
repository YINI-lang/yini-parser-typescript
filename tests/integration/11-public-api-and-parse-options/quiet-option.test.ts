import path from 'path'
import YINI from '../../../src'
import { isDebug } from '../../../src/config/env'
import { debugPrint, printObject } from '../../../src/utils/print'

const errorYini = `
    ^ Section1
    333="oops"   // invalid key => error
`

const warnYini = `
    ^ Section2
    // => warning, if requireDocTerminator: 'warn-if-missing'
`

/**
 * Option 'quite' tests.
 */
xdescribe(`Option 'quite' tests:`, () => {
    test('1. xxxxxxxxxxxxx.', () => {
        // Arrange.

        // Act.
        const result = YINI.parse(errorYini + warnYini, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            //quiet: true,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Title.nullVal).toEqual(null)
        expect(result.Title.empty_val).toEqual(null)
    })

    test('2. xxxxxxxxxx.', () => {
        // Arrange.
        const isStrict = true
        const invalidInStrict = `^ Title
            nullVal = null
            empty_val =          # ← ERROR: Requires explicit null (strict mode)
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(invalidInStrict, isStrict)
        }).toThrow()
    })
})
