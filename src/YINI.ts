import fs from 'fs'
import { isDebug, isDev } from './config/env'
import {
    IParseMainOptions,
    TBailSensitivityLevel,
    TJSObject,
} from './core/types'
import { parseMain } from './parseEntry'
import { getFileNameExtension } from './utils/pathAndFileName'
import { debugPrint, devPrint, printObject } from './utils/system'

type TBailSensitivity = 'auto' & TBailSensitivityLevel

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
        strictMode = false,
        bailSensitivity: 'auto' | 0 | 1 | 2 = 'auto',
        includeMetaData = false,
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

        let level: TBailSensitivityLevel = 0
        // if (bailSensitivity === 'auto' && !strictMode) level = 0
        // if (bailSensitivity === 'auto' && strictMode) level = 1
        if (bailSensitivity === 'auto') {
            if (!strictMode) level = 0
            if (strictMode) level = 1
            if (process.env.NODE_ENV === 'test') level = 1
        } else {
            level = bailSensitivity
        }

        const options: IParseMainOptions = {
            isStrict: strictMode,
            bailSensitivityLevel: level,
            isIncludeMeta: includeMetaData,
            isWithDiagnostics: isDebug(),
            isWithTiming: isDebug(),
        }

        debugPrint()
        debugPrint('==== Call parse ==========================')
        const result = parseMain(yiniContent, options)
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
        strictMode = false,
        bailSensitivity: 'auto' | 0 | 1 | 2 = 'auto',
        includeMetaData = false,
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
        let level: TBailSensitivityLevel = 0
        // if (bailSensitivity === 'auto' && !strictMode) level = 0
        // if (bailSensitivity === 'auto' && strictMode) level = 1
        if (bailSensitivity === 'auto') {
            if (!strictMode) level = 0
            if (strictMode) level = 1
            if (process.env.NODE_ENV === 'test') level = 1
        } else {
            level = bailSensitivity
        }

        const options: IParseMainOptions = {
            isStrict: strictMode,
            bailSensitivityLevel: level,
            isIncludeMeta: includeMetaData,
            isWithDiagnostics: isDebug(),
            isWithTiming: isDebug(),
        }

        debugPrint()
        debugPrint('==== Call parse ==========================')
        const result: any = parseMain(content, options)
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
}
