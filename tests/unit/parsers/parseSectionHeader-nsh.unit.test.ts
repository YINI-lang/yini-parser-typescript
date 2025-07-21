import { ErrorDataHandler } from '../../../src/core/ErrorDataHandler'
import { TSectionHeaderType } from '../../../src/core/types'
import parseSectionHeader from '../../../src/parsers/parseSectionHeader'
import { debugPrint } from '../../../src/utils/system'

/**
 * Parse numeric shorthand section header unit tests.
 */
describe('Parse numeric shorthand section header unit tests:', () => {
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
        debugPrint('  markerType: ' + markerType)
        debugPrint(' sectionName: ' + sectionName)
        debugPrint('sectionLevel: ' + sectionLevel)

        // Assert.
        expect(sectionName).not.toEqual('thisNameIsNotCorrect')
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
        const fixture = '^1   SectionName'
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
        const fixture = '^1\t  \t  SectionName'
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
        const fixture = '^1\t  \t  SectionName // This part is a comment.'
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
        const fixture = '^1 `Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('`Section Name`')
        expect(sectionLevel).toEqual(1)
    })

    test('2.b. Identify numeric shorthand header with level 1 with tabbed delimeter and backticked name.', () => {
        // Arrange.
        const fixture = '^1\t`Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('`Section Name`')
        expect(sectionLevel).toEqual(1)
    })

    test('2.c. Identify numeric shorthand header with level 1 with multiple spaces and backticked name.', () => {
        // Arrange.
        const fixture = '^1   `Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('`Section Name`')
        expect(sectionLevel).toEqual(1)
    })

    test('2.d. Identify numeric shorthand header with level 1 with any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '^1\t  \t  `Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('`Section Name`')
        expect(sectionLevel).toEqual(1)
    })

    test('2.e. Identify numeric shorthand header with level 1 with a comment and any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '^1\t  \t  `Section Name` # This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('`Section Name`')
        expect(sectionLevel).toEqual(1)
    })

    test('3.a. Identify numeric shorthand header with level 1, compact (no WS).', () => {
        // Arrange.
        const fixture = '^1SectionName'
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
        const fixture = '^1SectionName // This is a section header.'
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
        const fixture = '^1SectionName # This part is a comment.'
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
        const fixture = '^1SectionName// This is a section header.'
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
        const fixture = '^1SectionName# This part is a comment.'
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
            ^1SectionName# This part is a comment.
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
        const fixture = '^1`Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('`Section Name`')
        expect(sectionLevel).toEqual(1)
    })

    test('4.b. Identify numeric shorthand header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^1`Section Name` // Comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('`Section Name`')
        expect(sectionLevel).toEqual(1)
    })

    test('4.c. Identify numeric shorthand header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^1`Section Name` # Comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('`Section Name`')
        expect(sectionLevel).toEqual(1)
    })

    test('4.d. Identify numeric shorthand header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^1`Section Name`// This part is a comment.'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('`Section Name`')
        expect(sectionLevel).toEqual(1)
    })

    test('5.a. Identify numeric shorthand header with level 2.', () => {
        // Arrange.
        const fixture = '^2 SectionName'
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
        const fixture = '^2 SectionName // This part is a comment.'
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
        const fixture = '^3 SectionName'
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
        const fixture = '^3SectionName'
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
        const fixture = '^4 SectionName'
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
        const fixture = '^4 `Section Name`'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('`Section Name`')
        expect(sectionLevel).toEqual(4)
    })

    test('8.a. Identify numeric shorthand header with level 5.', () => {
        // Arrange.
        const fixture = '^5 SectionName'
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
        const fixture = '^5    \tSectionName'
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
        const fixture = '^6 SectionName'
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
            ^6\`Section Name\`//Comment here.
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
        expect(sectionName).toEqual('`Section Name`')
        expect(sectionLevel).toEqual(6)
    })

    test('10.a. Identify numeric shorthand header with level 1 and alternative character marker (<).', () => {
        // Arrange.
        const fixture = '<1 SectionName'
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
        const fixture = '§2\tSectionName'
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
        const fixture = '€2\tSectionName'
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

    test('11.a. Identify numeric shorthand header with level 4 and alternative character marker (<).', () => {
        // Arrange.
        const fixture = '<4   SectionName // This part is a comment.'
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
        const fixture = '§5SectionName # This part is a comment.'
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
            €6 SectionName# This part is a comment.
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

    test('12.a. Identify numeric shorthand header with level higher than what classic support.', () => {
        // Arrange.
        const fixture = '^7 Section7'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section7')
        expect(sectionLevel).toEqual(7)
    })

    test('12.b. Identify numeric shorthand header with level higher than what classic support.', () => {
        // Arrange.
        const fixture = `
            ^16SectionName  # Comment here.
            //This line is comment.
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
        expect(sectionLevel).toEqual(16)
    })

    test('12.c. Identify numeric shorthand header with level higher than what classic support.', () => {
        // Arrange.
        const fixture = '^77 SectionName'
        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )
        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(77)
    })

    test('12.d. Identify numeric shorthand header with level higher than what classic support.', () => {
        // Arrange.
        const fixture = `;This line is comment.
            ^199\`Section Name 199\`//Comment here.
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
        expect(sectionName).toEqual('`Section Name 199`')
        expect(sectionLevel).toEqual(199)
    })
})
