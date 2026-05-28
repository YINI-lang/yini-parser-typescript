import path from 'path'
import YINI, { YiniParseResult } from '../../../src'
import { debugPrint } from '../../../src/utils/print'

const DIR_OF_FIXTURES = './'

/**
 * Tests for issue #30.
 */
describe('Issue #30 Tests:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)
    const fileName = 'has-no-newline-at-EOF.yini'

    test('1.a) Should succeed and report a structured warning upon parsing a file missing newline at EOF (in lenient mode).', () => {
        // Arrange.
        const fullPath = path.join(baseDir, fileName)
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {}) // Spy on console.warn
        warnSpy.mockClear()

        // Act.
        const result = YINI.parseFile(fullPath, {
            strictMode: false,
            includeDiagnostics: true,
        }) as YiniParseResult
        debugPrint('fullPath = ' + fullPath)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.result.General.outputDir).toEqual('./results')
        expect(warnSpy).not.toHaveBeenCalled()

        const warnings = result.meta.diagnostics!.warnings.payload
        expect(warnings.some((issue) => /newline.*file/i.test(issue.message))).toBe(
            true,
        )
    })

    test('1.b) Should succeed and report a structured warning upon parsing a file missing newline at EOF (in strict mode).', () => {
        // Arrange.
        const fullPath = path.join(baseDir, fileName)
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {}) // Spy on console.warn
        // warnSpy.mockClear()

        // Act.
        const result = YINI.parseFile(fullPath, {
            strictMode: true,
            includeDiagnostics: true,
        }) as YiniParseResult
        debugPrint('fullPath = ' + fullPath)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.result.General.outputDir).toEqual('./results')
        expect(warnSpy).not.toHaveBeenCalled()

        const warnings = result.meta.diagnostics!.warnings.payload
        expect(warnings.some((issue) => /newline.*file/i.test(issue.message))).toBe(
            true,
        )
    })

    test('2.a) Should not warn on valid file with final newline (in lenient mode).', () => {
        // Arrange.
        const fileName = '../../fixtures/valid/common/common-config-2.yini'
        const fullPath = path.join(baseDir, fileName)
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {}) // Spy on console.warn
        warnSpy.mockClear()

        // Act.
        const result = YINI.parseFile(fullPath, false)
        debugPrint('fullPath = ' + fullPath)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.App.pageSize).toEqual(25)
        // expect(warnSpy.mock.calls?.length).toEqual(false) // Expect no calls.
        // expect(warnSpy.mock.calls[0][0]).to(undefined)
        // console.log('warnSpy.mock.calls:')
        // printObject(warnSpy.mock.calls)
        expect(warnSpy).not.toHaveBeenCalled()
    })

    test('2.b) Should not warn on valid file with final newline (in strict mode).', () => {
        // Arrange.
        const fileName =
            '../../fixtures/valid/strict/strict-common-config-4.yini'
        const fullPath = path.join(baseDir, fileName)
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {}) // Spy on console.warn
        warnSpy.mockClear()

        // Act.
        const result = YINI.parseFile(fullPath, true)
        debugPrint('fullPath = ' + fullPath)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.Prog.text.url).toEqual('images/')
        // expect(warnSpy.mock.calls?.length).toEqual(false) // Expect no calls.
        expect(warnSpy).not.toHaveBeenCalled()
    })
})
