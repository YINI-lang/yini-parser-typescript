import { isDebug } from '../config/env'
import { ErrorDataHandler } from '../ErrorDataHandler'
import { SectionContext } from '../grammar/YiniParser'
import { TSectionHeaderType } from '../types'
import {
    isAlpha,
    isDigit,
    splitLines,
    stripCommentsAndAfter,
    stripNLAndAfter,
    trimBackticks,
} from '../utils/string'
import { debugPrint } from '../utils/system'

const SECTION_MARKER1 = '^'
const SECTION_MARKER2 = '~'
const SECTION_MARKER3 = '\u00A7' // Section sign §.
const SECTION_MARKER4 = '\u20AC' // Euro sign €.

/**
 * Check if the character is a section marker character.
 * @note The string must be of length 1.
 * @param character A character in a string.
 */
export const isMarkerCharacter = (character: string): boolean => {
    if (character.length !== 1) {
        throw Error(
            'Argument into function isMarkerCharacter(..) is not of length 1',
        )
    }

    const ch = character
    if (ch === SECTION_MARKER1 || ch === SECTION_MARKER2) {
        return true
    }

    return false
}

/**
 * Extract ...
 * @param rawLine Raw line with the section header.
 */
const parseSectionHeader = (
    rawLine: string,
    errorHandlerInstance: ErrorDataHandler,
    ctx: SectionContext, // For error reporting.
): {
    headerMarkerType: TSectionHeaderType
    sectionName: string
    level: number
} => {
    debugPrint('-> Entered parseSectionHeader(..)')

    rawLine = rawLine.trim()

    //@todo, change to use extractSignificantYiniLine(..)

    let line = ''
    if (splitLines(rawLine).length > 1) {
        debugPrint(
            'Detected rawLine (in parseSectionHeader(..)) having multiple row lines, leaving rawLine as is without stripping possible end content.',
        )
        line = rawLine
    } else {
        debugPrint(
            'Detected rawLine (in parseSectionHeader(..)) having max 1 row line, stripping possible end content.',
        )
        line = stripNLAndAfter(rawLine) // Cut of anything after (and including) any newline (and possible commented next lines).
        line = stripCommentsAndAfter(line)
    }
    debugPrint('rawLine: >>>' + rawLine + '<<<')
    debugPrint('   line: >>>' + line + '<<<')

    const { strMarkerChars, strSectionName, strNumberPart, isBacktickedName } =
        extractHeaderParts(rawLine, errorHandlerInstance, ctx)
    // extractHeaderParts(rawLine)
    debugPrint('  strMarkerChars: ' + strMarkerChars)
    debugPrint('  strSectionName: ' + strSectionName)
    debugPrint('   strNumberPart: ' + strNumberPart)
    debugPrint('isBacktickedName: ' + isBacktickedName)

    let headerMarkerType: TSectionHeaderType
    let sectionName = ''
    let level = 0

    if (strMarkerChars === '') {
        errorHandlerInstance.pushOrBail(
            ctx,
            'Syntax-Error',
            'Unknown section header marker type',
            'Section header marker type could not be identified, header text: ' +
                rawLine,
        )
    }

    // --- Determing level and headerMarkerType ------------------------
    if (strNumberPart === '') {
        headerMarkerType = 'Classic-Header-Marker'

        level = strMarkerChars.length
        if (strNumberPart !== '') {
            errorHandlerInstance.pushOrBail(
                ctx,
                'Syntax-Error',
                'Invalid extra input in section header of a repeating marker characters: ' +
                    strNumberPart,
                'Classic section header markers may not include any numbers after, correct header markers looks like ^ Title, ^^ Title, ^^^ Title, etc.',
            )
        }
    } else {
        headerMarkerType = 'Numeric-Header-Marker'
        try {
            level = Number.parseInt(strNumberPart)
        } catch (err) {
            errorHandlerInstance.pushOrBail(
                ctx,
                'Syntax-Error',
                'No number in this shorthand section header marker found',
                'This shorthand section header marker could not be parse correctly, section header text: ' +
                    line +
                    ', raw: ' +
                    rawLine,
            )
        }
    }
    // ---------------------------------------------------------------

    // --- Check level contraints based on headerMarkerType ----------
    if (headerMarkerType === 'Classic-Header-Marker') {
        if (level > 6) {
            errorHandlerInstance.pushOrBail(
                ctx,
                'Syntax-Error',
                'Invalid number of repeating marker characters: ' +
                    strMarkerChars,
                'It is invalid to use seven or more section marker characters in succession (e.g. ^^^^^^^). However, to represent nesting levels deeper than 6, you may switch to the numeric shorthand section header syntax, e.g. ^7.',
            )
        }
    } else {
        if (level < 1) {
            errorHandlerInstance.pushOrBail(
                ctx,
                'Syntax-Error',
                'Invalid number in numeric shorthand section marker: ' +
                    strMarkerChars,
                'The number in a numeric shorthand section marker must be 1 or higher, e.g. ^1, ^2, ^3, etc.',
            )
        }
    }
    // ---------------------------------------------------------------

    // --- Check naming contraints based on isBacktickedName ----------
    const lenOfName = strSectionName.length
    if (!isBacktickedName) {
        if (lenOfName <= 0) {
            errorHandlerInstance.pushOrBail(
                ctx,
                'Syntax-Error',
                'Invalid section name in repeating marker characters header, section name: "' +
                    strSectionName +
                    '"',
            )
        }
        if (!(isAlpha(strSectionName.charAt(0)) || strSectionName === '_')) {
            errorHandlerInstance.pushOrBail(
                ctx,
                'Syntax-Error',
                'Invalid name in this section header, section name: "' +
                    strSectionName +
                    '"',
                'Section name must start with: A-Z, a-z, or _, unless enclosed in backticks e.g. `' +
                    strSectionName +
                    '`, `My section name`.',
            )
        }
    }
    // ---------------------------------------------------------------

    debugPrint('                        --------------')
    debugPrint(`           rawLine = >>>${rawLine}<<<`)
    debugPrint('           level: ' + level)
    debugPrint('     sectionName: ' + sectionName)
    debugPrint('headerMarkerType: ' + headerMarkerType)
    debugPrint('                        --------------')

    return {
        headerMarkerType,
        sectionName: strSectionName,
        level,
    }
}

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
 * @note Returns the parts as strings; each part needs to be analyzed separately against the contraints in the specifications.
 * @returns An object with the identified header parts: marker characters, parsed name, and parsed level string.
 */
export const extractHeaderParts = (
    rawLine: string,
    errorHandlerInstance: ErrorDataHandler | null = null,
    ctx: SectionContext | null = null, // For error reporting.
    // ): TSectionHeaderType | TErrorDetectMarkerType => {
): {
    strMarkerChars: string
    strSectionName: string
    strNumberPart: string
    isBacktickedName: boolean
} => {
    debugPrint('-> Entered extractHeaderParts(..)')

    rawLine = rawLine.trim()

    //@todo, change to use extractSignificantYiniLine(..)

    let str = ''
    if (splitLines(rawLine).length > 1) {
        debugPrint(
            'Detected rawLine (in parseSectionHeader(..)) having multiple row lines, leaving rawLine as is without stripping possible end content.',
        )
        str = rawLine
    } else {
        debugPrint(
            'Detected rawLine (in parseSectionHeader(..)) having max 1 row line, stripping possible end content.',
        )
        str = stripNLAndAfter(rawLine) // Cut of anything after (and including) any newline (and possible commented next lines).
        str = stripCommentsAndAfter(str)
    }
    debugPrint('rawLine: >>>' + rawLine + '<<<')
    debugPrint('    str: >>>' + str + '<<<')

    // Edge case: empty line.
    if (!str) {
        errorHandlerInstance!.pushOrBail(
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

    // 2. Collect marker(s): ^, ~, §, €.
    while (
        pos < len &&
        (str[pos] === '^' ||
            str[pos] === '~' ||
            str[pos] === '\u00A7' ||
            str[pos] === '\u20AC')
    ) {
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
        sectionNamePart = trimBackticks(sectionNamePart)
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

// export const extractClassicSectionHeader = (
//     rawHeaderLine: string,
//     errorHandlerInstance: ErrorDataHandler,
//     ctx: SectionContext, // For error reporting.
// ): any => {
//     let line = rawHeaderLine.trim()
//     line = stripNLAndAfter(line) // Cut of anything after (and including) any newline (and possible commented next lines).
//     line = stripCommentsAndAfter(line)

//     // --- Determine nesting level. ---------
//     const lineLen: number = line.length
//     // this.prevLevel = this.level
//     let level = 0 // One-based, level 1 is the first level.

//     for (let pos = 0; pos < lineLen; pos++) {
//         if (
//             line.charAt(pos) === SECTION_MARKER1 ||
//             line.charAt(pos) === SECTION_MARKER2
//         ) {
//             level++
//         } else {
//             break
//         }
//     }
//     debugPrint('Extracted level = ' + level)

//     // ONLY if repeating marker
//     // if (headerMarkerType === 'Classic-Header-Marker' && level >= 7) {
//     //     errorHandlerInstance.pushOrBail(
//     //         ctx,
//     //         'Syntax-Error',
//     //         'Invalid number of repeating characters in marker: ' +
//     //             level +
//     //             ' repeating characters in a marker in succession in a section head marker is not allowed.',
//     //         'Using seven or more of the same marker in succession (e.g. ^^^^^^^) is invalid. However, to represent nesting levels deeper than 6, you may switch to the numeric shorthand section header syntax.',
//     //     )
//     // }
//     // ------------------------------------

//     // --- Extract section name after markers and whitespace. ---------
//     let subLine: string = line.substring(level)
//     let isDone = false
//     do {
//         if (subLine.startsWith(' ') || subLine.startsWith('\t')) {
//             subLine = subLine.substring(1) // Consume left most character.
//             debugPrint('* consumed left most char!!')
//         } else {
//             isDone = true
//         }
//     } while (!isDone)

//     // NOTE: Any comments on next line after the section header, are
//     // included in subLine, these must be stripped.
//     let sectionName: string = subLine.trim()

//     if (isDigit(sectionName.charAt(0))) {
//         errorHandlerInstance.pushOrBail(
//             ctx,
//             'Syntax-Error',
//             'Unknown section header marker type!',
//             'Section header marker type could not be identified, header text: ' +
//                 line +
//                 ', raw: ' +
//                 rawHeaderLine,
//         )
//     }

//     // sectionName = stripNLAndAfter(sectionName) // Cut of anything after (and including) any newline (and possible commented next lines).
//     // sectionName = stripCommentsAndAfter(sectionName)
//     sectionName = trimBackticks(sectionName)
//     sectionName = sectionName.trim()

//     debugPrint('                        --------------')
//     debugPrint(
//         `           Parsed subLine = >>>${subLine.trim()}<<<, with level = ${level}`,
//     )
//     debugPrint(
//         `Strip/trimmed sectionName = >>>${sectionName}<<<, with level = ${level}`,
//     )
//     debugPrint('                        --------------')

//     return {
//         sectionName,
//         level: level,
//         headerMarkerType: 'Classic-Header-Marker',
//     }
// }

// export const extractNumericSectionHeader = (
//     rawHeaderLine: string,
//     errorHandlerInstance: ErrorDataHandler,
//     ctx: SectionContext, // For error reporting.
// ): any => {
//     return 'ERROR'
// }

export default parseSectionHeader
