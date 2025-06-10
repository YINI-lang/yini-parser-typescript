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
 * Parse File Smoke Tests.
 */
describe('Parse File Smoke Tests:', () => {
    // Dir with smoke fixtures.
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    beforeAll(() => {})

    xtest('Parse file "1-basic-key-value.*".', () => {
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

    test('Parse file "2-basic-section-member.*".', () => {
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
