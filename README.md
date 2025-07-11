>~ YINI  ≡
---
# YINI Parser - TypeScript

**YINI Parser for TypeScript** — a simple, human-friendly parser and reader for the YINI configuration file format. This library implements the official YINI specification using TypeScript + ANTLR4.

YINI is a configuration file format (see [spec] for details):
https://github.com/YINI-lang/YINI-spec

---

## ✨ Features
- Simple, strict parsing.
- Familiar config file style (inspired by INI, YAML, TOML).
- Easy programmatic usage.
- Only the `YINI` class is exported; all internal details are private.

### Limitations
Not all features of the full YINI specification are implemented yet.

See [FEATURE-CHECKLIST.md](./FEATURE-CHECKLIST.md) for the current list of implemented YINI features.

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
^ Database
host = localhost
port = 5432
`);

// Parse from file.
const configFromFile = YINI.parseFile('./config.yini');
```

---

## API

Only the `YINI` class is exposed in the public API, with two static methods: `parse` and `parseFile`.

### `YINI.parse(yiniContent: string, isStrict?: boolean, bailSensitivity?: "auto" | 0 | 1 | 2): object`

Parses YINI code from a string.  
- `yiniContent`: The YINI configuration as a string.
- `isStrict`: (optional, default `false`) Parse in strict mode.
- `bailSensitivity`: (optional, default `0`) Error tolerance level.

Returns a JavaScript object representing the parsed configuration (YINI content).

### `YINI.parseFile(filePath: string, isStrict?: boolean, bailSensitivity?: "auto" | 0 | 1 | 2): object`

Parses YINI code from a file.
- `filePath`: Path to the `.yini` file.
- Other parameters are the same as `parse(..)`.

Returns a JavaScript object representing the parsed YINI configuration file.

---

## Example Output
--TODO--

---

## 📚 Documentation
- [Development Setup](./docs/Development%20Setup.md) — How to run, test, and build the project, etc.
- [Conventions](./docs/Conventions.md) — Project conventions, naming patterns, etc.

---

## License
This project is licensed under the Apache-2.0 license - see the [LICENSE](<./LICENSE>) file for details.

In this project on GitHub, the `libs` directory contains third party software and each is licensed under its own license which is described in its own license file under the respective directory under `libs`.

---

> ~ **YINI ≡**  
> [https://yini-lang.org](https://yini-lang.org)