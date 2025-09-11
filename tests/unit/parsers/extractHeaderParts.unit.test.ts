import { TSectionHeaderType } from '../../../src/core/internalTypes'
import extractHeaderParts from '../../../src/parsers/extractHeaderParts'
import { debugPrint } from '../../../src/utils/print'

/**
 * Extract header parts unit tests.
 */
describe('Extract header parts unit tests Unit Tests:', () => {
    test('1.a. Extract parts for classic section header with level 1.', () => {
        // Arrange.
        const fixture = '^ SectionName'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('1.b. Extract parts for classic section header with level 1 with tabbed delimeter.', () => {
        // Arrange.
        const fixture = '^\tSectionName'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('1.c. Extract parts for classic section header with level 1 with multiple spaces.', () => {
        // Arrange.
        const fixture = '^   SectionName'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('1.d. Extract parts for classic section header with level 1 with any WS delimeters.', () => {
        // Arrange.
        const fixture = '^\t  \t  SectionName'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('1.e. Extract parts for classic section header with level 1 with a comment and any WS delimeters.', () => {
        // Arrange.
        const fixture = '^\t  \t  SectionName // This part is a comment.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('2.a. Extract parts for classic section header with level 1 and backticked name.', () => {
        // Arrange.
        const fixture = '^ `Section Name`'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('`Section Name`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('2.b. Extract parts for classic section header with level 1 with tabbed delimeter and backticked name.', () => {
        // Arrange.
        const fixture = '^\t`Section Name`'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('`Section Name`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('2.c. Extract parts for classic section header with level 1 with multiple spaces and backticked name.', () => {
        // Arrange.
        const fixture = '^   `Section Name`'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('`Section Name`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('2.d. Extract parts for classic section header with level 1 with any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '^\t  \t  `Section Name`'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('`Section Name`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('2.e. Extract parts for classic section header with level 1 with a comment and any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '^\t  \t  `Section Name` # This part is a comment.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('`Section Name`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('3.a. Extract parts for classic section header with level 1, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('3.b. Extract parts for classic section header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName // This is a section header.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('3.c. Extract parts for classic section header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName # This part is a comment.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('3.d. Extract parts for classic section header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName// This is a section header.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('3.e. Extract parts for classic section header with level 1 with comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^SectionName# This part is a comment.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('3.f. Extract parts for classic section header with level 1 enclosed in comments, compact (no WS).', () => {
        // Arrange.
        const fixture = `// This whole line is a comment.
            ^SectionName# This part is a comment.
            // This whole line is a comment.
        `
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('4.a. Extract parts for classic section header with level 1, backticked name, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name`'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('`Section Name`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('4.b. Extract parts for classic section header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name` // Comment.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('`Section Name`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('4.c. Extract parts for classic section header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name` # Comment.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('`Section Name`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('4.d. Extract parts for classic section header with level 1 with backticked name and comment, compact (no WS).', () => {
        // Arrange.
        const fixture = '^`Section Name`// This part is a comment.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^')
        expect(strSectionName).toEqual('`Section Name`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('5.a. Extract parts for classic section header with level 2.', () => {
        // Arrange.
        const fixture = '^^ SectionName'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('5.b. Extract parts for classic section header with level 2 and comment.', () => {
        // Arrange.
        const fixture = '^^ SectionName // This part is a comment.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('6.a. Extract parts for classic section header with level 3.', () => {
        // Arrange.
        const fixture = '^^^ SectionName'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^^^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('6.b. Extract parts for classic section header with level 3, compact (no WS).', () => {
        // Arrange.
        const fixture = '^^^SectionName'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^^^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('7.a. Extract parts for classic section header with level 4.', () => {
        // Arrange.
        const fixture = '^^^^ SectionName'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^^^^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('7.b. Extract parts for classic section header with level 4 with backticked name.', () => {
        // Arrange.
        const fixture = '^^^^ `Section Name`'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^^^^')
        expect(strSectionName).toEqual('`Section Name`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('8.a. Extract parts for classic section header with level 5.', () => {
        // Arrange.
        const fixture = '^^^^^ SectionName'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^^^^^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('8.b. Extract parts for classic section header with level 5, with many WS.', () => {
        // Arrange.
        const fixture = '^^^^^    \tSectionName'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^^^^^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('9.a. Extract parts for classic section header with level 6.', () => {
        // Arrange.
        const fixture = '^^^^^^ SectionName'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^^^^^^')
        expect(strSectionName).toEqual('SectionName')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('9.b. Extract parts for classic section header with level 6, compact with backticed name and comment.', () => {
        // Arrange.
        const fixture = `;This line is comment.
            ^^^^^^\`Section Name\`//Comment here.
            ;This line is comment.
        `
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        debugPrint('strMarkerChars: ' + strMarkerChars)
        debugPrint('strSectionName: ' + strSectionName)
        debugPrint('strNumberPart: ' + strNumberPart)
        debugPrint('isBacktickedName: ' + isBacktickedName)

        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('^^^^^^')
        expect(strSectionName).toEqual('`Section Name`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('10.a. Extract parts for classic section header with alternative marker (<), level 2 with any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '<<\t\t    Title'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('<<')
        expect(strSectionName).toEqual('Title')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('10.b. Extract parts for classic section header with alternative marker (<), level 2 with any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '<<\t  \t  `Section Title`'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('<<')
        expect(strSectionName).toEqual('`Section Title`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('10.c. Extract parts for classic section header with alternative marker (<), level 2 with any WS delimeters, backticked name and a comment.', () => {
        // Arrange.
        const fixture = '<<\t  \t  `Section Title` // This is a comment.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('<<')
        expect(strSectionName).toEqual('`Section Title`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('11.a. Extract parts for classic section header with alternative marker (§), level 1 with any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '§\t\t    Title'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('§')
        expect(strSectionName).toEqual('Title')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('11.b. Extract parts for classic section header with alternative marker (§), level 2 with any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '§§\t  \t  `Section Title`'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('§§')
        expect(strSectionName).toEqual('`Section Title`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('11.c. Extract parts for classic section header with alternative marker (§), level 3 with any WS delimeters, backticked name and a comment.', () => {
        // Arrange.
        const fixture = '§§§\t  \t  `Section Title` // This is a comment.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('§§§')
        expect(strSectionName).toEqual('`Section Title`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('12.a. Extract parts for classic section header with alternative marker (€), level 1 with any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '€\t\t    Title'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('€')
        expect(strSectionName).toEqual('Title')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(false)
    })

    test('12.b. Extract parts for classic section header with alternative marker (€), level 2 with any WS delimeters and backticked name.', () => {
        // Arrange.
        const fixture = '€€\t  \t  `Section Title`'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('€€')
        expect(strSectionName).toEqual('`Section Title`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })

    test('12.c. Extract parts for classic section header with alternative marker (€), level 3 with any WS delimeters, backticked name and a comment.', () => {
        // Arrange.
        const fixture = '€€€\t  \t  `Section Title` // This is a comment.'
        // Act.
        const {
            strMarkerChars,
            strSectionName,
            strNumberPart,
            isBacktickedName,
        } = extractHeaderParts(fixture)
        // Assert.
        expect(strSectionName).not.toEqual('nonCorrectName')
        expect(strMarkerChars).toEqual('€€€')
        expect(strSectionName).toEqual('`Section Title`')
        expect(strNumberPart).toEqual('')
        expect(isBacktickedName).toEqual(true)
    })
})
