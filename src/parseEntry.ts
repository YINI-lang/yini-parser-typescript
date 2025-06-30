import { CharStreams, CommonTokenStream } from 'antlr4'
import { isDebug } from './config/env'
import YiniLexer from './grammar/YiniLexer'
import YiniParser, { YiniContext } from './grammar/YiniParser'
import { constructFinalObject } from './objectBuilder'
import { TSyntaxTreeContainer } from './types'
import { debugPrint, printObject } from './utils/system'
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

    isDebug() && console.log()
    debugPrint(
        '=== Phase 1 ===================================================',
    )
    const inputStream = CharStreams.fromString(yiniContent)
    const lexer = new YiniLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new YiniParser(tokenStream)

    debugPrint()
    debugPrint('--- Starting parsing... ---')
    const parseTree: YiniContext = parser.yini() // The function yini() is the start rule.
    debugPrint('--- Parsing done. ---')
    debugPrint(
        '=== Ended phase 1 =============================================',
    )
    isDebug() && console.log()

    debugPrint(
        '=== Phase 2 ===================================================',
    )
    const visitor = new YINIVisitor()
    const syntaxTreeC: TSyntaxTreeContainer = visitor.visit(
        parseTree as any,
    ) as TSyntaxTreeContainer
    if (isDebug()) {
        console.log()
        console.log(
            '**************************************************************************',
        )
        console.log(
            '*** syntaxTreeContainer: *************************************************',
        )
        printObject(syntaxTreeC)
        console.log(
            '**************************************************************************',
        )
        console.log(
            '**************************************************************************',
        )
        console.log()
    }
    debugPrint(
        '=== Ended phase 2 =============================================',
    )
    isDebug() && console.log()

    debugPrint(
        '=== Phase 3 ===================================================',
    )
    // Construct.
    const finalJSResult = constructFinalObject(syntaxTreeC)
    debugPrint(
        '=== Ended phase 3 =============================================',
    )

    debugPrint('visitor.visit(..): finalJSResult:')
    isDebug() && console.debug(finalJSResult)
    debugPrint()

    if (options.isStrict) {
        throw Error('ERROR: Strict-mode not yet implemented')
    } else {
        debugPrint('visitor.visit(..): finalJSResult:')
        isDebug() && console.debug(finalJSResult)
        return finalJSResult as any
    }
}
