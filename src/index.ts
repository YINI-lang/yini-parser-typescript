// import { isDebug&&console.log } from './utils/general'

/*
	https://pauloe-me.medium.com/typescript-npm-package-publishing-a-beginners-guide-40b95908e69c
	
	Run the code with the following command:
		npx ts-node index
	or
		npm start
	
	/END
*/

import { APP_ENV, isDebug, isDev, isProd, NODE_ENV } from './config/env'
import { debugPrint } from './utils/system'
import YINI from './YINI'

export { default } from './YINI'

if (isDev() || isDebug()) {
    console.log('process.env?.NODE_ENV = ' + process.env?.NODE_ENV)
    console.log('process.env?.APP_ENV  = ' + process.env?.APP_ENV)
    console.log('process.env?.IS_DEBUG = ' + process.env?.IS_DEBUG)
}

// console.log('NODE_ENV = ' + NODE_ENV)
// console.log('APP_ENV = ' + APP_ENV)

debugPrint()
debugPrint('-> Entered index.ts')
debugPrint()

const debugTestObj = {
    name: 'e_test',
    lang: 'TypeScript',
}
debugPrint('debugTestObj:')
debugPrint(debugTestObj)
debugPrint()

if (isProd()) {
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
    // YINI.parse(input2)

    // debugPrint('invalidInput1:')
    // if (isDebug()) {
    //     console.debug(invalidInput1)
    // }
    // YINI.parse(invalidInput1)

    if (APP_ENV === 'local' && NODE_ENV !== 'test') {
        /*
		YINI.parse(`
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
        // YINI.parse(`number = 42`)
        /*
Expected JS output:
{ 
  Section1: { value: 1, Section2: { value: 11 }},
  Section2: { value: 2 }
}

*/

        YINI.parse(`
        ^ Section1
            bValue1 = YES
            intValue = 1
            ^^ Section11
                sValue = 11
                ^^^ Section111
                    sValue = 111
                    intValue = 111
            ^^ Section12
                sValue = 12
        ^ Section2
            sValue = 2
            ^^ Section21
                sValue = 21
                bValue = OFF
                ^^^ Section211
                    sValue = 211
                    ^^^^ Section2111
                        sValue = 2111
                    ^^^^ Section2112
                        sValue = 2112
                        strValue = 'test2112'
            ^^ Section22
                bValue3 = on
                ^^^ Section221
                    sValue = 221
            ^^ Section23
                bValue3 = on

                `)

        //         YINI.parse(`
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
