import YINI, { YiniParseResult } from '../../../src'

const ERROR_DOC = `
    ^ Section1
    333="oops"   // invalid key => error
`

const WARNING_DOC = `
    ^ Section2
    // => warning, if requireDocTerminator: 'warn-if-missing'
`

describe('Library diagnostic output contract:', () => {
    let errSpy: jest.SpyInstance
    let warnSpy: jest.SpyInstance
    let logSpy: jest.SpyInstance
    let infoSpy: jest.SpyInstance

    beforeEach(() => {
        errSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
        warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
        infoSpy = jest.spyOn(console, 'info').mockImplementation(() => {})
    })

    afterEach(() => {
        jest.restoreAllMocks()
    })

    test('does not write diagnostics to stdout or stderr by default.', () => {
        const result = YINI.parse(ERROR_DOC + WARNING_DOC, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
        })

        expect(result).toBeDefined()
        expect(logSpy).not.toHaveBeenCalled()
        expect(infoSpy).not.toHaveBeenCalled()
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    test('returns structured diagnostics when diagnostics are requested.', () => {
        const result = YINI.parse(ERROR_DOC + WARNING_DOC, {
            includeDiagnostics: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
        }) as YiniParseResult

        expect(result.meta).toBeDefined()
        expect(result.meta.diagnostics).toBeDefined()
        expect(result.meta.diagnostics!.errors.errorCount).toBeGreaterThan(0)
        expect(result.meta.diagnostics!.warnings.warningCount).toBeGreaterThan(
            0,
        )
        expect(logSpy).not.toHaveBeenCalled()
        expect(infoSpy).not.toHaveBeenCalled()
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    test('writes diagnostics to stderr only when explicitly requested.', () => {
        const result = YINI.parse(ERROR_DOC + WARNING_DOC, {
            logDiagnostics: true,
            includeDiagnostics: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
        }) as YiniParseResult

        expect(result.meta.diagnostics!.errors.errorCount).toBeGreaterThan(0)
        expect(result.meta.diagnostics!.warnings.warningCount).toBeGreaterThan(
            0,
        )
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
        expect(logSpy).not.toHaveBeenCalled()
        expect(infoSpy).not.toHaveBeenCalled()
    })

    test('silent suppresses diagnostics even when stderr logging is requested.', () => {
        const result = YINI.parse(ERROR_DOC + WARNING_DOC, {
            logDiagnostics: true,
            silent: true,
            includeDiagnostics: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
        }) as YiniParseResult

        expect(result.meta.diagnostics!.errors.errorCount).toBeGreaterThan(0)
        expect(result.meta.diagnostics!.warnings.warningCount).toBeGreaterThan(
            0,
        )
        expect(logSpy).not.toHaveBeenCalled()
        expect(infoSpy).not.toHaveBeenCalled()
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
    })

    test('quiet limits opt-in stderr diagnostics to errors.', () => {
        const result = YINI.parse(ERROR_DOC + WARNING_DOC, {
            logDiagnostics: true,
            quiet: true,
            includeDiagnostics: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
        }) as YiniParseResult

        expect(result.meta.diagnostics!.errors.errorCount).toBeGreaterThan(0)
        expect(result.meta.diagnostics!.warnings.warningCount).toBeGreaterThan(
            0,
        )
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(logSpy).not.toHaveBeenCalled()
        expect(infoSpy).not.toHaveBeenCalled()
    })
})
