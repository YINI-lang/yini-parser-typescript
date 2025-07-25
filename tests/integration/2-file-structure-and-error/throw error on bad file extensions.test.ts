import path from 'path'
import YINI from '../../../src'
import { debugPrint } from '../../../src/utils/print'

const DIR_OF_FIXTURES =
    '../../fixtures/valid/single-section-member-w-mixed-casing'

/**
 * Throw error on invalid file extensions tests.
 */
describe('Throw error on invalid file extensions tests:', () => {
    const DIR_OF_FIXTURES = './fixtures/invalid'
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    test('Should throw error if invalid file extension-1.', () => {
        // Arrange.
        const fileName = 'invalid-file-extension-1.abcd'
        const fullPath = path.join(baseDir, fileName)

        // Act & Assert.
        expect(() => {
            debugPrint('fullPath = ' + fullPath)
            YINI.parseFile(fullPath)
        }).toThrow()
    })

    test('Should throw error if invalid file extension-2.', () => {
        // Arrange.
        const fileName = 'invalid-file-extension-2.txt'
        const fullPath = path.join(baseDir, fileName)

        // Act & Assert.
        expect(() => {
            debugPrint('fullPath = ' + fullPath)
            YINI.parseFile(fullPath)
        }).toThrow()
    })
})
