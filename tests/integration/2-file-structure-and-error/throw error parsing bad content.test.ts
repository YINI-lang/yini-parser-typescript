import path from 'path'
import YINI from '../../../src'
import { debugPrint } from '../../../src/utils/print'

const DIR_OF_FIXTURES =
    '../../fixtures/valid/single-section-member-w-mixed-casing'

/**
 * Throw error when parsing bad file/inline content tests.
 */
describe('Throw error when parsing bad file/inline content tests:', () => {
    beforeAll(() => {})
    beforeAll(() => {
        debugPrint('beforeAll')

        // const isDebug = !!process.env.IS_DEBUG
        // if (!isDebug) {
        //     console.log('process.env.IS_DEBUG is false, OK')
        // } else {
        //     console.error('process.env.IS_DEBUG is true, FAIL')
        //     console.error(
        //         'Detected that IS_DEBUG is true, is should be false when testing',
        //     )
        //     console.error('process.env.IS_DEBUG:')
        //     console.error(process.env.IS_DEBUG)

        //     throw Error('ERROR: A variable in ENV has wrong state')
        // }
    })

    test('1. Should throw error if parsing some garbage.', () => {
        // Arrange.
        const fixture = `someGarbage`

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture, { bailSensitivity: 1 })
        }).toThrow()
    })

    test('2. Should throw error if parsing nothing ("").', () => {
        // Arrange.
        const fixture = '' // (!) Blank!

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture, { bailSensitivity: 1 })
        }).toThrow()
    })

    test('3. Should throw error if parsing only whitespaces.', () => {
        // Arrange.
        const fixture = '      \t  \n  ' // (!) Only whitepaces!

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture, { bailSensitivity: 1 })
        }).toThrow()
    })

    test('4. Should throw error if parsing invalid characters (£ÆŁ).', () => {
        // Arrange.
        const fixture = `^ sectionTitle
            key £ÆŁ 321 // Double = is an error!`

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture, { bailSensitivity: 1 })
        }).toThrow()
    })

    test('5. Should throw error if parsing unknown file name.', () => {
        // Arrange.
        const fullPath = './gibberish-file-name'

        // Act & Assert.
        expect(() => {
            debugPrint('fullPath = ' + fullPath)
            YINI.parseFile(fullPath, { bailSensitivity: 1 })
        }).toThrow()
    })

    test('6. Should throw error if parsing blank file name ("").', () => {
        // Arrange.
        const fullPath = '' // (!) Blank!

        // Act & Assert.
        expect(() => {
            debugPrint('fullPath = ' + fullPath)
            YINI.parseFile(fullPath, { bailSensitivity: 1 })
        }).toThrow()
    })
})
