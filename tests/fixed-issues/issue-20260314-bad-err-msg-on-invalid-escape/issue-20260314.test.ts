// tests/fixed-issues/issue-20260314-bad-err-msg-on-invalid-escape/issue-20260314.test.ts
import path from 'path'
import YINI from '../../../src'
import { debugPrint } from '../../../src/utils/print'

const DIR_OF_FIXTURES = './'

const invalidEscaping = `@yini
^ App
name = "Nebula Server"

^ Logging
file = c"F:\\logs\\nebula\\app.log" // INCORRECT! Use of escapes!

isLog = true
`

/**
 * Tests for issue 20260314 bad-err-msg-on-invalid-escape.
 */
describe('Issue 20260314 error-msg-on-invalid-escape Tests:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)
    const fileName = 'invalid-escape-20260314.yini'
    const fullPath = path.join(baseDir, fileName)

    let errorSpy: jest.SpyInstance
    let logSpy: jest.SpyInstance
    let warnSpy: jest.SpyInstance

    beforeEach(() => {
        errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
        logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})
        warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
        errorSpy.mockRestore()
        logSpy.mockRestore()
        warnSpy.mockRestore()
    })

    test('1.a) (inline) Should report invalid escape sequence in a C-string.', () => {
        const result = YINI.parse(invalidEscaping, { strictMode: false })

        expect(result).toBeDefined()
        expect(errorSpy).toHaveBeenCalled()

        const allOutput = [
            ...errorSpy.mock.calls.flat(),
            ...logSpy.mock.calls.flat(),
            ...warnSpy.mock.calls.flat(),
        ].join('\n')

        expect(allOutput).toMatch(/syntax error/i)
        expect(allOutput).toMatch(/invalid escape sequence/i)
        expect(allOutput).toMatch(/line/i)
        expect(allOutput).toMatch(/column/i)
        expect(allOutput).not.toMatch(/XXX/i)
    })

    test('1.b) (inline) Should continue parsing in ignore-errors mode.', () => {
        const result = YINI.parse(invalidEscaping, {
            strictMode: false,
            failLevel: 'ignore-errors',
        })

        expect(result).toBeDefined()

        const allOutput = [
            ...errorSpy.mock.calls.flat(),
            ...logSpy.mock.calls.flat(),
            ...warnSpy.mock.calls.flat(),
        ].join('\n')

        expect(allOutput).toMatch(/invalid escape sequence/i)
        expect(allOutput).not.toMatch(/XXX/i)
    })

    test('1.c) (inline) Should report syntax error (incl. line and column) for invalid escape in a C-String.', () => {
        try {
            YINI.parse(invalidEscaping, { strictMode: false })
        } catch (err: any) {
            expect(err.message).toMatch(/Syntax error/i)
            expect(err.message).toMatch(/invalid escape sequence/i)
            expect(err.message).toMatch(/line/i)
            expect(err.message).toMatch(/column/i)
        }
    })

    test('1.d) (inline) Should report error for invalid escape but still continue parsing.', () => {
        const errorSpy = jest
            .spyOn(console, 'error')
            .mockImplementation(() => {})
        const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

        const result = YINI.parse(invalidEscaping, {
            strictMode: false,
            failLevel: 'ignore-errors',
        })

        expect(result?.App?.name).toEqual('Nebula Server')
        expect(errorSpy).toHaveBeenCalled()

        const allOutput = [
            ...errorSpy.mock.calls.flat(),
            ...logSpy.mock.calls.flat(),
        ].join('\n')

        expect(allOutput).toMatch(/invalid value/i)
        expect(allOutput).toMatch(/badEscape|file/i)
        expect(allOutput).not.toMatch(/XXX/i)

        errorSpy.mockRestore()
        logSpy.mockRestore()
    })

    test('2.a) (file) Should report invalid escape sequence in a C-string.', () => {
        const result = YINI.parseFile(fullPath, { strictMode: false })

        expect(result).toBeDefined()
        expect(errorSpy).toHaveBeenCalled()

        const allOutput = [
            ...errorSpy.mock.calls.flat(),
            ...logSpy.mock.calls.flat(),
            ...warnSpy.mock.calls.flat(),
        ].join('\n')

        expect(allOutput).toMatch(/syntax error/i)
        expect(allOutput).toMatch(/invalid escape sequence/i)
        expect(allOutput).toMatch(/line/i)
        expect(allOutput).toMatch(/column/i)
        expect(allOutput).not.toMatch(/XXX/i)
    })

    test('2.b) (file) Should continue parsing in ignore-errors mode.', () => {
        const result = YINI.parseFile(fullPath, {
            strictMode: false,
            failLevel: 'ignore-errors',
        })

        expect(result).toBeDefined()

        const allOutput = [
            ...errorSpy.mock.calls.flat(),
            ...logSpy.mock.calls.flat(),
            ...warnSpy.mock.calls.flat(),
        ].join('\n')

        expect(allOutput).toMatch(/invalid escape sequence/i)
        expect(allOutput).not.toMatch(/XXX/i)
    })
})
