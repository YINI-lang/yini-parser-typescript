>~ YINI  ≡
---
# YINI Parser - TypeScript

**YINI Parser for TypeScript** — an simple, human-friendly parser and reader for the YINI configuration file format. This library implements the official YINI specification using TypeScript + ANTLR4.

YINI is a configuration file format (see [spec] for details):
https://github.com/YINI-lang/YINI-spec

---

## ✨ Features
See [FEATURE-CHECKLIST.md](./FEATURE-CHECKLIST.md) for the current checklist of implemented YINI features.

- Simple, strict parsing
- Familiar config file style (inspired by INI, YAML, TOML)
- Easy programmatic usage

## 🚀 Installation

```sh
npm install yini-parser
```

## Usage

```ts
import YINI from 'yini-parser';

// Parse from string
const config = YINI.parse(`
^ Database
host = localhost
port = 5432
`);

// Parse from file
const configFromFile = YINI.parseFile('./config.yini');
```

## API
--TODO/WIP--

---

## 📚 Documentation
- [Development Setup](./docs/Development%20Setup.md) — How to run, test, and build the project, etc.
- [Conventions](./docs/Conventions.md) — Project conventions, naming patterns, etc.

## License
This project is licensed under the Apache-2.0 license - see the [LICENSE](<./LICENSE>) file for details.

In this project on GitHub, the `libs` directory contains third party software and each is licensed under its own license which is described in its own license file under the respective directory under `libs`.
