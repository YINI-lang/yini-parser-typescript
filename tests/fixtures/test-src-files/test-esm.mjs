/**
 * This file MUST have file ending ".mjs"!
 *
 * Node.js needs .mjs extension to know this is a module.
 */

import yini, { parse, parseForTooling } from '../../../dist/index.js'

// Test if import works.
export function doesImportWorkInESM() {
    const parsedFromDefault = yini.parse('^ App\nname = "Demo"')
    const parsedFromNamedExport = parse('^ App\nname = "Demo"')
    const toolingResult = parseForTooling('^ App\nname = "Demo"')

    const result =
        parsedFromDefault.App.name === 'Demo' &&
        parsedFromNamedExport.App.name === 'Demo' &&
        toolingResult.ok === true

    console.log('ESM:', typeof yini, 'Import works: ', result)
    return result
}

// console.log('qqqqqqqqqq: ' + process.argv[1])
// console.log('wwwwwwwwww: ' + `file://${process.argv[1]}`)

// Run directly if launched as main.
if (process.argv[1] && process.argv[1].endsWith('test-esm.mjs')) {
    const ok = doesImportWorkInESM()
    // Exit with 0 if true, 1 if false, so parent process (esm-smoke.js) can check
    // if (process.argv[1] && import.meta.url.endsWith(process.argv[1])) {
    process.exit(ok ? 0 : 1)
}
