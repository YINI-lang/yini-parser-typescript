/**
 * Options Consistency Smoke Test.
 *
 */

import path from 'path'
import YINI from '../../src'
import { TExactMode } from '../../src/core/internalTypes'
import { ParseOptions, PreferredFailLevel } from '../../src/types'
import { sortObjectKeys } from '../../src/utils/object'
import { debugPrint, toPrettyJSON } from '../../src/utils/print'

const DIR_OF_FIXTURES = '../fixtures'

const fixture = `
    ^ App
    name = "Nested Example"
    version = "1.0.0"
    debug = OFF  // This is a comment.
`

const fixtureWithYini = `
    @YINI

    ^ App
    name = "Nested Example"
    version = "1.0.0"
    debug = OFF  // This is a comment.
`

const fixtureWithTerminator = `
    ^ App
    name = "Nested Example"
    version = "1.0.0"
    debug = OFF  // This is a comment.
    
    /END
`

const fixtureWithYiniAndTerminator = `
    @YINI

    ^ App
    name = "Nested Example"
    version = "1.0.0"
    debug = OFF  // This is a comment.
    
    /END
`
interface ParseOptionsExt extends ParseOptions {
    effectiveMode: TExactMode
}

/**
 * Options Consistency Smoke Tests.
 */
describe('Options Consistency Smoke Tests:', () => {
    // Dir with smoke fixtures.
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    beforeAll(() => {})

    test('1.a) Parsing inline and options having correct default values for lenient mode.', () => {
        // Arrange.
        const nonStrictMode = false
        const mustBeTrue = true

        // Act.
        const result = YINI.parse(fixture, {
            // IMPORTANT: Below values are set.
            strictMode: nonStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
        })
        debugPrint(result)

        // Assert.
        const correctLenientOptions: ParseOptionsExt = {
            effectiveMode: 'lenient',
            strictMode: nonStrictMode,
            failLevel: 'ignore-errors', // 'auto' must get normalized to 'ignore-errors' (lenient mode).
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            includeTiming: false,
            preserveUndefinedInMeta: false,
            quiet: false, // Suppress warnings in console (does not effect warnings in meta data).
            onDuplicateKey: 'warn-and-keep-first',
            requireDocTerminator: 'optional',
            treatEmptyValueAsNull: 'allow',
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.effectiveOptions).toEqual(true)
        expect(
            toPrettyJSON(
                sortObjectKeys(result.meta.diagnostics.effectiveOptions),
            ),
        ).toEqual(toPrettyJSON(sortObjectKeys(correctLenientOptions)))
    })

    test('1.b) Parsing inline and arbitrarily options carried over correctly when (in lenient mode).', () => {
        // Arrange.
        const nonStrictMode = false
        const mustBeTrue = true
        const options: ParseOptionsExt = {
            // IMPORTANT: Below values are set.
            effectiveMode: 'custom',
            strictMode: nonStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'errors',
            includeTiming: true,
            preserveUndefinedInMeta: true,
            quiet: false,
            onDuplicateKey: 'overwrite',
            requireDocTerminator: 'required',
            treatEmptyValueAsNull: 'disallow',
        }

        // Act.
        const result = YINI.parse(fixtureWithTerminator, options)
        debugPrint(result)

        // Assert.
        const preservedOptions: ParseOptionsExt = {
            ...options,
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.effectiveOptions).toEqual(true)
        expect(
            toPrettyJSON(
                sortObjectKeys(result.meta.diagnostics.effectiveOptions),
            ),
        ).toEqual(toPrettyJSON(sortObjectKeys(preservedOptions)))
    })

    test('1.c) Parsing inline and arbitrarily options carried over correctly when (in lenient mode).', () => {
        // Arrange.
        const nonStrictMode = false
        const mustBeTrue = true
        const options: ParseOptionsExt = {
            // IMPORTANT: Below values are set.
            effectiveMode: 'custom',
            strictMode: nonStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'ignore-errors',
            includeTiming: false,
            preserveUndefinedInMeta: false,
            quiet: true,
            onDuplicateKey: 'keep-first',
            requireDocTerminator: 'warn-if-missing',
            treatEmptyValueAsNull: 'allow-with-warning',
        }

        // Act.
        const result = YINI.parse(fixtureWithTerminator, options)
        debugPrint(result)

        // Assert.
        const preservedOptions: ParseOptionsExt = {
            ...options,
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.effectiveOptions).toEqual(true)
        expect(
            toPrettyJSON(
                sortObjectKeys(result.meta.diagnostics.effectiveOptions),
            ),
        ).toEqual(toPrettyJSON(sortObjectKeys(preservedOptions)))
    })

    test('2.a) Parsing inline and options having correct default values for strict mode.', () => {
        // Arrange.
        const isStrictMode = true
        const mustBeTrue = true

        // Act.
        const result = YINI.parse(fixtureWithTerminator, {
            // IMPORTANT: Below values are set.
            strictMode: isStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
        })
        debugPrint(result)

        // Assert.
        const correctLenientOptions: ParseOptionsExt = {
            effectiveMode: 'strict',
            strictMode: isStrictMode,
            failLevel: 'errors', // 'auto' must get normalized to 'ignore-errors' (lenient mode).
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            includeTiming: false,
            preserveUndefinedInMeta: false,
            quiet: false, // Suppress warnings in console (does not effect warnings in meta data).
            onDuplicateKey: 'error',
            requireDocTerminator: 'required',
            treatEmptyValueAsNull: 'disallow',
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.effectiveOptions).toEqual(true)
        expect(
            toPrettyJSON(
                sortObjectKeys(result.meta.diagnostics.effectiveOptions),
            ),
        ).toEqual(toPrettyJSON(sortObjectKeys(correctLenientOptions)))
    })

    test('2.b) Parsing inline and arbitrarily options carried over correctly when (in strict mode).', () => {
        // Arrange.
        const isStrictMode = true
        const mustBeTrue = true
        const options: ParseOptions = {
            // IMPORTANT: Below values are set.
            strictMode: isStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'errors',
            includeTiming: true,
            preserveUndefinedInMeta: true,
            quiet: false,
            onDuplicateKey: 'overwrite',
            requireDocTerminator: 'required',
            treatEmptyValueAsNull: 'disallow',
        }

        // Act.
        const result = YINI.parse(fixtureWithTerminator, options)
        debugPrint(result)

        // Assert.
        const effectiveOptions: ParseOptionsExt = {
            ...options,
            effectiveMode: 'custom',
            strictMode: false,
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.effectiveOptions).toEqual(true)
        expect(
            toPrettyJSON(
                sortObjectKeys(result.meta.diagnostics.effectiveOptions),
            ),
        ).toEqual(toPrettyJSON(sortObjectKeys(effectiveOptions)))
    })

    test('2.c) Parsing inline and arbitrarily options carried over correctly when (in strict mode).', () => {
        // Arrange.
        const isStrictMode = true
        const mustBeTrue = true
        const options: ParseOptions = {
            // IMPORTANT: Below values are set.
            strictMode: isStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'ignore-errors',
            includeTiming: false,
            preserveUndefinedInMeta: false,
            quiet: true,
            onDuplicateKey: 'keep-first',
            requireDocTerminator: 'warn-if-missing',
            treatEmptyValueAsNull: 'allow-with-warning',
        }

        // Act.
        const result = YINI.parse(fixtureWithTerminator, options)
        debugPrint(result)

        // Assert.
        const effectiveOptions: ParseOptionsExt = {
            ...options,
            effectiveMode: 'custom',
            strictMode: false,
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.effectiveOptions).toEqual(true)
        expect(
            toPrettyJSON(
                sortObjectKeys(result.meta.diagnostics.effectiveOptions),
            ),
        ).toEqual(toPrettyJSON(sortObjectKeys(effectiveOptions)))
    })

    test('3.a) Parsing file and options having correct default values for lenient mode.', () => {
        // Arrange.
        const nonStrictMode = false
        const mustBeTrue = true
        const fileName = 'smoke-fixtures/1-web-server-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath, {
            // IMPORTANT: Below values are set.
            strictMode: nonStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
        })
        debugPrint(result)

        // Assert.
        const correctLenientOptions: ParseOptionsExt = {
            effectiveMode: 'lenient',
            strictMode: nonStrictMode,
            failLevel: 'ignore-errors', // 'auto' must get normalized to 'ignore-errors' (lenient mode).
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            includeTiming: false,
            preserveUndefinedInMeta: false,
            quiet: false, // Suppress warnings in console (does not effect warnings in meta data).
            onDuplicateKey: 'warn-and-keep-first',
            requireDocTerminator: 'optional',
            treatEmptyValueAsNull: 'allow',
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.effectiveOptions).toEqual(true)
        expect(
            toPrettyJSON(
                sortObjectKeys(result.meta.diagnostics.effectiveOptions),
            ),
        ).toEqual(toPrettyJSON(sortObjectKeys(correctLenientOptions)))
    })

    test('3.b) Parsing file and arbitrarily options carried over correctly when (in lenient mode).', () => {
        // Arrange.
        const nonStrictMode = false
        const mustBeTrue = true
        const fileName = 'valid/strict/strict-common-config-1.yini'
        const fullPath = path.join(baseDir, fileName)
        const options: ParseOptions = {
            // IMPORTANT: Below values are set.
            strictMode: nonStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'errors',
            includeTiming: true,
            preserveUndefinedInMeta: true,
            quiet: false,
            onDuplicateKey: 'overwrite',
            requireDocTerminator: 'required',
            treatEmptyValueAsNull: 'disallow',
        }

        // Act.
        const result = YINI.parseFile(fullPath, options)
        debugPrint(result)

        // Assert.
        const effectiveOptions: ParseOptionsExt = {
            ...options,
            effectiveMode: 'custom',
            strictMode: false,
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.effectiveOptions).toEqual(true)
        expect(
            toPrettyJSON(
                sortObjectKeys(result.meta.diagnostics.effectiveOptions),
            ),
        ).toEqual(toPrettyJSON(sortObjectKeys(effectiveOptions)))
    })

    test('3.c) Parsing file and arbitrarily options carried over correctly when (in lenient mode).', () => {
        // Arrange.
        const nonStrictMode = false
        const mustBeTrue = true
        const fileName = 'smoke-fixtures/1-web-server-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)
        const options: ParseOptions = {
            // IMPORTANT: Below values are set.
            strictMode: nonStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'ignore-errors',
            includeTiming: false,
            preserveUndefinedInMeta: false,
            quiet: true,
            onDuplicateKey: 'keep-first',
            requireDocTerminator: 'warn-if-missing',
            treatEmptyValueAsNull: 'allow-with-warning',
        }

        // Act.
        const result = YINI.parseFile(fullPath, options)
        debugPrint(result)

        // Assert.
        const effectiveOptions: ParseOptionsExt = {
            ...options,
            effectiveMode: 'custom',
            strictMode: false,
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.effectiveOptions).toEqual(true)
        expect(
            toPrettyJSON(
                sortObjectKeys(result.meta.diagnostics.effectiveOptions),
            ),
        ).toEqual(toPrettyJSON(sortObjectKeys(effectiveOptions)))
    })

    test('4.a) Parsing file and options having correct default values for strict mode with requireDocTerminator as "optional".', () => {
        // Arrange.
        const isStrictMode = true
        const mustBeTrue = true
        const fileName = 'smoke-fixtures/1-web-server-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath, {
            // IMPORTANT: Below values are set.
            strictMode: isStrictMode,
            requireDocTerminator: 'optional',
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
        })
        debugPrint(result)

        // Assert.
        const correctLenientOptions: ParseOptionsExt = {
            effectiveMode: 'custom',
            strictMode: false,
            failLevel: 'errors', // 'auto' must get normalized to 'ignore-errors' (lenient mode).
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            includeTiming: false,
            preserveUndefinedInMeta: false,
            quiet: false, // Suppress warnings in console (does not effect warnings in meta data).
            onDuplicateKey: 'error',
            requireDocTerminator: 'optional',
            treatEmptyValueAsNull: 'disallow',
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.effectiveOptions).toEqual(true)
        expect(
            toPrettyJSON(
                sortObjectKeys(result.meta.diagnostics.effectiveOptions),
            ),
        ).toEqual(toPrettyJSON(sortObjectKeys(correctLenientOptions)))
    })

    test('4.b) Parsing file and arbitrarily options carried over correctly when (in strict mode).', () => {
        // Arrange.
        const isStrictMode = true
        const mustBeTrue = true
        const fileName = 'valid/strict/strict-common-config-1.yini'
        const fullPath = path.join(baseDir, fileName)
        const options: ParseOptions = {
            // IMPORTANT: Below values are set.
            strictMode: isStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'errors',
            includeTiming: true,
            preserveUndefinedInMeta: true,
            quiet: false,
            onDuplicateKey: 'overwrite',
            requireDocTerminator: 'required',
            treatEmptyValueAsNull: 'disallow',
        }

        // Act.
        const result = YINI.parseFile(fullPath, options)
        debugPrint(result)

        // Assert.
        const effectiveOptions: ParseOptionsExt = {
            ...options,
            effectiveMode: 'custom',
            strictMode: false,
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.effectiveOptions).toEqual(true)
        expect(
            toPrettyJSON(
                sortObjectKeys(result.meta.diagnostics.effectiveOptions),
            ),
        ).toEqual(toPrettyJSON(sortObjectKeys(effectiveOptions)))
    })

    test('4.c) Parsing file and arbitrarily options carried over correctly when (in strict mode).', () => {
        // Arrange.
        const isStrictMode = true
        const mustBeTrue = true
        const fileName = 'smoke-fixtures/1-web-server-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)
        const options: ParseOptions = {
            // IMPORTANT: Below values are set.
            strictMode: isStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'ignore-errors',
            includeTiming: false,
            preserveUndefinedInMeta: false,
            quiet: true,
            onDuplicateKey: 'keep-first',
            requireDocTerminator: 'warn-if-missing',
            treatEmptyValueAsNull: 'allow-with-warning',
        }

        // Act.
        const result = YINI.parseFile(fullPath, options)
        debugPrint(result)

        // Assert.
        const effectiveOptions: ParseOptionsExt = {
            ...options,
            effectiveMode: 'custom',
            strictMode: false,
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.effectiveOptions).toEqual(true)
        expect(
            toPrettyJSON(
                sortObjectKeys(result.meta.diagnostics.effectiveOptions),
            ),
        ).toEqual(toPrettyJSON(sortObjectKeys(effectiveOptions)))
    })

    test('5. Should handle parsing of variose number forms, notations, including with separator "_".', () => {
        // Arrange.
        const failLevel: PreferredFailLevel = 'errors'
        const input = `
            ^ Title
                ^^ Numbers
                scientific = 1.23e4
                binary_alt = %1010
                duodecimal = 0z2EX9
                positive = +123
                negative = -321

                ^^ WithSeparator
                a = 1_000
                b = +1_000
                c = 1.23_45e4
                d = 1.23e+4_5
                e = 0x_FF_AA
                f = hex:_FF_AA
                g = 0b_1010_1100
                h = %_1010_1100
                i = %1010_1100
                j = 0o_755_644
                k = 0z_2E_X9
        `

        const answer = {
            Title: {
                Numbers: {
                    scientific: 12300,
                    binary_alt: 10,
                    duodecimal: 5169,
                    positive: 123,
                    negative: -321,
                },
                WithSeparator: {
                    a: 1000,
                    b: 1000,
                    c: 12345,
                    d: 1.23e45,
                    e: 65450,
                    f: 65450,
                    g: 172,
                    h: 172,
                    i: 172,
                    j: 252836,
                    k: 5169,
                },
            },
        }

        // Act.
        const result = YINI.parse(input, false, failLevel)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
    })
})
