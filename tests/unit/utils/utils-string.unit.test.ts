import {
    splitLines,
    stripNLAndAfter,
    trimBackticks,
} from '../../../src/utils/string'
import { debugPrint } from '../../../src/utils/system'
import { stripCommentsAndAfter } from '../../../src/utils/yiniHelpers'

/**
 * trimBackticks(..) Tests.
 */
describe('Utils-String: trimBackticks(..) Unit Tests:', () => {
    test('1. Trim backticks test.', () => {
        // Arrange.
        const fixture = '`hello`'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('hello')
    })

    test('2. Trim backticks test.', () => {
        // Arrange.
        const fixture = 'hello'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('hello')
    })

    test('3. Trim backticks test.', () => {
        // Arrange.
        const fixture = '`hello'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('`hello')
    })

    test('4. Trim backticks test.', () => {
        // Arrange.
        const fixture = 'hello`'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('hello`')
    })

    test('5. Trim backticks test.', () => {
        // Arrange.
        const fixture = ''
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('')
    })

    test('6. Trim backticks test.', () => {
        // Arrange.
        const fixture = '``'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('')
    })

    test('7. Trim backticks test.', () => {
        // Arrange.
        const fixture = '`H`'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('H')
    })

    test('8. Trim backticks test.', () => {
        // Arrange.
        const fixture = '` `'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual(' ')
    })

    test('9. Trim backticks test.', () => {
        // Arrange.
        const fixture = '`Hello World`'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('Hello World')
    })

    test('10. Trim backticks test.', () => {
        // Arrange.
        const fixture = 'Hello World'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('Hello World')
    })
})

/**
 * stripNLAndAfter(..) Tests.
 */
describe('Utils-String: stripNLAndAfter(..) Unit Tests:', () => {
    test('1. Strip NL-and-After test.', () => {
        // Arrange.
        const fixture = 'SectionName1'
        // Act.
        const result = stripNLAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('2. Strip NL-and-After test.', () => {
        // Arrange.
        const fixture = ''
        // Act.
        const result = stripNLAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('')
    })

    test('3. Strip NL-and-After test.', () => {
        // Arrange.
        const fixture = `SectionName1 //value = 11`
        // Act.
        const result = stripNLAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('SectionName1 //value = 11')
    })

    test('4. Strip NL-and-After test.', () => {
        // Arrange.
        const fixture = `\`Section Name 2\`
             //value = 11`
        // Act.
        const result = stripNLAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('\`Section Name 2\`')
    })

    test('5. Strip NL-and-After test.', () => {
        // Arrange.
        const fixture = `	  SectionName3
        //value = 11`
        // Act.
        const result = stripNLAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('SectionName3')
    })

    test('6. Strip NL-and-After test.', () => {
        // Arrange.
        const fixture = `	   \`Section Name 4\`
               //value = 11`
        // Act.
        const result = stripNLAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('\`Section Name 4\`')
    })
})

/**
 * stripCommentsAndAfter(..) Tests.
 */
describe('Utils-String: stripCommentsAndAfter(..) Unit Tests:', () => {
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
 * splitLines(..) Tests.
 */
describe('Utils-String: splitLines(..) Unit Tests:', () => {
    test('1. splitLines(..) test.', () => {
        // Arrange.
        const fixture = 'line one'
        // Act.
        const result = splitLines(fixture)
        // Assert.
        expect(result[0]).toEqual('line one')
    })

    test('2. splitLines(..) test.', () => {
        // Arrange.
        const fixture = 'line one\n'
        // Act.
        const result = splitLines(fixture)
        // Assert.
        expect(result[0]).toEqual('line one')
    })

    test('3. splitLines(..) test.', () => {
        // Arrange.
        const fixture = 'line one\r line two\n'
        // Act.
        const result = splitLines(fixture)
        // Assert.
        expect(result[0]).toEqual('line one')
        expect(result[1]).toEqual(' line two')
    })

    test('4. splitLines(..) test.', () => {
        // Arrange.
        const fixture = 'line one\nline two\r\nline three\rline four'
        // Act.
        const result = splitLines(fixture)
        // Assert.
        expect(result[0]).toEqual('line one')
        expect(result[1]).toEqual('line two')
        expect(result[2]).toEqual('line three')
        expect(result[3]).toEqual('line four')
    })
})
