import path from 'path'
import YINI from '../../../src'
import { debugPrint, printObject } from '../../../src/utils/print'
import { parseUntilError } from '../../test-helpers'

const DIR_OF_FIXTURES = './'

/**
 * Tests for issue #30.
 */
describe('Issue #30 Tests:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)
    const fileName = 'has-no-newline-at-EOF.yini'

    test('1.a) Should succeed but output warning upon parsing a file missing newline at EOF (in lenient mode).', () => {
        // Arrange.
        const fullPath = path.join(baseDir, fileName)
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {}) // Spy on console.warn
        warnSpy.mockClear()

        // Act.
        const result = YINI.parseFile(fullPath, false)
        debugPrint('fullPath = ' + fullPath)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.General.outputDir).toEqual('./results')
        expect(warnSpy).toHaveBeenCalled() // Was console.warn called?

        expect(warnSpy.mock.calls[0][0]).toMatch(/newline.*EOF/i) // Check message content too.
        expect(warnSpy.mock.calls[0][0]).not.toMatch(/XXX.*XXX/i)
    })

    test('1.b) Should succeed but output warning upon parsing a file missing newline at EOF (in strict mode).', () => {
        // Arrange.
        const fullPath = path.join(baseDir, fileName)
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {}) // Spy on console.warn
        // warnSpy.mockClear()

        // Act.
        const result = YINI.parseFile(fullPath, true)
        debugPrint('fullPath = ' + fullPath)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.General.outputDir).toEqual('./results')
        expect(warnSpy).toHaveBeenCalled() // Was console.warn called?

        expect(warnSpy.mock.calls[0][0]).toMatch(/newline.*EOF/i) // Check message content too.
        expect(warnSpy.mock.calls[0][0]).not.toMatch(/XXX.*XXX/i)
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
        expect(result.text.url).toEqual('images/')
        // expect(warnSpy.mock.calls?.length).toEqual(false) // Expect no calls.
        expect(warnSpy.mock.calls[0][0]).not.toMatch(/newline.*EOF/i)
    })
})
