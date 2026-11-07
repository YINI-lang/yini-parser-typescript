import YINI from '../../../src'

describe('Mixed line endings:', () => {
    test('Rejects mixed line endings in strict mode at the changed line.', () => {
        // 1. Assign.
        const input = '@yini strict\r\n^ Encoding\nvalue = true\r\n/END\r\n'

        // 2. Act.
        const parsed = YINI.parseForTooling(input, { strictMode: true })

        // 3. Assert.
        expect(parsed.ok).toBe(false)
        expect(parsed.diagnostics).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    severity: 'error',
                    message: expect.stringMatching(/mixed line endings/i),
                    line: 2,
                }),
            ]),
        )
    })

    test('Accepts mixed line endings with a warning in lenient mode.', () => {
        // 1. Assign.
        const input = '@yini\r\n^ Encoding\nvalue = true\r\n'

        // 2. Act.
        const parsed = YINI.parseForTooling(input, { strictMode: false })

        // 3. Assert.
        expect(parsed.ok).toBe(true)
        expect(parsed.result.Encoding.value).toBe(true)
        expect(parsed.diagnostics).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    severity: 'warning',
                    code: 'mixed-line-endings',
                    message: expect.stringMatching(/mixed line endings/i),
                }),
            ]),
        )
    })

    test('Accepts consistent CR line endings in strict mode.', () => {
        // 1. Assign.
        const input = '^ Encoding\rvalue = true\r/END\r'

        // 2. Act.
        const parsed = YINI.parseForTooling(input, { strictMode: true })

        // 3. Assert.
        expect(parsed.ok).toBe(true)
        expect(parsed.result.Encoding.value).toBe(true)
    })
})
