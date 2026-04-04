// src/dev/main.ts

/*
 * This includes of dev / debug / demo / custom-tesing code.
 *
 * https://github.com/YINI-lang/yini-parser-typescript/blob/main/docs/Project-Setup.md
 *
 * Run this code with the following commands:
 *     npm run start:main
 * or
 *     npm run start:main:dev:debug
 */

import {
    isDebug,
    isDev,
    isDevEnv,
    isProdEnv,
    isTestEnv,
    localAppEnv,
    localNodeEnv,
} from '../config/env'
import { debugPrint, printObject, toPrettyJSON } from '../utils/print'
import YINI from '../YINI'
import {
    defectConfig2Combo3,
    defectConfigCombo3,
    defectSectionLevelJump,
} from './quick-test-samples/defect-inputs'
import './quick-test-samples/valid-inputs' // validConfigComplex,
import {
    validConfigComplexBigA,
    validConfigComplexBigB,
} from './quick-test-samples/valid-inputs'

debugPrint()
debugPrint('-> Entered dev/main.ts')
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
        //         const yiniContent = `#!/usr/bin/env yini
        // ^ App
        // name = "Shebang-demo"`
        const yiniContent = `  #!/usr/bin/env yini
^ App
// val = 3e3
// 3val = 33
// name = "Shebang-\\"demo"
value = c"Hello World"
badEscape = c"E:\\logs\\nebula\\app.log"
\`value\`.B = "dfdfgd"
value.A = "gdfgdf"
`

        // console.log('--start0------------------------------------------')
        // const res0 = YINI.parse(yiniContent, {
        //     strictMode: false,
        //     // failLevel: 'ignore-errors',
        //     // includeMetadata: true,
        //     // includeDiagnostics: true,
        //     // requireDocTerminator: 'optional',
        // })
        // console.log('res0:')
        // console.log(res0)
        // console.log('--end------------------------------------------\n')

        console.log('--start2------------------------------------------')
        const res2 = YINI.parse(defectConfig2Combo3, {
            strictMode: true,
            failLevel: 'ignore-errors',
            includeMetadata: true,
            includeDiagnostics: true,
            requireDocTerminator: 'optional',
        })
        console.log('res2:')
        printObject(res2)
        console.log('--end------------------------------------------\n')

        // console.log('--start3------------------------------------------')
        // const res3 = YINI.parse(defectConfigCombo3, {
        //     strictMode: false,
        //     failLevel: 'ignore-errors',
        // includeMetadata: true,
        // includeDiagnostics: true,
        // requireDocTerminator: 'optional',
        // })
        // console.log('res3:')
        // console.log(res3)
        // console.log('--end------------------------------------------\n')

        // console.log('--start4------------------------------------------')
        // const res4 = YINI.parse(defectConfigCombo3, {
        //     strictMode: true,
        //     failLevel: 'ignore-errors',
        // includeMetadata: true,
        // includeDiagnostics: true,
        // requireDocTerminator: 'optional',
        // })
        // console.log('res4:')
        // console.log(res4)
        // console.log('--end------------------------------------------\n')

        // console.log(
        //     toPrettyJSON(
        //         // YINI.parse(validConfig, {
        //         YINI.parse(yiniContent, {
        //             strictMode: true,
        //             // failLevel: 'ignore-errors',
        //             // includeMetadata: true,
        //             // includeDiagnostics: true,
        //             // requireDocTerminator: 'optional',
        //         }),
        //     ),
        // )
    }
}
