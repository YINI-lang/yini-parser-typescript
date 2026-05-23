// src/parsers/parseSectionHeader-nsh.unit.test.ts
import { ErrorDataHandler } from '../core/errorDataHandler'
import { MAX_SECTION_DEPTH } from '../utils/yiniHelpers'
import parseSectionHeader from './parseSectionHeader'

/**
 * Parse numeric shorthand section header unit tests.
 */
describe('Parse numeric shorthand section header unit tests:', () => {
    let eh: ErrorDataHandler

    beforeAll(() => {
        eh = new ErrorDataHandler('None/Ignore')
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
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.b. Identify numeric shorthand header with level 1 and tab delimiter.', () => {
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

    test('1.c. Identify numeric shorthand header with level 1 and multiple spaces.', () => {
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

    test('1.d. Identify numeric shorthand header with level 1 and mixed whitespace delimiters.', () => {
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

    test('1.e. Identify numeric shorthand header with level 1 and trailing comment.', () => {
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
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.b. Identify numeric shorthand header with level 1, tab delimiter, and backticked name.', () => {
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
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.c. Identify numeric shorthand header with level 1, spaces, and backticked name.', () => {
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
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.d. Identify numeric shorthand header with level 1, mixed whitespace, and backticked name.', () => {
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
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.e. Identify numeric shorthand header with level 1, backticked name, and trailing comment.', () => {
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
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('3.a. Identify numeric shorthand header with level 2.', () => {
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

    test('3.b. Identify numeric shorthand header with level 2 and trailing comment.', () => {
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

    test('4.a. Identify numeric shorthand header with level 3.', () => {
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

    test('4.b. Identify numeric shorthand header with level 3 and backticked name.', () => {
        // Arrange.
        const fixture = '^3 `Section Name`'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(3)
    })

    test('5.a. Identify numeric shorthand header with level 4.', () => {
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

    test('5.b. Identify numeric shorthand header with level 4 and backticked name.', () => {
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
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(4)
    })

    test('6.a. Identify numeric shorthand header with level 5.', () => {
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

    test('6.b. Identify numeric shorthand header with level 5 and mixed whitespace.', () => {
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

    test('7.a. Identify numeric shorthand header with level 6.', () => {
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

    test('7.b. Identify numeric shorthand header with level 6, backticked name, and trailing comment.', () => {
        // Arrange.
        const fixture = '^6 `Section Name`//Comment here.'

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

    test('8.a. Identify numeric shorthand header with level 7.', () => {
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

    test('8.b. Identify numeric shorthand header with level 9.', () => {
        // Arrange.
        const fixture = '^9 Section9'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section9')
        expect(sectionLevel).toEqual(9)
    })

    test('8.c. Identify numeric shorthand header with level 10.', () => {
        // Arrange.
        const fixture = '^10 Section10'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section10')
        expect(sectionLevel).toEqual(10)
    })

    test('8.d. Identify numeric shorthand header with level 16.', () => {
        // Arrange.
        const fixture = '^16 SectionName'

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

    test('8.e. Identify numeric shorthand header with maximum supported section depth.', () => {
        // Arrange.
        const fixture = `^${MAX_SECTION_DEPTH} SectionMax`

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('SectionMax')
        expect(sectionLevel).toEqual(MAX_SECTION_DEPTH)
    })

    test('9.a. Identify numeric shorthand header with alternative marker (<), level 1.', () => {
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

    test('9.b. Identify numeric shorthand header with alternative marker (<), level 4.', () => {
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

    test('10.a. Identify numeric shorthand header with alternative marker (§), level 2.', () => {
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

    test('10.b. Identify numeric shorthand header with alternative marker (§), level 5.', () => {
        // Arrange.
        const fixture = '§5 SectionName # This part is a comment.'

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

    test('11.a. Identify numeric shorthand header with alternative marker (>), level 1.', () => {
        // Arrange.
        const fixture = '>1 SectionName'

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

    test('11.b. Identify numeric shorthand header with alternative marker (>), level 6.', () => {
        // Arrange.
        const fixture = '>6 SectionName# This part is a comment.'

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

    test('12.a. Identify numeric shorthand header with level 199 if supported by MAX_SECTION_DEPTH.', () => {
        // Arrange.
        const fixture = '^199 `Section Name 199`'

        if (MAX_SECTION_DEPTH < 199) {
            expect(MAX_SECTION_DEPTH).toBeLessThan(199)
            return
        }

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Numeric-Header-Marker')
        expect(sectionName).toEqual('Section Name 199')
        expect(sectionLevel).toEqual(199)
    })
})
