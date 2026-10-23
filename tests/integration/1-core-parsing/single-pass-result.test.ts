/**
 * Regression tests for building parse results during the parse-tree visit.
 *
 * The parser now creates the returned JavaScript objects while it reads the
 * parse tree. Previously, it built a full AST and converted that in a second
 * pass. These tests protect the public behavior that could change when those
 * steps are combined: collision errors and their order, partial results,
 * property order and special names, timing metadata, and tooling diagnostics.
 * Keep these checks when changing how parse results are constructed.
 */
import YINI, { YiniParseError } from '../../../src'

describe('Result construction during the visitor', () => {
    test('Keeps collision diagnostics in object-building order and recovers the partial result', () => {
        const parsed = YINI.parse('A = 1\n^ A\n^ B\nC = 2\n^^ C\nD = 3\n', {
            failLevel: 'ignore-errors',
            includeMetadata: true,
            includeDiagnostics: true,
        }) as any

        expect(parsed.result).toEqual({ A: 1, B: { C: 2 } })
        expect(
            parsed.meta.diagnostics.errors.payload.map(
                (issue: { message: string }) => issue.message,
            ),
        ).toEqual([
            "Name collision between orphan member and section 'A'.",
            "Name collision between member and subsection 'C'.",
        ])
    })

    test('Reports a terminator issue before a deferred collision and still throws on a collision', () => {
        const input = '^ Root\nChild = 1\n^^ Child\nitem = 2\n'
        const parsed = YINI.parse(input, {
            strictMode: true,
            failLevel: 'ignore-errors',
            includeMetadata: true,
            includeDiagnostics: true,
        }) as any

        expect(parsed.result).toEqual({ Root: { Child: 1 } })
        expect(
            parsed.meta.diagnostics.errors.payload.map(
                (issue: { message: string }) => issue.message,
            ),
        ).toEqual([
            "Missing '/END' at end of document.",
            "Name collision between member and subsection 'Child'.",
        ])
        expect(() =>
            YINI.parse(input + '/END\n', {
                strictMode: true,
                throwOnError: true,
            }),
        ).toThrow(YiniParseError)
    })

    test('Keeps own key order and safe special names', () => {
        const result = YINI.parse(
            '^ Root\nfirst = 1\n`__proto__` = 2\nvalue = { `__proto__`: 3, last: 4 }\n^^ Child\nitem = 5\n',
        ) as any

        expect(Object.keys(result.Root)).toEqual([
            'first',
            '__proto__',
            'value',
            'Child',
        ])
        expect(Object.getPrototypeOf(result.Root)).toBe(Object.prototype)
        expect(
            Object.getOwnPropertyDescriptor(result.Root, '__proto__'),
        ).toMatchObject({
            value: 2,
            enumerable: true,
            configurable: true,
            writable: true,
        })
        expect(result.Root.value).toEqual({ last: 4 })
        expect(Object.getPrototypeOf(result.Root.value)).toBe(Object.prototype)
    })

    test('Retains the fourth timing field as a zero-duration compatibility label', () => {
        const parsed = YINI.parse('^ Root\nvalue = [1, 2]\n', {
            includeMetadata: true,
            includeTiming: true,
        }) as any

        expect(parsed.result).toEqual({ Root: { value: [1, 2] } })
        expect(parsed.meta.timing.phase4).toEqual({
            name: 'Object Building',
            timeMs: 0,
        })
        expect(parsed.meta.timing.phase3.name).toBe('AST Building')
    })

    test('Keeps tooling diagnostics structured and quiet for collisions', () => {
        const stderr = jest.spyOn(console, 'error').mockImplementation(() => {})
        const warnings = jest
            .spyOn(console, 'warn')
            .mockImplementation(() => {})
        try {
            const parsed = YINI.parseForTooling('A = 1\n^ A\n')
            expect(parsed.ok).toBe(false)
            expect(parsed.result).toEqual({ A: 1 })
            expect(parsed.diagnostics[0]).toMatchObject({
                severity: 'error',
                message:
                    "Name collision between orphan member and section 'A'.",
            })
            expect(stderr).not.toHaveBeenCalled()
            expect(warnings).not.toHaveBeenCalled()
        } finally {
            stderr.mockRestore()
            warnings.mockRestore()
        }
    })
})
