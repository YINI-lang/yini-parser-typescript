/**
 * Final & Miscellaneous/Complementary Smoke Tests.
 *
 * Last round of smoke tests, including any "miscellaneous" / "complementary" cases that does not
 * fit in earlier groups.
 */

import { execSync } from 'child_process'
import path from 'path'
import YINI, { PreferredFailLevel } from '../../src'
import { debugPrint, toPrettyJSON } from '../../src/utils/print'
import correctAnswerA from '../fixtures/smoke-fixtures/a-corporate-saas-platform.smoke.json'
import correctAnswerB from '../fixtures/smoke-fixtures/b-high-security-distributed-control-system.smoke.json'
import { parseUntilError } from '../test-helpers'

const IS_LOCAL_DEBUG = false

const DIR_OF_FIXTURES = '../fixtures/smoke-fixtures'

// @ts-ignore
// import * as testCJS from '../fixtures/test-src-files/test-cjs'

/**
 * Final, Miscellaneous & Complementary Smoke Tests.
 */
describe('Final, Miscellaneous & Complementary Smoke Tests:', () => {
    // Dir with smoke fixtures.
    const baseDir = path.join(__dirname, DIR_OF_FIXTURES)

    beforeAll(() => {})

    test('F-1.a) Parsing inline, in default lenient mode, with correct object.', () => {
        // Arrange.
        const validYini = `^ App
            title = 'My App Title'
            items = 25
            isDarkTheme = true`

        // Act.
        const result = parseUntilError(validYini)
        debugPrint(result)

        // Assert.
        const answer = {
            App: {
                title: 'My App Title',
                items: 25,
                isDarkTheme: true,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
        expect(result.meta).toEqual(undefined)
    })

    test('F-1.b) Parsing inline, in default lenient mode, with correct object.', () => {
        // Arrange.
        const validYini = `^ App
            title = 'My App Title'
            items = 25
            isDarkTheme = true
            /END`

        // Act.
        const metaResult = parseUntilError(validYini, true, true)
        debugPrint(metaResult)

        // Assert.
        const answer = {
            App: {
                title: 'My App Title',
                items: 25,
                isDarkTheme: true,
            },
        }
        expect(toPrettyJSON(metaResult.result)).toEqual(toPrettyJSON(answer))
        expect(metaResult.meta.mode).toEqual('strict')
        expect(metaResult.meta.source.hasDocumentTerminator).toEqual(true)
        expect(metaResult.meta.source.hasYiniMarker).toEqual(false)
        expect(metaResult.meta.source.lineCount).toEqual(5)
        expect(metaResult.meta.structure.sectionCount).toEqual(1)
        expect(metaResult.meta.structure.memberCount).toEqual(3)
    })

    test('F-2. Parsing inline, and returning with metadata, with correct object.', () => {
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
        // Act.
        const metaResult = parseUntilError(validYini, false, true)
        debugPrint(metaResult)

        // Assert.
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
        expect(toPrettyJSON(metaResult.result)).toEqual(toPrettyJSON(answer))
        expect(metaResult.meta.mode).toEqual('lenient')
        expect(metaResult.meta.source.hasDocumentTerminator).toEqual(false)
        expect(metaResult.meta.source.hasYiniMarker).toEqual(false)
        expect(metaResult.meta.source.lineCount).toEqual(11)
        expect(metaResult.meta.structure.sectionCount).toEqual(2)
        expect(metaResult.meta.structure.memberCount).toEqual(5)
    })

    test('F-3. Parsing inline in strict mode + has all commenting styles, returning with metadata, should return correct object.', () => {
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
        // Act.
        const metaResult = parseUntilError(validYini, true, true)
        debugPrint(metaResult)

        // Assert.
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
        expect(toPrettyJSON(metaResult.result)).toEqual(toPrettyJSON(answer))
        expect(metaResult.meta.mode).toEqual('strict')
        expect(metaResult.meta.source.hasDocumentTerminator).toEqual(true)
        expect(metaResult.meta.source.hasYiniMarker).toEqual(true)
        expect(metaResult.meta.source.lineCount).toEqual(36)
        expect(metaResult.meta.structure.sectionCount).toEqual(4)
        expect(metaResult.meta.structure.memberCount).toEqual(14)
    })

    test('F-4. Parsing inline, but should throw error due to bad use of #.', () => {
        // Arrange.
        const invalidYini = `^ App
            title = 'My App Title'
            items = 25 #This comment is invalid, missing a space!
            isDarkTheme = true`

        // Act & Assert.
        expect(() => {
            parseUntilError(invalidYini)
            debugPrint(invalidYini)
        }).toThrow()
    })

    test('F-5.a) Parse & match YINI against JSON: a-corporate-saas-platform.', () => {
        // Arrange.
        const fileName = 'a-corporate-saas-platform.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const resultA = YINI.parseFile(fullPath)
        IS_LOCAL_DEBUG && console.log('fullPath = ' + fullPath)
        IS_LOCAL_DEBUG && console.log('resultA:')
        IS_LOCAL_DEBUG && console.log(toPrettyJSON(resultA))

        // Assert.
        expect(toPrettyJSON(resultA)).not.toEqual(toPrettyJSON(correctAnswerB))
        expect(toPrettyJSON(resultA)).toEqual(toPrettyJSON(correctAnswerA))
    })

    test('F-5.b) Parse & match YINI against JSON (strict): a-corporate-saas-platform.', () => {
        // Arrange.
        const fileName = 'a-corporate-saas-platform.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const resultA = YINI.parseFile(fullPath, { strictMode: true })
        IS_LOCAL_DEBUG && console.log('fullPath = ' + fullPath)
        IS_LOCAL_DEBUG && console.log('resultA:')
        IS_LOCAL_DEBUG && console.log(toPrettyJSON(resultA))

        // Assert.
        expect(toPrettyJSON(resultA)).not.toEqual(toPrettyJSON(correctAnswerB))
        expect(toPrettyJSON(resultA)).toEqual(toPrettyJSON(correctAnswerA))
    })

    test('F-5.c) Parse & match YINI against JSON (strict+meta): a-corporate-saas-platform.', () => {
        // Arrange.
        const fileName = 'a-corporate-saas-platform.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const resultA = YINI.parseFile(fullPath, {
            strictMode: true,
            includeMetadata: true,
        })
        IS_LOCAL_DEBUG && console.log('fullPath = ' + fullPath)
        IS_LOCAL_DEBUG && console.log('resultA:')
        IS_LOCAL_DEBUG && console.log(toPrettyJSON(resultA))

        // Assert.
        expect(toPrettyJSON(resultA)).not.toEqual(toPrettyJSON(correctAnswerB))
        expect(toPrettyJSON(resultA)).not.toEqual(toPrettyJSON(correctAnswerA))

        expect(resultA.meta.source.lineCount).toEqual(128)
        expect(toPrettyJSON(resultA.result)).toEqual(
            toPrettyJSON(correctAnswerA),
        )
    })

    test('F-5.d) Parse & check YINI returns metadata: a-corporate-saas-platform.', () => {
        // Arrange.
        const fileName = 'a-corporate-saas-platform.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const resultA = YINI.parseFile(fullPath, {
            strictMode: true,
            includeMetadata: true,
        })
        IS_LOCAL_DEBUG && console.log('fullPath = ' + fullPath)
        IS_LOCAL_DEBUG && console.log('resultA:')
        IS_LOCAL_DEBUG && console.log(toPrettyJSON(resultA))

        // Assert.
        expect(resultA.meta.mode).toEqual('strict')
        expect(resultA.meta.totalErrors).toEqual(0)
        expect(resultA.meta.preservesOrder).toEqual(true)
        expect(resultA.meta.source).not.toEqual(undefined)
        expect(resultA.meta.structure).not.toEqual(undefined)
        expect(resultA.meta.metaSchemaVersion).toEqual('1.1.1')
    })

    test('F-6.a) Parse & match YINI against JSON: b-high-security-distributed-control-system.', () => {
        // Arrange.
        const fileName = 'b-high-security-distributed-control-system.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const resultB = YINI.parseFile(fullPath)
        IS_LOCAL_DEBUG && console.log('fullPath = ' + fullPath)
        IS_LOCAL_DEBUG && console.log('resultB:')
        IS_LOCAL_DEBUG && console.log(toPrettyJSON(resultB))

        // Assert.
        expect(toPrettyJSON(resultB)).not.toEqual(toPrettyJSON(correctAnswerA))
        expect(toPrettyJSON(resultB)).toEqual(toPrettyJSON(correctAnswerB))
    })

    test('F-6.b) Parse & match YINI against JSON (strict): b-high-security-distributed-control-system.', () => {
        // Arrange.
        const fileName = 'b-high-security-distributed-control-system.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const resultB = YINI.parseFile(fullPath, { strictMode: true })
        IS_LOCAL_DEBUG && console.log('fullPath = ' + fullPath)
        IS_LOCAL_DEBUG && console.log('resultB:')
        IS_LOCAL_DEBUG && console.log(toPrettyJSON(resultB))

        // Assert.
        expect(toPrettyJSON(resultB)).not.toEqual(toPrettyJSON(correctAnswerA))
        expect(toPrettyJSON(resultB)).toEqual(toPrettyJSON(correctAnswerB))
    })

    test('F-6.c) Parse & match YINI against JSON (strict+meta): b-high-security-distributed-control-system.', () => {
        // Arrange.
        const fileName = 'b-high-security-distributed-control-system.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const resultB = YINI.parseFile(fullPath, {
            strictMode: true,
            includeMetadata: true,
        })
        IS_LOCAL_DEBUG && console.log('fullPath = ' + fullPath)
        IS_LOCAL_DEBUG && console.log('resultB:')
        IS_LOCAL_DEBUG && console.log(toPrettyJSON(resultB))

        // Assert.
        expect(toPrettyJSON(resultB)).not.toEqual(toPrettyJSON(correctAnswerA))
        expect(toPrettyJSON(resultB)).not.toEqual(toPrettyJSON(correctAnswerB))

        expect(resultB.meta.source.lineCount).toEqual(222)
        expect(toPrettyJSON(resultB.result)).toEqual(
            toPrettyJSON(correctAnswerB),
        )
    })

    test('F-6.d) Parse & check YINI returns metadata: b-high-security-distributed-control-system.', () => {
        // Arrange.
        const fileName = 'b-high-security-distributed-control-system.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const resultB = YINI.parseFile(fullPath, {
            strictMode: true,
            includeMetadata: true,
        })
        IS_LOCAL_DEBUG && console.log('fullPath = ' + fullPath)
        IS_LOCAL_DEBUG && console.log('resultB:')
        IS_LOCAL_DEBUG && console.log(toPrettyJSON(resultB))

        // Assert.
        expect(resultB.meta.mode).toEqual('strict')
        expect(resultB.meta.totalErrors).toEqual(0)
        expect(resultB.meta.preservesOrder).toEqual(true)
        expect(resultB.meta.source).not.toEqual(undefined)
        expect(resultB.meta.structure).not.toEqual(undefined)
        expect(resultB.meta.metaSchemaVersion).toEqual('1.1.1')
    })

    test('F-7. Parse & match YINI metadata with JS-object: b-high-security-distributed-control-system.', () => {
        // Arrange.
        const fileName = 'b-high-security-distributed-control-system.smoke.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const resultB = YINI.parseFile(fullPath, {
            strictMode: true,
            includeMetadata: true,
            includeDiagnostics: false,
        })
        IS_LOCAL_DEBUG && console.log('fullPath = ' + fullPath)
        IS_LOCAL_DEBUG && console.log('resultB:')
        IS_LOCAL_DEBUG && console.log(toPrettyJSON(resultB))

        // Assert.
        const correctMetaB = {
            parserVersion: '####',
            mode: 'strict',
            totalErrors: 0,
            totalWarnings: 1,
            totalMessages: 1,
            runStartedAt: '####',
            runFinishedAt: '####',
            durationMs: -1,
            preservesOrder: true,
            orderGuarantee: 'implementation-defined',
            source: {
                sourceType: 'file',
                fileName: '####',
                hasDocumentTerminator: false,
                hasYiniMarker: true,
                lineCount: 222,
                byteSize: -1,
                sha256: '####',
            },
            structure: {
                maxDepth: 4,
                sectionCount: 22,
                memberCount: 68,
                keysParsedCount: null,
                sectionNamePaths: [
                    'App',
                    'App.Features',
                    'App.Limits',
                    'App.Database',
                    'App.Database.Credentials',
                    'App.API',
                    'App.API.Auth',
                    'App.API.Auth.Clients',
                    'Logging',
                    'Logging.File',
                    'Logging.Metrics',
                    'Services',
                    'Services.Email',
                    'Services.Email.Credentials',
                    'Services.Cache',
                    'Services.Cache.Cluster',
                    'Services.Cache.Failover',
                    'Observability',
                    'Observability.Exporters',
                    'Security',
                    'Security.Policies',
                    'Security.Policies.Lockout',
                ],
            },
            metaSchemaVersion: '1.1.1',
        }
        resultB.meta.parserVersion = '####'
        resultB.meta.runStartedAt = '####'
        resultB.meta.runFinishedAt = '####'
        resultB.meta.durationMs = -1
        resultB.meta.source.fileName = '####'
        resultB.meta.source.byteSize = -1
        resultB.meta.source.sha256 = '####'
        expect(toPrettyJSON(resultB.meta)).toEqual(toPrettyJSON(correctMetaB))
    })

    test('F-8. Check defect YINI produces diagnostics metadata given proper parse options.', () => {
        // Arrange.
        const fileName = '../invalid/defectConfig2Combo3.yini'
        const fullPath = path.join(baseDir, fileName)

        // Act.
        const result = YINI.parseFile(fullPath, {
            strictMode: true,
            failLevel: 'ignore-errors',
            includeMetadata: true,
            includeDiagnostics: true,
        })
        IS_LOCAL_DEBUG && console.log('fullPath = ' + fullPath)
        IS_LOCAL_DEBUG && console.log('resultB:')
        IS_LOCAL_DEBUG && console.log(toPrettyJSON(result))

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
                            column: 11,
                            typeKey: 'syntax_error',
                            message: 'Syntax error',
                            advice: "Details: extraneous input '54_32' expecting {NL, INLINE_COMMENT}",
                        },
                        {
                            line: 12,
                            column: 16,
                            typeKey: 'syntax_error',
                            message: 'Syntax error',
                            advice: "Details: extraneous input 'maybe' expecting {NL, INLINE_COMMENT}",
                        },
                        {
                            line: 19,
                            column: 4,
                            typeKey: 'syntax_error',
                            message: 'Syntax error',
                            advice: "Details: extraneous input '=' expecting {'[', '{', BOOLEAN_FALSE, BOOLEAN_TRUE, NULL, '{}', '[]', NUMBER, STRING, NL, WS, INLINE_COMMENT}",
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
                            line: 7,
                            column: 3,
                            typeKey: 'syntax_error',
                            message: 'Invalid value',
                            advice: "Invalid value for key 'port in member (<key> = <value> pair)'.",
                            hint: "Got 'undefined', but expected a valid value/literal (string, number, boolean, null, list, or object). Optionally with a single leading minus sign '-'.",
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
                            line: 12,
                            column: 5,
                            typeKey: 'syntax_error',
                            message: 'Invalid value',
                            advice: "Invalid value for key 'enabled in member (<key> = <value> pair)'.",
                            hint: "Got 'undefined', but expected a valid value/literal (string, number, boolean, null, list, or object). Optionally with a single leading minus sign '-'.",
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
                    requireDocTerminator: 'optional',
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
                    requireDocTerminator: 'optional',
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

    test('F-9.a. Should throw error if using existing section name at level 1.', () => {
        // Arrange.
        const invalidYini = `
            < SubTitle
            theme = "special-dark"
            notifications = ON

            < SubTitle // NOT OK, SubTitle already exists
            theme2 = "special-dark"
        `

        // Act & Assert.
        expect(() => {
            parseUntilError(invalidYini)
            debugPrint(invalidYini)
        }).toThrow()
    })

    test('F-9.b. Should throw error if using existing section name at level 1.', () => {
        // Arrange.
        const invalidYini = `
            < Title
            username = 'tester three'
            isSysOp = NO

            < SubTitle
            theme = "special-dark"
            notifications = ON

            < SubTitle // NOT OK, SubTitle already exists
            theme2 = "special-dark"
        `

        // Act & Assert.
        expect(() => {
            parseUntilError(invalidYini)
            debugPrint(invalidYini)
        }).toThrow()
    })

    test('F-9.c. Should throw error if using existing section name at level 2.', () => {
        // Arrange.
        const invalidYini = `
            ^ Title
            username = 'tester three'
            isSysOp = NO

                ^^  SubSection
                theme = "special-dark"
                notifications = ON

                ^^ SubSection // NOT OK, SubSection already exists
                theme2 = "special-dark"
        `

        // Act & Assert.
        expect(() => {
            parseUntilError(invalidYini)
            debugPrint(invalidYini)
        }).toThrow()
    })

    // Skipping dual build for cjs and esm for now
    xtest('F-10. Has Default in CommonJS (in "dist/").', () => {
        // const hasDefault = testCJS.hasDefaultInCommonJS()
        // expect(hasDefault).toEqual(true)
    })

    // Skipping dual build for cjs and esm for now
    xtest('F-11. Does import work in ESM (from "dist/esm").', () => {
        execSync('node ./tests/fixtures/test-src-files/esm-smoke.js', {
            stdio: 'inherit',
        })
    })

    test('F-20. Should throw parsing a corrupt Yini with bailSensitivity 2 = "Abort-Even-on-Warnings".', () => {
        // Arrange.
        const failLevel: PreferredFailLevel = 'warnings-and-errors'
        const corruptYini = `
            ^ App
            title = 'MyAppTitle'
            items = 25
            items = 90  // (!) Redefinition!
            isDarkTheme = true
        `

        // Act & Assert.
        expect(() => {
            const result = YINI.parse(corruptYini, false, failLevel)
            debugPrint(corruptYini)
        }).toThrow()
    })

    test('F-21. Should succeed parsing a corrupt Yini with bailSensitivity 0 = "Ignore-Errors".', () => {
        // Arrange.
        const failLevel: PreferredFailLevel = 'ignore-errors'
        const corruptYini = `
            ^ App
            title = 'MyAppTitle'
            items = 25
            items = 90  // (!) Redefinition!
            isDarkTheme = true
        `

        // Act.
        const result = YINI.parse(corruptYini, false, failLevel)
        debugPrint(result)

        // Assert.
        const answer = {
            App: {
                title: 'MyAppTitle',
                items: 25,
                isDarkTheme: true,
            },
        }
        expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
        expect(result.meta).toEqual(undefined)
    })
})
