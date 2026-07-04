import { isDebug, isDev } from './config/env'
import { ErrorDataHandler } from './core/errorDataHandler'
import { isOptionsObjectForm } from './core/options/optionsFunctions'
import { YiniRuntime } from './core/runtime'
import {
    IssuePayload,
    ParsedObject,
    ParseForToolingOptions,
    ParseOptions,
    PreferredFailLevel,
    ToolingDiagnostic,
    ToolingDiagnosticSeverity,
    YiniParseResult,
    YiniToolingParseResult,
} from './types'
import { debugPrint, devPrint, printObject } from './utils/print'

const DEFAULT_TAB_SIZE = 4 // De facto "modern default" (even though traditionally/historically it's 8).

/**
 * This class is the main public API. It exposes `parse(..)` and `parseFile(..)`
 * as the primary entry points, while the implementation details remain internal.
 * @note The public parsing API is exposed through `parse(..)` and `parseFile(..)`.
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
                undefined,
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
     * @param failLevel          Preferred bail sensitivity level, controls if and when parsing should stop on problems:
     *   - `'auto'` (default)      : Auto‑select level (strict → `'errors'`, lenient → `'ignore-errors'`)
     *   - `'ignore-errors'`       : Continue parsing despite errors; log them and attempt recovery.
     *   - `'errors'`              : Stop parsing on the first error (fail-fast).
     *   - `'warnings-and-errors'` : Stop parsing on the first warning **or** error.
     * @param includeMetadata    If `true`, return additional metadata (e.g. warnings, statistics) alongside the parsed object.
     *
     * @returns {ParsedObject | YiniParseResult} The parsed YINI content.
     *
     * By default (`includeMetadata = false`), this method returns a plain JavaScript object:
     *
     * `
     * export type ParsedObject = any
     * `
     *
     * If `includeMetadata = true`, the return value is wrapped in a container that also
     * includes parsing metadata:
     *
     * `
     * export interface YiniParseResult {
     *   result: ParsedObject
     *   meta: ResultMetadata
     * }
     * `
     */
    // --- Method overload signature ---------------------------------------
    // (With no body + not declared with arrow function.)
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    // Easier and simpler positional form ((legacy/simple)).
    // IMPORTANT: All param names below, except the first, must match exactly as in the interface BasicOptions.
    public static parse(
        yiniContent: string,
        strictMode?: boolean,
        failLevel?: PreferredFailLevel,
        includeMetadata?: boolean,
    ): ParsedObject | YiniParseResult

    /**
     * Parse inline YINI content into a JavaScript object, using an options object for configuration.
     *
     * @param yiniContent      YINI code as a string (multi‑line content supported).
     * @param options Optional settings to customize parsing and/or results, useful if you need more control.
     *        For all options, see types/ParseOptions.
     *
     * @param options.failLevel - Preferred bail sensitivity level, controls if and when parsing should stop on problems:
     *   Accepts:
     *     `'ignore-errors'` - Continue despite errors, persist and try to recover.
     *     `'errors'` - Stop parsing on the first error (fail-fast).
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
     * @param options.logDiagnostics - Opt in to writing diagnostics to stderr.
     *   Library calls do not write diagnostics by default.
     * @param options.quiet - When `logDiagnostics = true`, show only errors.
     *   Does not affect diagnostics included in returned metadata.
     * @param options.requireDocTerminator - Controls whether a document terminator is required.
     *   Allowed values: `'optional'` | `'warn-if-missing'` | `'required'`.
     * @param options.silent - Suppress diagnostic output, even when `logDiagnostics = true`.
     * @param options.strictMode - Sets the baseline ruleset (true = strict, false = lenient).
     *   This is only a starting point: rule-specific options (e.g., `treatEmptyValueAsNull`,
     *   `onDuplicateKey`, etc.) can override parts of that ruleset. If any overrides are given,
     *   the effective mode becomes **custom** rather than purely strict/lenient.
     * @param options.treatEmptyValueAsNull - How to treat an explicitly empty value on the
     *   right-hand side of '='. Allowed values: `'allow'` | `'allow-with-warning'` | `'disallow'`.
     * @param options.throwOnError - Throw when a parse issue reaches the active bail threshold (for example, on errors if `failLevel = 'errors'`).
     *
     * @returns {ParsedObject | YiniParseResult} The parsed YINI content.
     *
     * By default (`includeMetadata = false`), this method returns a plain JavaScript object:
     *
     * `
     * export type ParsedObject = any
     * `
     *
     * If `includeMetadata = true`, the return value is wrapped in a container that also
     * includes parsing metadata:
     *
     * `
     * export interface YiniParseResult {
     *   result: ParsedObject
     *   meta: ResultMetadata
     * }
     * `
     */
    // --- Method overload signature ---------------------------------------
    // (With no body + not declared with arrow function.)
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    // Options-object form (recommended) for power/expert users (more future-proof).
    public static parse(
        yiniContent: string,
        options?: ParseOptions,
    ): ParsedObject | YiniParseResult

    // --- Single implementation --------------------------------------------
    // Implementation method (not declared with arrow function) for both method overload signatures.
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    public static parse(
        yiniContent: string,
        arg2?: boolean | ParseOptions, // strictMode | options
        failLevel: PreferredFailLevel = 'auto',
        includeMetadata = false,
    ): ParsedObject | YiniParseResult {
        debugPrint('-> Entered static parse(..) in class YINI\n')

        debugPrint()
        debugPrint(
            '==== Call runParse(..) in runtime ==========================',
        )
        const runtime = new YiniRuntime('Inline')

        const result = isOptionsObjectForm(arg2)
            ? runtime.runParse(yiniContent, arg2) // Overload #2: (content, options)
            : runtime.runParse(
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
     * Parse inline YINI content for tools, editors, linters, and test runners.
     *
     * This API always returns a stable result object and structured diagnostics.
     * It does not write diagnostics to stdout/stderr and does not throw for
     * normal parse errors.
     */
    public static parseForTooling(
        yiniContent: string,
        options: ParseForToolingOptions = {},
    ): YiniToolingParseResult {
        try {
            const parsed = this.parse(yiniContent, {
                ...options,
                failLevel: 'ignore-errors',
                includeMetadata: true,
                includeDiagnostics: true,
                logDiagnostics: false,
                silent: true,
                throwOnError: false,
            }) as YiniParseResult

            return {
                ok: parsed.meta.totalErrors === 0,
                result: parsed.result,
                diagnostics: this.toToolingDiagnostics(parsed),
            }
        } catch (error: unknown) {
            return {
                ok: false,
                result: {},
                diagnostics: [
                    {
                        severity: 'error',
                        code: 'parser-error',
                        message:
                            error instanceof Error
                                ? error.message
                                : String(error),
                    },
                ],
            }
        }
    }

    private static toToolingDiagnostics(
        parsed: YiniParseResult,
    ): ToolingDiagnostic[] {
        const diagnostics = parsed.meta.diagnostics

        if (!diagnostics) {
            return []
        }

        return [
            ...diagnostics.errors.payload.map((issue) =>
                this.toToolingDiagnostic(issue, 'error'),
            ),
            ...diagnostics.warnings.payload.map((issue) =>
                this.toToolingDiagnostic(issue, 'warning'),
            ),
            ...diagnostics.notices.payload.map((issue) =>
                this.toToolingDiagnostic(issue, 'notice'),
            ),
            ...diagnostics.infos.payload.map((issue) =>
                this.toToolingDiagnostic(issue, 'info'),
            ),
        ]
    }

    private static toToolingDiagnostic(
        issue: IssuePayload,
        severity: ToolingDiagnosticSeverity,
    ): ToolingDiagnostic {
        const diagnostic: ToolingDiagnostic = {
            severity,
            code: this.toDiagnosticCode(issue),
            message: issue.message,
        }

        if (issue.line !== undefined) {
            diagnostic.line = issue.line
        }

        if (issue.column !== undefined) {
            diagnostic.column = issue.column
        }

        return diagnostic
    }

    private static toDiagnosticCode(issue: IssuePayload): string {
        const text = [issue.message, issue.advice, issue.hint]
            .filter((part): part is string => Boolean(part))
            .join(' ')
            .toLowerCase()

        if (text.includes('empty yini document')) {
            return 'empty-document'
        }

        if (text.includes('bom') && text.includes('utf-8')) {
            return 'utf8-bom'
        }

        if (text.includes('duplicate key')) {
            return 'duplicate-key'
        }

        if (text.includes('duplicate section')) {
            return 'duplicate-section'
        }

        if (
            text.includes('yini mode declaration') &&
            text.includes('active parser mode')
        ) {
            return 'YINI_MODE_MISMATCH'
        }

        if (text.includes('directive') && text.includes('wrong place')) {
            return 'misplaced-directive'
        }

        if (text.includes('invalid escape sequence')) {
            return 'invalid-escape-sequence'
        }

        if (text.includes('unterminated') && text.includes('string')) {
            return 'unterminated-string'
        }

        if (text.includes('/end') && text.includes('missing')) {
            return 'missing-document-terminator'
        }

        if (text.includes('shebang')) {
            return 'misplaced-shebang'
        }

        if (text.includes('trailing comma')) {
            return 'trailing-comma'
        }

        return issue.typeKey.replace(/_/g, '-')
    }

    /**
     * Parse a YINI file into a JavaScript object.
     *
     * @param filePath           Path to the YINI file.
     * @param strictMode         If `true`, enforce strict parsing rules (e.g. require `/END`, disallow trailing commas).
     * @param failLevel          Preferred bail sensitivity level, controls if and when parsing should stop on problems:
     *   - `'auto'` (default)      : Auto‑select level (strict → `'errors'`, lenient → `'ignore-errors'`)
     *   - `'ignore-errors'`       : Continue parsing despite errors; log them and attempt recovery.
     *   - `'errors'`              : Stop parsing on the first error (fail-fast).
     *   - `'warnings-and-errors'` : Stop parsing on the first warning **or** error.
     * @param includeMetadata    If `true`, return additional metadata (e.g. warnings, statistics) alongside the parsed object.
     *
     * @returns {ParsedObject | YiniParseResult} The parsed YINI content.
     *
     * By default (`includeMetadata = false`), this method returns a plain JavaScript object:
     *
     * `
     * export type ParsedObject = any
     * `
     *
     * If `includeMetadata = true`, the return value is wrapped in a container that also
     * includes parsing metadata:
     *
     * `
     * export interface YiniParseResult {
     *   result: ParsedObject
     *   meta: ResultMetadata
     * }
     * `
     */
    // --- Method overload signature ---------------------------------------
    // (With no body + not declared with arrow function.)
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    // Easy and simple positional API (great for most users).
    // IMPORTANT: All param names below, except the first, must match exactly as in the interface BasicOptions.
    public static parseFile(
        filePath: string,
        strictMode?: boolean,
        failLevel?: PreferredFailLevel,
        includeMetadata?: boolean,
    ): ParsedObject | YiniParseResult

    /**
     * Parse a YINI file into a JavaScript object, using an options object for configuration.
     *
     * @param filePath Path to the YINI file.
     * @param options Optional settings to customize parsing and/or results, useful if you need more control.
     *        For all options, see types/ParseOptions.
     *
     * @param options.failLevel - Preferred bail sensitivity level, controls if and when parsing should stop on problems:
     *   Accepts:
     *     `'ignore-errors'` - Continue despite errors, persist and try to recover.
     *     `'errors'` - Stop parsing on the first error (fail-fast).
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
     * @param options.logDiagnostics - Opt in to writing diagnostics to stderr.
     *   Library calls do not write diagnostics by default.
     * @param options.quiet - When `logDiagnostics = true`, show only errors.
     *   Does not affect diagnostics included in returned metadata.
     * @param options.requireDocTerminator - Controls whether a document terminator is required.
     *   Allowed values: `'optional'` | `'warn-if-missing'` | `'required'`.
     * @param options.silent - Suppress diagnostic output, even when `logDiagnostics = true`.
     * @param options.strictMode - Sets the baseline ruleset (true = strict, false = lenient).
     *   This is only a starting point: rule-specific options (e.g., `treatEmptyValueAsNull`,
     *   `onDuplicateKey`, etc.) can override parts of that ruleset. If any overrides are given,
     *   the effective mode becomes **custom** rather than purely strict/lenient.
     * @param options.treatEmptyValueAsNull - How to treat an explicitly empty value on the
     *   right-hand side of '='. Allowed values: `'allow'` | `'allow-with-warning'` | `'disallow'`.
     * @param options.throwOnError - Throw when a parse issue reaches the active bail threshold (for example, on errors if `failLevel = 'errors'`).
     *
     * @returns {ParsedObject | YiniParseResult} The parsed YINI content.
     *
     * By default (`includeMetadata = false`), this method returns a plain JavaScript object:
     *
     * `
     * export type ParsedObject = any
     * `
     *
     * If `includeMetadata = true`, the return value is wrapped in a container that also
     * includes parsing metadata:
     *
     * `
     * export interface YiniParseResult {
     *   result: ParsedObject
     *   meta: ResultMetadata
     * }
     * `
     */
    // --- Method overload signature ---------------------------------------
    // (With no body + not declared with arrow function.)
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    // Options-object form (recommended) for power/expert users (more future-proof).
    public static parseFile(
        filePath: string,
        options?: ParseOptions,
    ): ParsedObject | YiniParseResult

    // --- Single implementation --------------------------------------------
    // Implementation method (not declared with arrow function) for both method overload signatures.
    // NOTE: Must be method declaration with NO =, arrow functions not (currently) supported for this type of method overloading.
    public static parseFile(
        filePath: string,
        arg2?: boolean | ParseOptions, // strictMode | options
        failLevel: PreferredFailLevel = 'auto',
        includeMetadata = false,
    ): ParsedObject | YiniParseResult {
        debugPrint('-> Entered static parseFile(..) in class YINI\n')
        debugPrint('Current directory = ' + process.cwd())

        debugPrint()
        debugPrint(
            '==== Call doParseFile(..) in runtime ==========================',
        )
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
