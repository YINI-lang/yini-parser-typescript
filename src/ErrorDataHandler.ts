import { isDebug } from './config/env'
import { debugPrint } from './utils/system'

interface IIssuePayload {
    type: TIssueType
    msgWhat: string
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
    | 'Fatal-Error'
    | 'Internal-Error'
    | 'Syntax-Error'
    | 'Syntax-Warning'
    | 'Notice'
    | 'Info'

// All the issue titles are defined here to get a quick overview of all
// titles, and to easier check that all titles match with relation to
// the other titles.
const issueTitle: string[] = [
    'FATAL ERROR!',
    'Internal error!', // 'Internal-Error'.
    'Syntax error.', // 'Syntax-Error'.
    'Syntax warning.',
    'Notice:',
    'Info:',
]

/**
 * This class handles all error/notice reporting and processes exit/throwing.
 */
export class ErrorDataHandler {
    private bailThreshold: TBailThreshold

    /** '1-Abort-on-Errors' is the default.

        Below is from the YINI spec:
            **Abort Sensitivity Levels** while parsing a YINI document:
            (AKA severity threshold)
            - Level 0 = ignore errors and try parse anyway (may remap falty key/section names)
            - Level 1 = abort on errors only
            - Level 2 = abort even on warnings
     */
    constructor(threshold: TBailThreshold = '1-Abort-on-Errors') {
        this.bailThreshold = threshold
    }

    makeIssuePayload = (
        type: TIssueType,
        msgWhat: string,
        lineNum: number,
        startCol: number,
        endCol: number,
        // msgHintOrFix: string = '', // Hint or wow to fix.
    ): IIssuePayload => {
        const issue: IIssuePayload = {
            type,
            msgWhat,
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

    /**
     * After pushing processing may continue or exit, depending on the error
     * and/or the bail threshold (that can be optionally set my the user).
     *
     * @note This function MIGHT result in a return, throw, or exit depending
     * on the bail policy (set my the user).
     *
     * @param ctx
     * @param type
     * @param msgWhat Name of the specific error or what failed. E.g. "Key already exists in this section scope".
     * @param msgWhy More details and more specific info about the issue/error.
     * @param msgHint Hint or HUMBLE description on how to fix the issue.
     */
    pushOrBail = (
        ctx: any,
        type: TIssueType,
        msgWhat: string,
        msgWhy: string = '',
        msgHint: string = '',
    ) => {
        debugPrint('-> pushOrBail(..)')
        debugPrint('ctx.exception?.name       =' + ctx?.exception?.name)
        debugPrint('ctx.exception?.message    = ' + ctx?.exception?.message)
        debugPrint(
            'exception?.offendingToken = ' + ctx?.exception?.offendingToken,
        )
        debugPrint()
        debugPrint('ctx.ruleIndex    = ' + ctx?.start.channel)
        debugPrint('ctx.ruleIndex    = ' + ctx?.ruleIndex)
        debugPrint('ctx.ruleContext  = ' + ctx?.ruleContext)
        debugPrint('ctx.stop?.line   = ' + ctx?.stop?.line)
        debugPrint('ctx.stop?.column = ' + ctx?.stop?.column)

        const lineNum: number = ctx?.start.line || 0 // Column (1-based).
        const startCol = !ctx ? 0 : ++ctx.start.column // Column (0-based).
        const endCol = (ctx?.stop?.column || 0) + 1 // Column (0-based).

        // Patch message with the offending line number.
        msgWhat += ', at line: ' + lineNum

        if (process.env.NODE_ENV === 'test') {
            msgWhat += `\nAt line: ${lineNum}, column(s): ${startCol}-${endCol}`
        }

        debugPrint('bailThreshold = ' + this.bailThreshold)
        debugPrint('lineNum = ' + lineNum)
        debugPrint()

        const issue: IIssuePayload = this.makeIssuePayload(
            type,
            msgWhat,
            lineNum,
            startCol,
            endCol,
        )

        switch (type) {
            case 'Internal-Error':
                this.emitInternalError(msgWhat, msgWhy, msgHint)
                if (
                    this.bailThreshold === '1-Abort-on-Errors' ||
                    this.bailThreshold === '2-Abort-Even-on-Warnings'
                ) {
                    if (process.env.NODE_ENV === 'test') {
                        // In test, throw an error instead of exiting.
                        throw new Error(`Internal-Error: ${msgWhat}`)
                    } else {
                        process.exit(2)
                    }
                }
                break
            case 'Syntax-Error':
                this.emitSyntaxError(msgWhat, msgWhy, msgHint)
                if (
                    this.bailThreshold === '1-Abort-on-Errors' ||
                    this.bailThreshold === '2-Abort-Even-on-Warnings'
                ) {
                    if (process.env.NODE_ENV === 'test') {
                        // In test, throw an error instead of exiting.
                        throw new Error(`Syntax-Error: ${'' + msgWhat}`)
                    } else {
                        process.exit(3)
                    }
                }
                break
            case 'Syntax-Warning':
                this.emitSyntaxWarning(msgWhat, msgWhy, msgHint)
                if (this.bailThreshold === '2-Abort-Even-on-Warnings') {
                    if (process.env.NODE_ENV === 'test') {
                        // In test, throw an error instead of exiting.
                        throw new Error(`Syntax-Warning: ${msgWhat}`)
                    } else {
                        process.exit(4)
                    }
                }
                break
            case 'Notice':
                this.emitNotice(msgWhat, msgWhy, msgHint)
                break
            case 'Info':
                this.emitInfo(msgWhat, msgWhy, msgHint)
                break
            default: // Including 'Internal-Error'.
                this.emitFatalError(msgWhat, msgWhy, msgHint)
                // CANNOT recover fatal errors, will lead to an exit!
                if (process.env.NODE_ENV === 'test') {
                    // In test, throw an error instead of exiting.
                    throw new Error(`Internal-Error: ${msgWhat}`)
                } else {
                    process.exit(1)
                    // (!) Not sure about the below yet, if it's preferable in this case...
                    // Use this instead of process.exit(1), this will
                    // lead to that the current thread(s) will exit as well.
                    // process.exitCode = 1
                }
        }
    }

    private emitFatalError = (
        msgWhat = 'Something went wrong!',
        msgWhy = '',
        msgHint = '',
    ) => {
        console.error(issueTitle[0]) // Print the issue title.
        msgWhat && console.error(msgWhat)
        msgWhy && console.error(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitInternalError = (
        msgWhat = 'Something went wrong!',
        msgWhy = '',
        msgHint = '',
    ) => {
        console.error(issueTitle[1]) // Print the issue title.
        msgWhat && console.error(msgWhat)
        msgWhy && console.error(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitSyntaxError = (msgWhat: string, msgWhy = '', msgHint = '') => {
        console.error(issueTitle[2]) // Print the issue title.
        msgWhat && console.error(msgWhat)
        msgWhy && console.error(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitSyntaxWarning = (
        msgWhat: string,
        msgWhy = '',
        msgHint = '',
    ) => {
        console.warn(issueTitle[3]) // Print the issue title.
        msgWhat && console.warn(msgWhat)
        msgWhy && console.warn(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitNotice = (msgWhat: string, msgWhy = '', msgHint = '') => {
        console.warn(issueTitle[4]) // Print the issue title.
        msgWhat && console.warn(msgWhat)
        msgWhy && console.warn(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitInfo = (msgWhat: string, msgWhy = '', msgHint = '') => {
        console.info(issueTitle[5]) // Print the issue title.
        msgWhat && console.info(msgWhat)
        msgWhy && console.info(msgWhy)
        msgHint && console.log(msgHint)
    }
}
