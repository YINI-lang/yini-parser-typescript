/*
	https://github.com/YINI-lang/yini-parser-typescript/blob/main/docs/Project-Setup.md
	
	Run the code with the following command:
		npm start
    or
        npm run start:dev
    or
        npm run start:dev:debug
	
	/END
*/

import {
    isDebug,
    isDev,
    isDevEnv,
    isProdEnv,
    isTestEnv,
    localAppEnv,
    localNodeEnv,
} from './config/env'
import { debugPrint, toPrettyJSON } from './utils/print'
import YINI from './YINI'

export const parse = YINI.parse
export const parseFile = YINI.parseFile
export default YINI

debugPrint()
debugPrint('-> Entered index.ts')
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

        const yini = `        @yini
        --@yini
        ^ InvalidHeader // INVALID: Must start with atleast one 1-level section.
        /END
        /END
        `
        console.log(
            toPrettyJSON(
                YINI.parse(yini, {
                    strictMode: false,
                    bailSensitivity: 1,
                    includeMetaData: true,
                    isRequireDocTerminator: false,
                }),
            ),
        )

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
        // console.log(
        //     toPrettyJSON(
        //         YINI.parseFileWithOptions('comprehensive-example.yini', {
        //             strictMode: false,
        //             bailSensitivity: 'auto',
        //             includeMetaData: true,
        //         }),
        //     ),
        // )

        // const fileName = './tests/fixtures/valid/common/common-config-2.yini'
        // YINI.parseFileWithOptions(fileName, {
        //     strictMode: false,
        //     bailSensitivity: 'auto',
        //     includeMetaData: true,
        // })
    }
}
