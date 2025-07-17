import { isDebug } from '../config/env'
import { TDataType } from '../core/YINIVisitor'
import { debugPrint } from '../utils/system'

const parseNumberLiteral = (
    txt: string,
): { type: TDataType; value: number } => {
    debugPrint('-> Entered parseNumberLiteral(..), txt: ' + txt)

    if (/^0[xX]|#/.test(txt)) {
        // Prefix: 0x, 0X, #
        debugPrint('* Identified as a hex number')
        return {
            type: 'Number-Integer',
            // value: parseInt(txt.replace('#', '0x'), 16),
            value: parseInt(txt.replace(/^0[xX]|#/, ''), 16),
        }
    }
    if (/^0[bB]|%/.test(txt)) {
        // Prefix: 0b, 0B, %
        debugPrint('* Identified as a bin number')
        return {
            type: 'Number-Integer',
            value: parseInt(txt.replace(/^0[bB]|%/, ''), 2),
        }
    }
    if (/^0[oO]/.test(txt)) {
        // Prefix: 0o, 0O
        debugPrint('* Identified as a ord number')
        return {
            type: 'Number-Integer',
            value: parseInt(txt.replace(/^0[oO]/, ''), 8),
        }
    }
    if (/^0[zZ]/.test(txt)) {
        // Prefix: 0z, 0Z
        debugPrint('* Identified as a duodecimal number')
        return {
            type: 'Number-Integer',
            value: parseInt(txt.replace(/^0[zZ]/, ''), 12),
        }
    }

    // In a regex literal the dot must be escaped (\.) to match a literal '.'
    if (/\./.test(txt)) {
        debugPrint('* Identified as a float number')
        return { type: 'Number-Float', value: parseFloat(txt) }
    }

    // TODO: Depending, on mode, below continue or break on error
    //console.error('Error: Failed to parse number value: ' + txt)

    debugPrint('* Identified as a int number')
    return { type: 'Number-Integer', value: parseInt(txt) }
}

export default parseNumberLiteral
