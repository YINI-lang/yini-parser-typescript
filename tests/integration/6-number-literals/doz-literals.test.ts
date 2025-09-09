import YINI from '../../../src'
import { debugPrint, toPrettyJSON } from '../../../src/utils/print'

/**
 * Duodecimal (12-base) number literal tests.
 * @note x = A = 10, e = B = 11.
 */
describe('Duodecimal (doz) number literal tests:', () => {
    test('1.a) Should succeed parsing a bunch of common DOZ numbers with 0z both with XE and AB.', () => {
        // Arrange.
        const validYini = `^ DozNumbers
            ^^ WithXE
            doz1 = 0z0     // Zero in base-12
            doz2 = 0z1     // Smallest positive integer
            doz3 = 0zX     // Decimal 10 (X/A is digit for 10 in base-12)
            doz4 = 0z10    // Decimal 12
            doz5 = 0z1E    // Decimal 23 (E/B is digit for 11 in base-12)

            ^^ WithAB
            doz1 = 0zA     // Decimal 10 (X/A is digit for 10 in base-12)
            doz2 = 0zB     // Decimal 11 (E/B is digit for 11 in base-12)
            doz3 = 0z10    // Decimal 12
            doz4 = 0z1B    // Decimal 23 (E/B is digit for 11 in base-12)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            DozNumbers: {
                WithXE: {
                    doz1: 0,
                    doz2: 1,
                    doz3: 10,
                    doz4: 12,
                    doz5: 23,
                },
                WithAB: {
                    doz1: 10,
                    doz2: 11,
                    doz3: 12,
                    doz4: 23,
                },
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('1.b) Should succeed parsing a bunch of common DOZ numbers with 0Z both with XE and AB.', () => {
        // Arrange.
        const validYini = `^ DozNumbers
            ^^ WithXE
            doz1 = 0Z0     // Zero in base-12
            doz2 = 0Z1     // Smallest positive integer
            doz3 = 0ZX     // Decimal 10 (X/A is digit for 10 in base-12)
            doz4 = 0Z10    // Decimal 12
            doz5 = 0Z1E    // Decimal 23 (E/B is digit for 11 in base-12)

            ^^ WithAB
            doz1 = 0ZA     // Decimal 10 (X/A is digit for 10 in base-12)
            doz2 = 0ZB     // Decimal 11 (E/B is digit for 11 in base-12)
            doz3 = 0Z10    // Decimal 12
            doz4 = 0Z1B    // Decimal 23 (E/B is digit for 11 in base-12)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            DozNumbers: {
                WithXE: {
                    doz1: 0,
                    doz2: 1,
                    doz3: 10,
                    doz4: 12,
                    doz5: 23,
                },
                WithAB: {
                    doz1: 10,
                    doz2: 11,
                    doz3: 12,
                    doz4: 23,
                },
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('2.a) Should succeed parsing a bunch of edge-case DOZ numbers with 0z both with XE and AB.', () => {
        // Arrange.
        const validYini = `^ DozNumbers
            ^^ WithXE
            doz1 = 0z00
            doz2 = 0z01    // One with leading zeros
            doz3 = 0z100   // Decimal 144 (X/A is digit for 10 in base-12)
            doz4 = 0z7EE   // Decimal 1151
            doz5 = 0zX00   // Decimal 1440 (E/B is digit for 11 in base-12)

            ^^ WithAB
            doz6 = 0z7BB   // Decimal 1151
            doz7 = 0zA00   // Decimal 1440 (E/B is digit for 11 in base-12)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            DozNumbers: {
                WithXE: {
                    doz1: 0,
                    doz2: 1,
                    doz3: 144,
                    doz4: 1151,
                    doz5: 1440,
                },
                WithAB: {
                    doz6: 1151,
                    doz7: 1440,
                },
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('2.b) Should succeed parsing a bunch of edge-case DOZ numbers with 0Z both with XE and AB.', () => {
        // Arrange.
        const validYini = `^ DozNumbers
            ^^ WithXE
            doz1 = 0Z00
            doz2 = 0Z01    // One with leading zeros
            doz3 = 0Z100   // Decimal 144 (X/A is digit for 10 in base-12)
            doz4 = 0Z7EE   // Decimal 1151
            doz5 = 0ZX00   // Decimal 1440 (E/B is digit for 11 in base-12)

            ^^ WithAB
            doz6 = 0Z7BB   // Decimal 1151
            doz7 = 0ZA00   // Decimal 1440 (E/B is digit for 11 in base-12)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            DozNumbers: {
                WithXE: {
                    doz1: 0,
                    doz2: 1,
                    doz3: 144,
                    doz4: 1151,
                    doz5: 1440,
                },
                WithAB: {
                    doz6: 1151,
                    doz7: 1440,
                },
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3.a) Should succeed parsing a bunch of neg/pos DOZ numbers with 0z both with XE and AB.', () => {
        // Arrange.
        const validYini = `^ DozNumbers
            ^^ WithXE
            doz1 = +0z0
            doz2 = -0z0
            doz3 = +0z01    // One with leading zeros
            doz4 = -0z100   // Decimal 144 (X/A is digit for 10 in base-12)
            doz5 = +0z7EE   // Decimal 1151
            doz6 = -0zX00   // Decimal 1440 (E/B is digit for 11 in base-12)

            ^^ WithAB
            doz7 = -0z7BB   // Decimal 1151
            doz8 = +0zA00   // Decimal 1440 (E/B is digit for 11 in base-12)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            DozNumbers: {
                WithXE: {
                    doz1: 0,
                    doz2: 0,
                    doz3: 1,
                    doz4: -144,
                    doz5: 1151,
                    doz6: -1440,
                },
                WithAB: {
                    doz7: -1151,
                    doz8: 1440,
                },
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3.b) Should succeed parsing a bunch of neg/pos DOZ numbers with 0Z both with XE and AB.', () => {
        // Arrange.
        const validYini = `^ DozNumbers
            ^^ WithXE
            doz1 = +0Z0
            doz2 = -0Z0
            doz3 = +0Z01    // One with leading zeros
            doz4 = -0Z100   // Decimal 144 (X/A is digit for 10 in base-12)
            doz5 = +0Z7EE   // Decimal 1151
            doz6 = -0ZX00   // Decimal 1440 (E/B is digit for 11 in base-12)

            ^^ WithAB
            doz7 = -0Z7BB   // Decimal 1151
            doz8 = +0ZA00   // Decimal 1440 (E/B is digit for 11 in base-12)
        `

        // Act.
        const result = YINI.parse(validYini, true)
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        const correct = {
            DozNumbers: {
                WithXE: {
                    doz1: 0,
                    doz2: 0,
                    doz3: 1,
                    doz4: -144,
                    doz5: 1151,
                    doz6: -1440,
                },
                WithAB: {
                    doz7: -1151,
                    doz8: 1440,
                },
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('4.a) Should throw error parsing a bad DOZ number with 0z (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0z
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.b) Should throw error parsing a bad DOZ number with 0z (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0z
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.c) Should throw error parsing a bad DOZ number with 0Z (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0Z
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('4.d) Should throw error parsing a bad DOZ number with 0Z (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0Z
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.a) Should throw error parsing a bad DOZ number with 0z (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0zF1    // Invalid DOZ digit "f"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.b) Should throw error parsing a bad DOZ number with 0z (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0zF1    // Invalid DOZ digit "f"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.c) Should throw error parsing a bad DOZ number with 0Z (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0ZF1    // Invalid DOZ digit "f"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('5.d) Should throw error parsing a bad DOZ number with 0Z (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = 0ZF1    // Invalid DOZ digit "f"
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.a) Should throw error parsing a bad DOZ number with 0z (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = -0z     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.b) Should throw error parsing a bad DOZ number with 0z (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = -0z     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.c) Should throw error parsing a bad DOZ number with 0Z (lenient-mode, bail on error).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = -0Z     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, false, 'errors')
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })

    test('6.d) Should throw error parsing a bad DOZ number with 0Z (strict-mode).', () => {
        // Arrange.
        const badYini = `^ BinNumber
            badOct = -0Z     // Minus sign with no digits
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(badYini, true)
            debugPrint('result:')
            debugPrint(result)
        }).toThrow()
    })
})
