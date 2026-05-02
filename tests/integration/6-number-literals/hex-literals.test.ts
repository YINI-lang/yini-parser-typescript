// tests/integration/6-number-literals/hex-literals.test.ts
import YINI from '../../../src'
import { toPrettyJSON } from '../../../src/utils/print'

/**
 * Hexadecimal number literal tests.
 *
 * Current valid forms:
 * - 0xFFAA00
 * - 0XFFAA00
 * - hex:FFAA00
 * - hex: FFAA00
 * - HEX: FFAA00
 *
 * Removed form:
 * - #FFAA00
 *
 * Outside string literals, # now always begins a comment.
 */
describe('Hexadecimal number literal tests:', () => {
    test('1) Should parse hexadecimal numbers using 0x and 0X notation.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = 0x0
            hex2 = 0x1
            hex3 = 0xA
            hex4 = 0xFF
            hex5 = 0x7F
            hex6 = 0x0060BB

            hex7 = 0X0
            hex8 = 0X1
            hex9 = 0XA
            hex10 = 0XFF
            hex11 = 0X7F
            hex12 = 0X0060BB
            /END
        `

        // Act.
        const result = YINI.parse(validYini, true)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 255,
                hex5: 127,
                hex6: 24763,

                hex7: 0,
                hex8: 1,
                hex9: 10,
                hex10: 255,
                hex11: 127,
                hex12: 24763,
            },
        }

        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('2) Should parse lowercase hexadecimal digits using 0x and 0X notation.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = 0x0
            hex2 = 0x1
            hex3 = 0xa
            hex4 = 0xff
            hex5 = 0x7f
            hex6 = 0x0060bb

            hex7 = 0X0
            hex8 = 0X1
            hex9 = 0Xa
            hex10 = 0Xff
            hex11 = 0X7f
            hex12 = 0X0060bb
            /END
        `

        // Act.
        const result = YINI.parse(validYini, true)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 255,
                hex5: 127,
                hex6: 24763,

                hex7: 0,
                hex8: 1,
                hex9: 10,
                hex10: 255,
                hex11: 127,
                hex12: 24763,
            },
        }

        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('3) Should parse hexadecimal numbers using explicit hex: notation.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = hex:0
            hex2 = hex:1
            hex3 = hex:A
            hex4 = hex:FF
            hex5 = hex:7F
            hex6 = hex:0060BB

            hex7 = hex: 0
            hex8 = hex: 1
            hex9 = hex: A
            hex10 = hex: FF
            hex11 = hex: 7F
            hex12 = hex: 0060BB
            /END
        `

        // Act.
        const result = YINI.parse(validYini, true)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 255,
                hex5: 127,
                hex6: 24763,

                hex7: 0,
                hex8: 1,
                hex9: 10,
                hex10: 255,
                hex11: 127,
                hex12: 24763,
            },
        }

        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('4) Should parse explicit hex: notation case-insensitively.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = HEX:FF
            hex2 = Hex:ff
            hex3 = hEx:aBc
            hex4 = heX: Ab9C
            hex5 = HEX: 0060bb
            /END
        `

        // Act.
        const result = YINI.parse(validYini, true)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 255,
                hex2: 255,
                hex3: 2748,
                hex4: 43932,
                hex5: 24763,
            },
        }

        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('5) Should parse signed hexadecimal numbers.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = -0x0
            hex2 = +0xE
            hex3 = +0x00
            hex4 = -0x1c
            hex5 = -0xaBc
            hex6 = +0xAb9C

            hex7 = -hex:0
            hex8 = +hex:E
            hex9 = +hex:00
            hex10 = -hex:1c
            hex11 = -hex:aBc
            hex12 = +hex: Ab9C
            /END
        `

        // Act.
        const result = YINI.parse(validYini, true)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 14,
                hex3: 0,
                hex4: -28,
                hex5: -2748,
                hex6: 43932,

                hex7: 0,
                hex8: 14,
                hex9: 0,
                hex10: -28,
                hex11: -2748,
                hex12: 43932,
            },
        }

        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('6) Should parse hexadecimal edge cases with leading zeroes.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            hex1 = 0x000
            hex2 = 0x01
            hex3 = 0x000A
            hex4 = 0x0FF0
            hex5 = 0x7FFFFFFF

            hex6 = hex:000
            hex7 = hex:01
            hex8 = hex:000A
            hex9 = hex:0FF0
            hex10 = hex:7FFFFFFF
            /END
        `

        // Act.
        const result = YINI.parse(validYini, true)

        // Assert.
        const correct = {
            HexNumbers: {
                hex1: 0,
                hex2: 1,
                hex3: 10,
                hex4: 4080,
                hex5: 2147483647,

                hex6: 0,
                hex7: 1,
                hex8: 10,
                hex9: 4080,
                hex10: 2147483647,
            },
        }

        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('7) Should treat old # hexadecimal notation as a comment, not as hex, in lenient mode.', () => {
        // Arrange.
        const validYini = `^ HexNumbers
            oldHex = #FFAA00
            value = 100
        `

        // Act.
        const result = YINI.parse(validYini, false)

        // Assert.
        const correct = {
            HexNumbers: {
                oldHex: null,
                value: 100,
            },
        }

        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(correct))
    })

    test('8) Should reject old # hexadecimal notation in strict mode because the value is missing.', () => {
        // Arrange.
        const badYini = `^ HexNumbers
            oldHex = #FFAA00
            /END
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(badYini, true)
        }).toThrow()
    })

    test.each([
        ['0x without digits', 'badHex = 0x'],
        ['0X without digits', 'badHex = 0X'],
        ['0x with invalid digit', 'badHex = 0xG1'],
        ['0X with invalid digit', 'badHex = 0XG1'],
        ['hex: without digits', 'badHex = hex:'],
        ['HEX: without digits', 'badHex = HEX:'],
        ['hex: with invalid digit', 'badHex = hex:G1'],
        ['HEX: with invalid digit', 'badHex = HEX:G1'],
        ['hex: with nested 0x prefix', 'badHex = hex: 0xFFAA00'],
        ['hex with whitespace before colon', 'badHex = hex : FFAA00'],
        ['signed 0x without digits', 'badHex = -0x'],
        ['signed hex: without digits', 'badHex = -hex:'],
    ])(
        '9.%#) Should reject malformed hexadecimal notation: %s.',
        (_name, line) => {
            // Arrange.
            const badYini = `^ HexNumbers
            ${line}
            /END
        `

            // Act & Assert.
            expect(() => {
                YINI.parse(badYini, true)
            }).toThrow()
        },
    )
})
