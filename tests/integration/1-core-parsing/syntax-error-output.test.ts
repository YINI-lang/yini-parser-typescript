import YINI from '../../../src'

/**
 * Protect the human-readable error blocks for inline syntax errors.
 * The header is written to stderr; the explanation and hint go to stdout.
 */
const captureThrownOutput = (parse: () => unknown): string[] => {
    const output: string[] = []
    const previousNodeEnv = process.env.NODE_ENV
    const errorSpy = jest.spyOn(console, 'error').mockImplementation((...args) => {
        output.push(args.map(String).join(' '))
    })
    const logSpy = jest.spyOn(console, 'log').mockImplementation((...args) => {
        output.push(args.map(String).join(' '))
    })

    try {
        // Test mode adds an extra location line inside the message.
        // Development mode matches the output from npm run start:main.
        process.env.NODE_ENV = 'development'
        expect(parse).toThrow()
    } finally {
        if (previousNodeEnv === undefined) {
            delete process.env.NODE_ENV
        } else {
            process.env.NODE_ENV = previousNodeEnv
        }
        errorSpy.mockRestore()
        logSpy.mockRestore()
    }

    return output
}

const expectErrorBlock = (output: string[], messageLines: RegExp[]): void => {
    const header = /^Syntax error in inline YINI content:\d+:\d+$/
    const headerIndex = output.findIndex((line) => header.test(line))

    expect(headerIndex).toBeGreaterThanOrEqual(0)
    expect(output.slice(headerIndex, headerIndex + messageLines.length + 1)).toEqual(
        [
            expect.stringMatching(header),
            ...messageLines.map((line) => expect.stringMatching(line)),
        ],
    )
}

describe('Human-readable syntax error output', () => {
    test('Prints the missing key value explanation and guidance', () => {
        const output = captureThrownOutput(() =>
            YINI.parse('^ App\nnum6 =\n', {
                strictMode: false,
                treatEmptyValueAsNull: 'disallow',
                failLevel: 'errors',
                throwOnError: true,
                silent: false,
            }),
        )

        expectErrorBlock(output, [
            /^Missing value for key 'num6' at line \d+, column \d+$/,
            /^Expected a value after '=' but found none\. Implicit nulls are disallowed/,
            /^Write 'null' explicitly \(num6 = null\) if that is intended/,
        ])
    })

    test('Prints guidance for an invalid C-string escape', () => {
        const input = String.raw`^ App
path = c"F:\logs\nebula\app.log"
`
        const output = captureThrownOutput(() =>
            YINI.parse(input, { failLevel: 'errors', throwOnError: true }),
        )

        expectErrorBlock(output, [
            /^Invalid escape sequence in string at line \d+, column \d+$/,
            /Invalid escape sequence/i,
            /^Use double backslashes/,
        ])
    })

    test('Prints guidance for a skipped section level', () => {
        const output = captureThrownOutput(() =>
            YINI.parse('^ App\n^^^ Deep\nvalue = 1\n', {
                failLevel: 'errors',
                throwOnError: true,
            }),
        )

        expectErrorBlock(output, [
            /^Invalid section level transition at line \d+, column \d+$/,
            /^Cannot skip levels: from \d+ to \d+\.$/,
            /^Section headers may not start directly at level \d+/,
        ])
    })
})
