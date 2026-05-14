/**
 * Final & miscellaneous smoke tests.
 *
 * Covers smaller inline parsing cases, metadata checks, diagnostics,
 * duplicate section detection, and fail-level behavior.
 */

// tests/smoke/F-final-and-misc-smoke.test.ts
import { execSync } from 'child_process'
import YINI, { PreferredFailLevel } from '../../src'
import { debugPrint, toPrettyJSON } from '../../src/utils/print'
import { parseUntilError } from '../test-helpers'

/**
 * Final, miscellaneous & complementary smoke tests.
 */
describe('Final, miscellaneous & complementary smoke tests', () => {
    test('F-1.a) Should parse a simple inline document in lenient mode.', () => {
        // Arrange.
        const validYini = `^ App
            title = 'My App Title'
            items = 25
            isDarkTheme = true`

        const answer = {
            App: {
                title: 'My App Title',
                items: 25,
                isDarkTheme: true,
            },
        }

        // Act.
        const result = parseUntilError(validYini)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
        expect(result.meta).toEqual(undefined)
    })

    test('F-1.b) Should parse a simple inline document in strict mode with metadata.', () => {
        // Arrange.
        const validYini = `^ App
            title = 'My App Title'
            items = 25
            isDarkTheme = true
            /END`

        const answer = {
            App: {
                title: 'My App Title',
                items: 25,
                isDarkTheme: true,
            },
        }

        // Act.
        const metaResult = parseUntilError(validYini, true, true)

        // Assert.
        expect(toPrettyJSON(metaResult.result)).toEqual(toPrettyJSON(answer))
        expect(metaResult.meta.mode).toEqual('strict')
        expect(metaResult.meta.source.hasDocumentTerminator).toEqual(true)
        expect(metaResult.meta.source.hasYiniMarker).toEqual(false)
        expect(metaResult.meta.source.lineCount).toEqual(5)
        expect(metaResult.meta.structure.sectionCount).toEqual(1)
        expect(metaResult.meta.structure.memberCount).toEqual(3)
    })

    test('F-2) Should parse inline YINI and return metadata in lenient mode.', () => {
        // Arrange.
        const validYini = `

            ^ General
            title = 'My Prog Title'
            items = 25
            isDarkTheme = OFF

            ^ Database
            host = 'localhost'
            port = 5432
        `

        const answer = {
            General: {
                title: 'My Prog Title',
                items: 25,
                isDarkTheme: false,
            },
            Database: {
                host: 'localhost',
                port: 5432,
            },
        }

        // Act.
        const metaResult = parseUntilError(validYini, false, true)

        // Assert.
        expect(toPrettyJSON(metaResult.result)).toEqual(toPrettyJSON(answer))
        expect(metaResult.meta.mode).toEqual('lenient')
        expect(metaResult.meta.source.hasDocumentTerminator).toEqual(false)
        expect(metaResult.meta.source.hasYiniMarker).toEqual(false)
        expect(metaResult.meta.source.lineCount).toEqual(11)
        expect(metaResult.meta.structure.sectionCount).toEqual(2)
        expect(metaResult.meta.structure.memberCount).toEqual(5)
    })

    test('F-3) Should parse a strict inline document with comments and nested sections.', () => {
        // Arrange.
        const validYini = `
            /*
                This is a multi-line block comment.
            */

            @YINI

            ^ App
            name = "Nested Example"
            version = "1.0.0"
            debug = OFF  // This is a comment.

                # Database settings.
                ^^ Database
                host = "db.example.com"
                port = 3306
                root = { user: 'admin', password: ''}
                user = "appuser"
                --password = "####"  # Old, save for now.
                //password = "####"  # Not sure yet about this pw.
                password = "####"  # Keep this secret.

                    // Commenting with slashes works too.
                    ^^^ Pool
                    min = 2
                    max = 10
                    idleTimeout = 300

                /* Block comment on a single line. */
                ^^ Logging
                level = "info"
                logToFile = ON # This is a comment.
                filePath = "./logs/app.log"
            
            /END
        `

        const answer = {
            App: {
                name: 'Nested Example',
                version: '1.0.0',
                debug: false,
                Database: {
                    host: 'db.example.com',
                    port: 3306,
                    root: {
                        user: 'admin',
                        password: '',
                    },
                    user: 'appuser',
                    password: '####',
                    Pool: {
                        min: 2,
                        max: 10,
                        idleTimeout: 300,
                    },
                },
                Logging: {
                    level: 'info',
                    logToFile: true,
                    filePath: './logs/app.log',
                },
            },
        }

        // Act.
        const metaResult = parseUntilError(validYini, true, true)

        // Assert.
        expect(toPrettyJSON(metaResult.result)).toEqual(toPrettyJSON(answer))
        expect(metaResult.meta.mode).toEqual('strict')
        expect(metaResult.meta.source.hasDocumentTerminator).toEqual(true)
        expect(metaResult.meta.source.hasYiniMarker).toEqual(true)
        expect(metaResult.meta.source.lineCount).toEqual(36)
        expect(metaResult.meta.structure.sectionCount).toEqual(4)
        expect(metaResult.meta.structure.memberCount).toEqual(14)
    })

    test('F-4) Should throw on invalid hex notation with whitespace before colon.', () => {
        // Arrange.
        const invalidYini = `^ App
        title = 'My App Title'
        value = hex : F09   // INVALID! whitespace before colon
        isDarkTheme = true`

        // Act & Assert.
        expect(() => {
            parseUntilError(invalidYini)
            debugPrint(invalidYini)
        }).toThrow()
    })

    test('F-5) Should return diagnostics metadata for a defect file with ignore-errors.', () => {
        // Arrange.
        const result = YINI.parseFile(
            'tests/fixtures/invalid/defectConfig2Combo3.yini',
            {
                strictMode: true,
                failLevel: 'ignore-errors',
                includeMetadata: true,
                includeDiagnostics: true,
            },
        )

        // Assert.
        const correctMetaDiagn = {
            parserVersion: '####',
            mode: 'strict',
            totalErrors: 7,
            totalWarnings: 1,
            totalMessages: 8,
            runStartedAt: '####',
            runFinishedAt: '####',
            durationMs: -1,
            preservesOrder: true,
            orderGuarantee: 'implementation-defined',
            source: {
                sourceType: 'file',
                fileName: '####',
                hasDocumentTerminator: false,
                hasYiniMarker: false,
                lineCount: 23,
                byteSize: -1,
                sha256: '####',
            },
            structure: {
                maxDepth: 3,
                sectionCount: 6,
                memberCount: 8,
                keysParsedCount: null,
                sectionNamePaths: [
                    'App',
                    'App.Database',
                    'App.Database.Logging',
                    'Network',
                    'Server',
                    'Server.Security',
                ],
            },
            metaSchemaVersion: '1.1.1',
            diagnostics: {
                failLevel: {
                    preferredLevel: 'ignore-errors',
                    usedLevelType: '0-Ignore-Errors',
                    usedLevelKey: 'ignore-errors',
                    levelDescription: 'Continue despite errors.',
                },
                errors: {
                    errorCount: 7,
                    payload: [
                        {
                            line: 7,
                            column: 10,
                            typeKey: 'syntax_error',
                            message: 'Syntax error.',
                            advice: "Details: extraneous input '54__32' expecting NL",
                        },
                        {
                            line: 12,
                            column: 15,
                            typeKey: 'syntax_error',
                            message: 'Syntax error.',
                            advice: "Details: extraneous input 'maybe' expecting NL",
                        },
                        {
                            line: 19,
                            column: 8,
                            typeKey: 'syntax_error',
                            message: 'Syntax error.',
                            advice: "Details: extraneous input ':' expecting '='",
                        },
                        {
                            line: 7,
                            column: 3,
                            typeKey: 'syntax_error',
                            message: "Missing value for key 'port'.",
                            advice: "Expected a value after '=' but found none. Implicit nulls are disallowed by 'treatEmptyValueAsNull = disallow'.",
                            hint: "Write 'null' explicitly (port = null) if that is intended, or provide a concrete value.",
                        },
                        {
                            line: 12,
                            column: 5,
                            typeKey: 'syntax_error',
                            message: "Missing value for key 'enabled'.",
                            advice: "Expected a value after '=' but found none. Implicit nulls are disallowed by 'treatEmptyValueAsNull = disallow'.",
                            hint: "Write 'null' explicitly (enabled = null) if that is intended, or provide a concrete value.",
                        },
                        {
                            typeKey: 'syntax_error',
                            message:
                                'Strict mode requires exactly one explicit top-level section.',
                            advice: 'Found 3 explicit top-level sections.',
                            hint: 'Wrap the document in exactly one explicit top-level section and nest any additional sections beneath it.',
                        },
                        {
                            typeKey: 'syntax_error',
                            message: "Missing '/END' at end of document.",
                            advice: "The document terminator '/END' (case-insensitive) is required at the end of the document.",
                            hint: "Add '/END' as the final significant line, or change requireDocTerminator to 'optional' or 'warn-if-missing'.",
                        },
                    ],
                },
                warnings: {
                    warningCount: 1,
                    payload: [
                        {
                            typeKey: 'syntax_warning',
                            message:
                                'Warning: Strict initialMode is not yet fully implemented.',
                            advice: 'Some validation rules may still be missing or incomplete.',
                        },
                    ],
                },
                notices: {
                    noticeCount: 0,
                    payload: [],
                },
                infos: {
                    infoCount: 0,
                    payload: [],
                },
                environment: {
                    NODE_ENV: 'test',
                    APP_ENV: '####',
                    lib: {
                        nodeEnv: 'test',
                        appEnv: '####',
                        flags: {
                            isDev: false,
                            isDebug: false,
                        },
                    },
                },
                effectiveOptions: {
                    effectiveMode: 'strict',
                    failLevel: 'ignore-errors',
                    includeDiagnostics: true,
                    includeMetadata: true,
                    includeTiming: false,
                    onDuplicateKey: 'error',
                    preserveUndefinedInMeta: false,
                    quiet: false,
                    requireDocTerminator: 'required',
                    strictMode: true,
                    treatEmptyValueAsNull: 'disallow',
                },
                options: {
                    failLevel: 'ignore-errors',
                    includeDiagnostics: true,
                    includeMetadata: true,
                    includeTiming: false,
                    onDuplicateKey: 'error',
                    preserveUndefinedInMeta: false,
                    quiet: false,
                    requireDocTerminator: 'required',
                    silent: false,
                    strictMode: true,
                    throwOnError: true,
                    treatEmptyValueAsNull: 'disallow',
                },
            },
        }

        result.meta.parserVersion = '####'
        result.meta.runStartedAt = '####'
        result.meta.runFinishedAt = '####'
        result.meta.durationMs = -1
        result.meta.source.fileName = '####'
        result.meta.source.byteSize = -1
        result.meta.source.sha256 = '####'
        result.meta.diagnostics.environment.APP_ENV = '####'
        result.meta.diagnostics.environment.lib.appEnv = '####'

        expect(toPrettyJSON(result.meta)).toEqual(
            toPrettyJSON(correctMetaDiagn),
        )
    })

    test('F-6.a) Should throw on duplicate section name at level 1.', () => {
        // Arrange.
        const invalidYini = `
            < SubTitle
            theme = "special-dark"
            notifications = ON

            < SubTitle
            theme2 = "special-dark"
        `

        // Act & Assert.
        expect(() => {
            parseUntilError(invalidYini)
        }).toThrow()
    })

    test('F-6.b) Should throw on duplicate section name at level 1 with prior section.', () => {
        // Arrange.
        const invalidYini = `
            < Title
            username = 'tester three'
            isSysOp = NO

            < SubTitle
            theme = "special-dark"
            notifications = ON

            < SubTitle
            theme2 = "special-dark"
        `

        // Act & Assert.
        expect(() => {
            parseUntilError(invalidYini)
        }).toThrow()
    })

    test('F-6.c) Should throw on duplicate section name at level 2.', () => {
        // Arrange.
        const invalidYini = `
            ^ Title
            username = 'tester three'
            isSysOp = NO

                ^^ SubSection
                theme = "special-dark"
                notifications = ON

                ^^ SubSection
                theme2 = "special-dark"
        `

        // Act & Assert.
        expect(() => {
            parseUntilError(invalidYini)
        }).toThrow()
    })

    test('F-6.d) Should pass in strict mode with exactly one top-level section and /END.', () => {
        // Arrange.
        const validYini = `
            ^ App
            name = 'Demo App'
            version = '1.0.0'

                ^^ Server
                host = 'localhost'
                port = 8080

            /END
        `

        const answer = {
            App: {
                name: 'Demo App',
                version: '1.0.0',
                Server: {
                    host: 'localhost',
                    port: 8080,
                },
            },
        }

        // Act.
        const metaResult = parseUntilError(validYini, true, true)

        // Assert.
        expect(toPrettyJSON(metaResult.result)).toEqual(toPrettyJSON(answer))
        expect(metaResult.meta.mode).toEqual('strict')
        expect(metaResult.meta.source.hasDocumentTerminator).toEqual(true)
        expect(metaResult.meta.structure.sectionCount).toEqual(2)
        expect(metaResult.meta.structure.memberCount).toEqual(4)
    })

    test('F-6.e) Should throw in strict mode when /END is missing.', () => {
        // Arrange.
        const invalidYini = `
            ^ App
            name = 'Demo App'
            version = '1.0.0'

                ^^ Server
                host = 'localhost'
                port = 8080
        `

        // Act & Assert.
        expect(() => {
            parseUntilError(invalidYini, true)
        }).toThrow()
    })

    test('F-6.f) Should throw in strict mode when multiple top-level sections exist.', () => {
        // Arrange.
        const invalidYini = `
            ^ App
            name = 'Demo App'

            ^ Logging
            level = 'info'

            /END
        `

        // Act & Assert.
        expect(() => {
            parseUntilError(invalidYini, true)
        }).toThrow()
    })

    test('F-6.g) Should throw in strict mode when top-level members exist outside the single root section.', () => {
        // Arrange.
        const invalidYini = `
            title = 'Loose root member'

            ^ App
            name = 'Demo App'
            version = '1.0.0'

            /END
        `

        // Act & Assert.
        expect(() => {
            parseUntilError(invalidYini, true)
        }).toThrow()
    })

    xtest('F-7) Has default export in CommonJS build.', () => {
        // const hasDefault = testCJS.hasDefaultInCommonJS()
        // expect(hasDefault).toEqual(true)
    })

    xtest('F-8) Does import work in ESM build.', () => {
        execSync('node ./tests/fixtures/test-src-files/esm-smoke.js', {
            stdio: 'inherit',
        })
    })

    test('F-20) Should throw when fail level is warnings-and-errors.', () => {
        // Arrange.
        const failLevel: PreferredFailLevel = 'warnings-and-errors'
        const corruptYini = `
            ^ App
            title = 'MyAppTitle'
            items = 25
            items = 90  // duplicate
            isDarkTheme = true
        `

        // Act & Assert.
        expect(() => {
            YINI.parse(corruptYini, false, failLevel)
        }).toThrow()
    })

    test('F-21) Should succeed when fail level is ignore-errors.', () => {
        // Arrange.
        const failLevel: PreferredFailLevel = 'ignore-errors'
        const corruptYini = `
            ^ App
            title = 'MyAppTitle'
            items = 25
            items = 90  // duplicate
            isDarkTheme = true
        `

        const answer = {
            App: {
                title: 'MyAppTitle',
                items: 25,
                isDarkTheme: true,
            },
        }

        // Act.
        const result = YINI.parse(corruptYini, false, failLevel)

        // Assert.
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
        expect(result.meta).toEqual(undefined)
    })
})
