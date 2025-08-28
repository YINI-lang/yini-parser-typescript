import { performance } from 'perf_hooks'
import {
    CharStreams,
    CommonTokenStream,
    ErrorListener,
    RecognitionException,
    Recognizer,
} from 'antlr4'
import { isDebug, isDev, localAppEnv, localNodeEnv } from './config/env'
import YiniAstBuilder from './core/ASTBuilder'
import ASTBuilder from './core/ASTBuilder'
import { ErrorDataHandler } from './core/ErrorDataHandler'
import { astToObject } from './core/objectBuilder'
import {
    IParseMainOptions,
    IParseMetaData,
    IYiniAST,
    TPersistThreshold,
    TSyntaxTreeContainer,
} from './core/types'
import YiniLexer from './grammar/YiniLexer'
import YiniParser, { YiniContext } from './grammar/YiniParser'
import { debugPrint, printObject } from './utils/print'

const pkg = require('../package.json')

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
    metaFilename: undefined | string,
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
    let timeEnd4Ms: number = 0
    let runStartedAt = ''
    let runFinishedAt = ''

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

    const errorHandler = new ErrorDataHandler(persistThreshold)

    isDebug() && console.log()
    debugPrint(
        '=== Phase 1 - Lexing ===================================================',
    )
    if (options.isWithTiming) {
        timeStartMs = performance.now()
        runStartedAt = new Date().toISOString()
    }
    const inputStream = CharStreams.fromString(yiniContent)
    const lexer = new YiniLexer(inputStream)

    // Remove the default ConsoleErrorListener
    lexer.removeErrorListeners() // Removes the default lexer console error output.
    const lexerErrorListener = new MyLexerErrorListener(errorHandler)
    lexer.addErrorListener(lexerErrorListener)

    const tokenStream = new CommonTokenStream(lexer)

    // Important: force tokenization here so lexing is measured separately.
    tokenStream.fill()

    debugPrint('--- Parsing done. ---')
    debugPrint(
        '=== Ended phase 1 =============================================',
    )
    isDebug() && console.log()

    debugPrint(
        '=== Phase 2 - Parsing ===================================================',
    )
    if (options.isWithTiming) {
        timeEnd1Ms = performance.now()
    }

    const parser = new YiniParser(tokenStream)

    // const errorListener = new MyParserErrorListener(errorHandler)

    parser.removeErrorListeners() // Removes the default parser console error output.
    const parserErrorListener = new MyParserErrorListener(errorHandler)
    parser.addErrorListener(parserErrorListener)

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

    debugPrint(
        '=== Ended phase 2 =============================================',
    )
    isDebug() && console.log()

    debugPrint(
        '=== Phase 3 - AST Model build & validation ===================================================',
    )
    if (options.isWithTiming) {
        timeEnd2Ms = performance.now()
    }

    // const visitor = new YINIVisitor(errorHandler, options.isStrict)
    const builder = new ASTBuilder(errorHandler, options, metaFilename)
    const ast: IYiniAST = builder.buildAST(parseTree)
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
        '=== Ended phase 3 =============================================',
    )
    isDebug() && console.log()

    debugPrint(
        '=== Phase 4 - Object Building Construction / Binding / Evaluation) ===================================================',
    )
    if (options.isWithTiming) {
        timeEnd3Ms = performance.now()
    }

    // Construct.
    // const finalJSResult = constructFinalObject(syntaxTreeC, errorHandler)
    // const finalJSResult = builder.build(parseTree)
    // const finalJSResult = ast //NOTE: ONLY TEMP so code runs
    const finalJSResult = astToObject(ast, errorHandler)
    debugPrint(
        '=== Ended phase 4 =============================================',
    )
    if (options.isWithTiming) {
        timeEnd4Ms = performance.now()
        runFinishedAt = new Date().toISOString()
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
        parserVersion: pkg.version,
        mode: options.isStrict ? 'strict' : 'lenient',
        orderPreserved: true,
        // runAt: new Date().toISOString(),
        runStartedAt,
        runFinishedAt,
        source: {
            sourceType: ast.sourceType,
            filename: ast.filename,
            hasDocumentTerminator: ast.terminatorSeen,
            hasYiniMarker: ast.yiniMarkerSeen,
            byteSize: null,
            lineCount: null,
            sha256: null,
        },
        structure: {
            maxDepth: null,
            sectionCount: ast.numOfSections,
            memberCount: ast.numOfMembers,
            // sectionChains: null, //syntaxTreeC._meta_numOfChains,
            keysParsedCount: null,
            objectCount: null,
            listCount: null,
            sectionNamePaths: ast.sectionNamePaths,
        },
        metaSchemaVersion: '1',
    }

    if (options.isWithDiagnostics) {
        // Attach optional diagnostics.
        metaData.diagnostics = {
            bailSensitivity: {
                preferredLevel: null,
                levelUsed: options.bailSensitivityLevel,
                levelMeaning: null,
            },
            errors: { errorCount: errorHandler.getNumOfErrors(), payload: [] },
            warnings: {
                warningCount: errorHandler.getNumOfWarnings(),
                payload: [],
            },
            notices: {
                noticeCount: errorHandler.getNumOfNotices(),
                payload: [],
            },
            infos: { infoCount: errorHandler.getNumOfInfos(), payload: [] },
            environment: {
                NODE_ENV: process.env.NODE_ENV,
                APP_ENV: process.env.APP_ENV,
                lib: {
                    nodeEnv: localNodeEnv,
                    appEnv: localAppEnv,
                    flags: { isDev: isDev(), isDebug: isDebug() },
                },
            },
        }
    }
    if (options.isWithTiming) {
        // Attach optional durations timing data.
        metaData.timing = {
            total: !options.isWithTiming
                ? null
                : {
                      timeMs: Number.parseFloat(
                          (timeEnd4Ms - timeStartMs).toFixed(3) + '',
                      ),
                      name: 'Total',
                  },
            phase1: !options.isWithTiming
                ? null
                : {
                      timeMs: Number.parseFloat(
                          (timeEnd1Ms - timeStartMs).toFixed(3) + '',
                      ),
                      name: 'Lexing',
                  },
            phase2: !options.isWithTiming
                ? null
                : {
                      timeMs: Number.parseFloat(
                          (timeEnd2Ms - timeEnd1Ms).toFixed(3) + '',
                      ),
                      name: 'Parsing',
                  },
            phase3: !options.isWithTiming
                ? null
                : {
                      timeMs: Number.parseFloat(
                          (timeEnd3Ms - timeEnd2Ms).toFixed(3) + '',
                      ),
                      name: 'AST Building',
                  },
            phase4: !options.isWithTiming
                ? null
                : {
                      timeMs: Number.parseFloat(
                          (timeEnd4Ms - timeEnd3Ms).toFixed(3) + '',
                      ),
                      name: 'Object Building',
                  },
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
