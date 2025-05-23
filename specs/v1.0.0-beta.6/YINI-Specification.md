_YINI: A lightweight configuration file format — clean, readable, structured._

> \~ YINI ≡
---
# Specification for the YINI Format
**Version:** v1.0.0 Beta 6

> **Note:** This specification of the YINI format may introduce changes that are not backward-compatible (see Section 13.2, "Versioning Strategy").

```yini
^ YINI
Yet_another = 'INI'
```
© 2025 Marko K. Seppänen. Licensed under the Apache License, Version 2.0.
See the full license text at the end of this document.

---

## Preface
**YINI was designed with a simple idea in mind:** configuration files should be easy for humans to write, read, and understand — without sacrificing structure or future flexibility. It aims to stay minimal, yet flexible enough to express a wide range of configuration needs.

That said, there are already many excellent configuration formats out there, and most are great at what they do. **YINI isn't trying to replace them** — it's intended as a complement to existing formats.

YINI was initially developed to fill gaps encountered in another project where INI, JSON, or YAML each fell short. See [A.1. Why was YINI created?](./RATIONALE.md) for background.

While inspired by established formats such as INI, JSON, Python, Markdown, and YAML, YINI introduces a clean, minimalistic design **focused on human readability**, **structural clarity**, and extensibility for the future.  
One of YINI's key strengths is its intuitive approach to **nesting sections**, allowing complex structures to be expressed in a simple, natural, and visually clear way — without the strict indentation rules or syntax overhead found in some other formats.

YINI embraces simplicity as a strength, offering just enough rules to stay consistent, while staying forgiving enough for real-world use.

This specification defines the YINI format with care and clarity, aiming to serve both casual users and implementers seeking a robust, reliable configuration format.  
Above all, YINI remains true to its founding goal: **make configuration effortless**.

(See more in section 1.2.1, "The # Marker as a Comment Symbol".)

Some parts of the YINI specification have benefited from valuable feedback and insights shared by users in the broader community, see Section 15.2, _Acknowledgments_ for more.

---

## Table of Contents

---

### **Part I – Introduction and Fundamentals**

**1. Introduction**  
&nbsp;&nbsp;&nbsp;&nbsp;1.1. What is YINI?  
&nbsp;&nbsp;&nbsp;&nbsp;1.2. Purpose and Design Goals  
&nbsp;&nbsp;&nbsp;&nbsp;1.3. Background and Intent  
&nbsp;&nbsp;&nbsp;&nbsp;1.4. Key Features  
&nbsp;&nbsp;&nbsp;&nbsp;1.5. Terminology

**2. File Structure**  
&nbsp;&nbsp;&nbsp;&nbsp;2.1. File Encoding  
&nbsp;&nbsp;&nbsp;&nbsp;2.2. File Extension  
&nbsp;&nbsp;&nbsp;&nbsp;2.3. Optional Shebang (`#!`)  
&nbsp;&nbsp;&nbsp;&nbsp;2.4. Reserved: Optional Header (`@yini`) *(for future use)*

**3. Syntax Overview**  
&nbsp;&nbsp;&nbsp;&nbsp;3.1. General Syntax Rules  
&nbsp;&nbsp;&nbsp;&nbsp;3.2. Whitespace and Indentation  
&nbsp;&nbsp;&nbsp;&nbsp;3.3. Comments  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.3.1. Inline Comments  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.3.2. Multi-line Block Comments  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3.3.3. Full-line Comments  
&nbsp;&nbsp;&nbsp;&nbsp;3.4. Identifiers  
&nbsp;&nbsp;&nbsp;&nbsp;3.5. Document Terminator  
&nbsp;&nbsp;&nbsp;&nbsp;3.6. Disable Line

---

### **Part II – Grammar and Literals**

**4. Keys and Values**  
&nbsp;&nbsp;&nbsp;&nbsp;4.1. Key Naming Rules  
&nbsp;&nbsp;&nbsp;&nbsp;4.2. Value Types (Simple, Compound, Special)  
&nbsp;&nbsp;&nbsp;&nbsp;4.3. Type Rules

**5. Section Headers**  
&nbsp;&nbsp;&nbsp;&nbsp;5.1. Syntax  
&nbsp;&nbsp;&nbsp;&nbsp;5.2. Section Markers (`^`, `~`)  
&nbsp;&nbsp;&nbsp;&nbsp;5.3. Sections in Sections (Nested Sections)

**6. String Literals**  
&nbsp;&nbsp;&nbsp;&nbsp;6.1. Raw Strings (R-Strings)  
&nbsp;&nbsp;&nbsp;&nbsp;6.2. Hyper Strings (H-Strings)  
&nbsp;&nbsp;&nbsp;&nbsp;6.3. Classic Strings (C-Strings)  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.3.1. Escape Characters  
&nbsp;&nbsp;&nbsp;&nbsp;6.4. Triple-Quoted Strings  
&nbsp;&nbsp;&nbsp;&nbsp;6.5. String Concatenation  
&nbsp;&nbsp;&nbsp;&nbsp;6.6. String Type Mixing

**7. Number Literals**  
&nbsp;&nbsp;&nbsp;&nbsp;7.1. Numbers  
&nbsp;&nbsp;&nbsp;&nbsp;7.2. Exponent Format  
&nbsp;&nbsp;&nbsp;&nbsp;7.3. Number Formats

**8. Boolean and Null Literals**  
&nbsp;&nbsp;&nbsp;&nbsp;8.1. Booleans  
&nbsp;&nbsp;&nbsp;&nbsp;8.2. Null Literal

**9. List Literals**  
&nbsp;&nbsp;&nbsp;&nbsp;9.1. Bracketed Lists (using `=`)  
&nbsp;&nbsp;&nbsp;&nbsp;9.2. Colon-Based List (using `:`)

**10. Advanced Constructs**  
&nbsp;&nbsp;&nbsp;&nbsp;10.1. Future / Reserved Features _(For Future Use)_  

---

### **Part III – Validation, Implementation & Compatibility**

**11. Validation Rules**  
&nbsp;&nbsp;&nbsp;&nbsp;11.1. Reserved Syntax  
&nbsp;&nbsp;&nbsp;&nbsp;11.2. Well-Formedness Requirements  
&nbsp;&nbsp;&nbsp;&nbsp;11.3. Lenient vs. Strict Modes _(Optional Feature)_  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;11.3.1. Table: Lenient vs. Strict Mode

**12. Implementation Notes**  
&nbsp;&nbsp;&nbsp;&nbsp;12.1. Top-Level Sections and Implicit Root  
&nbsp;&nbsp;&nbsp;&nbsp;12.2. Line Handling and Whitespace  
&nbsp;&nbsp;&nbsp;&nbsp;12.3. Value and NULL Handling  
&nbsp;&nbsp;&nbsp;&nbsp;12.4. Boolean Canonicalization  
&nbsp;&nbsp;&nbsp;&nbsp;12.5. Lists  
&nbsp;&nbsp;&nbsp;&nbsp;12.6. Strings Concatenation  
&nbsp;&nbsp;&nbsp;&nbsp;12.7. String Literal Types  
&nbsp;&nbsp;&nbsp;&nbsp;12.8. Comments  
&nbsp;&nbsp;&nbsp;&nbsp;12.9. Error Handling Recommendations  
&nbsp;&nbsp;&nbsp;&nbsp;12.10. Bonus Tips for Implementation

**13. Compatibility and Versioning**  
&nbsp;&nbsp;&nbsp;&nbsp;13.1. Fallback Rules  
&nbsp;&nbsp;&nbsp;&nbsp;13.2. Versioning Strategy  
&nbsp;&nbsp;&nbsp;&nbsp;13.3. Encoding Notes  
&nbsp;&nbsp;&nbsp;&nbsp;13.4. JSON Compatibility

---

### **Part IV – Examples and Appendices**

**14. Examples**  
&nbsp;&nbsp;&nbsp;&nbsp;14.1. Minimal Example  
&nbsp;&nbsp;&nbsp;&nbsp;14.2. Realistic Config Use Cases  
&nbsp;&nbsp;&nbsp;&nbsp;14.3. Examples of YINI → JSON Mapping  
&nbsp;&nbsp;&nbsp;&nbsp;14.4. Examples of JSON → YINI Mapping  

**15. Appendices and Reserved Areas**  
&nbsp;&nbsp;&nbsp;&nbsp;15.1. License  
&nbsp;&nbsp;&nbsp;&nbsp;15.2. Acknowledgments  
&nbsp;&nbsp;&nbsp;&nbsp;15.3. Author(s)  
&nbsp;&nbsp;&nbsp;&nbsp;15.4. Spec Changes  
&nbsp;&nbsp;&nbsp;&nbsp;15.5. Reserved: Grammar (Formal)  
&nbsp;&nbsp;&nbsp;&nbsp;15.6. Appendix C – Common Mistakes and Pitfalls

---

## 1. Introduction
### 1.1. What is YINI?
**YINI (Yet another INI)** is a lightweight, human-readable configuration file format—defined by a formal grammar—designed to provide simplicity, flexibility, and clear separation of concerns in configuration data. Its syntax is inspired by widely-used configuration file formats like INI and YAML, but also by JSON, C, and Python. YINI aims to offer a more consistent and intuitive structure, allowing for easy parsing and editing by both humans and machines.

YINI is particularly targeted at users who need a straightforward format for storing and organizing configuration data, where human readability and ease of use are paramount. YINI is flexible enough to handle a wide range of use cases—from simple key-value pairs to nested and structured data—making it an effective choice for everything from application preferences and program settings to complex system configuration files.

### 1.2. Purpose and Design Goals

#### 1.2.1. The # Marker as a Comment Symbol
In earlier drafts of YINI (up to Beta 5), the `#` character was temporarily used as a section header marker, inspired by Markdown-style headers. However, based on feedback and concerns about clarity, expectations from other formats, and common usage across tools and communities, this decision was revised.

YINI now treats `#` as a comment symbol (instead of being used as a section marker), aligning with conventions found in formats like classic INI, Bash, YAML, and various scripting environments. This change improves predictability for users familiar with other configuration file styles. See [A.4. Design Philosophy](./RATIONALE.md) for background.

- The `#` starts a comment **only** when followed by a space or tab.
- **Note:** `##` is invalid, `# #` is valid as a comment.

#### 1.2.2. Key Design Goals
The YINI format was created with the following key design goals in mind:

- **Simplicity:** YINI is designed to be as simple and intuitive as possible. The syntax is minimalistic yet expressive, with clear conventions for defining sections, keys, and values. **Prioritize clarity over cleverness.**

- **Human Readability:** A core principle of YINI is that it should feel natural and intuitive for humans to work with. Its structure is designed to be clear and predictable, minimizing unnecessary complexity so that configuration files are easy to read, understand, write, and maintain—even for non-programmers.

- **Flexibility:** While simple, YINI is designed to accommodate a variety of data structures, including primitive values (strings, numbers, booleans, nulls) and more complex ones like lists and nested sections.
 
- **Compatibility:** YINI is meant to be compatible with a variety of tools and libraries, ensuring that it can be easily integrated into different programming languages and ecosystems.
     
> It also allows for optional extensions, enabling future enhancements without breaking backward compatibility.

- **Extensibility:** The format is designed to be extendable, allowing for future features and syntax to be incorporated as needed, such as support for anchors, includes, or custom validation rules.

### 1.3. Background and Intent
YINI was created to serve as a clean, minimal, and predictable configuration format that balances readability with structure. For a deeper look into the motivation and design philosophy, see [Why YINI?](./RATIONALE.md).

### 1.4. Key Features
**Note:** Unless explicitly stated otherwise, YINI parsers are expected to operate in lenient (non-strict) mode by default. Strict mode is optional and intended for validation-intensive environments.

YINI aims to prioritize **human readability, clarity, and clean syntax**.

- **Clear Sectioning:** Sections are clearly delineated, allowing for organized groupings of related configuration data. Section headers are marked with the symbol `^` (or `~` as an alternative).

- **Flexible Data Types:** YINI supports a variety of data types, including strings, numbers, booleans, nulls, and lists. This flexibility makes it suitable for both simple and complex configuration needs.

- **Type Inference:** There is no need to declare types explicitly — the parser determines the value type by how it is written (e.g., quotes, brackets, keywords).

- **Commenting and Documentation:** YINI allows for inline comments, enabling users to document their configuration files directly. This enhances the human-readable nature of the format and makes it easier for teams to collaborate on configuration management.

- **Multi-line and Nested Data:** The format supports multi-line strings and nested sections, providing the ability to express more complex configurations while maintaining readability.

- **Clear End of Document:** YINI supports (only in stict-mode) a clear document terminator marker (`/END`).

## 1.5. Terminology
The following key terms are used consistently throughout this specification. Understanding these terms will help interpret YINI’s grammar, structure, and semantics.

| Term                     | Definition |
|---------------------------|------------|
| Classic String (C-String) | A string prefixed with `C` that supports escape sequences like `\n`, `\t`, etc. |
| Configuration             | A structured set of members and sections that defines settings or data in a YINI document or file. |
| Document Terminator       | A special line (`/END`) that explicitly marks the end of a YINI document (only required in strict mode). |
| Hyper String (H-String)    | A multi-line string prefixed with `H` that normalizes whitespace and trims edges. |
| Identifier                | The name of a key or section. Can be a simple word (e.g., `title`) or a **backticked identifier** (wrapped in backticks). |
| Key                       | An identifier on the left side of an assignment (`=` (or the alternative `:` list notation)). Keys must be unique within their section (and depth/level). |
| Lenient Mode         | This is the default parsing mode in YINI. |
| List                      | Lists also known as Arrays. A compound value type consisting of zero or more comma-separated items, defined with either `=` and `[]` (or `:` and line-separated values). |
| Member                    | A key-value pair, such as `key = value`, representing a single entry within a section or root. |
| Raw String (R-String)      | A string literal that does not interpret escape sequences **(default type)**. |
| Section                   | A logical grouping of members, introduced by a header using a section marker like `^`, `~`. |
| Section Marker            | A special character (`^`, alternative is `~`) that denotes a new section header. |
| Strict Mode               | An optional parsing mode where all structural and validation rules (incl. the document terminator) are strictly enforced. Not the default. |
| Triple-Quoted String      | A string enclosed in `""" ... """`, allowing multi-line raw content without escapes. |
| Value                     | The data assigned to a key. Can be of type string, number, boolean, null, or list. |
| YINI document             | A complete YINI configuration. In this specification, "document" and "file" mean the same thing. |
| YINI file                 | A complete YINI configuration. In this specification, "file" and "document" mean the same thing. |
| YINI                      | Short for "Yet another INI", a human-readable configuration format blending INI-style sections with modern typing and structure. |

## 2. File Structure
The structure of a YINI file is designed to be simple, clear, and highly readable. The file structure determines how data is organized, encoded, and presented. Below are the key elements of the file structure.

### 2.1. File Encoding
YINI files must be encoded in **UTF-8**. This encoding ensures compatibility with most systems and applications, providing a consistent method for interpreting characters.

- **Mandatory Encoding:** All YINI files should be encoded using UTF-8 without a Byte Order Mark (BOM). This guarantees that the file content is universally readable across different platforms.

- **Character Set:** Only Unicode characters are allowed. Special or non-printable characters, such as control characters (except spaces, tabs, and newlines are allowed), should not be used unless specifically required for escape sequences.

### 2.2. File Extension
YINI files should use the `.yini` file extension. This extension helps clearly identify the file type and ensures proper handling by tools and parsers designed for the YINI format.

### 2.3. Optional Shebang (`#!`)
For Unix-based systems, a shebang (#!) is commonly used in script files to specify the interpreter. This feature is supported in YINI files, making it possible to use YINI documents as configuration files for scripts or command-line applications.

**How to Use the Shebang:**
- The **very first line** of the document may optionally begin with a Unix-style **shebang** (`#!`), which specifies the interpreter for the script.
- If present, the shebang line will be ignored by the YINI parser.

Here’s an example of a YINI document with a shebang that could be used in a Unix-based scripting environment:
```yini
#!/usr/bin/env yini

# Config
key = value
```

## 3. Syntax Overview
The syntax of YINI is designed to be minimalistic and human-readable while offering enough flexibility for structured data representation. This section provides an overview of the key syntax rules for YINI files.

### 3.1. General Syntax Rules
YINI files consist of a series of **sections, members** (key-value pairs), and optional **comments**. The following rules define the basic structure of a valid YINI file:

**Whitespace:** Whitespace (spaces and newlines) is used to separate elements in the file. Tabs do not contribute to the logical structure, except in section headers, where spacing (tabs or spaces) is required between the section marker and the section name. Other than this tabs are totally ignored, though tabs or multiple spaces may be used to make it clearer for humans to read.

**Sections:** YINI files support sections, which group related members. A section begins with a section header, marked by one of the allowed characters (commonly `^`), and then at least one space or tab, followed by the section name. Before a section header there may exist indentation and spacing for human readability.

**Example of a section:**
```yini
^ SectionName
key = value
```

**Keys and Values (Members):** The basic unit of YINI is a key-value pair, called a Member. A key and its associated value are separated by an equal sign (=). Any number of spaces or tabs may appear before or after the `=`.

**Example:**
```yini
key = value
```

**Comments:** YINI primarly followes C-style commenting rules using `//` and `/* ... */`. Alternative inline `#` comments, and full-line `;` comments are supported too. These are ignored by parsers and exist solely for human readability.

**Example:**
```ini
; Full-line comment.
key1 = "Banana"

key2 = "Mango"  # This is an inline comment.
key3 = "Peach"  // This is also an inline comment.

/*
  This is a block comment.
  It spans several lines.
*/
```

### 3.2. Whitespace and Indentation
While YINI is not indentation-sensitive, the following whitespace behaviors are defined:

- Newlines (`<NL>`) may be either Unix-style (`LF`, U+000A) or Windows-style (`CRLF`, U+000D U+000A).
- Tabs (`<TAB>`, U+0009) and blank spaces (`<SPACE>`, U+0020) are ignored outside of quoted values and section headers.
- Indentation is not syntactically required but may be used to visually structure content for clarity.

### 3.3. Comments
YINI supports **three types of comments**:

| Comment Type | Prefix | Position |
|--------------|--------|----------|
| Inline comment | `//` or `#` | At end of line |
| Block comment | `/* ... */` | Anywhere (multi-line) |
| Full-line comment | `;` | Start of line ONLY |

While both `//` and `#` are valid for inline comments, it is recommended to use **only one style per file** to maintain clarity and consistency for human readers.

See also Section 3.6, "Disable Line", for a related mechanism used to deactivate valid lines of configuration.

### 3.3.1. Inline Comments
YINI supports two syntaxes for inline comments.
- **Double slash** `//` comments are the default:
    ```yini
    // This is a single-line comment.
    ```
- **Hash `#` comments** are supported too — must be followed by **at least one space or tab** to be recognized:
    ```yini
    # This is also a single-line comment.
    ```

This rule is a deliberate compromise to avoid ambiguity with hex-like values (e.g., `#FF0033`) commonly used in domains such as styling or color settings.

  ✅ **Valid `#` comments:**
  - `# This is a comment`
  - `# Also valid`
  - `#\tTabbed too`

  ❌ **Invalid `#` comments (not treated as comments):**
  - `#FF9900` — Interpreted as a hex value.
  - `#Invalid comment` — No space or tab after `#`.
  - `##` — Not recognized as a valid comment, no space/tab follows the `#`.

### 3.3.2. Multi-line Block Comments
Multi-line (block) Comments.
  
Begin with `/*` and end with `*/`. These comments may span multiple lines.
```yini
/*
  This is a multi-line comment.
  It can span multiple lines.
*/
```

### 3.3.3. Full-line Comments
A full-line comment starts with a semicolon `;` and occupies the entire line.
```yini
; This is a full-line comment.
```

**Note:** Block comments may appear between any two members, or on their own lines. They cannot appear inside a quoted string or within an identifier. Comments are ignored by parsers and exist solely for human readability.

### 3.4. Identifiers
Identifiers are names used for keys (in members) and sections (section headers). 

An _**identifier**_ can be one of two forms below:
- **Form 1: Identifier of Simple Form:**
  - Keys must be non-empty.
  - Keys are case-sensitive (`Title` and `title` are different).
  - Can only contain letters (a-z or A-Z), digits (0-9) and underscores `_`.
  - Must begin with a letter or an underscore `_`.
  - Note: Cannot contain hyphens (`-`) or periods (`.`).
  
  Example:
  ```yini
  name
  ```

- **Form 2: Identifier Enclosed in Backticks:**
  - A phrase is a name wrapped in backticks  ``` ` ```.
  - It must be on a single line and **cannot contain** another backtick.
  - Backticked identifiers **cannot contain** tabs or line breaks (newline).
  - Escape sequences inside them are not interpreted.
  
  Example:
  ```yini
  `Description of Project`
  `Amanda's Project`
  ```
### 3.5 Document Terminator
**Note:** Below is only optional in lenient (non-strict) mode, which is the default.

A YINI document in strict mode **must always end with a terminator line**.

The document terminator explicitly marks the end of the configuration content and prevents ambiguity about whether the document was fully read.

In other words, it acts as a clear, unambiguous signal that the document is complete — without relying on end-of-file (EOF) and leaving parsers **to "guess" whether the final section or member was fully parsed**.

The **default and recommended** terminator is:
```yini
/END
```

This line is **not case-sensitive** (`/end`, `/End`, etc. are also valid).
Only **whitespaces or comments** may appear after the terminator.

It is recommended that there are no leading spaces or tabs, on the same line as the terminator. If there are comments after the marker, these should be ignored.

### 3.6. Ignore / Disable Line
A line that begins with a **double dash** (`--`) is treated as a **disabled line** and will be completely ignored by the YINI parser. Everything after `--` until the end of the line (`<NL>`) is disregarded — including any comments or syntactically valid members.

This mechanism is similar to a comment, but serves a **distinct purpose**: disabling or temporarily excluding valid configuration lines without deleting them.

**Example 1:**
```yini
// The next line is ignored — even though it's valid syntax.
--key = "Apples"
```

**Example 2:**
```yini
^ Server
host = 'localhost'
port = 8080

--^ Features
--login = true
--notifications = false
```

**Purpose and Usage:**
- Disabled lines are intended for **temporary deactivation** of configuration content.
- Unlike comments, which are typically used for documentation or explanatory notes, **disabled lines are structurally valid syntax that is intentionally skipped**.
- This allows developers or users to **temporarily toggle** parts of the configuration without removing them.

**Visual Distinction (Editor Highlighting):**
A recommendation is that syntax highlighters use a **distinct color** or style for disabled lines — different from comments — to improve visual clarity. This helps distinguish between:
- **Comments** (notes for humans), and
- **Disabled lines** (intended-to-be-ignored syntax).

**Technical Note:**
Disabled lines are **functionally identical to comments** from the parser's point of view: they are ignored.
However, their **semantic intent** is different — they represent _temporarily inactive_ configuration logic rather than annotations.

## 4. Keys and Values
YINI represents configuration and structured data through a series of _**members**_, each of which is a key-value pair. This section defines the syntax and rules for keys and values, including allowed characters, data types, quoting, and related behaviors.

### 4.1. Key Naming Rules
A **key** is an identifier used to reference a specific value in a member (a `key = value` pair) within a YINI file.

- Keys must be valid identifiers — either a **simple form** or a **backticked identifier** (a backticked string). (See Section 3.4: Identifiers.)
- Keys must be **unique** within the same section and nesting level. 
- Keys are assigned values using `=` operator.
  
  **Exception:** In the **alternative list syntax** (see Section 9.2), the colon (`:`) is used **exclusively for defining list values**. It is not a general-purpose assignment operator.

**Examples:**
```yini
username = "admin"
user_id = 12345
```

### 4.2. Value Types (Simple, Compound, Special)
> YINI infers the type of each value automatically based on its syntax.
There is no need to declare types explicitly — the parser determines the value type by how it is written (e.g., quotes, brackets, keywords).

A YINI _**value**_ can be of one of the following three groups of native/built-in types:

- **Simple/scalar types:**
  - String
  - Number
  - Boolean

- **Compound types:**
  - List (also known as Arrays) — a sequence of values, separated by commas

- **Special type:**
  - NULL

**Note:** Currently, YINI types map 1-to-1 to native JSON types. Constructs and objects like date-time, **must currently be expressed as strings**. See more in 10.1.3, "Date-time Type".

### 4.3. Type Rules
This section describes how values (on the right-hand side of `=`) are interpreted based on their syntax.

**Note:** In addition to standard `=` assignments, YINI supports a colon-based list syntax where **`:` is used exclusively for defining lists**.
The colon (`:`) is not a general-purpose assignment operator and must not be used for single-value (of simple type) members.

#### Strings
If the value is meant to be a string, it must be quoted — either with single quotes (``` ' ```), double quotes (`"`), or triple quotes (`"""`).

**ONLY when quoted**, (even in non-strict mode) the value is considered to be of type **String**.

#### Numbers
- A sequence of digits **without a period** (`.`) is treated as a **Number** (integer).
- A sequence of digits **with a period** (`.`) is treated as a **Number** (floating-point / float).

#### Booleans
If the value matches any of the following keywords `true`, `false`, `on`, `off`, `yes`, or `no` (case-insensitive) — it is interpreted as a **Boolean**. 

#### Lists
If the value is a **bracketed sequence** (`[ ... ]`) of values (any of the supported YINI types: Numbers, Strings, Booleans, Lists, Nulls), separated by commas — the entire value is treated as a **List**.

#### Null
If the value is the keyword `null` (case-insensitive), or if the value is missing (e.g., blank after `=`, or a blank item within a bracketed sequence) — it is treated as **Null**.

**Summary:**

| Value form examples | Meaning |
|------------|---------|
| `'something'`, `"something"`, or `"""something"""` | **String** |
| `123` | **Number** (integer) |
| `3.1415` | **Number** (float) |
| `true`, `FALSE`, `On`, `off`, `YES`, `No` _(any casing)_| **Boolean** |
| `null` _(any casing)_, ` ` _(blank)_ | **Null** |
| _(Any value such as unquoted words that are not booleans, numbers, or null)_ | **ERROR** |

**Example:**
```txt
name = 'Sarosh'                // String
BTW = "BTW means By The Way."  // String
age = 42                       // Number
e = 2.718                      // Number
isActive = True                // Boolean
nightMode = OFF                // Boolean
nothing = Null                 // Null
alsoNothing =                  // Null (blank, not recommended)
scores = [1, 2, 3]             // List
mixed = ["Arial", 12, true]    // List (mixed types)
```

## 5. Section Headers
Sections in YINI are used to organize related members (key-value pairs) into logical groups. This allows for improved readability, structure, and modularity within configuration files.

### 5.1. Syntax
A _**section header**_ starts a new logical grouping of members. Section headers must ALWAYS appear on their own line.
```yini
// A section header with a simple identifier.
^ SectionName

// A section header with a backticked identifier.
^ `Section name`

// Backticked identifiers can include other special symbols too.
^ `Section-name`
```

- A section header begins with a **section marker**, it is recommended (but not required) that it is followed by **one or more whitespace (space or tab) characters**, then the section name.
- The section name must be a **valid identifier**, either a **simple identifier** or a **backticked identifier** (enclosed in backticks).
- **Backticks (backticked identifier) are only required** when the identifier contains spaces, punctuation, or other special characters. 
- The section header ends at the newline. There may follow a comment on the same line, but this will get ignored by the parser.
```yini
^ UserSettings
username = "alice"
theme = "dark"
```

### 5.2. Section Markers (`^`, `~`)
YINI allows a limited set of _**section markers**_ to identify section headers. These markers help visually and semantically distinguish section starts from key-value members or comments.

Supported markers:
  - `^` (default section marker, within the 7-bit ASCII range for maximum compatibility)
  - `~` (alternative section marker, within the 7-bit ASCII range for maximum compatibility)
  - `>` (deprecated)
  - Reserved: `§` (experimental, maybe in future, for enhanced readability)
  - Reserved: `€` (experimental, maybe in future, for enhanced readability)
  - Reserved: `;`
 
### 5.3. Sections in Sections (Nested Sections)
If you want to put a section under another section, nested sections, use additional section markers to indicate each level of nesting, without skipping intermediate levels. This means that each additional marker indicates a deeper nesting level. It is not allowed to skip any level when going to higher/deeper levels, the levels must come in order when nesting to deeper levels. However, when returning to higher (shallower) levels it is allowed to skip levels. - This technique is inspired by Markdown.
```yini
^ Prefs
^^ Section
^^^ SubSection
```

```txt
^ Level1
^^^ Level3  // ❌ Invalid: cannot skip Level2
```

✅ **Example of valid section nesting:**
```yini
^ Section 1         // Main section 1 (depth 1)
^^ Section 1.1      // Sub-section of 1 (depth 2)
^^^ Section 1.1.1   // Sub-section of 1.1 (depth 3)

^^ Section 1.2      // Sub-section of 1 (depth 2)

^ Section 2         // Main section 2 (depth 1)
^^ Section 2.1      // Sub-section of 2 (depth 2)
^^^ Section 2.1.1   // Sub-section of 2.1 (depth 3)

^ Section 3         // Main section 3 (depth 1)
```

## 6. String Literals

**Prefix Glossary Table:**
|Prefix| Type Name      | Behavior Summary|
|------|----------------|---|
|_none_| Raw String     | Raw (default) if no prefix is used |
| R _(optional and has no functional effect)_   | Raw String     | No escapes, preserves text exactly (default) |
| H    | Hyper String   | Multi-line, trims & normalizes whitespace |
| C    | Classic String | Supports escape sequences like `\n`, `\t` |
**Note:**  Prefix R is optional and has no functional effect — raw strings are the default.

YINI has four types of string literals — Raw, Classic, Hyper, and Triple-quoted — each designed to help express text clearly and appropriately in different situations, whether for escape handling, whitespace normalization, or multi-line content.

String literals in YINI **must be enclosed** in either single quotes `'` or double quotes `"`, or optionally in triple double quotes `"""`. You may use whichever is preferred or most appropriate for the context.

**Note:** If a string is not quoted, it's not a string — period.

**YINI supports four types of string literals**, distinguished by an optional prefix character before the opening quote `'` or `"` (**except for triple-quoted strings** `"""`, which do not support any prefix). YINI supports multi-line strings via Hyper Strings or triple-quoted strings.

If no prefix is used, the string is treated as a **Raw string literal** by default.

Triple-quoted strings (`"""`) do not support any prefix character. Therefore, the prefix is only applicable to single-line Hyper-strings (`H`), Classic-strings (`C`), and optionally Raw-strings (`R`).

**Rules and Behavior for Strings:**
- All string literals **must start and finish on the same line**, except for **H-Strings** (see section 6.2.) and **Triple-Quoted Strings** (see section 6.4.), which can span multiple lines.
- Multiple string literals can be **concatenated** to create longer strings (see section 6.5).

**Summary**

| String Type | Enclosed In | Multi-Line | Escape Sequences | Trims Whitespace | Notes
|---|---|---|---|---|---|
| Raw Strings (default)         | `' '` or `" "`   | ❌ No | ❌ No | ❌ No | Ideal for file paths and literal text
| Hyper Strings (H-Strings)  | `H' '` or `h" "` | ✅ Yes | ❌ No | ✅ Yes | Whitespace is normalized and trimmed
| Classic Strings (C-Strings)| `C' '` or `c" "` | ❌ No | ✅ Yes | ❌ No | Supports standard escape sequences
| Triple-Quoted Strings | `""" """`   | ✅ Yes | ❌ No | ❌ No | Large multi-line blocks of literal text

### 6.1. Raw Strings (R-Strings)
In (Raw) strings the backslash **`\` is "just a backslash"** character, hence different escape sequences like newline or tabs cannot be used. The default (Raw) strings must be on the same line.

Raw strings are particularly suitable for representing file paths and other literal text.
>myPath = "C:\Users\John Smith\"  // Raw string
or
>myPath = '/home/Leila Häkkinen'
or
>myPath = '/Users/kim-lee'

#### Raw String Prefix
Any string enclosed in quotes (single `'` or double `"` ) can be prefixed with either `R` or `r` explicitly to denote it as a Raw-String, but Prefixing Raw strings is not required as strings are Raw as standard.

### 6.2. Hyper Strings (H-Strings)
Another kind of string literal supported is the **Hyper String** (H-String). These strings are prefixed with either `H` or `h`.

Like Raw Strings, Hyper Strings treat backslashes as literal characters (escape sequences are not supported).

- However, Hyper strings are special in that they **can span over multiple lines** with `<NL>`, and indentation with `<WS>` can be used to aid human readability in YINI documents.
- Multiple consecutive newlines and whitespace are normalized to a single space. 
- Also, leading and trailing `<NL>` and/or `<WS>` are trimmed away.

Hyper Strings behave similarly to plain text in HTML documents.

The following:

```yini
H"My name is
  John Doe,  
  and this is a test string."
```

Will result in:
```txt
My name is John Doe, and this is a test string.
```

### 6.3. Classic Strings (C-Strings)
Alternatively, YINI also supports standard ("Classic") string literals, called C-Strings for short. These strings are prefixed with either `C` or `c`. All the usual escape sequences that represents newlines, tabs, backspaces, form-feeds, and so on are supported.

Classic strings must start and end on the same line.

>myText = c"This is a newline \n and this is a tab \t character."

#### 6.3.1. Escape Characters
Escape sequences are supported only in Classic Strings (C-Strings), which must be enclosed in quotes and prefixed with `C` (or `c`). 

**Full List: Escape Sequences (case-sensitive, only valid in C-Strings):**
- `\\` — backslash
- `\'` — Single Quote
- `\"` — Double Quote
- `\0` — Null Byte
- `\?` — Literal question mark (for C/C++ compatibility)
- `\a` — Alert (bell)- ASCII 7
- `\b` — Backspace - ASCII 8
- `\f` — Form Feed - ASCII 12
- `\n` — Newline - ASCII 10
- `\r` — Carriage Return - ASCII 13
- `\t` — Tab - ASCII 9
- `\v` — Vertical tab - ASCII 11
- `\xhh` — Hex byte (2-digit)
- `\uhhhh` — Unicode character (4-digit hex) (UTF-16)
- `\Uhhhhhhhh` — Unicode character (8-digit hex) (UTF-32)
- `\oOOO` — Octal value (up to 3 digits, valid range `\o0` - `\o377`)
  * Equivalent to `\OOO` in C/C++
  * `\o0` has same effect as `\0`

Where:
- `h` = _Hexadecimal digit_ `0-9`, `a-f`, or `A-F`.
- `O` = _Octal digit_ `0-7`.

**Invalid Escapes**

Invalid escape sequences (e.g. `\z` or `\o378`) must result in a parse error unless explicitly allowed by a custom extension or parser configuration.

### 6.4. Triple-Quoted Strings
A **Triple-Quoted String** is a string literal that:
- **Begins and ends** with three double-quote characters: `"""`.
- **May span multiple lines** (i.e., includes newline characters).
- **May contain any characters**, including regular quotes (`"`) and double quotes (`""`), **except** for an unescaped sequence of three double quotes (`"""`) that would terminate the string. All characters are preserved exactly as written, including whitespace and line breaks.
- A triple-quoted string ends at the first sequence of three double quotes (`"""`).
- Triple-quoted strings do not support any prefix characters and are always raw.

Example of Triple-Quoted strings:
```yini
"""This is a multiline
string that spans
three lines."""

"""He said, "hello" and left."""

"""You can use double quotes (") inside."""
```

Note: All content between the opening and closing triple quotes is preserved as-is, including whitespace and line breaks.

### 6.5. String Concatenation
Strings in YINI can be **concatenated** using the plus sign `+`. This operator joins two or more string literals into a single combined string. Any number of strings can be chained together using this method.

**Example:**
```yini
greeting = "Hi, " + "hello " + "there"
```
The result of the above will be equivalent to:
```yini
greeting = "Hi, hello there"
```

Concatenation is supported between all string types, but mixing different types (e.g., Raw + Classic) is discouraged unless necessary for special use cases.

### 6.6. String Type Mixing
Concatenation of string literals of different types (e.g., Raw + Classic, Classic + Hyper) is **permitted**, but generally **discouraged**. This flexibility exists to support **rare or advanced use cases** where such combinations may be helpful or necessary.

Engines should handle mixed-type concatenations correctly, but authors are encouraged to use consistent string types within concatenations to ensure clarity and predictable behavior.

## 7. Number Literals
### 7.1. Numbers
YINI supports both integer and floating-point literals. Numbers may be signed and written in decimal notation.

- **Integers:** A sequence of digits, optionally prefixed with + or -.
- **Floats:** Must include a decimal point (`.`) and optional exponent (`e` or `E`).

**Examples:**
```yini
age = 42
pi = 3.14159
negative = -12
scientific = 1.23e4
```

### 7.2. Exponent Format
Exponent notation uses the format:
```
<base>e<sign><exponent>
```

Where:
- `<base>` is any integer number.
- `<sign>` can be `+`, `-`, or blank (positive).
- `<exponent>` is any non-negative number.

Example:
```
3e4 // Is same as 3 × 10⁴ = 30000
```

### 7.3. Number Formats
In addition to standard decimal numbers (base-10), YINI supports other number base literals as well.

Note, binary and hexadecimal values also allow **alternative notations** for convenience and readability.

| Number Format (case-insensitive) | Alternative Format | Description | Base | Notes
|----------|--|---|---|---|
| `3e4` | - | Exponent notation number | 10-base | Result: `3 × 10⁴`
| `0b1010` | `%1010` | Binary number | 2-base | Digits: `0` and `1` only
| `0o7477` | - | Octal number | 8-base | Digits: `0`–`7`
| `0z2Ex9` | - | Duodecimal (dozenal) | 12-base | `x` = 10, `e` = 11
| `0xF390` | `#F390` | Hexadecimal number | 16-base | `0`–`9`, `a`–`f` (or `A`–`F`) = 10–15

**Note:** All prefix-based number formats in YINI are case-insensitive. For example, `0xF390`, `0XF390`, `0xf390`, `0Xf390`, and `#f390` are all valid hexadecimal literals.

## 8. Boolean and Null Literals

### 8.1. Booleans
Booleans in a `YINI` document can be following literals (NON CASE-SENSITIVE):
- Treated as **TRUE** (by the engine):
  - `true`
  - `yes`
  - `on`
- Treated as **FALSE** (by the engine):
  - `false`
  - `no`
  - `off`

The engine should convert the literal value to the corresponding Boolean value in the host language.

### 8.2. Null Literal
Value/literal `NULL` (NON CASE-SENSITIVE). 

Also if value is missing in member, then that member is treated as NULL.

## 9. List Literals
Lists in YINI correspond to what are called _Arrays_ in JSON and serve the same purpose as arrays in many programming languages (e.g., in JavaScript).

YINI supports two ways to define lists:
- **Bracketed List Notation** - A single-line style using `=` and square brackets `[ ]`, similar as in JSON.
- **Colon-Based List Notation** - A more human-friendly, optionally multi-line style using `:` and no brackets.

Note: Only lists can use the alternative notation using `:`.

### 9.1. Bracketed Lists (using `=`)
A list can be assigned to a key using the equals sign `=`, followed by square brackets `[ ]` containing zero or more comma-separated values.

Whitespace (spaces, tabs, and newlines) is allowed within the brackets.

```yini
list1 = ["value1", "value2", "value3"]
list2 = [100, 200, 300]
list3 = []  // An empty list.
```

For convenience, a trailing comma (`,`) may be optionally be included.

```yini
// A list with THREE items.
list1 = ["a", "b", "c", ]  // Trailing comma here is ignored.

// A list with FOUR items.
list2 = ["a", "b", "c", NULL]
```

> **Note:** A parser may optionally support strict and lenient modes, where trailing commas are either disallowed or accepted.

**Syntax Rule**

There must be **no newline** between the `=` and the opening bracket `[`, otherwise the value will be interpreted as `null`.

❌ Invalid:
```yini
list =
["item1", "item2"]  // Not a valid list!
```

✅ Valid:
```yini
list = ["item1", "item2"]
```

**Nested Lists**

Lists may contain other lists:
```yini
linkItems = [
	["stylesheet", "css/general.css"],
	["stylesheet", "css/themes.css"]
]
```

### 9.2. Colon-Based List (using `:`)
Exclusively for lists, YINI allows an alternative syntax using a colon (`:`) instead of `=`. This style omits square brackets and is intended to improve readability in configurations with list-like values.

Note: Commas are mandatory after items (except after the last item), even in multi-line forms in this notation.

```yini
list1: "oranges", "bananas", "peaches"  // List with three items.

list2:  // An empty list.
```

**Multi-line List Syntax:**
Each item in the list may optionally appear on its own line for better readability.

**Commas are required between values**, and a **trailing comma** on the last item is allowed — but ONLY when using colon-based list syntax.

```yini
list1:
  "oranges",
  "bananas",
  "peaches"

list2:
  "oranges",
  "bananas",
  "peaches",  // Trailing comma is valid here, and is ignored.
```
**Note:** This colon-based list syntax is only valid for lists.
It must not be used for single values or key-value assignments.
The trailing comma is ignored ONLY in `:` based lists.

⚠️ **Common Pitfall**
```yini
name: "John"  // ⚠️ Interpreted as a list with one string item!
```
This is **NOT equivalent** to:
```yini
name = "John"  // ✅ A single string value.
```

**Colon (`:`) is not a substitute for `=`** and must not be used for regular member (non list) assignments.

**Trailing Comma Behavior**
- In colon-based lists, a **trailing comma is ignored** (legal, optional).
- In bracketed lists (`[ ... ]`), a **trailing comma results in an implicit** `null` as the last item.

**Termination Rule**

A colon-based multi-line list ends when **one of the following** is encountered:
- a new key assignment (`key = ...` or `key: ...`)
- a new section header (simple or backticked)
- a document terminator marker (`/END`)

**Nested Lists with `:` Notation**

Colon-based lists may contain bracketed sub-lists:
```yini
linkItems:
	["stylesheet", "css/general.css"],
	["stylesheet", "css/themes.css"]
```

## 10. Advanced Constructs
### 10.1. Future / Reserved Features _(For Future Use)_
The following features are reserved for potential support in future versions of the YINI specification. They are **not currently active** in this version, but their syntax and keywords **are reserved**.

#### 10.1.1. Anchors and Aliases
YINI may introduce a mechanism similar to YAML’s anchors and aliases. These constructs would allow users to define reusable fragments within a configuration.

  - **Anchors (`@`):** Or some other token, to assign a name to a key, section, or structure.
  - **Aliases (`use`):** Reference a previously defined anchor using the use keyword.

#### 10.1.2. Includes
YINI may support modular configuration files via external file inclusion.
  - **Directive:** `@include "<path/to/file>"`
  - **Description:** Imports the contents of another YINI file into the current one.
  - **Usage:** Proposed as a preprocessor-style directive.

These features, while not implemented in this version, are reserved and must not be repurposed by user-defined syntax.

#### 10.1.3. Date-time Type

Currently, the YINI types in the specification map 1-to-1 to native JSON types. With that said YINI does not currently support native date, time, or date-time types. All date and time values **must currently** be represented as strings.

Support for standardized date-time literals may be considered in a future version, once the core specification is stable.

## 11. Validation Rules
YINI enforces a set of validation rules to ensure the structure and content of files are consistent, unambiguous, and semantically correct. These rules fall into two main categories: **reserved syntax protections** and **well-formedness**. Validation ensures compatibility across implementations and minimizes user errors.

### 11.1. Reserved Syntax
Certain characters and keywords are **reserved** by the YINI specification for internal syntax or future use. Using them incorrectly may lead to a parse error or undefined behavior.

#### 11.1.1. Reserved Characters
The following characters are reserved by the YINI syntax and must not be used improperly outside of their defined contexts. They may appear inside quoted strings or phrase identifiers but are otherwise restricted:

| Character	| Usage Context	| Description |
|-----------|---------------|-------------|
| `=` | Assignment  | Separates key from value |
| `^` | Section header | Used to denote section start |
| `,` | Item separator | Used in lists |
| `~` | Section header (alternative) | Used to denote section start |
| `%` | Binary prefix | Begins binary number |
| `;` | Full-line comment |   |
| `:` | Alternative list notation | Outer list without brackets  |
| `#` | Hexadecimal prefix | Begins hexadecimal number |
| `# ` | Inline comment (alternative) | Comment, if starts with `#` followed by at least one space or tab |
| `//` | Inine comment |   |
| `/* */` | Block comment | Marks multi-line comment block |
| `@` | Directive prefix | Reserved for future syntax |
| `{ }` |  | Reserved for future syntax |
| `--` | Line disabling | Experimental use (see Section 3.6) |

#### 11.1.2. Reserved Keywords
The following keywords are restricted and must not be used as bare identifiers (e.g., for keys, values, or section names) unless enclosed in quotes or backticks:
- `/END` _(case-insensitive)_
- `@yini`
- `@ver`, `@version`
- `@include`, `@anchor`, `@alias`

Use of these keywords outside their defined roles may result in a parse error.

### 11.2. Well-Formedness Requirements
A YINI file is considered **well-formed** if it adheres to the core syntactic and structural rules defined in this specification.

#### 11.2.1. Structural Requirements
- A file may consist of zero or more **sections**.
- A file may consist of zero or more valid key-value pairs (members).
- Section headers must begin with a valid marker (`^`, `~`).
- At least one space or tab is required between a section marker and the section name.
- Duplicate keys **within the same section and depth level** are not allowed.
  - Keys are case-sensitive, and no spaces nor quotes allowed unless enclosed in backticks (phrase identifiers).
- Lines that do not match any syntactic role (member, comment, section, terminator) are considered malformed.
- The document terminator (`/END`) is **mandatory in strict mode** and **ignored in lenient mode**.

#### 11.2.2. Character Encoding
Files **must** be encoded as **UTF-8 without BOM**.

#### 11.2.3. Line Endings
- Acceptable: Unix-style `<LF>` or Windows-style `<CR><LF>` line endings.
- Mixed line endings are discouraged but tolerated in lenient mode.
  
#### 11.2.4. Valid Value Types
- Values must be one of the supported data types: **String**, **Number**, **Boolean**, **Null**, or **List**.
- Boolean values are **case-insensitive**: `True`, `On`, `Yes`, etc.
- Null values: `null`, `NULL`, `Null` are all interpreted as `null`.

#### 11.2.5. Document Terminator
- The terminator is only required in strict-mode.
- See Section 3.5, "Document Terminator" for terminator syntax.
- A valid YINI file, in Strict-mode, must end with the terminator marker (`/END`).
- Only one terminator is permitted per file.
- Missing terminators:
  - **In lenient mode:** No error or warning.
  - **In strict mode:** Treated as an error.
- After the terminator, only whitespaces and comments are allowed.

##### Table: Terminator Requirement by Mode
| Mode | Terminator Requirement |
|---|---|
| Lenient | Optional (*) |
| Strict | Yes (mandatory) |

(*) In systems that value deterministic parsing, even lenient mode should favor explicit termination.

##### Rationale
The document terminator ensures robust parsing boundaries, improves multi-file safety, and aids debugging.

#### 11.2.6. Escaping and String Literals
- Escape sequences are **ONLY allowed** in Classic strings (quoted with `'` or `"`, **and prefixed** with `C` or `c`).
- Triple-quoted strings must use `"""` for both opening and closing (`'''` is not supported).

#### 11.2.7. Shortest Valid YINI Documents in Strict Mode
- **Valid short documents in strict mode:**
  - ✅ In strict mode, the following is the shortest valid YINI document **with a member**:
    ```yini
    ^T
    /END
    ```
    **Note:** A section heading named `T`, without any members.

- **Invalid short documents:**
  - ❌ Invalid: missing the /END terminator:
    ```yini
    ^ Title
    ```

  - ❌  Invalid: no title section present:
    ```yini
    /END
    ```

  - ❌ The following empty file (with only a comment) is also invalid:
    ```yini
    // Invalid empty YINI document in strict mode, the required document terminator (`/END`) is missing.
    ```
    **Note:** Invalid: file contains only a comment and lacks both `/END` and title section.

### 11.3. Lenient vs. Strict Modes _(Optional Feature)_
Non-strict mode (lenient mode) is the default and recommended mode of operation. Parsers should operate in this mode by default unless explicitly configured otherwise to operate in fully strict mode.

Some YINI parsers may support multiple **validation modes**:

- **Lenient Mode:** 
  - Permissive with minor errors (e.g., trailing commas, mixed line endings).
  - The document terminator (`/END`) is **optional** in lenient mode and may be omitted entirely.
  - All typing rules still apply — for example, string literals must be quoted: if a value is not quoted, it is not a string — no exceptions.
  - Useful for hand-edited configuration files.
- **Strict Mode:**
  - Enforces full well-formedness.
  - Strict mode requires both a **title section header** (a level 1 header) and the **document terminator** (`/END`).
    
    These constraints provide increased robustness: if a YINI document is split into two halves, **both halves will be invalid**.
    * The **first half** is invalid because it is missing the required `/END` marker.
    * The **second half** is invalid because it lacks the required level 1 section header (e.g., `^ Title`).
  - Disallows trailing commas.
    * Empty values are disallowed — they must be explicitly typed as `null`, `Null`, or `NULL` (case-insensitive), although empty sections (with no members) are allowed.
  - For production and tool-chain use.

**Note:** Implementations must clearly document the validation mode in use and detail which rules are fully enforced under strict parsing.

### 11.3.1. Table: Lenient vs. Strict Mode
| Feature                 | Lenient Mode (Default) | Strict Mode | Notes |
|-------------------------|:----------------------:|:-----------:|-------|
| Explicit string quoting     | ✅ | ✅ | All strings must be enclosed with `"` or `'` — no ambiguity over strings.|
| Empty sections allowed | ✅ | ✅ | Sections may contain no members (e.g., `^ Config`). |
| Duplicate keys          | ❌ | ❌ |   |
| One level 1 section header | ❌ | ✅ |   |
| `/END` required         | ❌ | ✅ |   |
| Trailing commas         | ✅ | ❌ |   |
| Invalid escape sequences| ✅ (may warn) | ❌ (error) |   |

⚠️ Strict mode enforces a stricter contract suitable for automated validation and reproducible builds. Lenient mode favors user-friendliness and flexibility for human editing.

## 12. Implementation Notes

The following guidance is intended to assist developers implementing YINI parsers, engines, or tools. These notes aim to promote consistent interpretation of YINI syntax across different platforms and environments.

See also [Section 11.2: Well-Formedness Requirements] for formal validation criteria.

### 12.1. Top-Level Sections and Implicit Root

* If a document contains **multiple top-level sections** (i.e., multiple level-1 sections), they must be considered **children of an implicit root**.
* The implicit root section:
  - **Has no name**, or may be labeled "`root`" or similar (implementation-defined).
* Section hierarchy must be respected:
  - A level-3 section **must follow** a level-2 section.
  - Skipping levels (e.g., directly from level-1 to level-3) is invalid.

### 12.2. Line Handling and Whitespace

* Newline normalization is required:
  * Support both LF (`0x0A`) and CRLF (`0x0D 0x0A`).
* Leading/trailing whitespaces (tabs or spaces):
  * Trim from section headers and keys.
* Hyper Strings (H-Strings):
  * Leading/trailing whitespaces (tabs or spaces) and newlines are trimmed.
  * Inside a H-string, whitespaces (tabs or spaces) and newlines are normalized to one single space character.
* Full-line and inline comments may follow key-value members or appear on separate lines.
* Whitespace is permitted within lists, including across lines.

### 12.3. Value and NULL Handling

* If a key is assigned without a value::
  ```yini
  key =          // NULL
  key:           // NULL
  ```
  it must be interpreted as having a value of `null`.
* Key uniqueness:
  - Keys must be **unique within the same section and section level**.
  - Duplicates in the same section are a **parse error**.

### 12.4. Boolean Canonicalization

* Boolean literals are **case-insensitive**.
* The following values must be interpreted as Booleans:
  * `true`, `yes`, `on` → `true`
  * `false`, `no`, `off` → `false`
* Do not allow Boolean values like `1` or `0` unless explicitly cast by the host software.

### 12.5 Lists

* Two syntaxes are valid for lists:
  - **(a) Bracketed form (preferred):**
    ```yini
    items = ["a", "b", "c"]
    ```
      * A bracketed list line must not begin with a comma.
      * A trailing comma in `[ ]` is treated as a `null` value.
  - **(b) Unbracketed multiline:**
    ```yini
    items1: "a", "b", "c"

    items2:
    "a",
    "b",
    "c"
    ```
    * Trailing commas are allowed in unbracketed lists (form b).

**Bracketed lists must not** have a newline between `=` and the opening bracket `[` (otherwise, the value is interpreted as `null`, not a list):
  ```yini
  invalidList = // NULL!
  [1, 2, 3]     // Not parsed as a list!
  ```

### 12.6 Strings Concatenation

* Strings can be concatenated using the `+` operator:
    ```yini
    name = "Hello, " + "world"
    ```
* Concatenation must occur **on a single line**.
* Concatenating different types of strings (e.g., r"..." + c'...') is **permitted** (for use in some special or advanced cases), but generally **discouraged**.
* Only Classic strings (C-Strings) interpret escape sequences (`\n`, `\t`, etc).

### 12.7 String Literal Types
**Note:** If a string is not quoted, it's not a string — period.

| Type                | Prefix           | Example    | Behavior |
|---------------------|------------------|------------|----------|
| (Raw) String        | None, `R`, or `r`| "Some text"| Text is as-is (raw), no escaping,  backslash is literal, preserves all whitespace|
| Classic String      | `C` or `c`       | `C"..."`   | Escape sequences are interpreted|
| Hyper String        | `H` or `h`       | `H"..."`   | (*) Multi-line, whitespace-collapsing, trimmed |
| Triple-quoted String| None       | `"""..."""`   | Can be multi-line, text is as-is (raw), preserves all whitespace, including line breaks |

(*) Hyper string behavior:
  * Allow multi-line strings.
  * Collapse sequences of whitespace and newlines into a single space.
  * Trim leading/trailing whitespace.

### 12.8 Comments

* YINI supports:
  - `//` for inline comments (rest of the line is ignored).
  - `#` followed by at least one whitespace character (`SPACE` or `TAB`), for alternative inline comments (rest of the line is ignored).
  - `/* ... */` for block (multi-line) comments (may span lines).
  - `;`at start of line is treated as full-line comments (there may appear only spaces or tabs before `;`).
  - **Nested block comments are not supported.**

### 12.9 Error Handling Recommendations

If the parser encounters:
  * A **missing intermediate section level** (e.g., level 3 without level 2),
  * A **duplicate key in the same section and section level**,
  * A **malformed list or string**

It should:
* **Fail gracefully** and report an error, OR
* **Use host-defined fallback logic**, if robustness is preferred.

### 12.10 Bonus Tips for Implementation
Developers are encouraged to implement the following features to improve parser robustness and developer experience:

- Attach **position metadata** (line/column) to tokens for better diagnostics.
- Normalize internal representations of:
  - `true` / `false`
  - `null`
- Support both `strict` as well as `lenient` parsing modes.
- **Extra Bonus:** In strings, if C/C++-style octal escape codes like `\1` to `\377` are used (which are not valid in YINI), parsers should treat this as an error in strict mode (and suggest the correct YINI syntax). In lenient mode, parsers may optionally emit a warning and suggest the correct YINI syntax: `\o1` to `\o377`, and interpret the octal code as intended.

## 13. Compatibility and Versioning
This section covers YINI's compatibility and interoperability principles.

### 13.1. Fallback Rules
#### 13.1.1. Invalid Sections or Keys
- Invalid key names or section headers should be retained as-is but ignored if in lenient mode, or issue a warning or error if in strict mode.
  
#### 13.1.2. Graceful Degradation
- Parsers may issue warnings instead of errors when encountering unrecognized features (e.g., unknown directives, anchors, or section markers).
- Implementations should strive to process known-valid content even if advanced features are not supported.

### 13.2. Versioning Strategy
**Version Format**

- In the future, the YINI Specification will adopt _Semantic Versioning_ (`MAJOR.MINOR.PATCH STAGE`) to signal format evolution.
- **`STAGE`:** For the time being, the specification version remains `v1.0.0` until all primary features are implemented, tested, and the specification exits in the `Beta` stage. The next stage after `Beta` will be denoted `RC` (Release Candidate). Each stage may be appended with an incremental number, such as `Beta 2`, `Beta 3`, `Beta 4`, etc.

Semantic Versioning:
- **MAJOR:** Incompatible changes.
- **MINOR:** Backward-compatible additions.
- **PATCH:** Backward-compatible fixes.

### 13.3. Encoding Notes
#### 13.3.1 Required Encoding
- **UTF-8 without BOM** is the required and default encoding for YINI files.
- Parsers must support UTF-8 fully.
- Use of other encodings (e.g., UTF-16, Latin-1) is discouraged and not guaranteed to be portable.

#### 13.3.2 Byte Order Mark (BOM)
- A UTF-8 BOM (`0xEF 0xBB 0xBF`) is **not required** and **should be avoided**.
- If present, parsers must detect and ignore the BOM without failing.

#### 13.3.3 Shebang Line (Optional)
A shebang line may be used at the very top of the file:
```
#!/usr/bin/env yini
```
This line is ignored by YINI parsers but may affect script execution in Unix environments. It must be ignored by the YINI parser as a comment or metadata line.

### 13.4. JSON Compatibility

A valid YINI file can be converted into a valid JSON file (and vice versa) while preserving **data structure, types, and identifier names exactly**.

Although YINI and JSON are distinct formats with different goals, their core data models are closely aligned.
Strings, numbers, booleans, nulls, and lists in YINI map naturally to their JSON equivalents, and key names (identifiers) maintain structural correspondence when properly quoted.

You can convert a YINI file into JSON (and vice versa) and preserve all real data — structure, types, and names — correctly,  
but you must ignore or remove YINI-only features like section markers, comments, and terminators when expressing it as JSON.

#### Converting YINI to JSON
- **Keys (Identifiers):** As long as keys are quoted properly in JSON, and identifiers follow JSON string rules.
- **Value types (String, Number, Boolean, Null, List):** Direct mapping is possible between YINI and JSON native types.
- **Lists (Arrays):** Lists `[]` map 1-to-1.
- **Sections:** YINI sections correspond to nested objects `{}` in JSON.
- **String types:** ⚠️ All strings become plain JSON strings once parsed, escaping is normalized when serialized.

#### Metadata Limitations
- 🚫 Metadata (such as comments and the document terminator) will not be carried over to JSON.

#### Summary
When converted carefully, a well-formed YINI document can be faithfully represented as a valid JSON object, preserving all structure, data types, and identifier names.  
Conversely, a valid JSON object can be mapped into a YINI document, provided that JSON-specific constructs (such as deeply nested objects) are expressed as sections and that YINI syntax rules are respected.

**Table: Correspondence Between YINI and JSON**

| Entity             | → JSON                         | → YINI                          | Notes |
|--------------------|---------------------------------|----------------------------------|-------|
| Structure Mapping  | ✅ Yes (sections become objects) | ✅ Yes (objects become sections)|   |
| Types Mapping      | ✅ Yes (direct type mapping)     | ✅ Yes (direct type mapping)    |   |
| Identifiers (Keys) | ✅ Yes (must always be quoted)    | ✅ Yes (backticks if needed)   |   |
| Comments           | 🚫 No (discarded)                | -                               | Comments are dropped during JSON conversion.|
| Terminator         | 🚫 No (ignored)                  | -                               | Terminator must be appended when converting to YINI.|

### See also:
See Sections 14.3 and 14.4 for examples of YINI ⇆ JSON mappings.

## 14. Examples

### 14.1. Minimal Example
```yini
^ Prefs

name = "Kim"
entries = 10
enabled = true
```

**Explanation:**
  - Begins with a single section `# Prefs`.
  - Contains three keys (`name`, `entries`, `enabled`) with string, number, and boolean values, respectively.

### 14.2. Realistic Config Use Cases
#### 14.2.1. User Preferences Configuration
```yini
^ Preferences

theme = "dark"
language = "en"
notifications = true
volume = 85
recent_files = [
  "report.yini",
  "draft_0423.yini",
  "budget2025.yini"
]
```

#### 14.2.2. Application Settings with Sections
```yini
^ Database
host = "localhost"
port = 5432
username = "appuser"
password = "s3cret"

^ Logging
level = "debug"
file = "/var/log/myapp.log"
rotate = true

^ Features
enable_experimental = false
api_version = "v2.1"

```

**Notes:**
- The `^` marker cleanly divides logical domains into sections.

#### 14.2.3. Script Metadata
```yini
^ Metadata
name = "Data Fetch Script"
version = "1.3.0"
author = "Jane Doe"
schedule = "daily"
active = true
```

#### 14.2.4. Feature Flags
```yini
^ FeatureFlags
debug = true
experimental_ui = false
use_cache = true
cache_expiry = 86400  		// In seconds
last_purge_date = "2025-05-25"	// YYYY-MM-DD
```

#### 14.2.5. Feature Toggles with Alternative Syntax
```yini
/*
  Feature Toggles with Alternative Syntax
*/

~ `Feature Toggles`
`Debug` = ON
`Experimental UI` = OFF
`Night Mode` = OFF
`Use Cache` = ON

~~ `Cache Config`
`Cache Expiry` = 86400  		// In seconds
`Last Purge Date (YYYY-MM-DD)` = "2025-05-25"
```

**Notes:**
- Uses the alternative section marker `~`.
- Demonstrates alternative boolean literals: `ON` and `OFF`.
- \`Cache Config\` is a nested subsection of \`Feature Toggles\`.
- All keys and section header identifiers are enclosed in backticks, allowing the use of spaces and special characters.

### 14.3. Examples of YINI → JSON Mapping

#### 14.3.1. Simple Flat Structure to JSON
**YINI:**
```yini
^ User
name = "Alice"
age = 28
active = true
```

**JSON Equivalent:**
```json
{
  "User": {
    "name": "Alice",
    "age": 28,
    "active": true
  }
}
```

#### 14.3.2. Nested Sections (multiple levels) to JSON
**YINI:**
```yini
^ Settings
theme = "dark"
language = "en"

^^ Display
resolution = "1920x1080"
fullscreen = true
```

**JSON Equivalent:**
```json
{
  "Settings": {
    "theme": "dark",
    "language": "en",
    "Display": {
      "resolution": "1920x1080",
      "fullscreen": true
    }
  }
}
```

#### 14.3.3. Lists (Arrays) to JSON
**YINI:**
```yini
^ Server
hosts = ['server1.example.com', 'server2.example.com']
```

**JSON Equivalent:**
```json
{
  "Server": {
    "hosts": [
      "server1.example.com",
      "server2.example.com"
    ]
  }
}
```

#### 14.3.4. Nulls and Booleans to JSON

**Note:** Null and boolean literals (e.g., `Null`, `True`, `On`, `Yes`) in YINI are **case-insensitive**, while keys are **case-sensitive**.

**YINI:**
```yini
^ Flags
enabled = On
archived = Off
description = Null
```

**JSON Equivalent:**
```json
{
  "Flags": {
    "enabled": true,
    "archived": false,
    "description": null
  }
}
```

### 14.4. Examples of JSON → YINI Mapping

#### 14.4.1. Simple JSON Object to YINI
**JSON:**
```json
{
  "Profile": {
    "username": "bob",
    "age": 35,
    "verified": true
  }
}
```

**YINI Equivalent:**
```yini
^ Profile
username = "bob"
age = 35
verified = true
```

#### 14.4.2. Nested JSON Objects to YINI
**JSON:**
```json
{
  "App": {
    "version": "2.5",
    "settings": {
      "theme": "light",
      "notifications": true
    }
  }
}
```

**YINI Equivalent:**
```yini
^ App
version = "2.5"

^^ settings
theme = "light"
notifications = true
```

#### 14.4.3. JSON Array to YINI
**JSON:**
```json
{
  "Servers": {
    "hosts": ["alpha.local", "beta.local", "gamma.local"]
  }
}
```

**YINI Equivalent:**
```yini
^ Servers
hosts = ["alpha.local", "beta.local", "gamma.local"]
```

## 15. Appendices and Reserved Areas
### 15.1. License
Apache License, Version 2.0, January 2004,
http://www.apache.org/licenses/
Copyright 2024-2025 Gothenburg, Marko K. Seppänen. (Sweden via
Finland).

### 15.2. Acknowledgments
Some parts of the YINI specification have benefited from valuable feedback and insights shared by users in the broader community.
Big thanks to readers and contributors on Reddit, Medium, and other platforms — including those I may have unintentionally forgotten.

**Special thanks to:**
* David Demelier (_markand67_) — discussions and feedback during Beta 3–4 on `/END`, `#`, etc.
* User _zanfar_ (Reddit) — feedback on `#`, etc.
* User _lelanthran_ (Reddit) — feedback on `#`, etc.
* User _saxbophone_ (Reddit) — feedback on `#`, etc.
* User _JoshYx_ (Reddit) — raised concerns around `###`, etc.
* User _tonyp7_ (Reddit) — support and encouragement.
* User _cat_in_the_wall_ (Reddit) — support and encouragement.
* ...and anyone else I may have forgotten. **Your contributions are appreciated.**

### 15.3. Author(s)
This specification is created and maintained by Marko K. Seppänen.

#### Creator
First authored in 2024, Gothenburg, by Marko K. Seppänen (Sweden via Finland).

Mr. Seppänen has been programming since the mid-80s, working in languages like BASIC, C, Java, and Assembler. He studied Computer Science and Master's in Software Development with a focus on Programming Languages at Chalmers University of Technology (Gothenburg, Sweden). Professionally, he has many years of experience in software development, particularly in TypeScript, JavaScript, PHP, and full-stack web development.

### 15.4. Spec Changes
A running log of changes and updates **to the YINI specification**.

Note: Dates are in international format, YYYY-MM-DD.

v1.0.0 Beta 6, 2025-05-20
- Reworked the use of `#` **based on feedback**: it is no longer a section marker and is now used exclusively as a comment symbol (more in line with formats like classic INI, Bash, etc).
  * **(An important caveet):** comments starting with `#` must be followed by a space or tab.
  * This requirement prevents clashes with hex-like values. Using `#` for hex numbers (e.g., `#FF0033`) is a deliberate design choice and compromise to align with conventions found in CSS (for color) and similar contexts. For example: `#FF0033` is a hex value, whereas `# FF0033` is treated as a comment.
- Due to the change where `#` is no longer used as a section marker, the tilde (`~`) was initially considered as the new default. However, multiple tildes on a line tend to visually blend together. In the end, the caret (`^`) was chosen instead for its clarity, visual distinctiveness, and compatibility with the 7-bit ASCII range.
- Added support for full line comment using `;` and disable line using `--`.
- Added section 15.6, "Appendix C – Common Mistakes and Pitfalls".
  
v1.0.0 Beta 5, 2025-05-13
- Added new section 15.2, "Acknowledgments".
- Changed the default mode (after feedback of not requiring the /END) to non-stict (lenient) from Strict-mode:
  * Thus the "Document Terminator" is now only optional.
  * Renamed section name to 11.3, "Lenient vs. Strict Modes".
- Added tab as illegal character in backticked identifiers.
- Deprecated `>` for use as section marker, due to its tendency to be confused with quoting syntax in forums, emails, and messaging platforms, etc.
- Added missing escape codes in strings (matching those from C/C++), with one exception: YINI uses `\OOO` instead of `\oOOO` for octal values, as the `o` clearly indicates that an octal sequence follows, whereas the C-style form does not.
- Reserved `{ }` for future syntax (inline objects).
- Renamed the term "Phrased identifiers" to "Backticked identifiers", it's simpler.
– Removed support (after feedback by user JoshYx at Reddit) for the alternative document terminator `###`. Although it was intended as a shorter, a one character shorter alternative to `/END`, it contradicted YINI's core principle of simplicity. Its presence risked confusing users unfamiliar with YINI's syntax and ultimately undermined clarity.

v1.0.0 Beta 4
- Fixed an issue with very short YINI files in the grammar: both members and sections are now explicitly optional. 

v1.0.0 Beta 3, 2025-04-25

v1.0.0 Beta 2, 2025-04-23
- Added (new) support for triple-quoted strings (`"""`).
- Added support for alternative hexadecimal literals using `#`.
- Added support for binary literals using `%`.
- Reintroduced support for the alternative terminator marker `###`.

---

### 15.6. Appendix C – Common Mistakes and Pitfalls
Below are some common mistakes and misunderstandings when writing YINI files, especially for users familiar with other formats like YAML, JSON, or classic INI. This table aims to clarify syntax edge cases and help avoid subtle bugs.

✅ YINI Syntax Cheatsheet – Common Confusions
| **Element**       | **Correct Syntax**              | **Common Mistake**              | **Clarification** |
|-------------------|----------------------------------|----------------------------------|--------------------|
| Key–Value pair     | `name = "John"`                 | `name: "John"`                   | `:` creates a list — use `=` for single values. |
| Inline List        | `items = ["a", "b", "c"]`       | `items =` followed by newline and `[` on next line | Line break after `=` causes the value to be parsed as null. |
| Colon-Based List   | `items: "a", "b", "c"`          | `items: "a" "b" "c"`             | Items must be comma-separated — just like bracketed lists. |
| Colon + Single Item| _Don't use_ `name: "John"`      | Same as left                    | Interpreted as a list with one string item — use `=` instead. |
| Trailing comma (inline) | `list = ["a", "b", "c",]`   | Assumed to be ignored           | Adds a `null` item at the end of the list. |
| Trailing comma (colon)  | `list:` <br> `"a", "b", "c",` | —                            | ✅ OK — trailing commas in colon-based lists are ignored. |
| Comments           | `# Comment` or `// Comment`     | `#Comment`                      | `#` must be followed by **space or tab** to be recognized as a comment. |
| Hex values         | `color = #FF0033`               | Assumed to be a comment         | Without space after `#`, this is a valid hex value. |
| Disable line       | `--key = "something"`           | Treated like a comment          | Entire line is ignored, including valid config syntax. |
| List nesting       | `list = [[1, 2], [3, 4]]`       | Using inner lists without brackets | All nested lists must be bracketed explicitly. |
| Section skipping   | `^^ Section`, `^^^ Subsection`  | Jumping directly to `^^^`       | ❌ Invalid — cannot skip intermediate nesting levels. |

---

[yini-lang.org](https://yini-lang.org)
