// src/parsers/extractHeaderParts.ts
import { ErrorDataHandler, toErrorLocation } from '../core/errorDataHandler'
import { StmtContext } from '../grammar/generated/YiniParser'
import { debugPrint } from '../utils/print'
import { isMarkerCharacter } from '../utils/yiniHelpers'
import { extractYiniLine } from './extractSignificantYiniLine'

const stripHeaderBlockComments = (text: string): string => {
    let result = ''
    let inBackticks = false
    let inLineComment = false

    for (let pos = 0; pos < text.length; pos++) {
        const char = text[pos]

        if (char === '\n' || char === '\r') {
            inLineComment = false
        }

        if (inLineComment) {
            result += char
            continue
        }

        if (inBackticks && char === '\\') {
            result += text.slice(pos, pos + 2)
            pos++
            continue
        }

        if (char === '`') {
            inBackticks = !inBackticks
        } else if (
            !inBackticks &&
            (char === '#' || text.startsWith('//', pos))
        ) {
            inLineComment = true
        } else if (!inBackticks && text.startsWith('/*', pos)) {
            const end = text.indexOf('*/', pos + 2)
            if (end === -1) {
                result += text.slice(pos)
                break
            }

            result += ' '
            pos = end + 1
            continue
        }

        result += char
    }

    return result
}

/**
 * Extracts the marker sequence, optional numeric shorthand depth,
 * section name, and backticked-name flag from a YINI section header line.
 *
 * Examples:
 * - ^ Section
 * - ^^ Section
 * - ^^^_^^^_^ Section
 * - ^10 Section
 * - §2 Section
 * - < `Backticked Section`
 *
 * @note This function only splits the header into parts.
 *       Validation of marker depth, marker separator placement, mixed markers,
 *       and section name rules is handled by parseSectionHeader.ts.
 */
const extractHeaderParts = (
    rawLine: string,
    errorHandler: ErrorDataHandler | null = null,
    ctx: StmtContext | null = null,
): {
    strMarkerChars: string
    strSectionName: string
    strNumberPart: string
    isBacktickedName: boolean
} => {
    debugPrint('-> Entered extractHeaderParts(..)')

    rawLine = rawLine.trim()

    const str = extractYiniLine(stripHeaderBlockComments(rawLine))
    debugPrint('rawLine: >>>' + rawLine + '<<<')
    debugPrint('    str: >>>' + str + '<<<')

    if (!str) {
        if (errorHandler) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Internal-Error',
                'Received blank argument in extractHeaderParts(..)',
                'Sorry, an unintended internal error happened.',
            )
        } else {
            throw new Error(
                'Internal error: extractHeaderParts(..) received a blank argument.',
            )
        }
    }

    let pos = 0
    const len = str.length

    let markerCharsPart = ''
    let numberPart = ''
    let sectionNamePart = ''
    let isBacktickedName = false

    // 1. Skip leading horizontal whitespace.
    while (pos < len && (str[pos] === ' ' || str[pos] === '\t')) {
        pos++
    }

    // 2. Collect the first section marker character.
    if (pos < len && isMarkerCharacter(str[pos])) {
        markerCharsPart += str[pos]
        pos++
    }

    // 3. Numeric shorthand: only allowed after a single marker character,
    //    for example ^10 Section or §2 Section.
    if (pos < len && str[pos] >= '1' && str[pos] <= '9') {
        while (pos < len && str[pos] >= '0' && str[pos] <= '9') {
            numberPart += str[pos]
            pos++
        }

        const hasWhitespaceAfterNumber =
            pos >= len || str[pos] === ' ' || str[pos] === '\t'

        if (!hasWhitespaceAfterNumber && errorHandler) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Missing whitespace after numeric shorthand section marker.',
                `Numeric shorthand section headers require whitespace after the number. Got '${str}'.`,
                "Use a form such as '^10 Section', not '^10Section'.",
            )
        }
    } else {
        // 4. Repeated marker sequence. Separators '_' are collected here too,
        //    so parseSectionHeader.ts can validate their placement.
        while (pos < len && (str[pos] === '_' || isMarkerCharacter(str[pos]))) {
            markerCharsPart += str[pos]
            pos++
        }
    }

    // 5. Skip horizontal whitespace between marker and section name.
    while (pos < len && (str[pos] === ' ' || str[pos] === '\t')) {
        pos++
    }

    // 6. Collect section name.
    if (pos < len && str[pos] === '`') {
        const start = pos
        pos++ // Skip opening backtick.

        while (pos < len) {
            const ch = str[pos]

            // Skip escaped character inside backticked identifier.
            if (ch === '\\') {
                pos += 2
                continue
            }

            if (ch === '`') {
                pos++ // Include closing backtick.
                break
            }

            pos++
        }

        sectionNamePart = str.slice(start, pos).trim()
        isBacktickedName = true
    } else {
        sectionNamePart = str.slice(pos).trim()
    }

    debugPrint()
    debugPrint('------')
    debugPrint('<- About to leave extractHeaderParts(..)')
    debugPrint()
    debugPrint('    markerCharsPart: >>>' + markerCharsPart + '<<<')
    debugPrint('    sectionNamePart: >>>' + sectionNamePart + '<<<')
    debugPrint('         numberPart: >>>' + numberPart + '<<<')
    debugPrint('   isBacktickedName: ' + isBacktickedName)
    debugPrint()

    return {
        strMarkerChars: markerCharsPart,
        strSectionName: sectionNamePart,
        strNumberPart: numberPart,
        isBacktickedName,
    }
}

export default extractHeaderParts
