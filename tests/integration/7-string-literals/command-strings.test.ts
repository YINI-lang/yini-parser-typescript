import YINI from '../../../src'

const document = (assignment: string, strictMode: boolean): string =>
    `^ Scripts\n${assignment}${strictMode ? '/END\n' : ''}`

describe.each([false, true])(
    'Command strings (strictMode: %s):',
    (strictMode) => {
        test('removes structural indentation and keeps literal content', () => {
            const input = document(
                String.raw`script = command"""
    echo "ok"
      --verbose

    echo C:\path
    printf '""" stays literal'
  """
`,
                strictMode,
            )

            const result = YINI.parse(input, { strictMode })

            expect(result.Scripts.script).toBe(
                'echo "ok"\n  --verbose\n\necho C:\\path\nprintf \'""" stays literal\'',
            )
        })

        test('accepts empty content and preserves extra spaces on content lines', () => {
            const input = document(
                `empty = command"""\n"""\nspaced = command"""\n  first\n    \n  last\n"""\n`,
                strictMode,
            )

            const result = YINI.parse(input, { strictMode })

            expect(result.Scripts.empty).toBe('')
            expect(result.Scripts.spaced).toBe('first\n  \nlast')
        })

        test('uses the widest blank-line indentation when there is no text', () => {
            const input = document(
                `script = command"""\n  \n \n"""\n`,
                strictMode,
            )

            const result = YINI.parse(input, { strictMode })

            expect(result.Scripts.script).toBe('\n')
        })

        test('keeps tabs as content after structural spaces', () => {
            const input = document(
                `script = command"""\n  echo\tok\n  \tchild\n"""\n`,
                strictMode,
            )

            const result = YINI.parse(input, { strictMode })

            expect(result.Scripts.script).toBe('echo\tok\n\tchild')
        })

        test.each(['\n', '\r\n', '\r'])(
            'normalizes physical %j line endings',
            (lineBreak) => {
                const lines = [
                    '^ Scripts',
                    'script = command"""',
                    '  first',
                    '    second',
                    '  third',
                    '"""',
                    ...(strictMode ? ['/END'] : []),
                ]
                const input = lines.join(lineBreak) + lineBreak

                const result = YINI.parse(input, { strictMode })

                expect(result.Scripts.script).toBe(
                    'first\n  second\nthird',
                )
            },
        )

        test('can be concatenated with another string', () => {
            const input = document(
                `joined = "run: " + command"""\n  npm test\n"""\n`,
                strictMode,
            )

            const result = YINI.parse(input, { strictMode })

            expect(result.Scripts.joined).toBe('run: npm test')
        })

        test('accepts a closing delimiter at end of file', () => {
            const input =
                '^ Scripts\nscript = command"""\n  echo ok\n"""' +
                (strictMode ? '\n/END' : '')

            const result = YINI.parse(input, { strictMode })

            expect(result.Scripts.script).toBe('echo ok')
        })

        test('locates an indentation error after CRLF line endings', () => {
            const lines = [
                '^ Scripts',
                'script = command"""',
                '    first',
                '  second',
                '"""',
                ...(strictMode ? ['/END'] : []),
            ]
            const parsed = YINI.parseForTooling(lines.join('\r\n') + '\r\n', {
                strictMode,
            })

            expect(parsed.ok).toBe(false)
            expect(parsed.diagnostics).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        severity: 'error',
                        message: expect.stringMatching(/indentation/i),
                        line: 4,
                        column: 1,
                    }),
                ]),
            )
        })

        test.each([
            {
                name: 'content after the opening delimiter',
                assignment: `script = command"""echo hello\n"""\n`,
            },
            {
                name: 'a single-quoted command string',
                assignment: `script = command'echo hello'\n`,
            },
            {
                name: 'a double-quoted command string',
                assignment: `script = command"echo hello"\n`,
            },
            {
                name: 'an unterminated command string',
                assignment: `script = command"""\n  echo hello\n`,
            },
        ])('rejects $name', ({ assignment }) => {
            const parsed = YINI.parseForTooling(
                document(assignment, strictMode),
                {
                    strictMode,
                },
            )

            expect(parsed.ok).toBe(false)
            expect(parsed.diagnostics).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ severity: 'error' }),
                ]),
            )
        })

        test.each([
            {
                name: 'under-indented content',
                assignment: `script = command"""\n    first\n  second\n"""\n`,
                message: /indentation/i,
                line: 4,
                column: 1,
            },
            {
                name: 'an over-indented leading blank line',
                assignment: `script = command"""\n      \n    first\n"""\n`,
                message: /indentation/i,
                line: 3,
                column: 1,
            },
            {
                name: 'content after the closing delimiter',
                assignment: `script = command"""\n  first\n""" # comment\n`,
                message: /closing delimiter/i,
                line: 4,
                column: 4,
            },
            {
                name: 'trailing space after the closing delimiter',
                assignment: `script = command"""\n  first\n""" \n`,
                message: /closing delimiter/i,
                line: 4,
                column: 4,
            },
        ])('reports $name', ({ assignment, message, line, column }) => {
            const parsed = YINI.parseForTooling(
                document(assignment, strictMode),
                {
                    strictMode,
                },
            )

            expect(parsed.ok).toBe(false)
            expect(parsed.diagnostics).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        severity: 'error',
                        message: expect.stringMatching(message),
                        line,
                        column,
                    }),
                ]),
            )
        })
    },
)
