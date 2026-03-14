// src/core/pipeline/errorListeners.ts
import { ErrorListener, RecognitionException } from 'antlr4'
import { debugPrint } from '../../utils/print'
import { ErrorDataHandler } from '../errorDataHandler'
import { IErrorLocationInput } from '../internalTypes'

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

class MyLexerErrorListener implements ErrorListener<any> {
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

        // const msgWhat = `Syntax error at line ${line}, column ${col}:`
        const msgWhat = `Syntax error`

        // Try to map message:
        // From: "mismatched input '/END' expecting <EOF>"
        // To:   "Found '/END', but expected the end of the document."
        // const msgWhy = `${capitalizeFirst(msg)}`
        const msgWhy = `Details: ${msg}`
        // const msgHint = ``

        // So we can show line/col in error message.
        const loc: IErrorLocationInput = {
            line,
            column: charPositionInLine + 1,
            endColumn: charPositionInLine + 1,
        }

        // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
        this.errorHandler.pushOrBail(loc, 'Syntax-Error', msgWhat, msgWhy)
    }
}

class MyParserErrorListener implements ErrorListener<any> {
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
        const possibleStartCol =
            recognizer?._ctx?.start?.column != null
                ? recognizer._ctx.start.column + 1
                : undefined

        const msgWhat = `Syntax error`

        // Try to map message:
        // From: "mismatched input '/END' expecting <EOF>"
        // To:   "Found '/END', but expected the end of the document."
        const msgWhy = `Details: ${msg}`

        const loc: IErrorLocationInput = {
            line,
            column: charPositionInLine + 1,
            endColumn: charPositionInLine + 1,
        }
        // Note, after pushing processing may continue or exit, depending on the error and/or the bail threshold.
        this.errorHandler.pushOrBail(loc, 'Syntax-Error', msgWhat, msgWhy)
    }

    // The following are required for the interface, but can be left empty.
    reportAmbiguity(...args: any[]): void {}
    reportAttemptingFullContext(...args: any[]): void {}
    reportContextSensitivity(...args: any[]): void {}
}
