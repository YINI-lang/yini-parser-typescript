# CHANGELOG

## --dev/uppcoming--
- Fixed and improved number parsing to fully support negative values and edge cases for integers, floats, and exponential numbers. Based on updated lexer and parser grammar files, and added extensive tests to ensure correct and robust handling. Here: `tests/integration/6-number-literals/*`
- Fixed issues with floats, including negative and exponential numbers with new test files here: `tests/fixed-issues/issue-32/*`
- Fixed an issue where parseFile(..) did not output a warning when parsing a file missing a newline at EOF. Plus added test cases to check that it is fixed (in `tests/fixed-issues/issue-30`).

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