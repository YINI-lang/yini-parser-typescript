import { isDebug } from '../config/env'
import { ErrorDataHandler } from '../ErrorDataHandler'
import { SectionContext } from '../grammar/YiniParser'
import { TSectionHeaderType } from '../types'
import {
    stripCommentsAndAfter,
    stripNLAndAfter,
    trimBackticks,
} from '../utils/string'
import { debugPrint } from '../utils/system'

const SECTION_MARKER1 = '^'
const SECTION_MARKER2 = '~'

/**
 * Extract ...
 * @param rawLine Raw line with the section header.
 */
const parseSectionHeader = (
    rawLine: string,
    errorHandlerInstance: ErrorDataHandler,
    ctx: SectionContext, // For error reporting.
): {
    sectionName: string
    level: number
    headerMarkerType: TSectionHeaderType
} => {
    debugPrint('-> Entered parseSectionHeader(..)')

    let line = stripNLAndAfter(rawLine) // Cut of anything after (and including) any newline (and possible commented next lines).
    line = stripCommentsAndAfter(line)

    const headerMarkerType: TSectionHeaderType | null =
        identifySectionHeaderType(line)
    debugPrint('Identified headerMarkerType: ' + headerMarkerType)
    debugPrint('                     line: ' + line)
    debugPrint('                  rawLine: ' + rawLine)

    if (headerMarkerType === null) {
        errorHandlerInstance.pushOrBail(
            ctx,
            'Syntax-Error',
            'Unknown section header marker type!',
            'Section header marker type could not be identified, header text: ' +
                line +
                ', raw: ' +
                rawLine,
        )
    } else if (headerMarkerType === 'Numeric-Header-Marker') {
        const firstChar = line[0]
        const rest = line.slice(1)

        debugPrint('                firstChar: ' + firstChar)
        debugPrint('                     rest: ' + rest)

        let errorParseState = 'Invalid numeric shorthand section header'

        let sectionName = ''
        let level = 0

        // @todo parse out the numeric part och rest part correctly
        /*
        continue with parsing correctly, a loop that check when a numeric char swithces to non-numeric char...
         */
        /*
        if (
            line.length > 1 &&
            [SECTION_MARKER1, SECTION_MARKER2].includes(firstChar) &&
            /^\d+$/.test(numberPart) &&
            parseInt(numberPart, 10) > 0
        ) {
            // --start------------
            let xSpace = line.indexOf(' ')
            let xTab = line.indexOf('\t')

            if (xSpace < 0) xSpace = Number.MAX_SAFE_INTEGER
            if (xTab < 0) xTab = Number.MAX_SAFE_INTEGER

            const firstSpaceOrTab = Math.min(xSpace, xTab)
            if (firstSpaceOrTab === Number.MAX_SAFE_INTEGER)
                errorParseState = 'No space or tab found'
            // ---end-----------

            sectionName = line.slice(firstSpaceOrTab + 1).trim()
            sectionName = trimBackticks(sectionName)
            sectionName = sectionName.trim()

            if (!sectionName) errorParseState = 'No section name found' // No section name.

            level = parseInt(numberPart, 10)
            if (level < 1) {
                errorParseState = 'Section level less than 1'
            } else {
                errorParseState = ''
            }
        }
*/
        if (!errorParseState) {
            return {
                sectionName: sectionName,
                level: level,
                headerMarkerType: 'Numeric-Header-Marker',
            }
        } else {
            errorHandlerInstance.pushOrBail(
                ctx,
                'Syntax-Error',
                errorParseState,
                'This numberic shorthand section header marker, could not be parse correctly, header text: ' +
                    line +
                    ', raw: ' +
                    rawLine,
            )
        }
    }

    // Then it must be Classic-Header-Marker, we assume.

    // --- Determine nesting level. ---------
    const lineLen: number = line.length
    // this.prevLevel = this.level
    let level = 0 // One-based, level 1 is the first level.

    for (let pos = 0; pos < lineLen; pos++) {
        if (
            line.charAt(pos) === SECTION_MARKER1 ||
            line.charAt(pos) === SECTION_MARKER2
        ) {
            level++
        } else {
            break
        }
    }
    debugPrint('Extracted level = ' + level)

    // ONLY if repeating marker
    if (headerMarkerType === 'Classic-Header-Marker' && level >= 7) {
        errorHandlerInstance.pushOrBail(
            ctx,
            'Syntax-Error',
            'Invalid number of repeating characters in marker: ' +
                level +
                ' repeating characters in a marker in succession in a section head marker is not allowed.',
            'Using seven or more of the same marker in succession (e.g. ^^^^^^^) is invalid. However, to represent nesting levels deeper than 6, you may switch to the numeric shorthand section header syntax.',
        )
    }
    // ------------------------------------

    // --- Extract section name after markers and whitespace. ---------
    let subLine: string = line.substring(level)
    let isDone = false
    do {
        if (subLine.startsWith(' ') || subLine.startsWith('\t')) {
            subLine = subLine.substring(1) // Consume left most character.
            debugPrint('* consumed left most char!!')
        } else {
            isDone = true
        }
    } while (!isDone)

    // NOTE: Any comments on next line after the section header, are
    // included in subLine, these must be stripped.
    let sectionName: string = subLine.trim()
    // sectionName = stripNLAndAfter(sectionName) // Cut of anything after (and including) any newline (and possible commented next lines).
    // sectionName = stripCommentsAndAfter(sectionName)
    sectionName = trimBackticks(sectionName)
    sectionName = sectionName.trim()

    debugPrint('                        --------------')
    debugPrint(
        `           Parsed subLine = >>>${subLine.trim()}<<<, with level = ${level}`,
    )
    debugPrint(
        `Strip/trimmed sectionName = >>>${sectionName}<<<, with level = ${level}`,
    )
    debugPrint('                        --------------')

    return {
        sectionName,
        level: level,
        headerMarkerType: 'Classic-Header-Marker',
    }
}

/**
 * @param rawHeaderLine Raw line with the section header.
 * @returns 'Classic-Header-Marker', 'Numeric-Header-Marker' or null/undefined if failed.
 */
const identifySectionHeaderType = (
    rawHeaderLine: string,
): TSectionHeaderType | null => {
    debugPrint('-> Entered identifySectionHeaderType(..)')

    let str = rawHeaderLine.trim()

    // Edge case: empty line
    if (!str) return null

    // --start------------
    let xSpace = str.indexOf(' ')
    let xTab = str.indexOf('\t')

    if (xSpace < 0) xSpace = Number.MAX_SAFE_INTEGER
    if (xTab < 0) xTab = Number.MAX_SAFE_INTEGER

    const firstSpaceOrTab = Math.min(xSpace, xTab)
    if (firstSpaceOrTab === Number.MAX_SAFE_INTEGER) return null
    // ---end-----------

    const marker = str.slice(0, firstSpaceOrTab)
    const rest = str.slice(firstSpaceOrTab + 1).trim()
    if (!rest) return null // No section name.

    // Check if Classic: All the same marker character, and length <= 6, and no digits (e.g. "^^" or "~~~~~").
    if (
        marker.length >= 1 &&
        marker.length <= 6 &&
        marker.split('').every((c) => c === marker[0]) &&
        !/\d/.test(marker)
    ) {
        return 'Classic-Header-Marker'
    }

    // Check if Numeric shorthand: Single marker char, then digits (e.g. "^7", "~42")
    const firstChar = marker[0]
    const numberPart = marker.slice(1)

    if (
        marker.length > 1 &&
        [SECTION_MARKER1, SECTION_MARKER2].includes(firstChar) &&
        /^\d+$/.test(numberPart)
    ) {
        return 'Numeric-Header-Marker'
    }

    return null
}

export default parseSectionHeader
