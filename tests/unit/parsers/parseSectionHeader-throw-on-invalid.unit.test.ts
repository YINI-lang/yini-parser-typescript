import { ErrorDataHandler } from '../../../src/core/ErrorDataHandler'
import { TSectionHeaderType } from '../../../src/core/types'
import parseSectionHeader from '../../../src/parsers/parseSectionHeader'
import { debugPrint } from '../../../src/utils/print'

/**
 * Throw error when parsing bad classic header unit tests.
 */
describe('Throw error when parsing bad header marker (classic and numeric shorthand) unit tests:', () => {
    let eh: ErrorDataHandler

    beforeAll(() => {
        eh = new ErrorDataHandler('1-Abort-on-Errors')
    })

    test('1.a. Should throw error if parsing bad classic header (more than 6 marker (^) characters).', () => {
        // Arrange.
        const invalidYini = `
        ^^^^^^^ InvalidHeaderMarker // INVALID: More than 6 marker characters.
        value = 3
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('1.b. Should throw error if parsing bad classic header (more than 6 marker (<) characters).', () => {
        // Arrange.
        const invalidYini = `
        <<<<<<< InvalidHeaderMarker // INVALID: More than 6 marker characters.
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('1.c. Should throw error if parsing bad classic header (more than 6 marker (§) characters).', () => {
        // Arrange.
        const invalidYini = `
        §§§§§§§ InvalidHeaderMarker // INVALID: More than 6 marker characters.
        value = 3
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('1.d. Should throw error if parsing bad classic header (more than 6 marker (€) characters).', () => {
        // Arrange.
        const invalidYini = `
        €€€€€€€ InvalidHeaderMarker // INVALID: More than 6 marker characters.
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('2.a. Should throw error if parsing bad numeric shorthand marker header with (^).', () => {
        // Arrange.
        const invalidYini = `
        ^0 InvalidHeaderMarker // INVALID: Numeric shorthand marker.
        value = 3
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('2.b. Should throw error if parsing bad numeric shorthand marker header with (<).', () => {
        // Arrange.
        const invalidYini = `
        <0 InvalidHeaderMarker // INVALID: Numeric shorthand marker.
        value = 3
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('2.c. Should throw error if parsing bad numeric shorthand marker header with (§).', () => {
        // Arrange.
        const invalidYini = `
        §0 InvalidHeaderMarker // INVALID: Numeric shorthand marker.
        value = 3
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('2.d. Should throw error if parsing bad numeric shorthand marker header with (€).', () => {
        // Arrange.
        const invalidYini = `
        €0 InvalidHeaderMarker // INVALID: Numeric shorthand marker.
        value = 3
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('3.a. Should throw error if parsing bad section header marker (^).', () => {
        // Arrange.
        const invalidYini = `
        ^^1 InvalidHeaderMarker // INVALID section header marker.
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('3.b. Should throw error if parsing bad section header marker (<).', () => {
        // Arrange.
        const invalidYini = `
        <<10 InvalidHeaderMarker // INVALID section header marker.
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('3.c. Should throw error if parsing bad section header marker (§).', () => {
        // Arrange.
        const invalidYini = `
        §§§1 InvalidHeaderMarker // INVALID section header marker.
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('3.d. Should throw error if parsing bad section header marker (€).', () => {
        // Arrange.
        const invalidYini = `
        €€€ 3 InvalidHeaderMarker // INVALID section header marker.
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('4. Should throw error if mixing section header types.', () => {
        // Arrange.
        const invalidYini = `
        ^^^3 Section1 // NOT OK, bad section marker, cannot mix marker types.
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('5. Should throw error if mixing section header types.', () => {
        // Arrange.
        const invalidYini = `
        <1 user3
        username = 'tester three'
        isSysOp = NO

            <<2 prefs // NOT OK, bad section marker, cannot mix marker types.
            theme = "special-dark"
            notifications = ON
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })

    test('6. Should throw error if using a dot (.) in section title.', () => {
        // Arrange.
        const invalidYini = `
        < Title
        username = 'tester three'
        isSysOp = NO

            << Sub.Title // NOT OK, dot notation NOT allowed.
            theme = "special-dark"
            notifications = ON
        `

        // Act & Assert.
        expect(() => {
            parseSectionHeader(invalidYini, eh, null)
        }).toThrow()
    })
})
