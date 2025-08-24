export interface IYiniAST {
    root: IYiniSection // Implicit root per spec.
    terminatorSeen: boolean // Required '/END' in strict mode.
    yiniMarkerSeen: boolean
    isStrict: boolean
    numOfSections: number | null
    numOfMembers: number | null
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

// For use in internal functions.
export interface IParseMainOptions {
    isStrict: boolean
    bailSensitivityLevel: TBailSensitivityLevel
    isIncludeMeta: boolean // Include meta data.
    isWithDiagnostics: boolean // Include diagnostics.
    isWithTiming: boolean // Include timing data..
}

export interface IParseMetaData {
    // fullPath?: string
    strictMode: boolean
    hasTerminal: boolean
    hasYINIMarker: boolean
    sections: null | number
    members: null | number
    keysParsed: null | number
    // sectionChains: null | number
    diagnostics?: {
        // Includes warnings/errors info.
        bailSensitivityLevel: TBailSensitivityLevel
        errors: null | number
        warnings: null | number
        infoAndNotices: null | number
        envs: {
            NODE_ENV: undefined | string
            APP_ENV: undefined | string
            libNodeEnv: undefined | string
            libAppEnv: undefined | string
        }
        libFlags: {
            isDev: boolean
            isDebug: boolean
        }
    }
    timing?: {
        totalMs: null | number
        phase1Ms: null | number
        phase2Ms: null | number
        phase3Ms: null | number
    }
}

export type TSyntaxTreeContainer = {
    _syntaxTree: TSyntaxTree
    _hasTerminal: boolean
    _hasYiniMarker: boolean
    _meta_numOfSections: number
    _meta_numOfMembers: number
    _meta_numOfChains: number
}

export type TSyntaxTree = IChainContainer[]
export type TSectionHeaderType =
    | undefined
    | 'Classic-Header-Marker' // Classic/repeating marker section headers (e.g. ^^ SectionName).
    | 'Numeric-Header-Marker' // Numeric shorthand section headers (e.g. ^7 SectionName.
// export type TErrorDetectMarkerType = 'ERROR-Blank-Section-Header'
// | 'ERROR-Unknown-Section-Header-Type'
// | 'ERROR-Illegal-Section-Header-Name'
// | 'ERROR-Too-Many-Marker-Chars-In-Classic'
// | 'ERROR-Too-Many-Marker-Chars-In-Numeric'

export interface IChainContainer {
    originLevel: number
    chain: any // NOTE: (!) Full linear branch.
}

export interface ISectionResult {
    level: number
    name: string
    members: any
}
