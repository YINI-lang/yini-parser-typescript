# YINI Parser - TypeScript

**YINI Parser for TypeScript** — an simple, human-friendly parser and reader for the YINI configuration file format. This library implements the official YINI specification using TypeScript + ANTLR4.

---

## ✨ Features
--TODO/WIP--

---

## 🏗 Main Techs
- Node.js
- TypeScript
- Jest (tests)
- GitHub Actions (CI)
- ESLint (code style / linting)
- ANTLR4 grammar integration

---

## 🚀 Getting Started
--TODO/WIP--

## Project Structure
Here's an overview of the project's directory structure — to help users understand where things are and how the project is organized.

```txt
/
├── grammar/                      // ANTLR4 grammar source files (.g4)
│   ├── v1.x.x-beta/              // Versioned grammar snapshots  (archived)
│   └── ...
|
├── src/                          // Main source code
│   ├── grammar/                  // Generated ANTLR4 parser/lexer/visitor (.ts)
│   ├── literal-parsers/          // Literal parser implementations
│   ├── utils/                    // Utility modules
│   └── index.ts                  // Entry point of the parser
|
├── tests/                        // Test code
│   ├── fixtures/                 // Test fixture data (for unit/integration tests)
│   ├── smoke/                    // Smoke tests
│   │   └── smoke-fixtures/       // Dedicated fixtures for smoke tests
│   ├── unit/                     // Unit tests
|   └── integration/              // Integration tests
|
├── scripts/                      // Utility scripts (e.g. clean-ts-js.sh)
├── docs/                         // Project documentation
├── libs/                         // Vendored libraries (e.g. antlr4)
│   └── antlr4/
├── dist/                         // Compiled JS artifacts (output local directory)
├── .github/                      // GitHub workflows (CI/CD)
│   └── workflows/
├── .husky/                       // Git hooks (managed by husky)
├── .vscode/                      // VSCode project settings (optional)
├── Makefile                      // Build automation (ANTLR4 code generation, etc.)
├── package.json                  // Node.js dependencies, scripts, etc.
├── tsconfig.json                 // Config for TypeScript
├── jest.config.js                // Config for Jest testing
├── .gitignore                    // Git exclusions
└── README.md                     // Project overview and documentation
```

---

## 📚 Documentation

- [Development Setup](./docs/Development%20Setup.md) — How to run, test, and build the project.
- [Style Guide](./docs/Style%20Guide.md) — Project conventions, naming patterns, and coding style.

## License
This project is licensed under the Apache-2.0 license - see the [LICENSE](<./LICENSE>) file for details.

`libs` directory contains third party software and each is licensed under its own license which is described in its own license file under the respective directory under `libs`.
