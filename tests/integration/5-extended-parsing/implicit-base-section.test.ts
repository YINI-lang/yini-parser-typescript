import YINI from '../../../src'
import { debugPrint, toPrettyJSON } from '../../../src/utils/print'
import { parseUntilError } from '../../test-helpers'

/**
 * Implicit "base" section behavior.
 *
 * Rule:
 * - In lenient mode, members outside any explicit section are exposed under
 *   an implicit section named "base" in the parsed result.
 * - Explicitly defined sections are mounted directly on the result.
 * - The synthetic "base" section is only added when needed.
 */
describe('Implicit base section tests', () => {
    test('1. [lenient] Should place top-level members under implicit base.', () => {
        // Arrange.
        const yini = `
            name = "Demo App"
            port = 8080
            darkMode = true
        `

        const expected = {
            // base: {
            name: 'Demo App',
            port: 8080,
            darkMode: true,
            // },
        }

        // Act.
        const result = YINI.parse(yini, { strictMode: false })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('2. [lenient] Should place top-level null and empty values under implicit base.', () => {
        // Arrange.
        const yini = `
            CacheFolder = null
            CacheFolder2 =
        `

        const expected = {
            // base: {
            CacheFolder: null,
            CacheFolder2: null,
            // },
        }

        // Act.
        const result = YINI.parse(yini, {
            strictMode: false,
            treatEmptyValueAsNull: 'allow',
        })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('3. [lenient] Should mount explicit top-level sections directly on result.', () => {
        // Arrange.
        const yini = `
            ^ App
            name = "Demo"
            port = 8080
        `

        const expected = {
            App: {
                name: 'Demo',
                port: 8080,
            },
        }

        // Act.
        const result = YINI.parse(yini, { strictMode: false })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        expect((result as any).base).toBeUndefined()
    })

    test('4. [lenient] Should combine implicit base with explicit top-level sections.', () => {
        // Arrange.
        const yini = `
            name = "Demo App"
            port = 8080

            ^ App
            title = "Hello"

            ^ Server
            host = "localhost"
        `

        const expected = {
            // base: {
            name: 'Demo App',
            port: 8080,
            // },
            App: {
                title: 'Hello',
            },
            Server: {
                host: 'localhost',
            },
        }

        // Act.
        const result = YINI.parse(yini, { strictMode: false })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('5. [lenient] Should keep nested sections inside explicit sections, not under base.', () => {
        // Arrange.
        const yini = `
            name = "Demo App"

            ^ App
            version = "1.0.0"

            ^^ Features
            caching = true
        `

        const expected = {
            // base: {
            name: 'Demo App',
            // },
            App: {
                version: '1.0.0',
                Features: {
                    caching: true,
                },
            },
        }

        // Act.
        const result = YINI.parse(yini, { strictMode: false })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('6. [lenient] Should not create implicit base when there are no top-level members.', () => {
        // Arrange.
        const yini = `
            ^ App
            name = "Demo"

            ^ Server
            port = 8080
        `

        const expected = {
            App: {
                name: 'Demo',
            },
            Server: {
                port: 8080,
            },
        }

        // Act.
        const result = YINI.parse(yini, { strictMode: false })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        expect((result as any).base).toBeUndefined()
    })

    test('7. [strict] Should fail if top-level members are used outside any explicit section.', () => {
        // Arrange.
        const yini = `
            name = "Demo App"

            ^ App
            title = "Hello"
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(yini, { strictMode: true })
        }).toThrow()
    })

    test('8. [strict] Should parse normally when only explicit sections are used.', () => {
        // Arrange.
        const yini = `
            ^ App
            title = "Hello"

            ^ Server
            host = "localhost"
        `

        const expected = {
            App: {
                title: 'Hello',
            },
            Server: {
                host: 'localhost',
            },
        }

        // Act.
        const result = YINI.parse(yini, { strictMode: true })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
        expect((result as any).base).toBeUndefined()
    })

    test('9. [lenient] Should place top-level lists and objects under implicit base.', () => {
        // Arrange.
        const yini = `
            items = [1, 2, 3]
            settings = { enabled: true, retries: 3 }
        `

        const expected = {
            // base: {
            items: [1, 2, 3],
            settings: {
                enabled: true,
                retries: 3,
            },
            // },
        }

        // Act.
        const result = YINI.parse(yini, { strictMode: false })
        debugPrint('result:')
        debugPrint(result)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })
})
