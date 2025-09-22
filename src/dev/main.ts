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

        const errorYini = `
        ^ Section1
        333="oops"   // invalid key => error
        `

        const warnYini = `
        ^ Section2
        // => warning, if requireDocTerminator: 'warn-if-missing'
        `
        // console.log(
        //     toPrettyJSON(
        YINI.parse(
            `
    ^ Section1
    value =   // invalid in strict mode => error
    `,
            {
                // failLevel: 'errors',
                throwOnError: false,
                // requireDocTerminator: 'warn-if-missing',
                strictMode: true,
                silent: false,
                // includeMetadata: false,
            },
        )
        //     ),
        // )

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

        // const fileName = './tests/fixtures/invalid/corrupt-config-2.yini'
        // const result = YINI.parseFile(fileName, {
        //     strictMode: true,
        //     failLevel: 'ignore-errors',
        // })
        // printObject(result)

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
