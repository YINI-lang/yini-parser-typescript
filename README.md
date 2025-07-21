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
- --todo-- Supports alternative list notation, colon‑style lists:
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
const YINI = require('yini-parser');
// If you get undefined, try:
const YINI = require('yini-parser').default;

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
//  (JS object)
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
Group settings under a named header. A section header starts with `^`:

```yini
^ Server
host = "localhost"
port = 8080
```

### 2. Key = Value
Each line inside a section is a **key** (name) and **value**, separated by `=`:

```yini
maxConnections = 100
enableLogging   = true
```

Values can be:
- **Strings** (always quoted): `"hello"` or `'world'` (either single or double quoted)
- **Numbers:** `42`, `3.14` or `-10`
- **Booleans:** `true`, `false`, `on`, `off`, `yes`, `no` (all case-insensitive)
- --todo-- **Lists:** `["red", "green", "blue"]`

### 3. Comments
Add line and inline notes with `//` or `#`:
```yini
// This is a line comment
timeout = 30  // inline comment

# This is also a line comment
interval = 30  # inline comment
```

Caveat: Note that **there must be a space** after the `#` and start of the comment. Otherwise it will be misinterpreted as a hexadecimal number.

Multi line comment with `/* ... */` is also supported, and full line comments with `;`:
```yini
/*
    This is a multi line block comment.
*/

; Full line comment.
^ Server
host = "localhost"
port = 8080
```


Though, it's recommended to stick to one style per file for consistency.

### 4. Nested Sections
Add extra carets (^) to nest subsections:
```yini
^ App
^^ Database
host = "db.example.com"
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
{
  Root: {
    value: 'At level 1',
    Sub: { value: 'At level 2', SubSub: { value: 'At level 3' } }
  },
  BackToRoot: { value: 'Back at level 1' }
}
```

### Complete Example

```yini
@yini       # Optional marker to identify YINI format.

^ App
name    = "MyApp"
version = "1.0.0"

^^ Database
host     = "db.example.com"
port     = 5432
--userList = ["alice", "bob", "carol"]

// Uncomment below to enable debug mode.
// debug = on
```

---

### Advanced Example

```js
const YINI = require('yini-parser'); // Or: import YINI from 'yini-parser';

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
// (JS object)
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