/**
 * Options Consistency Smoke Test.
 *
 */

import path from 'path'
import YINI from '../../src'
import { AllUserOptions } from '../../src/types'
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
        const correctLenientOptions: AllUserOptions = {
            strictMode: nonStrictMode,
            failLevel: 'ignore-errors', // 'auto' must get normalized to 'ignore-errors' (lenient mode).
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            includeTiming: false,
            preserveUndefinedInMeta: false,
            suppressWarnings: false, // Suppress warnings in console (does not effect warnings in meta data).
            requireDocTerminator: 'optional',
            treatEmptyValueAsNull: 'allow-with-warning',
            onDuplicateKey: 'warn-and-keep-first',
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
        const options: AllUserOptions = {
            // IMPORTANT: Below values are set.
            strictMode: nonStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'errors',
            includeTiming: true,
            preserveUndefinedInMeta: true,
            suppressWarnings: false,
            requireDocTerminator: 'required',
            treatEmptyValueAsNull: 'disallow',
            onDuplicateKey: 'overwrite',
        }

        // Act.
        const result = YINI.parse(fixtureWithTerminator, options)
        debugPrint(result)

        // Assert.
        const preservedOptions: AllUserOptions = {
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
        const options: AllUserOptions = {
            // IMPORTANT: Below values are set.
            strictMode: nonStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'ignore-errors',
            includeTiming: false,
            preserveUndefinedInMeta: false,
            suppressWarnings: true,
            requireDocTerminator: 'warn-if-missing',
            treatEmptyValueAsNull: 'allow-with-warning',
            onDuplicateKey: 'keep-first',
        }

        // Act.
        const result = YINI.parse(fixtureWithTerminator, options)
        debugPrint(result)

        // Assert.
        const preservedOptions: AllUserOptions = {
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
        const correctLenientOptions: AllUserOptions = {
            strictMode: isStrictMode,
            failLevel: 'errors', // 'auto' must get normalized to 'ignore-errors' (lenient mode).
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            includeTiming: false,
            preserveUndefinedInMeta: false,
            suppressWarnings: false, // Suppress warnings in console (does not effect warnings in meta data).
            requireDocTerminator: 'optional',
            treatEmptyValueAsNull: 'disallow',
            onDuplicateKey: 'error',
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
        const options: AllUserOptions = {
            // IMPORTANT: Below values are set.
            strictMode: isStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'errors',
            includeTiming: true,
            preserveUndefinedInMeta: true,
            suppressWarnings: false,
            requireDocTerminator: 'required',
            treatEmptyValueAsNull: 'disallow',
            onDuplicateKey: 'overwrite',
        }

        // Act.
        const result = YINI.parse(fixtureWithTerminator, options)
        debugPrint(result)

        // Assert.
        const preservedOptions: AllUserOptions = {
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

    test('2.c) Parsing inline and arbitrarily options carried over correctly when (in strict mode).', () => {
        // Arrange.
        const isStrictMode = true
        const mustBeTrue = true
        const options: AllUserOptions = {
            // IMPORTANT: Below values are set.
            strictMode: isStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'ignore-errors',
            includeTiming: false,
            preserveUndefinedInMeta: false,
            suppressWarnings: true,
            requireDocTerminator: 'warn-if-missing',
            treatEmptyValueAsNull: 'allow-with-warning',
            onDuplicateKey: 'keep-first',
        }

        // Act.
        const result = YINI.parse(fixtureWithTerminator, options)
        debugPrint(result)

        // Assert.
        const preservedOptions: AllUserOptions = {
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
        const correctLenientOptions: AllUserOptions = {
            strictMode: nonStrictMode,
            failLevel: 'ignore-errors', // 'auto' must get normalized to 'ignore-errors' (lenient mode).
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            includeTiming: false,
            preserveUndefinedInMeta: false,
            suppressWarnings: false, // Suppress warnings in console (does not effect warnings in meta data).
            requireDocTerminator: 'optional',
            treatEmptyValueAsNull: 'allow-with-warning',
            onDuplicateKey: 'warn-and-keep-first',
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
        const options: AllUserOptions = {
            // IMPORTANT: Below values are set.
            strictMode: nonStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'errors',
            includeTiming: true,
            preserveUndefinedInMeta: true,
            suppressWarnings: false,
            requireDocTerminator: 'required',
            treatEmptyValueAsNull: 'disallow',
            onDuplicateKey: 'overwrite',
        }

        // Act.
        const result = YINI.parseFile(fullPath, options)
        debugPrint(result)

        // Assert.
        const preservedOptions: AllUserOptions = {
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

    test('3.c) Parsing file and arbitrarily options carried over correctly when (in lenient mode).', () => {
        // Arrange.
        const nonStrictMode = false
        const mustBeTrue = true
        const fileName = 'smoke-fixtures/1-web-server-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)
        const options: AllUserOptions = {
            // IMPORTANT: Below values are set.
            strictMode: nonStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'ignore-errors',
            includeTiming: false,
            preserveUndefinedInMeta: false,
            suppressWarnings: true,
            requireDocTerminator: 'warn-if-missing',
            treatEmptyValueAsNull: 'allow-with-warning',
            onDuplicateKey: 'keep-first',
        }

        // Act.
        const result = YINI.parseFile(fullPath, options)
        debugPrint(result)

        // Assert.
        const preservedOptions: AllUserOptions = {
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
        const correctLenientOptions: AllUserOptions = {
            strictMode: isStrictMode,
            failLevel: 'errors', // 'auto' must get normalized to 'ignore-errors' (lenient mode).
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            includeTiming: false,
            preserveUndefinedInMeta: false,
            suppressWarnings: false, // Suppress warnings in console (does not effect warnings in meta data).
            requireDocTerminator: 'optional',
            treatEmptyValueAsNull: 'disallow',
            onDuplicateKey: 'error',
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
        const options: AllUserOptions = {
            // IMPORTANT: Below values are set.
            strictMode: isStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'errors',
            includeTiming: true,
            preserveUndefinedInMeta: true,
            suppressWarnings: false,
            requireDocTerminator: 'required',
            treatEmptyValueAsNull: 'disallow',
            onDuplicateKey: 'overwrite',
        }

        // Act.
        const result = YINI.parseFile(fullPath, options)
        debugPrint(result)

        // Assert.
        const preservedOptions: AllUserOptions = {
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

    test('4.c) Parsing file and arbitrarily options carried over correctly when (in strict mode).', () => {
        // Arrange.
        const isStrictMode = true
        const mustBeTrue = true
        const fileName = 'smoke-fixtures/1-web-server-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)
        const options: AllUserOptions = {
            // IMPORTANT: Below values are set.
            strictMode: isStrictMode,
            includeMetadata: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'ignore-errors',
            includeTiming: false,
            preserveUndefinedInMeta: false,
            suppressWarnings: true,
            requireDocTerminator: 'warn-if-missing',
            treatEmptyValueAsNull: 'allow-with-warning',
            onDuplicateKey: 'keep-first',
        }

        // Act.
        const result = YINI.parseFile(fullPath, options)
        debugPrint(result)

        // Assert.
        const preservedOptions: AllUserOptions = {
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
})
