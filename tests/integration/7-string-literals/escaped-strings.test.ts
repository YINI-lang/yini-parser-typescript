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
})
