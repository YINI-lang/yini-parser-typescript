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
 * Option 'silent' tests.
 */
describe(`Option 'silent' tests:`, () => {
    let errSpy: jest.SpyInstance
    let warnSpy: jest.SpyInstance
    let logSpy: jest.SpyInstance

    beforeEach(() => {
        errSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
        warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('1.a) lenient mode: Prints warning and error on YINI content with error+warning.', () => {
        // Arrange.

        // Act.
        const result = YINI.parse(errorYini + warnYini, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            // silent: true,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(warnSpy).toHaveBeenCalled()
        expect(errSpy).toHaveBeenCalled()
    })

    test(`1.b) lenient mode: Prints warning and error, when 'silent' flag IS NOT set.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(errorYini + warnYini, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: false,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(warnSpy).toHaveBeenCalled()
        expect(errSpy).toHaveBeenCalled()
    })

    test(`1.c) lenient mode: Does NOT print warning NOR error, when 'silent' flag set.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(errorYini + warnYini, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: true,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(warnSpy).not.toHaveBeenCalled()
        expect(errSpy).not.toHaveBeenCalled()
    })

    //@todo Add tests, for warnings +silent true/false
    //@todo Add tests, for errors +silent true/false

    xtest('2. xxxxxxxxxxxxxxxx.', () => {
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
