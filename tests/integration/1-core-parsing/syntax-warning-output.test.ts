import YINI from '../../../src'

/**
 * Protect the human-readable warning blocks printed during successful parsing.
 * The header, explanation, and optional hint go to stderr by default.
 */
const captureWarningOutput = (parse: () => unknown): string[] => {
    const output: string[] = []
    const previousNodeEnv = process.env.NODE_ENV
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation((...args) => {
        output.push(args.map(String).join(' '))
    })
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    try {
        // Test mode adds an extra location line inside the message.
        // Development mode matches the output from npm run start:main.
        process.env.NODE_ENV = 'development'
        parse()
        expect(logSpy).not.toHaveBeenCalled()
    } finally {
        if (previousNodeEnv === undefined) {
            delete process.env.NODE_ENV
        } else {
            process.env.NODE_ENV = previousNodeEnv
        }
        warnSpy.mockRestore()
        logSpy.mockRestore()
    }

    return output
}

const expectWarningBlock = (
    output: string[],
    header: RegExp,
    messageLines: RegExp[],
): void => {
    const headerIndex = output.findIndex((line) => header.test(line))

    expect(headerIndex).toBeGreaterThanOrEqual(0)
    expect(output.slice(headerIndex, headerIndex + messageLines.length + 1)).toEqual(
        [
            expect.stringMatching(header),
            ...messageLines.map((line) => expect.stringMatching(line)),
        ],
    )
}

describe('Human-readable syntax warning output', () => {
    test('Prints an explanation and hint when an empty value becomes null', () => {
        const output = captureWarningOutput(() =>
            YINI.parse('^ App\nnum6 =\n', {
                treatEmptyValueAsNull: 'allow-with-warning',
                failLevel: 'errors',
                silent: false,
            }),
        )

        expectWarningBlock(output, /^Syntax warning in inline YINI content:\d+:\d+$/, [
            /^Empty value treated as null for key 'num6'\. at line \d+, column \d+$/,
            /^An empty value after '=' was encountered\. Per 'treatEmptyValueAsNull = allow-with-warning'/,
            /^If you intended null, write it explicitly: num6 = null\./,
        ])
    })

    test('Prints an explanation when a duplicate key keeps its first value', () => {
        const output = captureWarningOutput(() =>
            YINI.parse('^ App\nvalue = 1\nvalue = 2\n', {
                onDuplicateKey: 'warn-and-keep-first',
                failLevel: 'errors',
                silent: false,
            }),
        )

        expectWarningBlock(output, /^Syntax warning in inline YINI content:\d+:\d+$/, [
            /^Hit a duplicate key \(will keep first value\) in this section and scope at line \d+, column \d+$/,
            /^Key 'value' already exists in section 'App' on level \d+\.$/,
        ])
    })

    test('Prints guidance when the document terminator is missing', () => {
        const output = captureWarningOutput(() =>
            YINI.parse('^ App\nvalue = 1\n', {
                requireDocTerminator: 'warn-if-missing',
                failLevel: 'errors',
                silent: false,
            }),
        )

        expectWarningBlock(output, /^Syntax warning in inline YINI content$/, [
            /^Missing '\/END' at end of document\.$/,
            /^The document terminator '\/END' \(case-insensitive\) appears to be missing/,
            /^Add '\/END' as the final significant line/,
        ])
    })
})
