// src/parsers/parseNumber.ts
import { debugPrint } from '../utils/print'

/**
 * Parses a YINI number literal into a JavaScript number.
 *
 * @property {string | undefined} [tag]
 *           This property is for debugging only. Its contents may change
 *           at any time and should not be relied upon for any significant
 *           purpose.
 * @examples
 * scientific = 1.23e4
 * binary_alt = %1010
 * duodecimal = 0z2EX9
 * positive = +123
 *
 * a = 1_000
 * b = +1_000
 * c = 1.23_45e4
 * d = 1.23e+4_5
 * e = 0x_FF_AA
 * f = hex:_FF_AA
 * g = 0b_1010_1100
 * h = %_1010_1100
 * i = 0o_755_644
 * j = 0z_2E_X9
 */
export function parseNumberLiteral(rawText: string): {
    value: number
    tag?: string
} {
    const raw = rawText.trim()

    const signChar = raw.startsWith('-') || raw.startsWith('+') ? raw[0] : ''
    const signFactor = signChar === '-' ? -1 : 1
    const unsigned = signChar ? raw.slice(1) : raw

    const decDigits = String.raw`\d(?:_?\d)*`
    const hexDigits = String.raw`[0-9a-fA-F](?:_?[0-9a-fA-F])*`
    const binDigits = String.raw`[01](?:_?[01])*`
    const octDigits = String.raw`[0-7](?:_?[0-7])*`
    const duoDigits = String.raw`[0-9aAbBxXeE](?:_?[0-9aAbBxXeE])*`

    // --- Exponent notation ---------
    // Examples: 1e3, 1.23e4, 1_000e2, 1.23e-4, .5e2.
    // Underscores may appear between digits, but not adjacent or at the end.
    const expPattern = new RegExp(
        `^(?:${decDigits}(?:\\.${decDigits})?|\\.${decDigits})[eE][+-]?${decDigits}$`,
    )

    if (expPattern.test(unsigned)) {
        debugPrint('* Identified as an exp number')

        const normalized = `${signChar}${unsigned.replace(/_/g, '')}`

        return {
            value: Number(normalized),
            tag: 'From exp number, Number-Float',
        }
    }

    // --- Hexadecimal with prefix 0x / 0X ---------
    // Prefix: 0x or 0X.
    // Allows underscores immediately after the prefix or between hex digits.
    // Examples: 0xFF, 0x_FF, 0xFF_AA.
    const hexPattern = new RegExp(`^0[xX]_?${hexDigits}$`)

    if (hexPattern.test(unsigned)) {
        debugPrint('* Identified as a hex number')

        const normalized = unsigned.replace(/^0[xX]_?/, '').replace(/_/g, '')

        return {
            value: signFactor * Number.parseInt(normalized, 16),
            tag: 'From hex number, Number-Integer',
        }
    }

    // --- Hexadecimal with explicit prefix hex: ---------
    // Prefix: hex: or HEX:.
    // Whitespace after hex: is not allowed.
    // Allows underscores immediately after the prefix or between hex digits.
    // Examples: hex:FF, hex:_FF, hex:FF_AA.
    const explicitHexPattern = new RegExp(`^hex:_?${hexDigits}$`, 'i')

    if (explicitHexPattern.test(unsigned)) {
        debugPrint('* Identified as an explicit hex number')

        const normalized = unsigned.replace(/^hex:_?/i, '').replace(/_/g, '')

        return {
            value: signFactor * Number.parseInt(normalized, 16),
            tag: 'From explicit hex number, Number-Integer',
        }
    }

    // --- Binary with prefix 0b / 0B or % ---------
    // Prefix: 0b, 0B, or %.
    // Allows underscores immediately after the prefix or between binary digits.
    // Examples: 0b1010, 0b_1010, 0b1010_1100, %1010, %_1010.
    const binPattern = new RegExp(`^(?:0[bB]|%)_?${binDigits}$`)

    if (binPattern.test(unsigned)) {
        debugPrint('* Identified as a bin number')

        const normalized = unsigned
            .replace(/^(?:0[bB]|%)_?/, '')
            .replace(/_/g, '')

        return {
            value: signFactor * Number.parseInt(normalized, 2),
            tag: 'From bin number, Number-Integer',
        }
    }

    // --- Octal with prefix 0o / 0O ---------
    // Prefix: 0o or 0O.
    // Allows underscores immediately after the prefix or between octal digits.
    // Examples: 0o755, 0o_755, 0o755_644.
    const octPattern = new RegExp(`^0[oO]_?${octDigits}$`)

    if (octPattern.test(unsigned)) {
        debugPrint('* Identified as an oct number')

        const normalized = unsigned.replace(/^0[oO]_?/, '').replace(/_/g, '')

        return {
            value: signFactor * Number.parseInt(normalized, 8),
            tag: 'From oct number, Number-Integer',
        }
    }

    // --- Duodecimal / dozenal with prefix 0z / 0Z ---------
    // Prefix: 0z or 0Z.
    // x/X = A/a = 10, e/E = B/b = 11.
    // Allows underscores immediately after the prefix or between duodecimal digits.
    // Examples: 0z2EX9, 0z_2EX9, 0z2E_X9.
    const duoPattern = new RegExp(`^0[zZ]_?${duoDigits}$`)

    if (duoPattern.test(unsigned)) {
        debugPrint('* Identified as a duodecimal number')

        const normalized = unsigned
            .replace(/^0[zZ]_?/, '')
            .replace(/_/g, '')
            .replace(/[xX]/g, 'A')
            .replace(/[eE]/g, 'B')

        return {
            value: signFactor * Number.parseInt(normalized, 12),
            tag: 'From doz (duodecimal) number, Number-Integer',
        }
    }

    // --- Decimal integer / float ---------
    // Allows underscores between decimal digits.
    // Examples: 1000, +1000, -1000, 1_000, 3.14, 3.141_592, .5.
    const decimalPattern = new RegExp(
        `^(?:${decDigits}(?:\\.${decDigits})?|\\.${decDigits})$`,
    )

    if (decimalPattern.test(unsigned)) {
        debugPrint(
            /\./.test(unsigned)
                ? '* Identified as a float number'
                : '* Identified as an int number',
        )

        const normalized = `${signChar}${unsigned.replace(/_/g, '')}`

        return {
            value: Number(normalized),
            tag: /\./.test(unsigned)
                ? 'From float number, Number-Float'
                : 'From int number, Number-Integer',
        }
    }

    // --- Invalid number literal ---------
    debugPrint('* Identified as invalid number')

    return {
        value: Number.NaN,
        tag: 'From invalid number/value',
    }
}

export default parseNumberLiteral
