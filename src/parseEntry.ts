import { performance } from 'perf_hooks'
import {
    CharStreams,
    CommonTokenStream,
    ErrorListener,
    RecognitionException,
    Recognizer,
} from 'antlr4'
import { isDebug, isDev, localAppEnv, localNodeEnv } from './config/env'
import { ErrorDataHandler } from './core/ErrorDataHandler'
import { astToObject } from './core/objectBuilder'
import {
    IParseMainOptions,
    IParseMetaData,
    TPersistThreshold,
    TSyntaxTreeContainer,
} from './core/types'
import YiniAstBuilder from './core/YiniAstBuilder'
import YiniLexer from './grammar/YiniLexer'
import YiniParser, { YiniContext } from './grammar/YiniParser'
import { debugPrint, printObject } from './utils/print'

class MyParserErrorListener implements ErrorListener<any> {
    public errors: string[] = []
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
        debugPrint('ANTLR parser cached an error')
        this.errors.push(`Line ${line}:${charPositionInLine} ${msg}`)

        const msgWhat = `Syntax error, at line: ${line}`
        const msgWhy = `At about column ${1 + charPositionInLine} ${msg}`

        this.errorHandler.pushOrBail(null, 'Syntax-Error', msgWhat, msgWhy)
    }

    // The following are required for the interface, but can be left empty.
    reportAmbiguity(...args: any[]): void {}
    reportAttemptingFullContext(...args: any[]): void {}
    reportContextSensitivity(...args: any[]): void {}
}

class MyLexerErrorListener implements ErrorListener<any> {
    public errors: string[] = []
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
    ) {
        // Handle the error as you want:
        debugPrint('ANTLR parser cached an error')
        this.errors.push(`Line ${line}:${charPositionInLine} ${msg}`)

        const msgWhat = `Syntax error, at line: ${line}`
        const msgWhy = `At about column ${1 + charPositionInLine} ${msg}`

        this.errorHandler.pushOrBail(null, 'Syntax-Error', msgWhat, msgWhy)
    }
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
    debugPrint('isIncludeMeta = ' + options.isIncludeMeta)
    debugPrint('isWithDiagnostics = ' + options.isWithDiagnostics)
    debugPrint('isWithTiming = ' + options.isWithTiming)

    let timeStartMs: number = 0
    let timeEnd1Ms: number = 0
    let timeEnd2Ms: number = 0
    let timeEnd3Ms: number = 0
    // let totalMs: null | number = null
    // let phase1Ms: null | number = null
    // let phase2Ms: null | number = null
    // let phase3Ms: null | number = null

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
    if (options.isWithTiming) {
        timeStartMs = performance.now()
    }
    const inputStream = CharStreams.fromString(yiniContent)
    const lexer = new YiniLexer(inputStream)
    const tokenStream = new CommonTokenStream(lexer)
    const parser = new YiniParser(tokenStream)

    const errorHandler = new ErrorDataHandler(persistThreshold)

    // Remove the default ConsoleErrorListener
    lexer.removeErrorListeners() // Removes the default lexer console error output.
    const lexerErrorListener = new MyLexerErrorListener(errorHandler)
    lexer.addErrorListener(lexerErrorListener)

    // const errorListener = new MyParserErrorListener(errorHandler)

    parser.removeErrorListeners() // Removes the default parser console error output.
    const parserErrorListener = new MyParserErrorListener(errorHandler)
    parser.addErrorListener(parserErrorListener)

    debugPrint()
    debugPrint('--- Starting parsing... ---')

    const parseTree: YiniContext = parser.yini() // The function yini() is the start rule.
    if (
        parserErrorListener.errors.length > 0 ||
        lexerErrorListener.errors.length > 0
    ) {
        debugPrint('*** ERROR detected ***')

        if (isDebug()) {
            // Handle or display syntax errors
            console.error(
                'Syntax errors detected:',
                parserErrorListener.errors,
                lexerErrorListener.errors,
            )
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
    if (options.isWithTiming) {
        timeEnd1Ms = performance.now()
    }

    // const visitor = new YINIVisitor(errorHandler, options.isStrict)
    const builder = new YiniAstBuilder(options)
    const ast = builder.buildAST(parseTree)
    // const syntaxTreeC: TSyntaxTreeContainer = visitor.visit(
    //     parseTree as any,
    // ) as TSyntaxTreeContainer
    if (isDebug()) {
        console.log()
        console.log(
            '**************************************************************************',
        )
        console.log('*** AST *************************************************')
        printObject(ast)
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
    if (options.isWithTiming) {
        timeEnd2Ms = performance.now()
    }

    // Construct.
    // const finalJSResult = constructFinalObject(syntaxTreeC, errorHandler)
    // const finalJSResult = builder.build(parseTree)

    //@todo implement below so it takes the astTree
    // const finalJSResult = constructFinalObject(astTree, errorHandler)
    // const finalJSResult = ast //NOTE: ONLY TEMP so code runs
    const finalJSResult = astToObject(ast, errorHandler)
    debugPrint(
        '=== Ended phase 3 =============================================',
    )
    if (options.isWithTiming) {
        timeEnd3Ms = performance.now()
    }

    debugPrint('visitor.visit(..): finalJSResult:')
    isDebug() && console.debug(finalJSResult)
    debugPrint()

    if (options.isStrict) {
        //throw Error('ERROR: Strict-mode not yet implemented')
        errorHandler.pushOrBail(
            null,
            'Syntax-Warning',
            'WARNING: Strict-mode not yet fully implemented',
            '',
            '',
        )
    } else {
        debugPrint('visitor.visit(..): finalJSResult:')
        isDebug() && console.debug(finalJSResult)
    }

    // Construct meta data.
    const metaData: IParseMetaData = {
        strictMode: options.isStrict,
        hasTerminal: false, //syntaxTreeC._hasTerminal,
        hasYiniMarker: false, //syntaxTreeC._hasYiniMarker,
        sections: null, //syntaxTreeC._meta_numOfSections,
        members: null, //syntaxTreeC._meta_numOfMembers,
        sectionChains: null, //syntaxTreeC._meta_numOfChains,
        keysParsed: null,
        // timing: {
        //     totalMs: !options.isWithTiming ? null : totalMs!.toFixed(3),
        //     phase1Ms: !options.isWithTiming ? null : phase1Ms!.toFixed(3),
        //     phase2Ms: !options.isWithTiming ? null : phase2Ms!.toFixed(3),
        //     phase3Ms: !options.isWithTiming ? null : phase3Ms!.toFixed(3),
        // },
    }
    if (options.isWithDiagnostics) {
        // Attach optional diagnostics.
        metaData.diagnostics = {
            bailSensitivityLevel: options.bailSensitivityLevel,
            errors: errorHandler.getNumOfErrors(),
            warnings: errorHandler.getNumOfWarnings(),
            infoAndNotices: errorHandler.getNumOfInfoAndNotices(),
            envs: {
                NODE_ENV: process.env.NODE_ENV,
                APP_ENV: process.env.APP_ENV,
                libNodeEnv: localNodeEnv,
                libAppEnv: localAppEnv,
            },
            libFlags: {
                isDev: isDev(),
                isDebug: isDebug(),
            },
        }
    }
    if (options.isWithTiming) {
        // Attach optional timing data.
        metaData.timing = {
            totalMs: !options.isWithTiming
                ? null
                : Number.parseFloat((timeEnd3Ms - timeStartMs).toFixed(3) + ''),
            phase1Ms: !options.isWithTiming
                ? null
                : Number.parseFloat((timeEnd1Ms - timeStartMs).toFixed(3) + ''),
            phase2Ms: !options.isWithTiming
                ? null
                : Number.parseFloat((timeEnd2Ms - timeEnd1Ms).toFixed(3) + ''),
            phase3Ms: !options.isWithTiming
                ? null
                : Number.parseFloat((timeEnd3Ms - timeEnd2Ms).toFixed(3) + ''),
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
