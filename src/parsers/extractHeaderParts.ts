import { isDebug } from '../config/env'
import { ErrorDataHandler } from '../core/errorDataHandler'
// import { TSectionHeaderType } from '../core/internalTypes'
import { StmtContext } from '../grammar/generated/YiniParser'
import { debugPrint } from '../utils/print'
import { trimBackticks } from '../utils/string'
import { isMarkerCharacter } from '../utils/yiniHelpers'
import { extractYiniLine } from './extractSignificantYiniLine'

/**
 * Check and identify the section header parts via tokenizing the parts and return them as strings.
 * @param rawHeaderLine Raw line with the section header where the header
 * marker will be identified. E.g. does the header start with '^^^' or '^3'
 * and then some identifier.
 *
 * Below, copied from YINI Specification v1.0.0 Beta 7.
 * Form 1: Identifier of Simple Form:
 * - Keys must be non-empty.
 * - Keys are case-sensitive (`Title` and `title` are different).
 * - Can only contain letters (a-z or A-Z), digits (0-9) and underscores `_`.
 * - Must begin with a letter or an underscore `_`.
 * - Note: Cannot contain hyphens (`-`) or periods (`.`).
 *
 * Form 2: Backticked Identifier:
 * - A phrase is a name wrapped in backticks  ``` ` ```.
 * - Backticked identifiers must be on a single line and must not contain tabs or new lines unless using escaping codes, except for ordinary spaces.
 * - Special control characters (U+0000–U+001F) must be escaped.
 *
 * @note Implemented without regexp to keep it less cryptic, etc.
 * @note Returns the parts as strings; each part needs to be analyzed separately against the contraints in the specifications.
 * @returns An object with the identified header parts: marker characters, parsed name, and parsed level string.
 */
const extractHeaderParts = (
    rawLine: string,
    errorHandler: ErrorDataHandler | null = null,
    ctx: StmtContext | null = null, // For error reporting.
    // ): TSectionHeaderType | TErrorDetectMarkerType => {
): {
    strMarkerChars: string
    strSectionName: string
    strNumberPart: string
    isBacktickedName: boolean
} => {
    debugPrint('-> Entered extractHeaderParts(..)')

    rawLine = rawLine.trim()

    const str = extractYiniLine(rawLine)
    debugPrint('rawLine: >>>' + rawLine + '<<<')
    debugPrint('    str: >>>' + str + '<<<')

    // Edge case: empty line.
    if (!str) {
        errorHandler!.pushOrBail(
            ctx,
            'Internal-Error',
            'Received blank argument in extractHeaderParts(..)',
            'Sorry, an unintended internal error happened.',
        )
    }

    let pos = 0
    const len = str.length
    let markerCharsPart = ''
    let numberPart = ''
    let sectionNamePart = ''
    let isBacktickedName = false

    // 1. Skip leading whitespace.
    while (pos < len && (str[pos] === ' ' || str[pos] === '\t')) pos++

    // 2. Collect marker(s): ^, <, §, €.
    while (pos < len && isMarkerCharacter(str[pos])) {
        markerCharsPart += str[pos]
        pos++
    }

    // 3. Numeric part (for numeric shorthand; only if single marker found).
    if (
        markerCharsPart.length === 1 &&
        pos < len &&
        str[pos] >= '1' &&
        str[pos] <= '9'
    ) {
        // Start collecting number part.
        while (pos < len && str[pos] >= '0' && str[pos] <= '9') {
            numberPart += str[pos]
            pos++
        }
        markerCharsPart += numberPart // E.g., "^7".
    }

    // 4. Skip whitespace between marker and section name.
    while (pos < len && (str[pos] === ' ' || str[pos] === '\t')) pos++

    // 5. Collect section name (identifier or backticked).
    if (pos < len && str[pos] === '`') {
        // Backticked identifier.
        let start = pos
        pos++ // Skip initial backtick.
        while (pos < len && str[pos] !== '`') pos++
        pos++ // Include the closing backtick (if found).
        sectionNamePart = str.slice(start, pos).trim()
        isBacktickedName = true
    } else {
        // Non-backticked: take the rest of the line, trim off any trailing comments, etc.
        sectionNamePart = str.slice(pos).trim()
        // Optionally, strip trailing comments or newlines here if needed.
    }

    if (isBacktickedName) {
        debugPrint('Backticed sectionNamePart: ' + sectionNamePart)
        // sectionNamePart = trimBackticks(sectionNamePart)
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
