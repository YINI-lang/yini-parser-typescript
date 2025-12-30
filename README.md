# YINI Parser for Node.js
> **Readable configuration without YAML foot-guns or JSON noise.**  

The official TypeScript / Node.js parser for YINI. An INI-inspired configuration format with clear nesting, explicit types, and predictable parsing.

[![npm version](https://img.shields.io/npm/v/yini-parser.svg)](https://www.npmjs.com/package/yini-parser) [![All Test Suites](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml) [![All Regression Tests](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-regression-tests.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-regression-tests.yml) [![Grammar Drift Check](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-grammar-drift-check.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-grammar-drift-check.yml)

Designed to bring structure, clarity, and predictable behavior to real-world configuration needs. Well suited for applications, tools, and services that need readable yet structured configuration.

```sh
npm install yini-parser
```

```ts
import YINI from 'yini-parser'
const config = YINI.parseFile('./config.yini')
```

➡️ See full [documentation or YINI format specification](https://github.com/YINI-lang/YINI-spec)

---

## YINI Parser – (source code in TypeScript)

A runtime parser for the official [YINI configuration file format](https://github.com/YINI-lang/YINI-spec).  

The parser follows the official YINI specification and is implemented in TypeScript.

---

### Who is this for?

YINI is designed as an ideal option for application developers, platform teams, DevOps engineers, and anyone maintaining complex configuration at scale.

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

## 📂 Examples

See the [examples/](https://github.com/YINI-lang/yini-parser-typescript/tree/main/examples) folder for:

- Basic YINI file with common types and comments
- Nested sections example
- Comparison with JSON/YAML config

These examples are also included in the npm package.

---

## 🙋‍♀️ Why YINI?
- **Indentation-independent structure:** The YINI config format is indentation-independent, meaning spaces and tabs never affect meaning.
- **Explicit nesting for easy refactoring & large configs:** It uses clear header markers (`^`, `^^`, `^^^`) to define hierarchy (like in Markdown), without long dotted keys.
- **Multiple data types:** Supports boolean literals (`true` / `false`, `Yes` / `No`, etc), numbers, arrays (lists), and JS-style objects natively, with explicit string syntax.
- **Comments support:** YINI supports multiple comment styles (`#`, `//`, `/* ... */`, and `;`) allowing one to document config directly in the file.
- **Predictable parsing rules:** Fewer production surprises, well-defined rules with optional strict and lenient modes, for different use cases.

---

## ✨ Features
- Simple syntax (supports both strict and lenient modes).
- Familiar config file style (inspired by INI, JSON, Python, and Markdown).
- Easy programmatic usage.
- Only the `YINI` class is exported; all internal details are private.
- Arrays/Lists (bracketed): `list = [10, 20, 30]`
- JavaScript-style objects.

⭐ **Enjoying YINI?** If you think this project is interesting, [consider giving it a star on GitHub](https://github.com/YINI-lang/yini-parser-typescript) — it's greatly appreciated.

---

## 🧪 Stability & Guarantees

This parser is continuously validated through comprehensive regression and smoke tests, ensuring deterministic parsing behavior across default, strict, and metadata-enabled modes.

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

## 🛠 Roadmap

1. **Improve existing functionality** — Ongoing improvements to core parsing, richer diagnostics, and expanded QA for areas not yet fully covered.
2. **Full spec compliance** — Complete support for all features in the YINI Specification v1.0.0 (and the latest RCs).
   - Progress and current status are tracked in [FEATURE-CHECKLIST.md](https://github.com/YINI-lang/yini-parser-typescript/blob/main/FEATURE-CHECKLIST.md).
3. **Schema validation (future)** — Possible future expansion to support schema/contract validation for stricter type-safe configs.
4. **Ecosystem integration** - Broader and additional support for tooling, and other ecosystem projects.

### Planned & Upcoming Features
Some advanced YINI features are still evolving and are tracked transparently.

You can follow progress in the [YINI parser GitHub repo-FEATURE-CHECKLIST](https://github.com/YINI-lang/yini-parser-typescript/blob/main/FEATURE-CHECKLIST.md). Contributions and feature requests are welcome!

---

## 🤝 Contributing
We welcome feedback, bug reports, feature requests, and code contributions!
- [Open an Issue](https://github.com/YINI-lang/yini-parser-typescript/issues)
- [Start a Discussion](https://github.com/YINI-lang/yini-parser-typescript/discussions)
  

If this library is useful to you, a GitHub star helps guide future development.

---

## 📚 Documentation
- [Development Setup](https://github.com/YINI-lang/yini-parser-typescript/blob/main/docs/Development-Setup.md) — How to run, test, and build the project, etc.
- [Conventions](https://github.com/YINI-lang/yini-parser-typescript/blob/main/docs/Conventions.md) — Project conventions, naming patterns, etc.

---

## Links
- ➡️ [Read the YINI Specification](https://github.com/YINI-lang/YINI-spec/blob/release/YINI-Specification.md#table-of-contents)  
  *Full formal spec for the YINI format, including syntax and features.*

- ➡️ [YINI CLI on GitHub](https://github.com/YINI-lang/yini-cli)  
  *TypeScript source code, issue tracker, and contributing guide.*

- ➡️ [YINI Project](https://github.com/YINI-lang)  
  *YINI home on GitHub.*

---

## License
This project is licensed under the Apache-2.0 license - see the [LICENSE](<./LICENSE>) file for details.

In this project on GitHub, the `libs` directory contains third party software and each is licensed under its own license which is described in its own license file under the respective directory under `libs`.

---

**^YINI ≡**  
> An INI-inspired configuration format with clear structure.  

[yini-lang.org](https://yini-lang.org) · [YINI on GitHub](https://github.com/YINI-lang)  
