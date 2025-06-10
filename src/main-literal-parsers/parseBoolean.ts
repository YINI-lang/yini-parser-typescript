import { debugPrint, isDebug } from '../utils/general'

const parseBooleanLiteral = (txt: string): boolean => {
    debugPrint('-> Entered parseBooleanLiteral(..)')
    const value: boolean = !!(txt === 'true' || txt === 'yes' || txt === 'on')

    return value
}

export default parseBooleanLiteral
