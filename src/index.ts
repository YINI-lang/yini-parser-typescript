/*
    This file is a pure barrel file.

    https://github.com/YINI-lang/yini-parser-typescript/blob/main/docs/Project-Setup.md

    Run the code with the following command:
        npm start
    or
        npm run start:dev
    or
        npm run start:dev:debug
	
	/END
*/

import YINI from './YINI'

// export { default as YINI } from './YINI' // NOTE: This line fail to export correctly!
export default YINI // Public package API.

// export const parse = YINI.parse
// export const parseFile = YINI.parseFile
// export const getTabSize = YINI.getTabSize
// export const setTabSize = YINI.setTabSize
export const { parse, parseFile, getTabSize, setTabSize } = {
    parse: YINI.parse,
    parseFile: YINI.parseFile,
    getTabSize: YINI.getTabSize,
    setTabSize: YINI.setTabSize,
}

// export * from './types' // NOTE: The public (user-facing) types only!
// Re-exported public types as *types* (so they erase at runtime).
export type {
    ParsedObject,
    YiniParseResult,
    OnDuplicateKey,
    FailLevelKey,
    PreferredFailLevel,
    PrimaryUserParams,
    AllUserOptions,
    IssuePayload,
    MetaSchemaVersion,
    OrderGuarantee,
    ResultMetadata,
} from './types'

// debugPrint()
// debugPrint('-> Entered index.ts')
// debugPrint()

// if (isDev() || isDebug()) {
//     console.log(`process.env?.NODE_ENV = '${process.env?.NODE_ENV}'`)
//     console.log(`process.env?.APP_ENV  = '${process.env?.APP_ENV}'`)
//     console.log(`process.env?.IS_DEBUG = '${process.env?.IS_DEBUG}'`)

//     debugPrint()
//     console.log(`localNodeEnv = '${localNodeEnv}'`)
//     console.log(` localAppEnv = '${localAppEnv}'`)
//     console.log(' isProdEnv() = ' + isProdEnv())
//     console.log('  isDevEnv() = ' + isDevEnv())
//     console.log(' isTestEnv() = ' + isTestEnv())
//     console.log()
//     console.log('     isDev() = ' + isDev())
//     console.log('   isDebug() = ' + isDebug())
//     console.log()
// }

// const debugTestObj = {
//     name: 'e_test',
//     lang: 'TypeScript',
// }
// debugPrint('debugTestObj:')
// debugPrint(debugTestObj)
// debugPrint()
