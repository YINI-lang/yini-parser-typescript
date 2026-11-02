// src/parsers/parseNumber.ts
import { debugPrint } from '../utils/print'

const decDigits = String.raw`\d(?:_?\d)*`
const hexDigits = String.raw`[0-9a-fA-F](?:_?[0-9a-fA-F])*`
const binDigits = String.raw`[01](?:_?[01])*`
const octDigits = String.raw`[0-7](?:_?[0-7])*`
const duoDigits = String.raw`[0-9aAbBxXeE](?:_?[0-9aAbBxXeE])*`
const expPattern = new RegExp(
    `^(?:${decDigits}(?:\\.${decDigits})?|\\.${decDigits})[eE][+-]?${decDigits}$`,
)
const hexPattern = new RegExp(`^0[xX]_?${hexDigits}$`)
const explicitHexPattern = new RegExp(`^hex:_?${hexDigits}$`, 'i')
const binPattern = new RegExp(`^(?:0[bB]|%)_?${binDigits}$`)
const octPattern = new RegExp(`^0[oO]_?${octDigits}$`)
const duoPattern = new RegExp(`^0[zZ]_?${duoDigits}$`)
const decimalPattern = new RegExp(
    `^(?:${decDigits}(?:\\.${decDigits})?|\\.${decDigits})$`,
)

const minInteger = -(1n << 63n)
const maxInteger = (1n << 63n) - 1n
const maxSafeInteger = BigInt(Number.MAX_SAFE_INTEGER)

const invalidNumber = (message: string) => ({
    value: Number.NaN,
    tag: 'From invalid number/value',
    error: message,
})

const parseInteger = (digits: string, base: number, negative: boolean) => {
    let value: bigint
    if (base === 12) {
        value = 0n
        for (const digit of digits) {
            const dozenalDigit = /[aAxX]/.test(digit)
                ? 10
                : /[bBeE]/.test(digit)
                  ? 11
                  : Number(digit)
            value = value * 12n + BigInt(dozenalDigit)
        }
    } else {
        const prefix = base === 16 ? '0x' : base === 8 ? '0o' : base === 2 ? '0b' : ''
        value = BigInt(prefix + digits)
    }

    if (negative) value = -value
    if (value < minInteger || value > maxInteger) {
        return invalidNumber('Integer literal is outside the signed 64-bit range.')
    }

    return {
        value:
            value >= -maxSafeInteger && value <= maxSafeInteger
                ? Number(value)
                : value,
    }
}

const parseFloatValue = (normalized: string) => {
    const value = Number(normalized)
    if (!Number.isFinite(value)) {
        return invalidNumber('Floating-point literal overflows binary64.')
    }

    const significand = normalized.split(/[eE]/)[0]
    if (value === 0 && /[1-9]/.test(significand)) {
        return invalidNumber('Floating-point literal underflows to zero.')
    }

    return { value }
}

/** Normalizes a validated numeric source literal for lenient concatenation. */
export const normalizeNumberForConcatenation = (
    rawText: string,
    parsedValue: number | bigint,
): string => {
    const raw = rawText.trim().replace(/_/g, '')
    const unsigned = raw.replace(/^[+-]/, '')
    if (/^(?:0[xXbBoOzZ]|%|hex:)/i.test(unsigned)) {
        return String(parsedValue)
    }
    return raw.replace(/^\+/, '').replace(/E/g, 'e').replace(/e\+/, 'e')
}

/**
 * Parses a YINI number literal without losing signed 64-bit integer precision.
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
    value: number | bigint
    tag?: string
    error?: string
} {
    const raw = rawText.trim()

    const signChar = raw.startsWith('-') || raw.startsWith('+') ? raw[0] : ''
    const unsigned = signChar ? raw.slice(1) : raw

    // --- Exponent notation ---------
    // Examples: 1e3, 1.23e4, 1_000e2, 1.23e-4, .5e2.
    // Underscores may appear between digits, but not adjacent or at the end.
    if (expPattern.test(unsigned)) {
        debugPrint('* Identified as an exp number')

        const normalized = `${signChar}${unsigned.replace(/_/g, '')}`

        return { ...parseFloatValue(normalized), tag: 'From exp number, Number-Float' }
    }

    // --- Hexadecimal with prefix 0x / 0X ---------
    // Prefix: 0x or 0X.
    // Allows underscores immediately after the prefix or between hex digits.
    // Examples: 0xFF, 0x_FF, 0xFF_AA.

    if (hexPattern.test(unsigned)) {
        debugPrint('* Identified as a hex number')

        const normalized = unsigned.replace(/^0[xX]_?/, '').replace(/_/g, '')

        return { ...parseInteger(normalized, 16, signChar === '-'), tag: 'From hex number, Number-Integer' }
    }

    // --- Hexadecimal with explicit prefix hex: ---------
    // Prefix: hex: or HEX:.
    // Whitespace after hex: is not allowed.
    // Allows underscores immediately after the prefix or between hex digits.
    // Examples: hex:FF, hex:_FF, hex:FF_AA.

    if (explicitHexPattern.test(unsigned)) {
        debugPrint('* Identified as an explicit hex number')

        const normalized = unsigned.replace(/^hex:_?/i, '').replace(/_/g, '')

        return { ...parseInteger(normalized, 16, signChar === '-'), tag: 'From explicit hex number, Number-Integer' }
    }

    // --- Binary with prefix 0b / 0B or % ---------
    // Prefix: 0b, 0B, or %.
    // Allows underscores immediately after the prefix or between binary digits.
    // Examples: 0b1010, 0b_1010, 0b1010_1100, %1010, %_1010.

    if (binPattern.test(unsigned)) {
        debugPrint('* Identified as a bin number')

        const normalized = unsigned
            .replace(/^(?:0[bB]|%)_?/, '')
            .replace(/_/g, '')

        return { ...parseInteger(normalized, 2, signChar === '-'), tag: 'From bin number, Number-Integer' }
    }

    // --- Octal with prefix 0o / 0O ---------
    // Prefix: 0o or 0O.
    // Allows underscores immediately after the prefix or between octal digits.
    // Examples: 0o755, 0o_755, 0o755_644.

    if (octPattern.test(unsigned)) {
        debugPrint('* Identified as an oct number')

        const normalized = unsigned.replace(/^0[oO]_?/, '').replace(/_/g, '')

        return { ...parseInteger(normalized, 8, signChar === '-'), tag: 'From oct number, Number-Integer' }
    }

    // --- Duodecimal / dozenal with prefix 0z / 0Z ---------
    // Prefix: 0z or 0Z.
    // x/X = A/a = 10, e/E = B/b = 11.
    // Allows underscores immediately after the prefix or between duodecimal digits.
    // Examples: 0z2EX9, 0z_2EX9, 0z2E_X9.

    if (duoPattern.test(unsigned)) {
        debugPrint('* Identified as a duodecimal number')

        const normalized = unsigned.replace(/^0[zZ]_?/, '').replace(/_/g, '')
        return { ...parseInteger(normalized, 12, signChar === '-'), tag: 'From doz (duodecimal) number, Number-Integer' }
    }

    // --- Decimal integer / float ---------
    // Allows underscores between decimal digits.
    // Examples: 1000, +1000, -1000, 1_000, 3.14, 3.141_592, .5.
    if (decimalPattern.test(unsigned)) {
        debugPrint(
            /\./.test(unsigned)
                ? '* Identified as a float number'
                : '* Identified as an int number',
        )

        const normalized = `${signChar}${unsigned.replace(/_/g, '')}`

        if (/\./.test(unsigned)) {
            return { ...parseFloatValue(normalized), tag: 'From float number, Number-Float' }
        }
        return { ...parseInteger(unsigned.replace(/_/g, ''), 10, signChar === '-'), tag: 'From int number, Number-Integer' }
    }

    // --- Invalid number literal ---------
    debugPrint('* Identified as invalid number')

    return invalidNumber('Invalid number literal.')
}

export default parseNumberLiteral
