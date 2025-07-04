import path from 'path'
import YINI from '../../../src'
import { isDebug } from '../../../src/config/env'
import { debugPrint, printObject } from '../../../src/utils/system'

const DIR_OF_FIXTURES = '../../fixtures/valid/section-nesting-w-classic-markers'

/**
 * Parse section nesting with classic (repeating characters) section head markers test.
 */
describe('Parse section nesting w classic markers:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    xtest('1. Parse section nesting w classic markers.', () => {
        // Arrange.
        const fileName = 'section-nesting-1.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section1).not.toBe('this should fail')
        expect(JSON.stringify(result)).toEqual(JSON.stringify({}))
    })
})
