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
        console.log('beforeAll')

        const isDebug = !!process.env.IS_DEBUG
        if (!isDebug) {
            console.log('process.env.IS_DEBUG is false, OK')
        } else {
            console.error('process.env.IS_DEBUG is true, FAIL')
            console.error(
                'Detected that IS_DEBUG is true, is should be false when testing',
            )
            console.error('process.env.IS_DEBUG:')
            console.error(process.env.IS_DEBUG)

            throw Error('ERROR: A variable in ENV has wrong state')
        }
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
