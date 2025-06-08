YINI Parser TypeScript - Project Readme
=======================================

## Project Structure
```
/src
--TODO--
```

## Naming Conventions
The following naming conventions help maintain consistency across the project. Contributors should follow them where applicable.

| Item                                | Convention | Example(s) |
|-------------------------------------|------------|------------|
| Repository and package names        | kebab-case | `yini-parser-typescript`, `yini-parser-ts` |
| Directory names (within `src/`)     | kebab-case * | `smoke-fixtures` |
| Source file names                   | camelCase ** | `parseEntry.ts` |
| Script file names                   | kebab-case ** | `clean-ts-js.sh` |
| Fixture file names (for test data only)| kebab-case ** | `1-basic-key-value.smoke.yini` |
| Markdown file names                 | Title Case or UPPER CASE ** | `Short Name.md`, `SHORT NAME.md` |
| Class names                         | **Must be:** PascalCase | class `PascalCase`, `YINIClass` |
| Variable (mutable) names            | **Must be:** camelCase | `camelCase` |
| Constant variable names             | UPPER_SNAKE_CASE (or camelCase) | const `UPPER_SNAKE_CASE`, `SCREAMING_SNAKE_CASE ` |
| Interface names | PascalCase plus prefix `I` | interface `IPascalCase` |
| Type names | PascalCase plus prefix `T` | type `TPascalCase` |

(*) Some exceptions may occur where directories in the root directory have predefined names. E.g. `node_modules`.

(**) Some exceptions may occur where this improves clarity, and certain configuration files have predefined names. Files in the root directory and within `docs` may also follow different conventions as needed.

### Style Memory Table
For this (Node.js + TypeScript) project, with exceptions for predefined names names.
| Style                         | Example       | Notes | 
|-------------------------------|---------------|---|
| Title Case (with spaces)      | `Short Name.md` | Visible document or Markdown file names where readability matters (e.g. in `docs/`). |
| UPPER CASE (with spaces)      | `SHORT NAME.md` | Visible document or Markdown file names where readability matters (e.g. in the root `/`). |
| camelCase                     | `shortName`   | All source file and variable names. |
| kebab-case                    | `short-name`  | All directory and general file names. |
| PascalCase                    | `ShortName`   | All class names, interface names (prefixed with `I`), and type names (prefixed with `T`). |
| snake_case                    | `short_name`  | _Only used for predefined names._ |
| UPPER_SNAKE_CASE / SCREAMING_SNAKE_CASE| `SHORT_NAME`  | Optionally used for constant variable names. |
| kebab-case with caps (non-standard!) | `Short-name`   | _Not recommended — not to be used in source._ |