import { debugPrint, isDebug } from '../utils/general'
import { TDataType } from '../YINIVisitor'

const parseNumberLiteral = (
    txt: string,
): { type: TDataType; value: number } => {
    debugPrint('-> Entered parseNumberLiteral(..)')
    if (/^0[xX]|#/.test(txt))
        // Prefix: 0x, 0X, #
        return {
            type: 'Number-Integer',
            value: parseInt(txt.replace('#', '0x'), 16),
        }
    if (/^0[bB]|%/.test(txt))
        // Prefix: 0b, 0B, %
        return {
            type: 'Number-Integer',
            value: parseInt(txt.replace('%', '0b'), 2),
        }
    if (/^0[oO]/.test(txt))
        // Prefix: 0o, 0O
        return {
            type: 'Number-Integer',
            value: parseInt(txt, 8),
        }
    // Duodecimal (0z...) not yet supported, fallback to number

    // In a regex literal the dot must be escaped (\.) to match a literal '.'
    if (/\./.test(txt)) {
        return { type: 'Number-Float', value: parseFloat(txt) }
    }

    // TODO: Depending, on mode, below continue or break on error
    console.error('Error: Failed to parse number value: ' + txt)

    return { type: 'Number-Integer', value: parseInt(txt) }
}

export default parseNumberLiteral
