/**
 * This file MUST have file ending ".mjs"!
 *
 * Node.js needs .mjs extension to know this is a module.
 */

import yini from '../../../dist/esm/index.js'

// Test if import works.
export function doesImportWorkInESM() {
    const result = !!yini
    // const result = true

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
