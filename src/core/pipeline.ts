/**
 * This file is the orchestrator that wires up the pipeline (lexer → parser →
 * astBuilder → objectBuilder, etc.)
 */

import { performance } from 'perf_hooks'
import { isError } from 'util'
import {
    CharStreams,
    CommonTokenStream,
    ErrorListener,
    RecognitionException,
    Recognizer,
    Token,
} from 'antlr4'
import {
    isDebug,
    isDev,
    isProdEnv,
    localAppEnv,
    localNodeEnv,
} from '../config/env'
import YiniLexer from '../grammar/generated/YiniLexer'
import YiniParser, { YiniContext } from '../grammar/generated/YiniParser'
import {
    FailLevelKey,
    ParsedObject,
    ParseOptions,
    ResultMetadata,
    YiniParseResult,
} from '../types'
import { removeUndefinedDeep, sortObjectKeys } from '../utils/object'
import { debugPrint, printObject } from '../utils/print'
import { toLowerKebabCase, toLowerSnakeCase } from '../utils/string'
import astBuilder from './astBuilder'
import { ErrorDataHandler } from './errorDataHandler'
import { IParseCoreOptions, IRuntimeInfo, IYiniAST } from './internalTypes'
import { astToObject } from './objectBuilder'
import {
    buildResultMetadata,
    IBuildResultMetadataParams,
} from './resultMetadataBuilder'

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

        if (isProdEnv()) {
            return 0
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

/**
 * @internal Single source of truth.
 *
 * Entrypoint for the YINI parsing pipeline:
 * tokenization → grammar parse → AST build → object build → result.
 *
 * @param _meta_userOpts The user options from which the core options were
 *        derived/resolved from. This object is provided only for debugging
 *        and metadata purposes and should not be relied upon in
 *        application logic.
 */
export const runPipeline = (
    yiniContent: string,
    coreOptions: IParseCoreOptions,
    runtimeInfo: IRuntimeInfo,
    _meta_userOpts: ParseOptions,
): ParsedObject | YiniParseResult => {
    debugPrint()
    debugPrint('-> Entered parseMain(..) in parseEntry')
    debugPrint('    isStrict initialMode = ' + coreOptions.rules.initialMode)
    debugPrint('         bailSensitivity = ' + coreOptions.bailSensitivity)
    debugPrint('           isIncludeMeta = ' + coreOptions.isIncludeMeta)
    debugPrint('       isWithDiagnostics = ' + coreOptions.isWithDiagnostics)
    debugPrint('            isWithTiming = ' + coreOptions.isWithTiming)
    debugPrint(
        '   isKeepUndefinedInMeta = ' + coreOptions.isKeepUndefinedInMeta,
    )
    debugPrint(
        'isAvoidWarningsInConsole = ' + coreOptions.isAvoidWarningsInConsole,
    )
    debugPrint('          onDuplicateKey = ' + coreOptions.rules.onDuplicateKey)
    debugPrint(
        '    requireDocTerminator = ' + coreOptions.rules.requireDocTerminator,
    )
    debugPrint(
        '   treatEmptyValueAsNull = ' + coreOptions.rules.treatEmptyValueAsNull,
    )
    debugPrint()
    debugPrint('  runtimeInfo.sourceType = ' + runtimeInfo.sourceType)
    debugPrint('    runtimeInfo.fileName = ' + runtimeInfo.fileName)

    // let persistThreshold: TBailSensitivityLevel
    // switch (coreOptions.bailSensitivity) {
    //     case '0-Ignore-Errors':
    //         persistThreshold = '0-Ignore-Errors'
    //         break
    //     case 1:
    //         persistThreshold = '1-Abort-on-Errors'
    //         break
    //     default:
    //         persistThreshold = '2-Abort-Even-on-Warnings'
    // }

    const errorHandler = new ErrorDataHandler(
        runtimeInfo.sourceType,
        runtimeInfo.fileName,
        coreOptions.bailSensitivity,
        coreOptions.isAvoidWarningsInConsole,
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
    if (coreOptions.isWithTiming) {
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
    if (coreOptions.isWithTiming) {
        timeEnd2Ms = performance.now()
    }

    const builder = new astBuilder(
        errorHandler,
        coreOptions,
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
    if (coreOptions.isWithTiming) {
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

    if (coreOptions.rules.initialMode === 'strict') {
        // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
        errorHandler.pushOrBail(
            null,
            'Syntax-Warning',
            'Warning: Strict initialMode is not yet fully implemented.',
            'Some validation rules may still be missing or incomplete.',
        )
    } else {
        debugPrint('visitor.visit(..): finalJSResult:')
        isDebug() && console.debug(finalJSResult)
    }

    const params: IBuildResultMetadataParams = {
        ast,
        coreOptions,
        runtimeInfo,
        _meta_userOpts,
        errorHandler,
        runStartedAt,
        runFinishedAt,
        durationMs,
        timeStartMs,
        timeEnd1Ms,
        timeEnd2Ms,
        timeEnd3Ms,
        timeEnd4Ms,
    }
    const constructedMetadata: ResultMetadata = buildResultMetadata(params)

    debugPrint('getNumOfErrors(): ' + errorHandler.getNumOfErrors())
    if (errorHandler.getNumOfErrors()) {
        // console.log()
        console.log(
            'Parsing is complete, but some problems were detected. Please see the errors above for details.',
        )
        console.log('Number of errors found: ' + errorHandler.getNumOfErrors())
    }

    if (coreOptions.isIncludeMeta) {
        return {
            result: finalJSResult as any,
            meta: !coreOptions.isKeepUndefinedInMeta
                ? removeUndefinedDeep(constructedMetadata)
                : constructedMetadata,
        } as YiniParseResult
    }

    return finalJSResult as ParsedObject
}
