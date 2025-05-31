import { CharStreams, CommonTokenStream } from 'antlr4'
import YiniLexer from './grammar/YiniLexer'
import YiniParser, { YiniContext } from './grammar/YiniParser'
import { debugPrint } from './utils/general'
import YINIVisitor from './YINIVisitor'

export const doParse = (yiniInput: string) => {
    //     const isDebug = !!process.env.IS_DEBUG

    debugPrint()
    debugPrint('RTYU')

    debugPrint()
    debugPrint('-> Entered doParse(..) in parseEntry\n')

    const inputStream = CharStreams.fromString(yiniInput)
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

    debugPrint('doParse(..): result:')
    debugPrint(result)
    debugPrint()
    return result
}
