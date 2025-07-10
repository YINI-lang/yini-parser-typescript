import fs from 'fs'
import { isDebug, isDev } from './config/env'
import { IOptions, TJSObject } from './core/types'
import { parseYINI } from './parseEntry'
import { getFileNameExtension } from './utils/pathAndFileName'
import { debugPrint, devPrint, printObject } from './utils/system'

/**
 * This class is the public API, which exposes only parse(..) and
 * parseFile(..), rest of the implementation details are hidden.
 * @note Only parse and parseFile are public.
 */
export default class YINI {
    public static fullPath: string = '' // Used in error reporting.

    /**
     * @param yiniContent YINI code as a string, can be multiple lines.
     * @note The order of properties (members) in each JavaScript object (section) may differ from the order in the input YINI content.
     * @returns The parsed JavaScript object.
     */
    public static parse = (
        yiniContent: string,
        isStrict = false,
        bailSensitivy: 0 | 1 | 2 = 0,
    ): TJSObject => {
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
     * @returns The parsed JavaScript object.
     */
    public static parseFile = (
        fullPath: string,
        isStrict = false,
        bailSensitivy: 0 | 1 | 2 = 0,
    ): TJSObject => {
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
