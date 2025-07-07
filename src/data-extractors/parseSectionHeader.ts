import { isDebug } from '../config/env'
import { ErrorDataHandler } from '../ErrorDataHandler'
import { SectionContext } from '../grammar/YiniParser'
import { TErrorIdentifyMarkerType, TSectionHeaderType } from '../types'
import {
    isAlpha,
    isDigit,
    stripCommentsAndAfter,
    stripNLAndAfter,
    trimBackticks,
} from '../utils/string'
import { debugPrint } from '../utils/system'

const SECTION_MARKER1 = '^'
const SECTION_MARKER2 = '~'

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
    sectionName: string
    level: number
    headerMarkerType: TSectionHeaderType
} => {
    debugPrint('-> Entered parseSectionHeader(..)')

    let line = stripNLAndAfter(rawLine) // Cut of anything after (and including) any newline (and possible commented next lines).
    line = stripCommentsAndAfter(line)

    const headerMarkerType: TSectionHeaderType | TErrorIdentifyMarkerType =
        identifySectionMarkerType(line)
    debugPrint('Identified headerMarkerType: ' + headerMarkerType)
    debugPrint('                     line: ' + line)
    debugPrint('                  rawLine: ' + rawLine)

    if (
        // headerMarkerType !== 'Classic-Header-Marker' ||
        // headerMarkerType !== 'Numeric-Header-Marker'
        headerMarkerType?.includes('ERROR')
    ) {
        errorHandlerInstance.pushOrBail(
            ctx,
            'Syntax-Error',
            'Unknown section header marker type!',
            'Section header marker type could not be identified, header text: ' +
                line +
                ', raw: ' +
                rawLine,
        )
    }

    if (headerMarkerType === 'Numeric-Header-Marker') {
        debugPrint('IDENTIFIED as "Numeric-Header-Marker"')
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
 * @note Only the header marker type itself will be identified, NOT the level NOR the header name.
 * @returns 'Classic-Header-Marker', 'Numeric-Header-Marker' or null/undefined if failed.
 */
export const identifySectionMarkerType = (
    rawHeaderLine: string,
): TSectionHeaderType | TErrorIdentifyMarkerType => {
    debugPrint('-> Entered identifySectionMarkerType(..)')

    let str = rawHeaderLine.trim()
    // str = stripNLAndAfter(str) // Cut of anything after (and including) any newline (and possible commented next lines).
    // str = stripCommentsAndAfter(str)

    debugPrint('                     str: ' + str)
    debugPrint('           rawHeaderLine: ' + rawHeaderLine)

    // Edge case: empty line
    if (!str) return 'ERROR-Blank-Section-Header'

    type TState =
        | 'Start'
        | 'At-Marker-Character'
        | 'At-Number-Part'
        | 'At-Optional-Delimeter'
        | 'At-Section-Name-Ident'
        | 'At-Section-Name-Backt'
        | 'Done-Looks-Like-Classic'
        | 'Done-Looks-Like-Numeric'

    let state = 'Start'
    let ch = ''
    let prevCh = ''
    let numOfFoundMarkerCharacters = 0

    const len = str.length
    for (let pos = 0; pos < len; pos++) {
        prevCh = ch
        ch = str.charAt(pos)

        let isRoundOk: boolean = false
        let isIdentDone: boolean = false
        let isSeemsLikeClassic = false

        debugPrint('--')
        debugPrint('state: ' + state)
        debugPrint('ch = >>>' + ch + '<<<')
        switch (state) {
            case 'Start':
                if (isMarkerCharacter(ch)) {
                    state = 'At-Marker-Character'
                    numOfFoundMarkerCharacters = 1
                    isRoundOk = true
                }
                break
            case 'At-Marker-Character':
                if (isMarkerCharacter(ch)) {
                    numOfFoundMarkerCharacters++
                    isRoundOk = true
                } else if (isDigit(ch)) {
                    state = 'At-Number-Part'
                    isSeemsLikeClassic = false
                    isRoundOk = true
                } else if (isAlpha(ch) || ch === '_') {
                    state = 'At-Section-Name-Ident'
                    isRoundOk = true
                } else if (ch === '`') {
                    state = 'At-Section-Name-Backt'
                    isRoundOk = true
                } else if (ch === ' ' || ch === '\t') {
                    state = 'At-Optional-Delimeter'
                    isRoundOk = true
                }
                break
            case 'At-Number-Part':
                if (isDigit(ch)) {
                    state = 'At-Number-Part'
                    isRoundOk = true
                }
            case 'At-Optional-Delimeter':
                if (ch === ' ' || ch === '\t') {
                    state = 'At-Optional-Delimeter'
                    isRoundOk = true
                } else if (isAlpha(ch) || ch === '_') {
                    state = 'At-Section-Name-Ident'
                    isRoundOk = true
                } else if (ch === '`') {
                    state = 'At-Section-Name-Backt'
                    isRoundOk = true
                }
                break
            case 'At-Section-Name-Ident':
                if (isDigit(ch) || isAlpha(ch) || ch === '_') {
                    if (isSeemsLikeClassic) {
                        state = 'Done-Looks-Like-Classic'
                        isRoundOk = true
                    } else {
                        state = 'Done-Looks-Like-Numeric'
                        isRoundOk = true
                    }
                }
                break
            case 'At-Section-Name-Backt':
                if (
                    ch === '`' ||
                    ch === ' ' ||
                    isDigit(ch) ||
                    isAlpha(ch) ||
                    ch === '_' ||
                    ch === '-'
                ) {
                    if (isSeemsLikeClassic) {
                        state = 'Done-Looks-Like-Classic'
                        isRoundOk = true
                    } else {
                        state = 'Done-Looks-Like-Numeric'
                        isRoundOk = true
                    }
                }
                break
            case 'Done-Looks-Like-Classic':
                if (
                    numOfFoundMarkerCharacters <= 6 &&
                    numOfFoundMarkerCharacters > 0
                ) {
                    isIdentDone = true
                    // Ok, if we land here, it looks like a classic marker header.
                    return 'Classic-Header-Marker'
                } else {
                    return 'ERROR-Too-Many-Marker-Chars-In-Classic'
                }
                break
            case 'Done-Looks-Like-Numeric':
                if (numOfFoundMarkerCharacters === 1) {
                    isIdentDone = true
                    // Ok, if we land here, it looks like a numeric shorthand marker header.
                    return 'Numeric-Header-Marker'
                } else {
                    return 'ERROR-Too-Many-Marker-Chars-In-Numeric'
                }
                break
        }

        if (isIdentDone) {
            break
        }

        if (!isRoundOk) {
            return 'ERROR-Unknown-Section-Header-Type'
        }
    }

    debugPrint()
    debugPrint('<- About to leave identifySectionMarkerType(..)')

    debugPrint('               Final state: ' + state)
    debugPrint('numOfFoundMarkerCharacters: ' + numOfFoundMarkerCharacters)

    debugPrint()

    if (state === 'Done-Looks-Like-Classic')
        // let xSpace = str.charAt().indexOf(' ')
        // let xTab = str.indexOf('\t')

        // if (xSpace < 0) xSpace = Number.MAX_SAFE_INTEGER
        // if (xTab < 0) xTab = Number.MAX_SAFE_INTEGER

        // const firstSpaceOrTab = Math.min(xSpace, xTab)
        // if (firstSpaceOrTab === Number.MAX_SAFE_INTEGER) return null
        // // ---end-----------

        // const marker = str.slice(0, firstSpaceOrTab)
        // const rest = str.slice(firstSpaceOrTab + 1).trim()
        // if (!rest) return null // No section name.

        // // Check if Classic: All the same marker character, and length <= 6, and no digits (e.g. "^^" or "~~~~~").
        // if (
        //     marker.length >= 1 &&
        //     marker.length <= 6 &&
        //     marker.split('').every((c) => c === marker[0]) &&
        //     !/\d/.test(marker)
        // ) {
        //     return 'Classic-Header-Marker'
        // }

        // // Check if Numeric shorthand: Single marker char, then digits (e.g. "^7", "~42")
        // const firstChar = marker[0]
        // const numberPart = marker.slice(1)

        // if (
        //     marker.length > 1 &&
        //     [SECTION_MARKER1, SECTION_MARKER2].includes(firstChar) &&
        //     /^\d+$/.test(numberPart)
        // ) {
        //     return 'Numeric-Header-Marker'
        // }

        return 'ERROR-Blank-Section-Header'
}

export default parseSectionHeader
