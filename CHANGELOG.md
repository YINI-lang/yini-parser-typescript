# CHANGELOG

## 1.5.0XX - 2026 xxx
- **Updated:** Parser behavior aligned with YINI Specification `v1.0.0-RC.6`, including:
  * **Changed:** `#` now always starts a comment outside string literals. No whitespace is required before or after `#`.
  * **Added:** Support for explicit hexadecimal notation using `hex:` as an alternative to `0x...`.
  * **Removed:** Support for `#` as a hexadecimal number prefix. Hexadecimal numbers must now use `0x...` or `hex:...`.
  * **Removed:** Internal handling of Hyper Strings (H-Strings), simplifying string parsing and reducing parser complexity.
  * **Added:** Lenient mode now accepts `=` as an alternative inline object member separator. The canonical form remains `key: value`.
  * **Changed:** Strict mode rejects `=` inside inline objects; inline object members must use `:`.
  * **Changed:** String concatenation now uses the updated grammar model:
    - Concatenation must begin with a string literal.
    - In strict mode, all operands must be string literals.
    - In lenient mode, later operands may be strings, numbers, booleans, or null.
    - A line break is allowed after `+`, but not before it.
    - Lists and inline objects are invalid concatenation operands.
  * **Added:** Empty-document handling by mode:
    - In lenient mode, empty documents now parse successfully with a warning.
    - In strict mode, empty documents now produce an error.
  * **Improved:** Orphan root-level members in lenient mode are mounted directly on the resulting top-level object.
  * **Improved:** Parser/runtime handling of empty inline input and final newline normalization.
  * **Updated:** Tests for string concatenation, empty documents, inline object separators, hash comments, and hex notation.

## 1.5.0 - 2026 Apr
- **Updated:** Parser behavior aligned with YINI Specification `v1.0.0-RC.5`.
- **Changed:** In strict mode, YINI documents must now end with the document terminator `/END`.
- **Changed:** Strict mode now requires exactly one explicit top-level section.
- **Updated:** Section header parsing now reflects the latest horizontal whitespace (`HSPACE`) rules from the specification.
- **Improved:** Refined how members outside explicit sections are handled in lenient mode, and added stricter checks for top-level structure in strict mode.
- **Improved:** Clarified and tightened how empty values and explicit `null` are handled in lenient and strict mode.
- **Improved:** Fixed `throwOnError` option detection, clarified the related documentation, and cleaned up public parameter names.
- **Fixed:** Made `throwOnError` work consistently together with the selected fail level.
- **Updated:** Synced to the latest lexer and parser grammar files from the Specification Package `v1.0.0-RC.5`, with cleaned up and refined grammar files for better consistency and maintainability.
- **Added:** Expanded validation and tests for section headers, including shorthand markers, backticked names, and invalid dotted section names.
- **Expanded:** Improved integration and smoke test coverage for error recovery, throw behavior, null handling, fixture parsing, and section/header edge cases.
- **Updated:** Added and validated a new large smoke/golden fixture:
  - `tests/fixtures/smoke-fixtures/c-industrial-monitoring-and-automation-platform.smoke.yini`
- **Improved:** Fixed and re-enabled previously skipped smoke tests:
  - `tests/fixtures/smoke-fixtures/8-api-keys-integration.smoke.yini`
  - `tests/fixtures/smoke-fixtures/9-app-preferences.smoke.yini`

## 1.4.3 - 2026 Apr
- **Promoted:** YINI Parser TypeScript is now considered stable (non-beta) after iterative beta releases and refinements.
- **Fixed:** Rebuilt the project and reduced reported vulnerabilities from 4 to 0.
  
## 1.4.3-beta - 2026 Mar
- **Fixed:** Error messages and thrown parse errors now include correct line and column information again.
- **Improved:** Syntax and string-related parse errors are now clearer and more consistent.
- **Improved:** Reduced some duplicate follow-up errors during recovery after invalid input.
- **Added:** Regression tests for diagnostics, thrown errors, and line/column reporting.

## 1.4.2-beta - 2026 Mar
- **Fixed:** Error messages now include line and column information again. This was unintentionally missing after the previous update.
- **Added:** Test cases to help ensure line and column information is preserved in future updates.

## 1.4.1-beta - 2026 Mar
- **Improved:** Error reporting now provides more accurate line and column positions in parser diagnostics.
- **Improved:** Invalid escape sequences in C-strings are now reported as proper user-facing syntax errors instead of internal/raw runtime errors.
- **Improved:** Parser diagnostics and metadata now use clearer and more consistent error/advice wording.
- **Fixed:** Several error paths that previously produced confusing internal stack traces or less precise locations now surface clearer parse-time messages.

## 1.4.0-beta - 2026 Feb

### ✨ Added
- Full implementation of **Classic (C) string literals** (`c"..."`, `C'...'`) according to specification section 6.2.
- Complete support for all defined escape sequences:
  - `\\`, `\'`, `\"`, `\/`
  - `\0`, `\?`, `\a`, `\b`, `\f`, `\n`, `\r`, `\t`, `\v`
  - `\xhh` (2-digit hex)
  - `\uhhhh` (UTF-16)
  - `\Uhhhhhhhh` (UTF-32)
  - `\oOOO` (octal, up to 3 digits, range `\o0`–`\o377`)

### 🔒 Improved
- Strict validation of invalid escape sequences (e.g. `\z`, malformed `\x`, `\u`, `\U`, `\o`).
- Enforcement of control character rules (U+0000–U+001F must be escaped in Classic strings).
- Proper handling of Classic string concatenation (`+`) including mixed raw + classic combinations.

### 🧪 Tests
- Expanded integration test coverage for Classic strings.
- Added validation tests for all escape types and error conditions.

---

## 1.3.3-beta - 2025 Dec
This release strengthens correctness and reliability, while preserving the existing API and improving guarantees.
- **Added:** 
  - Added comprehensive smoke tests (F-5.a-d and F-6.a-d) matching YINI parsing against expected JSON output using two large, production-style configuration examples.
    - **Corporate SaaS Platform** — [YINI](./tests/fixtures/smoke-fixtures/a-corporate-saas-platform.smoke.yini) and [JSON](./tests/fixtures/smoke-fixtures/a-corporate-saas-platform.smoke.json)
    - **High-Security Distributed Control System** — [YINI](./tests/fixtures/smoke-fixtures/b-high-security-distributed-control-system.smoke.yini) and [JSON](./tests/fixtures/smoke-fixtures/b-high-security-distributed-control-system.smoke.json)
  - Tests verify consistent results across:
    - default parsing.
    - strict mode parsing.
    - strict mode with metadata enabled.
  - These tests now serve as regression contracts for parser correctness, metadata inclusion, and cross-format consistency.
- **Added:** Smoke test (F-7) verifying that parsing a YINI file returns metadata when `includeMetadata: true` is enabled.
- **Added:** Smoke test (F-8) verifying that parsing a defect YINI produces diagnostics metadata given proper parse options.
- **Fixed:** Miscellaneous smaller fixes and improvements
  
## 1.3.2-beta - 2025 Dec
- **Added:** Implemented UTF-8 BOM support (safe U+FEFF stripping) and added complete test fixtures for BOM/no-BOM, BOM+newline, and mid-file scenarios.
- **Added:** Implemented support for shebang (`#!`), which is ignored by the parser and the line skipped.  
(If the parser sees `#!` at first line, instead of breaking the parsing, the parsing will continue on the next line.)
- **Updated:** all (~14) project dependencies to their latest versions, including TypeScript and packages with reported security vulnerabilities. Node type definitions remain unchanged.

## 1.3.0-beta - 2025 Sep
- **Fixed:** bug where `buildResultMetadata(..)` could occasionally produce an `undefined` error.
- **Renamed:** some public (user facing) interfaces to be more ergonomic for end users:
  * `AllUserOptions` to `ParseOptions`
  * `PrimaryUserParams` to `BasicOptions`
- **Renamed:** public (user facing) parsing rule type to be more ergonomic for end users:
  * `OnDuplicateKey` to `DuplicateKeyPolicy`
- **Clarified:** the `strictMode` parameter in TSDoc: it defines the baseline
  ruleset (true = strict, false = lenient). It's only a starting
  point—rule-specific options (e.g., `treatEmptyValueAsNull`, `onDuplicateKey`)
  may override parts of that ruleset. When overrides are provided, the
   effective mode becomes custom.
- **New:** Added user facing parsing rule value types `DocumentTerminatorRule` and `EmptyValueRule`.
- **New:** Added `quiet` option, prints only errors to the console and warnings/info/etc. are not printed. This does not affect diagnostics captured in metadata.
- **New:** Added `silent` option, no console output will be outputted at all, not even errors. Programmatic callers should rely on returned metadata, CLI users should rely on the exit code.
- **(Heads-up) New:** Added `throwOnError` option, when `true` (default) the parser throws on parse errors, when `false` errors are reported via diagnostics without throwing.
  - **Current default:** `true`.
  - **Planned change:** Next release will switch the default to `false`.
  - **Action:** Set throwOnError: true (to keep throwing) or `throwOnError: false` (to adopt the future behavior) explicitly.
- **Updated:** Metadata now includes `effectiveMode` in `meta.diagnostics.effectiveOptions`, and the metadata version has been bumped to `1.1.1`.
  The fields `strictMode` and `effectiveOptions` in `meta.diagnostics` now correctly reflect when any rules have been overridden from the initially selected mode.
- **CI/Tooling (GitHub Actions):** Added security and quality checks:
  - **Security:** CodeQL, dependency checke (`npm audit`) + lockfile-lint, Gitleaks (SARIF), Semgrep (SARIF).
  - **Grammar drift check:** ANTLR-based verification to ensure generated sources are committed.
  - **Regression tests:** run across a Node/OS matrix.
  - **Releases:** npm publish with provenance (tag-driven).
- **Updated** the logic and message(s) when parser summary is shown.

## 1.2.0-beta - 2025 Sep
- **Fixed:** `parseFile()` now correctly passes through all options (e.g. `includeDiagnostics`) so they work and matches as in `parse(..)`.
- **Fixed:** typo (`in in`) in file parsing error message.
- **Updated:** metadata structure bumped to version 1.1.0, and below added (among other things):
    ```ts
    preservesOrder: true // Member/section order: platform-, implementation-, and language-specific. Not mandated by the YINI spec.
    orderGuarantee: 'implementation-defined'
    orderNotes?: string
    ```
- **Refactored:** the static public (user-facing) YINI class to use per-invocation runtime state, preventing race conditions in runtime info when multiple calls to `parse(..)` / `parseFile(..)` run in parallel.
- **Refactored file layout:** Moved and renamed files in `src/`
  * File `src/parseEntry.ts` renamed and moved to `src/src/pipeline.ts`, 
      - And in that file, rename the method/function `_parseEntry(..)` to `runPipeline(..)`.
  * Renamed the file `core/types.ts` to `core/internalTypes.ts`
      - And moved public (user-facing) types and interfaces into its own file `src/types/index.ts`.
  * Moved the file `src/yiniHelpers.ts` to `src/utils/yiniHelpers.ts`.
- **Renamed:** `includeMetaData` to `includeMetadata`.
- **Updated:** Codebase now consistently uses the `ParsedObject` type,
replacing the older `TJSObject` type for representing parsed YINI.
- **Docs:** Expanded and improved TSDoc of several of the functions in the public API.
- **Internal:** Unit tests are now colocated with their source code files in `src/**`. So there is 1:1 visibility between code and its unit tests, and less chance of missing coverage, etc.

## 1.1.0-beta - 2025 Sep
### Parser
- **Reimplemented parser from scratch** (`core/ASTBuilder.ts`) using the refactored grammar for a much cleaner and more maintainable design.  
- **Build logic reimplemented** (`core/objectBuilder.ts`) for improved reliability and consistency.  
- **Error reporting enhanced** to be more user-friendly and informative.  
- **Fixed bug sometimes wrong line** Sometimes incorrect line number in error messages are now reported accurately.
- Renamed option `bailSensitivity` to a more shorter and user-friendly name `failLevel`.
- **Extended `parse` and `parseFile` methods** to support an options-object form.  
  Example:
  ```ts
  const config= YINI.parse(yini, {
            strictMode: false,
            failLevel: 'auto',
            includeMetadata: false,
            requireDocTerminator: false,
        })  
  ```  
### Specification Alignment
- Updated to follow the **latest YINI specification (v1.0.0-rc.3)**.  
  - Document terminator `/END` is now optional in both lenient and strict mode.
### Meta Data
- The optional returned **meta data structure** has been redesigned.  
  - Now includes improved organization.  
  - **Timing support** added for detailed performance insight.
  - Grouping with **source**, **structure**, **diagnostics**, etc.

## 1.0.2-beta - 2025 Aug
- Fixed issues with floats, including negative and exponential numbers with new test files here: `tests/fixed-issues/issue-32/*`
- Fixed an issue where parseFile(..) did not output a warning when parsing a file missing a newline at EOF. Plus added test cases to check that it is fixed (in `tests/fixed-issues/issue-30`).
- Fixed and improved number parsing to fully support negative values and edge cases for integers, floats, hex, bin, octal, duodecimal, and exponential numbers. Based on updated lexer and parser grammar files, and added extensive tests to ensure correct and robust handling. Here: `tests/integration/6-number-literals/*`

## 1.0.1-beta - 2025 Aug
- Fixed catching lexer related errors correctly.
- Improves error and test handling for invalid YINI syntax.
- Grammar logic updated to catch bad systax specifically related to bad syntax for (key-value) members.
- Added another testing suite for reported and fixed tests.
- Added another testing suite for golden tests.
- Updated to the latest grammar (logic) version 1.0.0-rc.2.

## 1.0.0-beta.1 - 2025-07-26
- Package updated to **beta**. The core API is stabilizing, some more advanced features may still change.
- Bugfix, fixed exports cleanly (so this lib can be imported in CJS and in full ESM).
- Implemented support for colon lists, both empty and with elements, including nested lists. Also updated to the latest grammar, which fixes handling of empty lists with or without spaces or tabs between the brackets.
- Optimized the top part of readme for npmjs Short Page.
- Added a dir `examples/` with a few example Yini files, `compare-formats.md` and TS file.
- Updated to the latest grammar (logic) version 1.0.0-rc.1.

## 1.0.0-alpha.7
- Fixed serious bug that on error did exit process.
- Pached and updated JSDoc for remaing params for the functions parse(..) and parseFile(..).
- Changed the WIPs in the readme to "Planned – not yet implemented"-tag.
- Updated readme and especially "Intro to YINI Config Format".

## 1.0.0-alpha.6
- The YINI specificaiton discontinued alternative marker character `~` (visually ambiguous) in favor of `<`.
- The parser can now detect invalid . characters in identifiers (both keys and section names), allowing it to emit a clear error message to the user.
- Detect and emit error on defining already existing key or section name in a scope/section.
- Updated readme with "Intro to YINI Config Format" among other misc. updates.

## 1.0.0-alpha.5
- Readme updated with correct examples for CommonJS.

## 1.0.0-alpha.4 - 2025-07-20

First public release.

---

**^YINI ≡**  
> A simple, structured, and human-friendly configuration format.  

[yini-lang.org](https://yini-lang.org) · [YINI on GitHub](https://github.com/YINI-lang)  
