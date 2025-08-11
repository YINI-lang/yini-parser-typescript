# Maintainer-Doc.md

## Making/Publishing a New Release on GitHub

1. First:
   * Check that all tests passes by running:
        ```bash
        npm run ci:test
        ```
   * Test `npm publish --dry-run` locally before automation.

2. Then:
   * Check and update `CHANGELOG.md` so it's update with the latest changes.
   * Update the version in `package.json`.

3. Make a release on GitHub
   * Go to **Releases** tab in the repo (`yini-parser-typescript`, https://github.com/YINI-lang/yini-parser-typescript).
   * 
   * Click **"Draft a new release"**, pick your tag, version, etc.
   * 
   * Click Publish release.

4. Done, should have been publish to NPM Registry. ([www.npmjs.com](https://www.npmjs.com/))

