# YINI Parser – TypeScript

[![npm version](https://img.shields.io/npm/v/yini-parser.svg)](https://www.npmjs.com/package/yini-parser) [![All Tests](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml/badge.svg)](https://github.com/YINI-lang/yini-parser-typescript/actions/workflows/run-all-tests.yml)

> ⚠️ This package is in **alpha**. The API and features may change. Not all parts of the YINI specification are implemented yet.

**YINI Parser in TypeScript** — a runtime library for Node.js.  
A parser / reader for the [YINI configuration file format](https://github.com/YINI-lang/YINI-spec).  

This library implements the official YINI specification using TypeScript + ANTLR4.

YINI is a simple, human-friendly configuration format inspired by INI and JSON.

---

## ✨ Features
- Simple syntax (supports both strict and lenient modes).
- Familiar config file style (inspired by INI, YAML, TOML).
- Easy programmatic usage.
- Only the `YINI` class is exported; all internal details are private.

### Limitations
Not all features of the full YINI specification are implemented yet.

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

> Only import the main class:
>
> ```ts
> import YINI from 'yini-parser';
> ```

### Example:
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
{
   App:{
      title: "My App Title",
      items: 25,
      isDarkTheme: false
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