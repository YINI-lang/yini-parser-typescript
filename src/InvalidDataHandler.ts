class CustomError extends Error {
    constructor(
        public code: string,
        public context: Record<string, unknown>,
    ) {
        super(code)

        this.name = 'CustomError'
    }
}

export type TSeverityThreshold =
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
    'FATAL ERROR', // 'Internal-Error'.
    'Syntax Error', // 'Syntax-Error'.
    'Syntax Warning',
    'Notice',
    'Info',
]

export class InvalidDataHandler {
    private static singleton: InvalidDataHandler | null = null
    // `strict` as well as `lenient` parsing modes.
    private severityThreshold: TSeverityThreshold

    private constructor(threshold: TSeverityThreshold = '1-Abort-on-Errors') {
        this.severityThreshold = threshold
    }

    /* '1-Abort-on-Errors' is the default.

        Below is from the YINI spec:
            **Abort Sensitivity Levels** while parsing a YINI document:
            (AKA severity threshold)
            - Level 0 = ignore errors and try parse anyway (may remap falty key/section names)
            - Level 1 = abort on errors only
            - Level 2 = abort even on warnings
     */
    public static getInstance(
        threshold: TSeverityThreshold = '1-Abort-on-Errors',
    ) {
        if (!this.singleton) {
            this.singleton = new InvalidDataHandler(threshold)
        }

        return this.singleton
    }

    handleData(type: TIssueType, whyOrInfoMsg: string, howMsg: string = '') {
        console.log()
        console.log('severityThreshold = ' + this.severityThreshold)
        console.log()
        switch (type) {
            case 'Syntax-Error':
                this.emitSyntaxError(whyOrInfoMsg)
                if (
                    this.severityThreshold === '1-Abort-on-Errors' ||
                    this.severityThreshold === '2-Abort-Even-on-Warnings'
                ) {
                    if (process.env.NODE_ENV === 'test') {
                        // In test, throw an error instead of exiting.
                        throw new Error(`Syntax-Error: ${whyOrInfoMsg}`)
                    } else {
                        process.exit(2)
                    }
                }
                break
            case 'Syntax-Warning':
                this.emitSyntaxWarning(whyOrInfoMsg)
                if (this.severityThreshold === '2-Abort-Even-on-Warnings') {
                    if (process.env.NODE_ENV === 'test') {
                        // In test, throw an error instead of exiting.
                        throw new Error(`Syntax-Warning: ${whyOrInfoMsg}`)
                    } else {
                        process.exit(3)
                    }
                }
                break
            case 'Notice':
                this.emitNotice(whyOrInfoMsg)
                break
            case 'Info':
                this.emitInfo(whyOrInfoMsg)
                break
            default: // Including 'Internal-Error'.
                this.emitInternalError(whyOrInfoMsg)
                if (process.env.NODE_ENV === 'test') {
                    // In test, throw an error instead of exiting.
                    throw new Error(`Internal-Error: ${whyOrInfoMsg}`)
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

    private emitInternalError(msg: string = 'Something went wrong!') {
        // Print the issue title.
        console.error(issueTitle[0])
        console.error(msg)
    }

    private emitSyntaxError(msg: string) {
        // Print the issue title.
        console.error(issueTitle[1])
        console.error(msg)
    }

    private emitSyntaxWarning(msg: string) {
        // Print the issue title.
        console.warn(issueTitle[2])
        console.warn(msg)
    }

    private emitNotice(msg: string) {
        // Print the issue title.
        console.warn(issueTitle[3])
        console.warn(msg)
    }

    private emitInfo(msg: string) {
        // Print the issue title.
        console.info(issueTitle[4])
        console.info(msg)
    }
}
