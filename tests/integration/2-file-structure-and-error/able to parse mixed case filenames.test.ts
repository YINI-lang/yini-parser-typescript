import path from 'path'
import YINI from '../../../src'
import { debugPrint } from '../../../src/utils/print'

const DIR_OF_FIXTURES =
    '../../fixtures/valid/single-section-member-w-mixed-casing'

/**
 * Able to parse filename (+ext.) with mixed case tests.
 */
describe('Able to parse filename (+ext.) with mixed case tests:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    beforeAll(() => {})

    test('1. Parse a value from file "single-section-member-1.yini".', () => {
        // Arrange.
        const fileName = 'single-section-member-1.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
        expect(result.unknownKey).toEqual(undefined)
        expect(result.general.name).toEqual('Kim')
    })

    test('2. Parse a value from file "SINGLE-SECTION-MEMBER-2.YINI".', () => {
        // Arrange.
        const fileName = 'SINGLE-SECTION-MEMBER-2.YINI'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
        expect(result.APP.IS_DARK_THEME).toEqual(true)
    })

    test('3. Parse a value from file "Single-Section-Member-3.Yini".', () => {
        // Arrange.
        const fileName = 'Single-Section-Member-3.Yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
        expect(result.Title.Id).toEqual(46568)
    })

    test('4. Parse a value from file "singleSectionMember-4.yINI".', () => {
        // Arrange.
        const fileName = 'singleSectionMember-4.yINI'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
        expect(result.appConfig.ratio).not.toEqual(0)
        expect(result.appConfig.ratio).not.toEqual(1)
        expect(result.appConfig.ratio).not.toEqual(0.255)
        expect(result.appConfig.ratio).toEqual(0.25)
    })
})
