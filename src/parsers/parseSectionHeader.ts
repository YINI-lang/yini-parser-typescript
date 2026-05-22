// src/parsers/parseSectionHeader.ts
import { ErrorDataHandler, toErrorLocation } from '../core/errorDataHandler'
import { TSectionHeaderType } from '../core/internalTypes'
import { StmtContext } from '../grammar/generated/YiniParser'
import extractHeaderParts from '../parsers/extractHeaderParts'
import { extractYiniLine } from '../parsers/extractSignificantYiniLine'
import { debugPrint } from '../utils/print'
import { trimBackticks } from '../utils/string'
import {
    countRepeatedSectionMarkers,
    hasInvalidSectionMarkerSeparatorPlacement,
    hasMixedSectionMarkers,
    isValidBacktickedIdent,
    isValidSimpleIdent,
    MAX_REPEATED_SECTION_MARKER_DEPTH,
    MAX_SECTION_DEPTH,
} from '../utils/yiniHelpers'

/**
 * Extract ...
 * @param rawLine Raw line with the section header.
 * @note Implemented without regexp to keep it less cryptic, etc.
 */
const parseSectionHeader = (
    rawLine: string,
    errorHandler: ErrorDataHandler,
    ctx: null | StmtContext, // For error reporting.
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

    let { strMarkerChars, strSectionName, strNumberPart, isBacktickedName } =
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
            toErrorLocation(ctx),
            'Syntax-Error',
            'Unknown section header marker type',
            'Section header marker type could not be identified, header text: ' +
                rawLine,
        )
    }

    // --- Determing level and headerMarkerType ------------------------
    if (strNumberPart === '') {
        headerMarkerType = 'Classic-Header-Marker'

        if (hasMixedSectionMarkers(strMarkerChars)) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Mixed section marker characters are not allowed.',
                `Got '${strMarkerChars}'. A repeated section marker sequence must use only one marker kind.`,
            )
        }

        if (hasInvalidSectionMarkerSeparatorPlacement(strMarkerChars)) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Invalid section marker separator placement.',
                `Got '${strMarkerChars}'. Section marker separators '_' may appear only between repeated occurrences of the same marker character.`,
            )
        }

        level = countRepeatedSectionMarkers(strMarkerChars)
    } else {
        headerMarkerType = 'Numeric-Header-Marker'

        if (strMarkerChars.includes('_')) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Invalid separator in numeric shorthand section header.',
                `Numeric shorthand section headers must not contain '_'. Got '${strMarkerChars}${strNumberPart}'.`,
            )
        }

        level = Number.parseInt(strNumberPart, 10)

        if (Number.isNaN(level)) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Invalid numeric shorthand section depth.',
                `Could not parse '${strNumberPart}' as a section depth.`,
            )
        }
    }

    if (level > MAX_SECTION_DEPTH) {
        errorHandler.pushOrBail(
            toErrorLocation(ctx),
            'Syntax-Error',
            'Section depth exceeds the maximum supported depth.',
            `Got section depth ${level}. The maximum supported section depth is ${MAX_SECTION_DEPTH}.`,
        )
    }

    // ---------------------------------------------------------------

    // --- Check level contraints based on headerMarkerType ----------
    if (
        headerMarkerType === 'Classic-Header-Marker' &&
        level > MAX_REPEATED_SECTION_MARKER_DEPTH
    ) {
        errorHandler.pushOrBail(
            toErrorLocation(ctx),
            'Syntax-Error',
            'Too many repeated section marker characters.',
            `Repeated/basic section markers may express levels 1–${MAX_REPEATED_SECTION_MARKER_DEPTH}. Got level ${level}.`,
            `For levels ${MAX_REPEATED_SECTION_MARKER_DEPTH + 1} and deeper, use numeric shorthand, for example '^10 Section'.`,
        )
    } else {
        if (level < 1) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
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
    if (isBacktickedName) {
        if (!isValidBacktickedIdent(strSectionName)) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Invalid section header name "' + strSectionName + '"',
                'Section name should be backticked like e.g. `My section name`.',
            )
        }
    } else {
        debugPrint('Naming contraints: Is not a BacktickedName')
        if (lenOfName <= 0) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Invalid section name in repeating marker characters header, section name: "' +
                    strSectionName +
                    '"',
            )
        }

        if (!isValidSimpleIdent(strSectionName)) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Invalid section header name "' + strSectionName + '"',
                'Section name must start with: A-Z, a-z, or _, unless enclosed in backticks e.g. `' +
                    strSectionName +
                    '`, `My section name`.',
            )
        }

        strSectionName = trimBackticks(strSectionName)
    }
    // ---------------------------------------------------------------
    // strSectionName = trimBackticks(strSectionName)

    debugPrint('                        --------------')
    debugPrint('<- About to leave parseSectionHeader(..)')
    debugPrint(`    rawLine = >>>${rawLine}<<<`)
    debugPrint(`       line = >>>${line}<<<`)
    debugPrint()
    debugPrint('identified level: ' + level)
    debugPrint('     SectionName: ' + strSectionName)
    debugPrint('headerMarkerType: ' + headerMarkerType)
    debugPrint('                        --------------')

    return {
        markerType: headerMarkerType,
        sectionName: strSectionName,
        sectionLevel: level,
    }
}

export default parseSectionHeader
