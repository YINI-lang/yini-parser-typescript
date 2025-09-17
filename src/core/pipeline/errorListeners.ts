import { isError } from 'util'
import { ErrorListener, RecognitionException, Token } from 'antlr4'
import { isProdEnv } from '../../config/env'
import { YiniContext } from '../../grammar/generated/YiniParser'
import { debugPrint } from '../../utils/print'
import { ErrorDataHandler } from '../errorDataHandler'

export const createLexerErrorListener = (
    errorHandler: ErrorDataHandler,
): MyLexerErrorListener => {
    return new MyLexerErrorListener(errorHandler)
}

export const createParserErrorListener = (
    errorHandler: ErrorDataHandler,
): MyParserErrorListener => {
    return new MyParserErrorListener(errorHandler)
}

/**
 * @param line Line number as 1-based.
 * @param col Column number as 0-based.
 *
 * @note Refactor away this function if possible, due to this context ad-hoc
 * is brittle, it relies on runtime internals of ANTLR generated code.
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
    // if (startColumn && startColumn >= 0) {
    if (startColumn !== undefined) {
        ctx.start.column = startColumn // Note: Column num is 0-based.
        ctx.stop.line = line
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
            // return 0
            return undefined
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

class MyLexerErrorListener implements ErrorListener<any> {
    // public errors: string[] = []
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

class MyParserErrorListener implements ErrorListener<any> {
    // public errors: string[] = []
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
