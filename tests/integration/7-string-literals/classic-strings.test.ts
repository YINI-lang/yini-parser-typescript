// tests/integration/7-string-literals/classic-strings.test.ts

import YINI from '../../../src'
import { debugPrint, toPrettyJSON } from '../../../src/utils/print'

/**
 * Classic (C) string literal tests.
 *
 * Covers:
 * - Full escape coverage (Spec 6.2.1).
 * - Basic parsing.
 * - All escape sequences.
 * - Invalid escapes.
 * - Case-insensitive prefix.
 * - Single-line requirement.
 * - Control character enforcement.
 * - Concatenation (to some extent).
 */
describe('Classic string literal tests:', () => {
    test('1.a) Should parse simple Classic string (double quotes).', () => {
        const yini = `^ Test
            value = c"Hello World"
        `
        const result = YINI.parse(yini, true)
        expect(result.Test.value).toEqual('Hello World')
    })

    test('1.b) Should parse simple Classic string (single quotes).', () => {
        const yini = `^ Test
            value = C'Hello World'
        `
        const result = YINI.parse(yini, true)
        expect(result.Test.value).toEqual('Hello World')
    })

    test('1.c) Prefix must be case-insensitive.', () => {
        const yini = `^ Test
            a = c"test"
            b = C"test"
        `
        const result = YINI.parse(yini, true)
        expect(result.Test.a).toEqual('test')
        expect(result.Test.b).toEqual('test')
    })

    // ─────────────────────────────────────────────
    // Escape sequences
    // ─────────────────────────────────────────────

    test('2.a) Should parse common escape sequences.', () => {
        const yini = `^ Escapes
            value = c"Line1\\nLine2\\tTabbed\\rCarriage"
        `
        const result = YINI.parse(yini, true)

        expect(result.Escapes.value).toEqual('Line1\nLine2\tTabbed\rCarriage')
    })

    test('2.b) Should parse escaped quotes and backslash.', () => {
        const yini = `^ Escapes
            value = c"\\\\ \\" \\'"
        `
        const result = YINI.parse(yini, true)

        expect(result.Escapes.value).toEqual('\\ " \'')
    })

    test('2.c) Should parse hex escape (\\xhh).', () => {
        const yini = `^ Escapes
            value = c"\\x41"
        `
        const result = YINI.parse(yini, true)

        expect(result.Escapes.value).toEqual('A')
    })

    test('2.d) Should parse Unicode escape (\\uhhhh).', () => {
        const yini = `^ Escapes
            value = c"\\u0041"
        `
        const result = YINI.parse(yini, true)

        expect(result.Escapes.value).toEqual('A')
    })

    test('2.e) Should parse UTF-32 escape (\\Uhhhhhhhh).', () => {
        const yini = `^ Escapes
            value = c"\\U00000041"
        `
        const result = YINI.parse(yini, true)

        expect(result.Escapes.value).toEqual('A')
    })

    test('2.f) Should parse octal escape (\\oOOO).', () => {
        const yini = `^ Escapes
            value = c"\\o101"
        `
        const result = YINI.parse(yini, true)

        expect(result.Escapes.value).toEqual('A')
    })

    // ─────────────────────────────────────────────
    // Full escape coverage (Spec 6.2.1)
    // ─────────────────────────────────────────────

    test('2.g) Should support all classic escape sequences.', () => {
        const yini = `^ Escapes
        value = c"\\\\ \\' \\" \\/ \\0 \\? \\a \\b \\f \\n \\r \\t \\v"
    `
        const result = YINI.parse(yini, true)

        expect(result.Escapes.value).toEqual(
            '\\ \' " / \0 ? \x07 \b \f \n \r \t \v',
        )
    })

    // ─────────────────────────────────────────────
    // Invalid escapes
    // ─────────────────────────────────────────────

    test('3.a) Invalid escape should throw (strict).', () => {
        const yini = `^ Test
            value = c"\\z"
        `
        expect(() => YINI.parse(yini, true)).toThrow()
    })

    test('3.b) Invalid octal should throw.', () => {
        const yini = `^ Test
            value = c"\\o378"
        `
        expect(() => YINI.parse(yini, true)).toThrow()
    })

    test('3.c) Invalid hex escape should throw.', () => {
        const yini = `^ Test
        value = c"\\x4"
    `
        expect(() => YINI.parse(yini, true)).toThrow()
    })

    test('3.d) Invalid unicode \\u escape should throw.', () => {
        const yini = `^ Test
        value = c"\\u123"
    `
        expect(() => YINI.parse(yini, true)).toThrow()
    })

    test('3.e) Invalid unicode \\U escape should throw.', () => {
        const yini = `^ Test
        value = c"\\U1234"
    `
        expect(() => YINI.parse(yini, true)).toThrow()
    })

    test('3.f) Invalid empty octal should throw.', () => {
        const yini = `^ Test
        value = c"\\o"
    `
        expect(() => YINI.parse(yini, true)).toThrow()
    })

    // ─────────────────────────────────────────────
    // Control character enforcement
    // ─────────────────────────────────────────────

    test('4.a) Control characters must be escaped.', () => {
        const yini = `^ Test
            value = c"Hello
World"
        `
        expect(() => YINI.parse(yini, true)).toThrow()
    })

    // ─────────────────────────────────────────────
    // Single-line enforcement
    // ─────────────────────────────────────────────

    test('5.a) Classic strings must not span multiple lines.', () => {
        const yini = `^ Test
            value = c"This
is invalid"
        `
        expect(() => YINI.parse(yini, true)).toThrow()
    })

    // ─────────────────────────────────────────────
    // Concatenation
    // ─────────────────────────────────────────────

    test('6.a) Should concatenate classic strings.', () => {
        const yini = `^ Test
            value = c"Hello " + c"World"
        `
        const result = YINI.parse(yini, true)

        expect(result.Test.value).toEqual('Hello World')
    })

    test('6.b) Should concatenate mixed raw + classic.', () => {
        const yini = `^ Test
            value = "Hello " + c"World"
        `
        const result = YINI.parse(yini, true)

        expect(result.Test.value).toEqual('Hello World')
    })

    // ─────────────────────────────────────────────
    // Edge cases
    // ─────────────────────────────────────────────

    test('7.a) Empty Classic string.', () => {
        const yini = `^ Test
            value = c""
        `
        const result = YINI.parse(yini, true)

        expect(result.Test.value).toEqual('')
    })

    test('7.b) Space and tab allowed directly.', () => {
        const yini = `^ Test
            value = c"Hello World\t"
        `
        const result = YINI.parse(yini, true)

        expect(result.Test.value).toEqual('Hello World\t')
    })
})
