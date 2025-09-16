/*
 * This includes of dev / debug / demo / custom-tesing code.
 *
 * https://github.com/YINI-lang/yini-parser-typescript/blob/main/docs/Project-Setup.md
 *
 * Run this code with the following commands:
 *     npm run start:dev
 * or
 *     npm run start:dev:debug
 */

import {
    isDebug,
    isDev,
    isDevEnv,
    isProdEnv,
    isTestEnv,
    localAppEnv,
    localNodeEnv,
} from '../config/env'
import {
    getDefaultUserOptions,
    TNormalizedUserOptions,
} from '../core/options/defaultParserOptions'
import { toCoreOptions } from '../core/options/optionsFunctions'
import {
    matchModeFromCoreOptions,
    matchModeFromParseOptions,
} from '../core/parsingRules/modeFromRulesMatcher'
import { debugPrint, printObject, toPrettyJSON } from '../utils/print'
import YINI from '../YINI'

debugPrint()
debugPrint('-> Entered dev/main.ts')
debugPrint()

if (isDev() || isDebug()) {
    console.log(`process.env?.NODE_ENV = '${process.env?.NODE_ENV}'`)
    console.log(`process.env?.APP_ENV  = '${process.env?.APP_ENV}'`)
    console.log(`process.env?.IS_DEBUG = '${process.env?.IS_DEBUG}'`)

    debugPrint()
    console.log(`localNodeEnv = '${localNodeEnv}'`)
    console.log(` localAppEnv = '${localAppEnv}'`)
    console.log(' isProdEnv() = ' + isProdEnv())
    console.log('  isDevEnv() = ' + isDevEnv())
    console.log(' isTestEnv() = ' + isTestEnv())
    console.log()
    console.log('     isDev() = ' + isDev())
    console.log('   isDebug() = ' + isDebug())
    console.log()
}

const debugTestObj = {
    name: 'e_test',
    lang: 'TypeScript',
}
debugPrint('debugTestObj:')
debugPrint(debugTestObj)
debugPrint()

if (isProdEnv()) {
    // Do nothing, and exit.
} else {
    if (localAppEnv === 'local' && localNodeEnv !== 'test') {
        // parseUntilError(`^1 SectionName`, false, 2)
        //         const validYini = `
        // < user
        // username = 'tester two'
        // isSysOp = YES
        //     << prefs
        //     theme = "light"
        //     notifications = OFF
        // ^1 user2
        // ^2 prefs
        // ^3 deepSection
        // ^4 deeperSection
        // key = "Level 4 section"
        // ^5 yetDeeperSection
        // key = "Level 5 section"
        // item = 77
        // <1 user3
        // username = 'tester three'
        // isSysOp = NO
        //     <<2 prefs
        //     theme = "special-dark"
        //     notifications = ON
        // `
        //         // Act.
        //         const result = parseUntilError(validYini)
        //         debugPrint(result)
        // const validYini = `^ App
        //     id = 32403  # The correct app id.
        //     title = "My Program"
        // `
        /*
        const yini = `
        @yini

        ^ NumberFormats

          ^^ HexFormat              // Hexadecimal (base-16)
             hex    = #FF0066       // Default notation
             altHex = 0xFF0066      // Alternative notation
          ^^ BinFormat              // Binary (base-2)
             bin    = %10101111     // Default notation
             altBin = 0b10101111    // Alternative notation
          ^^ OctFormat              // Octal (base-8)
             oct    = 0o755         // ( = decimal 493)
          ^^ DozFormat              // Duodecimal (base-12)
             doz    = 0z10XE        // Default notation:     X=10, E=11
             altDoz = 0z10AB        // Alternative notation: A=10, B=11
        ` // End.
        */
        /*
        const yini = `
    @yini    
    @YINI   ///dfsf

    < User
    nullKey = 
    nullKey2 = NULL
    username = 'tester two'
    userId   = 234
    userColor = #ffaa99
    userPerm = 0O733
    userFearues = %01101
    isSysOp = YES

    map = { 
        a: 3,
        b: 4,
        cc: 5,
        \`d d\`: 3453
        }

    listValueB: 3, 4, 5
    listValue2 = ["a", "b"]
    listValue3 = [434]
    listValue4 = []
    listValue5 = [1, ["a", "b", "c", [null, TRUE]], 3]
    
    --listObject = { a: 1, b: 2}
    
    colonList:
        1,
        2,
        3,

        << Prefs
        theme = "light"
        notifications = OFF
        nullValue = NULL

    ^1 User2
    ^2 PrefsOfUser2
    ^3 DeepSection
    ^4 DeeperSection
    key = "Level 4 section"
    ^5 YetDeeperSection
    key = "Level 5 section"
    item = 77

    <1 User3
    username = 'tester three'
    isSysOp = NO

        <2 Prefs2
        theme = "special-dark"
        notifications = ON

        <2 Special
        value = 123
        `
*/
        // npm run start:dev
        // "timing": {
        //     "totalMs": 158.421,
        //     "phase1Ms": 151.36,
        //     "phase2Ms": 6.92,
        //     "phase3Ms": 0.14
        // }
        //console.log(toPrettyJSON(YINI.parse(yini, false, 'auto', true)))
        // const yini = `
        //     < SubTitle
        //     theme = "special-dark"
        //     notifications = ON
        //     < SubTitle // NOT OK, SubTitle already exists
        //     theme2 = "special-dark"
        //         `
        // Arrange.
        /*
        const yini = `
        @yini
        // Example: Strict-friendly YINI document (no trailing commas, explicit /END)

        ^ App
        name = 'YINI Demo Service'
        version = '1.4.0'
        description = 'Demo service for showcasing the YINI format'
        owners = ['dev-team', 'ops-team']

        // String concatenation (the '+' joins adjacent STRING tokens)
--        longNote = 'This text is split across ' +
--                    'two strings and then concatenated.'

        // Case-insensitive booleans
        enabled = YES
        experimentalMode = off

        // Numbers (ints, floats, scientific)
        retries = 3
        requestTimeoutMs = 2500
        backoffFactor = 1.25
        maxPayloadMB = 1.0e2

        ^ Server
        host = '127.0.0.1'
        port = 8080
        useTLS = false

        ^^ CORS
            allowedOrigins: 'https://example.com', 'https://admin.example.com'
            allowCredentials = true

        ^^ Headers
            // Object literal with key:value pairs
            defaults = {
            \`X-Frame-Options\`: 'DENY',
            \`X-Content-Type-Options\`: 'nosniff'
            }

        ^ Database
        engine = 'postgres'
        host = 'db.internal'
        port = 5432
        username = 'app_user'
        password = 'change_me'
        pool = {
            min: 2,
            max: 16
        }

        ^^ Replicas
            // Colon-form list (values only)
            endpoints: 'db-replica-1.internal', 'db-replica-2.internal'
            readPreference = 'nearest'

        ^ Features
        // Mixed data types
        betaFlags = ['new-ui', 'fast-path']
        darkLaunch = NO
        uploadLimitMB = 128

        ^ Integrations
        // List of objects
        webhooks = [
            { name: 'audit', url: 'https://hooks.example.com/audit',  active: true },
            { name: 'metrics', url: 'https://hooks.example.com/metric', active: true }
        ]

        ^ Users
        // Simple table-ish list using colon form
        admins: 'alice', 'bob', 'carol'
        reviewers: 'dave', 'erin'

        ^^ Profiles
            // Object-of-objects
            alice = {
            email: 'alice@example.com',
            roles: ['admin', 'dev'],
            mfa: true
            }
            bob = {
            email: 'bob@example.com',
            roles: ['admin'],
            mfa: false
            }

        ^ Paths
        logs = '/var/log/yini-demo/'
        data = '/srv/yini-demo/data'

        ^^ \`Backups\`
            // Empty value -> null in lenient mode; in strict mode, supply explicit null:
            lastFull = null
            targets: '/mnt/backup1', '/mnt/backup2'
        ^^^ Backups2
            value = 23

        ^ Security
        allowedIPs: '10.0.0.0/24', '10.1.0.0/24'

        ^ Logging
        level = 'info'
        format = 'json'
        sinks = ['stdout']

        /END      
        `*/
        // const yini = `
        //     /*sdfsdf*/
        //     @yini
        //     @include 'sdf'
        //     --@invalid
        //     @deprecated
        //     ^ window
        //     --^^ window2
        //     title = 'Sample Window'  // Strings can be enclosed in either ' or ".
        //     @deprecated
        //     id = 'window_main'
        //     // @bla
        //     --@include 'wrongplace'
        //     --@yini   // This is an error should be catched in the parser.
        //     /end
        // `
        // YINI.setTabSize(2)
        // debugPrint('tab size = ' + YINI.getTabSize())
        // const yini = `        @yini
        // --@yini
        // ^ Header // INVALID: Must start with atleast one 1-level section.
        // key = 33254
        // /END
        // --/END
        // `
        // console.log(
        //     toPrettyJSON(
        //         YINI.parse(yini, {
        //             strictMode: false,
        //             failLevel: 'errors',
        //             includeMetadata: false,
        //             requireDocTerminator: 'optional',
        //         }),
        //     ),
        // )

        //         const yini = `
        // ^ Booleans
        // bool1 = true
        // bool2 = false
        // bool3 = on
        // bool4 = off
        // bool5 = yes
        // bool6 = no
        //         `
        //         console.log(
        //             toPrettyJSON(
        //                 YINI.parse(yini, {
        //                     strictMode: true,
        //                     failLevel: 'auto',
        //                     includeMetadata: false,
        //                     requireDocTerminator: 'optional',
        //                 }),
        //             ),
        //         )

        // console.log(
        //     toPrettyJSON(
        //         YINI.parseFile(
        //             'comprehensive-example.yini',
        //             false,
        //             'auto',
        //             true,
        //         ),
        //     ),
        // )

        // const result: YiniParseResult = YINI.parseFile(
        //     'comprehensive-example.yini',
        //     { includeMetadata: true },
        // )
        // console.log(toPrettyJSON('' + result.meta))

        // console.log(
        //     toPrettyJSON(
        //         YINI.parseFile('comprehensive-example.yini', {
        //             strictMode: false,
        //             failLevel: 'auto',
        //             includeMetadata: true,
        //         }),
        //     ),
        // )
        const fileName = './tests/fixtures/valid/common/common-config-2.yini'
        const result = YINI.parseFile(fileName, {
            strictMode: true,
            treatEmptyValueAsNull: 'allow',
            failLevel: 'auto',
            includeMetadata: true,
            includeDiagnostics: true,
        })
        printObject(result)

        // let parserOptions: any = getDefaultUserOptions('lenient')
        // debugPrint('** parserOptions: (lenient)')
        // isDebug() && printObject(parserOptions)
        // isDebug() &&
        //     console.log(
        //         'derived mode = ' + matchModeFromParseOptions(parserOptions),
        //     )

        // parserOptions = getDefaultUserOptions('strict')
        // debugPrint('** parserOptions: (strict)')
        // isDebug() && printObject(parserOptions)
        // isDebug() &&
        //     console.log(
        //         'derived mode = ' +
        //             matchModeFromCoreOptions(toCoreOptions(parserOptions)),
        //     )

        // const fileName =
        //     './tests/fixtures/invalid/bad-user-profile-config-2.yini'
        // YINI.parseFile(fileName, {
        //     strictMode: false,
        //     failLevel: 'auto',
        //     includeMetadata: true,
        // })
    }
}
