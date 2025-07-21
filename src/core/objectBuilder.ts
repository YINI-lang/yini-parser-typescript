import { isDebug } from '../config/env'
import { IChainContainer, TJSObject, TSyntaxTreeContainer } from '../core/types'
import { debugPrint, printObject } from '../utils/system'
import { ErrorDataHandler } from './ErrorDataHandler'

/**
 * Construct the final result of a JavaScript Object.
 */
export const constructFinalObject = (
    syntaxTreeC: TSyntaxTreeContainer,
    errorHandler: ErrorDataHandler,
): TJSObject => {
    debugPrint('-> constructFinalObject(..)')
    const bulder = new Builder(syntaxTreeC, errorHandler)

    if (isDebug()) {
        console.log('Argument, syntaxTreeC:')
        printObject(syntaxTreeC)
    }

    const jsObject = bulder.doCheckAndBuild()

    debugPrint('<- About to leave constructFinalObject(..)')
    if (isDebug()) {
        console.log('Returning, jsObject:')
        printObject(syntaxTreeC)
    }

    return jsObject
}

class Builder {
    private syntaxTreeC: TSyntaxTreeContainer
    private errorHandler: ErrorDataHandler

    constructor(
        syntaxTreeC: TSyntaxTreeContainer,
        errorHandler: ErrorDataHandler,
    ) {
        debugPrint('-> Builder: constructor(..)')

        this.syntaxTreeC = syntaxTreeC
        this.errorHandler = errorHandler
    }

    public doCheckAndBuild(): TJSObject {
        debugPrint('-> Builder: doCheckAndBuild(..)')
        if (!this.syntaxTreeC) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler.pushOrBail(
                null,
                'Fatal-Error',
                'SyntaxTreeC is undefined',
                'This is most likely caused by an internal error somewhere. The process cannot recover fully from this, sorry.',
            )
        }

        const fullSubTreeList: IChainContainer[] = this.buildFullSubTrees(
            this.syntaxTreeC!,
        )

        const jsObject = this.buildObjectFromList(fullSubTreeList)

        return jsObject
    }

    private buildFullSubTrees(
        syntaxTreeC: TSyntaxTreeContainer,
    ): IChainContainer[] {
        debugPrint('-> Builder: buildFullSubTrees(..)')
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
            const chain: TJSObject = currentChainC.chain // For debugging purposes.

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

    private mountChainOntoLevel(
        chainC: IChainContainer,
        workingSubTree: IChainContainer, // First section must start at level 1.
    ): IChainContainer {
        debugPrint('-> Builder: mountChainOntoLevel(..)')
        if (isDebug()) {
            printObject(chainC)
        }

        if (chainC.originLevel > 1) {
            // NOP
        } else {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler.pushOrBail(
                null,
                'Fatal-Error',
                'Internal-Error: Detected incorrect chain in mountChainOntoLevel(..), start section has level: ' +
                    chainC.originLevel,
                'The (chain) must start with a section level higher than 1',
                '' + printObject(chainC),
            )
        }
        if (workingSubTree.originLevel != 1) {
            // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
            this.errorHandler.pushOrBail(
                null,
                'Fatal-Error',
                'Internal-Error: Detected incorrect full sub-tree in mountChainOntoLevel(..), start section has level: ' +
                    chainC.originLevel,
                'A full sub-tree (chain) must start with a section at level 1',
                '' + printObject(chainC),
            )
        }

        const chain: TJSObject = chainC.chain
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

        if (isDebug()) {
            debugPrint('After mounting onto workingSubTree.chain:')
            printObject(workingSubTree.chain)
            debugPrint('----------')
        }

        debugPrint('<- Builder: mountChainOntoLevel(..)')
        return workingSubTree
    }

    // Contruct the final JS object from the list of full sub-trees.
    private buildObjectFromList(fullSubTreeList: IChainContainer[]): TJSObject {
        debugPrint('-> Builder: buildObjectFromList(..)')
        const jsObject = {}

        for (const chainC of fullSubTreeList) {
            if (chainC.originLevel === 1) {
                if (isDebug()) {
                    console.log('About to assign chainC.chain:')
                    console.log(chainC.chain)
                }

                Object.assign(jsObject, chainC.chain)

                if (isDebug()) {
                    console.log('After, jsObject:')
                    console.log(jsObject)
                }
            } else {
                // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
                this.errorHandler.pushOrBail(
                    null,
                    'Fatal-Error',
                    'Internal-Error: Detected incorrect full sub-tree in buildObjectFromList(..), start section has level: ' +
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
 * Mounts objectDest onto the first object at the given depth (level is
 * 1-based) in objectSrc.
 * @return Returns a new object without mutating input objects.
 */
const mountObjectAtLevel = (
    objectSrc: Record<string, any>,
    objectDest: Record<string, any>,
    level: number,
): Record<string, any> => {
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
