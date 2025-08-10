import YINI from '../../../src'
import { debugPrint, toPrettyJSON } from '../../../src/utils/print'

/**
 * Binary (2-base) number literal tests.
 */
describe('Binary number literal tests:', () => {
    test('1.a) Should succeed parsing a bunch of common BIN numbers with %.', () => {
        // Arrange.
        const validYini = `^ BinNumbers
            bin1 = %0      // Zero in binary
            bin2 = %1      // Smallest positive integer
            bin3 = %10     // Decimal 2
            bin4 = %1010   // Decimal 10
            bin5 = %1111   // Decimal 15
            bin6 = %010110 // Decimal 22
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            BinNumbers: {
                bin1: 0,
                bin2: 1,
                bin3: 2,
                bin4: 10,
                bin5: 15,
                bin6: 22,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('1.b) Should succeed parsing a bunch of common BIN numbers with 0b.', () => {
        // Arrange.
        const validYini = `^ BinNumbers
            bin1 = 0b0      // Zero in binary
            bin2 = 0b1      // Smallest positive integer
            bin3 = 0b10     // Decimal 2
            bin4 = 0b1010   // Decimal 10
            bin5 = 0b1111   // Decimal 15
            bin6 = 0b010110 // Decimal 22
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            BinNumbers: {
                bin1: 0,
                bin2: 1,
                bin3: 2,
                bin4: 10,
                bin5: 15,
                bin6: 22,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('1.c) Should succeed parsing a bunch of common BIN numbers with 0B.', () => {
        // Arrange.
        const validYini = `^ BinNumbers
            bin1 = 0B0      // Zero in binary
            bin2 = 0B1      // Smallest positive integer
            bin3 = 0B10     // Decimal 2
            bin4 = 0B1010   // Decimal 10
            bin5 = 0B1111   // Decimal 15
            bin6 = 0B010110 // Decimal 22
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            BinNumbers: {
                bin1: 0,
                bin2: 1,
                bin3: 2,
                bin4: 10,
                bin5: 15,
                bin6: 22,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('2.a) Should succeed parsing a bunch of edge-case BIN numbers with %.', () => {
        // Arrange.
        const validYini = `^ BinNumbers
            bin1 = %0                                  // Zero in binary
            bin2 = %1                                  // Smallest positive integer
            bin3 = %1111111                            // Decimal 127 (max signed 8-bit)
            bin4 = %11111111                           // Decimal 255 (max unsigned 8-bit)
            bin5 = %1111111111111111111111111111111    // Decimal 2,147,483,647 (max signed 32-bit)
            bin6 = %1111111111111111111111111111111111111111111111111111111111111111 
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            BinNumbers: {
                bin1: 0,
                bin2: 1,
                bin3: 127,
                bin4: 255,
                bin5: 2147483647,
                bin6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('2.b) Should succeed parsing a bunch of edge-case BIN numbers with 0b.', () => {
        // Arrange.
        const validYini = `^ BinNumbers
            bin1 = 0b0                                  // Zero in binary
            bin2 = 0b1                                  // Smallest positive integer
            bin3 = 0b1111111                            // Decimal 127 (max signed 8-bit)
            bin4 = 0b11111111                           // Decimal 255 (max unsigned 8-bit)
            bin5 = 0b1111111111111111111111111111111    // Decimal 2,147,483,647 (max signed 32-bit)
            bin6 = 0b1111111111111111111111111111111111111111111111111111111111111111 
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            BinNumbers: {
                bin1: 0,
                bin2: 1,
                bin3: 127,
                bin4: 255,
                bin5: 2147483647,
                bin6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('2.c) Should succeed parsing a bunch of edge-case BIN numbers with 0B.', () => {
        // Arrange.
        const validYini = `^ BinNumbers
            bin1 = 0B0                                  // Zero in binary
            bin2 = 0B1                                  // Smallest positive integer
            bin3 = 0B1111111                            // Decimal 127 (max signed 8-bit)
            bin4 = 0B11111111                           // Decimal 255 (max unsigned 8-bit)
            bin5 = 0B1111111111111111111111111111111    // Decimal 2,147,483,647 (max signed 32-bit)
            bin6 = 0B1111111111111111111111111111111111111111111111111111111111111111 
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            BinNumbers: {
                bin1: 0,
                bin2: 1,
                bin3: 127,
                bin4: 255,
                bin5: 2147483647,
                bin6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3.a) Should succeed parsing a bunch of neg/pos BIN numbers with %.', () => {
        // Arrange.
        const validYini = `^ BinNumbers
            bin1 = -%0      // Zero in binary
            bin2 = +%1      // Smallest positive integer
            bin3 = -%10     // Decimal -2
            bin4 = +%1010   // Decimal 10
            bin5 = -%1111   // Decimal -15
            bin6 = +%010110 // Decimal 22
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            BinNumbers: {
                bin1: 0,
                bin2: 1,
                bin3: -2,
                bin4: 10,
                bin5: -15,
                bin6: 22,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3.b) Should succeed parsing a bunch of neg/pos BIN numbers with 0b.', () => {
        // Arrange.
        const validYini = `^ BinNumbers
            bin1 = -0b0      // Zero in binary
            bin2 = +0b1      // Smallest positive integer
            bin3 = -0b10     // Decimal -2
            bin4 = +0b1010   // Decimal 10
            bin5 = -0b1111   // Decimal -15
            bin6 = +0b010110 // Decimal 22
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            BinNumbers: {
                bin1: 0,
                bin2: 1,
                bin3: -2,
                bin4: 10,
                bin5: -15,
                bin6: 22,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3.c) Should succeed parsing a bunch of neg/pos BIN numbers with 0B.', () => {
        // Arrange.
        const validYini = `^ BinNumbers
            bin1 = -0B0     // Zero in binary
            bin2 = +0B1      // Smallest positive integer
            bin3 = -0B10     // Decimal -2
            bin4 = +0B1010   // Decimal 10
            bin5 = -0B1111   // Decimal -15
            bin6 = +0B010110 // Decimal 22
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            BinNumbers: {
                bin1: 0,
                bin2: 1,
                bin3: -2,
                bin4: 10,
                bin5: -15,
                bin6: 22,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('4.a) Should throw error parsing a bad BIN number with # (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = %
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.b) Should throw error parsing a bad BIN number with # (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = %
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.c) Should throw error parsing a bad BIN number with 0b (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = 0b
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.d) Should throw error parsing a bad BIN number with 0b (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = 0b
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.e) Should throw error parsing a bad BIN number with 0B (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = 0B
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.f) Should throw error parsing a bad BIN number with 0B (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = 0B
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.a) Should throw error parsing a bad BIN number with % (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = %21    // Invalid BIN digit "2"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.b) Should throw error parsing a bad BIN number with % (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = %21    // Invalid BIN digit "2"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.c) Should throw error parsing a bad BIN number with 0b (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = 0b21    // Invalid BIN digit "2"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.d) Should throw error parsing a bad BIN number with 0b (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = 0b21    // Invalid BIN digit "2"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.e) Should throw error parsing a bad BIN number with 0B (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = 0B21    // Invalid BIN digit "2"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.f) Should throw error parsing a bad BIN number with 0B (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = 0B21    // Invalid BIN digit "2"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.a) Should parse corrupt BIN number with # (lenient-mode).', () => {
        // Arrange.
        const corrupYini = `^ BinNumber
            badBin = -%     // Minus sign with no digits
            value = 100
        `

        // Act & Assert.
        const result = YINI.parse(corrupYini, false)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.BinNumber.badBin).toEqual(null)
        expect(result.BinNumber.value).toEqual(100)
    })

    test('6.b) Should throw error parsing a bad BIN number with # (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = -%     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.c) Should throw error parsing a bad BIN number with 0b (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = -0b     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.d) Should throw error parsing a bad BIN number with 0b (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = -0b     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.e) Should throw error parsing a bad BIN number with 0B (lenient-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = -0B     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.f) Should throw error parsing a bad BIN number with 0B (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badBin = -0B     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })
})
