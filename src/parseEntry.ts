import {
    CharStreams,
    CommonTokenStream,
    ErrorListener,
    RecognitionException,
    Recognizer,
} from 'antlr4'
import { isDebug } from './config/env'
import { ErrorDataHandler, TBailThreshold } from './core/ErrorDataHandler'
import { constructFinalObject } from './core/objectBuilder'
import { IOptions, TSyntaxTreeContainer } from './core/types'
import YINIVisitor from './core/YINIVisitor'
import YiniLexer from './grammar/YiniLexer'
import YiniParser, { YiniContext } from './grammar/YiniParser'
import { debugPrint, printObject } from './utils/system'

class MyErrorListener implements ErrorListener<any> {
    public errors: string[] = []
    private bailThreshold: TBailThreshold

    constructor(bailThreshold: TBailThreshold) {
        this.bailThreshold = bailThreshold
    }

    syntaxError(
        recognizer: any,
        offendingSymbol: any,
        line: number,
        charPositionInLine: number,
        msg: string,
        e: RecognitionException | undefined,
    ): void {
        this.errors.push(`Line ${line}:${charPositionInLine} ${msg}`)

        // Print immediately for debugging
        console.error(`Syntax error, at line: ${line}`)
        console.error(`At about column ${1 + charPositionInLine} ${msg}`)

        if (this.bailThreshold !== '0-Ignore-Errors') {
            process.exit(1)
        }
    }

    // The following are required for the interface, but can be left empty.
    reportAmbiguity(...args: any[]): void {}
    reportAttemptingFullContext(...args: any[]): void {}
    reportContextSensitivity(...args: any[]): void {}
}

export const parseYiniContent = (
    yiniContent: string,
    options: IOptions = { isStrict: false, bailSensitivityLevel: 0 },
) => {
    debugPrint()
    debugPrint('-> Entered parseYiniContent(..) in parseEntry')
    debugPrint('     isStrict mode = ' + options.isStrict)
    debugPrint('bailSensitivityLevel = ' + options.bailSensitivityLevel)

    let bailThreshold: TBailThreshold
    switch (options.bailSensitivityLevel) {
        case 0:
            bailThreshold = '0-Ignore-Errors'
            break
        case 1:
            bailThreshold = '1-Abort-on-Errors'
            break
        default:
            bailThreshold = '2-Abort-Even-on-Warnings'
    }

    isDebug() && console.log()
    debugPrint(
        '=== Phase 1 ===================================================',
    )
    const inputStream = CharStreams.fromString(yiniContent)
    const lexer = new YiniLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new YiniParser(tokenStream)

    const errorListener = new MyErrorListener(bailThreshold)

    parser.removeErrorListeners() // Removes the default console error output.
    parser.addErrorListener(errorListener)

    debugPrint()
    debugPrint('--- Starting parsing... ---')

    const parseTree: YiniContext = parser.yini() // The function yini() is the start rule.
    if (errorListener.errors.length > 0) {
        debugPrint('*** ERROR detected ***')

        if (isDebug()) {
            // Handle or display syntax errors
            console.error('Syntax errors detected:', errorListener.errors)
            //process.exit(1)
        }
    }

    debugPrint('--- Parsing done. ---')
    debugPrint(
        '=== Ended phase 1 =============================================',
    )
    isDebug() && console.log()

    debugPrint(
        '=== Phase 2 ===================================================',
    )
    const errorHandlerInstance = new ErrorDataHandler('1-Abort-on-Errors')

    const visitor = new YINIVisitor(errorHandlerInstance)
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
    const finalJSResult = constructFinalObject(
        syntaxTreeC,
        errorHandlerInstance,
    )
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
