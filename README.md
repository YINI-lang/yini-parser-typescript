# yini-parser

The official TypeScript / Node.js parser for **YINI** (by the YINI-lang project) — an INI-inspired, human-readable configuration format with explicit structure, nested sections, comments, and deterministic parsing.  

[![npm version](https://img.shields.io/npm/v/yini-parser.svg)](https://www.npmjs.com/package/yini-parser) [![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![All Test Suites](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml) [![All Regression Tests](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-regression-tests.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-regression-tests.yml) [![Grammar Drift Check](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-grammar-drift-check.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-grammar-drift-check.yml) [![npm downloads](https://img.shields.io/npm/dm/yini-parser)](https://www.npmjs.com/package/yini-parser)  

YINI is intended to emphasize clarity, readability, explicit structure, and predictable parsing, while remaining simple, but not simplistic, and without relying on implicit or indentation-sensitive structure.

## Quick Start

```sh
npm install yini-parser
```

```ts
import YINI from 'yini-parser'

const config = YINI.parse(`
^ App
name     = 'My App'
list     = ['web', 'api']
darkMode = true  // Yes/On works too

    ^^ Features
    caching = on
    object  = { logging: true, mode: 'debug' }
`)

console.log(config.App.name)              // My App
console.log(config.App.Features.caching)  // true
```

See the [YINI specification and documentation](https://yini-lang.org/refs/specification).

---

## Format characteristics

- **Human-readable** — Uses explicit syntax and indentation-independent structure.
- **Structured configuration model** — Supports sections, nested sections, lists, objects, booleans, and null.
- **Predictable parsing** — Explicit syntax with clear rules and deterministic parsing behavior.
- **TypeScript and Node.js integration** — Supports parsing from strings and files.
  
---

## What YINI looks like in practice
> A basic YINI configuration example, showing a section, a nested section, and comments:  
![YINI Config Example](./samples/basic.yini.png)
Source: [basic.yini](./samples/basic.yini)

- [Demo Apps](https://github.com/YINI-lang/yini-demo-apps/tree/main) with usage examples.

---

## Configuration-oriented design
- **Indentation-independent structure:** Spaces and tabs never change meaning, so files can be reformatted without changing structure.
- **Explicit nesting:** Hierarchy is defined with section markers such as `^`, `^^`, and `^^^`, rather than by indentation.
- **Multiple data types:** Supports booleans (`true` / `false`, `yes` / `no`, etc.), numbers, lists, and inline objects, with explicit string syntax.
- **Comment support:** YINI supports `//`, `#`, block comments (`/* ... */`), and full-line `;` comments for documenting configuration directly in the file.
- **Predictable parsing:** Clear rules with optional strict and lenient modes for different use cases.
- **Clear hash comments:** Outside string literals, `#` always starts a comment; hexadecimal values use `0x...` or `hex:...`.
- **Predictable parsing:** Clear rules with optional strict and lenient modes (enforced by the parser) for different use cases.

---

## Usage

### Install with your package manager

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
// If your setup handles default interop differently, try:
// const YINI = require('yini-parser');

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

## 📂 More Examples

- Additional [YINI examples](https://yini-lang.org/learn-yini/examples/?utm_source=yini-parser-ts&utm_medium=github&utm_campaign=repo-link&utm_content=readme).

### Example 2
> A real-world YINI configuration example, showing sections, nesting, comments, and multiple data types:  
![YINI Config Example](./samples/config.yini.png)
Source: [config.yini](./samples/config.yini)

---

## 🧪 Testing and Stability

This parser is covered by smoke, integration, and regression tests across lenient, strict, and metadata-enabled modes.

---

## Links
- [YINI Homepage](https://yini-lang.org)  
- [YINI Specification](https://yini-lang.org/refs/specification)  
- [YINI CLI on GitHub](https://github.com/YINI-lang/yini-cli)  
- [YINI Demo Apps](https://github.com/YINI-lang/yini-demo-apps/tree/main)  
- [YINI-lang Project](https://github.com/YINI-lang)  

---

## 🤝 Contributing
Bug reports, feature requests, discussions, and code contributions are welcome.
- [Open an Issue](https://github.com/YINI-lang/yini-parser-typescript/issues)
- [Start a Discussion](https://github.com/YINI-lang/yini-parser-typescript/discussions)
  
GitHub Issues and Discussions are available for feedback and project discussion.

### Documentation
- [Project Setup](https://github.com/YINI-lang/yini-parser-typescript/blob/main/docs/Project-Setup.md) — How to run, test, and build the project, etc.
- [Conventions](https://github.com/YINI-lang/yini-parser-typescript/blob/main/docs/Conventions.md) — Project conventions, naming patterns, etc.

---

## License
This project is licensed under the Apache License 2.0 — see the [LICENSE](./LICENSE) file for details.

In this project on GitHub, the `libs` directory contains third-party software and each is licensed under its own license which is described in its own license file under the respective directory under `libs`.

---

**^YINI ≡**  
> YINI is a human-readable configuration format designed for clarity, readability, explicit structure, and predictable parsing.
> 
> See the specification for syntax and format details.  

[yini-lang.org](https://yini-lang.org/?utm_source=github&utm_medium=referral&utm_campaign=yini_parser_ts&utm_content=readme_footer) · [YINI-lang on GitHub](https://github.com/YINI-lang)  
