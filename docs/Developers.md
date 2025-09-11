# Developers

## Environment Variables

Under development, different environments can be tested by starting different scripts in `package.json`.

The library should **never set or modify values in `process.env`**, only read from it. Changing it in the library will cause side effect in users application and other dependencies.

Since this is a library, envs should default to "production" (quietely) when not in dev/test.

## `src` File Layout/Structure

- The root of `src` should only have:
  * `index.ts` - Entry point of this library/package with re-exports public API.
  * `YINI.ts` - Public static class, the user-facing facade (overloads, file/inline entry).
  * `types/index.ts` - Public (user-facing only) types.
  * And directories

## Tests

The `tests` directory consists of different test types and test data files:

- **`fixtures/`**: Shared data files used by unit, integration, and smoke tests.
- **`unit/`**: Tests individual functions or modules in isolation.
- **`smoke/`**: Quick, lightweight tests that check core parser functionality and features.
- **`integration/`**: Tests multiple components working together in various scenarios.
- **`golden/`**: Runs the parser on input files and compares the output to expected "golden" output files. These tests should be the most comprehensive.
- **`fixed-issues/`**: Contains inputs for reported issues and related test cases, used to verify parser fixes.

## Other Notes
### Never Call `process.exit()`

Since `process.exit` is global, it will kill the whole process including the users application using this library.

Instead, on error it shoud throw an error.
