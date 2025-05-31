import { CharStreams, CommonTokenStream } from 'antlr4'
import YiniLexer from './grammar/YiniLexer'
import YiniParser, { YiniContext } from './grammar/YiniParser'
import { debugPrint, isDebug } from './utils/general'
import YINIVisitor from './YINIVisitor'

interface IOptions {
    strict: boolean
    bailSensitivy: 0 | 1 | 2
}

export const parseYINI = (
    yiniContent: string,
    options: IOptions = { strict: false, bailSensitivy: 0 },
) => {
    //     const isDebug = !!process.env.IS_DEBUG

    debugPrint()
    debugPrint('RTYU')

    debugPrint()
    debugPrint('-> Entered doParse(..) in parseEntry\n')

    const inputStream = CharStreams.fromString(yiniContent)
    const lexer = new YiniLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new YiniParser(tokenStream)

    debugPrint()
    debugPrint('==== Start parsing ==========================')
    //const tree = parser.yini;  // Start rule.
    const tree: YiniContext = parser.yini() // Start rule.

    const visitor = new YINIVisitor()
    const result = visitor.visit(tree as any)
    debugPrint('==== End parsing ==========================\n')

    debugPrint('visitor.visit(..): result:')
    if (isDebug()) {
        console.debug(result)
    }
    debugPrint()

    if (options.strict) {
        throw Error('ERROR: Strict-mode not yet implemented')
    } else {
        debugPrint('visitor.visit(..): result:')
        console.debug(result)
        return (result as any)?._base
    }
}
