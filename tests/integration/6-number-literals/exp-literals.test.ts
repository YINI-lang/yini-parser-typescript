import path from 'path'
import YINI from '../../../src'
import { isDebug } from '../../../src/config/env'
import { debugPrint, printObject, toPrettyJSON } from '../../../src/utils/print'

/**
 * Exp. num. literal tests.
 */
describe('Exp num literal tests:', () => {
    test('1. Should parse a bunch of exp. num. literals correctly (with edge-cases).', () => {
        // Arrange.
        const validYini = `^ Section
            float2 = -0.123
            float3 = 0.0    // This line works!
            float4 = 0.00
            float5 = 321.0001
            float6 = -99.0099
            exp = 0.99e3    // This line works!
            exp2 = -0.30e2
            zero_exp = 0e0  // Edge-case = 0.0
            /end
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Section.float2).toEqual(-0.123)
        expect(result.Section.float3).toEqual(0.0)
        expect(result.Section.float4).toEqual(0.0)
        expect(result.Section.float5).toEqual(321.0001)
        expect(result.Section.float6).toEqual(-99.0099)
        expect(result.Section.exp).toEqual(0.99e3)
        expect(result.Section.exp2).toEqual(-0.3e2)
        expect(result.Section.zero_exp).toEqual(0.0)
    })

    test('2. Should succeed parsing a bunch of positive exp numbers (with edge-cases).', () => {
        // Arrange.
        const validYini = `^ ExpNumbers
            value = 1.3e3
            pi_approx = +3.14e0
            avogadro = 6.022e23
            planck = +6.626e-34
            tiny = 1e-10
            big = +2e8
            seconds_in_year = 3.1536e7
            short = +5e1
            floaty = 7.77e2
            milli = +1e-3
            tiny_pos = 1e-10        // Edge-case!
            huge_pos = +9.99e307     // Edge-case!
            one_pos = 1.0e0         // Edge-case!
            just_below_one = +.999e0 // Edge-case!
            leading_dot_pos = .5e2  // Edge-case!
            /END
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            ExpNumbers: {
                value: 1.3e3,
                pi_approx: 3.14,
                avogadro: 6.022e23,
                planck: 6.626e-34,
                tiny: 1e-10,
                big: 2e8,
                seconds_in_year: 3.1536e7,
                short: 5e1,
                floaty: 7.77e2,
                milli: 1e-3,
                tiny_pos: 1e-10,
                huge_pos: 9.99e307,
                one_pos: 1.0,
                just_below_one: 0.999,
                leading_dot_pos: 0.5e2,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3. Should succeed parsing a bunch of negative exp numbers (with edge-cases).', () => {
        // Arrange.
        const validYini = `^ ExpNumbers
            value = -1.3e3
            pi_approx = -3.14e0
            avogadro = -6.022e23
            planck = -6.626e-34
            tiny = -1e-10
            big = -2e8
            seconds_in_year = -3.1536e7
            short = -5e1
            floaty = -7.77e2
            milli = -1e-3
            big_neg = -5.5e100              // Edge-case!
            tiny_neg = -1e-20               // Edge-case!
            negative_one = -1e0             // Edge-case!
            just_above_neg_one = -.999e0    // Edge-case!
            leading_dot_neg = -.25e5        // Edge-case!
            /END
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            ExpNumbers: {
                value: -1.3e3,
                pi_approx: -3.14,
                avogadro: -6.022e23,
                planck: -6.626e-34,
                tiny: -1e-10,
                big: -2e8,
                seconds_in_year: -3.1536e7,
                short: -5e1,
                floaty: -7.77e2,
                milli: -1e-3,
                big_neg: -5.5e100,
                tiny_neg: -1e-20,
                negative_one: -1,
                just_above_neg_one: -0.999,
                leading_dot_neg: -0.25e5,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('4.1) Should throw error parsing bad exp. number.', () => {
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

    test('4.2) Should throw error parsing bad exp. number.', () => {
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

    test('4.3) Should throw error parsing bad exp. number.', () => {
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

    test('4.4) Should throw error parsing bad exp. number.', () => {
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
