import { CharStreams, CommonTokenStream } from 'antlr4'
import YiniLexer from './grammar/YiniLexer'
import YiniParser, { YiniContext } from './grammar/YiniParser'
import { debugPrint } from './utils/general'
import YINIVisitor from './YINIVisitor'

export const doParse = (yiniInput: string) => {
    const isDebug = !!process.env.IS_DEBUG

    isDebug && console.log()
    isDebug && console.log('-> Entered doParse(..) in parseEntry\n')

    const inputStream = CharStreams.fromString(yiniInput)
    const lexer = new YiniLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new YiniParser(tokenStream)

    isDebug && console.log()
    console.log('==== Start parsing ==========================')
    //const tree = parser.yini;  // Start rule.
    const tree: YiniContext = parser.yini() // Start rule.

    const visitor = new YINIVisitor()
    const result = visitor.visit(tree as any)
    console.log('==== End parsing ==========================\n')

    console.log('doParse(..): result:')
    console.log(result)
    console.log()
    return result
}
