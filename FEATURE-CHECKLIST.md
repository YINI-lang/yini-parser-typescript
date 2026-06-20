YINI Parser – Feature Implementation Status
===========================================

Features are based on the YINI Specification with parser-side implementation updates:  
v1.0.0 RC 6

https://github.com/YINI-lang/YINI-spec

Status should be based primarily on the current source code and automated tests. If this checklist disagrees with implemented parser behavior or test coverage, inspect the source/tests first and then update this document to match.

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

### Progress Overview

| # | Status | Section |
|---|---|---|
| 1 | ✅ | Core Parsing / Basic Members |
| 2 | ✅ | File Structure & Errors |
| 3 | ✅ | Basic / Simple Literals |
| 4 | ✅ | Comments + Disable line |
| 5 | 🚧 | Extended Parsing |
| 6 | ✅ | Number Literals |
| 7 | ✅ | String Literals |
| 8 | ✅ | Object Literals |
| 9 | ✅ | List Literals |
| 10 | 🚧 | Special & Validation Modes |
| 11 | ✅ | Public API & Options (ParseOptions) |
| 12 | 🔲 | Reserved/Advanced Features |

---

### ✅ — 1. Core Parsing / Basic Members
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
    <td>✅</td>
    <td>Per spec only nesting levels 1–9 supported with repeating markers, e.g. <code>^^^^^^^</code> is invalid</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>For higher levels, the shorthand marker must be used instead</td>
  </tr>
  <tr>
    <td>Type inference</td>
    <td>✅</td>
    <td>String, integer, float, boolean, null</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
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
    <td>✅</td>
    <td>Sub-sections with increased nesting, throw error if jumping over section levels</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Must increment exactly one level at a time. E.g.: `^^` → `^^^` but not `^^` → `^^^^`.
  </td>
  </tr>
  <tr>
    <td>Section nesting: Going shallower</td>
    <td>✅</td>
    <td>Sub-sections with decreased nesting</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>May drop directly to any previous level. E.g.: `^9` → `^^` or `^9` → `^`.
  </td>
  </tr>
  <tr>
    <td>Unique keys (per section)</td>
    <td>✅</td>
    <td>Reformat/emit error/warning</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Enforce per nesting level</td>
  </tr>
  <tr>
    <td>Duplicate sections under same parent</td>
    <td>✅</td>
    <td>Same section name at the same nesting level and parent</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Lenient mode: first section wins and later duplicate section blocks are ignored with warning. Strict mode: error. Must not merge, overwrite, or reinterpret duplicate section contents.</td>
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

### ✅ — 4. Comments + Disable line
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
    <td>✅</td>
    <td><code>; Line comment</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>
  <tr>
    <td>Inline comment with `#`, `//`</td>
    <td>✅</td>
    <td><code># Comment</code><br/><code>// Comment</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td><code>#</code> always begins a comment outside string literals; no whitespace is required.</td>
  </tr>
  <tr>
    <td>Block comment</td>
    <td>✅</td>
    <td><code>/* ... */</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>
  <tr>
    <td>Disable line with `--`</td>
    <td>✅</td>
    <td><code>--This line is ignored</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>For temporarily ignoring valid code</td>
  </tr>
  <tr>
    <td>Ignore comments or disable line when parsing/extracting entities such section names, keys and other identifiers or values</td>
    <td>✅</td>
    <td>E.g. <code>^ App // Comment</code> should extract section name = "App" and not "App // Comment", etc</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
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
    <td>✅</td>
    <td><code>`this is a key`</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Key name in members</td>
  </tr>
  <tr>
    <td>Backticked section headers (identifiers)</td>
    <td>✅</td>
    <td><code>^ `My Section`</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Section names with spaces etc.</td>
  </tr>
  <tr>
    <td>Standard/basic/classic section marks (^, §, >, <)</td>
    <td>✅</td>
    <td><code></code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Primary marker is <code>^</code>. Alternatives are <code>§</code>, <code>></code>, and <code><</code>. Repeated form supports levels 1–9.</td>
  </tr>
  <tr>
    <td>Numeric shorthand section marker (^7, etc.)</td>
    <td>✅</td>
    <td><code>^7 Section</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Arbitrary nesting; requires horizontal space after the numeric shorthand; thus ^7Section is incorrect.</td>
  </tr>
  <tr>
    <td>Maximum section depth</td>
    <td>🚧</td>
    <td>Maximum supported section depth is 255</td>
    <td>✅</td>
    <td>🚧</td>
    <td>🚧</td>
    <td>Parser/validator rejects section depths above 255. Max accepted depth is tested; add a targeted test for rejecting depths above 255.</td>
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
  <td>Members outside any explicit section</td>
  <td>✅</td>
  <td><code>key = 123</code></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td><b>⚠️ Mounted directly on the parsed result, or under an implicit <code>base</code> object if required by the implementation</b></td>
</tr>
<tr>
  <td>Multiple top-level sections</td>
  <td>✅</td>
  <td><code>^ Title1
^ Title2</code></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td><b>⚠️ Mounted directly on the parsed result as separate top-level objects in lenient mode; invalid in strict mode.</b></td>
</tr>
<tr>
  <td>Section marker separators</td>
  <td>✅</td>
  <td><code>^^_^^_^ Section</code>, <code>^^^_^^^_^^^ Section</code></td>
  <td>✅</td>
  <td>✅</td>
  <td>✅</td>
  <td>Underscores may appear only between repeated occurrences of the same section marker. They do not count toward section depth.</td>
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
    <td><code>0xF390</code>, <code>hex:F390</code>, <code>0X3fa</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>⚠️ 16-base. <code>#</code> is no longer a hexadecimal prefix; use <code>0x...</code> or <code>hex:...</code>.</td>
  </tr>
  <tr>
    <td>Digit separators</td>
    <td>✅</td>
    <td><code>1_000</code>, <code>0x_ab_cd</code>, <code>0b_1010</code>, <code>hex:_FF</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Underscores are allowed after base prefixes and between digits, but not at the end or doubled.</td>
  </tr>
</table>

---

### ✅ — 7. String Literals
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
    <td>✅</td>
    <td><code>'...'</code>, <code>"..."</code>, no escapes</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
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
    <td><strike>Hyper string (H-string)</strike></td>
    <td>✅</td>
    <td><code>H'...'</code>, <code>H"..."</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Removed after RC5 to simplify the language core and reduce parser complexity. Not supporting H-strings is correct for RC6.</td>
  </tr>
  <tr>
    <td>Triple-quoted (raw)</td>
    <td>✅</td>
    <td><code>"""..."""</code>, multi-line</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Raw by default</td>
  </tr>
  <tr>
    <td>C-Triple-quoted</td>
    <td>✅</td>
    <td><code>C"""..."""</code>, with escapes</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Multi-line, supports escapes</td>
  </tr>
  <tr>
    <td>String concatenation</td>
    <td>✅</td>
    <td><code>"foo" + 'bar'</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>All string types</td>
  </tr>
  <tr>
    <td>Escape sequence validation</td>
    <td>✅</td>
    <td>Reject invalid escapes such as <code>\z</code>, <code>\o378</code>, invalid Unicode scalar values, and surrogate code points</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Escape sequences are valid only in C-Strings and C-Triple-Quoted Strings. Implemented in <code>src/parsers/parseString.ts</code> and covered by Classic and C-Triple string tests.</td>
  </tr>
  <tr>
    <td>Preserve escape-like sequences in raw strings</td>
    <td>✅</td>
    <td>Raw strings do not interpret escapes</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Backslashes are ordinary characters in raw strings; raw string tests cover this behavior.</td>
  </tr>
  <tr>
    <td>Lenient scalar-to-string concatenation</td>
    <td>✅</td>
    <td><code>"enabled=" + true</code>, <code>"value=" + null</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Lenient mode only. Strict mode allows concatenation only between string literals.</td>
  </tr>
  <tr>
    <td>Multi-line concatenation after <code>+</code></td>
    <td>✅</td>
    <td><code>"a" +</code><br/><code>"b"</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>A line break may occur after <code>+</code>.</td>
  </tr>
  <tr>
    <td>Reject line break before <code>+</code></td>
    <td>✅</td>
    <td><code>"a"</code><br/><code>+ "b"</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>The <code>+</code> operator must appear on the same logical line as the preceding operand.</td>
  </tr>
  <tr>
    <td>Reject numeric-only plus expressions</td>
    <td>✅</td>
    <td><code>1 + 2 + 3</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>YINI does not define numeric addition.</td>
  </tr>
  <tr>
    <td>Reject lists/objects as concatenation operands</td>
    <td>✅</td>
    <td><code>"x" + [1, 2]</code>, <code>"x" + { a: 1 }</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Lists and inline objects must not be used as concatenation operands.</td>
  </tr>
</table>

---

### ✅ — 8. Object Literals
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
    <td>✅</td>
    <td><code>{ key: value, ... }</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Inline, supports nesting, object member separators, and trailing comma handling.</td>    
  </tr>
  <tr>
    <td>Nested objects inside objects</td>
    <td>✅</td>
    <td>Objects themselves are literals and can be nested</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>
  <tr>
    <td>Nested objects inside lists</td>
    <td>✅</td>
    <td>Objects themselves are literals and can be nested</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>
  <tr>
    <td>Inline object member separators</td>
    <td>✅</td>
    <td><code>{ key: value }</code> and lenient <code>{ key = value }</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
     <td>Recognizes both <code>:</code> and <code>=</code> as inline object member separators.<br/>
     In lenient mode, both are accepted for flexibility.<br/>
     In strict mode, <code>=</code> is rejected as a syntax error to enforce the canonical <code>key: value</code> form.</td>
  </tr>
  <tr>
    <td>Duplicate inline object member keys</td>
    <td>✅</td>
    <td><code>{ a: 1, a: 2 }</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Lenient mode: first member wins and later duplicates are ignored with warning. Strict mode: error. Implementations must not silently overwrite. Implemented in the AST builder and covered by object literal tests.</td>
  </tr>
  <tr>
    <td>Object member value same-line rule</td>
    <td>✅</td>
    <td><code>a: 1</code> valid, but newline after <code>:</code> before value is invalid</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Inside inline objects, the value must begin on the same logical line as the object member separator. Enforced by the grammar rule <code>object_member : KEY object_member_separator value</code>.</td>
  </tr>
  <tr>
    <td>Object opening brace same-line rule</td>
    <td>✅</td>
    <td><code>obj = { ... }</code>; newline after <code>=</code> is not an object value</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>The opening <code>{</code> must appear on the same logical line as <code>=</code>. Enforced through the same-line member/value grammar.</td>
  </tr>
</table>

---

### ✅ — 9. List Literals
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
    <td>✅</td>
    <td><code>key = [a, b, c]</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Trailing comma allowed and is ignored (lenient only)</td>
  </tr>
  <tr>
    <td>Nested lists inside lists</td>
    <td>✅</td>
    <td>Lists themselves are literals and can be nested</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>
  <tr>
    <td>Nested lists inside objects</td>
    <td>✅</td>
    <td>Lists themselves are literals and can be nested</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>
  <tr>
    <td>List opening bracket same-line rule</td>
    <td>✅</td>
    <td><code>items = [ ... ]</code>; newline after <code>=</code> is not a list value</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>The opening <code>[</code> must appear on the same logical line as <code>=</code>. Enforced through the same-line member/value grammar.</td>
  </tr>
</table>

---

### 🚧 — 10. Special & Validation Modes
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
    <td>✅</td>
    <td><code>/END</code>, non-case-sensitive</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Case-insensitive terminator implemented. Missing-terminator behavior is controlled by <code>requireDocTerminator</code>: <code>optional</code>, <code>warn-if-missing</code>, or <code>required</code>.</td>
  </tr>
  <tr>
    <td>Lenient mode (default)</td>
    <td>✅</td>
    <td>Allows trailing commas, blank/null values, multiple top-level sections, root-level members, and warning-based recovery where allowed by the rules.</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Default parser mode.</td>
  </tr>
  <tr>
    <td>Strict mode</td>
    <td>🚧</td>
    <td>Enable stricter structural validation and stricter default rule behavior. In strict mode, there must be exactly one explicit top-level section. Some strict-related rules may also be overridden by parse options.</td>
    <td>✅</td>
    <td>🚧</td>
    <td>🚧</td>
    <td>Still being refined; some behavior is controlled by rule options such as <code>requireDocTerminator</code> and <code>treatEmptyValueAsNull</code>.</td>
  </tr>
  <tr>
    <td><code>@yini strict</code> / <code>@yini lenient</code> mode declarations</td>
    <td>✅</td>
    <td>Optional mode declaration after the YINI marker</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>
      Declaration does not switch parser mode.
      <code>@yini strict</code> parsed in lenient mode must produce a mode-mismatch error.
      <code>@yini lenient</code> parsed in strict mode must remain valid, but must produce a mode-mismatch warning.
    </td>
  </tr>
  <tr>
    <td>Give error on empty document in strict mode</td>
    <td>✅</td>
    <td>Document contains only whitespace, comments, and/or disabled lines</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Must result in an error.</td>
  </tr>  
  <tr>
    <td>Give warning on empty document in lenient mode</td>
    <td>✅</td>
    <td>Document contains only whitespace, comments, and/or disabled lines</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Must not fail, SHOULD produce a warning diagnostic that the file has no meaningful content.</td>
  </tr>
  <tr>
    <td>Optional Bail/Abort sensitivity levels</td>
    <td>✅</td>
    <td>Level 0 = Ignore errors and try parse anyway (may remap faulty key/section names).<br/>
    Level 1 = Abort on errors only.<br/>
    Level 2 = Abort even on warnings.</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>
  <tr>
    <td>Detect multiple <code>@yini</code></td>
    <td>✅</td>
    <td>If using multiple <code>@yini</code> should warn in lenient and cause error in strict mode</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>This requires updates in the grammar and its parser logic</td>
  </tr>
  <tr>
    <td>Only one document terminator</td>
    <td>🚧</td>
    <td>Reject multiple <code>/END</code> markers</td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Grammar and AST builder logic enforce a single document terminator position. Add a focused regression test for multiple <code>/END</code> markers.</td>
  </tr>
  <tr>
    <td>Strict-mode filename suffix <code>.strict.yini</code></td>
    <td>🔲</td>
    <td>Optional filename convention for files intended to be parsed in strict mode</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Does not switch parser mode. Implementation SHOULD warn if a <code>.strict.yini</code> file is parsed in lenient mode.</td>
  </tr>
  <tr>
    <td>Meta: Count num of sections</td>
    <td>🚧</td>
    <td>Meta info</td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Assigned by the AST builder; dedicated count assertion test is still skipped.</td>
  </tr>
  <tr>
    <td>Meta: Count num of members</td>
    <td>🚧</td>
    <td>Meta info</td>
    <td>✅</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Assigned by the AST builder; dedicated count assertion test is still skipped.</td>
  </tr>
</table>

---

### ✅ — 11. Public API & Options (ParseOptions)

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
    <td><code>tools/yini-test-adapter.ts</code> adapter contract</td>
    <td>✅</td>
    <td>Adapter behavior for external conformance/tooling test runners.</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Defines command-line behavior, input handling, parser mode selection, and JSON output contract for yini-test integration.</td>
  </tr>
  <tr>
    <td><code>strictMode</code></td>
    <td>✅</td>
    <td>Enable strict parsing</td>
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
    <td><code>YINI.parseForTooling(...)</code></td>
    <td>✅</td>
    <td>Tooling-oriented parse API that returns structured result and diagnostics data.</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Intended for editor integrations, adapters, diagnostics, and non-throwing tooling workflows.</td>
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
    <td>Throw on parse errors when the effective fail level aborts on errors.</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td></td>
  </tr>

  <tr>
    <td><b>rules.onDuplicateKey</b></td>
    <td>✅</td>
    <td><code>'error' | 'warn-and-keep-first' | 'warn-and-overwrite' | 'keep-first' | 'overwrite'</code></td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
    <td>Implemented in the AST builder. <code>overwrite</code> keeps the last value; <code>keep-first</code> keeps the first value.</td>
  </tr>

  <tr>
    <td><b>rules.requireDocTerminator</b></td>
    <td>✅</td>
    <td><code>'optional' | 'warn-if-missing' | 'required'</code> — require <code>/END</code> at EOF</td>
    <td>✅</td>
    <td>✅</td>
    <td>✅</td>
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
> A clear, structured, and human-friendly configuration format.  

[yini-lang.org](https://yini-lang.org) · [YINI-lang on GitHub](https://github.com/YINI-lang)  
