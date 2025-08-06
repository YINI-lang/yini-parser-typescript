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
#!/usr/bin/env yini

/*
    A comprehensive YINI example that exercises as
    many syntax features, section header styles, data
    types, and comment types as possible.
*/

/*
 * Optional directive variants (use only one "@yini" per file)
 */
//@yini
//@Yini
//@YINI

/*
    Example of a YINI document - all features showcased.
*/

// Block comments (as above) and inline double-slash comments.
; Semicolon full-line comment (must be at start of line).
# Hash comment with space after hash.
#   Hash comment with tabs and spaces after hash.
-- Disabled line, appears dim/ghosted.
--env = "dev"  // Disabled assignment (should be ignored).
// Double-slash comment

^ Section                  // Basic section header
Enabled = true
customName = 'MyService'
count = 42
count2 = -1
count3 = 0
float = 0.42
--float2 = -0.123
--float3 = 0.0
--float4 = 0.00
--float5 = 321.0001
--float6 = -99.0099
--exp = 0.99e3
--exp2 = -0.30e2
hexValue = 0xDEADBEEF
hexAlt = #FFEEAA
flag = ON     // Boolean alternative literal
debug = off   // Lowercase boolean

rawString = "This is a\\n**raw**\\nstring, it's as-is, no escapes are interpreted"
rawStringWithSingleQuote = 'This is a "raw" string, it is as-is, no escapes are interpreted'

// Triple quoted string, are multi-line. 
// (!) NOTE: Only enclosed in double quotes supported!
doc1 = """Raw triple-quoted
string with \\n not interpreted
and line breaks kept."""

doc2 = C"""Classic triple-quoted
string: newlines and escapes like \\n
are interpreted."""

    ^^ Cache             // Nested section with classic marker
    type = "redis"
    TTL = 3600
    enabled = FALSE
    list = [1, 2, 3, "str", true, null]

        ^^^ Options      // Third-level section
        host = '127.0.0.1'
        port = 6379
        _meta = { id: 1, name: "Main", tags: {a: 3, b: 2, c: 1} }
        _meta2 = [ 'style', ['Volvo', 'Doc', 'Cat'] ]
        _meta3 = [ 'font', 42, 'UI', [55, 44, 33], "default", 'description of' ]
        _meta4 = [
            {role: "admin", value: 1},
            {role: "user", value: 2},
            {role: "guest", value: 0}
        ]

^ Env                    // New top-level section
code = "dev"
mode = ON
pi = 3.14159
list_empty = []
object_empty = {}

; Shorthand numeric section marker headers.
^1 Database    # Section header using numeric shorthand (^1)
enabled = true
user = "root"
password = 'secret'
roles = ["admin", "user", "guest"]
timeout = null

    ^2 Cache    # Sub-section using numeric shorthand (^2)
    type = "memcached"
    TTL = 1800

        ^3 Options      # Third-level sub-section with numeric marker
        host = "192.168.1.1"
        port = 11211

< AlternativeMarkerSection
val = 123

    << AltSubSection
    val2 = "abc"

        <<< AltThirdLevel
        val3 = false

// End of demo

            `

        console.log(toPrettyJSON(YINI.parse(yini, true)))
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
