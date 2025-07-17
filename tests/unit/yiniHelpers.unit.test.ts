import {
    isValidBacktickedIdent,
    isValidSimpleIdent,
    stripCommentsAndAfter,
} from '../../src/yiniHelpers'

/**
 * stripCommentsAndAfter(..) Unit Tests.
 */
describe('yiniHelpers: stripCommentsAndAfter(..) Unit Tests:', () => {
    test('1. tripCommentsAndAfter(..) test.', () => {
        // Arrange.
        const fixture = 'SectionName1 // This is a comment.'
        // Act.
        const result = stripCommentsAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('2. tripCommentsAndAfter(..) test.', () => {
        // Arrange.
        const fixture = ''
        // Act.
        const result = stripCommentsAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('')
    })

    test('3. tripCommentsAndAfter(..) test.', () => {
        // Arrange.
        const fixture = 'SectionName1'
        // Act.
        const result = stripCommentsAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('4. tripCommentsAndAfter(..) test.', () => {
        // Arrange.
        const fixture = 'SectionName1 # This is a comment.'
        // Act.
        const result = stripCommentsAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('5. tripCommentsAndAfter(..) test.', () => {
        // Arrange.
        const fixture = 'SectionName1 // This is a comment.'
        // Act.
        const result = stripCommentsAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('6. tripCommentsAndAfter(..) test.', () => {
        // Arrange.
        const fixture = 'SectionName1# This is a comment.'
        // Act.
        const result = stripCommentsAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('7. tripCommentsAndAfter(..) test.', () => {
        // Arrange.
        const fixture = 'SectionName1//This is a comment.'
        // Act.
        const result = stripCommentsAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('8. tripCommentsAndAfter(..) test.', () => {
        // Arrange.
        const fixture = '--SectionName1//This is a comment.'
        // Act.
        const result = stripCommentsAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('')
    })

    test('9. tripCommentsAndAfter(..) test.', () => {
        // Arrange.
        const fixture = '; This is a comment line.'
        // Act.
        const result = stripCommentsAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('')
    })

    test('10. tripCommentsAndAfter(..) test.', () => {
        // Arrange.
        const fixture = ';This is a comment line.'
        // Act.
        const result = stripCommentsAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('')
    })
})

/**
 * isValidSimpleIdent(..) Unit Tests.
 */
describe('yiniHelpers: isValidSimpleIdent(..) Unit Tests:', () => {
    test('1. isValidSimpleIdent(..) should be true.', () => {
        // Arrange.
        const fixture = 'foo'
        // Act.
        const result = isValidSimpleIdent(fixture)
        // Assert.
        expect(result).toEqual(true)
    })

    test('2. isValidSimpleIdent(..) should be true.', () => {
        // Arrange.
        const fixture = '_bar42'
        // Act.
        const result = isValidSimpleIdent(fixture)
        // Assert.
        expect(result).toEqual(true)
    })

    test('3. isValidSimpleIdent(..) should be true.', () => {
        // Arrange.
        const fixture = 'x'
        // Act.
        const result = isValidSimpleIdent(fixture)
        // Assert.
        expect(result).toEqual(true)
    })

    test('4. isValidSimpleIdent(..) should be true.', () => {
        // Arrange.
        const fixture = 'y2_'
        // Act.
        const result = isValidSimpleIdent(fixture)
        // Assert.
        expect(result).toEqual(true)
    })

    test('5. isValidSimpleIdent(..) should be false.', () => {
        // Arrange.
        const fixture = '9abc'
        // Act.
        const result = isValidSimpleIdent(fixture)
        // Assert.
        expect(result).toEqual(false)
    })

    test('6. isValidSimpleIdent(..) should be false.', () => {
        // Arrange.
        const fixture = 'ab-cd'
        // Act.
        const result = isValidSimpleIdent(fixture)
        // Assert.
        expect(result).toEqual(false)
    })

    test('7. isValidSimpleIdent(..) should be false.', () => {
        // Arrange.
        const fixture = '3'
        // Act.
        const result = isValidSimpleIdent(fixture)
        // Assert.
        expect(result).toEqual(false)
    })

    test('8. isValidSimpleIdent(..) should be false.', () => {
        // Arrange.
        const fixture = 'foo '
        // Act.
        const result = isValidSimpleIdent(fixture)
        // Assert.
        expect(result).toEqual(false)
    })

    test('9. isValidSimpleIdent(..) should be false.', () => {
        // Arrange.
        const fixture = 'foo bar'
        // Act.
        const result = isValidSimpleIdent(fixture)
        // Assert.
        expect(result).toEqual(false)
    })

    test('10. isValidSimpleIdent(..) should be false.', () => {
        // Arrange.
        const fixture = 'ab.cd'
        // Act.
        const result = isValidSimpleIdent(fixture)
        // Assert.
        expect(result).toEqual(false)
    })

    test('11. Should throw error if isValidSimpleIdent(..) received an empty string.', () => {
        // Arrange.
        const fixture = ''
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
    test('1. isValidBacktickedIdent(..) should be true.', () => {
        // Arrange.
        const fixture = '`SectionName`'
        // Act.
        const result = isValidBacktickedIdent(fixture)
        // Assert.
        expect(result).toEqual(true)
    })

    test('2. isValidBacktickedIdent(..) with a space should be true.', () => {
        // Arrange.
        const fixture = '`Section Name`'
        // Act.
        const result = isValidBacktickedIdent(fixture)
        // Assert.
        expect(result).toEqual(true)
    })

    test('3. isValidBacktickedIdent(..) with a dash should be true.', () => {
        // Arrange.
        const fixture = '`Section-Name`'
        // Act.
        const result = isValidBacktickedIdent(fixture)
        // Assert.
        expect(result).toEqual(true)
    })

    test('4. isValidBacktickedIdent(..) with spaces should be true.', () => {
        // Arrange.
        const fixture = '`Description of Project`'
        // Act.
        const result = isValidBacktickedIdent(fixture)
        // Assert.
        expect(result).toEqual(true)
    })

    test('5. isValidBacktickedIdent(..) should be true.', () => {
        // Arrange.
        const fixture = "`Amanda's Project`"
        // Act.
        const result = isValidBacktickedIdent(fixture)
        // Assert.
        expect(result).toEqual(true)
    })

    test('6. isValidBacktickedIdent(..) with escaped newline should be true.', () => {
        // Arrange.
        const fixture = '`Line1\\nLine2`' // NOTE: Escaped newline in Yini!
        // Act.
        const result = isValidBacktickedIdent(fixture)
        // Assert.
        expect(result).toEqual(true)
    })

    test('7. isValidBacktickedIdent(..) with escaped tab should be true.', () => {
        // Arrange.
        const fixture = '`With\\tTab`' // NOTE: Escaped tab in Yini!
        // Act.
        const result = isValidBacktickedIdent(fixture)
        // Assert.
        expect(result).toEqual(true)
    })

    test('8. isValidBacktickedIdent(..) with empty (``) should be true.', () => {
        // Arrange.
        const fixture = '``' // Empty is allowed: ``, as in spec (due to conform with the JSON empty key "").
        // Act.
        const result = isValidBacktickedIdent(fixture)
        // Assert.
        expect(result).toEqual(true)
    })

    test('9. isValidBacktickedIdent(..) with a raw newline should be false.', () => {
        // Arrange.
        const fixture = '`Line1\nLine2`' // false (raw newline).
        // Act.
        const result = isValidBacktickedIdent(fixture)
        // Assert.
        expect(result).toEqual(false)
    })

    test('10. isValidBacktickedIdent(..) with a raw newline should be false.', () => {
        // Arrange.
        const fixture = '`Line1\n`' // false (raw newline).
        // Act.
        const result = isValidBacktickedIdent(fixture)
        // Assert.
        expect(result).toEqual(false)
    })

    test('11. isValidBacktickedIdent(..) with a raw tab should be false.', () => {
        // Arrange.
        const fixture = '`Project\tTitle`' // false (raw tab).
        // Act.
        const result = isValidBacktickedIdent(fixture)
        // Assert.
        expect(result).toEqual(false)
    })

    test('12. isValidBacktickedIdent(..) with a raw tab should be false.', () => {
        // Arrange.
        const fixture = '`\tTitle`' // false (raw tab).
        // Act.
        const result = isValidBacktickedIdent(fixture)
        // Assert.
        expect(result).toEqual(false)
    })

    test('13. Should throw error if isValidBacktickedIdent(..) missing backticks.', () => {
        // Arrange.
        const fixture = 'SectionName'
        // Act & Assert.
        expect(() => {
            isValidBacktickedIdent(fixture)
        }).toThrow()
    })

    test('14. Should throw error if isValidBacktickedIdent(..) missing start backtick.', () => {
        // Arrange.
        const fixture = 'SectionName`'
        // Act & Assert.
        expect(() => {
            isValidBacktickedIdent(fixture)
        }).toThrow()
    })

    test('15. Should throw error if isValidBacktickedIdent(..) missing end backtick.', () => {
        // Arrange.
        const fixture = '`SectionName'
        // Act & Assert.
        expect(() => {
            isValidBacktickedIdent(fixture)
        }).toThrow()
    })
})
