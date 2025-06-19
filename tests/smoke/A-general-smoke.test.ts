import YINI from '../../src'
import { debugPrint } from '../../src/utils/system'

/**
 * General Smoke Tests.
 */
describe('General Smoke Tests:', () => {
    beforeAll(() => {})
    beforeAll(() => {
        debugPrint('beforeAll')

        // const isDebug = !!process.env.IS_DEBUG
        // if (!isDebug) {
        //     console.log('process.env.IS_DEBUG is false, OK')
        // } else {
        //     console.error('process.env.IS_DEBUG is true, FAIL')
        //     console.error(
        //         'Detected that IS_DEBUG is true, is should be false when testing',
        //     )
        //     console.error('process.env.IS_DEBUG:')
        //     console.error(process.env.IS_DEBUG)

        //     throw Error('ERROR: A variable in ENV has wrong state')
        // }
    })

    // Trivial test to see if everything is okey before moving on to "real" tests.
    test('1. Trivial test case.', () => {
        // Arrange.
        const a = 3
        const b = 5
        // Act.
        const result = a + b
        // Assert.
        expect(result).toEqual(8)
    })

    test('2. Short YINI Example.', () => {
        // Arrange.
        const validYini = `^ sectionTitle
            strVar = "Hello World!"
            intVar = 98.21`
        // Act.
        const result = YINI.parse(validYini)
        debugPrint(result)
        // Assert.
        expect(result.sectionTitle.strVar).toEqual('Hello World!')
        expect(result.sectionTitle.intVar).toEqual(98.21)
    })

    test('3. Should throw error if parsing some garbage.', () => {
        // Arrange.
        const fixture = `someGarbage`

        // Act & Assert.
        expect(() => {
            YINI.parse(fixture)
        }).toThrow()
    })

    test('4. Should throw error if parsing unknown file name.', () => {
        // Arrange.
        const fullPath = 'gibberish-path-and-file-name'

        // Act & Assert.
        expect(() => {
            debugPrint('fullPath = ' + fullPath)
            YINI.parseFile(fullPath)
        }).toThrow()
    })
})
