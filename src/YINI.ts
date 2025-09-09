import fs from 'fs'
import { performance } from 'perf_hooks'
import { isDebug, isDev } from './config/env'
import { ErrorDataHandler } from './core/ErrorDataHandler'
import {
    IAllUserOptions,
    IParseCoreOptions,
    IRuntimeInfo,
    TBailSensitivityLevel,
    TJSObject,
    TParserMode,
    TPersistThreshold,
    TPreferredFailLevel,
} from './core/types'
import { _parseMain } from './parseEntry'
import { getFileNameExtension } from './utils/pathAndFileName'
import { debugPrint, devPrint, printObject } from './utils/print'
import { computeSha256 } from './utils/string'

const DEFAULT_TAB_SIZE = 4 // De facto "modern default" (even though traditionally/historically it's 8).

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
            'includeDiagnostics' in (v as any) ||
            'includeTiming' in (v as any) ||
            'preserveUndefinedInMeta' in (v as any) ||
            'suppressWarnings' in (v as any) ||
            'requireDocTerminator' in (v as any) ||
            'treatEmptyValueAsNull' in (v as any) ||
            'onDuplicateKey' in (v as any))
    )
}

/*
// Initial default values.
const DEFAULT_OPTS: Required<
    Pick<
        IAllUserOptions,
        | 'strictMode'
        | 'failLevel'
        | 'includeMetaData'
        | 'includeDiagnostics'
        | 'includeTiming'
        | 'preserveUndefinedInMeta'
        | 'suppressWarnings'
        | 'requireDocTerminator'
        | 'treatEmptyValueAsNull'
        | 'onDuplicateKey'
    >
> = {
    strictMode: false,
    failLevel: 'auto',
    includeMetaData: false,
    includeDiagnostics: false,
    includeTiming: false,
    preserveUndefinedInMeta: false,
    suppressWarnings: false,
    requireDocTerminator: 'optional',
    treatEmptyValueAsNull: 'allow-with-warning',
    onDuplicateKey: 'keep-first',
}
*/

type NormalizedOpts = Required<
    Pick<
        IAllUserOptions,
        | 'strictMode'
        | 'failLevel'
        | 'includeMetaData'
        | 'includeDiagnostics'
        | 'includeTiming'
        | 'preserveUndefinedInMeta'
        | 'suppressWarnings'
        | 'requireDocTerminator'
        | 'treatEmptyValueAsNull'
        | 'onDuplicateKey'
    >
>

// base (mode-agnostic) defaults
const BASE_DEFAULTS: NormalizedOpts = {
    strictMode: false,
    failLevel: 'auto',
    includeMetaData: false,
    includeDiagnostics: false,
    includeTiming: false,
    preserveUndefinedInMeta: false,
    suppressWarnings: false, // Suppress warnings in console (does not effect warnings in meta data).
    requireDocTerminator: 'optional',
    treatEmptyValueAsNull: 'allow-with-warning',
    onDuplicateKey: 'error',
}

const DEFAULT_LENIENT_OPTS: NormalizedOpts = {
    ...BASE_DEFAULTS,
    strictMode: false,
    failLevel: 'ignore-errors',
    suppressWarnings: true, // Suppress warnings in console (does not effect warnings in meta data).
    requireDocTerminator: 'optional',
    treatEmptyValueAsNull: 'allow-with-warning',
    onDuplicateKey: 'warn-and-keep-first',
}

const DEFAULT_STRICT_OPTS: NormalizedOpts = {
    ...BASE_DEFAULTS,
    strictMode: true,
    failLevel: 'on-errors',
    suppressWarnings: false, // Suppress warnings in console (does not effect warnings in meta data).
    requireDocTerminator: 'optional',
    treatEmptyValueAsNull: 'disallow',
    onDuplicateKey: 'error',
}

export const getDefaultOptions = (mode: TParserMode) =>
    mode === 'strict' ? DEFAULT_STRICT_OPTS : DEFAULT_LENIENT_OPTS

/**
 * This class is the public API, which exposes only parse(..) and
 * parseFile(..), rest of the implementation details are hidden.
 * @note Only parse and parseFile are public.
 */
export default class YINI {
    private static g_tabSize = DEFAULT_TAB_SIZE // Global tab size used in error messages.

    /**
     * @returns The number of spaces per tab character used in error messages.
     */
    public static getTabSize() {
        return this.g_tabSize
    }

    /**
     * Overrides the number of spaces per tab character used in error messages.
     * Allowed range: 1-32.
     */
    public static setTabSize(spaces: number) {
        if (spaces < 1 || spaces > 32) {
            new ErrorDataHandler('None/Ignore').pushOrBail(
                null,
                'Fatal-Error',
                `Invalid tab size ${spaces} is out of range.`,
                'Tab size must be between 1 and 32 spaces.',
            )
        }
        this.g_tabSize = spaces
    }

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
        failLevel: TPreferredFailLevel = 'auto',
        includeMetaData = false,
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
        const mode: TParserMode =
            ((arg2 as any).strictMode ?? (arg2 as boolean | undefined)) === true
                ? 'strict'
                : 'lenient'

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
                ...getDefaultOptions(mode), // Sets the default options.
                strictMode:
                    arg2.strictMode ?? getDefaultOptions(mode).strictMode,
                failLevel: arg2.failLevel ?? getDefaultOptions(mode).failLevel,
                includeMetaData:
                    arg2.includeMetaData ??
                    getDefaultOptions(mode).includeMetaData,
                includeDiagnostics:
                    arg2.includeDiagnostics ??
                    getDefaultOptions(mode).includeDiagnostics,
                includeTiming:
                    arg2.includeTiming ?? getDefaultOptions(mode).includeTiming,
                preserveUndefinedInMeta:
                    arg2.preserveUndefinedInMeta ??
                    getDefaultOptions(mode).preserveUndefinedInMeta,
                suppressWarnings:
                    arg2.suppressWarnings ??
                    getDefaultOptions(mode).suppressWarnings,
                requireDocTerminator:
                    arg2.requireDocTerminator ??
                    getDefaultOptions(mode).requireDocTerminator,
                treatEmptyValueAsNull:
                    arg2.treatEmptyValueAsNull ??
                    getDefaultOptions(mode).treatEmptyValueAsNull,
                onDuplicateKey:
                    arg2.onDuplicateKey ??
                    getDefaultOptions(mode).onDuplicateKey,
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
                ...getDefaultOptions(mode), // Sets the default options.
                strictMode:
                    (arg2 as boolean | undefined) ??
                    getDefaultOptions(mode).strictMode,
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

        // let level: TPersistThreshold = '0-Ignore-Errors'
        let level: TBailSensitivityLevel = 0
        /*
        if (userOpts.failLevel === 'auto') {
            if (!userOpts.strictMode) level = '0-Ignore-Errors'
            if (userOpts.strictMode) level = '1-Abort-on-Errors'
        } else {
            // level = userOpts.failLevel
            switch (userOpts.failLevel) {
                case 'ignore-errors':
                    level = '0-Ignore-Errors'
                    break
                case 'errors':
                    level = '1-Abort-on-Errors'
                    break
                case 'warnings-and-errors':
                    level = '2-Abort-Even-on-Warnings'
                    break
            }
        }
        */
        if (userOpts.failLevel === 'auto') {
            if (!userOpts.strictMode) level = 0
            if (userOpts.strictMode) level = 1
        } else {
            // level = userOpts.failLevel
            switch (userOpts.failLevel) {
                case 'ignore-errors':
                    level = 0
                    break
                case 'on-errors':
                    level = 1
                    break
                case 'on-warnings-and-errors':
                    level = 2
                    break
            }
        }

        const coreOpts: IParseCoreOptions = {
            isStrict: userOpts.strictMode,
            bailSensitivity: level,
            isIncludeMeta: userOpts.includeMetaData,
            isWithDiagnostics:
                isDev() || isDebug() || userOpts.includeDiagnostics,
            isWithTiming: isDev() || isDebug() || userOpts.includeTiming,
            isKeepUndefinedInMeta:
                isDebug() || userOpts.preserveUndefinedInMeta,
            isAvoidWarningsInConsole: userOpts.suppressWarnings,
            requireDocTerminator: userOpts.requireDocTerminator,
            treatEmptyValueAsNull: userOpts.treatEmptyValueAsNull,
            onDuplicateKey: userOpts.onDuplicateKey,
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
        failLevel: TPreferredFailLevel = 'auto',
        includeMetaData = false,
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
        const mode: TParserMode =
            ((arg2 as any).strictMode ?? (arg2 as boolean | undefined)) === true
                ? 'strict'
                : 'lenient'

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
                ...getDefaultOptions(mode), // Sets the default options.
                strictMode:
                    arg2.strictMode ?? getDefaultOptions(mode).strictMode,
                failLevel: arg2.failLevel ?? getDefaultOptions(mode).failLevel,
                includeMetaData:
                    arg2.includeMetaData ??
                    getDefaultOptions(mode).includeMetaData,
                includeDiagnostics:
                    arg2.includeDiagnostics ??
                    getDefaultOptions(mode).includeDiagnostics,
                includeTiming:
                    arg2.includeTiming ?? getDefaultOptions(mode).includeTiming,
                preserveUndefinedInMeta:
                    arg2.preserveUndefinedInMeta ??
                    getDefaultOptions(mode).preserveUndefinedInMeta,
                suppressWarnings:
                    arg2.suppressWarnings ??
                    getDefaultOptions(mode).suppressWarnings,
                requireDocTerminator:
                    arg2.requireDocTerminator ??
                    getDefaultOptions(mode).requireDocTerminator,
                treatEmptyValueAsNull:
                    arg2.treatEmptyValueAsNull ??
                    getDefaultOptions(mode).treatEmptyValueAsNull,
                onDuplicateKey:
                    arg2.onDuplicateKey ??
                    getDefaultOptions(mode).onDuplicateKey,
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
                ...getDefaultOptions(mode), // Sets the default options.
                strictMode:
                    (arg2 as boolean | undefined) ??
                    getDefaultOptions(mode).strictMode,
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

        // IMPORTANT: (!) Do not forget to add new options here!
        const result = this.parse(content, {
            strictMode: userOpts.strictMode,
            failLevel: userOpts.failLevel,
            includeMetaData: userOpts.includeMetaData,
            includeDiagnostics: userOpts.includeDiagnostics,
            includeTiming: userOpts.includeTiming,
            preserveUndefinedInMeta: userOpts.preserveUndefinedInMeta,
            requireDocTerminator: userOpts.requireDocTerminator,
        })
        if (hasNoNewlineAtEOF) {
            console.warn(
                `No newline at end of file, it's recommended to end a file with a newline. File:\n"${filePath}"`,
            )
        }

        return result
    }
}
