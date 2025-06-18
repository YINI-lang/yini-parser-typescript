YINI Parser – Feature Implementation Status
===========================================

This table shows the implementation status of the YINI parser according to the YINI Specification v1.0.0 Beta 7xxx.

#### Legend
- **Status:** (and **Table Title**)
  * ✅ All sub-features done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not started
  * ❌ Not currently
- **Parse:** (parsing implemented)
  * ✔️ Yes, done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not started
  * ❌ Not currently
- **Test:** (unit/integration test, NOTE: smoke tests not counted)
  * ✔️ Yes, done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not started
  * ❌ Not currently
- **Verf:** (verification)
  * ✔️ Yes, done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not started
  * ❌ Not currently

### 🚧 — Basic Parsing / Members
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Parse</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Simple (key and header) identifiers</td>
    <td>🔲</td>
    <td><code></code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Non backticked</td>
  </tr>
  <tr>
    <td>Type inference</td>
    <td>🔲</td>
    <td>String, integer, float, boolean, null</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Based on value syntax</td>
  </tr>
  <tr>
    <td>Key-value pairs</td>
    <td>🔲</td>
    <td>Simple assignment <code>key = value</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Core syntax</td>
  </tr>
  <tr>
    <td>Sub-sections</td>
    <td>🔲</td>
    <td>Section nesting</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
  <tr>
    <td>Unique keys (per section)</td>
    <td>🔲</td>
    <td>Reformat/emit error/warning</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Enforce per nesting level</td>
  </tr>
</table>

### 🔲 — File Structure
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Parse</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>UTF-8 Encoding</td>
    <td>🔲</td>
    <td>BOM detection</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Must handle with/without BOM</td>
  </tr>
  <tr>
    <td>Shebang support</td>
    <td>🔲</td>
    <td><code>#!</code> on first line</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Ignored by parser</td>
  </tr>
  <tr>
    <td>@yini optional keyword</td>
    <td>🔲</td>
    <td><code>@yini</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Reserved for future</td>
  </tr>
  <tr>
    <td>Check file extension .yini</td>
    <td>🔲</td>
    <td><code></code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Naming convention</td>
  </tr>
</table>

### 🚧 — Basic / Simple Literals
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Parse</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Integer and float numbers</td>
    <td>🔲</td>
    <td><code>123</code>, <code>3.14</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Basic numbers</td>
  </tr>
  <tr>
    <td>Basic strings, single and double quoted</td>
    <td>🔲</td>
    <td><code>'Hello'</code>, <code>"World"</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Basic strings without prefix</td>
  </tr>
  <tr>
    <td>All Boolean literals</td>
    <td>🔲</td>
    <td><code>true</code>, <code>false</code>, <code>Yes</code>, <code>No</code>, <code>ON</code>, <code>OFF</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td><b>⚠️Case-insensitive</b></td>
  </tr>
  <tr>
    <td>(Explicit) All Null literals</td>
    <td>🔲</td>
    <td><code>null</code>, <code>NULL</code>, <code>Null</code>etc</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td><b>⚠️Case-insensitive</b></td>
  </tr>
</table>

### 🚧 — Comments + Disable line
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Parse</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Full-line comment with `;` </td>
    <td>🔲</td>
    <td><code>; Line comment</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
  <tr>
    <td>Inline comment with `#`, `//`</td>
    <td>🔲</td>
    <td><code># Comment</code><br/><code>// Comment</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td># must be followed by space/tab to be a comment</td>
  </tr>
  <tr>
    <td>Block comment</td>
    <td>🔲</td>
    <td><code>/* ... */</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
  <tr>
    <td>Disable line with `--`</td>
    <td>🔲</td>
    <td><code>--This line is ignored</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>For temporarily ignoring valid code</td>
  </tr>
</table>

### 🚧 — Extended Parsing
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Parse</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Backticked keys (identifiers)</td>
    <td>🔲</td>
    <td><code>`this is a key`</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Key name in members</td>
  </tr>
  <tr>
    <td>Backticked sections headers (identifiers)</td>
    <td>🔲</td>
    <td><code>^`8.MySection`</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Section names with spaces etc.</td>
  </tr>
  <tr>
    <td>Standard section marks (^, ~)</td>
    <td>🔲</td>
    <td><code></code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Repeat up to MAX 6 characters, indent optional</td>
  </tr>
  <tr>
    <td>Shorthand section marker (^7, etc.)</td>
    <td>🔲</td>
    <td><code>^7Section</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Arbitrary nesting</td>
  </tr>
  <tr>
    <td>(Implicit) Null</td>
    <td>🔲</td>
    <td>Empty value</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td><b>⚠️Only in non-strict-mode</b></td>
  </tr>
  <tr>
    <td>Members without any section</td>
    <td>🔲</td>
    <td>key = 123</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td><b>⚠️(Implicit) Base object</b></td>
  </tr>
  <tr>
    <td>Multiple 1-level sections</td>
    <td>🔲</td>
    <td><code>^ Title1
 ^ Title2</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td><b>⚠️(Implicit) Base object</b></td>
  </tr>
</table>

### 🔲 — Number Literals
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Parse</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>-</td>
    <td>🔲</td>
    <td><code></code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
</table>

### 🔲 — String Literals
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Parse</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>-</td>
    <td>🔲</td>
    <td><code></code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
</table>

### 🔲 — Object Literals
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Parse</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>-</td>
    <td>🔲</td>
    <td><code></code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
</table>

### 🔲 — List Literals
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Parse</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>-</td>
    <td>🔲</td>
    <td><code></code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
</table>

### 🔲 — Validation Modes
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Parse</th>
    <th>Test</th>
    <th>Verf</th>
    <th>Notes</th>
  </tr>

  <tr>
    <td>Lenient mode (default)</td>
    <td>🔲</td>
    <td>Allows trailing commas, blank/null values, etc</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
  <tr>
    <td>Strict mode option</td>
    <td>🔲</td>
    <td>Enforce all structure/terminator, etc</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Terminator /END required, no trailing comma, etc</td>
  </tr>
  <tr>
    <td>Document terminator</td>
    <td>🔲</td>
    <td><code>/END</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>/END required in strict mode, optional in lenient</td>
  </tr>
</table>

### 🔲 — Reserved/Advanced Features
<table>
  <tr>
    <th>Sub-Feature</th>
    <th>Status</th>
    <th>Details</th>
    <th>Parse</th>
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
