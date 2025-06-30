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
    const idx = str.indexOf('\n')
    return idx === -1 ? str : str.substring(0, idx)
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
