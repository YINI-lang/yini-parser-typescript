# Development Setup

## Pre-requisites

**In Windows:**
- `Git Bash`

**All:**
- `NVM`

---

## Quick Start

**To run the parser:**

1. In `Git Bash` or `Bash`, go to the root of this project (where you have this project saved on your drive).
2. Make sure you are running the correct version of Node, it should match or be higher than the version in the file `.nvmrc`.
    - You can check the current version of node by typing: `node -v`
3. In here type:
    > npm start

## NPM and Project Scripts
Here's a short description of each script (in `package.json`) in this project.

- `npm start` - To run the parser (by running `src/index.ts` with `ts-node`).
- `npm run test`    - Runs all (Jest) tests.
- `npm run test:smoke` - Runs only the smoke tests (in `tests/smoke`).
- `npm run tsc`     - (Trans)-Compiles all .ts files into .js files. This is normally not needed due to we are using ts-node to run the .ts files directly. Only use in special cases, for special debugging etc. Note: Any lingering .js files should be deleted (cleaned with `clean:ts-js`) before running again, otherwise these .js may cause update problems.
- `npm run start-w-clean`   - Runs the TypeScript compiler, cleans old compiled .js files, and then starts the project. Useful for clean testing/running the parser.
- `npm run lint`     - Runs ESLint on all .ts files in src/ to check code style and catch possible errors.
- `npm run clean:ts-js`     - Runs the `scripts/clean-ts-js.sh` script to clean up compiled .js and .js.map files from the project. Helps keep the working directory clean from lingering .js files (these are not needed due to we are using `ts-node` to run .ts files directly).

## To Test the Grammar

1. In `Git Bash`, `Bash` (or possibly in `CMD` depending on your setup). In the root, type:
    > make tokens

## Generating Source

Generating source code from grammar files with ANTLR4. Usually this is not needed, only if new or updated grammar files are used.

1. In `Git Bash`, `Bash` (or possibly in `CMD` depending on your setup). In the root, type:
    > make generate

---

## Packages

Some of the package used.

### `ts-node`

It’s like node, but for .ts files.

**Normally with Node.js:**
```bash
tsc  # compiles TypeScript to JavaScript
node dist/index.js  # runs the compiled JS
```

**With ts-node:**
```bash
ts-node src/index.ts  # runs TypeScript file directly
```
