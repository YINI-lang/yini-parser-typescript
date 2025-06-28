/**
 * Semantic check and construct the final result.
 */

import { IChainContainer, TSyntaxTreeContainer } from './types'
import { debugPrint } from './utils/system'

export const checkAndBuild = (syntaxTreeC: TSyntaxTreeContainer) => {
    debugPrint('-> checkAndBuild(..)')

    const jsObject = {}

    syntaxTreeC._syntaxTree.forEach((cContainer: IChainContainer, i) => {
        debugPrint('Index: ' + i + ', ' + cContainer.originLevel)
        const objChain = cContainer.chain
        const originIndex = cContainer.originLevel - 1

        // const objectPaths = getObjectPropertyPaths(objChain)

        if (originIndex === 0) {
            Object.assign(jsObject, cContainer.chain)
        }
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
