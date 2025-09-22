import YINI, { YiniParseResult } from '../../../src'
import { debugPrint } from '../../../src/utils/print'

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
 * Option 'silent' + metadata tests.
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
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    test(`2.c) Lenient mode: Does output only error, when 'silent' is false, on an error.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(ERROR_DOC, {
            failLevel: 'ignore-errors',
            strictMode: false,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    test(`2.d) Lenient mode: Does output only warning, when 'silent' is false, on an warning.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(WARNING_DOC, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
    })

    test(`3.a) Strict mode: Does not output anything, when 'silent' flag set, on an error.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(ERROR_STRICT_DOC, {
            throwOnError: false,
            requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: true,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    test(`3.b) Strict mode: Does not output anything, when 'silent' flag set, on an warning.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(WARNING_DOC, {
            requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: true,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    test(`3.c) Strict mode: Does output only error, when 'silent' is false, on an error.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(ERROR_STRICT_DOC, {
            throwOnError: false,
            strictMode: true,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        //@todo Enable below when this warning is not shown anylonger "Syntax warning in inline YINI content", v1.2.0-beta, 20250922
        //expect(warnSpy).not.toHaveBeenCalled()
    })

    test(`3.d) Strict mode: Does output only warning, when 'silent' is false, on an warning.`, () => {
        // Arrange.

        // Act.
        const result = YINI.parse(WARNING_DOC, {
            requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
    })

    // --- Metadata should still be unaffected.

    test('4.a) Lenient mode + metadata still intact: Outputs warnings and errors normally.', () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_DOC + WARNING_DOC, {
            includeMetadata: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
        expect(result.meta.totalErrors).toBeGreaterThanOrEqual(1)
        expect(result.meta.totalWarnings).toBeGreaterThanOrEqual(1)
    })

    test(`4.b) Lenient mode + metadata still intact: Outputs warnings and errors normally, when 'silent' flag IS NOT set.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_DOC + WARNING_DOC, {
            includeMetadata: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
        expect(result.meta.totalErrors).toBeGreaterThanOrEqual(1)
        expect(result.meta.totalWarnings).toBeGreaterThanOrEqual(1)
    })

    test(`4.c) Lenient mode + metadata still intact: Does not output anything, when 'silent' flag set, on an error or warning.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_DOC + WARNING_DOC, {
            includeMetadata: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: true,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(result.meta.totalErrors).toBeGreaterThanOrEqual(1)
        expect(result.meta.totalWarnings).toBeGreaterThanOrEqual(1)
    })

    test(`5.a) Lenient mode + metadata still intact: Does not output anything, when 'silent' flag set, on an error.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_DOC, {
            includeMetadata: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: true,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(result.meta.totalErrors).toBeGreaterThanOrEqual(1)
        expect(result.meta.totalWarnings).toBeGreaterThanOrEqual(0)
    })

    test(`5.b) Lenient mode + metadata still intact: Does not output anything, when 'silent' flag set, on an warning.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(WARNING_DOC, {
            includeMetadata: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: true,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(result.meta.totalErrors).toBeGreaterThanOrEqual(0)
        expect(result.meta.totalWarnings).toBeGreaterThanOrEqual(1)
    })

    test(`5.c) Lenient mode + metadata still intact: Does output only error, when 'silent' is false, on an error.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_DOC, {
            includeMetadata: true,
            failLevel: 'ignore-errors',
            strictMode: false,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(result.meta.totalErrors).toBeGreaterThanOrEqual(1)
        expect(result.meta.totalWarnings).toBeGreaterThanOrEqual(0)
    })

    test(`5.d) Lenient mode + metadata still intact: Does output only warning, when 'silent' is false, on an warning.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(WARNING_DOC, {
            includeMetadata: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
        expect(result.meta.totalErrors).toBeGreaterThanOrEqual(0)
        expect(result.meta.totalWarnings).toBeGreaterThanOrEqual(1)
    })

    test(`6.a) Strict mode + metadata still intact: Does not output anything, when 'silent' flag set, on an error.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_STRICT_DOC, {
            includeMetadata: true,
            throwOnError: false,
            requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: true,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(result.meta.totalErrors).toBeGreaterThanOrEqual(1)
        expect(result.meta.totalWarnings).toBeGreaterThanOrEqual(0)
    })

    test(`6.b) Strict mode + metadata still intact: Does not output anything, when 'silent' flag set, on an warning.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(WARNING_DOC, {
            includeMetadata: true,
            requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: true,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(result.meta.totalErrors).toBeGreaterThanOrEqual(0)
        expect(result.meta.totalWarnings).toBeGreaterThanOrEqual(1)
    })

    test(`6.c) Strict mode + metadata still intact: Does output only error, when 'silent' is false, on an error.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_STRICT_DOC, {
            includeMetadata: true,
            throwOnError: false,
            strictMode: true,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        //@todo Enable below when this warning is not shown anylonger "Syntax warning in inline YINI content", v1.2.0-beta, 20250922
        //expect(warnSpy).not.toHaveBeenCalled()
        expect(result.meta.totalErrors).toBeGreaterThanOrEqual(1)
        expect(result.meta.totalWarnings).toBeGreaterThanOrEqual(0)
    })

    test(`6.d) Strict mode + metadata still intact: Does output only warning, when 'silent' is false, on an warning.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(WARNING_DOC, {
            includeMetadata: true,
            requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
        expect(result.meta.totalErrors).toBeGreaterThanOrEqual(0)
        expect(result.meta.totalWarnings).toBeGreaterThanOrEqual(1)
    })

    // --- Diagnostics metadata should still be unaffected.

    test('7.a) Lenient mode + diagnostics still intact: Outputs warnings and errors normally.', () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_DOC + WARNING_DOC, {
            includeMetadata: true,
            includeDiagnostics: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
        expect(
            result.meta.diagnostics!.errors.errorCount,
        ).toBeGreaterThanOrEqual(1)
        expect(
            result.meta.diagnostics!.warnings.warningCount,
        ).toBeGreaterThanOrEqual(1)
    })

    test(`7.b) Lenient mode + diagnostics still intact: Outputs warnings and errors normally, when 'silent' flag IS NOT set.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_DOC + WARNING_DOC, {
            includeMetadata: true,
            includeDiagnostics: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
        expect(
            result.meta.diagnostics!.errors.errorCount,
        ).toBeGreaterThanOrEqual(1)
        expect(
            result.meta.diagnostics!.warnings.warningCount,
        ).toBeGreaterThanOrEqual(1)
    })

    test(`7.c) Lenient mode + diagnostics still intact: Does not output anything, when 'silent' flag set, on an error or warning.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_DOC + WARNING_DOC, {
            includeMetadata: true,
            includeDiagnostics: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: true,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(
            result.meta.diagnostics!.errors.errorCount,
        ).toBeGreaterThanOrEqual(1)
        expect(
            result.meta.diagnostics!.warnings.warningCount,
        ).toBeGreaterThanOrEqual(1)
    })

    test(`8.a) Lenient mode + diagnostics still intact: Does not output anything, when 'silent' flag set, on an error.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_DOC, {
            includeMetadata: true,
            includeDiagnostics: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: true,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(
            result.meta.diagnostics!.errors.errorCount,
        ).toBeGreaterThanOrEqual(1)
        expect(
            result.meta.diagnostics!.warnings.warningCount,
        ).toBeGreaterThanOrEqual(1)
    })

    test(`8.b) Lenient mode + diagnostics still intact: Does not output anything, when 'silent' flag set, on an warning.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(WARNING_DOC, {
            includeMetadata: true,
            includeDiagnostics: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: true,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(
            result.meta.diagnostics!.errors.errorCount,
        ).toBeGreaterThanOrEqual(0)
        expect(
            result.meta.diagnostics!.warnings.warningCount,
        ).toBeGreaterThanOrEqual(0)
    })

    test(`8.c) Lenient mode + diagnostics still intact: Does output only error, when 'silent' is false, on an error.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_DOC, {
            includeMetadata: true,
            includeDiagnostics: true,
            failLevel: 'ignore-errors',
            strictMode: false,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(
            result.meta.diagnostics!.errors.errorCount,
        ).toBeGreaterThanOrEqual(1)
        expect(
            result.meta.diagnostics!.warnings.warningCount,
        ).toBeGreaterThanOrEqual(0)
    })

    test(`8.d) Lenient mode + diagnostics still intact: Does output only warning, when 'silent' is false, on an warning.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(WARNING_DOC, {
            includeMetadata: true,
            includeDiagnostics: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
        expect(
            result.meta.diagnostics!.errors.errorCount,
        ).toBeGreaterThanOrEqual(0)
        expect(
            result.meta.diagnostics!.warnings.warningCount,
        ).toBeGreaterThanOrEqual(1)
    })

    test(`9.a) Strict mode + diagnostics still intact: Does not output anything, when 'silent' flag set, on an error.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_STRICT_DOC, {
            includeMetadata: true,
            includeDiagnostics: true,
            throwOnError: false,
            requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: true,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(
            result.meta.diagnostics!.errors.errorCount,
        ).toBeGreaterThanOrEqual(1)
        expect(
            result.meta.diagnostics!.warnings.warningCount,
        ).toBeGreaterThanOrEqual(1)
    })

    test(`9.b) Strict mode + diagnostics still intact: Does not output anything, when 'silent' flag set, on an warning.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(WARNING_DOC, {
            includeMetadata: true,
            includeDiagnostics: true,
            requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: true,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(
            result.meta.diagnostics!.errors.errorCount,
        ).toBeGreaterThanOrEqual(0)
        expect(
            result.meta.diagnostics!.warnings.warningCount,
        ).toBeGreaterThanOrEqual(1)
    })

    test(`9.c) Strict mode + diagnostics still intact: Does output only error, when 'silent' is false, on an error.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(ERROR_STRICT_DOC, {
            includeMetadata: true,
            includeDiagnostics: true,
            throwOnError: false,
            strictMode: true,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).toHaveBeenCalled()
        //@todo Enable below when this warning is not shown anylonger "Syntax warning in inline YINI content", v1.2.0-beta, 20250922
        //expect(warnSpy).not.toHaveBeenCalled()
        expect(
            result.meta.diagnostics!.errors.errorCount,
        ).toBeGreaterThanOrEqual(1)
        expect(
            result.meta.diagnostics!.warnings.warningCount,
        ).toBeGreaterThanOrEqual(1)
    })

    test(`9.d) Strict mode + diagnostics still intact: Does output only warning, when 'silent' is false, on an warning.`, () => {
        // Arrange.

        // Act.
        const result: YiniParseResult = YINI.parse(WARNING_DOC, {
            includeMetadata: true,
            includeDiagnostics: true,
            requireDocTerminator: 'warn-if-missing',
            strictMode: true,
            silent: false,
        })
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
        expect(
            result.meta.diagnostics!.errors.errorCount,
        ).toBeGreaterThanOrEqual(0)
        expect(
            result.meta.diagnostics!.warnings.warningCount,
        ).toBeGreaterThanOrEqual(1)
    })
})
