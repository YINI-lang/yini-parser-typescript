import { isDebug } from '../config/env'
import { debugPrint } from '../utils/print'

/**
 * Extract boolean literal.
 */
const parseBooleanLiteral = (text: string): boolean => {
    debugPrint('-> Entered parseBooleanLiteral(..)')
    const txt = text.trim().toLowerCase()
    const value: boolean = !!(txt === 'true' || txt === 'yes' || txt === 'on')

    return value
}

export default parseBooleanLiteral
