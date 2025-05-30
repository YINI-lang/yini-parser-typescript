//import { describe, expect, test } from '@jest/globals'
//import * from '../fixtures/Simple-1.yini'

import YINI from '../../src'

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
 * Smoke Tests.
 */
describe('Smoke Tests', () => {
    beforeAll(() => {
        // init({ countryCode: 'DK', currencyCode: 'EUR', language: 'en' })
        console.log('beforeAll')
    })

    test('Counts addition correctly.', () => {
        // Arrange.
        const a = 3
        const b = 7
        // Act.
        const result = a + b
        // Assert.
        expect(result).toEqual(10)
    })

    test('Parses YINI config string.', () => {
        // Arrange.
        // Act.
        const result = YINI.parse(fixtureYini)
        // Assert.
        expect(!!result).toEqual(true)
    })
})
