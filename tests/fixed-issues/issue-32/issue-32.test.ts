import path from 'path'
import YINI from '../../../src'
import { debugPrint } from '../../../src/utils/print'
import { parseUntilError } from '../../test-helpers'

const DIR_OF_FIXTURES = './'

/**
 * Tests for issue #25.
 */
describe('Issue #32 Tests:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)
    const fileName = 'did_fail.yini'

    test('1. Should succeed parsing issue #32: "did_fail.yini" with neg. floats, and exp. numbers.', () => {
        // Arrange.
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath, true)
        debugPrint('fullPath = ' + fullPath)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.Section.float2).toEqual(-0.123)
    })
})

describe('Additional issue #32 Tests:', () => {
    test('1.a) Should throw error parsing double minus (--) before integer.', () => {
        // Arrange.
        const badYini = `^ Section
            value = --100
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('1.b) Should throw error parsing double minus (--) before float.', () => {
        // Arrange.
        const badYini = `^ Section
            value = --33.33
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('1.c) Should throw error parsing double minus (--) before exp. number.', () => {
        // Arrange.
        const badYini = `^ Section
            value = --0.30e2
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('2.a) Should throw error parsing double dots (..) before integer.', () => {
        // Arrange.
        const badYini = `^ Section
            value = ..100
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('2.b) Should throw error parsing double dots (..) in float.', () => {
        // Arrange.
        const badYini = `^ Section
            value = 33..33
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('2.c) Should throw error parsing double dots (..) in exp. number.', () => {
        // Arrange.
        const badYini = `^ Section
            value = 0..30e2
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('3. Should succeed parsing float without leading zero.', () => {
        // Arrange.
        const validYini = `^ Section
            value = .33
        `
        // Act.
        const result = YINI.parseFile(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.Section.value).toEqual(0.33)
    })

    test('3. Should succeed parsing negative float without leading zero.', () => {
        // Arrange.
        const validYini = `^ Section
            value = -.33
        `
        // Act.
        const result = YINI.parseFile(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.Section.value).toEqual(-0.33)
    })
})
