import YINI from '../../../src'

describe.each([false, true])(
    'RC.7 draft conformance (strictMode: %s):',
    (strictMode) => {
        test('Keeps assignments following multiline section-header comments.', () => {
            // 1. Assign.
            const input =
                '^ Root /* note\n*/ rootValue = 1\n^^CompactChild /* note */\nvalue = 2\n^2 NumberedChild /* note\n*/ value = 3\n/END\n'

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(true)
            expect(parsed.result).toEqual({
                Root: {
                    rootValue: 1,
                    CompactChild: { value: 2 },
                    NumberedChild: { value: 3 },
                },
            })
            expect(parsed.diagnostics).toEqual([])
        })

        test('Rejects a section member on the same logical line as its header.', () => {
            // 1. Assign.
            const input = '^ Root /* note */ value = 1\n/END\n'

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(false)
            expect(parsed.diagnostics).toContainEqual(
                expect.objectContaining({ severity: 'error' }),
            )
        })

        test.each(['%1010', '+%_1010', '-%1010'])(
            'Warns on the deprecated binary prefix in %s.',
            (literal) => {
                // 1. Assign.
                const input = `^ Numbers\nvalue = ${literal}\n/END\n`

                // 2. Act.
                const parsed = YINI.parseForTooling(input, { strictMode })

                // 3. Assert.
                expect(parsed.ok).toBe(true)
                expect(parsed.result).toEqual({
                    Numbers: { value: literal.startsWith('-') ? -10 : 10 },
                })
                expect(parsed.diagnostics).toEqual([
                    expect.objectContaining({
                        severity: 'warning',
                        line: 2,
                        message: expect.stringMatching(/%.*deprecated.*0b/i),
                    }),
                ])
            },
        )

        test('Does not warn on the recommended binary prefix or literal percent text.', () => {
            // 1. Assign.
            const input = '^ Numbers\nvalue = 0b1010\ntext = "%1010"\n/END\n'

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(true)
            expect(parsed.result).toEqual({
                Numbers: { value: 10, text: '%1010' },
            })
            expect(parsed.diagnostics).toEqual([])
        })

        test.each([
            ['hex:10', 'hex', 10],
            ['HEX:10', 'HEX', 10],
            ['hex:10.5', 'hex', 10.5],
            ['hex:1e+3', 'hex', 1000],
            ['hex:0xFF', 'hex', 255],
            ['hex:hex:FF', 'hex', 255],
        ])(
            'Accepts the object member %s without changing its value.',
            (member, key, value) => {
                // 1. Assign.
                const input = `^ Objects\nvalue = { nested: [{ ${member} }], hexadecimal: [hex:10] }\n/END\n`

                // 2. Act.
                const parsed = YINI.parseForTooling(input, { strictMode })

                // 3. Assert.
                expect(parsed.ok).toBe(true)
                expect(parsed.result).toEqual({
                    Objects: {
                        value: {
                            nested: [{ [key]: value }],
                            hexadecimal: [16],
                        },
                    },
                })
                expect(parsed.diagnostics).toEqual([])
            },
        )

        test.each(['hex:FF', 'hex:_10', 'hex:01', 'hex:10.'])(
            'Rejects an invalid object value in %s.',
            (member) => {
                // 1. Assign.
                const input = `^ Objects\nvalue = { ${member} }\n/END\n`

                // 2. Act.
                const parsed = YINI.parseForTooling(input, { strictMode })

                // 3. Assert.
                expect(parsed.ok).toBe(false)
                expect(parsed.diagnostics).toContainEqual(
                    expect.objectContaining({ severity: 'error', line: 2 }),
                )
            },
        )

        test('Retains object-key context across nested values and comment trivia.', () => {
            // 1. Assign.
            const input =
                '^ Objects\nvalue = { first: [hex:10, { hex:10 }],\n; comment\nhex:0xF,\n-- disabled\nHEX:1e+3, actual: hex:10 }\n/END\n'

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(true)
            expect(parsed.result).toEqual({
                Objects: {
                    value: {
                        first: [16, { hex: 10 }],
                        hex: 15,
                        HEX: 1000,
                        actual: 16,
                    },
                },
            })
            expect(parsed.diagnostics).toEqual([])
        })

        test('Preserves diagnostic columns after a compact hex member.', () => {
            // 1. Assign.
            const memberLine = 'value = { hex:10, other: }'
            const input = `^ Objects\n${memberLine}\n/END\n`

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(false)
            expect(parsed.diagnostics).toContainEqual(
                expect.objectContaining({
                    severity: 'error',
                    code: 'syntax-error',
                    line: 2,
                    column: memberLine.indexOf('}') + 1,
                }),
            )
        })

        test('Reports a syntax error for a compact member at an unfinished EOF.', () => {
            // 1. Assign.
            const input = '^ Objects\nvalue = { hex:10'

            // 2. Act.
            const parsed = YINI.parseForTooling(input, { strictMode })

            // 3. Assert.
            expect(parsed.ok).toBe(false)
            expect(parsed.diagnostics).toContainEqual(
                expect.objectContaining({
                    severity: 'error',
                    code: 'syntax-error',
                }),
            )
            expect(parsed.diagnostics).not.toContainEqual(
                expect.objectContaining({ code: 'parser-error' }),
            )
        })
    },
)

test('Warns on deprecated binary operands during lenient concatenation.', () => {
    // 1. Assign.
    const input = '^ Values\nvalue = "n: " + -%1010\n'

    // 2. Act.
    const parsed = YINI.parseForTooling(input)

    // 3. Assert.
    expect(parsed.ok).toBe(true)
    expect(parsed.result).toEqual({ Values: { value: 'n: -10' } })
    expect(parsed.diagnostics).toEqual([
        expect.objectContaining({
            severity: 'warning',
            line: 2,
            message: expect.stringMatching(/%.*deprecated.*0b/i),
        }),
    ])
})

test.each(['^ App\nvalue = 1\n', '^ App\nvalue = [1,]\n/END\n'])(
    'Continues strict validation after a lenient declaration: %s.',
    (content) => {
        // 1. Assign.
        const input = '@yini lenient\n' + content

        // 2. Act.
        const parsed = YINI.parseForTooling(input, { strictMode: true })

        // 3. Assert.
        expect(parsed.ok).toBe(false)
        expect(parsed.diagnostics).toContainEqual(
            expect.objectContaining({
                severity: 'warning',
                code: 'YINI_MODE_MISMATCH',
                line: 1,
                column: 1,
            }),
        )
        expect(parsed.diagnostics).toContainEqual(
            expect.objectContaining({ severity: 'error' }),
        )
    },
)
