# Development Setup

## Pre-requisites
- `nvm` (Node Version Manager)
- `java` (Needed to generate new code ANTLR, Java 22+)

**Only if Windows:**
- `Git Bash`

---

Notes:
- The parser currently uses CommonJS (CJS module format) module format for maximum compatibility with Jest and Node.js.

---

## Project Structure
Brief overview of the directory structure in this project:
```txt
src/            → Source code
tests/          → Unit tests
docs/           → Documentation files
dist/           → Build output
package.json    → Node.js dependencies, scripts, etc.
```

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

## Environment Variables
### NODE_ENV
Defacto Node.js modes (environments).

| Value        | Meaning |
|--------------|---------|
| `development`| Development mode — enables debugging and detailed logging.|
| `production` | Production mode — enables optimizations, disables debug output.|
| `test`       | Test mode — used when running automated tests.|

### APP_ENV
More custom envs (more finer-grained control than what only NODE_ENV allows) for this project.

| Value        | Meaning |
|--------------|---------|
| `local`      | Local development and testing, shows more debug info, etc.|
| `ci`         | Running in Continuous Integration pipelines.|
| `staging`    | Running in a staging environment.|
| `production` | Deployed in live production environment.|

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
