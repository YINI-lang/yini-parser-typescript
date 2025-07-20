/**
 * This file MUST have file ending ".mjs"!
 *
 * Node.js needs .mjs extension to know this is a module.
 */

// test-esm.mjs
import yini from '../../../dist/esm/index.js'

if (!yini) {
    console.error('Import failed: no default export')
    process.exit(1)
}
// Optionally check named exports too, e.g. parse, etc
if (typeof yini.parse !== 'function') {
    console.error('Import failed: parse() function not found')
    process.exit(2)
}

console.log('YINI ESM import test: SUCCESS')
process.exit(0)
