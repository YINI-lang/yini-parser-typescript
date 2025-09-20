/**
 * Options Consistency Smoke Test.
 *
 */

import path from 'path'
import YINI from '../../src'
import { TExactMode } from '../../src/core/internalTypes'
import { ParseOptions } from '../../src/types'
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
        const result = YINI.parse(fixture, {
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

    test('4.a) Parsing file and options having correct default values for strict mode.', () => {
        // Arrange.
        const isStrictMode = true
        const mustBeTrue = true
        const fileName = 'smoke-fixtures/1-web-server-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath, {
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
})
