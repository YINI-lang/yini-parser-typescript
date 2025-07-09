import parseSectionHeader from '../../../src/data-extractors/parseSectionHeader'
import { ErrorDataHandler } from '../../../src/ErrorDataHandler'
import { TSectionHeaderType } from '../../../src/types'
import { debugPrint } from '../../../src/utils/system'

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

    test('1.b. Should throw error if parsing bad classic header (more than 6 marker (~) characters).', () => {
        // Arrange.
        const invalidYini = `
        ~~~~~~~ InvalidHeaderMarker // INVALID: More than 6 marker characters.
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

    test('2.b. Should throw error if parsing bad numeric shorthand marker header with (~).', () => {
        // Arrange.
        const invalidYini = `
        ~0 InvalidHeaderMarker // INVALID: Numeric shorthand marker.
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

    test('3.b. Should throw error if parsing bad section header marker (~).', () => {
        // Arrange.
        const invalidYini = `
        ~~10 InvalidHeaderMarker // INVALID section header marker.
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
})

/**
 * Parse section classic header unit tests.
 */
describe('Parse section classic header unit tests:', () => {
    let eh: ErrorDataHandler

    beforeAll(() => {
        eh = new ErrorDataHandler('1-Abort-on-Errors')
    })

    test('1.a. Identify classic section header with level 1.', () => {
        // Arrange.
        const fixture = '^ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.b. Identify classic section header with level 1 with tabbed delimeter.', () => {
        // Arrange.
        const fixture = '^\tSectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.c. Identify classic section header with level 1 with multiple spaces.', () => {
        // Arrange.
        const fixture = '^   SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.d. Identify classic section header with level 1 with any WS delimeters.', () => {
        // Arrange.
        const fixture = '^\t  \t  SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.e. Identify classic section header with level 1 with a comment and any WS delimeters.', () => {
        // Arrange.
        const fixture = '^\t  \t  SectionName // This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('2.a. Identify classic section header with level 1 and backticked name.', () => {
        // Arrange.
        const fixture = '^ `Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.b. Identify classic section header with level 1 with tabbed delimeter and backticked name.', () => {
        // Arrange.
        const fixture = '^\t`Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.c. Identify classic section header with level 1 with multiple spaces and backticked name.', () => {
        // Arrange.
        const fixture = '^   `Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.d. Identify classic section header with level 1 with any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '^\t  \t  `Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.e. Identify classic section header with level 1 with a comment and any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '^\t  \t  `Section Name` # This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('3.a. Identify classic section header with level 1, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.b. Identify classic section header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName // This is a section header.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.c. Identify classic section header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName # This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.d. Identify classic section header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName// This is a section header.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.e. Identify classic section header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName# This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.f. Identify classic section header with level 1 enclosed in comments, compact (no WS).', () => {
        // Arrange.
        const fixture = `// This whole line is a comment.
            ^SectionName# This part is a comment.
            // This whole line is a comment.
        `
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('4.a. Identify classic section header with level 1, backticked name, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('4.b. Identify classic section header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name` // Comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('4.c. Identify classic section header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name` # Comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('4.d. Identify classic section header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name`// This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('5.a. Identify classic section header with level 2.', () => {
        // Arrange.
        const fixture = '^^ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(2)
    })

    test('5.b. Identify classic section header with level 2 and comment.', () => {
        // Arrange.
        const fixture = '^^ SectionName // This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(2)
    })

    test('6.a. Identify classic section header with level 3.', () => {
        // Arrange.
        const fixture = '^^^ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(3)
    })

    test('6.b. Identify classic section header with level 3, compact (no WS).', () => {
        // Arrange.
        const fixture = '^^^SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(3)
    })

    test('7.a. Identify classic section header with level 4.', () => {
        // Arrange.
        const fixture = '^^^^ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(4)
    })
    test('7.b. Identify classic section header with level 4 with backticked name.', () => {
        // Arrange.
        const fixture = '^^^^ `Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(4)
    })

    test('8.a. Identify classic section header with level 5.', () => {
        // Arrange.
        const fixture = '^^^^^ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(5)
    })

    test('8.b. Identify classic section header with level 5, with many WS.', () => {
        // Arrange.
        const fixture = '^^^^^    \tSectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(5)
    })

    test('9.a. Identify classic section header with level 6.', () => {
        // Arrange.
        const fixture = '^^^^^^ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(6)
    })

    test('9.b. Identify classic section header with level 6, compact with backticed name and comment.', () => {
        // Arrange.
        const fixture = `;This line is comment.
            ^^^^^^\`Section Name\`//Comment here.
            ;This line is comment.
        `
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(6)
    })

    test('10.a. Identify classic section header with level 1 and alternative character marker (~).', () => {
        // Arrange.
        const fixture = '~ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('10.b. Identify classic section header with level 2 with tabbed delimeter and alternative character marker (§).', () => {
        // Arrange.
        const fixture = '§§\tSectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(2)
    })

    test('10.c. Identify classic section header with level 2 with tabbed delimeter and alternative character marker (€).', () => {
        // Arrange.
        const fixture = '€€\tSectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(2)
    })

    test('11.a. Identify classic section header with level 4 and alternative character marker (~).', () => {
        // Arrange.
        const fixture = '~~~~   SectionName // This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(4)
    })

    test('11.b. Identify classic section header with level 5 with tabbed delimeter and alternative character marker (§).', () => {
        // Arrange.
        const fixture = '§§§§§SectionName # This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(5)
    })

    test('11.c. Identify classic section header with level 6 with tabbed delimeter and alternative character marker (€).', () => {
        // Arrange.
        const fixture = `// This line is a comment.
            €€€€€€ SectionName# This part is a comment.
            ; This line is a comment.
        `
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(6)
    })
})

/**
 * Parse section numeric shorthand header unit tests.
 */
describe('Parse section numeric shorthand header unit tests:', () => {
    let eh: ErrorDataHandler

    beforeAll(() => {
        eh = new ErrorDataHandler('1-Abort-on-Errors')
    })

    test('1.a. Identify numeric shorthand header with level 1.', () => {
        // Arrange.
        const fixture = '^1 SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).not.toEqual('Numeric-Header-Marker')
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.b. Identify numeric shorthand header with level 1 with tabbed delimeter.', () => {
        // Arrange.
        const fixture = '^1\tSectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.c. Identify numeric shorthand header with level 1 with multiple spaces.', () => {
        // Arrange.
        const fixture = '^   SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.d. Identify numeric shorthand header with level 1 with any WS delimeters.', () => {
        // Arrange.
        const fixture = '^\t  \t  SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.e. Identify numeric shorthand header with level 1 with a comment and any WS delimeters.', () => {
        // Arrange.
        const fixture = '^\t  \t  SectionName // This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('2.a. Identify numeric shorthand header with level 1 and backticked name.', () => {
        // Arrange.
        const fixture = '^ `Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.b. Identify numeric shorthand header with level 1 with tabbed delimeter and backticked name.', () => {
        // Arrange.
        const fixture = '^\t`Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.c. Identify numeric shorthand header with level 1 with multiple spaces and backticked name.', () => {
        // Arrange.
        const fixture = '^   `Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.d. Identify numeric shorthand header with level 1 with any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '^\t  \t  `Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.e. Identify numeric shorthand header with level 1 with a comment and any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '^\t  \t  `Section Name` # This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('3.a. Identify numeric shorthand header with level 1, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.b. Identify numeric shorthand header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName // This is a section header.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.c. Identify numeric shorthand header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName # This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.d. Identify numeric shorthand header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName// This is a section header.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.e. Identify numeric shorthand header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName# This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.f. Identify numeric shorthand header with level 1 enclosed in comments, compact (no WS).', () => {
        // Arrange.
        const fixture = `// This whole line is a comment.
            ^SectionName# This part is a comment.
            // This whole line is a comment.
        `
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('4.a. Identify numeric shorthand header with level 1, backticked name, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('4.b. Identify numeric shorthand header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name` // Comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('4.c. Identify numeric shorthand header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name` # Comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('4.d. Identify numeric shorthand header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name`// This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('5.a. Identify numeric shorthand header with level 2.', () => {
        // Arrange.
        const fixture = '^^ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(2)
    })

    test('5.b. Identify numeric shorthand header with level 2 and comment.', () => {
        // Arrange.
        const fixture = '^^ SectionName // This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(2)
    })

    test('6.a. Identify numeric shorthand header with level 3.', () => {
        // Arrange.
        const fixture = '^^^ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(3)
    })

    test('6.b. Identify numeric shorthand header with level 3, compact (no WS).', () => {
        // Arrange.
        const fixture = '^^^SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(3)
    })

    test('7.a. Identify numeric shorthand header with level 4.', () => {
        // Arrange.
        const fixture = '^^^^ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(4)
    })
    test('7.b. Identify numeric shorthand header with level 4 with backticked name.', () => {
        // Arrange.
        const fixture = '^^^^ `Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(4)
    })

    test('8.a. Identify numeric shorthand header with level 5.', () => {
        // Arrange.
        const fixture = '^^^^^ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(5)
    })

    test('8.b. Identify numeric shorthand header with level 5, with many WS.', () => {
        // Arrange.
        const fixture = '^^^^^    \tSectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(5)
    })

    test('9.a. Identify numeric shorthand header with level 6.', () => {
        // Arrange.
        const fixture = '^^^^^^ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(6)
    })

    test('9.b. Identify numeric shorthand header with level 6, compact with backticed name and comment.', () => {
        // Arrange.
        const fixture = `;This line is comment.
            ^^^^^^\`Section Name\`//Comment here.
            ;This line is comment.
        `
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(6)
    })

    test('10.a. Identify numeric shorthand header with level 1 and alternative character marker (~).', () => {
        // Arrange.
        const fixture = '~ SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('10.b. Identify numeric shorthand header with level 2 with tabbed delimeter and alternative character marker (§).', () => {
        // Arrange.
        const fixture = '§§\tSectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(2)
    })

    test('10.c. Identify numeric shorthand header with level 2 with tabbed delimeter and alternative character marker (€).', () => {
        // Arrange.
        const fixture = '€€\tSectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(2)
    })

    test('11.a. Identify numeric shorthand header with level 4 and alternative character marker (~).', () => {
        // Arrange.
        const fixture = '~~~~   SectionName // This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(4)
    })

    test('11.b. Identify numeric shorthand header with level 5 with tabbed delimeter and alternative character marker (§).', () => {
        // Arrange.
        const fixture = '§§§§§SectionName # This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(5)
    })

    test('11.c. Identify numeric shorthand header with level 6 with tabbed delimeter and alternative character marker (€).', () => {
        // Arrange.
        const fixture = `// This line is a comment.
            €€€€€€ SectionName# This part is a comment.
            ; This line is a comment.
        `
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(6)
    })
})
