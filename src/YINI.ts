import fs from 'fs'
import { parseYINI } from './parseEntry'
import { debugPrint, isDebug } from './utils/general'

export default class YINI {
    public static parse = (yiniContent: string): any => {
        debugPrint('-> Entered static parse(..) in class YINI\n')

        if (!yiniContent.endsWith('\n')) {
            yiniContent += '\n'
        }

        debugPrint()
        debugPrint('==== Call parse ==========================')
        //const tree = parser.yini;  // Start rule.
        const result = parseYINI(yiniContent)
        debugPrint('==== End call parse ==========================\n')

        debugPrint('YINI.parse(..): result:')
        if (isDebug()) {
            console.debug(result)
        }

        return result
    }

    /**
     *
     * @param yiniFile Full path to the YINI file.
     */
    public static parseFile = (fullPath: string): any => {
        debugPrint('Current directory = ' + process.cwd())

        let content = fs.readFileSync(fullPath, 'utf8')
        let hasNoNewlineAtEOF = false

        if (!content.endsWith('\n')) {
            content += '\n'
            hasNoNewlineAtEOF = true
        }

        const result = parseYINI(content)

        if (hasNoNewlineAtEOF) {
            console.warn(
                "No newline at end of file, it's a good practice (and etc.) to end a file with a newline",
            )
        }

        return result
    }
}

// //import { Solution } from './solution';
// debugPrint('*** Started index.ts of ' + 'e_test'.toUpperCase() + ' ***')

// // const s : Solution = new Solution();

// // debugPrint('Result, getBuyDay index:  ', s.getBuyDay());
// // debugPrint('Result, getSellDay index: ', s.getSellDay());
// // debugPrint();

// const debugTestObj = {
//     name: 'e_test',
//     lang: 'TypeScript',
// }
// debugPrint('debugTestObj:')
// debugPrint(debugTestObj)
// debugPrint()

// const isDebug = !!process.env.IS_DEBUG
// debugPrint('env.IS_DEBUG:')
// debugPrint(process.env.IS_DEBUG)
// debugPrint('isDebug = ' + isDebug)
// debugPrint()

// const invalidInput = `
// # 	Config
// age = 30
// name = "Alice"
// items = ["a", "b", "c"]
// /END
// `

// const input1 = `
// ^ 	SectionName
// varBool = true
// varBool2 = off
// varInt = 30
// varFloat = 12.34
// varStr = "Alice"
// listItems = ["a", "b", "c"]
// varE1 = 1e4
// varE2 = 1.23e4
// varE3 = 6.5E23
// /END
// `

// const input2 = `
// ^ 	Config
// varAge = 30
// varName = "Alice"
// listItems = ["a", "b", "c"]
// 	^^Extra
// 	isExtra = true
// /END
// `

// // const input = `
// // # 	Config`;

// debugPrint('input1:')
// debugPrint(input1)
// debugPrint()

// YINI.parse(input2)
