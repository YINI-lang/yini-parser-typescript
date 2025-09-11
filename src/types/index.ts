/**
 * src/types/index.ts
 *
 * Public (user-facing) here only.
 * @note Internal types should go into core/internalTypes.ts.
 */

import { IPrimaryUserParams, TFailLevelKey } from '../core/internalTypes'

// --- Public (user-facing) Types ----------------------------------------------------------------

export type TJSObject = any // NOTE: Currently must be any! Not unknown or Record<string, unknown> or anything else, since linting etc will render this as error/unknow.

export type TOnDuplicateKey =
    | 'warn-and-keep-first' // Keep last with a warning.
    | 'warn-and-overwrite' // 'warn-and-overwrite' = 'warn-and-keep-last'
    | 'keep-first' // Silent, first wins.
    | 'overwrite' // Silent, last wins.
    | 'error'

export type TPreferredFailLevel = 'auto' | TFailLevelKey
// | 'ignore-errors'
// | 'errors'
// | 'warnings-and-errors'

// --- Public (user-facing) Interfaces -----------------------------------------------------------

/**
 * @param failLevel - Minimum severity that should cause the parse to fail.
 *   Accepts:
 *     `'ignore-errors'` - Don't bail/fail on error, persist and try to recover.
 *     `'errors'` - Stop parsing on the first error.
 *     `'warnings-and-errors'` - Stop parsing on the first warning or error.
 *   (Type: TPreferredFailLevel; exact behavior is implementation-defined.)
 * @param includeDiagnostics - Include diagnostics in the returned metadata.
 *   Requires: `includeMetaData = true`. Ignored otherwise.
 * @param includeMetaData - Attach a metadata object to the parse result
 *   (e.g., timings, diagnostics).
 * @param includeTiming - Include timing information for parser phases in metadata.
 *   Requires: `includeMetaData = true`. Ignored otherwise.
 * @param onDuplicateKey - Strategy/handler when encountering a duplicate key.
 *   Allowed values: `'warn-and-keep-first'` | `'warn-and-overwrite'` | `'keep-first'` (silent, first wins) | `'overwrite'` (silent, last wins) | `'error'`.
 * @param preserveUndefinedInMeta - Keep properties with value `undefined` inside
 *   the returned metadata. Requires: `includeMetaData = true`. Ignored otherwise.
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
export interface IAllUserOptions extends IPrimaryUserParams {
    includeDiagnostics?: boolean // (Requires includeMetaData) Include diagnostics in meta data, when isIncludeMeta.
    includeTiming?: boolean // (Requires includeMetaData) Include timing data of the different phases in meta data, when isIncludeMeta.
    preserveUndefinedInMeta?: boolean // (Requires includeMetaData) If true, keeps properties with undefined values in the returned meta data, when isIncludeMeta.
    suppressWarnings?: boolean // Suppress warnings in console (does not effect warnings in meta data).
    //hideWarnings?: boolean // Hide all warnings in console including in meta data.
    // rules?: {
    requireDocTerminator?: 'optional' | 'warn-if-missing' | 'required'
    treatEmptyValueAsNull?: 'allow' | 'allow-with-warning' | 'disallow'
    onDuplicateKey?: TOnDuplicateKey
    // }
}
