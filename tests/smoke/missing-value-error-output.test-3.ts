import YINI from '../../../src'

/**
 * Protect the human-readable error block for a missing inline value.
 * The header is written to stderr; the explanation and hint go to stdout.
 */
describe('Missing value error output', () => {
    test('prints the location, key, and guidance on consecutive lines', () => {
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

            expect(() =>
                YINI.parse('^ App\nnum6 =\n', {
                    strictMode: false,
                    treatEmptyValueAsNull: 'disallow',
                    failLevel: 'errors',
                    throwOnError: true,
                    silent: false,
                }),
            ).toThrow()
        } finally {
            if (previousNodeEnv === undefined) {
                delete process.env.NODE_ENV
            } else {
                process.env.NODE_ENV = previousNodeEnv
            }
            errorSpy.mockRestore()
            logSpy.mockRestore()
        }

        const headerIndex = output.findIndex((line) =>
            /^Syntax error in inline YINI content:\d+:\d+$/.test(line),
        )

        expect(headerIndex).toBeGreaterThanOrEqual(0)
        expect(output.slice(headerIndex, headerIndex + 4)).toEqual([
            expect.stringMatching(
                /^Syntax error in inline YINI content:\d+:\d+$/,
            ),
            expect.stringMatching(
                /^Missing value for key 'num6' at line \d+, column \d+$/,
            ),
            expect.stringMatching(
                /^Expected a value after '=' but found none\. Implicit nulls are disallowed/,
            ),
            expect.stringMatching(
                /^Write 'null' explicitly \(num6 = null\) if that is intended/,
            ),
        ])
    })
})
