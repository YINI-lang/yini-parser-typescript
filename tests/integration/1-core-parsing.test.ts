import path from 'path'
import YINI from '../../src'
import { debugPrint } from '../../src/utils/system'

const DIR_OF_FIXTURES = '../fixtures/valid/level-two-deep'

/**
 * Parse File/Inline Error Tests.
 */
describe('Parse Inline with Nested Sections:', () => {
    beforeAll(() => {})

    test('1. Should throw error if starting with section (with a member) ^^.', () => {
        // Arrange.
        const fixture = `
        ^^ InvalidHeader // INVALID: Must start with atleast one 1-level section.
        value = 3
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('2. Should throw error if jumping from section (with a member) ^ -> ^^^.', () => {
        // Arrange.
        const fixture = `
        ^ Header1
        value = true
        // BELOW INVALID: Invalid to jump over sections when increasing nesting.
        ^^^ InvalidHeader
        anotherValue = 123
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('3. Should throw error if starting with section (without members) ^^.', () => {
        // Arrange.
        const fixture = `
        ^^ InvalidHeader // INVALID: Must start with atleast one 1-level section.
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('4. Should throw error if jumping from section (without members) ^ -> ^^^.', () => {
        // Arrange.
        const fixture = `
        ^ Header1
        // BELOW INVALID: Invalid to jump over sections when increasing nesting.
        ^^^ InvalidHeader
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('5. Should throw error if starting with section (with a member) ^^^.', () => {
        // Arrange.
        const fixture = `
        ^^^ InvalidHeader // INVALID: Must start with atleast one 1-level section.
        strValue = "5"
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('6. Should throw error if jumping from section (with a member) ^^ -> ^^^^.', () => {
        // Arrange.
        const fixture = `
        ^ Section1
        numValue = 66
        ^^ Section2
        numValue = 662
        // BELOW INVALID: Invalid to jump over sections when increasing nesting.
        ^^^^ InvalidHeader
        anotherValue = 123
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('7. Should throw error if starting with section (without members) ^^^.', () => {
        // Arrange.
        const fixture = `
        ^^^ InvalidHeader // INVALID: Must start with atleast one 1-level section.
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('8. Should throw error if jumping from section (without members) ^^ -> ^^^^.', () => {
        // Arrange.
        const fixture = `
        ^ Section1
        ^^ Section2
        // BELOW INVALID: Invalid to jump over sections when increasing nesting.
        ^^^^ InvalidHeader
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })
})

/**
 * Parse-Files with Level-2 Deep Sections.
 */
describe('Parse Level-2 Deep Sections:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    beforeAll(() => {})

    //@todo Enable when can correctly parse level 2
    xtest('1. Get values from level 1 and 2, from file "single-section-member-1.yini".', () => {
        // Arrange.
        const fileName = 'level-two-deep-1.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        // NOTE: Dry run parsing - enough that something is successfully returned.
        expect(!!result).toEqual(true)
        expect(result.general.name).toEqual('Kim')
        expect(result.general.preferences.avatarMode).toEqual(false)
    })

    //@todo Enable when can correctly parse level 2
    xtest('2. Get values from level 1 and 2, from file "level-two-deep-2.yini".', () => {
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
    })

    //@todo Enable when can correctly parse level 2
    xtest('3. Get values from level 1 and 2, from file "level-two-deep-3.yini".', () => {
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
        expect(result.Title.AlternativeTitle.Name).toEqual('Some other name')
    })

    //@todo Enable when can correctly parse level 2
    xtest('4. Get values from level 1 and 2, from file "level-two-deep-4.yini".', () => {
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
    })
})
