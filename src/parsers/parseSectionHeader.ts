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
    normalizeRepeatedSectionMarkerSequence,
} from '../utils/yiniHelpers'

/**
 * Parses a YINI section header line and returns the marker type,
 * section name, and resolved section depth.
 *
 * Supports:
 * - Repeated markers: ^ Section, ^^ Section, ^^^_^^^_^ Section.
 * - Numeric shorthand markers: ^10 Section.
 * - Alternative section marker characters handled by extractHeaderParts(..).
 *
 * @param rawLine Raw line containing the section header.
 * @param errorHandler Error handler used for diagnostics.
 * @param ctx Parser context used for error location reporting.
 */
const parseSectionHeader = (
    rawLine: string,
    errorHandler: ErrorDataHandler,
    ctx: null | StmtContext,
): {
    markerType: TSectionHeaderType
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
            'Unknown section header marker type.',
            'Section header marker type could not be identified.',
            `Header text: ${rawLine}`,
        )
    }

    // ---------------------------------------------------------------------
    // Determine section marker type and depth.
    // ---------------------------------------------------------------------

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
                'Examples of valid forms: ^^, ^^^_^^^, ^^^_^^^_^.',
            )
        }

        try {
            strMarkerChars =
                normalizeRepeatedSectionMarkerSequence(strMarkerChars)
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err)

            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Invalid section marker separator placement.',
                message,
                `Got '${strMarkerChars}'.`,
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
                "Use numeric shorthand like '^10 Section', not '^_10 Section'.",
            )
        }

        level = Number.parseInt(strNumberPart, 10)

        if (Number.isNaN(level)) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Invalid numeric shorthand section depth.',
                `Could not parse '${strNumberPart}' as a section depth.`,
                'Use a positive integer, for example: ^1 Section, ^2 Section, or ^10 Section.',
            )
        }
    }

    // ---------------------------------------------------------------------
    // Validate resolved section depth.
    // ---------------------------------------------------------------------

    if (level < 1) {
        errorHandler.pushOrBail(
            toErrorLocation(ctx),
            'Syntax-Error',
            'Invalid section depth.',
            `Section depth must be 1 or higher. Got ${level}.`,
        )
    }

    if (level > MAX_SECTION_DEPTH) {
        errorHandler.pushOrBail(
            toErrorLocation(ctx),
            'Syntax-Error',
            'Section depth exceeds the maximum supported depth.',
            `Got section depth ${level}. The maximum supported section depth is ${MAX_SECTION_DEPTH}.`,
        )
    }

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
    }

    // ---------------------------------------------------------------------
    // Validate section name.
    // ---------------------------------------------------------------------

    const lenOfName = strSectionName.length

    if (isBacktickedName) {
        if (!isValidBacktickedIdent(strSectionName)) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                `Invalid section header name "${strSectionName}".`,
                'Backticked section names must be enclosed in backticks, for example: `My section name`.',
            )
        }

        strSectionName = trimBackticks(strSectionName)
    } else {
        debugPrint('Naming constraints: Is not a BacktickedName.')

        if (lenOfName <= 0) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                'Missing section name.',
                `Invalid section header: '${rawLine}'.`,
                'A section header must contain a marker and a section name, for example: ^ App.',
            )
        } else if (!isValidSimpleIdent(strSectionName)) {
            errorHandler.pushOrBail(
                toErrorLocation(ctx),
                'Syntax-Error',
                `Invalid section header name "${strSectionName}".`,
                'Section names must start with A-Z, a-z, or _, unless enclosed in backticks.',
                `Use ${strSectionName} only if it is a valid simple identifier, or write it as \`${strSectionName}\`.`,
            )
        }
    }

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
