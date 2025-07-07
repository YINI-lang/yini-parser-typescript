import { stripNLAndAfter, trimBackticks } from '../../../src/utils/string'
import { debugPrint } from '../../../src/utils/system'

/**
 * trimBackticks(..) Tests.
 */
describe('Utils-String: trimBackticks(..) Unit Tests:', () => {
    test('Trim backticks test 1.', () => {
        // Arrange.
        const fixture = '`hello`'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('hello')
    })

    test('Trim backticks test 2.', () => {
        // Arrange.
        const fixture = 'hello'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('hello')
    })

    test('Trim backticks test 3.', () => {
        // Arrange.
        const fixture = '`hello'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('`hello')
    })

    test('Trim backticks test 4.', () => {
        // Arrange.
        const fixture = 'hello`'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('hello`')
    })

    test('Trim backticks test 5.', () => {
        // Arrange.
        const fixture = ''
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('')
    })

    test('Trim backticks test 6.', () => {
        // Arrange.
        const fixture = '``'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('')
    })

    test('Trim backticks test 7.', () => {
        // Arrange.
        const fixture = '`H`'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('H')
    })

    test('Trim backticks test 8.', () => {
        // Arrange.
        const fixture = '` `'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual(' ')
    })

    test('Trim backticks test 9.', () => {
        // Arrange.
        const fixture = '`Hello World`'
        // Act.
        const result = trimBackticks(fixture)
        // Assert.
        expect(result).toEqual('Hello World')
    })

    test('Trim backticks test 10.', () => {
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
    test('Strip NL-and-After test 1.', () => {
        // Arrange.
        const fixture = `SectionName1
//value = 11`
        // Act.
        const result = stripNLAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('SectionName1')
    })

    test('Strip NL-and-After test 2.', () => {
        // Arrange.
        const fixture = `\`Section Name 2\`
//value = 11`
        // Act.
        const result = stripNLAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('\`Section Name 2\`')
    })

    test('Strip NL-and-After test 3.', () => {
        // Arrange.
        const fixture = `	  SectionName3
        //value = 11`
        // Act.
        const result = stripNLAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('SectionName3')
    })

    test('Strip NL-and-After test 4.', () => {
        // Arrange.
        const fixture = `	   \`Section Name 4\`
        //value = 11`
        // Act.
        const result = stripNLAndAfter(fixture).trim()
        // Assert.
        expect(result).toEqual('\`Section Name 4\`')
    })
})
