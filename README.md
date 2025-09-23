# YINI Parser for Node.js

A TypeScript/Node.js parser for YINI — A type-safe, structured, and human-readable config format with nested sections, types, comments, and support for strict validation.

[![npm version](https://img.shields.io/npm/v/yini-parser.svg)](https://www.npmjs.com/package/yini-parser) [![All Test Suites](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml) [![All Regression Tests](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-regression-tests.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-regression-tests.yml) [![Grammar Drift Check](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-grammar-drift-check.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-grammar-drift-check.yml)

```sh
npm install yini-parser
```

```ts
import YINI from 'yini-parser'
const config = YINI.parseFile('./config.yini')
```

YINI (Yet another INI): YINI is a configuration format designed for readability and structure, inspired by INI and YAML.

➡️ See full [documentation or YINI format specification](https://github.com/YINI-lang/YINI-spec)

⭐ **Enjoying YINI?** If you like this project, [star it on GitHub](https://github.com/YINI-lang/yini-parser-typescript) — it helps a lot, thank you!

---

## YINI Parser – (source code in TypeScript)

> 🚧 This package is in **beta**. The core API is stabilizing, some more advanced features may still change. Feedback and bug reports are welcome!

**YINI Parser in TypeScript** — a runtime library for Node.js.  
A parser / reader for the [YINI configuration file format](https://github.com/YINI-lang/YINI-spec).  

This library implements the official YINI specification using TypeScript + ANTLR4.

YINI is a simple, human-friendly configuration format inspired by INI and JSON.

---

## 🙋‍♀️ Why YINI?
- **YINI is an alternative** to other great config formats like INI, JSON, YAML, XML, and TOML — Supports section nesting and explicit syntax for configuration files.
- **Started as a personal project and a research challenge:** Provides structure similar to INI, with features inspired by JSON and YAML.
- **Built for clarity:**
    * Uses a concise syntax to minimize unnecessary characters.
    * Supports commonly used configuration structures.
- *Developed to meet practical needs, driven by curiosity and a desire **for configuration clarity, simplicity, minimalism, and flexibility**.

---

## 💡 What is YINI?
- **Simple like INI** — but with strong typing, comments, and nested sections.
- **Provides concise, structured syntax** for configuration.
- Supports section nesting **without requiring indentation or dot-delimited keys**.
- This repo/parser is built for both **JavaScript and TypeScript**.
- **Supports strict and lenient modes**, and all major data types.
- Can be **edited manually** or **processed programmatically**.
- 👉 See [how YINI compares with JSON, YAML, INI, and TOML](https://github.com/YINI-lang/yini-parser-typescript/tree/main/examples/compare-formats.md).
- Want the full syntax reference? See the [YINI Specification](https://github.com/YINI-lang/YINI-spec).
  
---

## Quick Start

A small example using YINI in TypeScript/JavaScript:
```ts
import YINI from 'yini-parser'

const config = YINI.parse(`
    // YINI is a simple, human-readable configuration file format.

    // Note: In YINI, spaces and tabs don't change meaning - 
    // indentation is just for readability.

    ^ App                      // Definition of section (group) "App" 
      name     = 'My Title'    // Keys and values are written as key = value
      items    = 25
      darkMode = true          // "ON" and "YES" works too

        // Sub-section of the "App" section
        ^^ Special
           primaryColor = #336699   // Hex number format
           isCaching    = false     // "OFF" and "NO" works too
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

- ▶️ Link to [examples/](https://github.com/YINI-lang/yini-parser-typescript/tree/main/examples) files.
- ▶️ Link to [Demo Apps](https://github.com/YINI-lang/yini-demo-apps/tree/main) with complete basic usage.

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

## Bigger Example

```js
const YINI = require('yini-parser').default; // Or: import YINI from 'yini-parser';

const config = YINI.parse(`
    // This is a comment in YINI
    // YINI is a simple, human-readable configuration file format.

    // Note: In YINI, spaces and tabs don't change meaning - indentation is just
    // for readability.

    /*  This is a block comment

        In YINI, section headers use repeated characters "^" at the start to
        show their level: (Section header names are case-sensitive.)

        ^ SectionLevel1
        ^^ SectionLevel2
        ^^^ SectionLevel3
    */

    ^ App                           // Definition of section (group) "App" 
      title = 'My App'
      items = 25
      debug = ON                    // "true" and "YES" works too

    ^ Server                        // Definition of section (group) "Server"
      host = 'localhost'
      port = 8080
      useTLS = OFF                  // "false" and "NO" works too

        // Sub-section of "Server"
        ^^ Login
          username = 'user_name'
          password = 'your_password_here'
    
    /END // (only optional)
`);

console.log(config);
```

### Output:
```js
// JS object
{
    App: {
        title: 'My App', 
        items: 25, 
        debug: true
    },
    Server: {
        host: 'localhost',
        port: 8080,
        useTLS: false,
        Login: { 
            username: 'user_name', 
            password: 'your_password_here'
        }
    }
}
```

### Output in JSON:
```json
{
    "App": {
        "title": "My App",
        "items": 25,
        "debug": true
    },
    "Server": {
        "host": "localhost",
        "port": 8080,
        "useTLS": false,
        "Login": {
            "username": "user_name",
            "password": "your_password_here"
        }
    }
}
```

---

## 🛠 Roadmap

1. **Improve existing functionality** — Ongoing improvements to core parsing, richer diagnostics, and expanded QA for areas not yet fully covered.
2. **Full spec compliance** — Complete support for all features in the YINI Specification v1.0.0 (and the latest RCs).
   - Progress and current status are tracked in [FEATURE-CHECKLIST.md](https://github.com/YINI-lang/yini-parser-typescript/blob/main/FEATURE-CHECKLIST.md).
3. **Schema validation (future)** — Possible future expansion to support schema/contract validation for stricter type-safe configs.
4. **Ecosystem integration** - Broader and additional support for tooling, and other ecosystem projects.

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