import { isDebug } from './config/env'
import { debugPrint } from './utils/system'
import YINI from './YINI'

// class CustomError extends Error {
//     constructor(
//         public code: string,
//         public context: Record<string, unknown>,
//     ) {
//         super(code)

//         this.name = 'CustomError'
//     }
// }

/*
export interface IErrorContext {
    start: {
        line: number
        column: number
    }
    end?: {
        line?: number
        column?: number
    }
}
*/

interface IIssuePayload {
    type: TIssueType
    msgWhatOrWhy: string
    // msgHintOrFix: string = '', // Hint or wow to fix.
    start: {
        line: number
        column: number
    }
    end?: {
        line?: number
        column?: number
    }
}

export type TBailThreshold =
    | '0-Ignore-Errors'
    | '1-Abort-on-Errors'
    | '2-Abort-Even-on-Warnings'

export type TIssueType =
    | 'Internal-Error'
    | 'Syntax-Error'
    | 'Syntax-Warning'
    | 'Notice'
    | 'Info'

// All the issue titles are defined here to get a quick overview of all
// titles, and to easier check that all titles match with relation to
// the other titles.
const issueTitle: string[] = [
    'FATAL ERROR!', // 'Internal-Error'.
    'Syntax error.', // 'Syntax-Error'.
    'Syntax warning.',
    'Notice:',
    'Info:',
]

export class InvalidDataHandler {
    private static singleton: InvalidDataHandler | null = null
    // `strict` as well as `lenient` parsing modes.
    private bailThreshold: TBailThreshold
    // private ectx: IErrorContext | null = null

    private constructor(threshold: TBailThreshold = '1-Abort-on-Errors') {
        this.bailThreshold = threshold
    }

    /* '1-Abort-on-Errors' is the default.

        Below is from the YINI spec:
            **Abort Sensitivity Levels** while parsing a YINI document:
            (AKA severity threshold)
            - Level 0 = ignore errors and try parse anyway (may remap falty key/section names)
            - Level 1 = abort on errors only
            - Level 2 = abort even on warnings
     */
    public static getInstance = (
        threshold: TBailThreshold = '1-Abort-on-Errors',
    ) => {
        if (!this.singleton) {
            this.singleton = new InvalidDataHandler(threshold)
        }

        return this.singleton
    }

    makeIssuePayload = (
        type: TIssueType,
        msgWhatOrWhy: string,
        lineNum: number,
        startCol: number,
        endCol: number,
        // msgHintOrFix: string = '', // Hint or wow to fix.
    ): IIssuePayload => {
        const issue: IIssuePayload = {
            type,
            msgWhatOrWhy,
            // msgHintOrFix: string = '', // Hint or wow to fix.
            start: {
                line: lineNum,
                column: startCol,
            },
            end: {
                line: lineNum,
                column: endCol,
            },
        }

        debugPrint('issue:')
        isDebug() && console.log(issue)
        return issue
    }

    pushOrBail = (
        ctx: any,
        type: TIssueType,
        msgWhatOrWhy: string,
        // msgHintOrFix: string = '', // Hint or wow to fix.
    ) => {
        debugPrint('-> pushOrBail(..)')
        debugPrint('ctx.exception?.name       =' + ctx.exception?.name)
        debugPrint('ctx.exception?.message    = ' + ctx.exception?.message)
        debugPrint(
            'exception?.offendingToken = ' + ctx.exception?.offendingToken,
        )
        debugPrint()
        debugPrint('ctx.ruleIndex    = ' + ctx.start.channel)
        debugPrint('ctx.ruleIndex    = ' + ctx.ruleIndex)
        debugPrint('ctx.ruleContext  = ' + ctx.ruleContext)
        debugPrint('ctx.stop?.line   = ' + ctx.stop?.line)
        debugPrint('ctx.stop?.column = ' + ctx.stop?.column)

        // this.ectx = {
        //     start: { line: ctx.start.line, column: ctx.start.line },
        //     end: { line: ctx.stop?.line, column: ctx.stop?.line },
        // }
        const lineNum: number = ctx.start.line // Column (1-based).
        const startCol = ++ctx.start.column // Column (0-based).
        const endCol = (ctx.stop?.column || 0) + 1 // Column (0-based).

        // Patch message with the offending line number.
        msgWhatOrWhy += ':' + ctx.start.line

        if (process.env.NODE_ENV === 'test') {
            msgWhatOrWhy += `\nAt line: ${lineNum}, column(s): ${startCol}-${endCol}`
        }

        console.log('bailThreshold = ' + this.bailThreshold)
        console.log('lineNum = ' + ctx.start.lineNum)
        console.log()

        const issue: IIssuePayload = this.makeIssuePayload(
            type,
            msgWhatOrWhy,
            lineNum,
            startCol,
            endCol,
        )
        // msgHintOrFix: string = '', // Hint or wow to fix.

        switch (type) {
            case 'Syntax-Error':
                this.emitSyntaxError(msgWhatOrWhy)
                if (
                    this.bailThreshold === '1-Abort-on-Errors' ||
                    this.bailThreshold === '2-Abort-Even-on-Warnings'
                ) {
                    if (process.env.NODE_ENV === 'test') {
                        // In test, throw an error instead of exiting.
                        throw new Error(`Syntax-Error: ${'' + msgWhatOrWhy}`)
                    } else {
                        process.exit(2)
                    }
                }
                break
            case 'Syntax-Warning':
                this.emitSyntaxWarning(msgWhatOrWhy)
                if (this.bailThreshold === '2-Abort-Even-on-Warnings') {
                    if (process.env.NODE_ENV === 'test') {
                        // In test, throw an error instead of exiting.
                        throw new Error(`Syntax-Warning: ${msgWhatOrWhy}`)
                    } else {
                        process.exit(3)
                    }
                }
                break
            case 'Notice':
                this.emitNotice(msgWhatOrWhy)
                break
            case 'Info':
                this.emitInfo(msgWhatOrWhy)
                break
            default: // Including 'Internal-Error'.
                this.emitInternalError(msgWhatOrWhy)
                if (process.env.NODE_ENV === 'test') {
                    // In test, throw an error instead of exiting.
                    throw new Error(`Internal-Error: ${msgWhatOrWhy}`)
                } else {
                    // Use this instead of process.exit(1), this will
                    // lead to exit the current thread(s) as well.
                    process.exitCode = 1
                }
        }
    }

    // handleError(error: ValidationError) {
    //     // log, throw, notify, etc.
    // }

    // handleWarning(warning: ValidationWarning) {
    //     // show a warning, log, etc.
    // }

    // private printLineColInfo = (msg: string) => {
    //     console.log('XXXQQQWWW = ' + YINI.fullPath)
    // }

    private emitInternalError = (msg: string = 'Something went wrong!') => {
        console.error(issueTitle[0]) // Print the issue title.
        console.error(msg)
        // console.error() // Newline.
        // if (YINI.fullPath) {
        //     const lineNumber = this.ectx?.start.line || 0
        //     console.error('In file: \"' + YINI.fullPath + '\": ' + lineNumber)
        // }
        //        console.error(msg)
        // this.printLineColInfo(msg)
    }

    private emitSyntaxError = (msg: string) => {
        console.error(issueTitle[1]) // Print the issue title.
        console.error(msg)
        // console.error() // Newline.
        // if (YINI.fullPath) {
        //     const lineNumber = this.ectx?.start.line || 0
        //     console.error('In file: \"' + YINI.fullPath + '\": ' + lineNumber)
        // }
        // console.error(msg)
        // this.printLineColInfo(msg)
    }

    private emitSyntaxWarning = (msg: string) => {
        console.warn(issueTitle[2]) // Print the issue title.
        // console.warn() // Newline.
        // if (YINI.fullPath) {
        //     const lineNumber = this.ectx?.start.line || 0
        //     console.warn('In file: \"' + YINI.fullPath + '\": ' + lineNumber)
        // }
        // console.warn(msg)
        // this.printLineColInfo(msg)
        console.warn(msg)
    }

    private emitNotice = (msg: string) => {
        console.warn(issueTitle[3]) // Print the issue title.
        // YINI.fullPath && console.warn('In file: \"' + YINI.fullPath + '\"')
        // console.warn(msg)
        // this.printLineColInfo(msg)
        console.warn(msg)
    }

    private emitInfo = (msg: string) => {
        console.info(issueTitle[4]) // Print the issue title.
        // YINI.fullPath && console.info('In file: \"' + YINI.fullPath + '\"')
        // console.info(msg) // Newline.
        // this.printLineColInfo(msg)
        console.info(msg)
    }
}
