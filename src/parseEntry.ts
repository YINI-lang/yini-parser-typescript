import {
    CharStreams,
    CommonTokenStream,
    ErrorListener,
    RecognitionException,
    Recognizer,
} from 'antlr4'
import { isDebug } from './config/env'
import { ErrorDataHandler } from './core/ErrorDataHandler'
import { constructFinalObject } from './core/objectBuilder'
import {
    IParseMainOptions,
    IParseMetaData,
    TPersistThreshold,
    TSyntaxTreeContainer,
} from './core/types'
import YINIVisitor from './core/YINIVisitor'
import YiniLexer from './grammar/YiniLexer'
import YiniParser, { YiniContext } from './grammar/YiniParser'
import { debugPrint, printObject } from './utils/system'

class MyErrorListener implements ErrorListener<any> {
    public errors: string[] = []
    // private persistThreshold: TPersistThreshold

    // constructor(persistThreshold: TPersistThreshold) {
    //     this.persistThreshold = persistThreshold
    // }

    private errorHandler: ErrorDataHandler
    constructor(errorHandler: ErrorDataHandler) {
        this.errorHandler = errorHandler
    }

    syntaxError(
        recognizer: any,
        offendingSymbol: any,
        line: number,
        charPositionInLine: number,
        msg: string,
        e: RecognitionException | undefined,
    ): void {
        debugPrint('ANTLR grammar cached an error')
        this.errors.push(`Line ${line}:${charPositionInLine} ${msg}`)

        // Print immediately for debugging
        // console.error(`Syntax error, at line: ${line}`)
        // console.error(`At about column ${1 + charPositionInLine} ${msg}`)

        // if (this.persistThreshold !== '0-Ignore-Errors') {
        //     process.exit(1)
        // }
        const msgWhat = `Syntax error, at line: ${line}`
        const msgWhy = `At about column ${1 + charPositionInLine} ${msg}`

        this.errorHandler.pushOrBail(null, 'Syntax-Error', msgWhat, msgWhy)
    }

    // The following are required for the interface, but can be left empty.
    reportAmbiguity(...args: any[]): void {}
    reportAttemptingFullContext(...args: any[]): void {}
    reportContextSensitivity(...args: any[]): void {}
}

export const parseMain = (
    yiniContent: string,
    options: IParseMainOptions = {
        isStrict: false,
        bailSensitivityLevel: 0,
        isIncludeMeta: false,
        isWithDiagnostics: false,
        isWithTiming: false,
    },
) => {
    debugPrint()
    debugPrint('-> Entered parseMain(..) in parseEntry')
    debugPrint('     isStrict mode = ' + options.isStrict)
    debugPrint('bailSensitivityLevel = ' + options.bailSensitivityLevel)

    let persistThreshold: TPersistThreshold
    switch (options.bailSensitivityLevel) {
        case 0:
            persistThreshold = '0-Ignore-Errors'
            break
        case 1:
            persistThreshold = '1-Abort-on-Errors'
            break
        default:
            persistThreshold = '2-Abort-Even-on-Warnings'
    }

    isDebug() && console.log()
    debugPrint(
        '=== Phase 1 ===================================================',
    )
    const inputStream = CharStreams.fromString(yiniContent)
    const lexer = new YiniLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new YiniParser(tokenStream)

    const errorHandler = new ErrorDataHandler(persistThreshold)
    const errorListener = new MyErrorListener(errorHandler)

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
    //    const errorHandler = new ErrorDataHandler(persistThreshold)

    const visitor = new YINIVisitor(errorHandler)
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
    const finalJSResult = constructFinalObject(syntaxTreeC, errorHandler)
    debugPrint(
        '=== Ended phase 3 =============================================',
    )

    debugPrint('visitor.visit(..): finalJSResult:')
    isDebug() && console.debug(finalJSResult)
    debugPrint()

    if (options.isStrict) {
        //throw Error('ERROR: Strict-mode not yet implemented')
        errorHandler.pushOrBail(
            null,
            'Internal-Error',
            'WARNING: Strict-mode not yet implemented',
            undefined,
            'Meanwhile, please use lenient mode (non-strict) instead',
        )
    } else {
        debugPrint('visitor.visit(..): finalJSResult:')
        isDebug() && console.debug(finalJSResult)
    }

    // Construct meta data.
    const metaData: IParseMetaData = {
        strictMode: options.isStrict,
        hasTerminal: syntaxTreeC._hasTerminal,
        sections: null,
        keysParsed: null,
        sectionChains: syntaxTreeC._meta_numOfChains,
        // diagnostics: undefined, // Includes warnings/errors info.
        timing: {
            totalMs: null,
            phase1Ms: null,
            phase2Ms: null,
            phase3Ms: null,
        },
    }
    if (options.isWithDiagnostics) {
        // Attach optional diagnostics.
        metaData.diagnostics = {
            bailSensitivityLevel: options.bailSensitivityLevel,
            errors: errorHandler.getNumOfErrors(),
            warnings: errorHandler.getNumOfWarnings(),
            infoAndNotices: errorHandler.getNumOfInfoAndNotices(),
        }
    }
    if (options.isWithTiming) {
        // Attach optional timing data.
        metaData.timing = {
            totalMs: null,
            phase1Ms: null,
            phase2Ms: null,
            phase3Ms: null,
        }
    }

    debugPrint('getNumOfErrors(): ' + errorHandler.getNumOfErrors())
    if (errorHandler.getNumOfErrors()) {
        console.log()
        console.log(
            'Parsing is complete, but some problems were detected. Please see the errors above for details.',
        )
        console.log('Number of errors found: ' + errorHandler.getNumOfErrors())
    }

    if (options.isIncludeMeta) {
        return {
            result: finalJSResult as any,
            meta: metaData,
        }
    }

    return finalJSResult as any
}
