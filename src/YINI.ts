import { isDebug, isDev } from './config/env'
import { ErrorDataHandler } from './core/errorDataHandler'
import { isOptionsObjectForm } from './core/options/normalizeOptions'
import { YiniRuntime } from './core/runtime'
import { IAllUserOptions, TJSObject, TPreferredFailLevel } from './types'
import { debugPrint, devPrint, printObject } from './utils/print'

const DEFAULT_TAB_SIZE = 4 // De facto "modern default" (even though traditionally/historically it's 8).

// let _runtimeInfo: IRuntimeInfo = {
//     sourceType: 'Inline',
//     fileName: undefined,
//     fileByteSize: null,
//     lineCount: null,
//     timeIoMs: null,
//     preferredBailSensitivity: null,
//     sha256: null,
// }

/**
 * This class is the public API, which exposes only parse(..) and
 * parseFile(..), rest of the implementation details are hidden.
 * @note Only parse and parseFile are public.
 */
export default class YINI {
    // @todo In future move/change this to not be a global and suffer from possible race conditions, possibly move this into YiniRuntime class.
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
            throw new RangeError(`Tab size ${spaces} is out of range (1–32).`)
        }
        this.g_tabSize = spaces
    }

    /**
     * Parse inline YINI content into a JavaScript object.
     *
     * @param yiniContent        YINI code as a string (multi‑line content supported).
     * @param strictMode         If `true`, enforce strict parsing rules (e.g. require `/END`, disallow trailing commas).
     * @param failLevel          Preferred bail sensitivity level, controls how errors and warnings are handled:
     *   - `'auto'` (default)      : Auto‑select level (strict → `'errors'`, lenient → `'ignore-errors'`)
     *   - `'ignore-errors'`       : Continue parsing despite errors; log them and attempt recovery.
     *   - `'errors'`              : Stop parsing on the first error.
     *   - `'warnings-and-errors'` : Stop parsing on the first warning **or** error.
     * @param includeMetadata    If `true`, return additional metadata (e.g. warnings, statistics) alongside the parsed object.
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
        includeMetadata?: boolean,
    ): TJSObject

    /**
     * Parse inline YINI content into a JavaScript object, using an options object for configuration.
     *
     * @param yiniContent      YINI code as a string (multi‑line content supported).
     * @param options Optional settings to customize parsing and/or results, useful if you need more control.
     *        For all options, see types/IAllUserOptions.
     *
     * @param options.failLevel - Minimum severity that should cause the parse to fail.
     *   Accepts:
     *     `'ignore-errors'` - Don't bail/fail on error, persist and try to recover.
     *     `'errors'` - Stop parsing on the first error.
     *     `'warnings-and-errors'` - Stop parsing on the first warning or error.
     *   (Type: TPreferredFailLevel; exact behavior is implementation-defined.)
     * @param options.includeDiagnostics - Include diagnostics in the returned metadata.
     *   Requires: `includeMetadata = true`. Ignored otherwise.
     * @param options.includeMetadata - Attach a metadata object to the parse result
     *   (e.g., timings, diagnostics).
     * @param options.includeTiming - Include timing information for parser phases in metadata.
     *   Requires: `includeMetadata = true`. Ignored otherwise.
     * @param options.onDuplicateKey - Strategy/handler when encountering a duplicate key.
     *   Allowed values: `'warn-and-keep-first'` | `'warn-and-overwrite'` | `'keep-first'` (silent, first wins) | `'overwrite'` (silent, last wins) | `'error'`.
     * @param options.preserveUndefinedInMeta - Keep properties with value `undefined` inside
     *   the returned metadata. Requires: `includeMetadata = true`. Ignored otherwise.
     * @param options.requireDocTerminator - Controls whether a document terminator is required.
     *   Allowed values: `'optional'` | `'warn-if-missing'` | `'required'`.
     * @param options.strictMode - Enable stricter syntax and well-formedness checks according
     *   to the spec (exact rules are implementation-defined).
     * @param options.suppressWarnings - Suppress warnings sent to the console/log.
     *   Does not affect warnings included in returned metadata.
     * @param options.treatEmptyValueAsNull - How to treat an explicitly empty value on the
     *   right-hand side of '='. Allowed values: `'allow'` | `'allow-with-warning'` | `'disallow'`.
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
        includeMetadata = false,
    ): TJSObject {
        debugPrint('-> Entered static parse(..) in class YINI\n')

        // // Runtime guard to catch illegal/ambiguous calls coming from JS or any-cast code
        // if (
        //     isOptionsObjectForm(arg2) &&
        //     (failLevel !== 'auto' || includeMetadata !== false)
        // ) {
        //     throw new TypeError(
        //         'Invalid call: when providing an options object, do not also pass positional parameters.',
        //     )
        // }

        // const mode: TParserMode = inferModeFromArgs(arg2)
        // const defaultOptions = getDefaultOptions(mode)

        // // Normalize to a fully-required options object.
        // let userOpts: Required<IAllUserOptions>

        // // Required, makes all properties in T required, no undefined.
        // if (isOptionsObjectForm(arg2)) {
        //     userOpts = {
        //         ...defaultOptions, // Sets the default options.
        //         ...arg2,
        //     }
        // } else {
        //     // Positional form.
        //     userOpts = {
        //         ...defaultOptions, // Sets the default options.
        //         strictMode:
        //             (arg2 as boolean | undefined) ?? defaultOptions.strictMode,
        //         failLevel,
        //         includeMetadata,
        //     }
        // }

        // if (userOpts.includeMetadata && _runtimeInfo.sourceType === 'Inline') {
        //     const lineCount = yiniContent.split(/\r?\n/).length // Counts the lines.
        //     const sha256 = computeSha256(yiniContent) // NOTE: Compute BEFORE any possible tampering of content.

        //     _runtimeInfo.lineCount = lineCount
        //     _runtimeInfo.preferredBailSensitivity = userOpts.failLevel
        //     _runtimeInfo.sha256 = sha256
        // }

        // // NOTE: Important: Do not trim or mutate the yiniContent here, due
        // // to it will mess up the line numbers in error reporting.

        // if (!yiniContent) {
        //     throw new Error('Syntax-Error: Unexpected blank YINI input')
        // }
        // if (!yiniContent.endsWith('\n')) {
        //     yiniContent += '\n'
        // }

        // let level: TBailSensitivityLevel = mapFailLevelToBail(
        //     userOpts.strictMode,
        //     userOpts.failLevel,
        // )
        ////////////////

        // const coreOpts: IParseCoreOptions = toCoreOptions(level, userOpts)

        debugPrint()
        debugPrint(
            '==== Call doParse(..) in runtime ==========================',
        )
        // const result = _parseMain(yiniContent, coreOpts, _runtimeInfo)
        const runtime = new YiniRuntime('Inline')

        const result = isOptionsObjectForm(arg2)
            ? runtime.doParse(yiniContent, arg2) // Overload #2: (content, options)
            : runtime.doParse(
                  // Overload #1: (content, strict?, failLevel?, includeMeta?)
                  yiniContent,
                  arg2 as boolean | undefined,
                  failLevel,
                  includeMetadata,
              )
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
     * @param yiniFile           Path to the YINI file.
     * @param strictMode         If `true`, enforce strict parsing rules (e.g. require `/END`, disallow trailing commas).
     * @param failLevel          Preferred bail sensitivity level, controls how errors and warnings are handled:
     *   - `'auto'` (default)      : Auto‑select level (strict → `'errors'`, lenient → `'ignore-errors'`)
     *   - `'ignore-errors'`       : Continue parsing despite errors; log them and attempt recovery.
     *   - `'errors'`              : Stop parsing on the first error.
     *   - `'warnings-and-errors'` : Stop parsing on the first warning **or** error.
     * @param includeMetadata    If `true`, return additional metadata (e.g. warnings, statistics) alongside the parsed object.
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
        includeMetadata?: boolean,
    ): TJSObject

    /**
     * Parse a YINI file into a JavaScript object, using an options object for configuration.
     *
     * @param yiniFile Path to the YINI file.
     * @param options Optional settings to customize parsing and/or results, useful if you need more control.
     *
     * @param options.failLevel - Minimum severity that should cause the parse to fail.
     *   Accepts:
     *     `'ignore-errors'` - Don't bail/fail on error, persist and try to recover.
     *     `'errors'` - Stop parsing on the first error.
     *     `'warnings-and-errors'` - Stop parsing on the first warning or error.
     *   (Type: TPreferredFailLevel; exact behavior is implementation-defined.)
     * @param options.includeDiagnostics - Include diagnostics in the returned metadata.
     *   Requires: `includeMetadata = true`. Ignored otherwise.
     * @param options.includeMetadata - Attach a metadata object to the parse result
     *   (e.g., timings, diagnostics).
     * @param options.includeTiming - Include timing information for parser phases in metadata.
     *   Requires: `includeMetadata = true`. Ignored otherwise.
     * @param options.onDuplicateKey - Strategy/handler when encountering a duplicate key.
     *   Allowed values: `'warn-and-keep-first'` | `'warn-and-overwrite'` | `'keep-first'` (silent, first wins) | `'overwrite'` (silent, last wins) | `'error'`.
     * @param options.preserveUndefinedInMeta - Keep properties with value `undefined` inside
     *   the returned metadata. Requires: `includeMetadata = true`. Ignored otherwise.
     * @param options.requireDocTerminator - Controls whether a document terminator is required.
     *   Allowed values: `'optional'` | `'warn-if-missing'` | `'required'`.
     * @param options.strictMode - Enable stricter syntax and well-formedness checks according
     *   to the spec (exact rules are implementation-defined).
     * @param options.suppressWarnings - Suppress warnings sent to the console/log.
     *   Does not affect warnings included in returned metadata.
     * @param options.treatEmptyValueAsNull - How to treat an explicitly empty value on the
     *   right-hand side of '='. Allowed values: `'allow'` | `'allow-with-warning'` | `'disallow'`.
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
        includeMetadata = false,
    ): TJSObject {
        debugPrint('-> Entered static parseFile(..) in class YINI\n')
        debugPrint('Current directory = ' + process.cwd())

        // // Runtime guard to catch illegal/ambiguous calls coming from JS or any-cast code
        // if (
        //     isOptionsObjectForm(arg2) &&
        //     (failLevel !== 'auto' || includeMetadata !== false)
        // ) {
        //     throw new TypeError(
        //         'Invalid call: when providing an options object, do not also pass positional parameters.',
        //     )
        // }

        // const mode: TParserMode = inferModeFromArgs(arg2)
        // const defaultOptions = getDefaultOptions(mode)

        // // Normalize to a fully-required options object.
        // let userOpts: Required<IAllUserOptions>

        // // Required, makes all properties in T required, no undefined.
        // if (isOptionsObjectForm(arg2)) {
        //     // Options-object Form.
        //     userOpts = {
        //         ...defaultOptions, // Sets the default options.
        //         ...arg2,
        //     }
        // } else {
        //     // Positional form.
        //     userOpts = {
        //         ...defaultOptions, // Sets the default options.
        //         strictMode:
        //             (arg2 as boolean | undefined) ?? defaultOptions.strictMode,
        //         failLevel,
        //         includeMetadata,
        //     }
        // }

        // if (getFileNameExtension(filePath).toLowerCase() !== '.yini') {
        //     console.error('Invalid file extension for YINI file:')
        //     console.error(`"${filePath}"`)
        //     console.log(
        //         'File does not have a valid ".yini" extension (case-insensitive).',
        //     )
        //     throw new Error('Error: Unexpected file extension for YINI file')
        // }

        // // ---- Phase 0: I/O ----
        // const timeStartMs = performance.now()

        // // let content = fs.readFileSync(filePath, 'utf8')
        // const rawBuffer = fs.readFileSync(filePath) // Raw buffer for size.
        // const fileByteSize = rawBuffer.byteLength // Byte size in UTF-8.

        // let content = rawBuffer.toString('utf8')
        // const timeEndMs = performance.now()

        // _runtimeInfo.sourceType = 'File'
        // _runtimeInfo.fileName = filePath

        // if (userOpts.includeMetadata) {
        //     _runtimeInfo.lineCount = content.split(/\r?\n/).length // Counts the lines.
        //     _runtimeInfo.fileByteSize = fileByteSize
        //     _runtimeInfo.timeIoMs = +(timeEndMs - timeStartMs).toFixed(3)
        //     _runtimeInfo.preferredBailSensitivity = userOpts.failLevel
        //     _runtimeInfo.sha256 = computeSha256(content) // NOTE: Compute BEFORE any possible tampering of content.
        // }

        // let hasNoNewlineAtEOF = false
        // if (!content.endsWith('\n')) {
        //     content += '\n'
        //     hasNoNewlineAtEOF = true
        // }

        debugPrint()
        debugPrint(
            '==== Call doParseFile(..) in runtime ==========================',
        )
        // const result = _parseMain(yiniContent, coreOpts, _runtimeInfo)
        const runtime = new YiniRuntime('File')

        const result = isOptionsObjectForm(arg2)
            ? runtime.doParseFile(filePath, arg2) // Overload #2: (content, options)
            : runtime.doParseFile(
                  // Overload #1: (content, strict?, failLevel?, includeMeta?)
                  filePath,
                  arg2 as boolean | undefined,
                  failLevel,
                  includeMetadata,
              )

        debugPrint('==== End call parse ==========================\n')
        return result
    }
}
