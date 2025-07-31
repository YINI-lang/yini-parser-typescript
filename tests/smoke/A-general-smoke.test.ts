import path from 'path'
import YINI from '../../src'
import { isDebug, isDev, isDevEnv, isProdEnv } from '../../src/config/env'
import { debugPrint, printObject } from '../../src/utils/print'
import { parseYINI } from '../test-helpers'

/**
 * Environment Smoke Tests.
 */
xdescribe('Environment Smoke Tests:', () => {
    test('1. Check that envs and flags are defaulted to production.', () => {
        // Arrange.
        // process.env['APP_ENV'] = undefined
        // Act.
        // parseYINI('^Section')
        // const { localNodeEnv, localAppEnv } = initEnvs()
        // initEnvs()
        // Assert.
        // expect(isProdEnv()).toEqual(true)
        // expect(isDevEnv()).toEqual(false)
        // expect(isDev()).toEqual(false)
        // expect(isDebug()).toEqual(false)
        // expect(localAppEnv).toEqual('production')
    })
})

/**
 * General Smoke Tests.
 */
describe('General Smoke Tests:', () => {
    const DIR_OF_FIXTURES = '../fixtures/smoke-fixtures/strings-with-paths'
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

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
        const result = parseYINI(validYini)
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
            parseYINI(fixture)
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
            parseYINI(fixture)
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
            parseYINI(fixture)
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
        const result = parseYINI(fixture)
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

    test('9. Correctly parse paths with quotes and forward slash "/".', () => {
        // Arrange.
        const fileName = 'paths-w-quotes-and-slash.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        expect(result.PathsWithQuotesSlash.path1).toEqual(
            "/'My Folder'/Documents/file.txt",
        )
        expect(result.PathsWithQuotesSlash.path2).toEqual('/"data"/set.csv')
        expect(result.PathsWithQuotesSlash.path3).toEqual('/`Projects`/Code/') // NOTE: Has backticks!

        expect(result.PathsWithQuotesSlash.path1).not.toEqual('*')
    })

    test('10. Correctly parse paths with quotes and backslash "\\".', () => {
        const DIR_OF_FIXTURES = '../fixtures/smoke-fixtures/strings-with-paths'
        const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

        // Arrange.
        const fileName = 'paths-w-quotes-and-backslash.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        expect(result.PathsWithQuotesBackslash.path1).toEqual(
            "\\'Program Files'\\App\\",
        )
        expect(result.PathsWithQuotesBackslash.path2).toEqual(
            '\\"user name"\\Desktop\\',
        )
        expect(result.PathsWithQuotesBackslash.path3).toEqual(
            '\\Projects\\\`2024\`\\"Quarter 2"\\',
        ) // NOTE: Has backticks!

        expect(result.PathsWithQuotesBackslash.path1).not.toEqual('*')
    })

    test('11. Throw error if using section repeating markers higher than supported.', () => {
        // Arrange.
        const fixture1 = `^ Section1
            ^^ Section2
            ^^^ Section3
            ^^^^ Section4
            ^^^^^ Section5
            ^^^^^^ Section6 // Section 6.
            strVar = "These section headers are valid!"
        `
        const fixture2 = `^ Section1
            ^^ Section2
            ^^^ Section3
            ^^^^ Section4
            ^^^^^ Section5
            ^^^^^^ Section6 // Section 6.
            ^^^^^^^ Section7 // INVALID HEADER MARKER!
            strVar = "^^^^^^^ (7) is invalid"
        `

        // Act.
        const result1 = parseYINI(fixture1)
        isDebug() && printObject(result1)

        // Assert.
        expect(!!result1).toEqual(true)
        expect(
            result1.Section1.Section2.Section3.Section4.Section5.Section6
                .strVar,
        ).toBe('These section headers are valid!')

        // Act & Assert.
        expect(() => {
            parseYINI(fixture2)
        }).toThrow()
    })

    test('12. Should throw error if parsing an incorrect hash comment.', () => {
        // Arrange.
        const invalidYini = `^ App
            id = 32403  #This hash comment is invalid due to a missing space.
            title = "My Program"
        `

        // Act & Assert.
        expect(() => {
            parseYINI(invalidYini)
        }).toThrow()
    })

    test('13. Correctly parse a YINI with a hash comment.', () => {
        // Arrange.
        const validYini = `^ App
            id = 32403  # The correct app id.
            title = "My Program"
        `
        // Act.
        isDebug() && printObject(validYini)
        const result = parseYINI(validYini)
        debugPrint(result)
        // Assert.
        expect(result.App.id).toEqual(32403)
        expect(result.App.title).toEqual('My Program')
    })

    test('14. Correctly parse a YINI enclosed in comments.', () => {
        // Arrange.
        const validYini = `
// This whole line is a comment.
            ^SectionName# This part is a comment.
            // This whole line is a comment.
        `
        // Act.
        isDebug() && printObject(validYini)
        const result = parseYINI(validYini)
        isDebug() && printObject(result)

        // Assert.
        expect(result).toHaveProperty('SectionName')

        //@todo Fix issue that the below value will correctly be {} and not undefined
        //expect(result.SectionName).toEqual({})
    })

    test('15. Should throw error due to illegal section name.', () => {
        // Arrange.
        const invalidYini = `// Should detect illegal section name 2SubSub1!!
        ^ App
            ^^ SubSect
                ^^^ 2SubSub1 // NOT OK, illegal name!
                valueSS1 = "Something."
                valueSS2 = OFF
        `

        // Act & Assert.
        expect(() => {
            parseYINI(invalidYini)
            debugPrint(invalidYini)
        }).toThrow()
    })

    test('16. Should throw error due to illegal section name.', () => {
        // Arrange.
        const invalidYini = `// Should detect illegal section name 2SubSub1!!
        ^ App
            ^^ \` lsdfkj lj\`
                ^^^ 2SubSub1 // NOT OK, illegal name!
                valueSS1 = "Something."
                valueSS2 = OFF
        `

        // Act & Assert.
        expect(() => {
            parseYINI(invalidYini)
            debugPrint(invalidYini)
        }).toThrow()
    })
})
