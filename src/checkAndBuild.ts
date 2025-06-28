/**
 * Semantic check and construct the final result.
 */

import { IChainContainer, TSyntaxTreeContainer } from './types'
import { debugPrint } from './utils/system'

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
        prevObjectPaths = getObjectPropertyPaths(objChain)
    })

    return jsObject
}

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
