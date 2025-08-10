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

        const yini = `
^ BinNumbers
hex1 = -#10
hex2 = +0x10
hex3 = -0X10
bin = 0b1010
            oct1 = -0o0                     // Zero
            oct2 = +0o0                     // Zero
            oct3 = -0o177                    // Max signed 8-bit)
            oct4 = +0o377                    // Max unsigned 8-bit)
            oct5 = -0o17777777777            // Max signed 32-bit)
            oct6 = +0o1777777777777777777777 // Max unsigned 64-bit)
                `

        console.log(toPrettyJSON(YINI.parse(yini, false)))

        // console.log(
        //     toPrettyJSON(YINI.parseFile('comprehensive-example.yini', true)),
        // )

        // const fileName = './tests/fixtures/valid/common/common-config-2.yini'
        // YINI.parseFile(fileName, false)

        //         parseUntilError(`
        // ^ Section1
        //             ^^ Section2
        //             ^^^ Section3
        //             ^^^^ Section4  // Level 4.
        //             ^^^^^ Section5
        //             ^^^^^^ Section6
        //             ^^^^^^^ Section7
        //             strVar = "These section header are valid!"
        //     `)
    }
}
