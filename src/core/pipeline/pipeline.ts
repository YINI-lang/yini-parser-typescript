/**
 * This file is the orchestrator that wires up the pipeline (lexer → parser →
 * astBuilder → objectBuilder, etc.)
 */

import { performance } from 'perf_hooks'
import { CharStreams, CommonTokenStream } from 'antlr4'
import { isDebug } from '../../config/env'
import YiniLexer from '../../grammar/generated/YiniLexer'
import YiniParser, { YiniContext } from '../../grammar/generated/YiniParser'
import {
    ParsedObject,
    ParseOptions,
    ResultMetadata,
    YiniParseResult,
} from '../../types'
import { removeUndefinedDeep } from '../../utils/object'
import { debugPrint, printObject } from '../../utils/print'
import ASTBuilder from '../astBuilder'
import { ErrorDataHandler } from '../errorDataHandler'
import { IParseCoreOptions, IRuntimeInfo, IYiniAST } from '../internalTypes'
import { astToObject } from '../objectBuilder'
import {
    buildResultMetadata,
    IBuildResultMetadataParams,
} from '../resultMetadataBuilder'
import {
    createLexerErrorListener,
    createParserErrorListener,
} from './errorListeners'

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
    debugPrint('-> Entered runPipeline(..) in pipeline.ts')
    debugPrint('    isStrict initialMode = ' + coreOptions.rules.initialMode)
    debugPrint('         bailSensitivity = ' + coreOptions.bailSensitivity)
    debugPrint('           isIncludeMeta = ' + coreOptions.isIncludeMeta)
    debugPrint('       isWithDiagnostics = ' + coreOptions.isWithDiagnostics)
    debugPrint('            isWithTiming = ' + coreOptions.isWithTiming)
    debugPrint(
        '   isKeepUndefinedInMeta = ' + coreOptions.isKeepUndefinedInMeta,
    )
    debugPrint('isQuiet = ' + coreOptions.isQuiet)
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
        coreOptions.isQuiet,
        coreOptions.isSilent,
        coreOptions.isThrowOnError,
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
    // const lexerErrorListener = new MyLexerErrorListener(errorHandler)
    const lexerErrorListener = createLexerErrorListener(errorHandler)
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
    // const parserErrorListener = new MyParserErrorListener(errorHandler)
    const parserErrorListener = createParserErrorListener(errorHandler)
    parser.addErrorListener(parserErrorListener)

    const parseTree: YiniContext = parser.yini() // The function yini() is the start rule.
    // if (
    //     parserErrorListener.errors.length > 0 ||
    //     lexerErrorListener.errors.length > 0
    // ) {
    //     debugPrint('*** ERROR detected ***')

    //     if (isDebug()) {
    //         // Handle or display syntax errors
    //         console.error(
    //             'Syntax errors detected:',
    //             parserErrorListener.errors,
    //             lexerErrorListener.errors,
    //         )
    //     }
    // }

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

    const builder = new ASTBuilder(
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

        if (coreOptions.bailSensitivity === '0-Ignore-Errors') {
            // IMPORTANT: If "silent" option is set, do not log anything to console!
            if (!coreOptions.isQuiet && !coreOptions.isSilent) {
                console.warn(
                    `Warning: The initial mode was set to strict mode, but fail level is set to 'ignore-errors'. This combination is contradictory and might be a mistake.`,
                )
            }
        }
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

    // Print a summary line at the end if any errors or warnings.
    if (!coreOptions.isQuiet && !coreOptions.isSilent) {
        const errors: number = errorHandler.getNumOfErrors()
        const warnings: number = errorHandler.getNumOfWarnings()

        // Notes:
        // - if any errors, print to console **ERROR**.
        // - if no errors but warnings, print to console **WARN**.
        // Otherwise, adds a lot more complexity to auto testing (especially options testing), etc.
        //
        // Also, output one concise summary line (according to "best practices").

        if (coreOptions.bailSensitivity !== '0-Ignore-Errors') {
            /*
                '1-Abort-on-Errors':
                Show summary if: errors >= 1 or warnings >= 3.

                '2-Abort-Even-on-Warnings':
                Show summary if: errors >= 1 or warnings >= 1
            */

            const numOfWarningsToTrigger =
                coreOptions.bailSensitivity === '1-Abort-on-Errors' ? 3 : 1

            if (errors) {
                console.error(
                    `Parsing completed with ${errors} error(s), ${warnings} warning(s). Please see details above.`,
                )
            } else if (
                warnings >= numOfWarningsToTrigger &&
                !coreOptions.isQuiet
            ) {
                console.warn(
                    `Parsing completed with ${errors} error(s), ${warnings} warning(s).`,
                )
            }
        }
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
