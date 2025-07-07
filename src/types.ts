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

export type TJSObject = any
export type TSyntaxTreeContainer = {
    _syntaxTree: TSyntaxTree
    _hasTerminal: boolean
    _meta_numOfChains: number
}

export type TSyntaxTree = IChainContainer[]
export type TSectionHeaderType =
    | undefined
    | 'Classic-Header-Marker' // Classic/repeating marker section headers (e.g. ^^ SectionName).
    | 'Numeric-Header-Marker' // Numeric shorthand section headers (e.g. ^7 SectionName.
export type TErrorDetectMarkerType =
    | 'ERROR-Blank-Section-Header'
    | 'ERROR-Unknown-Section-Header-Type'
    // | 'ERROR-Illegal-Section-Header-Name'
    | 'ERROR-Too-Many-Marker-Chars-In-Classic'
    | 'ERROR-Too-Many-Marker-Chars-In-Numeric'

export interface IChainContainer {
    originLevel: number
    chain: any // NOTE: (!) Full linear branch.
}

export interface ISectionResult {
    level: number
    name: string
    members: any
}
