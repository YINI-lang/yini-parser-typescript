import YINI from '../../../src'

describe.each([false, true])(
    'RC.6x conformance (strictMode: %s):',
    (strictMode) => {
        test.each([
            ['"a"+42', 'a42'],
            ['"a"++42', 'a42'],
            ['"a"+-42', 'a-42'],
            ['"a"+1e+3', 'a1e3'],
            ['"a"+0xff', 'a255'],
        ])('Handles compact scalar concatenation %s by mode.', (expression, expected) => {
            // 1. Assign.
            const input = `^ Values\nvalue = ${expression}\n/END\n`

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(!strictMode)
            if (!strictMode) {
                expect(parsed.result).toEqual({ Values: { value: expected } })
                expect(parsed.diagnostics).toEqual([])
            } else {
                expect(parsed.diagnostics).toContainEqual(expect.objectContaining({ severity: 'error' }))
            }
        })

        test.each(['+ 42', '- /* comment */42', '"a" + + 42', '"a" + - /* comment */42'])(
            'Rejects a separated numeric sign in %s.',
            (expression) => {
                // 1. Assign.
                const input = `^ Values\nvalue = ${expression}\n/END\n`

                // 2. Act.
                const parsed = YINI.parseForTooling(input, { strictMode })

                // 3. Assert.
                expect(parsed.ok).toBe(false)
                expect(parsed.diagnostics).toContainEqual(expect.objectContaining({
                    severity: 'error', line: 2,
                    message: expect.stringMatching(/sign must immediately precede/i),
                }))
            },
        )

        test.each(['\n', '\r\n', '\r'])(
            'Normalizes source %j before decoding escapes and keeps escaped CRLF.',
            (lineEnding) => {
                // 1. Assign.
                const input = [
                    '^ Values',
                    'raw = """a',
                    'b"""',
                    'escaped = E"""a\\r\\nb',
                    'c"""',
                    '/END',
                    '',
                ].join(lineEnding)

                // 2. Act.
                const parsed = YINI.parseForTooling(input, { strictMode })

                // 3. Assert.
                expect(parsed.ok).toBe(true)
                expect(parsed.result).toEqual({ Values: { raw: 'a\nb', escaped: 'a\r\nb\nc' } })
                expect(parsed.diagnostics).toEqual([])
            },
        )

        test('Checks original line endings before normalizing string values.', () => {
            // 1. Assign.
            const input = '^ Values\r\nvalue = """a\rb"""\r\n/END\r\n'

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(!strictMode)
            expect(parsed.result).toEqual({ Values: { value: 'a\nb' } })
            expect(parsed.diagnostics).toContainEqual(expect.objectContaining({
                severity: strictMode ? 'error' : 'warning', code: 'mixed-line-endings',
            }))
        })

        test('Reports an empty value with the mode-appropriate severity.', () => {
            // 1. Assign.
            const input = '^ Values\nvalue = # missing\n/END\n'

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(!strictMode)
            expect(parsed.diagnostics).toContainEqual(
                expect.objectContaining({
                    severity: strictMode ? 'error' : 'warning',
                    line: 2,
                }),
            )
            if (!strictMode) {
                expect(parsed.result).toEqual({ Values: { value: null } })
                expect(parsed.diagnostics[0].message).toMatch(/empty value/i)
            }
        })

        test.each(['@yini\n', '#!/valid\n@yini\n', '\n', ' '])(
            'Reports misplaced shebang comments after %j.',
            (prefix) => {
                // 1. Assign.
                const input = `${prefix}#!/misplaced\n^ App\nvalue = true\n/END\n`

                // 2. Act.
                const parsed = YINI.parseForTooling(input, { strictMode })

                // 3. Assert.
                expect(parsed.ok).toBe(!strictMode)
                expect(parsed.result).toEqual({ App: { value: true } })
                expect(parsed.diagnostics).toEqual([
                    expect.objectContaining({
                        severity: strictMode ? 'error' : 'warning',
                        code: 'misplaced-shebang',
                    }),
                ])
            },
        )

        test('Keeps shebang-like lines inside multiline strings and block comments.', () => {
            // 1. Assign.
            const input =
                '^ App\n/*\n#!/comment\n*/\nvalue = """first\n#!/literal\nlast"""\n/END\n'

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(true)
            expect(parsed.result).toEqual({
                App: { value: 'first\n#!/literal\nlast' },
            })
            expect(parsed.diagnostics).toEqual([])
        })

        test('Accepts section names starting with underscores without marker whitespace.', () => {
            // 1. Assign.
            const input = '^_\na = 1\n^^_name\nb = 2\n^^_^_name\nc = 3\n/END\n'

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(true)
            expect(parsed.result).toEqual({
                _: { a: 1, _name: { b: 2, _name: { c: 3 } } },
            })
            expect(parsed.diagnostics).toEqual([])
        })

        test('Decodes escaped backticks in escaped strings.', () => {
            // 1. Assign.
            const input = '^ Strings\nvalue = E"a\\`b"\n/END\n'

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(true)
            expect(parsed.result).toEqual({ Strings: { value: 'a`b' } })
            expect(parsed.diagnostics).toEqual([])
        })

        test.each(['[1]', '{ a: 1 }', '{ a: /*\n*/ 1 }'])(
            'Rejects a value moved across a block-comment line break: %s.',
            (value) => {
                // 1. Assign.
                const assignment = value.startsWith('{ a: /*')
                    ? `x = ${value}`
                    : `x = /*\n*/ ${value}`
                const input = `^ Values\n${assignment}\n/END\n`

                // 2. Act.
                const parsed = YINI.parseForTooling(input, { strictMode })

                // 3. Assert.
                expect(parsed.ok).toBe(false)
                expect(parsed.diagnostics).toContainEqual(
                    expect.objectContaining({
                        severity: 'error',
                        line: 3,
                    }),
                )
            },
        )

        test('Accepts same-line block comments before compound and object values.', () => {
            // 1. Assign.
            const input =
                '^ Values\nx = /* note */ [1]\ny = { a: /* note */ 2 }\n/END\n'

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(true)
            expect(parsed.result).toEqual({ Values: { x: [1], y: { a: 2 } } })
            expect(parsed.diagnostics).toEqual([])
        })
    },
)
