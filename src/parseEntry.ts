import { performance } from 'perf_hooks'
import {
    CharStreams,
    CommonTokenStream,
    ErrorListener,
    RecognitionException,
    Recognizer,
    Token,
} from 'antlr4'
import { isDebug, isDev, localAppEnv, localNodeEnv } from './config/env'
import ASTBuilder from './core/ASTBuilder'
import { ErrorDataHandler } from './core/ErrorDataHandler'
import { astToObject } from './core/objectBuilder'
import {
    IParseCoreOptions,
    IResultMetaData,
    IRuntimeInfo,
    IYiniAST,
    TBailSensitivityLevel,
    TFailLevelKey,
    TPersistThreshold,
    TPreferredFailLevel,
} from './core/types'
import YiniLexer from './grammar/YiniLexer'
import YiniParser, { YiniContext } from './grammar/YiniParser'
import { removeUndefinedDeep } from './utils/object'
import { debugPrint, printObject } from './utils/print'
import { capitalizeFirst, toLowerSnakeCase } from './utils/string'
import { isError } from './utils/system'

const pkg = require('../package.json')

/**
 * @param line Line number as 1-based.
 * @param col Column number as 0-based.
 */
const createGeneralCtx = (
    line: number,
    endColumn: number,
    startColumn: number | undefined = undefined,
): YiniContext => {
    const startToken = new Token()
    const stopToken = new Token()
    const ctx = new YiniContext()
    ctx.start = startToken
    ctx.stop = stopToken

    ctx.start.line = line // Note: Line num is 1-based.
    if (startColumn && startColumn >= 0) {
        ctx.start.column = startColumn // Note: Column num is 0-based.
    }

    ctx.stop.column = endColumn // Note: Column num is 0-based.

    return ctx
}

const parsePossibleStartCol = (
    errorHandler: ErrorDataHandler,
    recognizer: any,
): number | undefined => {
    let possibleStartCol: number | undefined = undefined
    try {
        possibleStartCol = recognizer?._ctx.start?.column
            ? recognizer?._ctx.start?.column + 1
            : undefined
    } catch (err: unknown) {
        let msgHint = ''

        if (isError(err)) {
            msgHint = 'Error: ' + err.message
        } else {
            msgHint = 'Thrown value:' + JSON.stringify(err)
        }
        errorHandler.pushOrBail(
            null,
            'Internal-Error',
            'Catched error of possibleStartCol in parser grammar listener.',
            msgHint,
        )
    }

    return possibleStartCol
}

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

        const col = charPositionInLine + 1
        const possibleStartCol: number | undefined = parsePossibleStartCol(
            this.errorHandler,
            recognizer,
        )

        const msgWhat = `Syntax error`

        // Try to map message:
        // From: "mismatched input '/END' expecting <EOF>"
        // To:   "Found '/END', but expected the end of the document."
        // const msgWhy = `${capitalizeFirst(msg)}`
        const msgWhy = `Details: ${msg}`

        const ctx = createGeneralCtx(line, charPositionInLine, possibleStartCol) // So we can show line/col in error message.
        // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
        this.errorHandler.pushOrBail(ctx, 'Syntax-Error', msgWhat, msgWhy)
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
        debugPrint('ANTLR lexer cached an error')
        const col = charPositionInLine + 1
        const possibleStartCol: number | undefined = parsePossibleStartCol(
            this.errorHandler,
            recognizer,
        )

        // const msgWhat = `Syntax error at line ${line}, column ${col}:`
        const msgWhat = `Syntax error`

        // Try to map message:
        // From: "mismatched input '/END' expecting <EOF>"
        // To:   "Found '/END', but expected the end of the document."
        // const msgWhy = `${capitalizeFirst(msg)}`
        const msgWhy = `Details: ${msg}`
        // const msgHint = ``

        const ctx = createGeneralCtx(line, charPositionInLine, possibleStartCol) // So we can show line/col in error message.
        // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
        this.errorHandler.pushOrBail(ctx, 'Syntax-Error', msgWhat, msgWhy)
    }
}

/** Single source of truth. */
export const _parseMain = (
    yiniContent: string,
    // options: IParseMainOptions = {
    // options: IParseCoreOptions = {
    //     isStrict: false,
    //     bailSensitivity: 0,
    //     isIncludeMeta: false,
    //     isWithDiagnostics: false,
    //     isWithTiming: false,
    //     isKeepUndefinedInMeta: false,
    //     isRequireDocTerminator: false,
    // },
    options: IParseCoreOptions,
    runtimeInfo: IRuntimeInfo,
) => {
    debugPrint()
    debugPrint('-> Entered parseMain(..) in parseEntry')
    debugPrint('           isStrict mode = ' + options.isStrict)
    debugPrint('         bailSensitivity = ' + options.bailSensitivity)
    debugPrint('           isIncludeMeta = ' + options.isIncludeMeta)
    debugPrint('       isWithDiagnostics = ' + options.isWithDiagnostics)
    debugPrint('            isWithTiming = ' + options.isWithTiming)
    debugPrint('   isKeepUndefinedInMeta = ' + options.isKeepUndefinedInMeta)
    debugPrint('isAvoidWarningsInConsole = ' + options.isAvoidWarningsInConsole)
    debugPrint('    requireDocTerminator = ' + options.requireDocTerminator)
    debugPrint('   treatEmptyValueAsNull = ' + options.treatEmptyValueAsNull)
    debugPrint('          onDuplicateKey = ' + options.onDuplicateKey)
    debugPrint()
    debugPrint('  runtimeInfo.sourceType = ' + runtimeInfo.sourceType)
    debugPrint('    runtimeInfo.fileName = ' + runtimeInfo.fileName)

    let persistThreshold: TPersistThreshold
    switch (options.bailSensitivity) {
        case 0:
            persistThreshold = '0-Ignore-Errors'
            break
        case 1:
            persistThreshold = '1-Abort-on-Errors'
            break
        default:
            persistThreshold = '2-Abort-Even-on-Warnings'
    }

    const errorHandler = new ErrorDataHandler(
        runtimeInfo.sourceType,
        persistThreshold,
        runtimeInfo.fileName,
    )

    if (yiniContent.trim() === '') {
        const isFileSourceType: boolean = runtimeInfo?.sourceType === 'File'
        // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
        errorHandler.pushOrBail(
            null,
            'Syntax-Error',
            'Empty YINI document.',
            `The input is blank or contains only whitespace in the ${isFileSourceType ? 'YINI file' : 'YINI inline content'}.`,
            `Tip: Add at least one section '^ SectionName' or a key-value pair 'key = value' to make it a valid YINI file.`,
        )
    }

    //---------------------------------------------
    // Note: Only computed when isWithTiming.
    let timeStartMs: number = 0
    let timeEnd1Ms: number = 0
    let timeEnd2Ms: number = 0
    let timeEnd3Ms: number = 0
    let timeEnd4Ms: number = 0
    //---------------------------------------------

    //---------------------------------------------
    // Note: Should ALWAYS be computed.
    let runStartedAt = ''
    let runFinishedAt = ''
    let durationMs: number = 0
    //---------------------------------------------

    isDebug() && console.log()
    debugPrint(
        '=== Phase 1 - Lexing ===================================================',
    )
    // -----------------------------
    // Below block should always be done despite isWithTiming to compute
    // total time and runStartedAt that should always be computed.
    {
        timeStartMs = performance.now()
        runStartedAt = new Date().toISOString()
    }
    // -----------------------------

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

    const builder = new ASTBuilder(
        errorHandler,
        options,
        runtimeInfo.sourceType,
        runtimeInfo.fileName || null,
    )
    const ast: IYiniAST = builder.buildAST(parseTree)
    if (ast.numOfMembers === 0 && ast.numOfSections === 0) {
        // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
        errorHandler.pushOrBail(
            null,
            'Syntax-Error',
            'No meaningful content.',
            `No sections or members found in the ${ast.sourceType === 'File' ? 'YINI file' : 'YINI inline content'}.`,
            `${ast.sourceType === 'File' ? 'A valid YINI file' : 'Any valid YINI inline content'} must contain at least one section '^ SectionName' or a key–value pair 'key = value' to make it a valid YINI file.`,
        )
    }

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
    // -----------------------------
    // Below block should always be done despite isWithTiming to compute
    // total time and runStartedAt that should always be computed.
    {
        timeEnd4Ms = performance.now()
        durationMs = timeEnd4Ms - timeStartMs
        runFinishedAt = new Date().toISOString()
    }
    // -----------------------------

    debugPrint('visitor.visit(..): finalJSResult:')
    isDebug() && console.debug(finalJSResult)
    debugPrint()

    if (options.isStrict) {
        // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
        errorHandler.pushOrBail(
            null,
            'Syntax-Warning',
            'Warning: Strict mode is not yet fully implemented.',
            'Some validation rules may still be missing or incomplete.',
        )
    } else {
        debugPrint('visitor.visit(..): finalJSResult:')
        isDebug() && console.debug(finalJSResult)
    }

    const constructResultMetaData = (): IResultMetaData => {
        // --- Construct meta information -------------------------------------
        const to3 = (n: number): number => Number.parseFloat(n.toFixed(3))

        // Construct meta data.
        const metaData: IResultMetaData = {
            parserVersion: pkg.version,
            mode: options.isStrict ? 'strict' : 'lenient',
            totalErrors: errorHandler.getNumOfErrors(),
            totalWarnings: errorHandler.getNumOfWarnings(),
            totalMessages: errorHandler.getNumOfAllMessages(),
            runStartedAt,
            runFinishedAt,
            durationMs: to3(durationMs),
            preservesOrder: true,
            orderGuarantee: 'implementation-defined',
            source: {
                sourceType: toLowerSnakeCase(ast.sourceType),
                fileName: ast.fileName,
                hasDocumentTerminator: ast.terminatorSeen,
                hasYiniMarker: ast.yiniMarkerSeen,
                lineCount: runtimeInfo.lineCount,
                byteSize: runtimeInfo.fileByteSize,
                sha256: runtimeInfo.sha256,
            },
            structure: {
                maxDepth: ast.maxDepth,
                sectionCount: ast.numOfSections,
                memberCount: ast.numOfMembers,
                keysParsedCount: null,
                // objectCount: null,
                // listCount: null,
                sectionNamePaths: ast.sectionNamePaths,
            },
            metaSchemaVersion: '1.1.0',
        }

        // Attach optional diagnostics.
        if (options.isWithDiagnostics) {
            // const mapToFailLevel = (
            //     level: TBailSensitivityLevel,
            // ): TPreferredFailLevel => {
            //     switch (level) {
            //         case 0:
            //             return 'ignore-errors'
            //         case 1:
            //             return 'errors'
            //         case 2:
            //             return 'warnings-and-errors'
            //     }
            // }
            const mapLevelKey = (
                level: TBailSensitivityLevel,
            ): TFailLevelKey => {
                switch (level) {
                    case 0:
                        return 'ignore-errors'
                    case 1:
                        return 'errors'
                    case 2:
                        return 'warnings-and-errors'
                }
            }
            const mapLevelLabel = (
                level: TBailSensitivityLevel,
            ): TPersistThreshold => {
                switch (level) {
                    case 0:
                        return '0-Ignore-Errors'
                    case 1:
                        return '1-Abort-on-Errors'
                    case 2:
                        return '2-Abort-Even-on-Warnings'
                }
            }
            const mapLevelDescription = (
                level: TBailSensitivityLevel,
            ): string | null => {
                switch (level) {
                    case 0:
                        return 'Continue despite errors.'
                    case 1:
                        return 'Abort when errors occur.'
                    case 2:
                        return 'Abort when errors or warnings occur.'
                }
                return null
            }

            metaData.diagnostics = {
                failLevel: {
                    preferredLevel: runtimeInfo.preferredBailSensitivity,
                    levelUsed: options.bailSensitivity,
                    levelKey: mapLevelKey(options.bailSensitivity),
                    levelLabel: mapLevelLabel(options.bailSensitivity),
                    levelDescription: <any>(
                        mapLevelDescription(options.bailSensitivity)
                    ),
                },
                errors: {
                    errorCount: errorHandler.getNumOfErrors(),
                    payload: errorHandler.getErrors(),
                },
                warnings: {
                    warningCount: errorHandler.getNumOfWarnings(),
                    payload: errorHandler.getWarnings(),
                },
                notices: {
                    noticeCount: errorHandler.getNumOfNotices(),
                    payload: errorHandler.getNotices(),
                },
                infos: {
                    infoCount: errorHandler.getNumOfInfos(),
                    payload: errorHandler.getInfos(),
                },
                environment: {
                    NODE_ENV: process.env.NODE_ENV,
                    APP_ENV: process.env.APP_ENV,
                    lib: {
                        nodeEnv: localNodeEnv,
                        appEnv: localAppEnv,
                        flags: { isDev: isDev(), isDebug: isDebug() },
                    },
                },
                optionsUsed: {
                    // NOTE: (!) These MUST be user options.
                    strictMode: options.isStrict,
                    failLevel: mapLevelKey(options.bailSensitivity),
                    includeMetaData: options.isIncludeMeta,
                    includeDiagnostics: options.isWithDiagnostics,
                    includeTiming: options.isWithTiming,
                    preserveUndefinedInMeta: options.isKeepUndefinedInMeta,
                    suppressWarnings: options.isAvoidWarningsInConsole,
                    requireDocTerminator: options.requireDocTerminator,
                    treatEmptyValueAsNull: options.treatEmptyValueAsNull,
                    onDuplicateKey: options.onDuplicateKey,
                },
            }
        }

        // Attach optional durations timing data.
        if (options.isWithTiming) {
            metaData.timing = {
                total: !options.isWithTiming
                    ? null
                    : {
                          timeMs: to3(durationMs), // durationMs = timeEnd4Ms - timeStartMs
                          name:
                              runtimeInfo.sourceType === 'Inline'
                                  ? 'Total'
                                  : 'Total (excluding phase0 (I/O))',
                      },
                phase0:
                    !options.isWithTiming || runtimeInfo.sourceType === 'Inline'
                        ? undefined
                        : {
                              timeMs: to3(runtimeInfo.timeIoMs!),

                              name: 'I/O',
                          },
                phase1: !options.isWithTiming
                    ? null
                    : {
                          timeMs: to3(timeEnd1Ms - timeStartMs),

                          name: 'Lexing',
                      },
                phase2: !options.isWithTiming
                    ? null
                    : {
                          timeMs: to3(timeEnd2Ms - timeEnd1Ms),
                          name: 'Parsing',
                      },
                phase3: !options.isWithTiming
                    ? null
                    : {
                          timeMs: to3(timeEnd3Ms - timeEnd2Ms),
                          name: 'AST Building',
                      },
                phase4: !options.isWithTiming
                    ? null
                    : {
                          timeMs: to3(timeEnd4Ms - timeEnd3Ms),
                          name: 'Object Building',
                      },
            }
        }

        return metaData
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
            meta: !options.isKeepUndefinedInMeta
                ? removeUndefinedDeep(constructResultMetaData())
                : constructResultMetaData(),
        }
    }

    return finalJSResult as any
}
