import fs from 'fs'
import { performance } from 'perf_hooks'
import { isDebug, isDev } from './config/env'
import {
    IAllUserOptions,
    IFileLoadMetaPayload,
    IParseCoreOptions,
    TBailSensitivityLevel,
    TJSObject,
    TPreferredBailSensitivityLevel,
} from './core/types'
import { _parseMain } from './parseEntry'
import { getFileNameExtension } from './utils/pathAndFileName'
import { debugPrint, devPrint, printObject } from './utils/print'
import { computeSha256, toLowerSnakeCase } from './utils/string'

let _fileName: undefined | string = undefined
let _fileLoadMetaPayload: IFileLoadMetaPayload = {
    sourceType: 'Inline',
    fileName: undefined,
    fileByteSize: null,
    lineCount: null,
    timeIoMs: null,
    preferredBailSensitivity: null,
    sha256: null,
}

const DEFAULT_OPTS: Required<
    Pick<
        IAllUserOptions,
        | 'strictMode'
        | 'bailSensitivity'
        | 'includeMetaData'
        | 'isWithDiagnostics'
        | 'isWithTiming'
        | 'isKeepUndefinedInMeta'
        | 'isRequireDocTerminator'
    >
> = {
    strictMode: false,
    bailSensitivity: 'auto',
    includeMetaData: false,
    isWithDiagnostics: false,
    isWithTiming: false,
    isKeepUndefinedInMeta: false,
    isRequireDocTerminator: false,
}

/**
 * This class is the public API, which exposes only parse(..) and
 * parseFile(..), rest of the implementation details are hidden.
 * @note Only parse and parseFile are public.
 */
export default class YINI {
    /**
     * Parse inline YINI content into a JavaScript object.
     *
     * @param yiniContent      YINI code as a string (multi‑line content supported).
     * @param strictMode       If `true`, enforce strict parsing rules (e.g. require `/END`, disallow trailing commas).
     * @param bailSensitivity  Preferred bail sensitivity level, controls how errors and warnings are handled:
     *   - `'auto'` or              : Auto‑select level (strict→1, lenient→0)
     *   - `0` / `'Ignore-Errors'`    : Continue parsing despite errors; log them and attempt recovery.
     *   - `1` / `'Abort-on-Errors'`  : Stop parsing on the first error.
     *   - `2` / `'Abort-Even-on-Warnings'`: Stop parsing on the first warning **or** error.
     * @param includeMetaData  If `true`, return additional metadata (e.g. warnings, statistics) alongside the parsed object.
     *
     * @returns A JavaScript object representing the parsed YINI content.
     */
    // Easy and simple positional API (great for most users).
    public static parse = (
        yiniContent: string,
        strictMode = false,
        bailSensitivity: TPreferredBailSensitivityLevel = 'auto',
        includeMetaData = false,
    ): TJSObject => {
        debugPrint('-> Entered static parse(..) in class YINI\n')

        // Required, makes all properties in T required, no undefined.
        const userOpts: Required<IAllUserOptions> = {
            ...DEFAULT_OPTS, // Sets the default options.
            strictMode,
            bailSensitivity,
            includeMetaData,
        }
        return YINI.parseWithOptions(yiniContent, userOpts)
    }

    /**
     * Parse inline YINI content into a JavaScript object.
     *
     * @param yiniContent      YINI code as a string (multi‑line content supported).
     * @param options
     *
     * @returns A JavaScript object representing the parsed YINI content.
     */
    // Advanced, named options for power/expert users (more future-proof).
    public static parseWithOptions = (
        yiniContent: string,
        options: IAllUserOptions,
    ): TJSObject => {
        debugPrint('-> Entered static parseWithOptions(..) in class YINI\n')

        // Required, makes all properties in T required, no undefined.
        const userOpts: Required<IAllUserOptions> = {
            ...DEFAULT_OPTS, // Sets the default options.
            ...options, // Overrides any options provided by the user.
        }

        if (
            userOpts.includeMetaData &&
            _fileLoadMetaPayload.sourceType === 'Inline'
        ) {
            const lineCount = yiniContent.split(/\r?\n/).length // Counts the lines.
            const sha256 = computeSha256(yiniContent) // NOTE: Compute BEFORE any possible tampering of content.

            _fileLoadMetaPayload.lineCount = lineCount
            _fileLoadMetaPayload.preferredBailSensitivity =
                userOpts.bailSensitivity
            _fileLoadMetaPayload.sha256 = sha256
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
        if (userOpts.bailSensitivity === 'auto') {
            if (!userOpts.strictMode) level = 0
            if (userOpts.strictMode) level = 1
        } else {
            level = userOpts.bailSensitivity
        }

        const coreOpts: IParseCoreOptions = {
            isStrict: userOpts.strictMode,
            bailSensitivityLevel: level,
            isIncludeMeta: userOpts.includeMetaData,
            isWithDiagnostics:
                isDev() || isDebug() || userOpts.isWithDiagnostics,
            isWithTiming: isDev() || isDebug() || userOpts.isWithTiming,
            isKeepUndefinedInMeta: isDebug() || userOpts.isKeepUndefinedInMeta,
            isRequireDocTerminator: false || userOpts.isRequireDocTerminator,
        }

        debugPrint()
        debugPrint('==== Call parse ==========================')
        const result = _parseMain(yiniContent, coreOpts, _fileLoadMetaPayload)
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

    // === parseFile / parseFileWithOptions ================================

    /**
     * Parse a YINI file into a JavaScript object.
     *
     * @param yiniFile Path to the YINI file.
     * @param strictMode       If `true`, enforce strict parsing rules (e.g. require `/END`, disallow trailing commas).
     * @param bailSensitivity  Preferred bail sensitivity level, controls how errors and warnings are handled:
     *   - `'auto'`               : Auto‑select level (strict→1, lenient→0)
     *   - `0` / `'Ignore-Errors'`    : Continue parsing despite errors; log them and attempt recovery.
     *   - `1` / `'Abort-on-Errors'`  : Stop parsing on the first error.
     *   - `2` / `'Abort-Even-on-Warnings'`: Stop parsing on the first warning **or** error.
     * @param includeMetaData  If `true`, return additional metadata (e.g. warnings, statistics) alongside the parsed object.
     *
     * @returns A JavaScript object representing the parsed YINI content.
     */
    // Easy and simple positional API (great for most users).
    public static parseFile = (
        filePath: string,
        strictMode = false,
        bailSensitivity: TPreferredBailSensitivityLevel = 'auto',
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
        const timeEndMs = performance.now()

        _fileLoadMetaPayload.sourceType = 'File'
        _fileLoadMetaPayload.fileName = filePath

        if (includeMetaData) {
            _fileLoadMetaPayload.lineCount = content.split(/\r?\n/).length // Counts the lines.
            _fileLoadMetaPayload.fileByteSize = fileByteSize
            _fileLoadMetaPayload.timeIoMs = +(timeEndMs - timeStartMs)
            _fileLoadMetaPayload.preferredBailSensitivity = bailSensitivity
            _fileLoadMetaPayload.sha256 = computeSha256(content) // NOTE: Compute BEFORE any possible tampering of content.
        }

        let hasNoNewlineAtEOF = false
        if (!content.endsWith('\n')) {
            content += '\n'
            hasNoNewlineAtEOF = true
        }

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

        return result
    }
}
