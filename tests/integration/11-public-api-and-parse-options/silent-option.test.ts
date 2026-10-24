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

    test('prints human-readable errors and warnings to stderr by default.', () => {
        const result = YINI.parse(ERROR_DOC + WARNING_DOC, {
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
        })

        expect(result).toBeDefined()
        expect(logSpy).not.toHaveBeenCalled()
        expect(infoSpy).not.toHaveBeenCalled()
        expect(errSpy).toHaveBeenCalledWith(
            expect.stringMatching(/^Syntax error in inline YINI content/),
        )
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringMatching(/^Syntax warning in inline YINI content/),
        )
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
        expect(errSpy).toHaveBeenCalled()
        expect(warnSpy).toHaveBeenCalled()
    })

    test('logDiagnostics: false suppresses printing but keeps structured diagnostics.', () => {
        const result = YINI.parse(ERROR_DOC + WARNING_DOC, {
            logDiagnostics: false,
            includeDiagnostics: true,
            failLevel: 'ignore-errors',
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
        }) as YiniParseResult

        expect(result.meta.diagnostics!.errors.errorCount).toBeGreaterThan(0)
        expect(result.meta.diagnostics!.warnings.warningCount).toBeGreaterThan(
            0,
        )
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(logSpy).not.toHaveBeenCalled()
        expect(infoSpy).not.toHaveBeenCalled()
    })

    test('silent suppresses the default human-readable output.', () => {
        const result = YINI.parse(ERROR_DOC + WARNING_DOC, {
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

    test('quiet limits the default stderr output to errors.', () => {
        const result = YINI.parse(ERROR_DOC + WARNING_DOC, {
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

    test('parseForTooling returns diagnostics without printing them.', () => {
        const parsed = YINI.parseForTooling(ERROR_DOC + WARNING_DOC, {
            requireDocTerminator: 'warn-if-missing',
            strictMode: false,
        })

        expect(parsed.diagnostics.some((item) => item.severity === 'error')).toBe(true)
        expect(parsed.diagnostics.some((item) => item.severity === 'warning')).toBe(true)
        expect(errSpy).not.toHaveBeenCalled()
        expect(warnSpy).not.toHaveBeenCalled()
        expect(logSpy).not.toHaveBeenCalled()
        expect(infoSpy).not.toHaveBeenCalled()
    })
})
