import path from 'path'
import YINI from '../../../src'
import { debugPrint } from '../../../src/utils/print'

const DIR_OF_FIXTURES = './'

/**
 * Tests for issue #25.
 */
describe('Issue #25 Tests:', () => {
    // Dir with smoke fixtures.
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)
    const fileName = 'corrupt-missing-key.yini'

    test('1. Should succeed parsing in lenient mode.', () => {
        // Arrange.
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath, false)
        debugPrint('fullPath = ' + fullPath)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.hasOwnProperty('Section')).toEqual(true)
        expect(result.Section.key).toEqual(123)
    })

    test('2. Should throw error in strict mode.', () => {
        // Arrange.
        //const fileName = 'corrupt-missing-key.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act & Assert.
        expect(() => {
            const result = YINI.parseFile(fullPath, true)
            debugPrint('fullPath = ' + fullPath)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })
})
