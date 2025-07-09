import parseSectionHeader from '../../../src/data-extractors/parseSectionHeader'
import { TSectionHeaderType } from '../../../src/types'
import { debugPrint } from '../../../src/utils/system'

/**
 * Parse section header unit tests.
 */
xdescribe('Parse section header Unit Tests:', () => {
    test('1.a. Identify classic section header with level 1.', () => {
        // Arrange.
        const fixture = '^ SectionName'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('1.b. Identify classic section header with level 1 with tabbed delimeter.', () => {
        // Arrange.
        const fixture = '^\tSectionName'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('1.c. Identify classic section header with level 1 with multiple spaces.', () => {
        // Arrange.
        const fixture = '^   SectionName'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('1.d. Identify classic section header with level 1 with any WS delimeters.', () => {
        // Arrange.
        const fixture = '^\t  \t  SectionName'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('1.e. Identify classic section header with level 1 with a comment and any WS delimeters.', () => {
        // Arrange.
        const fixture = '^\t  \t  SectionName // This part is a comment.'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('2.a. Identify classic section header with level 1 and backticked name.', () => {
        // Arrange.
        const fixture = '^ `Section Name`'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('2.b. Identify classic section header with level 1 with tabbed delimeter and backticked name.', () => {
        // Arrange.
        const fixture = '^\t`Section Name`'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('2.c. Identify classic section header with level 1 with multiple spaces and backticked name.', () => {
        // Arrange.
        const fixture = '^   `Section Name`'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('2.d. Identify classic section header with level 1 with any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '^\t  \t  `Section Name`'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('2.e. Identify classic section header with level 1 with a comment and any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '^\t  \t  `Section Name` # This part is a comment.'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('3.a. Identify classic section header with level 1, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('3.b. Identify classic section header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName // This is a section header.'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('3.c. Identify classic section header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName # This part is a comment.'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('3.d. Identify classic section header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName// This is a section header.'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('3.e. Identify classic section header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName# This part is a comment.'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('3.f. Identify classic section header with level 1 enclosed in comments, compact (no WS).', () => {
        // Arrange.
        const fixture = `// This whole line is a comment.
            ^SectionName# This part is a comment.
            // This whole line is a comment.
        `
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('4.a. Identify classic section header with level 1, backticked name, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name`'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('4.b. Identify classic section header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name` // Comment.'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('4.c. Identify classic section header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name` # Comment.'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('4.d. Identify classic section header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name`// This part is a comment.'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('5.a. Identify classic section header with level 2.', () => {
        // Arrange.
        const fixture = '^^ SectionName'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('5.b. Identify classic section header with level 2 and comment.', () => {
        // Arrange.
        const fixture = '^^ SectionName // This part is a comment.'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('6.a. Identify classic section header with level 3.', () => {
        // Arrange.
        const fixture = '^^^ SectionName'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('6.b. Identify classic section header with level 3, compact (no WS).', () => {
        // Arrange.
        const fixture = '^^^SectionName'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('7.a. Identify classic section header with level 4.', () => {
        // Arrange.
        const fixture = '^^^^ SectionName'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })
    test('7.b. Identify classic section header with level 4 with backticked name.', () => {
        // Arrange.
        const fixture = '^^^^ `Section Name`'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('8.a. Identify classic section header with level 5.', () => {
        // Arrange.
        const fixture = '^^^^^ SectionName'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('8.b. Identify classic section header with level 5, with many WS.', () => {
        // Arrange.
        const fixture = '^^^^^    \tSectionName'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('9.a. Identify classic section header with level 6.', () => {
        // Arrange.
        const fixture = '^^^^^^ SectionName'
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })

    test('9.b. Identify classic section header with level 6, compact with backticed name and comment.', () => {
        // Arrange.
        const fixture = `/*
            This part is a comment block.
        */
            ^^^^^^\`Section Name\`//Comment here.
            ;This line is comment.
        `
        // Act.
        const resultType = parseSectionHeader(fixture)
        // Assert.
        expect(resultType).not.toEqual('Numeric-Header-Marker')
        expect(resultType).toEqual('Classic-Header-Marker')
    })
})
