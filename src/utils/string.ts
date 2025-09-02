/**
 * This file contains general string helper functions (utils).
 * @note More specific YINI helper functions should go into yiniHelpers.ts-file.
 */

import { createHash } from 'crypto'
import { debugPrint } from './print'

export const computeSha256 = (content: string): string => {
    return createHash('sha256').update(content, 'utf8').digest('hex')
}

/**
 * Splits a string into an array of lines, handling both LF and CRLF newlines.
 * @param content The input string.
 * @returns Array of lines (strings).
 */
export const splitLines = (content: string): string[] => {
    // Chould handle \n (LF), \r\n (CRLF), and even just \r (old Mac style).
    return content.split(/\r\n|\r|\n/)
}

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
 * Returns true if the provided string is enclosed in backticks, e.g. `name`.
 */
export const isEnclosedInBackticks = (str: string): boolean => {
    if (str.length >= 2 && str.startsWith('`') && str.endsWith('`')) {
        return true
    }

    return false
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
 * @deprecated This seems not useful anymore, use stripCommentsAndAfter(..) instead.
 */
export const stripNLAndAfter = (line: string): string => {
    let idx1 = line.indexOf('\n')
    let idx2 = line.indexOf('\r')

    if (idx1 < 0) idx1 = Number.MAX_SAFE_INTEGER
    if (idx2 < 0) idx2 = Number.MAX_SAFE_INTEGER
    // debugPrint('stripNLAndAfter(..): idx1 = ' + idx1)
    // debugPrint('stripNLAndAfter(..): idx2 = ' + idx2)

    const idx = Math.min(idx1, idx2)
    const resultLine =
        idx === Number.MAX_SAFE_INTEGER ? line : line.substring(0, idx)

    debugPrint('stripNLAndAfter(..),       line: >>>' + line + '<<<')
    debugPrint('stripNLAndAfter(..), resultLine: >>>' + resultLine + '<<<')
    return resultLine
}

/**
 * Transforms strings such as 'Id-Name' to 'id_name'.
 * Replaces all '-' to '_', and returns rusult in lower case.
 */
export const toLowerSnakeCase = (txt: string): string => {
    return txt.trim().toLowerCase().replace(/[-]/g, '_')
}
