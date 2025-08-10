import YINI from '../../../src'
import { debugPrint, toPrettyJSON } from '../../../src/utils/print'

/**
 * Octal number literal tests.
 */
describe('Octal number literal tests:', () => {
    test('1.a) Should succeed parsing a bunch of common OCT numbers with 0o.', () => {
        // Arrange.
        const validYini = `^ OctNumbers
            oct1 = 0o0     // Zero in octal
            oct2 = 0o00    // Zero in octal
            oct3 = 0o7     // Decimal 7 (max single octal digit)
            oct4 = 0o10    // Decimal 8
            oct5 = 0o77    // Decimal 63
            oct6 = 0o755   // Common Unix file permission value (decimal 493)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            OctNumbers: {
                oct1: 0,
                oct2: 0,
                oct3: 7,
                oct4: 8,
                oct5: 63,
                oct6: 493,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('1.b) Should succeed parsing a bunch of common OCT numbers with 0O.', () => {
        // Arrange.
        const validYini = `^ OctNumbers
            oct1 = 0O0     // Zero in octal
            oct2 = 0O00    // Zero in octal
            oct3 = 0O7     // Decimal 7 (max single octal digit)
            oct4 = 0O10    // Decimal 8
            oct5 = 0O77    // Decimal 63
            oct6 = 0O755   // Common Unix file permission value (decimal 493)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            OctNumbers: {
                oct1: 0,
                oct2: 0,
                oct3: 7,
                oct4: 8,
                oct5: 63,
                oct6: 493,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('2.a) Should succeed parsing a bunch of edge-case OCT numbers with 0o.', () => {
        // Arrange.
        const validYini = `^ OctNumbers
            oct1 = 0o001                    // 1 with leading zeros
            oct2 = 0o1                      // Smallest positive integer in octal
            oct3 = 0o177                    // Max signed 8-bit)
            oct4 = 0o377                    // Max unsigned 8-bit)
            oct5 = 0o17777777777            // Max signed 32-bit)
            oct6 = 0o1777777777777777777777 // Max unsigned 64-bit)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            OctNumbers: {
                oct1: 1,
                oct2: 1,
                oct3: 127,
                oct4: 255,
                oct5: 2147483647,
                oct6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('2.b) Should succeed parsing a bunch of edge-case OCT numbers with 0O.', () => {
        // Arrange.
        const validYini = `^ OctNumbers
            oct1 = 0O001                    // 1 with leading zeros
            oct2 = 0O1                      // Smallest positive integer in octal
            oct3 = 0O177                    // Max signed 8-bit)
            oct4 = 0O377                    // Max unsigned 8-bit)
            oct5 = 0O17777777777            // Max signed 32-bit)
            oct6 = 0O1777777777777777777777 // Max unsigned 64-bit)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            OctNumbers: {
                oct1: 1,
                oct2: 1,
                oct3: 127,
                oct4: 255,
                oct5: 2147483647,
                oct6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3.a) Should succeed parsing a bunch of neg/pos OCT numbers with 0o.', () => {
        // Arrange.
        const validYini = `^ OctNumbers
            oct1 = -0o0                     // Zero
            oct2 = +0o0                     // Zero
            oct3 = -0o177                    // Max signed 8-bit)
            oct4 = +0o377                    // Max unsigned 8-bit)
            oct5 = -0o17777777777            // Max signed 32-bit)
            oct6 = +0o1777777777777777777777 // Max unsigned 64-bit)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            OctNumbers: {
                oct1: 0,
                oct2: 0,
                oct3: -127,
                oct4: 255,
                oct5: -2147483647,
                oct6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3.b) Should succeed parsing a bunch of neg/pos OCT numbers with 0O.', () => {
        // Arrange.
        const validYini = `^ OctNumbers
            oct1 = -0O0                     // Zero
            oct2 = +0O0                     // Zero
            oct3 = -0O177                    // Max signed 8-bit)
            oct4 = +0O377                    // Max unsigned 8-bit)
            oct5 = -0O17777777777            // Max signed 32-bit)
            oct6 = +0O1777777777777777777777 // Max unsigned 64-bit)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            OctNumbers: {
                oct1: 0,
                oct2: 0,
                oct3: -127,
                oct4: 255,
                oct5: -2147483647,
                oct6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('4.a) Should throw error parsing a bad OCT number with 0o (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0o
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.b) Should throw error parsing a bad OCT number with 0o (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0o
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.c) Should throw error parsing a bad OCT number with 0O (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0O
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.d) Should throw error parsing a bad OCT number with 0O (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0O
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.a) Should throw error parsing a bad OCT number with 0o (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0o81    // Invalid OCT digit "8"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.b) Should throw error parsing a bad OCT number with 0o (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0o81    // Invalid OCT digit "8"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.c) Should throw error parsing a bad OCT number with 0O (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0O81    // Invalid OCT digit "8"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.d) Should throw error parsing a bad OCT number with 0O (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0O81    // Invalid OCT digit "8"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.a) Should throw error parsing a bad OCT number with 0o (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = -0o     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.b) Should throw error parsing a bad OCT number with 0o (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = -0o     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.c) Should throw error parsing a bad OCT number with 0O (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = -0O     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.d) Should throw error parsing a bad OCT number with 0O (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = -0O     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })
})
