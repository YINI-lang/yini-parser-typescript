import YINI from '../../../src'

describe.each([false, true])('Escaped string aliases (strictMode: %s):', (strictMode) => {
    test('E and e decode single-line strings like C and c', () => {
        const input = String.raw`^ Strings
upper = E"Line 1\nLine 2\tTabbed"
lower = e'It\'s fine'
classicUpper = C"Line 1\nLine 2\tTabbed"
classicLower = c'It\'s fine'
/END
`

        const result = YINI.parse(input, { strictMode })

        expect(result.Strings.upper).toBe('Line 1\nLine 2\tTabbed')
        expect(result.Strings.lower).toBe("It's fine")
        expect(result.Strings.upper).toBe(result.Strings.classicUpper)
        expect(result.Strings.lower).toBe(result.Strings.classicLower)
    })

    test('E and e decode triple-quoted strings like C', () => {
        const input = String.raw`^ Strings
upper = E"""First\nSecond
Third\tEnd"""
lower = e"""First\nSecond
Third\tEnd"""
classic = C"""First\nSecond
Third\tEnd"""
/END
`

        const result = YINI.parse(input, { strictMode })

        expect(result.Strings.upper).toBe('First\nSecond\nThird\tEnd')
        expect(result.Strings.lower).toBe(result.Strings.upper)
        expect(result.Strings.classic).toBe(result.Strings.upper)
    })

    test('E and e decode escaped quotes and backslashes', () => {
        const input = String.raw`^ Strings
upper = E"say \"hi\"; slash \\"
lower = e'it\'s \\ here'
/END
`

        const result = YINI.parse(input, { strictMode })

        expect(result.Strings.upper).toBe('say "hi"; slash \\')
        expect(result.Strings.lower).toBe("it's \\ here")
    })

    test('accepts empty E and e strings, including triple-quoted forms', () => {
        const input = `^ Strings\nupper = E""\nlower = e''\ntripleUpper = E""""""\ntripleLower = e""""""\n/END\n`

        const result = YINI.parse(input, { strictMode })

        expect(result.Strings).toEqual({
            upper: '',
            lower: '',
            tripleUpper: '',
            tripleLower: '',
        })
    })

    test.each(['\n', '\r\n', '\r'])(
        'preserves physical %j line endings in E and e triple-quoted strings',
        (lineBreak) => {
            const input =
                [
                    '^ Strings',
                    'upper = E"""first',
                    'second"""',
                    'lower = e"""third',
                    'fourth"""',
                    '/END',
                ].join(lineBreak) + lineBreak

            const result = YINI.parse(input, { strictMode })

            expect(result.Strings.upper).toBe(`first${lineBreak}second`)
            expect(result.Strings.lower).toBe(`third${lineBreak}fourth`)
        },
    )

    test('invalid E escape produces a located error diagnostic', () => {
        const input = String.raw`^ Strings
value = E"bad\z"
/END
`

        const parsed = YINI.parseForTooling(input, { strictMode })

        expect(parsed.ok).toBe(false)
        expect(parsed.diagnostics).toContainEqual(
            expect.objectContaining({
                severity: 'error',
                code: 'invalid-escape-sequence',
                line: 2,
                column: expect.any(Number),
            }),
        )
    })

    test.each([String.raw`E"\uD800"`, String.raw`e"\xG0"`])(
        'rejects malformed escaped string %s',
        (literal) => {
            const parsed = YINI.parseForTooling(
                `^ Strings\nvalue = ${literal}\n/END\n`,
                { strictMode },
            )

            expect(parsed.ok).toBe(false)
            expect(parsed.diagnostics).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ severity: 'error', line: 2 }),
                ]),
            )
        },
    )
})
