// src/dev/quick-test-samples/defect-inputs.ts

/**
 * Development-only YINI samples with intentional defects.
 *
 * These inputs are used for quick manual testing during development
 * via src/dev/.
 *
 * Each sample contains ONE clearly documented defect.
 * They are NOT part of the automated test suite.
 *
 * All real testing belongs in /tests/.
 */

/**
 * Invalid assignment operator (`:=` instead of `=`).
 */
export const defectInvalidAssignmentOperator = `
^ App
name = 'Hello'
txt := 'World'    // INVALID: assignment operator must be "="
`

/**
 * Invalid section name (starts with a number and contains hyphen).
 */
export const defectInvalidSectionName = `
^ App
name = "My Application"

^ 20-Database     // INVALID: section name must start with a letter or underscore
host = "localhost"
port = 5432
`

/**
 * Invalid numeric literal (double underscore).
 */
export const defectInvalidNumericLiteral = `
^ App
name = "Demo"

^ Database
host = "localhost"
port = 5432

someKey = 33__33   // INVALID: malformed numeric literal
`

/**
 * Duplicate key in the same section.
 */
export const defectDuplicateKey = `
^ App
name = "Demo"
name = "Override" // INVALID: duplicate key in same section
`

/**
 * Section level jump (^^ without parent ^).
 */
export const defectSectionLevelJump = `
^^ Logging        // INVALID: section level jumps without parent
enabled = true
`

/**
 * Unterminated string literal.
 */
export const defectUnterminatedString = `
^ App
name = "Demo
version = "1.0.0"
`

export const defectConfigCombo3 = `
^ App
name = "Combo defects sample"

mode := "dev"            // INVALID #1: ':=' is not a valid assignment operator (must be '=')

^ 2Database              // INVALID #2: section name starts with a digit (must start with A-Z/_ or be backticked)
host = "localhost"

ports = [80, 443, 8080   // INVALID #3: missing closing ']' in array literal
`

export const defectConfig2Combo3 = `
^ App
name = "ComboTest"
version = 1.0

  ^^ Database
  host = "localhost"
  port = 54_32      // ❌ INVALID number format: underscores not allowed inside numbers

  auth = { user: "admin", pass: "secret" }

    ^^^ Logging
    enabled = maybe  // ❌ INVALID boolean: only true/false/on/off/yes/no allowed

      ^ Network
      timeout = 30

^ Server
  host = "0.0.0.0"
  port := 8080      // ❌ INVALID assignment operator: must use "=" not ":="

    ^^ Security
      useTLS = true
`
