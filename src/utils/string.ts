import { debugPrint } from './system'

/**
 * If a string starts and ends with a backtick `, if so trims the
 * first and last character (the backticks).
 */
export const trimBackticks = (str: string): string => {
    if (str.length >= 2 && str.startsWith('`') && str.endsWith('`')) {
        return str.slice(1, -1)
    }
    return str
}

/**
 * Check if the character is A-Z or a-z.
 * @note The string must be of length 1.
 * @param character A character in a string.
 */
export const isAlpha = (character: string): boolean => {
    if (character.length !== 1) {
        throw Error('Argument into function isAlpha(..) is not of length 1')
    }

    const ch = character
    if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')) {
        return true
    }

    return false
}

/**
 * Check if the character is a digit (number): 0-9.
 * @note The string must be of length 1.
 * @param character A character in a string.
 */
export const isDigit = (character: string): boolean => {
    if (character.length !== 1) {
        throw Error('Argument into function isDigit(..) is not of length 1')
    }

    const ch = character
    if (ch >= '0' && ch <= '9') {
        return true
    }

    return false
}

/**
 * @returns Returns the beginning up to (but not including) any first
 * encountered newline.
 * @note If no newline is found, returns the whole string.
 * @example
 *     `SectionName1
 *     //value = 11`
 *     => 'SectionName1'
 */
export const stripNLAndAfter = (str: string): string => {
    let idx1 = str.indexOf('\n')
    let idx2 = str.indexOf('\r')

    if (idx1 < 0) idx1 = Number.MAX_SAFE_INTEGER
    if (idx2 < 0) idx2 = Number.MAX_SAFE_INTEGER
    // debugPrint('stripNLAndAfter(..): idx1 = ' + idx1)
    // debugPrint('stripNLAndAfter(..): idx2 = ' + idx2)

    const idx = Math.min(idx1, idx2)
    return idx === -1 ? str : str.substring(0, idx)
}

/**
 * @returns Returns the beginning up to (but not including) any comments
 * starting with // and #.
 */
export const stripCommentsAndAfter = (str: string): string => {
    let idx1 = str.indexOf('//')
    let idx2 = str.indexOf('# ') // NOTE: (!) Hash comments requires a WS after the hash!
    let idx3 = str.indexOf('#\t') // NOTE: (!) Hash comments requires a WS after the hash!
    // let idx4 = str.indexOf(';')
    // let idx5 = str.indexOf('--')

    if (idx1 < 0) idx1 = Number.MAX_SAFE_INTEGER
    if (idx2 < 0) idx2 = Number.MAX_SAFE_INTEGER
    if (idx3 < 0) idx3 = Number.MAX_SAFE_INTEGER
    // if (idx4 < 0) idx4 = Number.MAX_SAFE_INTEGER
    // if (idx5 < 0) idx4 = Number.MAX_SAFE_INTEGER
    // debugPrint('stripCommentsAndAfter(..): idx1 = ' + idx1)
    // debugPrint('stripCommentsAndAfter(..): idx2 = ' + idx2)
    // debugPrint('stripCommentsAndAfter(..): idx3 = ' + idx3)
    // debugPrint('stripCommentsAndAfter(..): idx4 = ' + idx4)

    const idx = Math.min(idx1, idx2)
    return idx === -1 ? str : str.substring(0, idx)
}

/**
 * Splits a string into an array of lines, handling both LF and CRLF newlines.
 * @param content The input string.
 * @returns Array of lines (strings).
 */
export function splitLines(content: string): string[] {
    // Chould handle \n (LF), \r\n (CRLF), and even just \r (old Mac style).
    return content.split(/\r\n|\r|\n/)
}
