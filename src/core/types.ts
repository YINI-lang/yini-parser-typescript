/*
    A Full Nested Linear Branch - (in tree data structures):
    - A branch in a tree where each section has at most one nested section at each level (never more at each level).
    - Forms a straight path: each section (node) has exactly one nested section, and this continues through multiple levels—like a linked chain.
    - If a section has a nested section, the nesting must form a direct sequence. For example: Section level 3 → Section level 4 → Section level 5, and so on.
    - Can be any branch within a tree (not just the root), or even the whole tree in some cases.
    - Each section includes its own members at that level.
    - Represents a single path from the starting section to the last (deepest) nested section.
    - In other words, it’s a branch that forms a continuous, unbranched sequence of nested sections.
    
    Example:
    "
^ Section1
sValue = 1
    ^^ Section11
    sValue = 11
    bValue = OFF
^ Section2
sValue = 2
        "

    Has two Nested Linear Branches:
    1:
    ^ Section1
    sValue = 1
        ^^ Section11
        sValue = 11
        bValue = OFF
    
    2: 
    ^ Section2
    sValue = 2
    
 */

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

// types.ts
// export type YiniScalar = {
//     type: TDataType
//     value: string | number | boolean | null
// }
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
    hasYiniMarker: boolean
    sections: null | number
    members: null | number
    keysParsed: null | number
    sectionChains: null | number
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
