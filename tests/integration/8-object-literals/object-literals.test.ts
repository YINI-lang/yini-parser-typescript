import path from 'path'
import YINI from '../../../src'
import { isDebug } from '../../../src/config/env'
import { debugPrint, printObject } from '../../../src/utils/print'

/**
 * Object literal tests.
 */
describe('Object literal tests:', () => {
    xtest('1. Should parse object literal correctly.', () => {
        // Arrange.
        const validYini = `
            ^ Database
            pool = { max: 10, min: 2 }
        `

        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Database.pool.max).toEqual(10)
        expect(result.Database.pool.min).toEqual(2)
        expect(result.Database.pool.idle).toEqual(10000)
    })

    test('2. Should throw on incorrect object literals (using =).', () => {
        // Arrange.
        const invalidYini = `
            ^ Database
            pool = { max = 10, min = 2 }
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(invalidYini)
        }).toThrow()
    })
})
