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
describe('Parse Inline Smoke Tests:', () => {
    beforeAll(() => {})

    //@todo Need to fix so a single member is attached or returned with the implicit base object.
    xtest('1. Minimal Valid Code (a single member).', () => {
        // Arrange.
        const validYini = 'number = 42'
        // Act.
        const result = YINI.parse(validYini)
        console.log(result)
        // Assert.
        expect(result.number).toEqual(42)
    })

    test('2. Minimal Valid Code (section with a single member).', () => {
        // Arrange.
        const validYini = `^title
    another = 64`
        // Act.
        const result = YINI.parse(validYini)
        console.log(result)
        // Assert.
        expect(result.title.another).toEqual(64)
    })

    test('Parse inline config string.', () => {
        // Arrange.
        // Act.
        const result = YINI.parse(fixtureYini)
        console.log(result)
        // Assert.
        expect(!!result).toEqual(true)
    })
})
