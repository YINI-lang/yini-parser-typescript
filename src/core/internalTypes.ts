/**
 * Internal types ONLY, public (user-facing) type should go into src/types/index.ts.
 *
 * @note
 *   The use of null vs undefined
 *   ----------------------------
 *   The convention here (in this file) is:
 *   - undefined is used where a value is missing, or does not apply.
 *   - null is used where a value is missing or has not yet been computed.
 *
 * @note All names of **internal** types and interfaces (shapes) must be
 * prefixed with `T` or `I`.
 */

import { OnDuplicateKey, PreferredFailLevel } from '../types'

// --- Internal Types ----------------------------------------------------------------

export type TParserMode = 'lenient' | 'strict'

export type TSourceType = 'File' | 'Inline'
export type TSubjectType = 'None/Ignore' | TSourceType

// Internal Dev types.
export type TBailSensitivityLevel =
    | '0-Ignore-Errors' // 0 - Don't bail/fail on error, persist and try to recover.
    | '1-Abort-on-Errors' // 1 - Stop parsing on the first error.
    | '2-Abort-Even-on-Warnings' // 2 - Stop parsing on the first warning or error.

/**
 * Scalar literal, a single, indivisible piece of data:
 * string, number, boolean, and null.
 * @property {string | undefined} [tag]
 *           Its contents may change at any time and should not
 *           be relied upon for any significant purpose.
 * @note Undefined is included here despite that JSON cannot represent
 *       it (undefined), but JS objects can (it's sometimes useful in
 *       debugging etc), it will later get stripped if converted into JSON.
 */
export type TScalarValue =
    | { type: 'String'; value: string; tag: string | undefined }
    | { type: 'Number'; value: number; tag: string | undefined }
    | { type: 'Boolean'; value: boolean; tag: string | undefined }
    | { type: 'Null'; value: null; tag: string | undefined }
    | { type: 'Undefined'; value: undefined; tag: string | undefined } // NOTE: Although JSON cannot represent undefined, but JS objects can (and it's sometimes useful in debugging etc).

/** Any literal value in YINI: scalar, list, or object. */
export type TValueLiteral = TScalarValue | TListValue | TObjectValue

/**
 * @property {string | undefined} [tag]
 *           Debugging only. Its contents may change at any time and
 *           must not be relied upon for any functional purpose.
 */
export type TListValue = {
    type: 'List'
    elems: readonly TValueLiteral[]
    tag: string | undefined
}

/**
 * @property {string | undefined} [tag]
 *           Debugging only. Its contents may change at any time and
 *           must not be relied upon for any functional purpose.
 */
export type TObjectValue = {
    type: 'Object'
    entries: Readonly<Record<string, TValueLiteral>> // ORDER MATTERS!
    tag: string | undefined
}

// Human label types.
export type TSectionHeaderType =
    | undefined
    | 'Classic-Header-Marker' // Classic/repeating marker section headers (e.g. ^^ SectionName).
    | 'Numeric-Header-Marker' // Numeric shorthand section headers (e.g. ^7 SectionName).

// Human label types.
export type TIssueType =
    | 'Fatal-Error'
    | 'Internal-Error'
    | 'Syntax-Error'
    | 'Syntax-Warning'
    | 'Notice'
    | 'Info'

// export type TUserOptionToggle = 'off' | 'warn' | 'error'

// --- Internal Interfaces -----------------------------------------------------------

interface IMetaBaseInfo {
    sourceType: TSourceType
    fileName: string | undefined
}

/**
 * Internal runtime info / meta data.
 * @note Used for internal diagnostics, bookkeeping, state, etc.
 */
export interface IRuntimeInfo extends IMetaBaseInfo {
    lineCount: number | null
    fileByteSize: number | null // Only when source type is 'File'.
    timeIoMs: number | null // Only when source type is 'File'.
    preferredBailSensitivity: null | PreferredFailLevel
    sha256: string | null
}

// For use in internal functions.
/*
    // Maybe in the future, suggestions:
    // allowTrailingCommas
    // allowEmptySections
    // keyCaseSensitivity
    // sectionCaseSensitivity
    // normalizeNegativeZero
    // allowMultilineStrings
    // onDuplicateKey
    // allowUnknownMetaCommands
    // resolveIncludes
    // includeBaseDir
    // maxIncludeDepth
    // materializeObjectsAs
    // materializeListsAs
    // maxDepth
    // maxSectionMembers
    // maxIssues
    // timeoutMs
    // shortCircuitOnFirstError
    // warningPolicy
    // collectSectionNamePaths
    // collectMemberKeyPaths
*/
// Internal engine option names, most if not all SHOULD be prefixed with 'is' or 'has'.
export interface IParseCoreOptions {
    isStrict: boolean
    bailSensitivity: TBailSensitivityLevel // 0 | 1 | 2
    isIncludeMeta: boolean // Include meta data along the returned result.
    isWithDiagnostics: boolean // (Requires isIncludeMeta) Include diagnostics in meta data, when isIncludeMeta.
    isWithTiming: boolean // (Requires isIncludeMeta) Include timing data of the different phases in meta data, when isIncludeMeta.
    isKeepUndefinedInMeta: boolean // (Requires isIncludeMeta) If true, keeps properties with undefined values in the returned meta data, when isIncludeMeta.
    isAvoidWarningsInConsole: boolean // Suppress warnings in console (does not affect warnings in meta data).
    // rules?: {
    requireDocTerminator: 'optional' | 'warn-if-missing' | 'required'
    treatEmptyValueAsNull: 'allow' | 'allow-with-warning' | 'disallow'
    onDuplicateKey: OnDuplicateKey
    // }
}

//@todo
//interface IParseCoreRuleOptions {}

export interface IYiniAST extends IMetaBaseInfo {
    root: IYiniSection // Implicit root per spec.
    isStrict: boolean
    terminatorSeen: boolean // Required '/END' in strict mode.
    yiniMarkerSeen: boolean
    maxDepth: number | null
    numOfSections: number
    numOfMembers: number
    sectionNamePaths: string[] | null
}

export interface IYiniSection {
    sectionName: string
    level: number // 1..n
    members: Map<string, TValueLiteral> // Map used since ORDER MATTERS. Members at this section.
    children: IYiniSection[] // Children sections (on the next level) of the current section.
}

export interface IBuildOptions {
    mode?: 'lenient' | 'strict' // default: lenient
    onDuplicateKey?: OnDuplicateKey
}
