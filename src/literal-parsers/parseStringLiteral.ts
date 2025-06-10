import { debugPrint, isDebug } from '../utils/general'

// export default parseStringLiteral

const parseStringLiteral = (raw: string): string => {
    debugPrint('-> Entered parseStringLiteral(..)')
    debugPrint('raw = >>>' + raw + '<<<')

    /*
            Extracts an optional prefix (C, c, H, or h) and identifies whether
            the string is triple-quoted, double-quoted, or single-quoted.
        */
    const prefixMatch = raw.match(/^(C|c|H|h|R|r)?("""|"|')/)
    debugPrint('prefixMatch:')
    if (isDebug()) {
        console.debug(prefixMatch)
    }

    let prefix = prefixMatch ? prefixMatch[1]?.toUpperCase() : ''
    debugPrint('          prefix = ' + prefix)

    let quoteType = prefixMatch ? prefixMatch[2] : ''
    debugPrint('       quoteType = ' + quoteType)
    debugPrint('quoteType.length = ' + quoteType.length)

    // Extracts the substring after removing the initial prefix (if any)
    // and quotes at the start (prefix.length + quoteType.length) and the
    // quotes at the end (-quoteType.length).
    let inner = raw.slice(
        (prefix?.length || 0) + quoteType.length,
        -quoteType.length,
    )
    debugPrint('inner (raw) = ' + inner)

    if (prefix === 'C') {
        inner = inner
            .replace(/\\n/g, '\n')
            .replace(/\\t/g, '\t')
            .replace(/\\r/g, '\r')
    } else if (prefix === 'H') {
        inner = inner.replace(/[\s\n\r]+/g, ' ').trim()
    }

    debugPrint('inner (reformat) = ' + inner)
    return inner
}

export default parseStringLiteral
