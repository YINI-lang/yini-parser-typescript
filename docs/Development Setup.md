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

- `npm start` - Runs the parser (`src/index.ts`) directly using `ts-node`.
- `npm run test` - Runs all (Jest) tests.
- `npm run test:smoke` - Runs only the smoke tests (located in `tests/smoke`).
- `npm run tsc` - (Trans)compiles all `.ts` files into `.js` files. Normally not needed, since we use `ts-node` to run `.ts` files directly. Use only in special cases (e.g. for debugging). **Important:** any lingering `.js` files should be cleaned (using `npm run clean:ts-js`) before running again — otherwise old `.js` files may cause conflicts.
- `npm run start-w-clean` - Runs the TypeScript compiler, cleans old `.js` files, and then starts the project. Useful for clean testing and running the parser.
- `npm run lint` - Runs ESLint on all `.ts` files in `src/` to check code style and catch possible errors.
- `npm run clean:ts-js` - Runs `scripts/clean-ts-js.sh` to remove compiled `.js` and `.js.map` files. Helps keep the working directory clean, since we use `ts-node` to run `.ts` files directly.

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
