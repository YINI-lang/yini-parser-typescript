YINI Parser – Feature Implementation Status
===========================================

This table shows the implementation status of the YINI parser according to the YINI Specification v1.0.0 Beta 7xxx.

#### Legend
- **Status:**
  * ✅ All sub-features done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not yet
  * ❌ Not planned
- **Parse:** (parsing implemented)
  * ✔️ Yes, done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not started
  * ❌ Not planned
- **Test:** (unit/integration test)
  * ✔️ Yes, done
  * 🚧 Partially or WIP (Work in Progress)
  * 🔲 Not started
  * ❌ Not planned

### Checklist Table
<table>
  <tr>
    <th>Main Feature</th>
    <th>Status</th>
    <th>Sub-Feature / Detail</th>
    <th>Parse</th>
    <th>Test</th>
    <th>Notes</th>
  </tr>

  <!-- Basic Parsing Group -->
  <tr>
    <td rowspan="2">Basic Parsing (with Simple types)</td>
    <td rowspan="2">✅</td>
    <td>Key-value pairs</td>
    <td>✅</td>
    <td>🔲</td>
    <td>All simple YINI syntax covered</td>
  </tr>
  <tr>
    <td>Simple type inference</td>
    <td>✅</td>
    <td>✅</td>
    <td>Numbers, booleans, null, strings</td>
  </tr>

  <!-- Section Headers Group -->
  <tr>
    <td rowspan="2">Section Headers</td>
    <td rowspan="2">🔲</td>
    <td>Standard syntax</td>
    <td>✅</td>
    <td>🔲</td>
    <td>Supports single and multi-level</td>
  </tr>
  <tr>
    <td>Shorthand syntax</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>e.g. ^3 for third-level section</td>
  </tr>

  <!-- Comments Group -->
  <tr>
    <td rowspan="2">Comments</td>
    <td rowspan="2">🔲</td>
    <td>Full-line</td>
    <td>✅</td>
    <td>🔲</td>
    <td># and // supported</td>
  </tr>
  <tr>
    <td>Inline</td>
    <td>✅</td>
    <td>🔲</td>
    <td>Allowed after value on same line</td>
  </tr>

  <!-- Multi-line Strings Group -->
  <tr>
    <td rowspan="2">Multi-line Strings</td>
    <td rowspan="2">🔲</td>
    <td>Triple-quoted</td>
    <td>✅</td>
    <td>🔲</td>
    <td>Preserves newlines and whitespace</td>
  </tr>
  <tr>
    <td>Classic escaped</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Supports escape sequences</td>
  </tr>

  <!-- Lists Group -->
  <tr>
    <td rowspan="2">Lists</td>
    <td rowspan="2">🔲</td>
    <td>Comma separated</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Flat, homogeneous or mixed types</td>
  </tr>
  <tr>
    <td>Newline separated</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Also supported</td>
  </tr>

  <!-- Validation Modes Group -->
  <tr>
    <td rowspan="2">Validation Modes</td>
    <td rowspan="2">🔲</td>
    <td>Strict</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Not yet fully implemented</td>
  </tr>
  <tr>
    <td>Lenient</td>
    <td>🔲</td>
    <td>🔲</td>
    <td>Default mode</td>
  </tr>
</table>