//import { describe, expect, test } from '@jest/globals'
//import * from '../smoke-fixtures/Simple-1.yini'

import path from 'path'
import YINI from '../../src'

const DIR_OF_FIXTURES = 'smoke-fixtures'

const fixtureYini = `
^ SmokeConfig
varAge = 99
varBool = YES
varName = "Teodor"
listItems = ["a", "b", "c"]
	^^Extra
	isExtra = true
/END
`

/**
 * Parse Inline Smoke Tests.
 */
xdescribe('Parse Inline Smoke Tests:', () => {
    beforeAll(() => {})
    test('Parse inline config string.', () => {
        // Arrange.
        // Act.
        const result = YINI.parse(fixtureYini)
        console.log(result)
        // Assert.
        expect(!!result).toEqual(true)
    })
})
