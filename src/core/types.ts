export type TSourceType = 'file' | 'inline' // Keep it lowercase since it's shown in meta, easier for tooling.

interface IMetaBaseInfo {
    sourceType: TSourceType
    filename: string | undefined
    lineCount: number | null
}

export interface IFileLoadMetaPayload extends IMetaBaseInfo {
    // sourceType: TSourceType
    // filename: string | undefined
    // lineCount: number | null
    fileByteSize: number | null
    timeIoMs: number | null
    preferredBailSensitivity: null | TPreferredBailSensitivityLevel
}

export interface IYiniAST extends IMetaBaseInfo {
    root: IYiniSection // Implicit root per spec.
    isStrict: boolean
    // sourceType: TSourceType
    // filename: undefined | string
    terminatorSeen: boolean // Required '/END' in strict mode.
    yiniMarkerSeen: boolean
    numOfSections: number | null
    numOfMembers: number | null
    sectionNamePaths: string[] | null
    errors: string[] // @deprecated
    warnings: string[] // @deprecated
}

export interface IYiniSection {
    sectionName: string
    level: number // 1..n
    members: Map<string, TValueLiteral> // Members at this section.
    children: IYiniSection[] // Children sections (on the next level) of the current section.
}

export interface IBuildOptions {
    mode?: 'lenient' | 'strict' // default: lenient
    onDuplicateKey?: 'error' | 'warn' | 'keep-first' | 'overwrite' // default: warn
}

// interface YiniDocument {
//     // sections: Record<string, any>
//     _base: Record<string, any>
//     // terminal?: string
//     _hasTerminal?: boolean
// }

// export type TDataType =
//     | undefined
//     | 'Section' // Note: A section is indirectly an object, but main type is 'Section'.
//     | 'String'
//     | 'Number-Integer'
//     | 'Number-Float'
//     | 'Boolean'
//     | 'Null'
//     | 'Object' // Note: Object-literal.
//     | 'List'

/**
 * Scalar literal, a single, indivisible piece of data:
 * string, number, boolean, and null.
 * @property {string | undefined} [tag]
 *           Its contents may change at any time and should not
 *           be relied upon for any significant purpose.
 */
export type TScalarValue =
    | { type: 'String'; value: string; tag: string | undefined }
    | { type: 'Number'; value: number; tag: string | undefined }
    | { type: 'Boolean'; value: boolean; tag: string | undefined }
    | { type: 'Null'; value: null; tag: string | undefined }
    | { type: 'Undefined'; value: undefined; tag: string | undefined }

/** Any literal value in YINI: scalar, list, or object. */
export type TValueLiteral =
    | TScalarValue
    // | TValueLiteral[]
    | TListValue
    // | { [key: string]: TValueLiteral }
    | TObjectValue

// type TListValue = TValueLiteral[]
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
    //value: { [key: string]: TValueLiteral }
    entries: Readonly<Record<string, TValueLiteral>>
    tag: string | undefined
}

// export type TDataType =
//     | undefined
//     | 'String'
//     | 'Number-Integer'
//     | 'Number-Float'
//     | 'Boolean'
//     | 'Null'

/*
class CIResult {
    private dataType: TDataType = undefined
    private valueBool: boolean | undefined = undefined

    //constructor() {}
    getType = (): TDataType => this.dataType

    makeBoolean = (isTrue: boolean) => {
        this.dataType = 'Boolean'
        this.valueBool = isTrue
    }
}
*/

// interface YIResult {
//     key: string
//     type: TDataType
//     value: any
// }

export type TPersistThreshold =
    | '0-Ignore-Errors' // Don't bail/fail on error, persist and try to recover.
    | '1-Abort-on-Errors'
    | '2-Abort-Even-on-Warnings'

export type TIssueType =
    | 'Fatal-Error'
    | 'Internal-Error'
    | 'Syntax-Error'
    | 'Syntax-Warning'
    | 'Notice'
    | 'Info'

export type TJSObject = any

export type TBailSensitivityLevel = 0 | 1 | 2
export type TPreferredBailSensitivityLevel = 'auto' | 0 | 1 | 2

// For use in internal functions.
export interface IParseMainOptions {
    isStrict: boolean
    bailSensitivityLevel: TBailSensitivityLevel
    isIncludeMeta: boolean // Include meta data.
    isWithDiagnostics: boolean // Include diagnostics.
    isWithTiming: boolean // Include timing data..
}

export interface IResultMetaData {
    parserVersion: string
    mode: 'lenient' | 'strict'
    orderPreserved: boolean
    // runAt: string
    runStartedAt: string
    runFinishedAt: string
    source: {
        sourceType: TSourceType
        filename: undefined | string
        hasDocumentTerminator: boolean
        hasYiniMarker: boolean
        byteSize: null | number
        lineCount: null | number
        sha256: null | string
    }
    structure: {
        maxDepth: null | number
        sectionCount: null | number // Section (header) count, Section '(root)' not included.
        memberCount: null | number // Section (member) count.
        keysParsedCount: null | number // Incl. keys in inline object in section members.
        objectCount: null | number // Incl. sections (objects) + inline objects.
        listCount: null | number
        // sectionChains: null | number
        sectionNamePaths: string[] | null // All key/access paths to section Headers.
    }
    metaSchemaVersion: 1
    diagnostics?: {
        // Includes warnings/errors info.
        bailSensitivity: {
            preferredLevel: null | 'auto' | 0 | 1 | 2 // Input level into function.
            levelUsed: TBailSensitivityLevel
            levelMeaning:
                | null
                | 'Ignore-Errors'
                | 'Abort-on-Errors'
                | 'Abort-Even-on-Warnings'
        }
        errors: { errorCount: number; payload: string[] }
        warnings: { warningCount: number; payload: string[] }
        notices: { noticeCount: number; payload: string[] }
        infos: { infoCount: number; payload: string[] }
        environment: {
            NODE_ENV: undefined | string
            APP_ENV: undefined | string
            lib: {
                nodeEnv: undefined | string
                appEnv: undefined | string
                flags: { isDev: boolean; isDebug: boolean }
            }
        }
    }
    timing?: {
        total: null | { timeMs: number; name: string }
        phase0: undefined | { timeMs: number; name: string }
        phase1: null | { timeMs: number; name: string }
        phase2: null | { timeMs: number; name: string }
        phase3: null | { timeMs: number; name: string }
        phase4: null | { timeMs: number; name: string }
    }
}

// export type TSyntaxTreeContainer = {
//     _syntaxTree: TSyntaxTree
//     _hasTerminal: boolean
//     _hasYiniMarker: boolean
//     _meta_numOfSections: number
//     _meta_numOfMembers: number
//     _meta_numOfChains: number
// }

// export type TSyntaxTree = IChainContainer[]
export type TSectionHeaderType =
    | undefined
    | 'Classic-Header-Marker' // Classic/repeating marker section headers (e.g. ^^ SectionName).
    | 'Numeric-Header-Marker' // Numeric shorthand section headers (e.g. ^7 SectionName.

export interface IChainContainer {
    originLevel: number
    chain: any // NOTE: (!) Full linear branch.
}

export interface ISectionResult {
    level: number
    name: string
    members: any
}
