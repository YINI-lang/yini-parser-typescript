// import { isDebug&&console.log } from './utils/general'

/*
	https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c
	
	Run the code with the following command:
		npx ts-node index
	or
		npm start
	
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

// export { default } from './YINI'
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
    const invalidInput1 = `
^ Settings
fruit = "Pear"
number = 5
value q= "something"
`

    const invalidInput2 = `
^ 	Config
varAge = 30
varName = abcd
varNull = NULL
`

    const input1 = `
^ 	SectionName
varBool = true
varBool2 = off
varInt = 30
varFloat = 12.34
varStr = "Alice"
listItems = ["a", "b", "c"]
varE1 = 1e4
varE2 = 1.23e4
varE3 = 6.5E23
/END
`

    const input2 = `
^ 	Config
varAge = 30
varName = "Alice"
varNull = NULL
listItems = ["a", "b", "c"]
	^^Extra
	isExtra = true
/END
`

    // const input = `
    // # 	Config`;

    // debugPrint('input2:')
    // if (isDebug()) {
    //     console.debug(input2)
    // }
    // parseUntilError(input2)

    // debugPrint('invalidInput1:')
    // if (isDebug()) {
    //     console.debug(invalidInput1)
    // }
    // parseUntilError(invalidInput1)

    if (localAppEnv === 'local' && localNodeEnv !== 'test') {
        /*
		parseUntilError(`
--^ Section0
	--value = 0
^ Section1
	value = 1

^^ Section11
	value = 11

 	^^^ Section111
	 value = 111
//^^^^ Section2104
	value = 24

^ Section2
	value = 2
`)
    }
*/
        // parseUntilError(`number = 42`)
        /*
Expected JS output:
{ 
  Section1: { value: 1, Section2: { value: 11 }},
  Section2: { value: 2 }
}

*/

        /*
        parseUntilError(
            `
// Using numeric shorthand section markers.

@yini

// This whole line is a comment.
            ^SectionName# This part is a comment.
            // This whole line is a comment.
            --x=1
                `,
            false,
            2,
        )
*/

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

        //         const yini = ` // corrupt yini
        // ^ Section
        // = "missing_key_name"  // In strict should throw error, while lenient should pass
        //         `
        const yini = `
/*
    Example: Local Image Processing Tool Configuration
*/

^ General
outputDir = "./results"
overwrite = false

    ^^ Watermark
    enabled = true
    text = "Sample"
    opacity = 0.3

^ Filters
enabled = true

    ^^ Blur
    radius = 2

    ^^ Sharpen
    amount = 1.2

    ^^ Custom
    script = "./filters/custom-filter.js"
            `

        // YINI.parse(yini, false)
        console.log(toPrettyJSON(YINI.parse(yini, false)))

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
