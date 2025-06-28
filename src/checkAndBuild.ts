/**
 * Semantic check and construct the final result.
 */

import { IChainContainer, TSyntaxTreeContainer } from './types'
import { debugPrint } from './utils/system'

export const checkAndBuild = (syntaxTreeC: TSyntaxTreeContainer) => {
    debugPrint('-> checkAndBuild(..)')

    let jsObject = {}

    // Will loop backwards due to the syntax tree has its head at the end.
    for (let i = syntaxTreeC._syntaxTree.length - 1; i >= 0; i--) {
        const cContainer: IChainContainer = syntaxTreeC._syntaxTree[i]
        debugPrint('Item: ' + i + ', ' + cContainer.originLevel)
        Object.assign(jsObject, cContainer.chain)
    }

    return jsObject
}
