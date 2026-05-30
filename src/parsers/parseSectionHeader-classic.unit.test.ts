// src/parsers/parseSectionHeader-classic.unit.test.ts
import { ErrorDataHandler } from '../core/errorDataHandler'
import parseSectionHeader from './parseSectionHeader'

/**
 * Parse classic section header unit tests.
 */
describe('Parse classic section header unit tests:', () => {
    let eh: ErrorDataHandler

    beforeAll(() => {
        eh = new ErrorDataHandler('None/Ignore')
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
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.b. Identify classic section header with level 1 and tab delimiter.', () => {
        // Arrange.
        const fixture = '^\tSectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.c. Identify classic section header with level 1 and multiple spaces.', () => {
        // Arrange.
        const fixture = '^   SectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.d. Identify classic section header with level 1 and mixed whitespace delimiters.', () => {
        // Arrange.
        const fixture = '^\t  \t  SectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('1.e. Identify classic section header with level 1 and trailing comment.', () => {
        // Arrange.
        const fixture = '^\t  \t  SectionName // This part is a comment.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
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
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.b. Identify classic section header with level 1, tab delimiter, and backticked name.', () => {
        // Arrange.
        const fixture = '^\t`Section Name`'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.c. Identify classic section header with level 1, spaces, and backticked name.', () => {
        // Arrange.
        const fixture = '^   `Section Name`'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.d. Identify classic section header with level 1, mixed whitespace, and backticked name.', () => {
        // Arrange.
        const fixture = '^\t  \t  `Section Name`'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('2.e. Identify classic section header with level 1, backticked name, and trailing comment.', () => {
        // Arrange.
        const fixture = '^\t  \t  `Section Name` # This part is a comment.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('3.a. Identify compact classic section header with level 1.', () => {
        // Arrange.
        const fixture = '^SectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.b. Identify compact classic section header with level 1 and slash comment.', () => {
        // Arrange.
        const fixture = '^SectionName // This is a section header.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.c. Identify compact classic section header with level 1 and hash comment.', () => {
        // Arrange.
        const fixture = '^SectionName # This part is a comment.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.d. Identify compact classic section header with level 1 and slash comment without whitespace.', () => {
        // Arrange.
        const fixture = '^SectionName// This is a section header.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('3.e. Identify compact classic section header with level 1 and hash comment without whitespace.', () => {
        // Arrange.
        const fixture = '^SectionName# This part is a comment.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('4.a. Identify compact classic section header with level 1 and backticked name.', () => {
        // Arrange.
        const fixture = '^`Section Name`'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('4.b. Identify compact classic section header with level 1, backticked name, and slash comment.', () => {
        // Arrange.
        const fixture = '^`Section Name` // Comment.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('4.c. Identify compact classic section header with level 1, backticked name, and hash comment.', () => {
        // Arrange.
        const fixture = '^`Section Name` # Comment.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(1)
    })

    test('4.d. Identify compact classic section header with level 1, backticked name, and slash comment without whitespace.', () => {
        // Arrange.
        const fixture = '^`Section Name`// This part is a comment.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
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
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(2)
    })

    test('5.b. Identify classic section header with level 2 and trailing comment.', () => {
        // Arrange.
        const fixture = '^^ SectionName // This part is a comment.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
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
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(3)
    })

    test('6.b. Identify compact classic section header with level 3.', () => {
        // Arrange.
        const fixture = '^^^SectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
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
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(4)
    })

    test('7.b. Identify classic section header with level 4 and backticked name.', () => {
        // Arrange.
        const fixture = '^^^^ `Section Name`'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
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
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(5)
    })

    test('8.b. Identify classic section header with level 5 and mixed whitespace.', () => {
        // Arrange.
        const fixture = '^^^^^    \tSectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
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
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(6)
    })

    test('9.b. Identify compact classic section header with level 6, backticked name, and comment.', () => {
        // Arrange.
        const fixture = '^^^^^^`Section Name`//Comment here.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('Section Name')
        expect(sectionLevel).toEqual(6)
    })

    test('9.c. Identify classic section header with level 7 using marker separators.', () => {
        // Arrange.
        const fixture = '^^^_^^^_^ SectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(7)
    })

    test('9.d. Identify classic section header with level 8 using marker separators.', () => {
        // Arrange.
        const fixture = '^^^_^^^_^^ SectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(8)
    })

    test('9.e. Identify classic section header with level 9 using marker separators.', () => {
        // Arrange.
        const fixture = '^^^_^^^_^^^ SectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(9)
    })

    test('9.f. Identify classic section header with level 9 using direct repeated markers.', () => {
        // Arrange.
        const fixture = '^^^^^^^^^ SectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(9)
    })

    test('10.a. Identify classic section header with level 1 and alternative marker (<).', () => {
        // Arrange.
        const fixture = '< SectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('10.b. Identify classic section header with level 2 and alternative marker (<).', () => {
        // Arrange.
        const fixture = '<<\tSectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(2)
    })

    test('10.c. Identify classic section header with level 4 and alternative marker (<).', () => {
        // Arrange.
        const fixture = '<<<<   SectionName // This part is a comment.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(4)
    })

    test('11.a. Identify classic section header with level 1 and alternative marker (§).', () => {
        // Arrange.
        const fixture = '§ SectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('11.b. Identify classic section header with level 2 and alternative marker (§).', () => {
        // Arrange.
        const fixture = '§§\tSectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(2)
    })

    test('11.c. Identify compact classic section header with level 5 and alternative marker (§).', () => {
        // Arrange.
        const fixture = '§§§§§SectionName # This part is a comment.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(5)
    })

    test('12.a. Identify classic section header with level 1 and alternative marker (>).', () => {
        // Arrange.
        const fixture = '> SectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(1)
    })

    test('12.b. Identify classic section header with level 2 and alternative marker (>).', () => {
        // Arrange.
        const fixture = '>>\tSectionName'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(2)
    })

    test('12.c. Identify classic section header with level 4 and alternative marker (>).', () => {
        // Arrange.
        const fixture = '>>>>   SectionName // This part is a comment.'

        // Act.
        const { markerType, sectionName, sectionLevel } = parseSectionHeader(
            fixture,
            eh,
            null,
        )

        // Assert.
        expect(markerType).toEqual('Classic-Header-Marker')
        expect(sectionName).toEqual('SectionName')
        expect(sectionLevel).toEqual(4)
    })
})
