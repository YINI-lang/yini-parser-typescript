/**
 * This file contains specific YINI helper functions (utils).
 * @note More general helper functions should go into the dir "src/utils/".
 */

import {
    TListValue,
    TObjectValue,
    TScalarValue,
    TValueLiteral,
} from './core/types'
import { debugPrint, printObject } from './utils/print'
import { isEnclosedInBackticks, splitLines } from './utils/string'

const SECTION_MARKER1 = '^'
const SECTION_MARKER2 = '<'
const SECTION_MARKER3 = '\u00A7' // Section sign §.
const SECTION_MARKER4 = '\u20AC' // Euro sign €.

/**
 * Check if the character is a section marker character.
 * @param character A character in a string.
 * @note The string must be of length 1.
 * @throws Will throw if not exactly of length 1.
 */
export const isMarkerCharacter = (character: string): boolean => {
    if (character.length !== 1) {
        throw Error(
            'Argument into function isMarkerCharacter(..) is not of length 1',
        )
    }

    const ch = character
    if (
        ch === SECTION_MARKER1 ||
        ch === SECTION_MARKER2 ||
        ch === SECTION_MARKER3 ||
        ch === SECTION_MARKER4
    ) {
        return true
    }

    return false
}

/**
 * @returns Returns the beginning up to (but not including) any comments
 * starting with //, #, ; or --.
 * @throws Will throw if consisting more than 1 lines.
 */
export const stripCommentsAndAfter = (line: string): string => {
    if (splitLines(line).length > 1) {
        throw new Error(
            'Internal error: Detected several row lines in line: >>>' +
                line +
                '<<<',
        )
    }

    let idx1 = line.indexOf('//')
    let idx2 = line.indexOf('# ') // NOTE: (!) Hash comments requires a WS after the hash!
    let idx3 = line.indexOf('#\t') // NOTE: (!) Hash comments requires a WS after the hash!
    let idx4 = line.indexOf(';')
    let idx5 = line.indexOf('--')

    if (idx1 < 0) idx1 = Number.MAX_SAFE_INTEGER
    if (idx2 < 0) idx2 = Number.MAX_SAFE_INTEGER
    if (idx3 < 0) idx3 = Number.MAX_SAFE_INTEGER
    if (idx4 < 0) idx4 = Number.MAX_SAFE_INTEGER
    if (idx5 < 0) idx5 = Number.MAX_SAFE_INTEGER
    // debugPrint('stripCommentsAndAfter(..): idx1 = ' + idx1)
    // debugPrint('stripCommentsAndAfter(..): idx2 = ' + idx2)
    // debugPrint('stripCommentsAndAfter(..): idx3 = ' + idx3)
    // debugPrint('stripCommentsAndAfter(..): idx4 = ' + idx4)
    // debugPrint('stripCommentsAndAfter(..): idx5 = ' + idx5)

    const idx = Math.min(idx1, idx2, idx3, idx4, idx5)
    const resultLine =
        idx === Number.MAX_SAFE_INTEGER ? line : line.substring(0, idx)

    debugPrint('stripCommentsAndAfter(..),       line: >>>' + line + '<<<')
    debugPrint(
        'stripCommentsAndAfter(..), resultLine: >>>' + resultLine + '<<<',
    )
    return resultLine
}

/**
 * Checks if a string conforms to the identifier rules for section headers and
 * member key names as defined by the YINI specification, following
 * the ANTLR4 lexer rule:
 * IDENT: ('a'..'z' | 'A'..'Z' | '_') ('a'..'z' | 'A'..'Z' | '0'..'9' | '_')*

* @throws Will only throw if blank string.
 *
 * @satisfies Should satisfy YINI spec 7, chapter: 3.4. Identifiers, Form 1:
 * Identifier of Simple Form.
 * @link https://github.com/YINI-lang/YINI-spec/blob/develop/YINI-Specification.md#34-identifiers
 */
export const isValidSimpleIdent = (str: string): boolean => {
    if (!str.trim()) {
        throw Error(
            'Internal error: isValidSimpleIdent(..) received an empty string.',
        )
    }

    // Regex: ^[a-zA-Z_][a-zA-Z0-9_]*$
    return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(str)
}

/**
 * Checks if a string is a valid backticked phrase/identifier:
 * - Wrapped in backticks.
 * - No raw tabs, newlines, or control characters (U+0000–U+001F), except as
 *   escaped sequences (e.g., \n).
 * - May contain ordinary spaces.
 * @note Empty is allowed: ``, as in spec (due to conform with the JSON empty key "").
 * @throws Will only throw if missing enclosed backtick(s).
 *
 * @satisfies Should satisfy YINI spec 7, chapter: 3.4. Identifiers, Form 2:
 * Backticked Identifier.
 * @link https://github.com/YINI-lang/YINI-spec/blob/develop/YINI-Specification.md#34-identifiers
 */
export const isValidBacktickedIdent = (str: string): boolean => {
    // if (str.length >= 2 && str.startsWith('`') && str.endsWith('`')) {
    //     // OK, and will let possible raw newlines and tabs pass so they
    //     // are checked further down.
    // } else {
    if (!isEnclosedInBackticks(str)) {
        // NOTE: Only missing backtick(s) should throw error!
        throw Error(
            'Internal error: isValidBacktickedIdent(..) is missing backtick(s) "`".',
        )
    }

    // Get the contents inside backticks.
    const content = str.slice(1, -1)

    // Allowed escapes: \n, \r, \t, \\, \`
    const allowedEscapes = ['n', 'r', 't', '\\', '`']

    for (let i = 0; i < content.length; i++) {
        const ch = content[i]
        const code = content.charCodeAt(i)

        if (ch === '\\') {
            // If this is an escape, check next char.
            i++
            if (i >= content.length) return false // Trailing backslash is not valid.
            const nextCh = content[i]
            if (!allowedEscapes.includes(nextCh)) return false
            continue
        }

        // Allow space (U+0020), but not other control chars (U+0000–U+001F).
        if (code < 0x20 && code !== 0x20) return false

        // Disallow raw newlines, tabs, carriage returns, and backtick.
        if (ch === '\n' || ch === '\r' || ch === '\t' || ch === '`')
            // Raw newlines and tabs will yield false.
            return false
    }
    return true
}

const assertNever = (x: never): never => {
    throw new Error(`Unhandled: ${JSON.stringify(x)}`)
}

export const printLiteral = (value: TValueLiteral): void => {
    switch (value.type) {
        case 'String':
        case 'Number':
        case 'Boolean':
        case 'Null':
            console.log('' + value.value)
            break
        case 'Undefined':
            console.log('' + value.value)
            break
        case 'List':
            printObject((value as TListValue).elems)
            break
        case 'Object':
            printObject((value as TObjectValue).entries)
            break
        default:
            return assertNever(value) // ensures exhaustiveness
    }
}

export const isScalar = (v: TValueLiteral): v is TScalarValue =>
    v.type === 'String' ||
    v.type === 'Number' ||
    v.type === 'Boolean' ||
    v.type === 'Null'

// export const isList = (v: TValueLiteral): v is TListValue => v.type === 'List'
// export const isObject = (v: TValueLiteral): v is TObjectValue =>
//     v.type === 'Object'
