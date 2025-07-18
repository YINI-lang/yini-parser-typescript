# Development Setup

## Pre-requisites
- `nvm` (Node Version Manager)
- `java` (Needed to generate new code ANTLR, Java 22+)

**Only if Windows:**
- `Git Bash`

---

## 🏗 Main Techs
- Node.js
- TypeScript
- Jest (tests)
- GitHub Actions (CI)
- ESLint (code style / linting)
- ANTLR4 grammar integration

---

Notes:
- The parser currently uses CommonJS (CJS module format) module format for maximum compatibility with Jest and Node.js.

In `package.json`, this line must be present:
```json
...
"type": "commonjs"
...
```

This means any .js files (config files, etc) must use `require()` instead of `import`.

---

## Project Overview
Brief overview of the directory structure in this project:
```txt
src/            → Source code
tests/          → Unit tests
docs/           → Documentation files
dist/           → Build output
package.json    → Node.js dependencies, scripts, etc.
```

See more in the section, "Project Structure".

---

## Quick Start

**To run the parser:**

1. In `Git Bash` or `Bash`, go to the root of this project (where you have this project saved on your drive).
2. Make sure you are running the correct version of Node, it should match or be higher than the version in the file `.nvmrc`.
    - You can check the current version of node by typing: `node -v`
3. In here type (to just run the parser quickly):
    > npm start:dev
4. (Optionally) Runs all (Jest) tests.
   > npm test


## Available npm scripts
Here's a short description of each script (in `package.json`) in this project.

- `npm start:dev` — Runs the parser (`src/index.ts`) directly using `ts-node`.
- `npm test` — Runs all (Jest) tests.
- `npm run test:smoke` — Runs only the smoke tests (located in `tests/smoke`).
- `npm run antlr` — Runs the ANTLR4 code generation.
- `npm run tsc` — (Trans)compiles all `.ts` files into `.js` files. Normally not needed, since we use `ts-node` to run `.ts` files directly. Use only in special cases (e.g. for debugging). **Important:** any lingering `.js` files should be cleaned (using `npm run clean:ts-js`) before running again — otherwise old `.js` files may cause conflicts.
- `npm run start-w-clean` — Runs the TypeScript compiler, cleans old `.js` files, and then starts the project. Useful for clean testing and running the parser.
- `npm run lint` — Runs ESLint on all `.ts` files in `src/` to check code style and catch possible errors.
- `npm run clean:ts-js` — Runs `scripts/clean-ts-js.sh` to remove compiled `.js` and `.js.map` files. Helps keep the working directory clean, since we use `ts-node` to run `.ts` files directly.
- `prepublishOnly` — This is a npm lifecycle script, it runs automatically ONLY when one runs `npm publish` or `npm pack`. This ensures that every time when publishing, the code is linted, tested, and built, just before it goes to npm.

### Running All Tests
To run all tests (smoke, unit, integration):
> npm test

### To Test the Grammar

1. In `Git Bash`, `Bash` (or possibly in `CMD` depending on your setup). In the root, type:
    > make tokens

### Generating Source

Generating source code from grammar files with ANTLR4. Usually this is not needed, only if new or updated grammar files are used.

- Prefferably you can use option A or optionally with option B:
  * A. In console:
    > `npm run antlr`
  * B. In `Git Bash`, `Bash` (or possibly in `CMD` depending on your setup). In the root, type:
    > make generate

---

## Project Structure
Here's an overview of the project's directory structure — to help users understand where things are and how the project is organized.

```txt
/
├── grammar/                      // ANTLR4 grammar source files (.g4)
│   ├── v1.x.x-beta/              // Versioned grammar snapshots  (archived)
│   └── ...
|
├── src/                          // Main source code
│   ├── config/                   // Environment/config-specific code
│   ├── core/                     // All the main building blocks (visitor, builder, types, error handling, etc)
│   ├── grammar/                  // ANTLR-generated artifacts: parser/lexer/visitor (.ts)
│   ├── parser/                   // All code that parses or extracts specific things (header parts, numbers, booleans, etc)
│   ├── utils/                    // All general helpers/utility functions
│   └── index.ts                  // Main entry point of the parser
|
├── tests/                        // Test code
│   ├── smoke/                    // Smoke tests
│   ├── unit/                     // Unit tests
|   ├── integration/              // Integration tests
│   └── fixtures/                 // ALL test data (**in one place**)
│       ├── valid/                // Fixture valid data (mostly for integration tests)
│       ├── invalid/              // Fixture invalid data (mostly for integration tests)
│       └── smoke-fixtures/       // More dedicated fixtures for smoke tests
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

## Environment Variables

Since this is a library (as opposed to a Web/App), we don't (need) care about a special "development" and "staging" app environments / branches. So there's no "deploy" per environment.

**Note:**
- There is no `.env.development`, `.env.staging` etc. - the package scripts sets NODE_ENV as needed, and the code handles the rest.
- However, there are test and CI environments, but these are for running tests and builds, not for staging deploys.

### NODE_ENV
Defacto Node.js modes (environments).
Note: NODE_ENV is global.

| Value        | Meaning |
|--------------|---------|
| `development`| Global development mode — enables debugging and detailed logging.|
| `production` | Global production mode — enables optimizations, disables debug output.|
| `test`       | Global Test mode — used when running automated tests.|

### APP_ENV
More custom envs (more finer-grained control than what only NODE_ENV allows) for this project.
Note: APP_ENV is global.

| Value        | Meaning |
|--------------|---------|
| `local`      | Local development and testing, shows more debug info, etc.|
| `ci`         | Running in Continuous Integration pipelines.|
| <strike>`staging`</strike>    | <strike>Running in a staging environment.</strike>|
| `production` | Deployed in live production environment.|

### DEV and DEBUG Flags
During development some flags can be set, these are set and passed as arguments when starting processes.

Note: These flags are local.

| Cmd argument | Function | Meaning |
|--------------|----------|---------|
| `isDev=1`    | isDev()  | Local development and testing, shows more info, etc.|
| `isDebug=1`  | isDebug()| Local debugging and testing, shows more detailed info, etc.|

### Start with Different Environments and Flags

Under development, different environments and flags can be used by starting different scripts in `package.json`.

Note: This library should never set or modify values in `process.env`, **only read from it**. Changing it in the library will cause side effect in users application and other dependencies.

- `npm run start:debug`
- `npm run start:dev`
- `npm run start:dev:debug`


---

## Packages

Some of the package used.

### `ts-node`

Used to run .ts files directly, should only be used under "development".
In production, the trans-compiled .js file should be run normally with `node`.

**Normally with Node.js:**
```bash
tsc  # compiles TypeScript to JavaScript
node dist/index.js  # runs the compiled JS
```

**With ts-node:**
```bash
ts-node src/index.ts  # runs TypeScript file directly
```
