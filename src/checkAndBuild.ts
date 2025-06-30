/**
 * Semantic check and construct the final result.
 */

import { isDebug } from './config/env'
import { InvalidDataHandler } from './InvalidDataHandler'
import { IChainContainer, TSyntaxTreeContainer } from './types'
import { debugPrint, printObject } from './utils/system'

let instanceInvalidData: InvalidDataHandler | null = null

export const checkAndBuild = (syntaxTreeC: TSyntaxTreeContainer) => {
    debugPrint('-> checkAndBuild(..)')
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
        debugPrint('-> CheckerAndBuilder: doCheckAndBuild(..)')
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
        debugPrint('-> CheckerAndBuilder: checkAndBuildFullSubTrees(..)')
        isDebug() && console.log()

        const fullSubTreeList: IChainContainer[] = [] // List of FULL sub-trees.

        // Current Working Full Sub-Tree (starting at level 1).
        let workingFullSubTree = syntaxTreeC._syntaxTree[0] // (!) Any tree MUST START at level 1.
        debugPrint(
            `Setted new workingFullSubTree, from syntaxTreeC._syntaxTree[0]`,
        )

        const len = syntaxTreeC._syntaxTree.length
        for (let i = 1; i < len; i++) {
            const currentChainC = syntaxTreeC._syntaxTree[i]
            const level = currentChainC.originLevel
            const nestingIndex = level - 1 // For debugging purposes.
            const chain: any = currentChainC.chain // For debugging purposes.
            debugPrint(
                `Got new chain from syntaxTreeC._syntaxTree[${i}] to be mounted onto parent...`,
            )

            debugPrint('* level: ' + level + ' (i=' + i + '), chain: ' + chain)

            if (level === 1) {
                debugPrint(
                    'HIT - Detected that currentChain starts with level 1',
                )
                fullSubTreeList.push(workingFullSubTree)
                debugPrint(
                    'The workingFullSubTree is finished, pushed it to the list.',
                )
                workingFullSubTree = syntaxTreeC._syntaxTree[i] // (!) The tree MUST START at level 1.
                debugPrint(
                    `Setted new workingFullSubTree, from syntaxTreeC._syntaxTree[${i}]`,
                )
            } else {
                debugPrint(
                    'About to mount currentChain onto workingFullSubTree at correct level...',
                )
                workingFullSubTree = this.mountChainOntoLevel(
                    currentChainC,
                    workingFullSubTree,
                )
            }

            debugPrint()
        }

        fullSubTreeList.push(workingFullSubTree)

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

    private mountChainOntoLevel = (
        chainC: IChainContainer,
        workingSubTree: IChainContainer, // First section must start at level 1.
    ): IChainContainer => {
        debugPrint('-> CheckerAndBuilder: mountChainOntoLevel(..)')
        if (chainC.originLevel > 1) {
            // NOP
        } else {
            instanceInvalidData!.pushOrBail(
                null,
                'Fatal-Error',
                'Internal-Error: Detected incorrect chain in mountChainOntoLevel(..), start section has level: ' +
                    chainC.originLevel,
                'The (chain) must start with a section level higher than 1',
                '' + printObject(chainC),
            )
        }
        if (workingSubTree.originLevel != 1) {
            instanceInvalidData!.pushOrBail(
                null,
                'Fatal-Error',
                'Internal-Error: Detected incorrect full sub-tree in mountChainOntoLevel(..), start section has level: ' +
                    chainC.originLevel,
                'A full sub-tree (chain) must start with a section at level 1',
                '' + printObject(chainC),
            )
        }

        const chain: any = chainC.chain
        const targetLevel = chainC.originLevel

        if (isDebug()) {
            debugPrint('Target level = ' + targetLevel)
            debugPrint(`The chain to mount: (onto level: ${targetLevel})`)
            printObject(chain)
            debugPrint('--- workingFullSubTree: -------')
            debugPrint('Before mounting onto workingSubTree.chain:')
            printObject(workingSubTree.chain)
        }

        debugPrint('Mount currentChain onto workingFullSubTree.')
        workingSubTree.chain = mountObjectAtLevel(
            workingSubTree.chain,
            chain,
            targetLevel,
        )
        // const stack: { node: any }[] = []
        // // Start with the top-level object in the sub-tree.
        // stack.push({ node: workingSubTree.chain })
        // let currentLevel = 0
        // const pathToLevel: string[] = [] // The path to the target level on the working sub-tree.

        // while (stack.length > 0) {
        //     const { node } = stack.pop()! // Non-null because stack.length > 0.

        //     for (const key in node) {
        //         if (Object.prototype.hasOwnProperty.call(node, key)) {
        //             const value = node[key]
        //             // If it's a plain object (not array or null).
        //             if (
        //                 value &&
        //                 typeof value === 'object' &&
        //                 !Array.isArray(value)
        //             ) {
        //                 if (currentLevel === targetLevel) {
        //                     debugPrint(
        //                         'BOOM, correct level found, mount the chain here!',
        //                     )
        //                     debugPrint('currentLevel: ' + currentLevel)
        //                     if (isDebug()) {
        //                         debugPrint('value:')
        //                         printObject(value)
        //                         debugPrint('pathToLevel:')
        //                         printObject(pathToLevel)
        //                         debugPrint()
        //                         Object.assign(workingSubTree.chain[], chain)
        //                         break
        //                     }
        //                 }
        //                 pathToLevel.push('' + key)
        //                 // Push nested object onto stack to process its properties.
        //                 stack.push({ node: value })
        //                 currentLevel++
        //             }
        //         }
        //     }
        // }

        if (isDebug()) {
            debugPrint('After mounting onto workingSubTree.chain:')
            printObject(workingSubTree.chain)
            debugPrint('----------')
        }

        debugPrint('<- CheckerAndBuilder: mountChainOntoLevel(..)')
        return workingSubTree
    }

    // Contruct the final JS object from the list of full sub-trees.
    private constructFinalObject = (
        fullSubTreeList: IChainContainer[],
    ): any => {
        debugPrint('-> CheckerAndBuilder: constructFinalObject(..)')
        const jsObject = {}

        for (const chainC of fullSubTreeList) {
            if (chainC.originLevel === 1) {
                Object.assign(jsObject, chainC.chain)
            } else {
                instanceInvalidData!.pushOrBail(
                    null,
                    'Fatal-Error',
                    'Internal-Error: Detected incorrect full sub-tree in constructFinalObject(..), start section has level: ' +
                        chainC.originLevel,
                    'A full sub-tree (chain) must start with a section at level 1',
                    '' + printObject(chainC),
                )
            }
        }

        return jsObject
    }
}

/**
 * Mounts objectDest onto the first object at the given depth (level, 1-based) in objectSrc.
 * @return Returns a new object without mutating input objects.
 */
function mountObjectAtLevel(
    objectSrc: Record<string, any>,
    objectDest: Record<string, any>,
    level: number,
): Record<string, any> {
    // Deep copy to avoid mutating the input.
    const result = JSON.parse(JSON.stringify(objectSrc))
    let current = result
    let currentLevel = 1

    // Traverse down the first object path until the desired level.
    while (currentLevel < level) {
        // Get all keys in current object.
        const keys = Object.keys(current)
        // Find first key where value is a plain object (not array).
        const nextKey = keys.find(
            (key) =>
                current[key] &&
                typeof current[key] === 'object' &&
                !Array.isArray(current[key]),
        )
        if (!nextKey) {
            // Could not reach the specified depth.
            return result
        }
        current = current[nextKey]
        currentLevel++
    }

    // Mount objectDest onto the object at the required level.
    Object.assign(current, objectDest)

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
