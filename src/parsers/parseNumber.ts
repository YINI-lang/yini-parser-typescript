import { isDebug } from '../config/env'
import { TDataType } from '../core/types'
import { debugPrint } from '../utils/print'

const parseNumberLiteral = (
    txt: string,
): { type: TDataType; value: number } => {
    debugPrint('-> Entered parseNumberLiteral(..), txt: ' + txt)

    if (/^[+-]?(?:\d+\.\d*|\d*\.?\d+)e[+-]?\d+$/i.test(txt)) {
        // Exp. numbers
        debugPrint('* Identified as an exp number')
        return {
            type: 'Number-Float',
            // value: parseInt(txt.replace('#', '0x'), 16),
            value: parseFloat(txt),
        }
    }
    // --- Hexadecimal ---------
    if (/^[+-]?(0[xX]|#)/.test(txt)) {
        // Prefix: 0x, 0X, #
        debugPrint('* Identified as a hex number')
        debugPrint('parsed out HEX: ' + txt.replace(/0[xX]|#/, ''))
        return {
            type: 'Number-Integer',
            // value: parseInt(txt.replace('#', '0x'), 16),
            value: parseInt(txt.replace(/0[xX]|#/, ''), 16),
        }
    }
    // --- Binary ---------
    if (/^[+-]?(0[bB]|%)/.test(txt)) {
        // Prefix: 0b, 0B, %
        debugPrint('* Identified as a bin number')
        debugPrint('parsed out BIN: ' + txt.replace(/0[bB]|%/, ''))
        return {
            type: 'Number-Integer',
            value: parseInt(txt.replace(/0[bB]|%/, ''), 2),
        }
    }
    // --- Octal ---------
    if (/^[+-]?0[oO]/.test(txt)) {
        // Prefix: 0o, 0O
        debugPrint('* Identified as a oct number')
        debugPrint('parsed out OCT: ' + txt.replace(/0[oO]/, ''))
        return {
            type: 'Number-Integer',
            value: parseInt(txt.replace(/0[oO]/, ''), 8),
        }
    }
    // --- Duodecimal ---------
    if (/^[+-]?0[zZ]/.test(txt)) {
        // Prefix: 0z, 0Z, x = A = 10, e = B = 11.
        debugPrint('* Identified as a duodecimal number')
        debugPrint('parsed out DOZ: ' + txt.replace(/0[zZ]/, ''))
        txt = txt.replace(/[xX]/g, 'A')
        txt = txt.replace(/[eE]/g, 'B')
        debugPrint('Converter to AB form: ' + txt.replace(/0[zZ]/, ''))
        return {
            type: 'Number-Integer',
            value: parseInt(txt.replace(/0[zZ]/, ''), 12),
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
