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
