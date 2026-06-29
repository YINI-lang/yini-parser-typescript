// src/parsers/parseString.ts
/**
 * This file should only:
 * - parse string contents,
 * - validate escapes,
 * - and throw typed error on issues.
 */
import { isDebug } from '../config/env'
import { IParsedStringInput } from '../core/internalTypes'
import { debugPrint } from '../utils/print'

export class CYiniStringParseError extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'YiniStringParseError'
    }
}

const isHex = (c: string) => /^[0-9a-fA-F]$/.test(c)
const isOctal = (c: string) => /^[0-7]$/.test(c)
const isUnicodeScalarValue = (codePoint: number): boolean => {
    return (
        codePoint >= 0x0000 &&
        codePoint <= 0x10ffff &&
        !(codePoint >= 0xd800 && codePoint <= 0xdfff)
    )
}

/**
 *
 * @param isAllowRealLineBreaks True if this is a Multi-line string (a triple-quoted string in YINI).
 */
const parseClassicEscapes = (
    input: string,
    isAllowRealLineBreaks = false,
): string => {
    let result = ''

    for (let i = 0; i < input.length; i++) {
        const ch = input[i]

        if (ch !== '\\') {
            const code = ch.charCodeAt(0)

            if (code < 0x20) {
                const isAllowedLineBreak =
                    isAllowRealLineBreaks && (ch === '\n' || ch === '\r')

                const isAllowedTab = ch === '\t'

                if (!isAllowedLineBreak && !isAllowedTab) {
                    throw new CYiniStringParseError(
                        `Unescaped control character U+${code
                            .toString(16)
                            .padStart(4, '0')}`,
                    )
                }
            }

            result += ch
            continue
        }

        // Escape sequence.
        const next = input[++i]
        if (!next) {
            throw new CYiniStringParseError(
                'Invalid escape sequence at end of string',
            )
        }

        switch (next) {
            case '\\':
                result += '\\'
                break
            case '"':
                result += '"'
                break
            case "'":
                result += "'"
                break
            case '/':
                result += '/'
                break
            case '0':
                result += '\0'
                break
            case '?':
                result += '?'
                break
            case 'a':
                result += '\x07'
                break
            case 'b':
                result += '\b'
                break
            case 'f':
                result += '\f'
                break
            case 'n':
                result += '\n'
                break
            case 'r':
                result += '\r'
                break
            case 't':
                result += '\t'
                break
            case 'v':
                result += '\v'
                break

            case 'x': {
                const hex = input.slice(i + 1, i + 3)

                if (hex.length !== 2 || ![...hex].every(isHex)) {
                    throw new CYiniStringParseError('Invalid \\x escape')
                }

                result += String.fromCharCode(parseInt(hex, 16))
                i += 2
                break
            }

            case 'u': {
                const hex = input.slice(i + 1, i + 5)

                if (hex.length !== 4 || ![...hex].every(isHex)) {
                    throw new CYiniStringParseError('Invalid \\u escape')
                }

                const codePoint = parseInt(hex, 16)

                if (codePoint >= 0xd800 && codePoint <= 0xdfff) {
                    throw new CYiniStringParseError(
                        'Unicode escape must not be a surrogate code point',
                    )
                }

                result += String.fromCharCode(codePoint)
                i += 4
                break
            }

            case 'U': {
                const hex = input.slice(i + 1, i + 9)

                if (hex.length !== 8 || ![...hex].every(isHex)) {
                    throw new CYiniStringParseError('Invalid \\U escape')
                }

                const codePoint = parseInt(hex, 16)

                if (
                    codePoint > 0x10ffff ||
                    (codePoint >= 0xd800 && codePoint <= 0xdfff)
                ) {
                    throw new CYiniStringParseError(
                        'Unicode escape must represent a valid Unicode scalar value',
                    )
                }

                result += String.fromCodePoint(codePoint)
                i += 8
                break
            }

            case 'o': {
                let oct = ''
                let j = i + 1

                while (
                    j < input.length &&
                    oct.length < 3 &&
                    isOctal(input[j])
                ) {
                    oct += input[j]
                    j++
                }

                if (oct.length === 0) {
                    throw new CYiniStringParseError('Invalid \\o escape')
                }

                const value = parseInt(oct, 8)

                if (value > 0o377) {
                    throw new CYiniStringParseError('Octal escape out of range')
                }

                result += String.fromCharCode(value)
                i += oct.length

                if (j < input.length && /[0-9]/.test(input[j])) {
                    throw new CYiniStringParseError('Invalid \\o escape')
                }

                break
            }

            default:
                throw new CYiniStringParseError(
                    `Invalid escape sequence "\\${next}"`,
                )
        }
    }

    return result
}

const normalizeRealLineBreaks = (value: string): string =>
    value.replace(/\r\n?/g, '\n')

const rejectRawSingleLineControlCharacters = (input: string): void => {
    for (let i = 0; i < input.length; i++) {
        const code = input.charCodeAt(i)

        if (code < 0x20) {
            throw new CYiniStringParseError(
                `Raw string contains control character U+${code
                    .toString(16)
                    .padStart(4, '0')}`,
            )
        }
    }
}

const parseStringLiteral = ({ strKind, value }: IParsedStringInput): string => {
    switch (strKind) {
        case 'raw':
            // Raw strings preserve content exactly as provided by the lexer.
            // Line breaks are enforced by the lexer; other C0 controls are
            // reported here so callers get a structured parser diagnostic.
            rejectRawSingleLineControlCharacters(value)
            return value

        case 'triple-raw':
            return normalizeRealLineBreaks(value)

        case 'classic':
            return parseClassicEscapes(value, false)

        case 'triple-classic':
            return parseClassicEscapes(normalizeRealLineBreaks(value), true)

        default:
            throw new CYiniStringParseError(`Unknown string kind: ${strKind}`)
    }
}

export default parseStringLiteral
