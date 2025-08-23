import path from 'path'
import YINI from '../../../src'
import { debugPrint, toPrettyJSON } from '../../../src/utils/print'
import { parseUntilError } from '../../test-helpers'

const DIR_OF_FIXTURES = './'

/**
 * Tests for issue #25.
 */
describe('Issue #32 Tests:', () => {
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)
    const fileName = 'did_fail.yini'

    test('1. Should succeed parsing issue #32: "did_fail.yini" with neg. floats, and exp. numbers.', () => {
        // Arrange.
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath, false)
        debugPrint('fullPath = ' + fullPath)
        debugPrint('result:')
        debugPrint(result)

        // Assert all values in the file.
        expect(result.Section.float2).toEqual(-0.123)
        expect(result.Section.float3).toEqual(0.0)
        expect(result.Section.float4).toEqual(0.0)
        expect(result.Section.float5).toEqual(321.0001)
        expect(result.Section.float6).toEqual(-99.0099)
        expect(result.Section.exp).toEqual(0.99e3)
        expect(result.Section.exp2).toEqual(-0.3e2)
    })
})

describe('Additional issue #32 Tests:', () => {
    test('1.a) Should throw error parsing double minus (--) before integer.', () => {
        // Arrange.
        const badYini = `^ Section
            value = --100
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('1.b) Should throw error parsing double minus (--) before float.', () => {
        // Arrange.
        const badYini = `^ Section
            value = --33.33
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('1.c) Should throw error parsing double minus (--) before exp. number.', () => {
        // Arrange.
        const badYini = `^ Section
            value = --0.30e2
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('2.a) Should throw error parsing double dots (..) before integer.', () => {
        // Arrange.
        const badYini = `^ Section
            value = ..100
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('2.b) Should throw error parsing double dots (..) in float.', () => {
        // Arrange.
        const badYini = `^ Section
            value = 33..33
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('2.c) Should throw error parsing double dots (..) in exp. number.', () => {
        // Arrange.
        const badYini = `^ Section
            value = 0..30e2
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('3.a) Should succeed parsing float without leading zero.', () => {
        // Arrange.
        const validYini = `^ Section
            value = .33
            /END
        `
        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.Section.value).toEqual(0.33)
    })

    test('3.b) Should succeed parsing negative float without leading zero.', () => {
        // Arrange.
        const validYini = `^ Section
            value = -.33
            /End
        `
        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.Section.value).toEqual(-0.33)
    })

    test('4.a) Should succeed parsing exp num without leading zero.', () => {
        // Arrange.
        const validYini = `^ Section
            value = .3e5
            /end
        `
        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.Section.value).toEqual(0.3e5)
    })

    test('4.b) Should succeed parsing negative exp num without leading zero.', () => {
        // Arrange.
        const validYini = `^ Section
            value = -.3e5
            /END
        `
        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.Section.value).toEqual(-0.3e5)
    })

    test('5. Should succeed parsing a bunch of integer numbers.', () => {
        // Arrange.
        const validYini = `^ Ints
            value = 0
            count = 42
            maxItems = 1000
            minScore = 7
            threshold = 99999
            uptimeSeconds = 86400
            temperature = 25
            users = 15
            year = 2025
            retryLimit = 3
            /END
        `
        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            Ints: {
                value: 0,
                count: 42,
                maxItems: 1000,
                minScore: 7,
                threshold: 99999,
                uptimeSeconds: 86400,
                temperature: 25,
                users: 15,
                year: 2025,
                retryLimit: 3,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('6. Should succeed parsing a bunch of neg. integer numbers.', () => {
        // Arrange.
        const validYini = `^ \`Neg. ints\`
            value = -0
            count = -42
            maxItems = -1000
            minScore = -7
            threshold = -99999
            uptimeSeconds = -86400
            temperature = -25
            users = -15
            year = -2025
            retryLimit = -3

            /END
        `
        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            'Neg. ints': {
                value: -0,
                count: -42,
                maxItems: -1000,
                minScore: -7,
                threshold: -99999,
                uptimeSeconds: -86400,
                temperature: -25,
                users: -15,
                year: -2025,
                retryLimit: -3,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('7. Should succeed parsing a bunch of exp numbers.', () => {
        // Arrange.
        const validYini = `^ ExpNumbers
            value = 1.3e3
            pi_approx = 3.14e0
            avogadro = 6.022e23
            planck = 6.626e-34
            tiny = 1e-10
            big = 2e8
            seconds_in_year = 3.1536e7
            short = 5e1
            floaty = 7.77e2
            milli = 1e-3

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
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('8. Should succeed parsing a bunch of neg. exp numbers.', () => {
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
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })
})
