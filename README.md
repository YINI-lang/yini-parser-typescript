# YINI Parser for Node.js

YINI is a clean, minimal, and human-readable config format for structured configuration. This parser implements the YINI spec in TypeScript for Node.js, with support for nested sections, strict/lenient modes, and typed values.

[![npm version](https://img.shields.io/npm/v/yini-parser.svg)](https://www.npmjs.com/package/yini-parser) [![All Tests](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml)

```sh
npm install yini-parser
```

```ts
import YINI from 'yini-parser'
const config = YINI.parseFile('./config.yini')
```

A clean, minimal, human-readable config format—designed as an alternative to INI, YAML, and JSON.

➡️ See full [documentation or YINI format specification](https://github.com/YINI-lang/YINI-spec)

⭐ **Enjoying YINI?** If you find this project useful, please consider [starring it on GitHub](https://github.com/YINI-lang/yini-parser-typescript) — it helps others discover it!

---

## YINI Parser – TypeScript

> 🚧 This package is in **beta**. The core API is stabilizing, some more advanced features may still change. Feedback and bug reports are welcome!

**YINI Parser in TypeScript** — a runtime library for Node.js.  
A parser / reader for the [YINI configuration file format](https://github.com/YINI-lang/YINI-spec).  

This library implements the official YINI specification using TypeScript + ANTLR4.

YINI is a simple, human-friendly configuration format inspired by INI and JSON.

---

## Quick Start

A minimal example using YINI in TypeScript:
```ts
import YINI from 'yini-parser'

const config = YINI.parse(`
^ App
name     = 'My Title'    // App display name.
items    = 25
darkMode = true

    // Sub-section of App.
    ^^ Special
    primaryColor = #336699
    isCaching = false
`)

// To parse from a file instead:
// const config = YINI.parseFile('./config.yini')

console.log(config.App.name)                // My Title
console.log(config.App.Special.isCaching)   // false
console.log()
console.log(config)
```

**Output:**
```js
My Title
false

{
  App: {
    name: 'My Title',
    items: 25,
    darkMode: true,
    Special: { 
      primaryColor: 3368601,
      isCaching: false
    }
  }
}
```

That's it!

▶️ Link to [examples/](https://github.com/YINI-lang/yini-parser-typescript/tree/main/examples) files.

## 💡 Why YINI?
- **Easy to read and write**, minimal syntax noise, maximum clarity.
- **Clear and minimal section nesting** without painful indentation rules or long dot nested strings, etc.
- A perfect alternative to messy JSON, legacy INI, or complex YAML.
- Built for both **JavaScript and TypeScript**.
- **Supports strict/lenient modes**, and all major data types.
- Both **human-friendly**, and **machine-friendly**.
- 👉 See [how YINI compares to JSON, YAML, INI, and TOML](https://github.com/YINI-lang/yini-parser-typescript/tree/main/examples/compare-formats.md).
- Want the full syntax reference? See the [YINI Specification](https://github.com/YINI-lang/YINI-spec).
  
---

## Intro to YINI Config Format

### 1. Sections
Group settings under a named header. A section header name starts with `^`.

Start a section with `^`, e.g.:
```yini
^ App
title = "AppName"
```

> Alternative section markers to `^` are also supported: `<`, `§`, `€` (e.g. `< Section`).

> See section 9 for more advanced marker and naming options.

### 2. Key = Value
Each line inside a section is a **key** (name) and **value**, separated by `=`.

Write settings as `key = value`:
```yini
maxConnections = 100
enableLogging  = true
```

> See section 9 for more advanced marker and naming options.

#### 💡Tip
Use backticks (\`) to quote section or key names that contain spaces or special characters.

Key names with spaces/special characters can be backticked:

```yini
 user id  = 1            # Invalid ❌
`user id` = 1            # Valid ✅
```

### 3. Values
Values can be:
- **Strings** (always quoted): `'hello'` or `"world"` (either single or double quoted)
- **Numbers:** `42`, `3.14` or `-10`
- **Booleans:** `true`, `false`, `on`, `off`, `yes`, `no` (all case-insensitive)
- **Nulls:** Use `null` or leave the value blank after `=` (in lenient mode)
- **Lists:**
  * JSON‑style: `["red", "green", "blue"]`
  * Colon‑style: *(Planned – not yet implemented in parser)* 

### 4. Comments
Various commenting styles are supported:
```yini
// This is a line comment
timeout = 30  // inline comment
# This is also a line comment (must have a space after #)
interval = 30  # inline comment (must have a space after #)
/* Block comment spanning
   multiple lines */
; Full line comment (must be whole line).
```

> **Tip:** You can add comments anywhere—above, beside, or below any setting or section.
> 
👆 **Caveat 1:** If you use `#` for comments, always put a space after the `#`.
(Otherwise, the parser might misinterpret it as part of a value.)

👆 **Caveat 2:** `;` is used only for full-line comments. The `;` must be the first non-whitespace character on a line (only spaces or tabs are allowed before it).
(If `;` appears later in the line, the parser may treat it as part of a value or as a line delimiter, not as a comment.)

💡**Tip:** You can use any comment style in your file.
For best readability, try to stick to one style per file.

### 5. Nested Sections
Use extra carets `^` for sub‑sections:
```yini
^ Parent
^^ Child

// Add another caret `^` and you get a sub-section
// of the previous section, and so...
^^^ SubChild
```

If you prefer, you can indent the nested section for visibility:
```yini
^ Main
    ^^ Sub
    host = "db.example.com"
```

One can nest multiple sections:
```yini
^ Root
^^ Sub
^^^ SubSub
^ BackToRoot
```

Example with indented sections:
```yini
^ Root
value = 'At level 1'
    ^^ Sub
    value = 'At level 2'
        ^^^ SubSub
        value = 'At level 3'
        
^ BackToRoot
value = 'Back at level 1'
```

The above Yini code will produce the following JavaScript object:
```js
// JS object
{
  Root: {
    value: 'At level 1',
    Sub: { value: 'At level 2', SubSub: { value: 'At level 3' } }
  },
  BackToRoot: { value: 'Back at level 1' }
}
```

> See section 9 for more advanced marker and naming options.

### 6. Lists
```yini
// JSON‑style lists
colors = ["red", "green", "blue"]

numberList = [
    10,
    20,
    30
]


// Colon‑style list
// 👆 Colon‑style list support is planned for an upcoming release.
fruits:
  "Pear",
  "Cherry",
  "Banana"
```

> You can use either single or double quotes for string values in YINI.

### 7. Document Terminator (strict mode)
The `/END` marker is required only in strict mode, and optional in lenient (default) mode.

End a file explicitly with:
```yini
^ App
title = "MyTitle"

/END    // Must be included in strict mode.
```

### 8. Disabled Lines
Prefix any valid line with `--` to skip it entirely:
```yini
--maxRetries = 5
```

### 9. Advanced: Alternative Section Markers & Naming
In addition to the standard syntax, YINI supports several advanced options:

- (a.) **Alternative section markers:**  
  Besides `^`, you can use `<`, `§`, or `€` as section header markers.  
  
  ```yini
  < MySection
  § Settings
  € MyApp
  ```

- (b.) **Backticked section names and key names:**  
  Use backticks (`) to allow spaces or special characters in section or key names:

  ```yini
    ^ `Section name with spaces`
    `user id` = 42
  ```

- (c.) **Numeric shorthand section markers:**  
  To create deeply nested sections (beyond 6 levels), use numeric shorthand:

  ```yini
  ^7 DeepSection    # Equivalent to 7 carets: ^^^^^^^ DeepSection
  <10 VeryDeep      # Equivalent to <<<<<<<<<<< VeryDeep
  ```

  👆 Though, can not mix standard/classic and numeric shorthand markers in the same section header.

- (d.) **More features:**  
  The YINI format supports even more features than listed here, such as additional number notations, string types, and advanced escaping. For full details, see the [latest release of the YINI specification](https://github.com/YINI-lang/YINI-spec/blob/release/YINI-Specification.md).

### 10. Complete Example

```yini
@yini       # Optional marker to identify YINI format.

^ App
name    = "MyApp"
version = "1.0.0"
debug   = off  // Turn on for debugging.

^^ Database
host     = "db.local"
port     = 5432
--user   = "secret"  # This line is disabled due to --.
userList = ["alice", "bob", "carol"]

/END
```

---

## Usage

### Installation

With **npm**:
```sh
npm install yini-parser
```

With **yarn**:
```sh
yarn add yini-parser
```

With **pnpm**:
```sh
pnpm add yini-parser
```

### Node.js (CommonJS)
**Note:** Only a default export (YINI) is provided. Named imports are not supported.
```js
const YINI = require('yini-parser').default;
// (!) If you get undefined, try:
// (Some Node.js setups require the .default property, others don't, due to ESM/CommonJS interop quirks.)
const YINI = require('yini-parser');

// Parse from string.
const config = YINI.parse(`
    ^ App
    title = 'My App Title'
    items = 25
    isDarkTheme = true
`);

// Parse from file.
const configFromFile = YINI.parseFile('./config.yini');
```

### TypeScript (with `"esModuleInterop": true`)
```ts
import YINI from 'yini-parser';

// Parse from string.
const config = YINI.parse(`
    ^ App
    title = "My App Title"
    items = 25
    isDarkTheme = OFF
`);

// Parse from file.
const configFromFile = YINI.parseFile('./config.yini');
```

### Example Output
```js
// JS object
{
   App: {
      title: "My App Title",
      items: 25,
      isDarkTheme: false
   }
}
```

---

## ✨ Features
- Simple syntax (supports both strict and lenient modes).
- Familiar config file style (inspired by INI, JSON, Python, and Markdown).
- Easy programmatic usage.
- Only the `YINI` class is exported; all internal details are private.
- Lists (bracketed): `list = [10, 20, 30]`
- 🚧 *(Planned – not yet implemented in parser)* Supports alternative list notation (colon‑style lists):
    ```yini
    fruits:
        'Pear',
        'Cherry',
        'Banana'
    ```

### Limitations
Not all features of the full YINI are implemented yet.

See [FEATURE-CHECKLIST.md](https://github.com/YINI-lang/yini-parser-typescript/blob/main/FEATURE-CHECKLIST.md) for the current list of implemented YINI features.

## 🚧 Missing or Upcoming Features

This parser currently supports all core YINI syntax for values, comments, section headers, and basic nesting.

The following features from the [YINI specification](https://github.com/YINI-lang/YINI-spec) are **planned but not yet fully implemented**:

- Object literals
- Advanced escape sequences
- String types and triple-quoted strings
- All number format literals
- Full strict mode validation

You can follow progress in the [YINI parser GitHub repo-FEATURE-CHECKLIST](https://github.com/YINI-lang/yini-parser-typescript/blob/main/FEATURE-CHECKLIST.md). Contributions and feature requests are welcome!

## 📂 Examples

See the [examples/](https://github.com/YINI-lang/yini-parser-typescript/tree/main/examples) folder for:

- Basic YINI file with common types and comments
- Nested sections example
- Comparison with JSON/YAML config

These examples are also included in the npm package.

---

## Advanced Example

```js
const YINI = require('yini-parser').default; // Or: import YINI from 'yini-parser';

const config = YINI.parse(`
    /*
        This is a multi-line block comment.
    */

    @yini

    ^ App
    name = "Nested Example"
    version = "1.0.0"
    debug = OFF  // This is a comment.

        # Database settings.
        ^^ Database
        host = "db.example.com"
        port = 3306
        user = "appuser"
        --password = "dbpassword"  # Disabled line due to --.
        //password = "dbpassword"  # Not sure yet about this pw.
        password = "dbpassword"  # Keep this secret.

            // Commenting with slashes works too.
            ^^^ Pool
            min = 2
            max = 10
            idleTimeout = 300

        /* Block comment on a single line. */
        ^^ Logging
        level = "info"
        logToFile = ON # This is a comment.
        filePath = "./logs/app.log"
    
    /END
`);

console.log(config);
```

### Output:
```js
// JS object
{
    App: {
        name: "Nested Example",
        version: "1.0.0",
        debug: false,
        Database: {
            host: "db.example.com",
            port: 3306,
            user: "appuser",
            password: "dbpassword",
            Pool: {
                min: 2,
                max: 10,
                idleTimeout: 300
            }
        },
        Logging: {
            level: "info",
            logToFile: true,
            filePath: "./logs/app.log"
        }
    }
}
```

---

## API

Only the `YINI` class is exposed in the public API, with two static methods: `parse` and `parseFile`.

### `YINI.parse(yiniContent: string, strictMode?: boolean, bailSensitivity: 'auto' | 0 | 1 | 2 = "auto", includeMetaData = false): object`

Parses YINI code from a string.  

**Params:**
- `yiniContent`: The YINI configuration as a string.
- `strictMode`: (optional, default `false`) Parse in strict mode.
- `bailSensitivity`: (optional, default `"auto"`) Error tolerance level.
  * If `bailSensitivity` is `"auto"` then bail sensitivity level will be set to 0 if in non-strict mode, if in strict mode then level 1 will be used automatically.
- `includeMetaData`: If true then additional meta data will be returned along the object.

**Bail sensitivity levels:**
- 0 = 'Ignore-Errors' // Don't bail on errors, persist and try to recover.
- 1 = 'Abort-on-Errors'
- 2 = 'Abort-Even-on-Warnings'

Returns a JavaScript object representing the parsed configuration (YINI content).

### `YINI.parseFile(filePath: string, strictMode?: boolean, bailSensitivity: 'auto' | 0 | 1 | 2 = "auto", includeMetaData = false): object`

Parses YINI code from a file.
- `filePath`: Path to the `.yini` file.
- Other parameters are the same as `parse(..)`.

Returns a JavaScript object representing the parsed YINI configuration file.

---

## 🤝 Contributing
We welcome feedback, bug reports, feature requests, and code contributions!
- [Open an Issue](https://github.com/YINI-lang/yini-parser-typescript/issues)
- [Start a Discussion](https://github.com/YINI-lang/yini-parser-typescript/discussions)
  
---

## 📚 Documentation
- [Development Setup](https://github.com/YINI-lang/yini-parser-typescript/blob/main/docs/Development-Setup.md) — How to run, test, and build the project, etc.
- [Conventions](https://github.com/YINI-lang/yini-parser-typescript/blob/main/docs/Conventions.md) — Project conventions, naming patterns, etc.

---

## Links
- ➡️ [Why YINI? Why another format!?](./RATIONALE.md) (rationale)
- ➡️ [Intro to YINI Config Format](https://github.com/YINI-lang/yini-parser-typescript?tab=readme-ov-file#intro-to-yini-config-format) (learn YINI)
- ➡️ [Read the YINI Specification](./YINI-Specification.md#table-of-contents) (spec)
- ➡️ [Official YINI Parser on npm](https://www.npmjs.com/package/yini-parser) (npm)
- ➡️ [YINI Parser GitHub Repo](https://github.com/YINI-lang/yini-parser-typescript) (GitHub)
- ➡️ [YINI vs Other Formats](https://github.com/YINI-lang/YINI-spec/blob/develop/Docs/Examples%20of%20YINI%20vs%20Other%20Formats.md)

---

## License
This project is licensed under the Apache-2.0 license - see the [LICENSE](<./LICENSE>) file for details.

In this project on GitHub, the `libs` directory contains third party software and each is licensed under its own license which is described in its own license file under the respective directory under `libs`.

---

~ **YINI ≡** • [https://yini-lang.org](https://yini-lang.org)