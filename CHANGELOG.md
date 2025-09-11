# CHANGELOG

## --dev/uppcoming--

## 1.1.0-beta + [UPDATES] - 2025 XXX
- **Fixed:** `parseFile()` now correctly passes through all options (e.g. `includeDiagnostics`) so they work and matches as in `parse(..)`.
- **Fixed:** typo (`in in`) in file parsing error message.
- **Updated**: metadata structure bumped to version 1.1.0, and below added:
    ```ts
    preservesOrder: true // Member/section order: platform-, implementation-, and language-specific. Not mandated by the YINI spec.
    orderGuarantee: 'implementation-defined'
    orderNotes?: string
    ```
- **Refactored** the static public (user-facing) YINI class to use per-invocation runtime state, preventing race conditions in runtime info when multiple calls to `parse(..)` / `parseFile(..)` run in parallel.
- **Refactored file layout:** Moved and renamed files in `src/`
  * File `src/parseEntry.ts` renamed and moved to `src/src/pipeline.ts`, 
      - And in that file, rename the method/function `_parseEntry(..)` to `runPipeline(..)`.
  * Renamed the file `core/types.ts` to `core/internalTypes.ts`
      - And moved public (user-facing) types and interfaces into its own file `src/types/index.ts`.
  * Moved the file `src/yiniHelpers.ts` to `src/utils/yiniHelpers.ts`.

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
            includeMetaData: false,
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