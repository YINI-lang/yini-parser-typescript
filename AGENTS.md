# AGENTS.md

> AI agent instructions for this repository.
> Read this before making any changes to the codebase.
> If any instruction in this file is unclear, ambiguous, or conflicts with the repository state, stop and ask the human maintainer before proceeding.

## Project Overview

- **Name:** `yini-parser` (`yini-parser-typescript` repository).
- **Purpose:** Official TypeScript / Node.js parser for YINI, a human-readable configuration format with explicit structure and predictable parsing.
- **Language/runtime:** TypeScript 5.x on Node.js `>=20`.
- **Module system:** CommonJS. Keep `"type": "commonjs"` and use CommonJS-compatible config files.
- **Package manager:** npm. This repo uses `package-lock.json`.
- **Parser stack:** ANTLR4-generated lexer/parser plus handwritten TypeScript runtime, AST builder, object builder, diagnostics, and public API.
- **Test stack:** Jest with `ts-jest`.
- **Monorepo:** No.

## Repository Structure

```text
.
|-- src/
|   |-- YINI.ts                         # Public class API: parse, parseFile, parseForTooling.
|   |-- index.ts                        # Package entry and public exports.
|   |-- core/                           # Runtime, pipeline, AST/object builders, diagnostics, options.
|   |-- core/options/                   # Public option normalization and fail-level mapping.
|   |-- core/parsingRules/              # Strict/lenient/custom rule matching.
|   |-- grammar/generated/              # ANTLR-generated TypeScript parser files.
|   |-- parsers/                        # Literal/header/shebang parsing helpers.
|   |-- types/index.ts                  # Public user-facing types.
|   `-- utils/                          # Shared helpers.
|-- grammar/v1.0.0-rc.6/                # Current ANTLR grammar source.
|-- grammar/v*/                         # Older grammar snapshots.
|-- tests/
|   |-- smoke/                          # Broad package behavior checks.
|   |-- integration/                    # Feature and option behavior checks.
|   |-- unit/                           # Utility-level checks.
|   |-- golden/                         # Fixture-to-output parser behavior checks.
|   |-- fixed-issues/                   # Regression tests for reported bugs.
|   `-- fixtures/                       # Valid/invalid/smoke parser fixtures.
|-- examples/                           # User-facing package examples.
|-- samples/                            # Example YINI/JSON/image samples.
|-- docs/                               # Project documentation.
|-- tools/                              # Auxiliary tooling, including yini-test adapter.
|-- scripts/                            # Maintenance scripts.
|-- libs/antlr4/                        # Vendored ANTLR jar.
|-- dist/                               # TypeScript build output.
|-- Makefile                            # ANTLR generation helpers.
|-- package.json
|-- tsconfig.json
`-- jest.config.js
```

## Commands

Use PowerShell on Windows unless the task requires Bash/Git Bash. In PowerShell, prefer `npm.cmd` / `npx.cmd` if script execution policy blocks `npm` / `npx` shims.

```bash
npm install
npm test
npm run test:smoke
npm run test:unit
npm run test:integr
npm run test:issues
npm run test:gold
npm run test:esm
npm run build
npm run tsc
npm run lint
npm run start:main
npm run yini-test:adapter
```

Focused Jest runs are preferred while iterating:

```bash
npx jest tests/integration/1-core-parsing/parse-option-behavior.test.ts --runInBand
npx jest tests/smoke/F-final-and-misc-smoke.test.ts --runInBand
```

ANTLR generation is only needed when grammar files change:

```bash
npm run antlr
make generate
make ci-generate
```

## Required Checks

Run the smallest relevant check first, then broaden based on risk.

For parser behavior changes:

```bash
npx jest <nearest-test-file> --runInBand
npm run test:integr
npm run test:smoke
npm run build
```

For public API, options, or diagnostics changes:

```bash
npx jest tests/integration/11-public-api-and-parse-options --runInBand
npx jest tests/integration/1-core-parsing --runInBand
npm run build
```

For grammar changes:

```bash
npm run antlr
npm run test:integr
npm run test:gold
npm run build
```

For documentation-only changes, no code test is usually required. Still run a quick grep/readback if links, commands, examples, or version text were edited.

If a required check cannot be run, say exactly why and describe what was validated instead.

## Code Style

Follow the existing TypeScript style in nearby files.

- Keep changes small and focused.
- Prefer explicit, readable logic over compact cleverness.
- Preserve public APIs unless the task explicitly asks for an API change.
- Add or update tests when behavior changes.
- Do not reformat unrelated files.
- Do not rewrite unrelated parser, grammar, or fixture content.
- Keep comments useful and sparse; explain non-obvious parser behavior, not obvious assignments.
- Preserve current naming conventions from `docs/Conventions.md`.

Naming conventions:
- Internal interfaces in `src/core/internalTypes.ts` use `I...`.
- Internal types in `src/core/internalTypes.ts` use `T...`.
- Public user-facing types in `src/types/index.ts` do **not** use `I` or `T` prefixes.
- Class names use PascalCase.
- Variables and functions generally use camelCase.
- Source files use existing local naming style: camelCase or PascalCase.

Function style:
- Prefer arrow functions for standalone helper functions when consistent with the file.
- Class methods may use normal method syntax, especially for overloads such as `YINI.parse` and `YINI.parseFile`.

## Parser Architecture Notes

The normal parse flow is:

```text
YINI.parse / YINI.parseFile
-> YiniRuntime
-> runPipeline
-> ANTLR lexer/parser
-> ASTBuilder
-> astToObject
-> optional metadata/diagnostics
```

Important files:
- `src/YINI.ts`: public API, overloads, `parseForTooling`, diagnostic code mapping.
- `src/core/runtime.ts`: file reading, shebang/BOM handling, option normalization entry point.
- `src/core/pipeline/pipeline.ts`: lexer/parser setup, error listeners, AST/object build, metadata assembly.
- `src/core/astBuilder.ts`: parse-tree visitor, strict/lenient semantic validation, AST construction.
- `src/core/errorDataHandler.ts`: diagnostics collection, throwing, stderr behavior.
- `src/core/options/defaultParserOptions.ts`: strict and lenient default option profiles.
- `src/core/options/failLevel.ts`: `failLevel` to internal bail sensitivity mapping.
- `src/core/parsingRules/modeFromRulesMatcher.ts`: effective mode classification.

## Strict vs Lenient Behavior

Default parsing is lenient.

- Lenient mode: `/END` is optional, duplicate keys/sections generally warn/recover according to options, and some loose syntax is accepted.
- Strict mode: `/END` is required by default, stricter structure rules apply, and strict-only syntax errors should be precise.
- `requireDocTerminator`, `onDuplicateKey`, and `treatEmptyValueAsNull` can override parts of the selected mode; this may make the effective mode `custom`.
- `failLevel` controls when parsing bails.
- `throwOnError` controls whether a bail-threshold issue throws.
- Library code should not write diagnostics unless `logDiagnostics` is enabled.
- `parseForTooling` should return structured diagnostics and avoid throwing for normal parse errors.

When fixing parser behavior, test both the intended valid path and the nearest invalid path. Prefer line/column assertions for diagnostic-location bugs.

## Grammar and Generated Files

Current grammar source is under `grammar/v1.0.0-rc.6/`.

ANTLR-generated files live in `src/grammar/generated/`. Do not hand-edit generated files unless the user explicitly asks for an emergency generated-output patch. Prefer editing grammar source and regenerating.

`dist/` is TypeScript build output. Do not manually edit it. Run `npm run build` when generated package output needs to be refreshed locally.

Do not edit files under `libs/` unless the task is specifically about vendored tooling.

## Testing Guidance

- Put focused regressions near the affected behavior.
- Use `tests/fixed-issues/` for named historical bug regressions.
- Use `tests/integration/` for parser features and public option behavior.
- Use `tests/smoke/` for broad end-to-end behavior.
- Use `tests/golden/` when parsing output for fixtures changes intentionally.
- Keep tests deterministic and avoid broad snapshot/golden churn unless the parser behavior intentionally changed.
- For file-location bugs, include fixtures or inline content that proves exact line/column behavior.

## Documentation Guidance

Update docs/examples/changelog when a change affects:
- public API,
- parser options,
- strict vs lenient behavior,
- diagnostics or error messages,
- package usage examples,
- generated grammar behavior visible to users.

Keep documentation concise and consistent with the README tone. Examples should be valid for the mode they claim to demonstrate.

## Dependency Policy

Do not add runtime dependencies unless clearly necessary.

Before adding any dependency, prefer:

1. Existing parser helpers or utilities.
2. Node.js standard library functionality.
3. A small local helper.

If a new dependency is necessary, explain why. Dependency changes should include `package-lock.json`.

## Safety and Scope Boundaries

### Always Do

- Run tests before submitting any change.
- Match the code patterns in the file you are editing.
- Keep changes focused — one concern per PR.
- When editing Markdown files, if a line introduces a bulleted list and ends with a colon (`:`), place the first bullet immediately on the next line. Do not insert a blank line between the introductory line and the first bullet.

### Ask First

- Before adding a new dependency.
- Before changing the public API or exported types.
- Before modifying CI/CD configuration.
- Before refactoring shared utilities used across multiple modules.

### Never Do

Do not modify:
- `.env` files, secrets, credentials, or keys,
- vendored dependencies under `libs/`,
- generated parser files unless grammar generation is part of the task,
- `dist/` by hand,
- lockfiles unless dependency changes require it,
- unrelated formatting, fixtures, or metadata.

Do not perform destructive operations such as:
- `git reset --hard`,
- force-pushing,
- publishing packages,
- creating releases,
- deleting large parts of the repository.

Do not create commits, tags, branches, package releases, or npm publishes unless explicitly requested.

## Project-Specific Priorities

YINI values clarity, readability, predictability, explicit structure, deterministic parsing, and precise diagnostics.

When changing code, tests, examples, or documentation:
- Prefer clarity over cleverness.
- Avoid implicit or magical behavior.
- Keep syntax examples human-readable.
- Preserve strict-mode and lenient-mode separation.
- Make parser behavior match the current YINI specification.
- Prefer structured diagnostics over vague errors.
- Keep source line/column reporting aligned with original user input, including BOM and shebang cases.
- Treat public types and options as user-facing contracts.
