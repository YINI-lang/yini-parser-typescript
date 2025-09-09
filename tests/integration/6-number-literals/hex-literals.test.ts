import YINI from '../../../src'
import { debugPrint, toPrettyJSON } from '../../../src/utils/print'

/**
 * Hexadecimal (16-base) number literal tests (with #, 0x, and 0X).
 */
describe('Hexadecimal number literal tests:', () => {
    test('1.a) Should succeed parsing a bunch of common HEX (uppcase) numbers with #.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = #0
            hex2 = #1
            hex3 = #A
            hex4 = #FF
            hex5 = #7F
            hex6 = #0060BB
       `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 255,
                hex5: 127,
                hex6: 24763,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('1.b) Should succeed parsing a bunch of common HEX (uppcase) numbers with 0x.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = 0x0
            hex2 = 0x1
            hex3 = 0xA
            hex4 = 0xFF
            hex5 = 0x7F
            hex6 = 0X0060BB
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 255,
                hex5: 127,
                hex6: 24763,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('1.c) Should succeed parsing a bunch of common HEX (uppcase) numbers with 0X.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = 0X0
            hex2 = 0X1
            hex3 = 0XA
            hex4 = 0XFF
            hex5 = 0X7F
            hex6 = 0X0060BB
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 255,
                hex5: 127,
                hex6: 24763,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('2.a) Should succeed parsing a bunch of common HEX (lowercase) numbers with #.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = #0
            hex2 = #1
            hex3 = #a
            hex4 = #ff
            hex5 = #7f
            hex6 = #0060bb
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 255,
                hex5: 127,
                hex6: 24763,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('2.b) Should succeed parsing a bunch of common HEX (lowercase) numbers with 0x.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = 0x0
            hex2 = 0x1
            hex3 = 0xa
            hex4 = 0xff
            hex5 = 0x7f
            hex6 = 0x0060bb
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 255,
                hex5: 127,
                hex6: 24763,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('2.c) Should succeed parsing a bunch of common HEX (lowercase) numbers with 0x.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = 0X0
            hex2 = 0X1
            hex3 = 0Xa
            hex4 = 0Xff
            hex5 = 0X7f
            hex6 = 0X0060bb
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 255,
                hex5: 127,
                hex6: 24763,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3.a) Should succeed parsing a bunch of edge-case HEX (uppcase) numbers with #.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = #000
            hex2 = #01
            hex3 = #000A
            hex4 = #0FF0
            hex5 = #7FFFFFFF       // max signed 32-bit integer (2,147,483,647 decimal)
            hex6 = #FFFFFFFFFFFFFFFF // max unsigned 64-bit integer (18,446,744,073,709,551,615 decimal)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 4080,
                hex5: 2147483647,
                hex6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3.b) Should succeed parsing a bunch of edge-case HEX (uppcase) numbers with 0x.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = 0x000
            hex2 = 0x01
            hex3 = 0x000A
            hex4 = 0x0FF0
            hex5 = 0x7FFFFFFF         // max signed 32-bit integer (2,147,483,647 decimal)
            hex6 = 0xFFFFFFFFFFFFFFFF // max unsigned 64-bit integer (18,446,744,073,709,551,615 decimal)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 4080,
                hex5: 2147483647,
                hex6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3.c) Should succeed parsing a bunch of edge-case HEX (uppcase) numbers with 0X.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = 0X000
            hex2 = 0X01
            hex3 = 0X000A
            hex4 = 0X0FF0
            hex5 = 0X7FFFFFFF         // max signed 32-bit integer (2,147,483,647 decimal)
            hex6 = 0XFFFFFFFFFFFFFFFF // max unsigned 64-bit integer (18,446,744,073,709,551,615 decimal)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 4080,
                hex5: 2147483647,
                hex6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('4.a) Should succeed parsing a bunch of edge-case HEX (lowercase) numbers with #.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = #000
            hex2 = #01
            hex3 = #000a
            hex4 = #0ff0
            hex5 = #7fffffff       // max signed 32-bit integer (2,147,483,647 decimal)
            hex6 = #ffffffffffffffff // max unsigned 64-bit integer (18,446,744,073,709,551,615 decimal)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 4080,
                hex5: 2147483647,
                hex6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('4.b) Should succeed parsing a bunch of edge-case HEX (lowercase) numbers with 0x.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = 0x000
            hex2 = 0x01
            hex3 = 0x000a
            hex4 = 0x0ff0
            hex5 = 0x7fffffff       // max signed 32-bit integer (2,147,483,647 decimal)
            hex6 = 0xffffffffffffffff // max unsigned 64-bit integer (18,446,744,073,709,551,615 decimal)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 4080,
                hex5: 2147483647,
                hex6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('4.c) Should succeed parsing a bunch of edge-case HEX (lowercase) numbers with 0x.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = 0X000
            hex2 = 0X01
            hex3 = 0X000a
            hex4 = 0X0ff0
            hex5 = 0X7fffffff       // max signed 32-bit integer (2,147,483,647 decimal)
            hex6 = 0Xffffffffffffffff // max unsigned 64-bit integer (18,446,744,073,709,551,615 decimal)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 4080,
                hex5: 2147483647,
                hex6: 18446744073709551615,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('5.a) Should succeed parsing a bunch of neg/pos HEX (mixed-case) numbers with #.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = -#0
            hex2 = +#E
            hex3 = +#00
            hex4 = -#1c
            hex5 = -#aBc
            hex6 = +#Ab9C
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 14,
                hex3: 0,
                hex4: -28,
                hex5: -2748,
                hex6: 43932,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('5.b) Should succeed parsing a bunch of neg/pos HEX (mixed-case) numbers with 0x.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = -0x0
            hex2 = +0xE
            hex3 = +0x00
            hex4 = -0x1c
            hex5 = -0xaBc
            hex6 = +0xAb9C
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 14,
                hex3: 0,
                hex4: -28,
                hex5: -2748,
                hex6: 43932,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('5.c) Should succeed parsing a bunch of neg/pos HEX (mixed-case) numbers with 0X.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = -0X0
            hex2 = +0XE
            hex3 = +0X00
            hex4 = -0X1c
            hex5 = -0XaBc
            hex6 = +0XAb9C
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 14,
                hex3: 0,
                hex4: -28,
                hex5: -2748,
                hex6: 43932,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('6.a) Should throw error parsing a bad HEX number with # (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = #
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'on-errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.b) Should throw error parsing a bad HEX number with # (strict-mode).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = #
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.c) Should throw error parsing a bad HEX number with 0x (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = 0x
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'on-errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.d) Should throw error parsing a bad HEX number with 0x (strict-mode).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = 0x
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.e) Should throw error parsing a bad HEX number with 0X (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = 0X
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'on-errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.f) Should throw error parsing a bad HEX number with 0X (strict-mode).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = 0X
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('7.a) Should throw error parsing a bad HEX number with # (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = #G1    // Invalid HEX digit "G"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'on-errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('7.b) Should throw error parsing a bad HEX number with # (strict-mode).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = #G1    // Invalid HEX digit "G"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('7.c) Should throw error parsing a bad HEX number with 0x (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = #G1    // Invalid HEX digit "G"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'on-errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('7.d) Should throw error parsing a bad HEX number with 0x (strict-mode).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = #G1    // Invalid HEX digit "G"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('7.e) Should throw error parsing a bad HEX number with 0X (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = #G1    // Invalid HEX digit "G"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'on-errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('7.f) Should throw error parsing a bad HEX number with 0X (strict-mode).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = #G1    // Invalid HEX digit "G"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('8.a) Should parse corrupt HEX number with # (lenient-mode).', () => {
        // Arrange.
        const corrupYini = `^ HexNumber
            badHex = -#     // Minus sign with no digits
            value = 100
        `

        // Act & Assert.
        const result = YINI.parse(corrupYini, false)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(result.HexNumber.badHex).toEqual(null)
        expect(result.HexNumber.value).toEqual(100)
    })

    test('8.b) Should throw error parsing a bad HEX number with # (strict-mode).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = -#     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('8.c) Should throw error parsing a bad HEX number with 0x (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = -0x     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'on-errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('8.d) Should throw error parsing a bad HEX number with 0x (strict-mode).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = -0x     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('8.e) Should throw error parsing a bad HEX number with 0X (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = -0X     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'on-errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('8.f) Should throw error parsing a bad HEX number with 0X (strict-mode).', () => {
        // Arrange.
        const badYini = `^ HexNumber
            badHex = -0X     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })
})
