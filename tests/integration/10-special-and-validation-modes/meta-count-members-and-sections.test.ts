import path from 'path'
import YINI from '../../../src'
import { isDebug } from '../../../src/config/env'
import { debugPrint, printObject } from '../../../src/utils/print'

const DIR_OF_FIXTURES = '../../fixtures/valid/level-two-deep'

/**
 * Correctly count the metadata for members and sections tests.
 */
describe('Correctly count the metadata for members and sections:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    beforeAll(() => {})

    // @TODO Implement check that checks the counts of sections and members are correct per file...
    xtest('1. Give correct meta info of number of members and sections.', () => {
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
})
