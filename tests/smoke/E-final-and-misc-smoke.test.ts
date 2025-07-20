/**
 * Final & Miscellaneous/Complementary Smoke Tests.
 *
 * Last round of smoke tests, including any "miscellaneous" / "complementary" cases that does not
 * fit in earlier groups.
 */

import { execSync } from 'child_process'
import path from 'path'
import YINI from '../../src'
import { debugPrint, toPrettyJSON } from '../../src/utils/system'
// @ts-ignore
import * as testCJS from '../fixtures/test-src-files/test-cjs'

/**
 * Final, Miscellaneous & Complementary Smoke Tests.
 */
describe('Final, Miscellaneous & Complementary Smoke Tests:', () => {
    beforeAll(() => {})

    test('1. Parsing inline, in default lenient mode, with correct object.', () => {
        // Arrange.
        const validYini = `^ App
            title = 'My App Title'
            items = 25
            isDarkTheme = true`

        // Act.
        const result = YINI.parse(validYini)
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

    test('2. Parsing inline, and returning with meta data, with correct object.', () => {
        // Arrange.
        const validYini = `
            @yini

            ^ General
            title = 'My Prog Title'
            items = 25
            isDarkTheme = OFF

            ^ Database
            host = 'localhost'
            port = 5432    
        `
        // Act.
        const metaResult = YINI.parse(validYini, false, 'auto', true)
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
        expect(metaResult.meta.strictMode).toEqual(false)
        expect(metaResult.meta.hasTerminal).toEqual(false)
    })

    test('3. Parsing inline in strict mode + has all commenting styles, returning with meta data, should return correct object.', () => {
        // Arrange.
        const validYini = `
            /*
                This is a multi-line block comment.
            */

            @YINI

            ^ App
            name = "Nested Example"
            version = "1.0.0"
            debug = OFF  // False.

                # Database setttings.
                ^^ Database
                host = "db.example.com"
                port = 3306
                user = "appuser"
                --password = "dbpassword"  # Old, save for now.
                //password = "dbpassword"  # Not sure yet about this pw.
                password = "dbpassword"  # Keep this secret.

                    // Commenting with slashes works too.
                    ^^^ Pool
                    min = 2
                    max = 10
                    idleTimeout = 300

                /* Block comment on a single line. */
                ^^ Logging
                level = "info"
                logToFile = ON
                filePath = "./logs/app.log"
            
            /END
        `
        // Act.
        const metaResult = YINI.parse(validYini, true, 'auto', true)
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
                    user: 'appuser',
                    password: 'dbpassword',
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
        expect(metaResult.meta.strictMode).toEqual(true)
        expect(metaResult.meta.hasTerminal).toEqual(true)
    })

    test('4. Parsing inline, but should throw error due to bad use of #.', () => {
        // Arrange.
        const invalidYini = `^ App
            title = 'My App Title'
            items = 25 #This comment is invalid, missing a space!
            isDarkTheme = true`

        // Act & Assert.
        expect(() => {
            YINI.parse(invalidYini)
            debugPrint(invalidYini)
        }).toThrow()
    })

    //@todo
    xtest('5. --todo-- Parsing file with correct object.', () => {
        // TODO
        // expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
    })

    //@todo
    xtest('6. --todo-- Parsing file with correct object.', () => {
        // TODO
        // expect(toPrettyJSON(result)).toEqual(toPrettyJSON(answer))
    })

    test('10. Has Default in CommonJS (from "dist/cjs").', () => {
        const hasDefault = testCJS.hasDefaultInCommonJS()

        expect(hasDefault).toEqual(true)
    })

    // test('11. Does import work in ESM (from "dist/esm").', () => {
    //     execSync('node ./tests/fixtures/test-src-files/esm-smoke.mjs', {
    //         stdio: 'inherit',
    //     })
    // })
    test('11. Does import work in ESM (from "dist/esm")?', () => {
        const scriptPath = path.join(
            __dirname,
            '../fixtures/test-src-files/test-esm.mjs',
        )
        execSync(`node "${scriptPath}"`, { stdio: 'inherit' }) // Will fail test if exit code != 0    })
    })
})
