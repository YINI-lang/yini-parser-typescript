// tests/integration/5-extended-parsing/extended-section-header.test.ts
import YINI from '../../../src'
import { toPrettyJSON } from '../../../src/utils/print'
import { parseUntilError } from '../../test-helpers'

/**
 * Extended section header parsing tests.
 */
describe('Section header tests', () => {
    test('1. Should parse valid repeated-marker section headers.', () => {
        // Arrange.
        const yini = `
^ App
title = "Main"

^^ Database
host = "localhost"

^^^ Pool
size = 10

< Title
name = "Alt marker"

§ Settings
enabled = true

^App2
value = 1

^^Database2
port = 5432
`

        const expected = {
            App: {
                title: 'Main',
                Database: {
                    host: 'localhost',
                    Pool: {
                        size: 10,
                    },
                },
            },
            Title: {
                name: 'Alt marker',
            },
            Settings: {
                enabled: true,
            },
            App2: {
                value: 1,
                Database2: {
                    port: 5432,
                },
            },
        }

        // Act.
        const result = parseUntilError(yini, false)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('2. Should parse valid shorthand section headers.', () => {
        // Arrange.
        const yini = `
^ Root
name = "Top"

    ^2 DeepSection
    value = 100

    <2 Title
    text = "Alt shorthand"

    §2 VeryDeep
    enabled = false
`

        const expected = {
            Root: {
                name: 'Top',
                DeepSection: {
                    value: 100,
                },
                Title: {
                    text: 'Alt shorthand',
                },
                VeryDeep: {
                    enabled: false,
                },
            },
        }

        // Act.
        const result = parseUntilError(yini, false)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('3. Should parse valid backticked section names.', () => {
        // Arrange.
        const yini = `
^ \`My App\`
title = "Main"

^^ \`Database Settings\`
host = "localhost"

< \`Title with spaces\`
name = "Alt marker"

§ \`Section Name\`
enabled = true
`

        const expected = {
            'My App': {
                title: 'Main',
                'Database Settings': {
                    host: 'localhost',
                },
            },
            'Title with spaces': {
                name: 'Alt marker',
            },
            'Section Name': {
                enabled: true,
            },
        }

        // Act.
        const result = parseUntilError(yini, false)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(expected))
    })

    test('4. Should throw on dotted composite section header name.', () => {
        // Arrange.
        const yini = `
^ my.section
value = 1
`

        // Act & Assert.
        expect(() => {
            parseUntilError(yini, false)
        }).toThrow()
    })

    test('5. Should throw on dotted composite nested section header name.', () => {
        // Arrange.
        const yini = `
^ App
title = "Main"

^^ db.pool
size = 10
`

        // Act & Assert.
        expect(() => {
            parseUntilError(yini, false)
        }).toThrow()
    })
})
