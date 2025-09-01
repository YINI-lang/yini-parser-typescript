import path from 'path'
import YINI from '../../../src'
import { isDebug } from '../../../src/config/env'
import { debugPrint, printObject, toPrettyJSON } from '../../../src/utils/print'

/**
 * Integer number literal tests.
 */
describe('Integer number literal tests:', () => {
    test('1. Should parse a bunch of int num literals correctly.', () => {
        // Arrange.
        const validYini = `^ Ints
            value1 = 0
            value2 = -0
            value3 = -1
            value4 = 111
            value5 = -42
            value6 = 7
            value7 = -1000
            value8 = 5000
            value9 = -20
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint(result)

        // Assert.
        expect(!!result).toEqual(true)
        expect(result.Ints.value1).toEqual(0)
        expect(result.Ints.value2).toEqual(-0)
        expect(result.Ints.value3).toEqual(-1)
        expect(result.Ints.value4).toEqual(111)
        expect(result.Ints.value5).toEqual(-42)
        expect(result.Ints.value6).toEqual(7)
        expect(result.Ints.value7).toEqual(-1000)
        expect(result.Ints.value8).toEqual(5000)
        expect(result.Ints.value9).toEqual(-20)
    })

    test('2. Should succeed parsing a bunch of positive edge-case int numbers.', () => {
        // Arrange.
        const validYini = `^ PosInts
            value = 101
            age = 25
            year = 2025
            distance = 10000
            items = 3
            retries = 7
            port = 8080
            max_score = 99
            count = 1
            threshold = 500
            big = 999999999
            power_of_two = 1024
            max_16bit = 65535
            max_32bit = 2147483647
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            PosInts: {
                value: 101,
                age: 25,
                year: 2025,
                distance: 10000,
                items: 3,
                retries: 7,
                port: 8080,
                max_score: 99,
                count: 1,
                threshold: 500,
                big: 999999999,
                power_of_two: 1024,
                max_16bit: 65535,
                max_32bit: 2147483647,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3. Should succeed parsing a bunch of negative edge-case int numbers.', () => {
        // Arrange.
        const validYini = `^ NegInts
            value = -1
            loss = -100
            min_temp = -40
            offset = -300
            penalty = -5
            difference = -17
            depth = -2500
            negative_big = -999999999
            negative_power_of_two = -1024
            min_16bit = -32768
            min_32bit = -2147483648
            negative_edge = -2
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            NegInts: {
                value: -1,
                loss: -100,
                min_temp: -40,
                offset: -300,
                penalty: -5,
                difference: -17,
                depth: -2500,
                negative_big: -999999999,
                negative_power_of_two: -1024,
                min_16bit: -32768,
                min_32bit: -2147483648,
                negative_edge: -2,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('4.1) Should throw error parsing bad int number.', () => {
        // Arrange.
        const badYini = `^ Section
            value = 8888888T888888f88888
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.2) Should throw error parsing bad int number.', () => {
        // Arrange.
        const badYini = `^ Section
            value = 76¤%&886 // INVALID
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })
})
