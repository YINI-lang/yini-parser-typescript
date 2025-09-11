import { isDebug, isTestEnv } from '../config/env'
import { YiniContext } from '../grammar/generated/YiniParser'
import { IIssuePayload, TPersistThreshold } from '../types'
import { debugPrint, printObject } from '../utils/print'
import { toLowerSnakeCase, trimTrailingNonLetters } from '../utils/string'
import { TIssueType, TSubjectType } from './internalTypes'

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

interface ILocation {
    lineNum: number // 1-based, if n/a use 0.
    colNum: number // 1-based, if n/a use 0.
}

/**
 * This class handles all error/notice reporting and processes exit/throwing.
 */
export class ErrorDataHandler {
    private readonly persistThreshold: TPersistThreshold
    private readonly subjectType: TSubjectType
    private readonly fileName: string | undefined

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
    constructor(
        subjectType: TSubjectType,
        threshold: TPersistThreshold = '1-Abort-on-Errors',
        fileName: string | undefined = undefined,
    ) {
        this.subjectType = subjectType
        this.persistThreshold = threshold
        this.fileName = fileName
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
        const startCol: number | undefined = !ctx
            ? undefined
            : ++ctx.start.column // Column (0-based).
        const endCol: number | undefined = !!ctx?.stop?.column
            ? ++ctx.stop.column
            : undefined // Note: Column (0-based).

        let colNum: number | undefined = startCol || endCol
        let msgWhatWithLineNum = msgWhat

        if (lineNum && lineNum > 0) {
            //@todo func that removes possible . at end
            //msgWhatWithLineNum =

            // Patch message with the offending line number.
            msgWhatWithLineNum += ' at line ' + lineNum
            if (colNum) {
                msgWhatWithLineNum += ', column ' + colNum
            }

            if (process.env.NODE_ENV === 'test') {
                msgWhatWithLineNum += `\nAt line: ${lineNum}, column(s): ${startCol}-${endCol}`
            }
        }

        debugPrint('persistThreshold = ' + this.persistThreshold)
        debugPrint(' lineNum = ' + lineNum)
        debugPrint('  colNum = ' + colNum)
        debugPrint('startCol = ' + startCol)
        debugPrint('  endCol = ' + endCol)
        debugPrint()

        const loc: ILocation = {
            lineNum: lineNum || 0, // 1-based, if n/a use 0.
            colNum: colNum || 0, // 1-based, if n/a use 0.
        }

        console.log() // Print an empty line before outputting message.
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
                this.emitInternalError(loc, msgWhatWithLineNum, msgWhy, msgHint)
                console.log() // Emit an empty line before outputting message.
                if (
                    this.persistThreshold === '1-Abort-on-Errors' ||
                    this.persistThreshold === '2-Abort-Even-on-Warnings'
                ) {
                    // In test, throw an error instead of exiting.
                    throw new Error(`Internal-Error: ${msgWhat}`)
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
                this.emitSyntaxError(loc, msgWhatWithLineNum, msgWhy, msgHint)
                console.log() // Emit an empty line before outputting message.
                if (
                    this.persistThreshold === '1-Abort-on-Errors' ||
                    this.persistThreshold === '2-Abort-Even-on-Warnings'
                ) {
                    // In test, throw an error instead of exiting.
                    throw new Error(`Syntax-Error: ${'' + msgWhat}`)
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
                this.emitSyntaxWarning(loc, msgWhatWithLineNum, msgWhy, msgHint)
                console.log() // Emit an empty line before outputting message.
                if (this.persistThreshold === '2-Abort-Even-on-Warnings') {
                    // In test, throw an error instead of exiting.
                    throw new Error(`Syntax-Warning: ${msgWhat}`)
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
                this.emitNotice(loc, msgWhatWithLineNum, msgWhy, msgHint)
                console.log() // Emit an empty line before outputting message.
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
                this.emitInfo(loc, msgWhatWithLineNum, msgWhy, msgHint)
                console.log() // Emit an empty line before outputting message.
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
                this.emitFatalError(loc, msgWhatWithLineNum, msgWhy, msgHint)
                console.log() // Emit an empty line before outputting message.
                // CANNOT recover fatal errors, will lead to an exit!
                // In test, throw an error instead of exiting.
                throw new Error(`Internal-Error: ${msgWhat}`)
        }
    }

    private formatSignificantMessageLine(
        loc: ILocation,
        issueTitle: string,
    ): string {
        switch (this.subjectType) {
            case 'None/Ignore':
                return issueTitle
            case 'File':
            case 'Inline': {
                // Construct a full line from several parts.

                const titlePart: string = trimTrailingNonLetters(
                    issueTitle.trim(),
                )

                let line = `${titlePart} in `

                if (this.subjectType === 'Inline') {
                    line += 'inline YINI content'
                } else {
                    line += `${this.fileName}`
                }
                if (loc?.lineNum) {
                    line += `:${loc.lineNum}`
                    if (loc?.colNum) line += `:${loc.colNum}`
                }

                return line
            }
        }
    }

    private emitFatalError(
        loc: ILocation,
        msgWhat = 'Something went wrong!',
        msgWhy = '',
        msgHint = '',
    ) {
        const messageHeader = this.formatSignificantMessageLine(
            loc,
            issueTitle[0],
        )
        console.error(messageHeader) // Print the issue title.
        msgWhat && console.log(msgWhat)
        msgWhy && console.log(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitInternalError(
        loc: ILocation,
        msgWhat = 'Something went wrong!',
        msgWhy = '',
        msgHint = '',
    ) {
        const messageHeader = this.formatSignificantMessageLine(
            loc,
            issueTitle[1],
        )
        console.error(messageHeader) // Print the issue title.
        msgWhat && console.log(msgWhat)
        msgWhy && console.log(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitSyntaxError(
        loc: ILocation,
        msgWhat: string,
        msgWhy = '',
        msgHint = '',
    ) {
        const messageHeader = this.formatSignificantMessageLine(
            loc,
            issueTitle[2],
        )
        console.error(messageHeader) // Print the issue title.
        msgWhat && console.log(msgWhat)
        msgWhy && console.log(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitSyntaxWarning(
        loc: ILocation,
        msgWhat: string,
        msgWhy = '',
        msgHint = '',
    ) {
        const messageHeader = this.formatSignificantMessageLine(
            loc,
            issueTitle[3],
        )
        console.warn(messageHeader) // Print the issue title.
        msgWhat && console.log(msgWhat)
        msgWhy && console.log(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitNotice(
        loc: ILocation,
        msgWhat: string,
        msgWhy = '',
        msgHint = '',
    ) {
        const messageHeader = this.formatSignificantMessageLine(
            loc,
            issueTitle[4],
        )
        console.warn(messageHeader) // Print the issue title.
        msgWhat && console.log(msgWhat)
        msgWhy && console.log(msgWhy)
        msgHint && console.log(msgHint)
    }

    private emitInfo(
        loc: ILocation,
        msgWhat: string,
        msgWhy = '',
        msgHint = '',
    ) {
        const messageHeader = this.formatSignificantMessageLine(
            loc,
            issueTitle[5],
        )
        console.info(messageHeader) // Print the issue title.
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
