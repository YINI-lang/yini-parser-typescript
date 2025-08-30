import fs from 'fs'
import { performance } from 'perf_hooks'
import { isDebug, isDev } from './config/env'
import {
    // IParseFileBodyReturn,
    IFileLoadMetaPayload,
    IParseMainOptions,
    TBailSensitivityLevel,
    TJSObject,
} from './core/types'
import { parseMain } from './parseEntry'
import { getFileNameExtension } from './utils/pathAndFileName'
import { debugPrint, devPrint, printObject } from './utils/print'

// let g_fileName: undefined | string = undefined
let _fileName: undefined | string = undefined
let _fileLoadMetaPayload: IFileLoadMetaPayload = {
    sourceType: 'inline',
    fileName: undefined,
    fileByteSize: null,
    lineCount: null,
    timeIoMs: null,
    preferredBailSensitivity: null,
}

/**
 * This class is the public API, which exposes only parse(..) and
 * parseFile(..), rest of the implementation details are hidden.
 * @note Only parse and parseFile are public.
 */
export default class YINI {
    // public static filePath: string = '' // Used in error reporting.

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

        if (_fileLoadMetaPayload.sourceType === 'inline') {
            const lineCount = yiniContent.split(/\r?\n/).length // Counts the lines.
            _fileLoadMetaPayload.lineCount = lineCount
        }

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
            isWithTiming: isDev() || isDebug(),
        }

        debugPrint()
        debugPrint('==== Call parse ==========================')
        //const result = parseMain(yiniContent, options, _fileName)
        const result = parseMain(yiniContent, options, _fileLoadMetaPayload)
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
        //     filePath: string,
        //     strictMode = false,
        //     bailSensitivity: 'auto' | 0 | 1 | 2 = 'auto',
        //     includeMetaData = false,
        // ): TJSObject => {
        //     const ret = this._parseFileBody(
        //         filePath,
        //         strictMode,
        //         bailSensitivity,
        //         includeMetaData,
        //     )

        //     _fileName = ret.fileName
        //     return ret.result
        // }

        // private static _parseFileBody = (
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

        // ---- Phase 0: I/O ----
        const timeStartMs = performance.now()

        // let content = fs.readFileSync(filePath, 'utf8')
        const rawBuffer = fs.readFileSync(filePath) // Raw buffer for size.
        const fileByteSize = rawBuffer.byteLength // Byte size in UTF-8.

        let content = rawBuffer.toString('utf8')
        const lineCount = content.split(/\r?\n/).length // Counts the lines.

        const timeEndMs = performance.now()
        const timeIoMs = +(timeEndMs - timeStartMs)

        let hasNoNewlineAtEOF = false
        if (!content.endsWith('\n')) {
            content += '\n'
            hasNoNewlineAtEOF = true
        }

        // g_fileName = filePath
        // YINI.filePath = filePath
        const fileLoadMeta: IFileLoadMetaPayload = {
            sourceType: 'file',
            fileName: filePath,
            fileByteSize,
            lineCount,
            timeIoMs,
            preferredBailSensitivity: bailSensitivity,
        }
        _fileLoadMetaPayload = fileLoadMeta

        const result = this.parse(
            content,
            strictMode,
            bailSensitivity,
            includeMetaData,
        )
        if (hasNoNewlineAtEOF) {
            console.warn(
                `No newline at end of file, it's recommended to end a file with a newline. File:\n"${filePath}"`,
            )
        }

        // const ret: IParseFileBodyReturn = {
        //     result,
        //     fileName: filePath,
        //     fileByteSize,
        //     lineCount,
        //     timeIoMs,
        // }
        // return ret
        return result
    }
}
