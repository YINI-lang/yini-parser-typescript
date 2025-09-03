import YINI from '../src/YINI'

/**
 * Ensures that all errors cause parsing to fail,
 * regardless of whether lenient or strict mode is used.
 *
 * @note Wraps YINI.parse(..) with bailSensitivity
 * set to 1 ('Abort-on-Errors' mode).
 */
export const parseUntilError = (
    content: string,
    isStrictMode = false,
    isIncludeMeta = false,
) => {
    const result = YINI.parse(content, {
        strictMode: isStrictMode,
        bailSensitivity: 1,
        includeMetaData: isIncludeMeta,
    })
    return result
}

/**
 * Ensures that all errors cause parsing to fail,
 * regardless of whether lenient or strict mode is used.
 *
 * @note Wraps YINI.parseFile(..) with bailSensitivity
 * set to 1 ('Abort-on-Errors' mode).
 */
export const parseFileUntilError = (
    content: string,
    isStrictMode = false,
    isIncludeMeta = false,
) => {
    const result = YINI.parseFile(content, {
        strictMode: isStrictMode,
        bailSensitivity: 1,
        includeMetaData: isIncludeMeta,
    })
    return result
}
