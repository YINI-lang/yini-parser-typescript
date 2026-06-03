// tests/integration/2-file-structure-and-error/handle shebang.test.ts
import { join } from 'node:path'
import YINI, { YiniParseResult } from '../../../src'

const DIR_OF_FIXTURES = '../../fixtures/shebang'

/* ====================================================================
 *  Shebang support via parse(..)
 * ==================================================================== */
describe('Shebang handling via parse(..):', () => {
    const expected = {
        App: { name: 'Shebang-demo' },
    }

    test('A-1) Should parse with shebang on the first line.', () => {
        // Arrange.
        const input = `#!/usr/bin/env yini
^ App
name = "Shebang-demo"`

        // Act.
        const result = YINI.parse(input)

        // Assert.
        expect(result).toEqual(expected)
    })

    test('A-2) Should parse with spaces after the shebang marker.', () => {
        // Arrange.
        const input = `#!  /usr/bin/env yini
^ App
name = "Shebang-demo"`

        // Act.
        const result = YINI.parse(input)

        // Assert.
        expect(result).toEqual(expected)
    })

    test('A-3.a) Should treat leading-whitespace shebang-like line as a comment and warn in lenient mode.', () => {
        // Arrange.
        const input = `  #!/usr/bin/env yini
^ App
name = "Shebang-demo"`

        const expected = {
            App: { name: 'Shebang-demo' },
        }

        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

        try {
            // Act.
            const result = YINI.parse(input, {
                strictMode: false,
                failLevel: 'errors',
                includeDiagnostics: true,
            }) as YiniParseResult

            // Assert.
            expect(result.result).toEqual(expected)

            expect(warnSpy).not.toHaveBeenCalled()
            expect(
                result.meta.diagnostics!.warnings.payload.some((issue) =>
                    /shebang/i.test(issue.message),
                ),
            ).toBe(true)
        } finally {
            warnSpy.mockRestore()
        }
    })

    test('A-3.b) Should report leading-whitespace shebang-like line as an error in strict mode.', () => {
        // Arrange.
        const input = `  #!/usr/bin/env yini

^ App
name = "Shebang-demo"

/END`

        // Act & Assert.
        expect(() => {
            YINI.parse(input, {
                strictMode: true,
                failLevel: 'errors',
                requireDocTerminator: 'required',
            })
        }).toThrow(/shebang|syntax-error|syntax error/i)
    })

    test('A-4) Should reject shebang after the first line.', () => {
        // Arrange.
        const input = `
#!/usr/bin/env yini
^ App
name = "Shebang-demo"`

        // Act & Assert.
        expect(() => {
            YINI.parse(input, {
                failLevel: 'errors',
            })
        }).toThrow()
    })

    test("A-5) Should not treat '#!' inside a string value as a shebang.", () => {
        // Arrange.
        const input = `^ App
name = "#!/not/a/shebang"`

        // Act.
        const result = YINI.parse(input)

        // Assert.
        expect(result.App.name).toBe('#!/not/a/shebang')
    })

    test('A-6) Should parse BOM followed by shebang.', () => {
        // Arrange.
        const input = `\uFEFF#!/usr/bin/env yini
^ App
name = "Shebang-demo"`

        // Act.
        const result = YINI.parse(input)

        // Assert.
        expect(result).toEqual(expected)
    })

    test('A-7) Should parse shebang before @yini strict in strict mode.', () => {
        // Arrange.
        const input = `#!/usr/bin/env yini
@yini strict

^ App
name = "Shebang-demo"

/END`

        // Act.
        const result = YINI.parse(input, {
            strictMode: true,
            requireDocTerminator: 'required',
        })

        // Assert.
        expect(result).toEqual(expected)
    })

    test('A-8) Should reject @yini strict after shebang when parser runs in lenient mode.', () => {
        // Arrange.
        const input = `#!/usr/bin/env yini
@yini strict

^ App
name = "Shebang-demo"

/END`

        // Act & Assert.
        expect(() => {
            YINI.parse(input, {
                strictMode: false,
                failLevel: 'errors',
            })
        }).toThrow()
    })

    test('A-9) Should preserve source line numbers after a valid shebang.', () => {
        // Arrange.
        const input = `#!/usr/bin/env yini
^ App
items = ["a", "b",]
/END`

        // Act.
        try {
            YINI.parse(input, {
                strictMode: true,
                failLevel: 'errors',
                requireDocTerminator: 'required',
            })

            throw new Error('Expected parser to throw, but it did not.')
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err)

            // Assert.
            expect(message).toMatch(/trailing comma/i)
            expect(message).toMatch(/line 3|:3:/i)
        }
    })
})

/* ====================================================================
 *  Shebang support via parseFile(..)
 * ==================================================================== */
describe('Shebang handling via parseFile(..):', () => {
    const baseDir = join(__dirname, DIR_OF_FIXTURES)

    const expected = {
        App: { name: 'Shebang-demo' },
    }

    test('B-1) Should parse file with shebang on the first line.', () => {
        // Arrange.
        const fullPath = join(baseDir, 'shebang-1-valid.yini')

        // Act.
        const result = YINI.parseFile(fullPath)

        // Assert.
        expect(result).toEqual(expected)
    })

    test('B-2) Should parse file with BOM followed by shebang.', () => {
        // Arrange.
        const fullPath = join(baseDir, 'shebang-2-valid-with-bom.yini')

        // Act.
        const result = YINI.parseFile(fullPath)

        // Assert.
        expect(result).toEqual(expected)
    })

    test('B-3.a) Should treat leading-whitespace shebang-like line as a comment and warn in lenient mode.', () => {
        // Arrange.
        const fullPath = join(baseDir, 'shebang-3-invalid-leading-space.yini')

        const expected = {
            App: { name: 'Shebang-demo' },
        }

        const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

        try {
            // Act.
            const result = YINI.parseFile(fullPath, {
                strictMode: false,
                failLevel: 'errors',
                includeDiagnostics: true,
            }) as YiniParseResult

            // Assert.
            expect(result.result).toEqual(expected)

            expect(warnSpy).not.toHaveBeenCalled()
            expect(
                result.meta.diagnostics!.warnings.payload.some((issue) =>
                    /shebang/i.test(issue.message),
                ),
            ).toBe(true)
        } finally {
            warnSpy.mockRestore()
        }
    })

    test('B-3.b) Should report leading-whitespace shebang-like line as an error in strict mode.', () => {
        // Arrange.
        const fullPath = join(baseDir, 'shebang-3-invalid-leading-space.yini')

        // Act & Assert.
        expect(() => {
            YINI.parseFile(fullPath, {
                strictMode: true,
                failLevel: 'errors',
                requireDocTerminator: 'required',
            })
        }).toThrow(/shebang|syntax-error|syntax error/i)
    })

    test('B-4) Should reject file with shebang on the second line.', () => {
        // Arrange.
        const fullPath = join(baseDir, 'shebang-4-invalid-second-line.yini')

        // Act & Assert.
        expect(() => {
            YINI.parseFile(fullPath, {
                failLevel: 'errors',
            })
        }).toThrow()
    })

    test('B-5) Should reject alternate second-line shebang case.', () => {
        // Arrange.
        const fullPath = join(baseDir, 'shebang-5-invalid-second-line.yini')

        // Act & Assert.
        expect(() => {
            YINI.parseFile(fullPath, {
                failLevel: 'errors',
            })
        }).toThrow()
    })

    test("B-6) Should not treat '#!' inside a value as a shebang.", () => {
        // Arrange.
        const fullPath = join(baseDir, 'shebang-6-valid-literal.yini')

        // Act.
        const result = YINI.parseFile(fullPath)

        // Assert.
        expect(result.App).toBeDefined()
        expect(result.App.value).toBe('#!/not-a-shebang')
    })

    test('B-7) Should parse shebang followed by blank line before content.', () => {
        // Arrange.
        const fullPath = join(baseDir, 'shebang-7-valid-newline.yini')

        // Act.
        const result = YINI.parseFile(fullPath)

        // Assert.
        expect(result).toEqual(expected)
    })
})
