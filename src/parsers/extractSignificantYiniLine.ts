import { isDebug } from '../config/env'
import { splitLines } from '../utils/string'
import { debugPrint, printObject } from '../utils/system'
import { stripCommentsAndAfter } from '../yiniHelpers'

/**
 * Extract significant YINI line from YINI content (that may be surrounded by comments.).
 * @param rawYiniContent For example:
 *     // This whole line is a comment.
 *     ^SectionName# This part is a comment.
 *     // This whole line is a comment.
 * @returns Will filter out any comments (before or after) and return only one single significant YINI line.
 */
export const extractYiniLine = (rawYiniContent: string) => {
    debugPrint('-> Entered extractSignificantYiniCode(..)')

    const significantLines: string[] = []
    let resultLine = ''

    debugPrint('rawYiniContent: >>>' + rawYiniContent + '<<<')

    const contentLines = splitLines(rawYiniContent)
    if (isDebug()) {
        console.log(`contentLines: (len: ${contentLines.length})`)
        printObject(contentLines)
    }

    // contentLines.forEach((row: string) => {
    for (const line of contentLines) {
        let row = line
        debugPrint('---')
        // debugPrint('row (a): >>>' + row + '<<<')
        // row = stripNLAndAfter(row)
        debugPrint('row (b): >>>' + row + '<<<')
        row = stripCommentsAndAfter(row)
        debugPrint('row (c): >>>' + row + '<<<')
        row = row.trim()
        debugPrint('row (d): >>>' + row + '<<<')
        if (row) {
            debugPrint('Found some content in split row (non-comments).')
            debugPrint('Split row: >>>' + row + '<<<')

            // Use this as input in line.
            // line = row
            significantLines.push(row)
            // break
        }
    }
    debugPrint('--- End: parse line from section content-----------------')
    debugPrint()

    switch (significantLines.length) {
        case 0:
            resultLine = ''
            break
        case 1:
            debugPrint(
                'Did only find one significant lines in rawYiniContent, OK',
            )
            resultLine = significantLines[0]
            break
        default:
            debugPrint('Did find several significant lines in rawYiniContent!')
            throw new Error(
                'Internal error: Detected several row lines in rawYiniContent: >>>' +
                    rawYiniContent +
                    '<<<',
            )
    }

    debugPrint('<- About to leave extractSignificantYiniCode(..):')

    debugPrint('resultLine: >>>' + resultLine + '<<<')

    return resultLine
}
