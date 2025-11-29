# Maintainer-Doc.md

## Making/Publishing a New Release on GitHub

1. **First:**
   - **1. a)** Make sure all tests pass by running:
      ```bash
      npm run ci:test
      ```
   - **1. b)** Run below, locally before going to the publishing step: 
      ```bash
      npm publish --dry-run
      ```

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

---

**^YINI ≡**  
> A simple, structured, and human-friendly configuration format.  

[yini-lang.org](https://yini-lang.org) · [YINI on GitHub](https://github.com/YINI-lang)  

