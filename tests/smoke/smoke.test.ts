//import { describe, expect, test } from '@jest/globals'
//import * from '../fixtures/Simple-1.yini'

import path from 'path'
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
 * Smoke System Tests.
 */
describe('Smoke System Tests:', () => {
    beforeAll(() => {})
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
    test('Basic test case.', () => {
        // Arrange.
        const a = 3
        const b = 4
        // Act.
        const result = a + b
        // Assert.
        expect(result).toEqual(7)
    })
})

/**
 * Smoke Only-parse Tests.
 */
describe('Smoke Only-parse Tests:', () => {
    beforeAll(() => {})
    test('Only-parse YINI config string.', () => {
        // Arrange.
        // Act.
        const result = YINI.parse(fixtureYini)
        console.log(result)
        // Assert.
        expect(!!result).toEqual(true)
    })
})

/**
 * Smoke Parse & Eval Tests.
 */
xdescribe('Smoke Parse & Eval Tests:', () => {
    beforeAll(() => {})
    test('Parse & Eval YINI config string.', () => {
        // Arrange.
        // Act.
        const result = YINI.parse(fixtureYini)
        console.log(result)
        // Assert.
        expect(!!result).toEqual(true)
    })
})

/**
 * Smoke ParseFile & Eval Tests.
 */
describe('Smoke ParseFile & Eval Tests:', () => {
    // Dir with smoke fixtures.
    const baseDir = path.join(__dirname, 'fixtures')

    beforeAll(() => {})

    xtest('ParseFile & Eval the file "1-basic-key-value.*".', () => {
        // Arrange.
        const fileName = '1-basic-key-value.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        console.log(result)

        // Assert.
        //expect(JSON.stringify(result.Minimal)).toEqual('{"key":321}')
        expect(result.answer).toEqual(42)
    })

    test('ParseFile & Eval the file "2-basic-section-member.*".', () => {
        // Arrange.
        const fileName = '2-basic-section-member.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath)
        console.log(result)

        // Assert.
        expect(JSON.stringify(result.Minimal)).toEqual('{"key":321}')
        expect(result.Minimal.key).toEqual(321)
    })
})
