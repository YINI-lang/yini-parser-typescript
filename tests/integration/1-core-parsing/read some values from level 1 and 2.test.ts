import path from 'path'
import YINI from '../../../src'
import { debugPrint } from '../../../src/utils/system'

const DIR_OF_FIXTURES = '../../fixtures/valid/level-two-deep'

/**
 * Read correctly some values from level 1 and 2 sections tests.
 */
describe('Read correctly some values from level 1 and 2 sections tests:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    beforeAll(() => {})

    test('1. Read correctly some values from level 1 and 2, from file "single-section-member-1.yini".', () => {
        // Arrange.
        const fileName = 'level-two-deep-1.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.general.name).toEqual('Kim')
        expect(result.general.name).not.toBe('KIM')
        expect(result.general.preferences.avatarMode).toEqual(false)
    })

    test('2. Read correctly some values from level 1 and 2, from file "level-two-deep-2.yini".', () => {
        // Arrange.
        const fileName = 'level-two-deep-2.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
        expect(result.APP.ID).toEqual(8)
        expect(result.APP.EXTRA.FLAG).toEqual(false)
        expect(result.APP.EXTRA.TIME_OUT).toEqual(6000)
        expect(result.APP.EXTRA.TIME_OUT).not.toBe(0)
    })

    test('3. Read correctly some values from level 1 and 2, from file "level-two-deep-3.yini".', () => {
        // Arrange.
        const fileName = 'level-two-deep-3.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
        expect(result.Title.Alpha).toEqual(0.98)
        expect(result.Title.Alpha).not.toBe(98)
        expect(result.Title.AlternativeTitle.Name).toEqual('Some other name')
    })

    test('4. Read correctly some values from level 1 and 2, from file "level-two-deep-4.yini".', () => {
        // Arrange.
        const fileName = 'level-two-deep-4.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
        expect(result.User.username).toEqual('Alice')
        expect(result.User.Preferences.theme).toEqual('classic')
        expect(result.User.Preferences.notifications).toEqual(false)
        expect(result.User.Preferences.notifications).not.toBe('false') // NOTE: A string!
    })
})
