import path from 'path'
import YINI from '../../src'
import { debugPrint } from '../../src/utils/system'

const DIR_OF_FIXTURES = './fixtures/valid/single-section-member-w-mixed-casing'

/**
 * Parse File/Inline Error Tests.
 */
describe('Parse File/Inline Error Tests:', () => {
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
            YINI.parse(fixture)
        }).toThrow()
    })

    test('2. Should throw error if parsing nothing ("").', () => {
        // Arrange.
        const fixture = '' // (!) Blank!

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('3. Should throw error if parsing only whitespaces.', () => {
        // Arrange.
        const fixture = '      \t  \n  ' // (!) Only whitepaces!

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('4. Should throw error if parsing invalid characters (£ÆŁ).', () => {
        // Arrange.
        const fixture = `^ sectionTitle
            key £ÆŁ 321 // Double = is an error!`

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('5. Should throw error if parsing unknown file name.', () => {
        // Arrange.
        const fullPath = './gibberish-file-name'

        // Act & Assert.
        expect(() => {
            debugPrint('fullPath = ' + fullPath)
            YINI.parseFile(fullPath)
        }).toThrow()
    })

    test('6. Should throw error if parsing blank file name ("").', () => {
        // Arrange.
        const fullPath = '' // (!) Blank!

        // Act & Assert.
        expect(() => {
            debugPrint('fullPath = ' + fullPath)
            YINI.parseFile(fullPath)
        }).toThrow()
    })
})

/**
 * Parse-File with Mixed Case Filename.
 */
describe('Parse-File with Mixed Case Filename:', () => {
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

/**
 * Parse-File with Mixed Case Filename.
 */
describe('Check File Extensions:', () => {
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
