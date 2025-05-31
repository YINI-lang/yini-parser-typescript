# Setup of Development Environment

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
