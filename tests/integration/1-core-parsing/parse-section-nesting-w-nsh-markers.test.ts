import path from 'path'
import YINI from '../../../src'
import { isDebug } from '../../../src/config/env'
import { debugPrint, printObject } from '../../../src/utils/system'

const DIR_OF_FIXTURES = '../../fixtures/valid/section-nesting-w-nsh-markers'

/**
 * Parse section nesting with NUMERIC SHORTHAND section head markers test.
 */
describe('Parse section nesting w NUMERIC SHORTHAND markers:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    test('1. Parse section nesting w NUMERIC SHORTHAND markers.', () => {
        // Arrange.
        const fileName = 'nsh-section-nesting-1.yini'
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
})
