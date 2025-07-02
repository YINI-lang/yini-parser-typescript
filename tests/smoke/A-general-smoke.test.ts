import path from 'path'
import YINI from '../../src'
import { debugPrint } from '../../src/utils/system'

/**
 * General Smoke Tests.
 */
describe('General Smoke Tests:', () => {
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

    // Trivial test to see if everything is okey before moving on to "real" tests.
    test('1. Trivial test case.', () => {
        // Arrange.
        const a = 3
        const b = 5
        // Act.
        const result = a + b
        // Assert.
        expect(result).toEqual(8)
    })

    test('2. Correctly parse a short YINI Example.', () => {
        // Arrange.
        const validYini = `^ sectionTitle
            strVar = "Hello World!"
            intVar = 98.21`
        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)
        // Assert.
        expect(result.sectionTitle.strVar).toEqual('Hello World!')
        expect(result.sectionTitle.intVar).toEqual(98.21)
    })

    test('3. Should throw error if parsing some "garbage".', () => {
        // Arrange.
        const fixture = `someGarbage`

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('4. Should throw error if parsing lines of "invalid" content.', () => {
        // Arrange.
        const fixture = `
            古池や蛙飛び込む水の音
            ふるいけやかわずとびこむみずのおと
            furu ike ya kawazu tobikomu mizu no oto
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('5. Should throw error if parsing unknown file name.', () => {
        // Arrange.
        const fullPath = 'gibberish-path-and-file-name'

        // Act & Assert.
        expect(() => {
            debugPrint('fullPath = ' + fullPath)
            YINI.parseFile(fullPath)
        }).toThrow()
    })

    test('6. Should throw error if parsing "blank" content.', () => {
        // Arrange.
        const fixture = ' ' // NOTE: Only a blank space!

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('7. Correctly parse paths with forward slash "/".', () => {
        // Arrange.
        const fixture = `^ PathsWithSlash
        path1 = '/'
        path2 = '/etc'
        path3 = 'etc/'
        path4 = 'folder/subfolder'
        path5 = '/usr/local/bin/'
        `

        // Act.
        const result = YINI.parse(fixture)
        debugPrint(result)

        // Assert.
        expect(result.PathsWithSlash.path1).toEqual('/')
        expect(result.PathsWithSlash.path2).toEqual('/etc')
        expect(result.PathsWithSlash.path3).toEqual('etc/')
        expect(result.PathsWithSlash.path4).toEqual('folder/subfolder')
        expect(result.PathsWithSlash.path5).toEqual('/usr/local/bin/')
        expect(result.PathsWithSlash.path1).not.toEqual('*')
    })

    test('8. Correctly parse paths with backslash "\\".', () => {
        const DIR_OF_FIXTURES = '../fixtures/smoke-fixtures/strings-with-paths'
        const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

        // Arrange.
        const fileName = 'PathsWithBackslash.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        expect(result.PathsWithBackslash.path1).toEqual('\\')
        expect(result.PathsWithBackslash.path2).toEqual('\\Temp')
        expect(result.PathsWithBackslash.path3).toEqual('Temp\\')
        expect(result.PathsWithBackslash.path4).toEqual('Windows\\System32')
        expect(result.PathsWithBackslash.path5).toEqual(
            '\\Users\\Public\\Documents\\',
        )
        expect(result.PathsWithBackslash.path1).not.toEqual('*')
    })
})
