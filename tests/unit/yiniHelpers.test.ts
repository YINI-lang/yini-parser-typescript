// tests/unit/yiniHelpers.test.ts
import {
    isMarkerCharacter,
    isValidBacktickedIdent,
    isValidSimpleIdent,
    stripCommentsAndAfter,
} from '../../src/utils/yiniHelpers'

/**
 * isMarkerCharacter(..) Unit Tests.
 */
describe('yiniHelpers: isMarkerCharacter(..) Unit Tests:', () => {
    test.each([['^'], ['<'], ['§'], ['>']])(
        'Should return true for supported section marker %s.',
        (fixture) => {
            // Act.
            const result = isMarkerCharacter(fixture)

            // Assert.
            expect(result).toEqual(true)
        },
    )

    test.each([['€'], ['~'], ['#'], ['@'], ['A'], ['1']])(
        'Should return false for unsupported section marker %s.',
        (fixture) => {
            // Act.
            const result = isMarkerCharacter(fixture)

            // Assert.
            expect(result).toEqual(false)
        },
    )

    test('Should throw error if input is empty.', () => {
        // Arrange.
        const fixture = ''

        // Act & Assert.
        expect(() => {
            isMarkerCharacter(fixture)
        }).toThrow()
    })

    test('Should throw error if input has more than one character.', () => {
        // Arrange.
        const fixture = '^^'

        // Act & Assert.
        expect(() => {
            isMarkerCharacter(fixture)
        }).toThrow()
    })
})

/**
 * stripCommentsAndAfter(..) Unit Tests.
 */
describe('yiniHelpers: stripCommentsAndAfter(..) Unit Tests:', () => {
    test('1. Should strip inline // comment with whitespace before it.', () => {
        // Arrange.
        const fixture = 'SectionName1 // This is a comment.'

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('2. Should return empty string for empty input.', () => {
        // Arrange.
        const fixture = ''

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('')
    })

    test('3. Should return unchanged input when there is no comment marker.', () => {
        // Arrange.
        const fixture = 'SectionName1'

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('4. Should strip inline # comment with whitespace before it.', () => {
        // Arrange.
        const fixture = 'SectionName1 # This is a comment.'

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('5. Should strip inline # comment without whitespace before it.', () => {
        // Arrange.
        const fixture = 'SectionName1#This is a comment.'

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('6. Should strip inline // comment without whitespace before it.', () => {
        // Arrange.
        const fixture = 'SectionName1//This is a comment.'

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('7. Should strip disabled line marker and return empty string.', () => {
        // Arrange.
        const fixture = '--SectionName1//This is a comment.'

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('')
    })

    test('8. Should strip full-line semicolon comment with whitespace.', () => {
        // Arrange.
        const fixture = '; This is a comment line.'

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('')
    })

    test('9. Should strip full-line semicolon comment without whitespace.', () => {
        // Arrange.
        const fixture = ';This is a comment line.'

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('')
    })

    test('10. Should not strip inline semicolon because semicolon is full-line only.', () => {
        // Arrange.
        const fixture = 'name = "demo"; not a comment marker here'

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('name = "demo"; not a comment marker here')
    })

    test('11. Should strip comment from @yini strict directive.', () => {
        // Arrange.
        const fixture = '@yini strict # This is a comment.'

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('@yini strict')
    })

    test('12. Should strip comment from @yini lenient directive.', () => {
        // Arrange.
        const fixture = '@yini lenient // This is a comment.'

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('@yini lenient')
    })

    test('13. Should strip comment from document terminator.', () => {
        // Arrange.
        const fixture = '/END # This is a comment.'

        // Act.
        const result = stripCommentsAndAfter(fixture).trim()

        // Assert.
        expect(result).toEqual('/END')
    })
})

/**
 * isValidSimpleIdent(..) Unit Tests.
 */
describe('yiniHelpers: isValidSimpleIdent(..) Unit Tests:', () => {
    test.each([
        ['foo'],
        ['_bar42'],
        ['x'],
        ['y2_'],
        ['FOO'],
        ['FooBar_123'],
        ['_'],
    ])('Should return true for valid simple identifier "%s".', (fixture) => {
        // Act.
        const result = isValidSimpleIdent(fixture)

        // Assert.
        expect(result).toEqual(true)
    })

    test.each([
        ['9abc'],
        ['ab-cd'],
        ['3'],
        ['foo '],
        ['foo bar'],
        ['ab.cd'],
        ['åäö'],
        ['foo/bar'],
        ['foo:bar'],
    ])('Should return false for invalid simple identifier "%s".', (fixture) => {
        // Act.
        const result = isValidSimpleIdent(fixture)

        // Assert.
        expect(result).toEqual(false)
    })

    test('Should throw error if isValidSimpleIdent(..) receives an empty string.', () => {
        // Arrange.
        const fixture = ''

        // Act & Assert.
        expect(() => {
            isValidSimpleIdent(fixture)
        }).toThrow()
    })

    test('Should throw error if isValidSimpleIdent(..) receives only whitespace.', () => {
        // Arrange.
        const fixture = '   '

        // Act & Assert.
        expect(() => {
            isValidSimpleIdent(fixture)
        }).toThrow()
    })
})

/**
 * isValidBacktickedIdent(..) Unit Tests.
 */
describe('yiniHelpers: isValidBacktickedIdent(..) Unit Tests:', () => {
    test.each([
        ['`SectionName`'],
        ['`Section Name`'],
        ['`Section-Name`'],
        ['`Description of Project`'],
        ["`Amanda's Project`"],
        ['`Line1\\nLine2`'],
        ['`With\\tTab`'],
        ['`With\\rReturn`'],
        ['`With\\\\Backslash`'],
        ['`With\\`Backtick`'],
        ['``'],
    ])('Should return true for valid backticked identifier %s.', (fixture) => {
        // Act.
        const result = isValidBacktickedIdent(fixture)

        // Assert.
        expect(result).toEqual(true)
    })

    test.each([
        ['`Line1\nLine2`'],
        ['`Line1\n`'],
        ['`Project\tTitle`'],
        ['`\tTitle`'],
        ['`Project\rTitle`'],
        ['`With`RawBacktick`'],
        ['`TrailingBackslash\\`'],
        ['`Invalid\\xEscape`'],
    ])(
        'Should return false for invalid backticked identifier %s.',
        (fixture) => {
            // Act.
            const result = isValidBacktickedIdent(fixture)

            // Assert.
            expect(result).toEqual(false)
        },
    )

    test.each([['SectionName'], ['SectionName`'], ['`SectionName'], ['']])(
        'Should throw error when backticks are missing for "%s".',
        (fixture) => {
            // Act & Assert.
            expect(() => {
                isValidBacktickedIdent(fixture)
            }).toThrow()
        },
    )
})
