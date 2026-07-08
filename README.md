# yini-parser

The official TypeScript / Node.js parser for **YINI** (by the YINI-lang project) — a human-readable, INI-inspired, indentation-insensitive configuration format with clear nested sections, explicit structure, comments, and predictable parsing.  

[![npm version](https://img.shields.io/npm/v/yini-parser.svg)](https://www.npmjs.com/package/yini-parser)
[![YINI Test Suite](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/yini-test-suite.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/yini-test-suite.yml)
[![All Test Suites](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml)
[![Grammar Drift Check](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-grammar-drift-check.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-grammar-drift-check.yml)
[![npm downloads](https://img.shields.io/npm/dm/yini-parser)](https://www.npmjs.com/package/yini-parser)  

Useful links:
- [YINI homepage](https://yini-lang.org?utm_source=github&utm_medium=referral&utm_campaign=yini_parser_ts&utm_content=readme_project_links)
- [yini-parser on GitHub](https://github.com/YINI-lang/yini-parser-typescript)
- [Report an Issue](https://github.com/YINI-lang/yini-parser-typescript/issues)
- [Start a Discussion](https://github.com/YINI-lang/yini-parser-typescript/discussions)

YINI is intended to emphasize clarity, readability, explicit structure, and predictable parsing, while remaining simple, but not simplistic, and without relying on implicit or indentation-sensitive structure.

## Copy-paste test

Test the package in under one minute.

Install:

```sh
npm install yini-parser
```

Parse a YINI string:

```ts
import YINI from 'yini-parser'

const data = YINI.parse(`
^ Application
name = "demo"

^^ Server
port = 8080
`)

console.log(data)
```

Expected output:

```ts
{
  Application: {
    name: 'demo',
    Server: {
      port: 8080,
    },
  },
}
```

---

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

### Modes and `/END`

`yini-parser` runs in lenient mode by default. In lenient mode, the document terminator `/END` is optional.

Strict mode requires `/END` unless you explicitly override `requireDocTerminator`:

```ts
const config = YINI.parseFile('./config.yini', {
  strictMode: true,
})
```

If strict mode reports a missing `/END`, either add `/END` as the final significant line or parse with the default lenient mode.

See the [YINI specification and documentation](https://yini-lang.org/refs/specification?utm_source=github&utm_medium=referral&utm_campaign=yini_parser_ts&utm_content=readme).

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
**Note:** The default export is the main API. Named exports such as `parse`, `parseFile`, and `parseForTooling` are also available from the package entry.
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

## Why YINI?

YINI is intended for configuration files where human readability, explicit structure, and predictable parsing are more important than minimal syntax or maximum flexibility.

Compared with common configuration formats:
- **INI:** YINI supports clearer nested sections and typed values.
- **JSON:** YINI supports comments and is easier to edit by hand.
- **YAML:** YINI does not use indentation to define structure.
- **TOML:** YINI uses explicit section markers for hierarchy instead of dotted table names.

The same small configuration can be written in several formats:

### YINI
```ini
^ Application
name = 'demo'
environment = 'dev'

^^ Server
host = 'localhost'
ports = [8080, 8081]

^^^ TLS
enabled = true
mode = 'optional'
```

- `Application` contains the top-level application settings.
- `Server` is nested under `Application`.
- `TLS` is nested under `Server`.
- The section markers `^` make the nesting explicit. Indentation is optional and not required for structure.
- Strings can use either `'` or `"`.

### JSON
```json
{
  "Application": {
    "name": "demo",
    "environment": "dev",
    "Server": {
      "host": "localhost",
      "ports": [8080, 8081],
      "TLS": {
        "enabled": true,
        "mode": "optional"
      }
    }
  }
}
```

### YAML
```yaml
Application:
  name: demo
  environment: dev
  Server:
    host: localhost
    ports:
      - 8080
      - 8081
    TLS:
      enabled: true
      mode: optional
```

### TOML
```toml
[Application]
name = "demo"
environment = "dev"

[Application.Server]
host = "localhost"
ports = [8080, 8081]

[Application.Server.TLS]
enabled = true
mode = "optional"
```

Note: YINI may not be the right choice when you need mature ecosystem support, existing schema tooling, or maximum compatibility with infrastructure that already expects JSON, YAML, or TOML.

---

## Parser implementation

`yini-parser` uses TypeScript/JavaScript parser code generated by ANTLR, a parser-generator tool.

The generated parser files are included in the published npm package. Users do **not** need Java or the ANTLR generator tool to install or use `yini-parser`.

The `antlr4` dependency is the small runtime library that the generated lexer and parser call while reading YINI input. It is needed at runtime, but you normally do not interact with it directly.

The ANTLR generator JAR is only needed by maintainers when regenerating parser sources from the grammar, and it is not included in the published npm package.

---

## Feedback and bug reports

If you find a problem or want to give feedback, use GitHub:

- [Report a bug or issue](https://github.com/YINI-lang/yini-parser-typescript/issues)
- [Start a discussion](https://github.com/YINI-lang/yini-parser-typescript/discussions)

When reporting parser behavior, it is helpful to include:
- The YINI input that caused the issue.
- The expected result.
- The actual result or error message.
- The installed `yini-parser` and Node.js version.

---

## 🧪 Testing and Stability

This parser is covered by smoke, integration, and regression tests across lenient, strict, and metadata-enabled modes.

It has also been run against the shared external
[`yini-test-suite`](https://github.com/YINI-lang/yini-test-suite) conformance suite
for YINI Specification 1.0.0 RC 6.

Current conformance result:
- 360 passed
- 0 failed
- Lenient and strict modes covered
- Smoke and golden test suites covered

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
