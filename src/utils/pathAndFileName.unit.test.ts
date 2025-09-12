import { getFileNameExtension } from './pathAndFileName'

/**
 * Utils-Path and File Name Unit Tests.
 */
describe('Utils-Path and File Name Unit Tests:', () => {
    test('1. Get correct extension from file name.', () => {
        // Arrange.
        const fixture = 'config.yini'
        // Act.
        const result = getFileNameExtension(fixture)
        // Assert.
        expect(result).toEqual('.yini')
    })

    test('2. Get correct extension from file name.', () => {
        // Arrange.
        const fixture = 'config.YINI'
        // Act.
        const result = getFileNameExtension(fixture)
        // Assert.
        expect(result).toEqual('.YINI')
    })

    test('3. Get correct extension from file name.', () => {
        // Arrange.
        const fixture = 'My Config.yini'
        // Act.
        const result = getFileNameExtension(fixture)
        // Assert.
        expect(result).toEqual('.yini')
    })

    test('4. Get correct extension from file name.', () => {
        // Arrange.
        const fixture = 'My.Config.yini'
        // Act.
        const result = getFileNameExtension(fixture)
        // Assert.
        expect(result).toEqual('.yini')
    })

    test('5. Get correct extension from file name (edge-case).', () => {
        // Arrange.
        const fixture = '' // (!) Blank!
        // Act.
        const result = getFileNameExtension(fixture)
        // Assert.
        expect(result).toEqual('')
    })

    test('6. Get correct extension from file name (edge-case).', () => {
        // Arrange.
        const fixture = 'Config' // (!) Blank!
        // Act.
        const result = getFileNameExtension(fixture)
        // Assert.
        expect(result).toEqual('')
    })

    test('7. Get correct extension from file name (with "./" path).', () => {
        // Arrange.
        const fixture = './config/general.yini'
        // Act.
        const result = getFileNameExtension(fixture)
        // Assert.
        expect(result).toEqual('.yini')
    })

    test('8. Get correct extension from file name (with "../" path).', () => {
        // Arrange.
        const fixture = '../../../config/general.yini'
        // Act.
        const result = getFileNameExtension(fixture)
        // Assert.
        expect(result).toEqual('.yini')
    })

    test('9. Get correct extension from file name (with "\\" path).', () => {
        // Arrange.
        const fixture = '\config\general.yini'
        // Act.
        const result = getFileNameExtension(fixture)
        // Assert.
        expect(result).toEqual('.yini')
    })
})
