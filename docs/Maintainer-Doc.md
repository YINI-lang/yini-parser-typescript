# Maintainer-Doc.md

## Making/Publishing a New Release on GitHub

1. **First:**
   - **1. a)** Make sure all tests pass by running:
      ```bash
      npm run ci:test
      ```
   - **1. b)** Run below, locally before going to the publishing step: 
      ```bash
      npm publish --dry-run --provenance --access public
      ```

      If a `beta` release, use this line instead:
      ```bash
      npm publish --dry-run --provenance --tag beta --access public
      ```

2. Then:
   * Check and update `CHANGELOG.md` so it's update with the latest changes.
   * Update the version in `package.json`.

3. Just to make sure:
   a. Install and update package-lock.json by running:
      ```bash
      npm i
      ```
   b. And also build to be sure:
      ```bash
      npm run build
      ```

4. Make a release on GitHub
   * Go to **Releases** tab in the repo (`yini-parser-typescript`, https://github.com/YINI-lang/yini-parser-typescript).
   * 
   * Click **"Draft a new release"**, pick your tag, version, etc.
   * 
   * Click Publish release.

5. Done, should have been publish to NPM Registry. ([www.npmjs.com](https://www.npmjs.com/))

---

**^YINI ≡**  
> A simple, structured, and human-friendly configuration format.  

[yini-lang.org](https://yini-lang.org/?utm_source=github&utm_medium=referral&utm_campaign=yini_parser_ts&utm_content=doc_footer) · [YINI on GitHub](https://github.com/YINI-lang)  

