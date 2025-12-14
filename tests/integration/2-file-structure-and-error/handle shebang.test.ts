import { join } from 'node:path'
import path from 'path'
import YINI from '../../../src'
import { debugPrint, toPrettyJSON } from '../../../src/utils/print'

const DIR_OF_FIXTURES = '../fixtures/shebang'

/* ====================================================================
 *  Test shebang support via parse(..)
 * ==================================================================== */
describe('Test shebang support via parse(..):', () => {
    const expected = {
        App: { name: 'Shebang-demo' },
    }

    test('A-1) Parses with shebang on first line', () => {
        const input = `#!/usr/bin/env yini
^ App
name = "Shebang-demo"`

        const result = YINI.parse(input)

        expect(result).toEqual(expected)
    })

    test('A-2) Parses with shebang and spaces AFTER shebang marker', () => {
        const input = `#!  /usr/bin/env yini
^ App
name = "Shebang-demo"`

        const result = YINI.parse(input)

        expect(result).toEqual(expected)
    })

    test('A-3) Rejects shebang if not on first character (leading whitespace)', () => {
        const input = `  #!/usr/bin/env yini
^ App
name = "Shebang-demo"`

        expect(() => YINI.parse(input)).toThrow()
    })

    test('A-4) Rejects shebang if placed after first line', () => {
        const input = `
#!/usr/bin/env yini
^ App
name = "Shebang-demo"`

        expect(() => YINI.parse(input)).toThrow()
    })

    test("A-5) Shebang must not strip ordinary lines containing '#!'", () => {
        const input = `^ App
name = "#!/not/a/shebang"`

        const result = YINI.parse(input)

        expect(result.App.name).toBe('#!/not/a/shebang')
    })

    test('A-6) Allows BOM + shebang combination', () => {
        const input = `\uFEFF#!/usr/bin/env yini
^ App
name = "Shebang-demo"`

        const result = YINI.parse(input)

        expect(result).toEqual(expected)
    })
})

/* ====================================================================
 *  Test shebang support via parseFile(..)
 * ==================================================================== */
describe('B — parseFile(..) shebang support', () => {
    const baseDir = join(__dirname, DIR_OF_FIXTURES)

    const expectedSimple = {
        App: { name: 'Shebang-demo' },
    }

    // =====================================================================
    // Valid shebang cases
    // =====================================================================

    test('B-1) Parses with shebang on first line', () => {
        const full = join(baseDir, 'shebang-1-valid.yini')
        const result = YINI.parseFile(full)

        expect(result).toEqual(expectedSimple)
    })

    test('B-2) Parses with BOM + shebang', () => {
        const full = join(baseDir, 'shebang-2-valid-with-bom.yini')
        const result = YINI.parseFile(full)

        expect(result).toEqual(expectedSimple)
    })

    // =====================================================================
    // Invalid shebang cases
    // =====================================================================

    test('B-3) Rejected (leading space before shebang)', () => {
        const full = join(baseDir, 'shebang-3-invalid-leading-space.yini')

        expect(() => YINI.parseFile(full)).toThrow()
    })

    test('B-4) Rejected (shebang on second line)', () => {
        const full = join(baseDir, 'shebang-4-invalid-second-line.yini')

        expect(() => YINI.parseFile(full)).toThrow()
    })

    test('B-5) Rejected (alternate second-line shebang)', () => {
        const full = join(baseDir, 'shebang-5-invalid-second-line.yini')

        expect(() => YINI.parseFile(full)).toThrow()
    })

    // =====================================================================
    // Literal '#!' inside values (should NOT be treated as a shebang)
    // =====================================================================

    test("B-6) '#!' inside value is not a shebang", () => {
        const full = join(baseDir, 'shebang-6-valid-literal.yini')

        const result = YINI.parseFile(full)

        expect(result.App.value).toBe('#!/not-a-shebang')
        expect(result.App).toBeDefined()
    })

    test('B-7) Parses shebang + blank line before content', () => {
        const full = join(baseDir, 'shebang-7-valid-newline.yini')
        const result = YINI.parseFile(full)

        expect(result).toEqual(expectedSimple)
    })
})
