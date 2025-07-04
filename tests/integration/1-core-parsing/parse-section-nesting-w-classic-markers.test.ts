import path from 'path'
import YINI from '../../../src'
import { isDebug } from '../../../src/config/env'
import { debugPrint, printObject } from '../../../src/utils/system'

const DIR_OF_FIXTURES = '../../fixtures/valid/section-nesting-w-classic-markers'

/**
 * Parse section nesting with classic (repeating characters) section head markers test.
 */
describe('Parse section nesting w CLASSIC markers:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    test('1. Parse section nesting w CLASSIC markers.', () => {
        // Arrange.
        const fileName = 'section-nesting-1.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(JSON.stringify(result, null, 4)).toEqual(
            JSON.stringify({ Section1: { Section11: { value: 11 } } }, null, 4),
        )
    })

    test('2. Parse section nesting w CLASSIC markers.', () => {
        // Arrange.
        const fileName = 'section-nesting-2.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(JSON.stringify(result, null, 4)).toEqual(
            JSON.stringify(
                {
                    Section1: { value: 1, Section11: { value: 11 } },
                    Section2: { value: 2 },
                },
                null,
                4,
            ),
        )
    })

    test('3. Parse section nesting w CLASSIC markers.', () => {
        // Arrange.
        const fileName = 'section-nesting-3.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(JSON.stringify(result, null, 4)).toEqual(
            JSON.stringify(
                {
                    Section1: {
                        value: 1,
                        Section11: { value: 11, Section111: { value: 111 } },
                    },
                },
                null,
                4,
            ),
        )
    })

    test('4. Parse section nesting w CLASSIC markers.', () => {
        // Arrange.
        const fileName = 'section-nesting-4.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(JSON.stringify(result, null, 4)).toEqual(
            JSON.stringify(
                {
                    Section1: {
                        Section11: { Section111: { value: 111 } },
                    },
                },
                null,
                4,
            ),
        )
    })

    test('4. Parse section nesting w CLASSIC markers.', () => {
        // Arrange.
        const fileName = 'section-nesting-4.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(JSON.stringify(result, null, 4)).toEqual(
            JSON.stringify(
                {
                    Section1: {
                        Section11: { Section111: { value: 111 } },
                    },
                },
                null,
                4,
            ),
        )
    })

    test('5. Parse section nesting w CLASSIC markers.', () => {
        // Arrange.
        const fileName = 'section-nesting-5.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(JSON.stringify(result, null, 4)).toEqual(
            JSON.stringify(
                {
                    Section1: {
                        Section11: { Section111: { value: 111 } },
                    },
                    Section2: { value: 2 },
                },
                null,
                4,
            ),
        )
    })

    test('6. Parse section nesting w CLASSIC markers.', () => {
        // Arrange.
        const fileName = 'section-nesting-6.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(JSON.stringify(result, null, 4)).toEqual(
            JSON.stringify(
                {
                    Section1: {
                        Section11: { Section111: { value: 111 } },
                    },
                    Section2: {
                        value: 2,
                        Section21: { Section211: { value: 211 } },
                    },
                },
                null,
                4,
            ),
        )
    })

    test('7. Parse section nesting w CLASSIC markers.', () => {
        // Arrange.
        const fileName = 'section-nesting-7.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(JSON.stringify(result, null, 4)).toEqual(
            JSON.stringify(
                {
                    Section1: {
                        Section11: { Section111: { value: 111 } },
                    },
                    Section2: {
                        value: 2,
                        Section21: { Section211: { value: 211 } },
                        Section22: { value: 221 },
                    },
                },
                null,
                4,
            ),
        )
    })

    test('8. Parse section nesting w CLASSIC markers.', () => {
        // Arrange.
        const fileName = 'section-nesting-8.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(JSON.stringify(result, null, 4)).toEqual(
            JSON.stringify(
                {
                    Section1: {
                        Section11: { Section111: {} },
                    },
                    Section2: {
                        value: 2,
                        Section21: { Section211: {} },
                        Section22: { value: 22 },
                    },
                },
                null,
                4,
            ),
        )
    })
})
