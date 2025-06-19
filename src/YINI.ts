import fs from 'fs'
import { isDebug, isDev } from './config/env'
import { parseYINI } from './parseEntry'
import { getFileNameExtension } from './utils/path-and-file-name'
import { debugPrint, devPrint } from './utils/system'

export default class YINI {
    public static fullPath: string = '' // Used in error reporting.

    public static parse = (yiniContent: string): any => {
        debugPrint('-> Entered static parse(..) in class YINI\n')

        // Important: First, before anything, trim beginning and trailing whitespaces!
        yiniContent = yiniContent.trim()

        if (!yiniContent) {
            throw new Error('Syntax-Error: Unexpected blank YINI input')
        }
        if (!yiniContent.endsWith('\n')) {
            yiniContent += '\n'
        }

        debugPrint()
        debugPrint('==== Call parse ==========================')
        //const tree = parser.yini;  // Start rule.
        const result = parseYINI(yiniContent)
        debugPrint('==== End call parse ==========================\n')

        if (isDev()) {
            console.log()
            devPrint('YINI.parse(..): result:')
            console.log(result)
        }

        return result
    }

    /**
     *
     * @param yiniFile Full path to the YINI file.
     */
    public static parseFile = (fullPath: string): any => {
        debugPrint('Current directory = ' + process.cwd())

        if (getFileNameExtension(fullPath).toLowerCase() !== '.yini') {
            console.error('Invalid file extension for YINI file:')
            console.error(`"${fullPath}"`)
            console.log(
                'File does not have a valid ".yini" extension (case-insensitive).',
            )
            throw new Error('Error: Unexpected file extension for YINI file')
        }

        let content = fs.readFileSync(fullPath, 'utf8')
        let hasNoNewlineAtEOF = false

        if (!content.endsWith('\n')) {
            content += '\n'
            hasNoNewlineAtEOF = true
        }

        YINI.fullPath = fullPath
        const result: any = parseYINI(content)

        if (hasNoNewlineAtEOF) {
            console.warn(
                `No newline at end of file, it\'s recommended to end a file with a newline. File:\n"${fullPath}"`,
            )
        }

        if (isDev()) {
            console.log()
            devPrint('YINI.parseFile(..): result:')
            console.log(result)
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
