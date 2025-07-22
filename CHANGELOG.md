# CHANGELOG

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