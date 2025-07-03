import { isDebug } from '../config/env'
import { SectionContext } from '../grammar/YiniParser'
import { InvalidDataHandler } from '../InvalidDataHandler'
import { THeadMarkerStyle } from '../types'
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
 */
const parseSectionHead = (
    rawLine: string,
    instanceInvalidData: InvalidDataHandler,
    ctx: SectionContext, // For error reporting.
): {
    sectionName: string
    level: number
    headMarkerStyle: THeadMarkerStyle
} => {
    debugPrint('-> Entered parseSectionHead(..)')
    // --- Determine nesting level. ---------
    const lineLen: number = rawLine.length
    // this.prevLevel = this.level
    let level = 0 // One-based, level 1 is the first level.

    for (let pos = 0; pos < lineLen; pos++) {
        if (
            rawLine.charAt(pos) === SECTION_MARKER1 ||
            rawLine.charAt(pos) === SECTION_MARKER2
        ) {
            level++
        } else {
            break
        }
    }
    debugPrint('Extracted level = ' + level)

    // NOTE: Currently only supports extraction of Repeating-Character-Section-Marker.
    const headMarkerStyle: THeadMarkerStyle =
        'Repeating-Character-Section-Marker'

    // ONLY if repeating marker
    if (
        headMarkerStyle === 'Repeating-Character-Section-Marker' &&
        level >= 7
    ) {
        instanceInvalidData!.pushOrBail(
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
    let subLine: string = rawLine.substring(level)
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
    sectionName = stripNLAndAfter(sectionName) // Cut of anything after (and including) any newline (and possible commented next lines).
    sectionName = stripCommentsAndAfter(sectionName)
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
        headMarkerStyle: 'Repeating-Character-Section-Marker',
    }
}

export default parseSectionHead
