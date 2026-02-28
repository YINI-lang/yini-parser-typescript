import { isDebug } from '../config/env'
import { IParsedStringInput } from '../core/internalTypes'
import { debugPrint } from '../utils/print'

const isHex = (c: string) => /^[0-9a-fA-F]$/.test(c)
const isOctal = (c: string) => /^[0-7]$/.test(c)

function normalizeHyperWhitespace(input: string): string {
    return input.replace(/[\s\r\n]+/g, ' ').trim()
}

const parseClassicEscapes = (input: string): string => {
    let result = ''
    for (let i = 0; i < input.length; i++) {
        const ch = input[i]

        if (ch !== '\\') {
            // Control character enforcement (U+0000–U+001F except tab).
            const code = ch.charCodeAt(0)
            if (code < 0x20 && ch !== '\t') {
                throw new Error(
                    `Unescaped control character U+${code
                        .toString(16)
                        .padStart(4, '0')}`,
                )
            }
            result += ch
            continue
        }

        // Escape sequence.
        const next = input[++i]
        if (!next) throw new Error('Invalid escape sequence at end of string')

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
                    throw new Error(`Invalid \\x escape`)
                }
                result += String.fromCharCode(parseInt(hex, 16))
                i += 2
                break
            }

            case 'u': {
                const hex = input.slice(i + 1, i + 5)
                if (hex.length !== 4 || ![...hex].every(isHex)) {
                    throw new Error(`Invalid \\u escape`)
                }
                result += String.fromCharCode(parseInt(hex, 16))
                i += 4
                break
            }

            case 'U': {
                const hex = input.slice(i + 1, i + 9)
                if (hex.length !== 8 || ![...hex].every(isHex)) {
                    throw new Error(`Invalid \\U escape`)
                }
                const codePoint = parseInt(hex, 16)
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
                    throw new Error(`Invalid \\o escape`)
                }
                const value = parseInt(oct, 8)
                if (value > 0o377) {
                    throw new Error(`Octal escape out of range`)
                }
                result += String.fromCharCode(value)
                i += oct.length

                if (j < input.length && /[0-9]/.test(input[j])) {
                    throw new Error(`Invalid \\o escape`)
                }

                break
            }

            default:
                throw new Error(`Invalid escape sequence \\${next}`)
        }
    }

    return result
}

const parseStringLiteral = ({ strKind, value }: IParsedStringInput): string => {
    switch (strKind) {
        case 'raw':
        case 'triple-raw':
            return value

        case 'classic':
        case 'triple-classic':
            return parseClassicEscapes(value)

        case 'hyper':
            return normalizeHyperWhitespace(value)

        default:
            throw new Error(`Unknown string kind: ${strKind}`)
    }
}

export default parseStringLiteral
