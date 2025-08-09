import fs from 'fs'
import { isDebug, isDev } from './config/env'
import {
    IParseMainOptions,
    TBailSensitivityLevel,
    TJSObject,
} from './core/types'
import { parseMain } from './parseEntry'
import { getFileNameExtension } from './utils/pathAndFileName'
import { debugPrint, devPrint, printObject } from './utils/print'

/**
 * This class is the public API, which exposes only parse(..) and
 * parseFile(..), rest of the implementation details are hidden.
 * @note Only parse and parseFile are public.
 */
export default class YINI {
    public static filePath: string = '' // Used in error reporting.

    /**
     * Parse YINI content into a JavaScript object.
     *
     * @param yiniContent      YINI code as a string (multi‑line content supported).
     * @param strictMode       If `true`, enforce strict parsing rules (e.g. require `/END`, disallow trailing commas).
     * @param bailSensitivity  Controls how errors and warnings are handled:
     *   - `'auto'`               : Auto‑select level (strict→1, lenient→0)
     *   - `0` / `'Ignore-Errors'`    : Continue parsing despite errors; log them and attempt recovery.
     *   - `1` / `'Abort-on-Errors'`  : Stop parsing on the first error.
     *   - `2` / `'Abort-Even-on-Warnings'`: Stop parsing on the first warning **or** error.
     * @param includeMetaData  If `true`, return additional metadata (e.g. warnings, statistics) alongside the parsed object.
     *
     * @note The order of properties in each output object may differ from their order in the YINI source.
     *
     * @returns A JavaScript object representing the parsed YINI content.
     */
    public static parse = (
        yiniContent: string,
        strictMode = false,
        bailSensitivity: 'auto' | 0 | 1 | 2 = 'auto',
        includeMetaData = false,
    ): TJSObject => {
        debugPrint('-> Entered static parse(..) in class YINI\n')

        // Important: First, before anything, trim beginning and trailing whitespaces!
        yiniContent = yiniContent.trim()

        if (!yiniContent) {
            throw new Error('Syntax-Error: Unexpected blank YINI input')
        }
        if (!yiniContent.endsWith('\n')) {
            yiniContent += '\n'
        }

        let level: TBailSensitivityLevel = 0
        if (bailSensitivity === 'auto') {
            if (!strictMode) level = 0
            if (strictMode) level = 1
        } else {
            level = bailSensitivity
        }

        const options: IParseMainOptions = {
            isStrict: strictMode,
            bailSensitivityLevel: level,
            isIncludeMeta: includeMetaData,
            isWithDiagnostics: isDev() || isDebug(),
            isWithTiming: isDebug(),
        }

        debugPrint()
        debugPrint('==== Call parse ==========================')
        const result = parseMain(yiniContent, options)
        debugPrint('==== End call parse ==========================\n')

        if (isDev()) {
            console.log()
            devPrint('YINI.parse(..): result:')
            console.log(result)

            devPrint('Complete result:')
            printObject(result)
        }

        return result
    }

    /**
     * Parse a YINI file into a JavaScript object.
     *
     * @param yiniFile Path to the YINI file.
     * @param strictMode       If `true`, enforce strict parsing rules (e.g. require `/END`, disallow trailing commas).
     * @param bailSensitivity  Controls how errors and warnings are handled:
     *   - `'auto'`               : Auto‑select level (strict→1, lenient→0)
     *   - `0` / `'Ignore-Errors'`    : Continue parsing despite errors; log them and attempt recovery.
     *   - `1` / `'Abort-on-Errors'`  : Stop parsing on the first error.
     *   - `2` / `'Abort-Even-on-Warnings'`: Stop parsing on the first warning **or** error.
     * @param includeMetaData  If `true`, return additional metadata (e.g. warnings, statistics) alongside the parsed object.
     *
     * @note The order of properties in each output object may differ from their order in the YINI source.
     *
     * @returns A JavaScript object representing the parsed YINI content.
     */
    public static parseFile = (
        filePath: string,
        strictMode = false,
        bailSensitivity: 'auto' | 0 | 1 | 2 = 'auto',
        includeMetaData = false,
    ): TJSObject => {
        debugPrint('Current directory = ' + process.cwd())

        if (getFileNameExtension(filePath).toLowerCase() !== '.yini') {
            console.error('Invalid file extension for YINI file:')
            console.error(`"${filePath}"`)
            console.log(
                'File does not have a valid ".yini" extension (case-insensitive).',
            )
            throw new Error('Error: Unexpected file extension for YINI file')
        }

        let content = fs.readFileSync(filePath, 'utf8')
        let hasNoNewlineAtEOF = false

        if (!content.endsWith('\n')) {
            content += '\n'
            hasNoNewlineAtEOF = true
        }

        YINI.filePath = filePath
        const result = this.parse(
            content,
            strictMode,
            bailSensitivity,
            includeMetaData,
        )
        if (hasNoNewlineAtEOF) {
            console.warn(
                `No newline at end of file, it\'s recommended to end a file with a newline. File:\n"${filePath}"`,
            )
        }
        return result
    }
}
