import YINI from '../src/YINI'

/**
 * Ensures that all errors cause parsing to fail,
 * regardless of whether lenient or strict mode is used.
 *
 * @note Wraps YINI.parse(..) with failLevel
 * set to 1 ('Abort-on-Errors' mode).
 */
export const parseUntilError = (
    content: string,
    isStrictMode = false,
    isIncludeMeta = false,
) => {
    const result = YINI.parse(content, {
        strictMode: isStrictMode,
        failLevel: 'errors',
        includeMetadata: isIncludeMeta,
    })
    return result
}

/**
 * Ensures that all errors cause parsing to fail,
 * regardless of whether lenient or strict mode is used.
 *
 * @note Wraps YINI.parseFile(..) with failLevel
 * set to 1 ('Abort-on-Errors' mode).
 */
export const parseFileUntilError = (
    content: string,
    isStrictMode = false,
    isIncludeMeta = false,
) => {
    const result = YINI.parseFile(content, {
        strictMode: isStrictMode,
        failLevel: 'errors',
        includeMetadata: isIncludeMeta,
    })
    return result
}

/**
 * Helper:
 * parse inline content and return the thrown Error.
 */
export const parseAndCatchWithConsole = (
    yini: string,
): {
    err: Error
    stderrLines: string[]
    stdoutLines: string[]
} => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    try {
        YINI.parse(yini, {
            strictMode: true,
            silent: false,
            throwOnError: true,
        })

        throw new Error('Expected parser to throw, but it did not.')
    } catch (err: unknown) {
        const stderrLines = errorSpy.mock.calls.map((call) => String(call[0]))
        const stdoutLines = logSpy.mock.calls.map((call) => String(call[0]))

        errorSpy.mockRestore()
        logSpy.mockRestore()

        if (err instanceof Error) {
            return { err, stderrLines, stdoutLines }
        }

        return {
            err: new Error(String(err)),
            stderrLines,
            stdoutLines,
        }
    }
}
