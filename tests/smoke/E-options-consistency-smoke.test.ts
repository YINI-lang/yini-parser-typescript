/**
 * Options Consistency Smoke Test.
 *
 */

import path from 'path'
import YINI from '../../src'
import { IAllUserOptions } from '../../src/core/types'
import { sortObjectKeys } from '../../src/utils/object'
import { debugPrint, toPrettyJSON } from '../../src/utils/print'

const DIR_OF_FIXTURES = '../fixtures/smoke-fixtures'

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

    test('1.a) Have correct default options (lenient mode) when parsing inline.', () => {
        // Arrange.
        const nonStrictMode = false
        const mustBeTrue = true

        // Act.
        const result = YINI.parse(fixture, {
            // IMPORTANT: Below values are set.
            strictMode: nonStrictMode,
            includeMetaData: mustBeTrue,
            includeDiagnostics: mustBeTrue,
        })
        debugPrint(result)

        // Assert.
        const correctLenientOptions: IAllUserOptions = {
            strictMode: nonStrictMode,
            failLevel: 'ignore-errors', // 'auto' must get normalized to 'ignore-errors' (lenient mode).
            includeMetaData: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            includeTiming: false,
            preserveUndefinedInMeta: false,
            suppressWarnings: false, // Suppress warnings in console (does not effect warnings in meta data).
            requireDocTerminator: 'optional',
            treatEmptyValueAsNull: 'allow-with-warning',
            onDuplicateKey: 'warn-and-keep-first',
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.optionsUsed).toEqual(true)
        expect(
            toPrettyJSON(sortObjectKeys(result.meta.diagnostics.optionsUsed)),
        ).toEqual(toPrettyJSON(sortObjectKeys(correctLenientOptions)))
    })

    test('1.b) Options carried over correctly when parsing inline (in lenient mode).', () => {
        // Arrange.
        const nonStrictMode = false
        const mustBeTrue = true
        const options: IAllUserOptions = {
            // IMPORTANT: Below values are set.
            strictMode: nonStrictMode,
            includeMetaData: mustBeTrue,
            includeDiagnostics: mustBeTrue,
            // Below values are set to arbitrarily values:
            failLevel: 'on-errors',
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
        const preservedOptions: IAllUserOptions = {
            ...options,
        }
        expect(!!result.meta).toEqual(true)
        expect(!!result.meta.diagnostics.optionsUsed).toEqual(true)
        expect(
            toPrettyJSON(sortObjectKeys(result.meta.diagnostics.optionsUsed)),
        ).toEqual(toPrettyJSON(sortObjectKeys(preservedOptions)))
    })

    //@todo make below, but with different values than above
    //test('1.c) Options carried over correctly when parsing inline (in lenient mode).', () => {

    xtest('Parse file "1-web-server-configuration.*".', () => {
        // Arrange.
        const fileName = '1-web-server-configuration.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parse(fullPath)
        debugPrint('fullPath = ' + fullPath)
        debugPrint(result)

        // Assert.
        expect(result.Server.max_connections).toEqual(200)
        //@todo Add tests for the other literal as well.
    })
})
