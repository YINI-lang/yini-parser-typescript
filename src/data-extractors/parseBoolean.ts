import { isDebug } from '../config/env'
import { debugPrint } from '../utils/system'

/**
 * Extract boolean literal.
 */
const parseBooleanLiteral = (txt: string): boolean => {
    debugPrint('-> Entered parseBooleanLiteral(..)')
    const value: boolean = !!(txt === 'true' || txt === 'yes' || txt === 'on')

    return value
}

export default parseBooleanLiteral
