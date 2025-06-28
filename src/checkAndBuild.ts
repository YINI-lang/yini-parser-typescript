/**
 * Semantic check and construct the final result.
 */

import { isDebug } from './config/env'
import { InvalidDataHandler } from './InvalidDataHandler'
import { IChainContainer, TSyntaxTreeContainer } from './types'
import { debugPrint, printObject } from './utils/system'

let instanceInvalidData: InvalidDataHandler | null = null

export const checkAndBuild = (syntaxTreeC: TSyntaxTreeContainer) => {
    const bulder = new CheckerAndBuilder(syntaxTreeC)
    const jsObject = bulder.doCheckAndBuild()

    return jsObject
}

class CheckerAndBuilder {
    private syntaxTreeC: TSyntaxTreeContainer | undefined = undefined

    constructor(syntaxTreeC: TSyntaxTreeContainer) {
        debugPrint('-> CheckerAndBuilder: constructor(..)')

        this.syntaxTreeC = syntaxTreeC
    }

    public doCheckAndBuild = (): any => {
        if (!this.syntaxTreeC) {
            instanceInvalidData!.pushOrBail(
                null,
                'Fatal-Error',
                'SyntaxTreeC is undefined',
                'This is most likely caused by an internal error somewhere. The process cannot recover fully from this, sorry.',
            )
        }

        const fullSubTreeList: IChainContainer[] =
            this.checkAndBuildFullSubTrees(this.syntaxTreeC!)

        const jsObject = this.constructFinalObject(fullSubTreeList)

        return jsObject
    }

    private checkAndBuildFullSubTrees = (
        syntaxTreeC: TSyntaxTreeContainer,
    ): IChainContainer[] => {
        debugPrint('-> checkAndBuild(..)')
        isDebug() && console.log()

        const fullSubTreeList: IChainContainer[] = [] // List of FULL sub-trees.

        // let prevObjChain: any = undefined
        let prevObjectPaths: string[] = []

        // Current Working Full Sub-Tree (starting at level 1).
        let currentFullSubTree = syntaxTreeC._syntaxTree[0] // (!) Any tree MUST START at level 1.

        const len = syntaxTreeC._syntaxTree.length
        // syntaxTreeC._syntaxTree.forEach((cContainer: IChainContainer, i) => {
        for (let i = 1; i < len; i++) {
            const cContainer = syntaxTreeC._syntaxTree[i]
            // debugPrint('loopIndex: ' + i + ', ' + cContainer.originLevel)
            const level = cContainer.originLevel
            const chain: any = cContainer.chain
            const nestingIndex = level - 1 // For debugging purposes.

            debugPrint('* level: ' + level + ' (i=' + i + '), chain: ' + chain)

            // if (nestingIndex === 0) {
            //     Object.assign(jsObject, cContainer.chain)
            // } else {
            //     debugPrint(
            //         '  - nestingIndex: ' +
            //             nestingIndex +
            //             ', objectPaths: ' +
            //             prevObjectPaths,
            //     )
            // }

            // prevObjectPaths = []
            // prevObjectPaths = getObjectPropertyPaths(jsObject)
            if (level === 1) {
                debugPrint('HIT - Detected level 1')
                fullSubTreeList.push(currentFullSubTree)
                currentFullSubTree = syntaxTreeC._syntaxTree[i] // (!) The tree MUST START at level 1.
            }
        }

        fullSubTreeList.push(currentFullSubTree)

        if (isDebug()) {
            console.log()
            console.log(
                '--- fullSubTreeList: (list of FULL sub-trees.) -------',
            )
            printObject(fullSubTreeList)
            console.log()
        }

        return fullSubTreeList
    }

    // Contruct the final JS object from the list of full sub-trees.
    private constructFinalObject = (
        fullSubTreeList: IChainContainer[],
    ): any => {
        const jsObject = {}

        for (const chainC of fullSubTreeList) {
            if (chainC.originLevel == 1) {
                Object.assign(jsObject, chainC.chain)
            } else {
                instanceInvalidData!.pushOrBail(
                    null,
                    'Internal-Error',
                    'Detected incorrect full sub-tree, start section has level: ' +
                        chainC.originLevel,
                    'Full sub-trees must start with a section with level 1',
                    '' + printObject(chainC),
                )
            }
        }

        return jsObject
    }
}

/*
export const checkAndBuild = (syntaxTreeC: TSyntaxTreeContainer) => {
    debugPrint('-> checkAndBuild(..)')

    const jsObject = {}

    // let prevObjChain: any = undefined
    let prevObjectPaths: string[] = []
    syntaxTreeC._syntaxTree.forEach((cContainer: IChainContainer, i) => {
        // let i = 0
        // for (const cContainer of syntaxTreeC._syntaxTree) {
        debugPrint('loopIndex: ' + i + ', ' + cContainer.originLevel)
        const nestingIndex = cContainer.originLevel - 1
        const objChain: any = cContainer.chain

        if (nestingIndex === 0) {
            Object.assign(jsObject, cContainer.chain)
        } else {
            debugPrint(
                '  - nestingIndex: ' +
                    nestingIndex +
                    ', objectPaths: ' +
                    prevObjectPaths,
            )
        }

        prevObjectPaths = []
        prevObjectPaths = getObjectPropertyPaths(jsObject)
    })

    return jsObject
}
    */

/*
export const checkAndBuild = (syntaxTreeC: TSyntaxTreeContainer) => {
    debugPrint('-> checkAndBuild(..)')
    isDebug() && console.log()

    const fullSubTreeList = [] // List of FULL sub-trees.

    // let prevObjChain: any = undefined
    let prevObjectPaths: string[] = []

    // Current Working Full Sub-Tree (starting at level 1).
    let currentFullSubTree = syntaxTreeC._syntaxTree[0] // (!) Any tree MUST START at level 1.

    const len = syntaxTreeC._syntaxTree.length
    // syntaxTreeC._syntaxTree.forEach((cContainer: IChainContainer, i) => {
    for (let i = 1; i < len; i++) {
        const cContainer = syntaxTreeC._syntaxTree[i]
        // debugPrint('loopIndex: ' + i + ', ' + cContainer.originLevel)
        const level = cContainer.originLevel
        const chain: any = cContainer.chain
        const nestingIndex = level - 1 // For debugging purposes.

        debugPrint('* level: ' + level + ' (i=' + i + '), chain: ' + chain)

        // if (nestingIndex === 0) {
        //     Object.assign(jsObject, cContainer.chain)
        // } else {
        //     debugPrint(
        //         '  - nestingIndex: ' +
        //             nestingIndex +
        //             ', objectPaths: ' +
        //             prevObjectPaths,
        //     )
        // }

        // prevObjectPaths = []
        // prevObjectPaths = getObjectPropertyPaths(jsObject)
        if (level === 1) {
            debugPrint('HIT - Detected level 1')
            fullSubTreeList.push(currentFullSubTree)
            currentFullSubTree = syntaxTreeC._syntaxTree[i] // (!) The tree MUST START at level 1.
        }
    }

    fullSubTreeList.push(currentFullSubTree)

    if (isDebug()) {
        console.log()
        console.log('--- fullSubTreeList: (list of FULL sub-trees.) -------')
        printObject(fullSubTreeList)
        console.log()
    }

    // Contruct the final JS object.
    const jsObject = {}
    for (const chainC of fullSubTreeList) {
        if (chainC.originLevel == 1) {
            Object.assign(jsObject, chainC.chain)
        } else {
            instanceInvalidData!.pushOrBail(
                null,
                'Internal-Error',
                'Detected incorrect full sub-tree, start section has level: ' +
                    chainC.originLevel,
                'Full sub-trees must start with a section with level 1',
                '' + printObject(chainC),
            )
        }
    }

    return jsObject
}
*/

/**
 * Recursively collects all property paths that point to objects only (not primitives/arrays).
 * @param obj - The object to search
 * @param prefix - Used internally for recursion (do not set)
 * @returns Array of property paths as strings
 */
function getObjectPropertyPaths(obj: object, prefix: string = ''): string[] {
    let result: string[] = []

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = (obj as any)[key]
            const path = prefix ? `${prefix}.${key}` : key

            // Only add if it's a plain object (skip arrays & primitives).
            if (value && typeof value === 'object' && !Array.isArray(value)) {
                result.push(path) // Add this object's path.
                result = result.concat(getObjectPropertyPaths(value, path)) // Recurse into nested object.
            }
        }
    }

    return result
}

//////////////////

//     if (!sectionName) {
//         this.instanceInvalidData!.pushOrBail(
//             null,
//             'Internal-Error',
//             'Invalid sectionName: ' + sectionName,
//         )
//     }

/*
        if (atLevel >= 1) {
            this.lastActiveSectionNameAtLevels2[atLevel - 1] = sectionName
        } else {
            this.instanceInvalidData!.pushOrBail(
                null,
                'Internal-Error',
                'Invalid section level (<1), level: ' +
                    atLevel +
                    ', sectionName: "' +
                    sectionName +
                    '"',
            )
        }
    */

/*
        if (this.level - 1 <= this.getDepthOfLevels()) {
            //this.lastActiveSectionTitlesAtLevels[this.level - 1] = sectionName
            // this.setLastActiveSection(this.level, sectionName)
            // this.lastActiveSectionAtLevels =
        } else {
            debugPrint('(?) Maybe error?')
            //throw new Error('qqqqq')
            // this.instanceInvalidData!.pushOrBail(
            //     ctx,
            //     'Syntax-Error',
            //     'Invalid section level of section header "' + sectionName + '"',
            //     'Missing a section with level 1. Section header name "' +
            //         sectionName +
            //         '" with level ' +
            //         this.level +
            //         ' may not jump over previous section levels.',
            // )
        }

        */
/*
        if (Math.abs(this.prevLevel - this.level) >= 2) {
            this.instanceInvalidData!.pushOrBail(
                ctx,
                'Syntax-Error',
                'Invalid section level jump of section header "' +
                    sectionName +
                    '"',
                'Section header name "' +
                    sectionName +
                    '" with level ' +
                    this.level +
                    ' may not jump over previous section levels, from secton with level ' +
                    this.prevLevel +
                    '.',
            )
        }
        */
/*
    // getLevelsDepth = (): number => {
    getDepthOfLevels = (): number => {
        return this.lastActiveSectionNameAtLevels2.length
    }
    */
/*
    setLastActiveSection = (atLevel: number, sectionName: string) => {
        if (atLevel >= 1) {
            this.lastActiveSectionNameAtLevels2[atLevel - 1] = sectionName
        } else {
            this.instanceInvalidData!.pushOrBail(
                null,
                'Internal-Error',
                'Invalid section level (<1), level: ' +
                    atLevel +
                    ', sectionName: "' +
                    sectionName +
                    '"',
            )
        }
    }
    */
// let nestDirection: 'lower' | 'same' | 'higher'
// if (this.level === this.prevLevel) {
//     nestDirection = 'same'
// } else if (this.level < this.prevLevel) {
//     nestDirection = 'lower'
// } else {
//     nestDirection = 'higher'
// }
// this.prevLevel = this.level
