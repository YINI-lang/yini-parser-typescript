# YINI Parser – TypeScript

[![npm version](https://img.shields.io/npm/v/yini-parser.svg)](https://www.npmjs.com/package/yini-parser) [![All Tests](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml)

> ⚠️ This package is in **alpha**. The API and features may change. Not all parts of the YINI specification are implemented yet.

**YINI Parser in TypeScript** — a runtime library for Node.js.  
A parser / reader for the [YINI configuration file format](https://github.com/YINI-lang/YINI-spec).  

This library implements the official YINI specification using TypeScript + ANTLR4.

YINI is a simple, human-friendly configuration format inspired by INI and JSON.

---

## Quick Start

A simple configuration:
```yini
^ App
name    = 'My Title'
items   = 25
enabled = true
```

That's it!

---

## 💡 Why YINI?
- **Easy to read and write**, minimal syntax, maximum clarity.
- **Clear section nesting** without painful indentation rules.
- **Supports strict/lenient modes**, and all major data types.
- A perfect alternative to messy JSON, legacy INI, or complex YAML.
- Built for both **JavaScript and TypeScript**.
- Both **human-friendly**, and **machine-friendly**.
  
## ✨ Features
- Simple syntax (supports both strict and lenient modes).
- Familiar config file style (inspired by INI, JSON, Python, and Markdown).
- Easy programmatic usage.
- Only the `YINI` class is exported; all internal details are private.
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

---

## 🚀 Installation

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

---

## Usage

### Node.js (CommonJS)
**Note:** Only a default export (YINI) is provided. Named imports are not supported.
```js
const YINI = require('yini-parser').default;
// If you get undefined, try:
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

## Example Output
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

## Intro to YINI Config Format

### 1. Sections
Group settings under a named header. A section header name starts with `^`.

Start a section with `^`, e.g.:
```yini
^ App
title = "AppName"
```

> Alternative section markers to `^` are also supported: `<`, `§`, `€` (e.g. `< Section`).

### 2. Key = Value
Each line inside a section is a **key** (name) and **value**, separated by `=`.

Write settings as `key = value`:
```yini
maxConnections = 100
enableLogging  = true
```

#### 💡Tip
Use backticks (\`) to quote section or key names that contain spaces or special characters.

Key names with spaces/special characters can be backticked:

```yini
 user id  = 1            # Invalid ❌
`user id` = 1            # Valid ✅
```

### 3. Values
Values can be:
- **Strings** (always quoted): `"hello"` or `'world'` (either single or double quoted)
- **Numbers:** `42`, `3.14` or `-10`
- **Booleans:** `true`, `false`, `on`, `off`, `yes`, `no` (all case-insensitive)
- **Nulls:** Use `null` or leave the value blank after `=` (in lenient mode)
- 🚧 *(Planned – not yet implemented in parser)* **Lists:**
  *  JSON‑style: `["red", "green", "blue"]`
  *  Colon‑style:
        ```yini
        fruits:
            "Pear",
            "Cherry",
            "Banana"
        ```

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

Tip: 💡For best compatibility, stick to one comment style per file.

Caveat: Note that **there must be a space** after the `#` and start of the comment. Otherwise it will be misinterpreted as a hexadecimal number.

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

### 6. Lists
🚧 *(Planned – not yet implemented in parser)*
```yini
// JSON‑style list
colors = ["red", "green", "blue"]

// Colon‑style list
fruits:
  "Pear",
  "Cherry",
  "Banana"
```

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

### 9. Complete Example

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
--userList = ["alice", "bob", "carol"]

/END
```

---

### Advanced Example

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

#### Output:
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

## 📚 Documentation
- [Development Setup](./docs/Development%20Setup.md) — How to run, test, and build the project, etc.
- [Conventions](./docs/Conventions.md) — Project conventions, naming patterns, etc.

---

## License
This project is licensed under the Apache-2.0 license - see the [LICENSE](<./LICENSE>) file for details.

In this project on GitHub, the `libs` directory contains third party software and each is licensed under its own license which is described in its own license file under the respective directory under `libs`.

---

~ **YINI ≡** • [https://yini-lang.org](https://yini-lang.org)