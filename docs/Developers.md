# Developers

## Environment Variables

Under development, different environments can be tested by starting different scripts in `package.json`.

The library should **never set or modify values in `process.env`**, only read from it. Changing it in the library will cause side effect in users application and other dependencies.

Since this is a library, envs should default to "production" (quietely) when not in dev/test.

## Never Call `process.exit()`

Since `process.exit` is global, it will kill the whole process including the users application using this library.

Instead, on error it shoud throw an error.