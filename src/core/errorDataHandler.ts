// src/core/errorDataHandler.ts
import { isDebug } from '../config/env'
import { IssuePayload } from '../types'
import { debugPrint } from '../utils/print'
import {
    ensurePeriod,
    toLowerSnakeCase,
    trimTrailingNonLetters,
} from '../utils/string'
import {
    IErrorLocationInput,
    TBailSensitivityLevel,
    TIssueType,
    TSubjectType,
} from './internalTypes'

export const toErrorLocation = (ctx: any): IErrorLocationInput | undefined => {
    if (!ctx) return undefined

    const line = ctx?.start?.line ?? ctx?.line ?? undefined

    const column =
        ctx?.start?.column != null
            ? ctx.start.column + 1
            : ctx?.column != null
              ? ctx.column + 1
              : undefined

    const endColumn = ctx?.stop?.column != null ? ctx.stop.column + 1 : column

    return { line, column, endColumn }
}

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

export interface YiniParseErrorDetails {
    type: TIssueType
    typeKey: string
    sourceType: TSubjectType
    fileName?: string
    line?: number
    column?: number
    message: string
    advice?: string
    hint?: string
}

export class YiniParseError extends Error {
    public readonly type: TIssueType
    public readonly typeKey: string
    public readonly sourceType: TSubjectType
    public readonly fileName?: string
    public readonly line?: number
    public readonly column?: number
    public readonly advice?: string
    public readonly hint?: string

    constructor(details: YiniParseErrorDetails) {
        super(formatThrownMessage(details))
        Object.setPrototypeOf(this, new.target.prototype)

        this.name = getErrorName(details.type)
        this.type = details.type
        this.typeKey = details.typeKey
        this.sourceType = details.sourceType
        this.fileName = details.fileName
        this.line = details.line
        this.column = details.column
        this.advice = details.advice
        this.hint = details.hint

        // Node prints `error.stack` for uncaught errors. Keep parser failures
        // focused on the user's document instead of internal parser frames.
        this.stack = `${this.name}: ${this.message}`
    }
}

const getErrorName = (type: TIssueType): string => {
    switch (type) {
        case 'Syntax-Error':
        case 'Syntax-Warning':
            return 'YiniSyntaxError'
        case 'Internal-Error':
        case 'Fatal-Error':
            return 'YiniInternalError'
        default:
            return 'YiniParseError'
    }
}

const formatThrownMessage = (details: YiniParseErrorDetails): string => {
    const lines: string[] = []
    const location = formatThrownLocation(details)
    const title = details.type.replace(/-/g, ' ')

    lines.push(
        location
            ? `${title} in ${location}: ${details.message}`
            : `${title}: ${details.message}`,
    )

    if (details.advice) {
        lines.push(details.advice)
    }

    if (details.hint) {
        lines.push(`Hint: ${details.hint}`)
    }

    return lines.join('\n')
}

const formatThrownLocation = (details: YiniParseErrorDetails): string => {
    if (details.sourceType === 'None/Ignore') return ''

    let location =
        details.sourceType === 'File'
            ? details.fileName || 'YINI file'
            : 'inline YINI content'

    if (details.line !== undefined) {
        location += `:${details.line}`
        if (details.column !== undefined) {
            location += `:${details.column}`
        }
    }

    return location
}

/**
 * This class handles all error/notice reporting and processes exit/throwing.
 */
export class ErrorDataHandler {
    private readonly subjectType: TSubjectType
    private readonly fileName: string | undefined
    private readonly persistThreshold: TBailSensitivityLevel
    private readonly isDiagnosticOutputEnabled: boolean
    private readonly isQuiet: boolean
    private readonly isSilent: boolean
    private readonly isThrowOnError: boolean

    private errors: IssuePayload[] = []
    private warnings: IssuePayload[] = []
    private notices: IssuePayload[] = []
    private infos: IssuePayload[] = []

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
        fileName: string | undefined = undefined,
        bailSensitivityLevel: TBailSensitivityLevel = '1-Abort-on-Errors',
        isDiagnosticOutputEnabled: boolean = false, // Opt in to writing diagnostics to stderr.
        isQuiet: boolean = false, // When diagnostic output is enabled, show errors only.
        isSilent: boolean = false, // Suppress all output (even errors, exit code only).
        isThrowOnError: boolean = false, // Will throw on first parse error encountered.
    ) {
        this.subjectType = subjectType
        this.fileName = fileName
        this.persistThreshold = bailSensitivityLevel
        this.isDiagnosticOutputEnabled = isDiagnosticOutputEnabled
        this.isQuiet = isQuiet
        this.isSilent = isSilent
        this.isThrowOnError = isThrowOnError
    }

    private makeIssue(
        line: number | undefined,
        column: number | undefined,
        type: TIssueType,
        message: string,
        advice: string | undefined = undefined,
        hint: string | undefined = undefined,
    ): IssuePayload {
        const issue: IssuePayload = {
            line,
            column: !column ? undefined : column,
            typeKey: toLowerSnakeCase(type),
            message: ensurePeriod(message),
            advice: advice || undefined, // Note, this will render ''-values as undfined and omit these in console outputs.
            hint: hint || undefined, // Note, this will render ''-values as undfined and omit these in console outputs.
        }

        debugPrint('issue:')
        isDebug() && console.log(issue)
        return issue
    }

    private throwParseError(
        type: TIssueType,
        issue: IssuePayload,
        msgWhatInclLineNum: string,
    ): never {
        throw new YiniParseError({
            type,
            typeKey: issue.typeKey,
            sourceType: this.subjectType,
            fileName: this.fileName,
            line: issue.line,
            column: issue.column,
            message: msgWhatInclLineNum,
            advice: issue.advice,
            hint: issue.hint,
        })
    }

    /**
     * After pushing processing may continue or exit, depending on the error
     * and/or the bail threshold (that can be optionally set by the user).
     *
     * @note This function MIGHT result in a return, throw, or exit depending
     * on the bail policy (set by the user).
     * @note You may use the helper toErrorLocation(..) to convert ctx.
     *
     * @param ctx
     * @param type
     * @param msgWhat Name of the specific error or what failed. E.g. "Key already exists in this section scope".
     * @param msgWhy More details and more specific info about the issue/error.
     * @param msgHint Hint or HUMBLE suggestion on how to fix the issue.
     */
    public pushOrBail(
        locInput: IErrorLocationInput | undefined,
        type: TIssueType,
        msgWhat: string,
        msgWhy: string = '',
        msgHint: string = '',
    ) {
        debugPrint('-> pushOrBail(..)')
        debugPrint('locInput?.line =      ' + locInput?.line)
        debugPrint('locInput?.column =    ' + locInput?.column)
        debugPrint('locInput?.endColumn = ' + locInput?.endColumn)

        const lineNum: number | undefined = locInput?.line
        const startCol: number | undefined = locInput?.column
        const endCol: number | undefined = locInput?.endColumn
        const colNum: number | undefined = startCol ?? endCol

        let msgWhatInclLineNum = msgWhat

        if (lineNum && lineNum > 0) {
            msgWhatInclLineNum += ' at line ' + lineNum

            if (colNum) {
                msgWhatInclLineNum += ', column ' + colNum
            }

            if (process.env.NODE_ENV === 'test') {
                msgWhatInclLineNum += `\nAt line: ${lineNum}, column(s): ${startCol}-${endCol}`
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

        if (this.shouldEmitDiagnostics()) {
            console.error() // Print an empty line before outputting message.
        }
        switch (type) {
            case 'Internal-Error':
                this.numInternalErrors++
                {
                    const issue = this.makeIssue(
                        lineNum,
                        colNum,
                        type,
                        msgWhat,
                        msgWhy,
                        msgHint,
                    )
                    this.errors.push(issue)
                }
                this.emitInternalError(loc, msgWhatInclLineNum, msgWhy, msgHint)
                if (
                    this.persistThreshold === '1-Abort-on-Errors' ||
                    this.persistThreshold === '2-Abort-Even-on-Warnings'
                ) {
                    if (!this.isThrowOnError) {
                        debugPrint('Skipped throwing')
                    } else {
                        this.throwParseError(
                            type,
                            this.errors[this.errors.length - 1],
                            msgWhatInclLineNum,
                        )
                    }
                }
                break
            case 'Syntax-Error':
                this.numSyntaxErrors++
                {
                    const issue = this.makeIssue(
                        lineNum,
                        colNum,
                        type,
                        msgWhat,
                        msgWhy,
                        msgHint,
                    )
                    this.errors.push(issue)
                }
                this.emitSyntaxError(loc, msgWhatInclLineNum, msgWhy, msgHint)
                if (
                    this.persistThreshold === '1-Abort-on-Errors' ||
                    this.persistThreshold === '2-Abort-Even-on-Warnings'
                ) {
                    if (!this.isThrowOnError) {
                        debugPrint('Skipped throwing')
                    } else {
                        this.throwParseError(
                            type,
                            this.errors[this.errors.length - 1],
                            msgWhatInclLineNum,
                        )
                    }
                }
                break
            case 'Syntax-Warning':
                this.numSyntaxWarnings++
                {
                    const issue = this.makeIssue(
                        lineNum,
                        colNum,
                        type,
                        msgWhat,
                        msgWhy,
                        msgHint,
                    )
                    this.warnings.push(issue)
                }
                if (!this.isQuiet) {
                    this.emitSyntaxWarning(
                        loc,
                        msgWhatInclLineNum,
                        msgWhy,
                        msgHint,
                    )
                }
                if (this.persistThreshold === '2-Abort-Even-on-Warnings') {
                    if (!this.isThrowOnError) {
                        debugPrint('Skipped throwing')
                    } else {
                        this.throwParseError(
                            type,
                            this.warnings[this.warnings.length - 1],
                            msgWhatInclLineNum,
                        )
                    }
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
                this.emitNotice(loc, msgWhatInclLineNum, msgWhy, msgHint)
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
                this.emitInfo(loc, msgWhatInclLineNum, msgWhy, msgHint)
                break
            default: // Unhandled/unknown error type → Fatal.
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
                this.emitFatalError(loc, msgWhatInclLineNum, msgWhy, msgHint)
                /*
                    "Best practises":
                    - ONLY on I/O failures: file not found, unreadable file, encoding errors.
                    - ONLY on programmer/usage errors: invalid options, conflicting flags.
                    - ONLY on internal faults: invariants broken, unexpected exceptions from dependencies.
                */

                // CANNOT recover fatal errors, will lead to an bail!
                // In test, throw an error instead of bailing/exiting.
                // IMPORTANT: Never exit with exit code since this is a library!

                {
                    this.throwParseError(
                        'Internal-Error',
                        this.errors[this.errors.length - 1],
                        msgWhatInclLineNum,
                    )
                }
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

    private shouldEmitDiagnostics(): boolean {
        return this.isDiagnosticOutputEnabled && !this.isSilent
    }

    private shouldEmitNonErrors(): boolean {
        return this.shouldEmitDiagnostics() && !this.isQuiet
    }

    private emitDiagnosticToStderr(
        write: (message?: any, ...optionalParams: any[]) => void,
        messageHeader: string,
        msgWhat = '',
        msgWhy = '',
        msgHint = '',
    ): void {
        write(messageHeader)
        msgWhat && write(msgWhat)
        msgWhy && write(msgWhy)
        msgHint && write(msgHint)
        write()
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
        if (this.shouldEmitDiagnostics()) {
            this.emitDiagnosticToStderr(
                console.error.bind(console),
                messageHeader,
                msgWhat,
                msgWhy,
                msgHint,
            )
        }
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
        if (this.shouldEmitDiagnostics()) {
            this.emitDiagnosticToStderr(
                console.error.bind(console),
                messageHeader,
                msgWhat,
                msgWhy,
                msgHint,
            )
        }
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
        if (this.shouldEmitDiagnostics()) {
            this.emitDiagnosticToStderr(
                console.error.bind(console),
                messageHeader,
                msgWhat,
                msgWhy,
                msgHint,
            )
        }
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
        if (this.shouldEmitNonErrors()) {
            this.emitDiagnosticToStderr(
                console.warn.bind(console),
                messageHeader,
                msgWhat,
                msgWhy,
                msgHint,
            )
        }
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
        if (this.shouldEmitNonErrors()) {
            this.emitDiagnosticToStderr(
                console.error.bind(console),
                messageHeader,
                msgWhat,
                msgWhy,
                msgHint,
            )
        }
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
        if (this.shouldEmitNonErrors()) {
            this.emitDiagnosticToStderr(
                console.error.bind(console),
                messageHeader,
                msgWhat,
                msgWhy,
                msgHint,
            )
        }
    }

    public getNumOfAllMessages() {
        return (
            this.getNumOfErrors() +
            this.getNumOfWarnings() +
            this.getNumOfNotices() +
            this.getNumOfInfos()
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

    public getErrors(): IssuePayload[] {
        return this.errors
    }

    public getWarnings(): IssuePayload[] {
        return this.warnings
    }

    public getNotices(): IssuePayload[] {
        return this.notices
    }

    public getInfos(): IssuePayload[] {
        return this.infos
    }
}
