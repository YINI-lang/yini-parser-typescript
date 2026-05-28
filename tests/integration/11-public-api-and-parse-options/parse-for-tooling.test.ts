import YINI, { YiniToolingParseResult } from '../../../src'

describe('parseForTooling(..):', () => {
    test('returns ok true, parsed result, and no diagnostics for valid input.', () => {
        const parsed = YINI.parseForTooling(`
^ App
name = "Demo"
`)

        expect(parsed).toEqual({
            ok: true,
            result: {
                App: {
                    name: 'Demo',
                },
            },
            diagnostics: [],
        })
    })

    test('returns ok false, partial result, and error diagnostics for invalid input.', () => {
        const parsed = YINI.parseForTooling(`
^ App
name = "Demo"
path = c"F:\\logs\\nebula\\app.log"
port = 8080
`)

        expect(parsed.ok).toBe(false)
        expect(parsed.result.App.name).toBe('Demo')
        expect(parsed.result.App.port).toBe(8080)
        expect(parsed.result.App.path).toBeUndefined()

        const error = requireDiagnostic(parsed, 'error')
        expect(error.code).toBe('invalid-escape-sequence')
        expect(error.message).toMatch(/invalid escape sequence/i)
        expect(typeof error.line).toBe('number')
        expect(typeof error.column).toBe('number')
    })

    test('returns ok true with warning diagnostics for warning-only input.', () => {
        const parsed = YINI.parseForTooling('', {
            strictMode: false,
        })

        expect(parsed.ok).toBe(true)
        expect(parsed.result).toEqual({})

        const warning = requireDiagnostic(parsed, 'warning')
        expect(warning.code).toBe('empty-document')
        expect(warning.message).toMatch(/empty yini document/i)
    })

    test('Keeps the first duplicate section body in lenient mode.', () => {
        const parsed = YINI.parseForTooling(
            `
^ Application
name = "first-section"
status = "kept"

^ Application
debug = true
status = "replaced"
`,
            {
                strictMode: false,
            },
        )

        expect(parsed.ok).toBe(true)
        expect(parsed.result).toEqual({
            Application: {
                name: 'first-section',
                status: 'kept',
            },
        })

        const warning = requireDiagnostic(parsed, 'warning')
        expect(warning.code).toBe('duplicate-section')
        expect(warning.message).toMatch(/duplicate section/i)
    })

    test('Keeps the first duplicate subsection body in lenient mode.', () => {
        const parsed = YINI.parseForTooling(
            `
^ Application

^^ Database
host = "primary"

^^ Database
port = 5432
host = "replica"

^^ Logging
level = "info"
`,
            {
                strictMode: false,
            },
        )

        expect(parsed.ok).toBe(true)
        expect(parsed.result).toEqual({
            Application: {
                Database: {
                    host: 'primary',
                },
                Logging: {
                    level: 'info',
                },
            },
        })

        const warning = requireDiagnostic(parsed, 'warning')
        expect(warning.code).toBe('duplicate-section')
        expect(warning.message).toMatch(/duplicate section/i)
    })

    test('does not let callers override the tooling-safe parser behavior.', () => {
        const parsed = YINI.parseForTooling(
            `
^ App
path = c"F:\\logs\\nebula\\app.log"
`,
            {
                strictMode: false,
            },
        )

        expect(parsed.ok).toBe(false)
        expect(requireDiagnostic(parsed, 'error')).toBeDefined()
    })
})

function requireDiagnostic(
    parsed: YiniToolingParseResult,
    severity: 'error' | 'warning',
) {
    const diagnostic = parsed.diagnostics.find(
        (diagnostic) => diagnostic.severity === severity,
    )

    if (!diagnostic) {
        throw new Error(`Expected a ${severity} diagnostic.`)
    }

    return diagnostic
}
