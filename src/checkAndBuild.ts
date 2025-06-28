/**
 * Semantic check and construct the final result.
 */

import { IChainContainer, TSyntaxTreeContainer } from './types'
import { debugPrint } from './utils/system'

//@todo Pass tree into a class and run OOP on there..
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
