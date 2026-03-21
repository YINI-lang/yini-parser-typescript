/**
 * Common Syntax Error and Message Tests
 *
 * Tests common invalid YINI snippets and verifies that:
 * - Parsing throws.
 * - The thrown error mentions syntax error.
 * - The thrown error includes line information.
 *
 * @note
 * These tests focus on user-facing parse failures, not exact full diagnostics.
 */

// tests/integration/1-core-parsing/common-syntax-error-and-message.test.ts
import { parseAndCatchWithConsole } from '../../test-helpers'

type TBadCase = {
    name: string
    yini: string
}

const badCases: TBadCase[] = [
    {
        name: 'Invalid key starting with digit',
        yini: `
^ App
3name = "demo"
`,
    },
    {
        name: 'Missing value after equals',
        yini: `
^ App
name =
`,
    },
    {
        name: 'Invalid assignment operator',
        yini: `
^ App
name := "demo"
`,
    },
    {
        name: 'Unclosed double-quoted string',
        yini: `
^ App
name = "demo
`,
    },
    {
        name: 'Invalid classic escape sequence',
        yini: `
^ App
path = c"F:\\logs\\nebula\\app.log"
`,
    },
    {
        name: 'Invalid section level jump',
        yini: `
^ App
^^^ Deep
value = 1
`,
    },
    {
        name: 'Invalid object syntax',
        yini: `
^ App
user = { name: "Alice", age: }
`,
    },
    {
        name: 'Invalid list syntax',
        yini: `
^ App
items = [1, 2,, 3]
`,
    },
    {
        name: 'Unknown document terminator syntax',
        yini: `
^ App
name = "demo"
/STOP
`,
    },
    {
        name: 'YINI directive in wrong place',
        yini: `
^ App
name = "demo"
@yini
`,
    },
]

describe('Common Syntax Error and Message Tests:', () => {
    test.each(badCases)(
        'Should report syntax error with line number for: $name',
        ({ yini }) => {
            // Act.
            const { err, stderrLines, stdoutLines } =
                parseAndCatchWithConsole(yini)
            const allOutput = [...stderrLines, ...stdoutLines].join('\n')

            // Assert.
            expect(err.message).toMatch(/syntax-error|syntax error/i)

            expect(allOutput).toMatch(/syntax error/i)
            expect(allOutput).toMatch(/line\s+\d+/i)
            expect(allOutput).toMatch(/column\s+\d+/i)
        },
    )

    test('1. Should report syntax error with line number for: Invalid classic escape sequence.', () => {
        // Arrange.
        const yini = `
^ App
path = c"F:\\logs\\nebula\\app.log"
`

        // Act.
        const { err, stderrLines, stdoutLines } = parseAndCatchWithConsole(yini)
        const allOutput = [...stderrLines, ...stdoutLines].join('\n')

        // Assert.
        expect(err.message).toMatch(/syntax-error|syntax error/i)

        expect(allOutput).toMatch(/escape/i)
        expect(allOutput).toMatch(/line\s+\d+/i)
        expect(allOutput).toMatch(/column\s+\d+/i)
    })

    test('2. Should report syntax error with line number for: Invalid assignment operator.', () => {
        // Arrange.
        const yini = `
^ App
name := "demo"
`

        // Act.
        const { err, stderrLines, stdoutLines } = parseAndCatchWithConsole(yini)
        const allOutput = [...stderrLines, ...stdoutLines].join('\n')

        // Assert.
        expect(err.message).toMatch(/syntax-error|syntax error/i)

        expect(allOutput).toMatch(/syntax error/i)
        expect(allOutput).toMatch(/line\s+\d+/i)
        expect(allOutput).toMatch(/column\s+\d+/i)
    })
})
