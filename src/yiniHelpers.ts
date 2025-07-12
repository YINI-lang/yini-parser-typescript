/**
 * This file contains specific YINI helper functions (utils).
 * @note More general helper functions should go into the dir "src/utils/".
 */

import { splitLines } from './utils/string'
import { debugPrint } from './utils/system'

const SECTION_MARKER1 = '^'
const SECTION_MARKER2 = '~'
const SECTION_MARKER3 = '\u00A7' // Section sign §.
const SECTION_MARKER4 = '\u20AC' // Euro sign €.

/**
 * Check if the character is a section marker character.
 * @note The string must be of length 1.
 * @param character A character in a string.
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
 */
export const isValidIdent = (str: string): boolean => {
    // Regex: ^[a-zA-Z_][a-zA-Z0-9_]*$
    return /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(str)
}
