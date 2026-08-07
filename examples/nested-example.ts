/**
 * nested-example.ts
 *
 * Demonstrates reading nested YINI sections from a file.
 *
 * Run from the repository root with:
 *     npm run example2
 */

import path from 'path'
import YINI from 'yini-parser'

// Resolve the example file relative to this script.
const configPath = path.resolve(__dirname, './nested.yini')
const config = YINI.parseFile(configPath)

console.log('App Name:', config.App.name)
console.log('App Version:', config.App.version)

// Nested YINI sections become nested JavaScript objects.
console.log('Theme Primary Color:', config.App.Theme.primaryColor)
console.log('Theme Override Dark Mode:', config.App.Theme.Overrides.darkMode)
console.log('Database Host:', config.Database.host)
console.log('Database User:', config.Database.Credentials.username)

console.log('\nFull Config:')
console.dir(config, { depth: null })
