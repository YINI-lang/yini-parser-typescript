/**
 * parse-example.ts
 *
 * Demonstrates reading and parsing a YINI configuration file.
 */

import path from 'path'
import YINI from 'yini-parser'

// Resolve path to the example config file.
const configPath = path.resolve(__dirname, './basic.yini')

// Parse the YINI config file.
const config = YINI.parseFile(configPath)

// Output some example values.
console.log('App Title:', config.App.title)
console.log('Items:', config.App.items)
console.log('Dark Theme Enabled:', config.App.isDarkTheme)

console.log('\nFull Config:')
console.dir(config, { depth: null })
