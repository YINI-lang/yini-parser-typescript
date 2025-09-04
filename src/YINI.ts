import fs from 'fs'
import { performance } from 'perf_hooks'
import { isDebug, isDev } from './config/env'
import {
    IAllUserOptions,
    IParseCoreOptions,
    IRuntimeInfo,
    TBailSensitivityLevel,
    TJSObject,
    TPreferredFailLevel,
} from './core/types'
import { _parseMain } from './parseEntry'
import { getFileNameExtension } from './utils/pathAndFileName'
import { debugPrint, devPrint, printObject } from './utils/print'
import { computeSha256 } from './utils/string'

let _runtimeInfo: IRuntimeInfo = {
    sourceType: 'Inline',
    fileName: undefined,
    fileByteSize: null,
    lineCount: null,
    timeIoMs: null,
    preferredBailSensitivity: null,
    sha256: null,
}

// Type guard: did the caller use the options-object form?
const isOptionsObjectForm = (v: unknown): v is IAllUserOptions => {
    return (
        v != null &&
        typeof v === 'object' &&
        // Note: If one wants, this can be relax to "typeof v === 'object'"
        // but this keeps accidental booleans/strings out.
        ('strictMode' in (v as any) ||
            'failLevel' in (v as any) ||
            'includeMetaData' in (v as any) ||
            'isWithDiagnostics' in (v as any) ||
            'isWithTiming' in (v as any) ||
            'isKeepUndefinedInMeta' in (v as any) ||
            'isRequireDocTerminator' in (v as any))
    )
}

// Initial default values.
const DEFAULT_OPTS: Required<
    Pick<
        IAllUserOptions,
        | 'strictMode'
        | 'failLevel'
        | 'includeMetaData'
        | 'isWithDiagnostics'
        | 'isWithTiming'
        | 'isKeepUndefinedInMeta'
        | 'isRequireDocTerminator'
    >
> = {
    strictMode: false,
    failLevel: 'auto',
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
     * @param failLevel        Preferred bail sensitivity level, controls how errors and warnings are handled:
     *   - `'auto'` (default)       : Auto‑select level (strict→1, lenient→0)
     *   - `0` / `'Ignore-Errors'`    : Continue parsing despite errors; log them and attempt recovery.
     *   - `1` / `'Abort-on-Errors'`  : Stop parsing on the first error.
     *   - `2` / `'Abort-Even-on-Warnings'`: Stop parsing on the first warning **or** error.
     * @param includeMetaData  If `true`, return additional metadata (e.g. warnings, statistics) alongside the parsed object.
     *
     * @returns A JavaScript object representing the parsed YINI content.
     */
    // --- Method overload signature ---------------------------------------
    // (With no body + not declared with arrow function.)
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    // Easier and simpler positional form ((legacy/simple)).
    public static parse(
        yiniContent: string,
        strictMode?: boolean,
        failLevel?: TPreferredFailLevel,
        includeMetaData?: boolean,
    ): TJSObject

    /**
     * Parse inline YINI content into a JavaScript object, using an options object for configuration.
     *
     * @param yiniContent      YINI code as a string (multi‑line content supported).
     * @param options Optional settings to customize parsing and/or results, useful if you need more control.
     *
     * @returns A JavaScript object representing the parsed YINI content.
     */
    // --- Method overload signature ---------------------------------------
    // (With no body + not declared with arrow function.)
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    // Options-object form (recommended) for power/expert users (more future-proof).
    public static parse(
        yiniContent: string,
        options?: IAllUserOptions,
    ): TJSObject

    // --- Single implementation --------------------------------------------
    // Implementation method (not declared with arrow function) for both method overload signatures.
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    public static parse(
        yiniContent: string,
        arg2?: boolean | IAllUserOptions, // strictMode | options
        failLevel: TPreferredFailLevel = DEFAULT_OPTS.failLevel,
        includeMetaData = DEFAULT_OPTS.includeMetaData,
    ): TJSObject {
        debugPrint('-> Entered static parse(..) in class YINI\n')

        // Runtime guard to catch illegal/ambiguous calls coming from JS or any-cast code
        if (
            isOptionsObjectForm(arg2) &&
            (failLevel !== 'auto' || includeMetaData !== false)
        ) {
            throw new TypeError(
                'Invalid call: when providing an options object, do not also pass positional parameters.',
            )
        }

        // Normalize to a fully-required options object.
        let userOpts: Required<IAllUserOptions>

        // Required, makes all properties in T required, no undefined.
        // const userOpts: Required<IAllUserOptions> = isOptionsObjectForm(arg2)
        if (isOptionsObjectForm(arg2)) {
            // Options-object Form.
            /* parse = (
                  yiniContent: string,
                  options: IAllUserOptions,
               )
            */
            userOpts = {
                ...DEFAULT_OPTS, // Sets the default options.
                strictMode: arg2.strictMode ?? DEFAULT_OPTS.strictMode,
                failLevel: arg2.failLevel ?? DEFAULT_OPTS.failLevel,
                includeMetaData:
                    arg2.includeMetaData ?? DEFAULT_OPTS.includeMetaData,
                isWithDiagnostics:
                    arg2.isWithDiagnostics ?? DEFAULT_OPTS.isWithDiagnostics,
                isWithTiming: arg2.isWithTiming ?? DEFAULT_OPTS.isWithTiming,
                isKeepUndefinedInMeta:
                    arg2.isKeepUndefinedInMeta ??
                    DEFAULT_OPTS.isKeepUndefinedInMeta,
                isRequireDocTerminator:
                    arg2.isRequireDocTerminator ??
                    DEFAULT_OPTS.isRequireDocTerminator,
            }
        } else {
            // Positional form.
            /* parse = (
                  yiniContent: string,
                  strictMode?: boolean,
                  failLevel?: TPreferredFailLevel,
                  includeMetaData?: boolean,
               )
            */
            userOpts = {
                ...DEFAULT_OPTS, // Sets the default options.
                strictMode:
                    (arg2 as boolean | undefined) ?? DEFAULT_OPTS.strictMode,
                failLevel,
                includeMetaData,
            }
        }

        if (userOpts.includeMetaData && _runtimeInfo.sourceType === 'Inline') {
            const lineCount = yiniContent.split(/\r?\n/).length // Counts the lines.
            const sha256 = computeSha256(yiniContent) // NOTE: Compute BEFORE any possible tampering of content.

            _runtimeInfo.lineCount = lineCount
            _runtimeInfo.preferredBailSensitivity = userOpts.failLevel
            _runtimeInfo.sha256 = sha256
        }

        // NOTE: Important: Do not trim or mutate the yiniContent here, due
        // to it will mess up the line numbers in error reporting.

        if (!yiniContent) {
            throw new Error('Syntax-Error: Unexpected blank YINI input')
        }
        if (!yiniContent.endsWith('\n')) {
            yiniContent += '\n'
        }

        let level: TBailSensitivityLevel = 0
        if (userOpts.failLevel === 'auto') {
            if (!userOpts.strictMode) level = 0
            if (userOpts.strictMode) level = 1
        } else {
            level = userOpts.failLevel
        }

        const coreOpts: IParseCoreOptions = {
            isStrict: userOpts.strictMode,
            bailSensitivity: level,
            isIncludeMeta: userOpts.includeMetaData,
            isWithDiagnostics:
                isDev() || isDebug() || userOpts.isWithDiagnostics,
            isWithTiming: isDev() || isDebug() || userOpts.isWithTiming,
            isKeepUndefinedInMeta: isDebug() || userOpts.isKeepUndefinedInMeta,
            isRequireDocTerminator: userOpts.isRequireDocTerminator,
        }

        debugPrint()
        debugPrint('==== Call parse ==========================')
        const result = _parseMain(yiniContent, coreOpts, _runtimeInfo)
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
     * @param failLevel        Preferred bail sensitivity level, controls how errors and warnings are handled:
     *   - `'auto'` (default)       : Auto‑select level (strict→1, lenient→0)
     *   - `0` / `'Ignore-Errors'`    : Continue parsing despite errors; log them and attempt recovery.
     *   - `1` / `'Abort-on-Errors'`  : Stop parsing on the first error.
     *   - `2` / `'Abort-Even-on-Warnings'`: Stop parsing on the first warning **or** error.
     * @param includeMetaData  If `true`, return additional metadata (e.g. warnings, statistics) alongside the parsed object.
     *
     * @returns A JavaScript object representing the parsed YINI content.
     */
    // --- Method overload signature ---------------------------------------
    // (With no body + not declared with arrow function.)
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    // Easy and simple positional API (great for most users).
    public static parseFile(
        filePath: string,
        strictMode?: boolean,
        failLevel?: TPreferredFailLevel,
        includeMetaData?: boolean,
    ): TJSObject

    /**
     * Parse a YINI file into a JavaScript object, using an options object for configuration.
     *
     * @param yiniFile Path to the YINI file.
     * @param options Optional settings to customize parsing and/or results, useful if you need more control.
     *
     * @returns A JavaScript object representing the parsed YINI content.
     */
    // --- Method overload signature ---------------------------------------
    // (With no body + not declared with arrow function.)
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    // Options-object form (recommended) for power/expert users (more future-proof).
    public static parseFile(
        filePath: string,
        options?: IAllUserOptions,
    ): TJSObject

    // --- Single implementation --------------------------------------------
    // Implementation method (not declared with arrow function) for both method overload signatures.
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    public static parseFile(
        filePath: string,
        arg2?: boolean | IAllUserOptions, // strictMode | options
        failLevel: TPreferredFailLevel = DEFAULT_OPTS.failLevel,
        includeMetaData = DEFAULT_OPTS.includeMetaData,
    ): TJSObject {
        debugPrint('-> Entered static parseFile(..) in class YINI\n')
        debugPrint('Current directory = ' + process.cwd())

        // Runtime guard to catch illegal/ambiguous calls coming from JS or any-cast code
        if (
            isOptionsObjectForm(arg2) &&
            (failLevel !== 'auto' || includeMetaData !== false)
        ) {
            throw new TypeError(
                'Invalid call: when providing an options object, do not also pass positional parameters.',
            )
        }

        // Normalize to a fully-required options object.
        let userOpts: Required<IAllUserOptions>

        // Required, makes all properties in T required, no undefined.
        // const userOpts: Required<IAllUserOptions> = isOptionsObjectForm(arg2)
        if (isOptionsObjectForm(arg2)) {
            // Options-object Form.
            /* parse = (
                  yiniContent: string,
                  options: IAllUserOptions,
               )
            */
            userOpts = {
                ...DEFAULT_OPTS, // Sets the default options.
                strictMode: arg2.strictMode ?? DEFAULT_OPTS.strictMode,
                failLevel: arg2.failLevel ?? DEFAULT_OPTS.failLevel,
                includeMetaData:
                    arg2.includeMetaData ?? DEFAULT_OPTS.includeMetaData,
                isWithDiagnostics:
                    arg2.isWithDiagnostics ?? DEFAULT_OPTS.isWithDiagnostics,
                isWithTiming: arg2.isWithTiming ?? DEFAULT_OPTS.isWithTiming,
                isKeepUndefinedInMeta:
                    arg2.isKeepUndefinedInMeta ??
                    DEFAULT_OPTS.isKeepUndefinedInMeta,
                isRequireDocTerminator:
                    arg2.isRequireDocTerminator ??
                    DEFAULT_OPTS.isRequireDocTerminator,
            }
        } else {
            // Positional form.
            /* parse = (
                  yiniContent: string,
                  strictMode?: boolean,
                  failLevel?: TPreferredFailLevel,
                  includeMetaData?: boolean,
               )
            */
            userOpts = {
                ...DEFAULT_OPTS, // Sets the default options.
                strictMode:
                    (arg2 as boolean | undefined) ?? DEFAULT_OPTS.strictMode,
                failLevel,
                includeMetaData,
            }
        }

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

        _runtimeInfo.sourceType = 'File'
        _runtimeInfo.fileName = filePath

        if (userOpts.includeMetaData) {
            _runtimeInfo.lineCount = content.split(/\r?\n/).length // Counts the lines.
            _runtimeInfo.fileByteSize = fileByteSize
            _runtimeInfo.timeIoMs = +(timeEndMs - timeStartMs)
            _runtimeInfo.preferredBailSensitivity = userOpts.failLevel
            _runtimeInfo.sha256 = computeSha256(content) // NOTE: Compute BEFORE any possible tampering of content.
        }

        let hasNoNewlineAtEOF = false
        if (!content.endsWith('\n')) {
            content += '\n'
            hasNoNewlineAtEOF = true
        }

        const result = this.parse(
            content,
            userOpts.strictMode,
            userOpts.failLevel,
            userOpts.includeMetaData,
        )
        if (hasNoNewlineAtEOF) {
            console.warn(
                `No newline at end of file, it's recommended to end a file with a newline. File:\n"${filePath}"`,
            )
        }

        return result
    }
}
