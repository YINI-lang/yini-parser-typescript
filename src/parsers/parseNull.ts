import { isDebug } from '../config/env'
import { debugPrint } from '../utils/print'

const parseNullLiteral = (txt: string): null => {
    debugPrint('-> Entered parseNullLiteral(..)')

    if (txt.toLowerCase() !== 'null') {
        throw Error(
            'Syntax Error: Unexpected token or character; expected `Null` literal (case-insensitive)',
        )
    }

    return null
}

export default parseNullLiteral
