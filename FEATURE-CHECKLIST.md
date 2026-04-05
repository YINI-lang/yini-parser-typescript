YINI Parser – Feature Implementation Status
===========================================

This table shows the implementation status of the YINI parser. Features are based on the YINI Specification v1.0.0 RC 3 (with possible updates).

https://github.com/YINI-lang/YINI-spec

#### Legend
- **Status:** (and **Table Title**)
  * ✅ All sub-features done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not started
  * ❌ Not currently
- **Impl.:** (parsing and logic implemented)
  * ✔️ Yes, done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not started
  * ❌ Not currently
- **Test:** (unit/integration test, **NOTE: Smoke tests not counted!**)
  * ✔️ Yes, done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not started
  * ❌ Not currently
- **Verf:** (verification)
  * ✔️ Yes, done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not started
  * ❌ Not currently

---

### 🚧 — 1. Core Parsing / Basic Members
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Impl.</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Simple (key and header) identifiers</td>
    <td>✅</td>
    <td></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Non backticked</td>
  </tr>
  <tr>
    <td>Throw error if using section repeating markers higher than supported</td>
    <td>🔲</td>
    <td>Per spec only nesting levels 1–6 supported with repeating markers, e.g. <code>^^^^^^^</code> is invalid</td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td>For higher levels, the shorthand marker must be used instead</td>
  </tr>
  <tr>
    <td>Type inference</td>
    <td>🔲</td>
    <td>String, integer, float, boolean, null</td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Based on value syntax</td>
  </tr>
  <tr>
    <td>Key-value pairs</td>
    <td>✅</td>
    <td>Simple assignment <code>key = value</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Core syntax</td>
  </tr>
  <tr>
    <td>Section nesting: Going deeper</td>
    <td>🔲</td>
    <td>Sub-sections with increase nesting, throw error if jumping over section levels</td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td>Must increment exactly one level at a time. E.g.: `^^` → `^^^` but not `^^` → `^^^^`.
</td>
  </tr>
  <tr>
    <td>Section nesting: Going shallower</td>
    <td>🔲</td>
    <td>Sub-sections with decrease nesting</td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td>May drop directly to any previous level. E.g.: `^9` → `^^` or `^9` → `^`.
</td>
  </tr>
  <tr>
    <td>Unique keys (per section)</td>
    <td>🔲</td>
    <td>Reformat/emit error/warning</td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Enforce per nesting level</td>
  </tr>
</table>

---

### ✅ — 2. File Structure & Errors
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Impl.</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>UTF-8 Encoding</td>
    <td>✅</td>
    <td>BOM detection</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Must handle UTF-8 with/without BOM</td>
  </tr>
  <tr>
    <td>Shebang handling</td>
    <td>✅</td>
    <td><code>#!</code> on first line</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Ignored by parser</td>
  </tr>
  <tr>
    <td>@yini optional marker/keyword</td>
    <td>✅</td>
    <td>E.g. <code>@yini</code>, <code>@YINI</code>, etc</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Case-insensitive</td>
  </tr>
  <tr>
    <td>Check file extension .yini</td>
    <td>✅</td>
    <td>Case-insensitive, otherwise throw error</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Naming convention</td>
  </tr>
  <tr>
    <td>Throw error if parsing some garbage</td>
    <td>✅</td>
    <td>⚠️ Including trying to parse nothing ("") or invalid characters, etc.</td>
    <td>➖</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>
  <tr>
    <td>Throw error if parsing unknown file name</td>
    <td>✅</td>
    <td>⚠️ Including trying to parse a blank file name (""), etc.</td>
    <td>➖</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>

</table>

---

### ✅ — 3. Basic / Simple Literals
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Impl.</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Integer and float numbers</td>
    <td>✅</td>
    <td><code>123</code>, <code>3.14</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Basic numbers</td>
  </tr>
  <tr>
    <td>Basic strings, single and double quoted</td>
    <td>✅</td>
    <td><code>'Hello'</code>, <code>"World"</code>, including handle slash, backslash, and inline quotes</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Basic strings without prefix</td>
  </tr>
  <tr>
    <td>All Boolean literals</td>
    <td>✅</td>
    <td><code>true</code>, <code>false</code>, <code>Yes</code>, <code>No</code>, <code>ON</code>, <code>OFF</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td><b>⚠️Case-insensitive</b></td>
  </tr>
  <tr>
    <td>(Explicit) All Null literals</td>
    <td>✅</td>
    <td><code>null</code>, <code>NULL</code>, <code>Null</code>etc</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td><b>⚠️Case-insensitive</b></td>
  </tr>
</table>

---

### 🚧 — 4. Comments + Disable line
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Impl.</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Full-line comment with `;` </td>
    <td>🔲</td>
    <td><code>; Line comment</code></td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
  <tr>
    <td>Inline comment with `#`, `//`</td>
    <td>🔲</td>
    <td><code># Comment</code><br/><code>// Comment</code></td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td># must be followed by space/tab to be a comment</td>
  </tr>
  <tr>
    <td>Block comment</td>
    <td>🔲</td>
    <td><code>/* ... */</code></td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
  <tr>
    <td>Disable line with `--`</td>
    <td>🔲</td>
    <td><code>--This line is ignored</code></td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>For temporarily ignoring valid code</td>
  </tr>
  <tr>
    <td>Ignore comments or disable line when parsing/extracting entities such section names, keys and other identifiers or values</td>
    <td>🔲</td>
    <td>E.g. <code>^ App // Comment</code> should extract section name = "App" and not "App // Comment", etc</td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>⚠️ Easy to forget trimming away these</td>
  </tr>
</table>

---

### 🚧 — 5. Extended Parsing
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Impl.</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Backticked keys (identifiers)</td>
    <td>🔲</td>
    <td><code>`this is a key`</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td>Key name in members</td>
  </tr>
  <tr>
    <td>Backticked sections headers (identifiers)</td>
    <td>🔲</td>
    <td><code>^`8.MySection`</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td>Section names with spaces etc.</td>
  </tr>
  <tr>
    <td>Standard/basic/classic section marks (^, <)</td>
    <td>🔲</td>
    <td><code></code></td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td>Repeat up to MAX 6 characters, indent optional</td>
  </tr>
  <tr>
    <td>Numeric shorthand section marker (^7, etc.)</td>
    <td>🔲</td>
    <td><code>^7Section</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td>Arbitrary nesting</td>
  </tr>
  <tr>
    <td>(Implicit) Null</td>
    <td>✅</td>
    <td>Empty value</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td><b>⚠️ Only if option.treatEmptyValueAsNull = 'allow' (This is default in lenient mode, disallow in strict mode)</b></td>
  </tr>
  <tr>
    <td>Members without any defined section</td>
    <td>✅</td>
    <td>key = 123</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td><b>⚠️ (Implicit) Base object with the name `"base"</b></td>
  </tr>
  <tr>
    <td>Multiple 1-level sections</td>
    <td>🔲</td>
    <td><code>^ Title1
 ^ Title2</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td><b>⚠️ (Implicit) Base object</b></td>
  </tr>
</table>

---

### ✅ — 6. Number Literals
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Impl.</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
    </tr>

  <tr>
    <td>Negative numbers</td>
    <td>✅</td>
    <td><code>-123</code>, <code>-9.22</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Both ints and floats</td>
  </tr>
  <tr>
    <td>Exponent notation numbers</td>
    <td>✅</td>
    <td><code>3e4</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Incl. neg. exp.</td>
  </tr>
  <tr>
    <td>Binary numbers</td>
    <td>✅</td>
    <td><code>0b1010</code>, <code>%1010</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>⚠️ Including alternative notation with %</td>
  </tr>
  <tr>
    <td>Octal numbers</td>
    <td>✅</td>
    <td><code>0o7477</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>8-base</td>
  </tr>
  <tr>
    <td>Duodecimal (dozenal)</td>
    <td>✅</td>
    <td><code>0z2EX9</code>, <code>0z2AB9</code><code>X</code> = <code>A</code> = 10, <code>E</code> = <code>B</code> = 11</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>12-base</td>
  </tr>
  <tr>
    <td>Hexadecimal numbers</td>
    <td>✅</td>
    <td><code>0xF390</code>, <code>#F390</code>, <code>0X3fa</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>⚠️ 16-base, including alternative notation with #</td>
  </tr>
</table>

---

### 🔲 — 7. String Literals
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Impl.</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Raw string (default)</td>
    <td>🔲</td>
    <td><code>'...'</code>, <code>"..."</code>, no escapes</td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td>Single line, enclosed in ' or "</td>
  </tr>
  <tr>
    <td>Classic string (C-string)</td>
    <td>✅</td>
    <td><code>C'...'</code>, <code>C"..."</code>, with escapes</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Single line, escape codes, prefixed either with C or c</td>
  </tr>
  <tr>
    <td>Hyper string (H-string)</td>
    <td>🔲</td>
    <td><code>H'...'</code>, <code>H"..."</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Multi-line, trims WS, normalizes repeating WS to one WS</td>
  </tr>
  <tr>
    <td>Triple-quoted (raw)</td>
    <td>🔲</td>
    <td><code>"""..."""</code>, multi-line</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Raw by default</td>
  </tr>
  <tr>
    <td>C-Triple-quoted</td>
    <td>🔲</td>
    <td><code>C"""..."""</code>, with escapes</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Multi-line, supports escapes</td>
  </tr>
  <tr>
    <td>String concatenation</td>
    <td>🔲</td>
    <td><code>"foo" + 'bar'</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>All string types</td>
  </tr>
  <tr>
    <td>Escapes: all 2 character sequences</td>
    <td>🔲</td>
    <td>E.g. <code>\\</code>, <code>\a</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td></td>
  </tr>
  <tr>
    <td>Escapes: all 3>= character sequences</td>
    <td>🔲</td>
    <td>E.g. <code>\xhh</code>, <code>\uhhhh</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td></td>
  </tr>
  <tr>
    <td>Concatenation of other types into strings</td>
    <td>❌</td>
    <td><code>str = "Hello"+true # NOT SUPPORTED</code></td>
    <td>❌</td>
    <td>❌</td>
    <td>❌</td>
    <td>Note: Use strings directly.</td>
  </tr>
</table>

---

### 🔲 — 8. Object Literals
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Impl.</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Objects</td>
    <td>🔲</td>
    <td><code>{ key: value, ... }</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td>Inline, supports nesting, trailing comma ignored (lenient only)
    </td>
  </tr>
  <tr>
    <td>Nested objects inside objects</td>
    <td>🔲</td>
    <td>Objects themselves are literals and can be nested</td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td></td>
  </tr>
  <tr>
    <td>Nested objects inside lists</td>
    <td>🔲</td>
    <td>Objects themselves are literals and can be nested</td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td></td>
  </tr>
</table>

---

### 🔲 — 9. List Literals
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Impl.</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Bracketed lists ([])</td>
    <td>🔲</td>
    <td><code>key = [a, b, c]</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td>Trailing comma allowed and is ignored (lenient only)</td>
  </tr>
  <tr>
    <td>Colon-based (:)</td>
    <td>🔲</td>
    <td><code>key:"one", <br/>"two"</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Multi-line, comma required after each item, trailing comma allowed and is ignored (lenient only)</td>
  </tr>
  <tr>
    <td>Nested lists inside lists</td>
    <td>🔲</td>
    <td>Lists themselves are literals and can be nested</td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td></td>
  </tr>
  <tr>
    <td>Nested lists inside objects</td>
    <td>🔲</td>
    <td>Lists themselves are literals and can be nested</td>
    <td>✅</td>
    <td>✅</td>
    <td>🔲</td>
    <td></td>
  </tr>
</table>

---

### 🔲 — 10. Special & Validation Modes
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Impl.</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Document terminator <code>/END</code></td>
    <td>🔲</td>
    <td><code>/END</code>, non-case-sensitive</td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>⚠️ Only if option.requireDocTerminator = 'required'</td>
  </tr>
  <tr>
    <td>Lenient mode (default)</td>
    <td>🔲</td>
    <td>Allows trailing commas, blank/null values, etc</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>
  <tr>
    <td><code>Strict mode</code></td>
    <td>🚧</td>
    <td>Enable strict parsing (e.g., require <code>/END</code>, disallow implicit nulls/trailing commas)<br/>There must be exactly one explicit top-level section.</td>
    <td>✅</td>
    <td>🚧</td>
    <td>🚧</td>
    <td>Some rules still being finalized</td>
  </tr>
  <tr>
    <td>Optional Bail/Abort sensitivity levels</td>
    <td>🔲</td>
    <td>Level 0 = Ignore errors and try parse anyway (may remap falty key/section names).<br/>
    Level 1 = Abort on errors only.<br/>
    Level 2 = Abort even on warnings.</td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
  <tr>
    <td>Detect multiple <code>@yini</code></td>
    <td>🔲</td>
    <td>If using multiple <code>@yini</code> should warn in lenient and cause error in strict mode</td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>This requires updates in the grammar and its parser logic</td>
  </tr>
  <tr>
    <td>Meta: Count num of sections</td>
    <td>🔲</td>
    <td>Meta info</td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
  <tr>
    <td>Meta: Count num of members</td>
    <td>🔲</td>
    <td>Meta info</td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Member literals</td>
  </tr>
</table>

---

### 🚧 — 11. Public API & Options (ParseOptions)

<table>
  <tr>
    <th>Option</th>
    <th>Status</th>
    <th>Details</th>
    <th>Impl.</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td><code>strictMode</code></td>
    <td>✅</td>
    <td>Enable strict parsing<td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>

  <tr>
    <td><code>failLevel</code> / preferred bail level</td>
    <td>✅</td>
    <td><code>'auto' | 0 | 1 | 2</code> → ignore, abort-on-errors, abort-on-warnings</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Stop parsing level</td>
  </tr>

  <tr>
    <td><code>includeMetadata</code></td>
    <td>✅</td>
    <td>Returns <code>{ result, meta }</code> instead of plain result</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Public API shape is stable</td>
  </tr>

  <tr>
    <td><code>includeDiagnostics</code></td>
    <td>✅</td>
    <td>Attaches diagnostics arrays/counters inside <code>meta</code> (requires <code>includeMetadata</code>)</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Ensure parity between <code>parse</code> and <code>parseFile</code></td>
  </tr>

  <tr>
    <td><code>includeTiming</code></td>
    <td>✅</td>
    <td>Adds per-phase timing to <code>meta.timingMs</code> (requires <code>includeMetadata</code>)</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Phases: lex/parse, AST+validate, build</td>
  </tr>

  <tr>
    <td><code>preserveUndefinedInMeta</code></td>
    <td>✅</td>
    <td>Do not strip <code>undefined</code> properties from <code>meta</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Useful for tooling</td>
  </tr>

  <tr>
    <td><code>quiet</code></td>
    <td>✅</td>
    <td>Show only errors, will suppress warnings and messages sent to the console/log (does not change <code>meta</code>)</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Confirm behavior in strict/lenient</td>
  </tr>

  <tr>
    <td><code>silent</code></td>
    <td>✅</td>
    <td>Suppress all output (even errors, exit code only).</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Confirm behavior in strict/lenient</td>
  </tr>

  <tr>
    <td><code>throwOnError</code></td>
    <td>✅</td>
    <td>Throw on parse error.</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>

  <tr>
    <td><b>rules.onDuplicateKey</b></td>
    <td>🚧</td>
    <td><code>'error' | 'warn-and-keep-first' | 'warn-and-overwrite' | 'keep-first' | 'overwrite'</code></td>
    <td>✅</td>
    <td>🚧</td>
    <td>🚧</td>
    <td>“overwrite” = keep last</td>
  </tr>

  <tr>
    <td><b>rules.requireDocTerminator</b></td>
    <td>🚧</td>
    <td><code>'optional' | 'warn' | 'error'</code> — require <code>/END</code> at EOF</td>
    <td>✅</td>
    <td>🚧</td>
    <td>🚧</td>
    <td>Overrides strict default if needed</td>
  </tr>

  <tr>
    <td><b>rules.treatEmptyValueAsNull</b></td>
    <td>✅</td>
    <td><code>'allow' | 'allow-with-warning' | 'disallow'</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>

</table>

---

### 🔲 — 12. Reserved/Advanced Features
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Impl.</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Reserved syntax/keywords</td>
    <td>🔲</td>
    <td>E.g. <code>@include</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Error if misused</td>
  </tr>
  <tr>
    <td>Anchors and includes</td>
    <td>❌</td>
    <td>Not supported</td>
    <td>❌</td>
    <td>❌</td>
    <td>❌</td>
    <td>Reserved for future spec</td>
  </tr>
  <tr>
    <td>Date/time types</td>
    <td>❌</td>
    <td>Not supported</td>
    <td>❌</td>
    <td>❌</td>
    <td>❌</td>
    <td>Use string literals</td>
  </tr>
</table>

---

**^YINI ≡**  
> A simple, structured, and human-friendly configuration format.  

[yini-lang.org](https://yini-lang.org) · [YINI on GitHub](https://github.com/YINI-lang)  
