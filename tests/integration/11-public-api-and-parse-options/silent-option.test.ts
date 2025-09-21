import path from 'path'
import YINI from '../../../src'
import { isDebug } from '../../../src/config/env'
import { debugPrint, printObject } from '../../../src/utils/print'

const ERROR_DOC = `
    ^ Section1
    333="oops"   // invalid key => error
`

const ERROR_STRICT_DOC = `
    ^ Section1
    value =   // invalid in strict mode => error
`

const WARNING_DOC = `
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

    test('1.a) Lenient mode: Outputs warnings and errors normally.', () => {
        // Arrange.

        // Act.
        const result = YINI.parse(ERROR_DOC + WARNING_DOC, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            // silent: true,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
    })

    test(`1.b) Lenient mode: Outputs warnings and errors normally, when 'silent' flag IS NOT set.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(ERROR_DOC + WARNING_DOC, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: false,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
    })

    test(`1.c) Lenient mode: Does not output anything, when 'silent' flag set, on an error or warning.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(ERROR_DOC + WARNING_DOC, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: true,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    test(`2.a) Lenient mode: Does not output anything, when 'silent' flag set, on an error.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(ERROR_DOC, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: true,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    test(`2.b) Lenient mode: Does not output anything, when 'silent' flag set, on an warning.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(WARNING_DOC, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: true,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    test(`2.c) Lenient mode: Does output only error, when NO 'silent' flag, on an error.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(ERROR_DOC, {
            failLevel: 'ignore-errors',
            // requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: false,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    test(`2.d) Lenient mode: Does output only warning, when NO 'silent' flag, on an warning.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(WARNING_DOC, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: false,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
    })

    xtest(`3.a) Strict mode: Does not output anything, when 'silent' flag set, on an error.`, () => {
        // Arrange.

        // Act.
        // let result: any
        // try {
        const result = YINI.parse(ERROR_STRICT_DOC, {
            requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: true,
            // includeMetadata: false,
        })
        // } catch (err) {
        //     debugPrint('Did throw')
        // }
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    xtest(`3.b) Strict mode: Does not output anything, when 'silent' flag set, on an warning.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(WARNING_DOC, {
            requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: true,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    xtest(`3.c) Strict mode: Does output only error, when NO 'silent' flag, on an error.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(ERROR_STRICT_DOC, {
            // requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: false,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    xtest(`3.d) Strict mode: Does output only warning, when NO 'silent' flag, on an warning.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(WARNING_DOC, {
            requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: false,
            // includeMetadata: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
    })
})
