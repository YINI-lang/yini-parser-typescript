import path from 'path'
import YINI from '../../../src'
import { debugPrint } from '../../../src/utils/system'

const DIR_OF_FIXTURES = '../../fixtures/valid/level-two-deep'

/**
 * Throw error when parsing bad section heads tests.
 */
describe('Throw error when parsing bad section head tests:', () => {
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

    test('9. Should throw error if starting with section (without members) ^^ (prev. line is a comment).', () => {
        // Arrange.
        const fixture = `
        // BELOW IS INVALID: Must start with atleast one 1-level section.
        ^^ InvalidHeader
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('10. Should throw error if jumping from section (without members) ^^ -> ^^^^.', () => {
        // Arrange.
        const fixture = `
        ^ Section1
        ^^ Section2
        --// BELOW INVALID: Invalid to jump over sections when increasing nesting.
        ^^^^ InvalidHeader
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('11. Should throw error if mixing section header types.', () => {
        // Arrange.
        const invalidYini = `
        ^^^3 Section1 // NOT OK, bad section marker, cannot mix marker types.
        x = 200
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(invalidYini)
        }).toThrow()
    })

    test('12. Should throw error if mixing section header types.', () => {
        // Arrange.
        const invalidYini = `
        ~1 user3
        username = 'tester three'
        isSysOp = NO

            # Below is invalid marker, mixup between basic and numeric section marker.
            ~~2 prefs // NOT OK, bad section marker, cannot mix marker types.
            theme = "special-dark"
            notifications = ON
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(invalidYini)
        }).toThrow()
    })
})
