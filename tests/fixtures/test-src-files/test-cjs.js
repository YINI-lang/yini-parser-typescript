/**
 * This file MUST be pure valid CommonJS.
 */

// NOTE: (!) Importat below is with require!
const yini = require('../../../dist/index.js')

// Test if has default export.
function hasDefaultInCommonJS() {
    const result = yini && yini.default ? true : false

    console.log('CJS:', typeof yini, 'Has default: ', result)
    return result
}

module.exports = { hasDefaultInCommonJS }
