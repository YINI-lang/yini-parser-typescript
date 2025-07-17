import path from 'path'
import YINI from '../../../src'
import { debugPrint } from '../../../src/utils/system'

const DIR_OF_FIXTURES = '../../fixtures/valid/section-nesting-w-classic-markers'

const answerSectionNestingBigger = {
    Section1: {
        bValue1: true,
        intValue: 1,
        Section11: {
            sValue: 11,
            Section111: {
                sValue: 111,
                intValue: 111,
            },
        },
        Section12: {
            sValue: 12,
        },
    },
    Section2: {
        sValue: 2,
        Section21: {
            sValue: 21,
            bValue: false,
            Section211: {
                sValue: 211,
                Section2111: {
                    sValue: 2111,
                },
                Section2112: {
                    sValue: 2112,
                    strValue: 'test2112',
                },
            },
        },
        Section22: {
            bValue3: true,
            Section221: {
                sValue: 221,
            },
        },
        Section23: {
            bValue3: true,
        },
    },
}

/**
 * Parse bigger section nesting as an object.
 */
describe('Parse bigger section nesting as an object test:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    test('1. Parse bigger section nesting as object, file "section-nesting-bigger.yini".', () => {
        // Arrange.
        const fileName = 'section-nesting-bigger.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(JSON.stringify(result, null, 4)).toEqual(
            JSON.stringify(answerSectionNestingBigger, null, 4),
        )
    })

    test('2. Parse bigger section nesting as object, file "section-nesting-bigger-w-comments.yini".', () => {
        // Arrange.
        const fileName = 'section-nesting-bigger-w-comments.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(JSON.stringify(result, null, 4)).toEqual(
            JSON.stringify(answerSectionNestingBigger, null, 4),
        )
    })
})
