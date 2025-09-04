import { isDebug, isTestEnv } from '../config/env'
import { YiniContext } from '../grammar/YiniParser'
import { debugPrint } from '../utils/print'
import { toLowerSnakeCase } from '../utils/string'
import { IIssuePayload, TIssueType, TPersistThreshold } from './types'

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
    private persistThreshold: TPersistThreshold

    private errors: IIssuePayload[] = []
    private warnings: IIssuePayload[] = []
    private notices: IIssuePayload[] = []
    private infos: IIssuePayload[] = []

    private numFatalErrors = 0
    private numInternalErrors = 0
    private numSyntaxErrors = 0
    private numSyntaxWarnings = 0
    private numNotices = 0
    private numInfos = 0

    /** '1-Abort-on-Errors' is the default.

        Below is from the YINI spec:
            **Abort Sensitivity Levels** while parsing a YINI document:
            (AKA severity threshold)
            - Level 0 = ignore errors and try parse anyway (may remap falty key/section names)
            - Level 1 = abort on errors only
            - Level 2 = abort even on warnings
     */
    constructor(threshold: TPersistThreshold = '1-Abort-on-Errors') {
        this.persistThreshold = threshold
    }

    private makeIssue(
        line: number | undefined,
        column: number | undefined,
        type: TIssueType,
        message: string,
        advice: string | undefined = undefined,
        hint: string | undefined = undefined,
    ): IIssuePayload {
        const issue: IIssuePayload = {
            line,
            column: !column ? undefined : column,
            typeKey: toLowerSnakeCase(type),
            message,
            advice: advice || undefined, // Note, this will render ''-values as undfined and omit these in console outputs.
            hint: hint || undefined, // Note, this will render ''-values as undfined and omit these in console outputs.
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
    public pushOrBail(
        ctx: any,
        type: TIssueType,
        msgWhat: string,
        msgWhy: string = '',
        msgHint: string = '',
    ) {
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

        const lineNum: number | undefined = ctx?.start.line || undefined // Line (1-based).
        // const startCol = !ctx ? 0 : ++ctx.start.column // Column (0-based).
        const startCol: number | undefined = !ctx
            ? undefined
            : ++ctx.start.column // Column (0-based).
        // const endCol = (ctx?.stop?.column || 0) + 1 // Column (0-based).
        const endCol: number | undefined = !!ctx?.stop?.column
            ? ++ctx.stop.column
            : undefined // Note: Column (0-based).

        let colNum: number | undefined = startCol || endCol
        // if (colNum === 0) {
        //     colNum = undefined
        // }
        let msgWhatWithLineNum = msgWhat

        if (lineNum && lineNum > 0) {
            //@todo func that removes possible . at end
            //msgWhatWithLineNum =

            // Patch message with the offending line number.
            msgWhatWithLineNum += ', at line: ' + lineNum

            if (process.env.NODE_ENV === 'test') {
                msgWhatWithLineNum += `\nAt line: ${lineNum}, column(s): ${startCol}-${endCol}`
            }
        }

        debugPrint('persistThreshold = ' + this.persistThreshold)
        debugPrint('lineNum = ' + lineNum)
        debugPrint()

        switch (type) {
            case 'Internal-Error':
                this.numInternalErrors++
                this.errors.push(
                    this.makeIssue(
                        lineNum,
                        colNum,
                        type,
                        msgWhat,
                        msgWhy,
                        msgHint,
                    ),
                )
                this.emitInternalError(msgWhatWithLineNum, msgWhy, msgHint)
                if (
                    this.persistThreshold === '1-Abort-on-Errors' ||
                    this.persistThreshold === '2-Abort-Even-on-Warnings'
                ) {
                    // if (process.env.NODE_ENV === 'test') {
                    // In test, throw an error instead of exiting.
                    throw new Error(`Internal-Error: ${msgWhat}`)
                    // } else {
                    //     process.exit(2)
                    // }
                }
                break
            case 'Syntax-Error':
                this.numSyntaxErrors++
                this.errors.push(
                    this.makeIssue(
                        lineNum,
                        colNum,
                        type,
                        msgWhat,
                        msgWhy,
                        msgHint,
                    ),
                )
                this.emitSyntaxError(msgWhatWithLineNum, msgWhy, msgHint)
                if (
                    this.persistThreshold === '1-Abort-on-Errors' ||
                    this.persistThreshold === '2-Abort-Even-on-Warnings'
                ) {
                    // if (process.env.NODE_ENV === 'test') {
                    // In test, throw an error instead of exiting.
                    throw new Error(`Syntax-Error: ${'' + msgWhat}`)
                    // } else {
                    //     process.exit(3)
                    // }
                }
                break
            case 'Syntax-Warning':
                this.numSyntaxWarnings++
                this.warnings.push(
                    this.makeIssue(
                        lineNum,
                        colNum,
                        type,
                        msgWhat,
                        msgWhy,
                        msgHint,
                    ),
                )
                this.emitSyntaxWarning(msgWhatWithLineNum, msgWhy, msgHint)
                if (this.persistThreshold === '2-Abort-Even-on-Warnings') {
                    // if (process.env.NODE_ENV === 'test') {
                    // In test, throw an error instead of exiting.
                    throw new Error(`Syntax-Warning: ${msgWhat}`)
                    // } else {
                    //     process.exit(4)
                    // }
                }
                break
            case 'Notice':
                this.numNotices++
                this.notices.push(
                    this.makeIssue(
                        lineNum,
                        colNum,
                        type,
                        msgWhat,
                        msgWhy,
                        msgHint,
                    ),
                )
                this.emitNotice(msgWhatWithLineNum, msgWhy, msgHint)
                break
            case 'Info':
                this.numInfos++
                this.infos.push(
                    this.makeIssue(
                        lineNum,
                        colNum,
                        type,
                        msgWhat,
                        msgWhy,
                        msgHint,
                    ),
                )
                this.emitInfo(msgWhatWithLineNum, msgWhy, msgHint)
                break
            default: // Including 'Internal-Error'.
                this.numFatalErrors++
                this.errors.push(
                    this.makeIssue(
                        lineNum,
                        colNum,
                        type,
                        msgWhat,
                        msgWhy,
                        msgHint,
                    ),
                )
                this.emitFatalError(msgWhatWithLineNum, msgWhy, msgHint)
                // CANNOT recover fatal errors, will lead to an exit!
                // if (process.env.NODE_ENV === 'test') {
                // In test, throw an error instead of exiting.
                throw new Error(`Internal-Error: ${msgWhat}`)
            // } else {
            //     process.exit(1)
            // (!) Not sure about the below yet, if it's preferable in this case...
            // Use this instead of process.exit(1), this will
            // lead to that the current thread(s) will exit as well.
            // process.exitCode = 1
            // }
        }
    }

    /*
    @todo: need: line, col, sourceType/filename
     */
    private formatSignificantMessageLine(issueTitle: string): string {
        return 'XXXX'
    }

    private emitFatalError(
        msgWhat = 'Something went wrong!',
        msgWhy = '',
        msgHint = '',
    ) {
        console.error(issueTitle[0]) // Print the issue title.
        msgWhat && console.log(msgWhat)
        msgWhy && console.log(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitInternalError(
        msgWhat = 'Something went wrong!',
        msgWhy = '',
        msgHint = '',
    ) {
        console.error(issueTitle[1]) // Print the issue title.
        msgWhat && console.log(msgWhat)
        msgWhy && console.log(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitSyntaxError(msgWhat: string, msgWhy = '', msgHint = '') {
        console.error(issueTitle[2]) // Print the issue title.
        msgWhat && console.log(msgWhat)
        msgWhy && console.log(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitSyntaxWarning(msgWhat: string, msgWhy = '', msgHint = '') {
        console.warn(issueTitle[3]) // Print the issue title.
        msgWhat && console.log(msgWhat)
        msgWhy && console.log(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitNotice(msgWhat: string, msgWhy = '', msgHint = '') {
        console.warn(issueTitle[4]) // Print the issue title.
        msgWhat && console.log(msgWhat)
        msgWhy && console.log(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitInfo(msgWhat: string, msgWhy = '', msgHint = '') {
        console.info(issueTitle[5]) // Print the issue title.
        msgWhat && console.log(msgWhat)
        msgWhy && console.log(msgWhy)
        msgHint && console.log(msgHint)
    }

    public getNumOfAllMessages() {
        return (
            this.getNumOfErrors() +
            this.getNumOfWarnings() +
            this.getNumOfNotices() +
            this.getNumOfNotices()
        )
    }

    public getNumOfErrors() {
        return (
            this.numFatalErrors + this.numInternalErrors + this.numSyntaxErrors
        )
    }

    public getNumOfWarnings() {
        return this.numSyntaxWarnings
    }

    public getNumOfNotices() {
        return this.numNotices
    }

    public getNumOfInfos() {
        return this.numInfos
    }

    public getErrors(): IIssuePayload[] {
        return this.errors
    }

    public getWarnings(): IIssuePayload[] {
        return this.warnings
    }

    public getNotices(): IIssuePayload[] {
        return this.notices
    }

    public getInfos(): IIssuePayload[] {
        return this.infos
    }
}
