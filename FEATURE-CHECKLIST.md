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
- **Test:** (unit/integration test)
  * ✔️ Yes, done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not started
  * ❌ Not currently
- **Verf:** (verification)
  * ✔️ Yes, done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not started
  * ❌ Not currently

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
    <td>-</td>
    <td>🔲</td>
    <td><code></code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
</table>

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
    <td>Simple identifiers</td>
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
    <td>-</td>
    <td>🔲</td>
    <td><code></code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
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
    <td>Backticked sections headers</td>
    <td>🔲</td>
    <td><code>^`8.MySection`</code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Section identifiers</td>
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

### 🔲 — Alternative Section Headers
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
    <td>-</td>
    <td>🔲</td>
    <td><code></code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
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
    <td>-</td>
    <td>🔲</td>
    <td><code></code></td>
    <td>🔲</td>
    <td>🔲</td>
    <td>🔲</td>
    <td></td>
  </tr>
</table>
