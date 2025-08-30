/**
 * @note
 *   The use of null vs undefined
 *   ----------------------------
 *   The convention here (in this file) is:
 *   - undefined is used where a value is missing, or does not apply.
 *   - null is used where a value is missing or has not yet been computed.
 */

// --- Types ----------------------------------------------------------------

export type TJSObject = any // NOTE: Currently must be any! Not unknown or Record<string, unknown> or anything else, since linting etc will render this as error/unknow.

export type TSourceType = 'File' | 'Inline'

export type TBailSensitivityLevel = 0 | 1 | 2
export type TPreferredBailSensitivityLevel = 'auto' | 0 | 1 | 2

// Human label types.
export type TPersistThreshold =
    | '0-Ignore-Errors' // 0 - Don't bail/fail on error, persist and try to recover.
    | '1-Abort-on-Errors' // 1 - Stop parsing on the first error.
    | '2-Abort-Even-on-Warnings' // 2 - Stop parsing on the first warning or error.

/**
 * Only for returned meta data to user.
 * NOTE: Only use lower case snake_case for keys.
 */
export type TBailSensitivityLevelKey =
    | 'ignore_errors' // 0 - Don't bail/fail on error, persist and try to recover.
    | 'abort_on_errors' // 1 - Stop parsing on the first error.
    | 'abort_on_warnings' // 2 - Stop parsing on the first warning or error.

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

// --- Interfaces -----------------------------------------------------------

interface IMetaBaseInfo {
    sourceType: TSourceType
    // sourceTypeKey: string // Transformed from the corresponding type, keep it lowercase since it's shown in meta, easier for tooling.
    fileName: string | undefined
    // lineCount: number | null
}

export interface IFileLoadMetaPayload extends IMetaBaseInfo {
    // sourceType: TSourceType
    // fileName: string | undefined
    lineCount: number | null
    fileByteSize: number | null // Only when source type is 'File'.
    timeIoMs: number | null // Only when source type is 'File'.
    preferredBailSensitivity: null | TPreferredBailSensitivityLevel
    sha256: string | null
}

export interface IYiniAST extends IMetaBaseInfo {
    root: IYiniSection // Implicit root per spec.
    isStrict: boolean
    // sourceType: TSourceType
    // fileName: undefined | string
    terminatorSeen: boolean // Required '/END' in strict mode.
    yiniMarkerSeen: boolean
    maxDepth: number | null
    numOfSections: number | null
    numOfMembers: number | null
    sectionNamePaths: string[] | null
    errors: string[] // @deprecated Will soon get deleted
    warnings: string[] // @deprecated Will soon get deleted
}

export interface IYiniSection {
    sectionName: string
    level: number // 1..n
    members: Map<string, TValueLiteral> // Map used since ORDER MATTERS. Members at this section.
    children: IYiniSection[] // Children sections (on the next level) of the current section.
}

export interface IBuildOptions {
    mode?: 'lenient' | 'strict' // default: lenient
    onDuplicateKey?: 'error' | 'warn' | 'keep-first' | 'overwrite' // default: warn
}

// For use in internal functions.
export interface IParseMainOptions {
    isStrict: boolean
    bailSensitivityLevel: TBailSensitivityLevel
    isIncludeMeta: boolean // Include meta data along the returned result.
    isWithDiagnostics: boolean // Include diagnostics in meta data.
    isWithTiming: boolean // Include timing data of the different phases in meta data.
    isKeepUndefinedInMeta: boolean // If true, keeps properties with undefined values in the returned meta data.
}

//{ line: 12, column: 8, type: 'Syntax-Error', message1: 'Invalid number' }
export interface IIssuePayload {
    line: number | undefined // NOTE: 1-based, so line 0 does not exist, set to undefined instead.
    column: number | undefined // NOTE: 1-based, so column 0 does not exist, set to undefined instead.
    //type: TIssueType
    typeKey: string // Transformed from the corresponding type, keep it lowercase since it's shown in meta, easier for tooling.
    // code:string // Maybe in future to be added.
    message: string
    advice: string | undefined
    hint: string | undefined
}

// --- Result Meta Interface --------------------------------------------------------

/**
 * @note NOTE: USE NO TYPES here (or neither in nested structures), they
 *       should only be strings (and content MUST be transformed from the
 *       types to lower snake case)
 *
 *       *** DUE TO make easier for tooling ***
 *
 * @note UPDATE 'metaSchemaVersion' on any edits to the meta structure.
 */
export interface IResultMetaData {
    parserVersion: string
    mode: 'lenient' | 'strict'
    orderPreserved: boolean
    runStartedAt: string
    runFinishedAt: string
    durationMs: number
    source: {
        // sourceType: TSourceType
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
        objectCount: null | number // (?) Incl. sections (objects) + inline objects.
        listCount: null | number
        sectionNamePaths: string[] | null // All key/access paths to section Headers.
    }
    metaSchemaVersion: '1.0.0'
    diagnostics?: {
        // Includes warnings/errors info.
        bailSensitivity: {
            preferredLevel: null | 'auto' | 0 | 1 | 2 // Input level into function.
            levelUsed: TBailSensitivityLevel
            levelKey: TBailSensitivityLevelKey // Mapped from the corresponding type, keep it lowercase since it's shown in meta, easier for tooling.
            levelLabel: TPersistThreshold
            levelDescription: string | null
        }
        errors: { errorCount: number; payload: IIssuePayload[] }
        warnings: { warningCount: number; payload: IIssuePayload[] }
        notices: { noticeCount: number; payload: IIssuePayload[] }
        infos: { infoCount: number; payload: IIssuePayload[] }
        environment: {
            NODE_ENV: undefined | string
            APP_ENV: undefined | string
            lib: {
                nodeEnv: undefined | string
                appEnv: undefined | string
                flags: { isDev: boolean; isDebug: boolean }
            }
        }
        inputOptions: IParseMainOptions
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
