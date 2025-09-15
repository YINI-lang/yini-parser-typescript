// File: src/types/index.ts

/**
 *
 * Public (user-facing) types (shapes) here only.
 *
 * @note Internal-only types (shapes) should go into core/internalTypes.ts.
 * @note These types and interface (shapes) should NOT include the 'T' and,
 *       'I' prefixes, due to these are public user-facing.
 */

import { TBailSensitivityLevel } from '../core/internalTypes'

// --- Public (user-facing) Types ----------------------------------------------------------------

/**
 * JavaScript object produced by parsing a YINI document.
 */
// @note Currently typed as `any` for maximum flexibility.
// NOTE: This cannot be safely narrowed to `unknown` or `Record<string, unknown>`
// without breaking linting and downstream usage.
export type ParsedObject = any
// NOTE: Currently 'any' to preserve flexibility of parse result.
// export type TJSObject = any // NOTE: Currently must be any! Not unknown or Record<string, unknown> or anything else, since linting etc will render this as error/unknow.

/**
 * Result returned from `parse(..)` and `parseFile(..)`,
 * containing both the parsed object and associated metadata.
 */
export interface YiniParseResult {
    // result: TJSObject
    result: ParsedObject
    meta: ResultMetadata
}

// Keys as reported in metadata (human-readable).
export type FailLevelKey =
    | 'ignore-errors' // 0 - Continue despite errors, persist and try to recover.
    | 'errors' // 1 - Stop parsing on the first error.
    | 'warnings-and-errors' // 2 - Stop parsing on the first warning or error.

export type PreferredFailLevel = 'auto' | FailLevelKey

export type OnDuplicateKey =
    | 'warn-and-keep-first' // Keep first with a warning.
    | 'warn-and-overwrite' // 'warn-and-overwrite' = 'warn-and-keep-last'
    | 'keep-first' // Silent, first wins.
    | 'overwrite' // Silent, last wins.
    | 'error'

/** Version tag for the public metadata schema. */
export type MetaSchemaVersion = '1.1.0'

/** Source of the order guarantee. */
export type OrderGuarantee =
    | 'spec'
    | 'language'
    | 'implementation-defined'
    | 'none'

// --- Public (user-facing) Interfaces -----------------------------------------------------------

/**
 * User-facing options, these are external and should be more user friendly,
 * and shorter, parameter names than the (more descriptive) internal
 * engine option names.
 *
 * @note These parameters are emphasizes a bit more than the other options,
 *       therefor these are kept a bit shorter for usability-purposes.
 * @note These are the same as in the "simple positional API" function in
 *       the YINI class.
 */
// NOTE: (!) All props MUST be optional.
export interface BasicOptions {
    /** Enable stricter syntax and well-formedness checks. */
    strictMode?: boolean
    /**
     * Minimum severity that should cause parse to fail.
     * 'auto' | 'ignore-errors' | 'errors' | 'warnings-and-errors'
     */
    failLevel?: PreferredFailLevel // 'auto' | 0-'ignore-errors' | 1-'errors' | 2-'warnings-and-errors'
    /** Attach metadata to the parse result (timings, diagnostics, etc.). */
    includeMetadata?: boolean // Include meta data along the returned result.
}

/**
 * @param failLevel - Minimum severity that should cause the parse to fail.
 *   Accepts:
 *     `'ignore-errors'` - Continue despite errors, persist and try to recover.
 *     `'errors'` - Stop parsing on the first error.
 *     `'warnings-and-errors'` - Stop parsing on the first warning or error.
 *   (Type: TPreferredFailLevel; exact behavior is implementation-defined.)
 * @param includeDiagnostics - Include diagnostics in the returned metadata.
 *   Requires: `includeMetadata = true`. Ignored otherwise.
 * @param includeMetadata - Attach a metadata object to the parse result
 *   (e.g., timings, diagnostics).
 * @param includeTiming - Include timing information for parser phases in metadata.
 *   Requires: `includeMetadata = true`. Ignored otherwise.
 * @param onDuplicateKey - Strategy/handler when encountering a duplicate key.
 *   Allowed values: `'warn-and-keep-first'` | `'warn-and-overwrite'` | `'keep-first'` (silent, first wins) | `'overwrite'` (silent, last wins) | `'error'`.
 * @param preserveUndefinedInMeta - Keep properties with value `undefined` inside
 *   the returned metadata. Requires: `includeMetadata = true`. Ignored otherwise.
 * @param requireDocTerminator - Controls whether a document terminator is required.
 *   Allowed values: `'optional'` | `'warn-if-missing'` | `'required'`.
 * @param strictMode - Enable stricter syntax and well-formedness checks according
 *   to the spec (exact rules are implementation-defined).
 * @param suppressWarnings - Suppress warnings sent to the console/log.
 *   Does not affect warnings included in returned metadata.
 * @param treatEmptyValueAsNull - How to treat an explicitly empty value on the
 *   right-hand side of '='. Allowed values: `'allow'` | `'allow-with-warning'` | `'disallow'`.
 */
// User-facing options, these are external and should be more user friendly
// parameter names.
// NOTE: (!) All props MUST be optional.
export interface ParseOptions extends BasicOptions {
    includeDiagnostics?: boolean // (Requires includeMetadata) Include diagnostics in meta data, when isIncludeMeta.
    includeTiming?: boolean // (Requires includeMetadata) Include timing data of the different phases in meta data, when isIncludeMeta.
    preserveUndefinedInMeta?: boolean // (Requires includeMetadata) If true, keeps properties with undefined values in the returned meta data, when isIncludeMeta.
    suppressWarnings?: boolean // Suppress warnings in console (does not effect warnings in meta data).
    //hideWarnings?: boolean // Hide all warnings in console including in meta data.
    requireDocTerminator?: 'optional' | 'warn-if-missing' | 'required'
    treatEmptyValueAsNull?: 'allow' | 'allow-with-warning' | 'disallow'
    onDuplicateKey?: OnDuplicateKey
    quiet?: boolean // Reduce output (show only errors).
    silent?: boolean // Suppress all output (even errors, exit code only).
}

//{ line: 12, column: 8, type: 'Syntax-Error', message1: 'Invalid number' }
export interface IssuePayload {
    /** 1-based; use undefined when not applicable. */
    line: number | undefined // NOTE: 1-based, so line 0 does not exist, set to undefined instead.
    /** 1-based; use undefined when not applicable. */
    column: number | undefined // NOTE: 1-based, so column 0 does not exist, set to undefined instead.
    /** Lowercase key for easy tooling. */
    typeKey: string // Transformed from the corresponding type, keep it lowercase since it's shown in meta, easier for tooling.
    message: string
    advice: string | undefined
    hint: string | undefined
}

// --- Result Meta Interface (Public / User-facing)-------------------------

/**
 * @note NOTE: USE NO TYPES here (or neither in nested structures), they
 *       should only be strings (and content MUST be transformed from the
 *       types to lower snake case)
 *
 *       *** DUE TO make easier for tooling ***
 *
 * @note UPDATE 'metaSchemaVersion' on any edits to the meta structure.
 */
export interface ResultMetadata {
    parserVersion: string
    mode: 'lenient' | 'strict' | 'custom'
    totalErrors: number
    totalWarnings: number
    totalMessages: number
    runStartedAt: string
    runFinishedAt: string
    durationMs: number
    preservesOrder: boolean // Member/section order: platform-, implementation-, and language-specific. Not mandated by the YINI spec.
    orderGuarantee: OrderGuarantee // De facto yes, in this specific implementation.
    orderNotes?: string
    source: {
        sourceType: string // Transformed from the type, keep it lowercase since it's shown in resulted meta, easier for tooling.
        fileName: undefined | string // Path and file name if from file.
        hasDocumentTerminator: boolean
        hasYiniMarker: boolean
        byteSize: null | number
        lineCount: null | number // Number of lines of content or in the yini file (before possible tampering).
        sha256: null | string // SHA-256 hash of the original source content or file (before possible tampering).
    }
    structure: {
        maxDepth: null | number
        sectionCount: null | number // Section (header) count, section '(root)' NOT included.
        memberCount: null | number // Section (member) count.
        keysParsedCount: null | number // Including keys inside inline objects, and in section members.
        // objectCount: null | number // (?) Incl. sections (objects) + inline objects.
        // listCount: null | number
        sectionNamePaths: string[] | null // All key/access paths to section Headers.
    }
    metaSchemaVersion: MetaSchemaVersion
    diagnostics?: {
        failLevel: {
            preferredLevel: null | PreferredFailLevel // Input level into function.
            usedLevelType: TBailSensitivityLevel
            usedLevelKey: FailLevelKey // Mapped from the corresponding type, keep it lowercase since it's shown in meta, easier for tooling.
            levelDescription: string | null
        }
        errors: { errorCount: number; payload: IssuePayload[] }
        warnings: { warningCount: number; payload: IssuePayload[] }
        notices: { noticeCount: number; payload: IssuePayload[] }
        infos: { infoCount: number; payload: IssuePayload[] }
        environment: {
            NODE_ENV: undefined | string
            APP_ENV: undefined | string
            lib: {
                nodeEnv: undefined | string
                appEnv: undefined | string
                flags: { isDev: boolean; isDebug: boolean }
            }
        }
        effectiveOptions: ParseOptions
        options: ParseOptions
    }
    timing?: {
        total: null | { timeMs: number; name: string }
        phase0: undefined | { timeMs: number; name: string } // NOTE: When source is 'inline' phase0 is set to undefined as phase0 times I/O.
        phase1: null | { timeMs: number; name: string }
        phase2: null | { timeMs: number; name: string }
        phase3: null | { timeMs: number; name: string }
        phase4: null | { timeMs: number; name: string }
    }
}
