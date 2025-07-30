import YINI from '../src/YINI'

/**
 * Ensures that all errors cause parsing to fail,
 * regardless of whether lenient or strict mode is used.
 *
 * @note Wraps YINI.parse(..) with bailSensitivity
 * set to 1 ('Abort-on-Errors' mode).
 */
export const parseYINI = (
    content: string,
    isStrictMode = false,
    isIncludeMeta = false,
) => {
    const result = YINI.parse(content, isStrictMode, 1, isIncludeMeta)
    return result
}

/**
 * Ensures that all errors cause parsing to fail,
 * regardless of whether lenient or strict mode is used.
 *
 * @note Wraps YINI.parseFile(..) with bailSensitivity
 * set to 1 ('Abort-on-Errors' mode).
 */
export const parseYINIFile = (
    content: string,
    isStrictMode = false,
    isIncludeMeta = false,
) => {
    const result = YINI.parseFile(content, isStrictMode, 1, isIncludeMeta)
    return result
}
