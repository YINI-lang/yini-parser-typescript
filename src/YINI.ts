import fs from 'fs'
import { isDebug, isDev } from './config/env'
import { IOptions } from './core/types'
import { parseYINI } from './parseEntry'
import { getFileNameExtension } from './utils/pathAndFileName'
import { debugPrint, devPrint, printObject } from './utils/system'

export default class YINI {
    public static fullPath: string = '' // Used in error reporting.

    /**
     * @param yiniContent Full path to the YINI file.
     * @note The order of properties (members) in each JavaScript object (section) may differ from the order in the input YINI content.
     */
    public static parse = (
        yiniContent: string,
        isStrict = false,
        bailSensitivy: 0 | 1 | 2 = 0,
    ): any => {
        debugPrint('-> Entered static parse(..) in class YINI\n')

        // Important: First, before anything, trim beginning and trailing whitespaces!
        yiniContent = yiniContent.trim()

        if (!yiniContent) {
            throw new Error('Syntax-Error: Unexpected blank YINI input')
        }
        if (!yiniContent.endsWith('\n')) {
            yiniContent += '\n'
        }

        const options: IOptions = {
            isStrict: isStrict,
            bailSensitivyLevel: bailSensitivy,
        }

        debugPrint()
        debugPrint('==== Call parse ==========================')
        const result = parseYINI(yiniContent, options)
        debugPrint('==== End call parse ==========================\n')

        if (isDev()) {
            console.log()
            devPrint('YINI.parse(..): result:')
            console.log(result)

            devPrint('Complete result:')
            printObject(result)
        }

        return result
    }

    /**
     * @param yiniFile Full path to the YINI file.
     * @note The order of properties (members) in each JavaScript object (section) may differ from the order in the input YINI file.
     */
    public static parseFile = (
        fullPath: string,
        isStrict = false,
        bailSensitivy: 0 | 1 | 2 = 0,
    ): any => {
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
        const options: IOptions = {
            isStrict: isStrict,
            bailSensitivyLevel: bailSensitivy,
        }

        debugPrint()
        debugPrint('==== Call parse ==========================')
        const result: any = parseYINI(content)
        debugPrint('==== End call parse ==========================\n')

        if (hasNoNewlineAtEOF) {
            console.warn(
                `No newline at end of file, it\'s recommended to end a file with a newline. File:\n"${fullPath}"`,
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
