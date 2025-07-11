import { isDebug } from '../config/env'
import { ErrorDataHandler } from '../core/ErrorDataHandler'
import { TSectionHeaderType } from '../core/types'
import { SectionContext } from '../grammar/YiniParser'
import extractHeaderParts from '../parsers/extractHeaderParts'
import { extractYiniLine } from '../parsers/extractSignificantYiniLine'
import { isAlpha } from '../utils/string'
import { debugPrint } from '../utils/system'

/**
 * Extract ...
 * @param rawLine Raw line with the section header.
 */
const parseSectionHeader = (
    rawLine: string,
    errorHandler: ErrorDataHandler,
    ctx: null | SectionContext, // For error reporting.
): {
    markerType: TSectionHeaderType // Header marker type.
    sectionName: string
    sectionLevel: number
} => {
    debugPrint('-> Entered parseSectionHeader(..)')

    rawLine = rawLine.trim()

    const line = extractYiniLine(rawLine)
    debugPrint('                  rawLine: >>>' + rawLine + '<<<')
    debugPrint('extractYiniLine(..), line: >>>' + line + '<<<')

    const { strMarkerChars, strSectionName, strNumberPart, isBacktickedName } =
        extractHeaderParts(rawLine, errorHandler, ctx)
    debugPrint('In parseSectionHeader(..), after extractHeaderParts(..):')
    debugPrint('  strMarkerChars: ' + strMarkerChars)
    debugPrint('  strSectionName: ' + strSectionName)
    debugPrint('   strNumberPart: ' + strNumberPart)
    debugPrint('isBacktickedName: ' + isBacktickedName)

    let headerMarkerType: TSectionHeaderType
    let level = 0

    if (strMarkerChars === '') {
        errorHandler.pushOrBail(
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
            errorHandler.pushOrBail(
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
            errorHandler.pushOrBail(
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
            errorHandler.pushOrBail(
                ctx,
                'Syntax-Error',
                'Invalid number of repeating marker characters: ' +
                    strMarkerChars,
                'It is invalid to use seven or more section marker characters in succession (e.g. ^^^^^^^). However, to represent nesting levels deeper than 6, you may switch to the numeric shorthand section header syntax, e.g. ^7.',
            )
        }
    } else {
        if (level < 1) {
            errorHandler.pushOrBail(
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
            errorHandler.pushOrBail(
                ctx,
                'Syntax-Error',
                'Invalid section name in repeating marker characters header, section name: "' +
                    strSectionName +
                    '"',
            )
        }
        if (!(isAlpha(strSectionName.charAt(0)) || strSectionName === '_')) {
            errorHandler.pushOrBail(
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
    debugPrint('<- About to leave parseSectionHeader(..)')
    debugPrint(`    rawLine = >>>${rawLine}<<<`)
    debugPrint(`       line = >>>${line}<<<`)
    debugPrint()
    debugPrint('identified level: ' + level)
    debugPrint('     sectionName: ' + strSectionName)
    debugPrint('headerMarkerType: ' + headerMarkerType)
    debugPrint('                        --------------')

    return {
        markerType: headerMarkerType,
        sectionName: strSectionName,
        sectionLevel: level,
    }
}

export default parseSectionHeader
