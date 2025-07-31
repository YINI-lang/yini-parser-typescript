import path from 'path'
import YINI from '../../../src'
import { debugPrint } from '../../../src/utils/print'
import { parseUntilError } from '../../test-helpers'

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

describe('Additional issue #25 Tests:', () => {
    test('1. Should throw on bad key name.', () => {
        // Arrange.
        const corruptYini = `
        ^ Section
            key = 123
            345= "missing key name" // Bad key name!
        `

        // Act & Assert.
        expect(() => {
            const result = parseUntilError(corruptYini)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('2. Should throw on bad key name.', () => {
        // Arrange.
        const corruptYini = `
        ^ Section
            key = 123
            *** = "missing key name" // Bad key name!
        `

        // Act & Assert.
        expect(() => {
            const result = parseUntilError(corruptYini)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('3. Should throw on double EQ (==).', () => {
        // Arrange.
        const corruptYini = `
        ^ Section
            key = 123
            == "missing key name" // Double EQ not allowed!
        `

        // Act & Assert.
        expect(() => {
            const result = parseUntilError(corruptYini)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4. Should throw on double EQ (==).', () => {
        // Arrange.
        const corruptYini = `
        ^ Section
            key = 123
            key2 == "missing key name" // Double EQ not allowed!
        `

        // Act & Assert.
        expect(() => {
            const result = parseUntilError(corruptYini)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5. Should throw on double EQ (==).', () => {
        // Arrange.
        const corruptYini = `
        ^ Section
            key = 123
            0key == "missing key name" // Bad key name and double EQ not allowed!
        `

        // Act & Assert.
        expect(() => {
            const result = parseUntilError(corruptYini)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6. Should throw on bad key name.', () => {
        // Arrange.
        const corruptYini = `
        ^ Section
            345= "missing key name" // Bad key name!
        `

        // Act & Assert.
        expect(() => {
            const result = parseUntilError(corruptYini)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('7. Should throw on bad key name.', () => {
        // Arrange.
        const corruptYini = `
        ^ Section
            *** = "missing key name" // Bad key name!
        `

        // Act & Assert.
        expect(() => {
            const result = parseUntilError(corruptYini)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('8. Should throw on double EQ (==).', () => {
        // Arrange.
        const corruptYini = `
        ^ Section
            == "missing key name" // Double EQ not allowed!
        `

        // Act & Assert.
        expect(() => {
            const result = parseUntilError(corruptYini)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('9. Should throw on double EQ (==).', () => {
        // Arrange.
        const corruptYini = `
        ^ Section
            key2 == "missing key name" // Double EQ not allowed!
        `

        // Act & Assert.
        expect(() => {
            const result = parseUntilError(corruptYini)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('10. Should throw on double EQ (==).', () => {
        // Arrange.
        const corruptYini = `
        ^ Section
            0key == "missing key name" // Bad key name and double EQ not allowed!
        `

        // Act & Assert.
        expect(() => {
            const result = parseUntilError(corruptYini)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })
})
