import { trimBackticks } from '../../src/utils/string'
import { debugPrint } from '../../src/utils/system'

/**
 * Utils-String Unit Tests.
 */
describe('Utils-String Unit Tests:', () => {
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
