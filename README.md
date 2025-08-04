# YINI Parser for Node.js

A TypeScript/Node.js parser for YINI — a clean, type-safe, structured config format with simple nested sections, comments, and support for strict validation.

[![npm version](https://img.shields.io/npm/v/yini-parser.svg)](https://www.npmjs.com/package/yini-parser) [![All Tests](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml)

```sh
npm install yini-parser
```

```ts
import YINI from 'yini-parser'
const config = YINI.parseFile('./config.yini')
```

YINI (Yet another INI): YINI is a lightweight, human-friendly configuration format — simpler than YAML, but more expressive than INI.

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

## 🙋‍♀️ Why YINI?
- **YINI is an alternative** to other great config formats like INI, JSON, YAML, XML, and TOML — designed for clarity, simplicity, and straightforward section nesting.
- **Started as a personal project and a research challenge:** Provides structure similar to INI, with features inspired by JSON and YAML.
- **Built for clarity:**
    * Uses minimal syntax for humans, especially for nested sections.
    * Uses a concise syntax, aims to not have too much syntax noise.
    * Supports commonly used configuration structures.
- *Originated from practical needs **for configuration clarity, simplicity, minimalism, and flexibility**.

---

## 💡 What is YINI?
- **Simple like INI** — but with strong typing, comments, and nested sections.
- **Easy to read and write** — minimal syntax noise, maximum clarity.
- **Clear, minimal section nesting** — no painful indentation or long dot-delimited keys.
- This repo/parser is built for both **JavaScript and TypeScript**.
- **Supports strict and lenient modes**, and all major data types.
- Both **human-friendly** and **machine-friendly**.
- 👉 See [how YINI compares to JSON, YAML, INI, and TOML](https://github.com/YINI-lang/yini-parser-typescript/tree/main/examples/compare-formats.md).
- Want the full syntax reference? See the [YINI Specification](https://github.com/YINI-lang/YINI-spec).
  
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

---

## Intro to YINI Config Format
**YINI** is a simple and readable configuration format. Sections are defined with `^ SectionName`, and values are assigned using `key = value`. The format supports common data types (same as those found in JSON), including strings, numbers, booleans, nulls, and lists. 

To learn more, see the [Getting Started: Intro to YINI Config Format](https://github.com/YINI-lang/YINI-spec/blob/develop/Docs/Intro-to-YINI-Config-Format.md) tutorial.

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
- ➡️ [Getting Started: Intro to YINI Config Format](https://github.com/YINI-lang/YINI-spec/blob/develop/Docs/Intro-to-YINI-Config-Format.md)  
  *Beginner-friendly walkthrough and basic usage examples.*

- ➡️ [YINI Parser on npm](https://www.npmjs.com/package/yini-parser)  
  *Install and view package details.*

- ➡️ [Read the YINI Specification](https://github.com/YINI-lang/YINI-spec/blob/release/YINI-Specification.md#table-of-contents)  
  *Full formal spec for the YINI format, including syntax and features.*

- ➡️ [YINI CLI on GitHub](https://github.com/YINI-lang/yini-cli)  
  *TypeScript source code, issue tracker, and contributing guide.*

- ➡️ [YINI vs Other Formats](https://github.com/YINI-lang/YINI-spec/tree/release#-summary-difference-with-other-formats)  
  *How does YINI differ: comparison with INI, YAML, and JSON.*
  
- ➡️ [Why YINI? (Project Rationale)](https://github.com/YINI-lang/YINI-spec/blob/release/RATIONALE.md)  
  *Learn about the motivations and design decisions behind YINI.*

- ➡️ [YINI Project](https://github.com/YINI-lang)  
  *YINI home.*

---

## License
This project is licensed under the Apache-2.0 license - see the [LICENSE](<./LICENSE>) file for details.

In this project on GitHub, the `libs` directory contains third party software and each is licensed under its own license which is described in its own license file under the respective directory under `libs`.

---

~ **YINI ≡** • [https://yini-lang.org](https://yini-lang.org)