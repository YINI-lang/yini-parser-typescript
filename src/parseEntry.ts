import { CharStreams, CommonTokenStream } from 'antlr4'
import { checkAndBuild } from './checkAndBuild'
import { isDebug } from './config/env'
import YiniLexer from './grammar/YiniLexer'
import YiniParser, { YiniContext } from './grammar/YiniParser'
import { TSyntaxTreeContainer } from './types'
import { debugPrint } from './utils/system'
import YINIVisitor from './YINIVisitor'

interface IOptions {
    isStrict: boolean
    bailSensitivy: 0 | 1 | 2
}

export const parseYINI = (
    yiniContent: string,
    options: IOptions = { isStrict: false, bailSensitivy: 0 },
) => {
    debugPrint()
    debugPrint('-> Entered parseYINI(..) in parseEntry')
    debugPrint('isStrict mode = ' + options.isStrict)
    debugPrint('bailSensitivy = ' + options.bailSensitivy)

    debugPrint()
    debugPrint('RTYU')

    const inputStream = CharStreams.fromString(yiniContent)
    const lexer = new YiniLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new YiniParser(tokenStream)

    debugPrint()
    debugPrint('==== Start parsing ==========================')
    //const tree = parser.yini;  // Start rule.
    const parseTree: YiniContext = parser.yini() // Start rule.

    const visitor = new YINIVisitor()
    const syntaxTreeC: TSyntaxTreeContainer = visitor.visit(
        parseTree as any,
    ) as TSyntaxTreeContainer

    // Semantic check and construct.
    const finalResult = checkAndBuild(syntaxTreeC)
    debugPrint('==== End parsing ==========================\n')

    debugPrint('visitor.visit(..): finalResult:')
    isDebug() && console.debug(finalResult)
    debugPrint()

    if (options.isStrict) {
        throw Error('ERROR: Strict-mode not yet implemented')
    } else {
        debugPrint('visitor.visit(..): result:')
        isDebug() && console.debug(finalResult)
        return finalResult as any
    }
}
