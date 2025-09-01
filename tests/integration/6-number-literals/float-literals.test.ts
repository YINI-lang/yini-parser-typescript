import path from 'path'
import YINI from '../../../src'
import { isDebug } from '../../../src/config/env'
import { debugPrint, printObject, toPrettyJSON } from '../../../src/utils/print'

/**
 * Float number literal tests.
 */
describe('Float number literal tests:', () => {
    test('1. Should parse a bunch of float num literals correctly.', () => {
        // Arrange.
        const validYini = `^ Ints
            value1 = 0.0
            value2 = -0.0
            value3 = 1.01
            value4 = 3.1415
            value5 = -0.1
            value6 = 1000.0
            value7 = -2.5
            value8 = 0.75
            value9 = -1234.567
            /END
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Ints.value1).toEqual(0)
        expect(result.Ints.value2).toEqual(-0)
        expect(result.Ints.value3).toEqual(1.01)
        expect(result.Ints.value4).toEqual(3.1415)
        expect(result.Ints.value5).toEqual(-0.1)
        expect(result.Ints.value6).toEqual(1000.0)
        expect(result.Ints.value7).toEqual(-2.5)
        expect(result.Ints.value8).toEqual(0.75)
        expect(result.Ints.value9).toEqual(-1234.567)
    })

    test('2. Should succeed parsing a bunch of positive edge-case float numbers.', () => {
        // Arrange.
        const validYini = `^ PosFloats
            value = 1.01
            smallest_pos = 0.0
            just_above_zero = 0.0000001
            one = 1.0
            long_fraction = 3.1415926535
            trailing_zero = 2.5000
            big_float = 1234567890.0
            under_one = 0.5
            leading_dot = .25
            single_digit = 9.0
            large_decimal = 9999999999.99999
            /END
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            PosFloats: {
                value: 1.01,
                smallest_pos: 0.0,
                just_above_zero: 0.0000001,
                one: 1.0,
                long_fraction: 3.1415926535,
                trailing_zero: 2.5,
                big_float: 1234567890.0,
                under_one: 0.5,
                leading_dot: 0.25,
                single_digit: 9.0,
                large_decimal: 9999999999.99999,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3. Should succeed parsing a bunch of negative edge-case float numbers.', () => {
        // Arrange.
        const validYini = `^ NegFloats
            value = -1.01
            smallest_neg = -0.0
            just_below_zero = -0.0000001
            minus_one = -1.0
            long_fraction = -3.1415926535
            trailing_zero = -2.5000
            big_float = -1234567890.0
            under_minus_one = -0.5
            leading_dot = -.25
            single_digit = -9.0
            large_decimal = -9999999999.99999
            /END
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            NegFloats: {
                value: -1.01,
                smallest_neg: -0.0,
                just_below_zero: -0.0000001,
                minus_one: -1.0,
                long_fraction: -3.1415926535,
                trailing_zero: -2.5,
                big_float: -1234567890.0,
                under_minus_one: -0.5,
                leading_dot: -0.25,
                single_digit: -9.0,
                large_decimal: -9999999999.99999,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('4.1) Should throw error parsing bad float number.', () => {
        // Arrange.
        const badYini = `^ Section
            value = 3e.1415
            /END
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.2) Should throw error parsing bad float number.', () => {
        // Arrange.
        const badYini = `^ Section
            value = e10 // INVALID: no number before e
            /END
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.3) Should throw error parsing bad float number.', () => {
        // Arrange.
        const badYini = `^ Section
            value = 1e // INVALID: no digits after e
            /END
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.4) Should throw error parsing bad float number.', () => {
        // Arrange.
        const badYini = `^ Section
            value = 1e- // INVALID: no digits after e-
            /END
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })
})
