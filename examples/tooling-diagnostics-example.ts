/**
 * tooling-diagnostics-example.ts
 *
 * Demonstrates parsing inline YINI content for editor/tooling-style use.
 *
 * Run from the repository root with:
 *     npm run example3
 */

import YINI from 'yini-parser'

// Inline content is useful when parsing user-provided text, editor buffers, or generated config.
const source = `
@yini

^ App
title = "Tooling Demo"
title = "Duplicate Title"
items = 25
`

// parseForTooling returns diagnostics instead of throwing for normal parse problems.
const parsed = YINI.parseForTooling(source, {
    // Keep the first value, but report a warning diagnostic for the duplicate key.
    onDuplicateKey: 'warn-and-keep-first',
})

console.log('Parse OK:', parsed.ok)

console.log('\nParsed Result:')
console.dir(parsed.result, { depth: null })

console.log('\nDiagnostics:')
console.dir(parsed.diagnostics, { depth: null })
