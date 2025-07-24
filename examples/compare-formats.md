# YINI vs JSON, YAML, INI, and TOML

This document shows how the same configuration would look in different formats.

It highlights YINI's goal: *clean, human-friendly config syntax* - with full support for nesting, comments, and typed values - while remaining simpler than YAML or JSON.

---

## 🔵 YINI

This example shows how YINI compares to other formats for common configuration needs.

```yini
@yini

^ App
name = 'Demo App'
items = 25
darkMode = true

    ^^ Special
    color = #336699
    isCaching = false
```

## 🟠 JSON

```json
{
  "App": {
    "name": "Demo App",
    "items": 25,
    "darkMode": true,
    "Special": {
      "color": 3368601,
      "isCaching": false
    }
  }
}
```

## 🟡 YAML

```yaml
App:
  name: "Demo App"
  items: 25
  darkMode: true
  Special:
    color: 0x336699
    isCaching: false
```

## 🟢 INI

```ini
[App]
name = Demo App
items = 25
darkMode = true

[App.Special]
color = 3368601
isCaching = false
```

## 🔴 TOML

```toml
[App]
name = "Demo App"
items = 25
darkMode = true

[App.Special]
color = 0x336699
isCaching = false
```

## ✅ Summary

| Feature            | **YINI**      | **JSON**    | **YAML**   | **INI**     | **TOML** |
|--------------------|---------------|-------------|------------|-------------|----------|
| Comments           | ✅ Yes        | ❌ No      | ✅ Yes     | ✅ Yes     | ✅ Yes |
| Nesting            | ✅ Clean      | ✅ Manual  | ✅ Native  | ⚠️ Limited | ✅ Native |
| Data Types         | ✅ Rich       | ✅ Rich    | ✅ Rich    | ⚠️ Limited | ✅ Rich |
| Syntax Noise       | 🚫 Minimal    | 🔺 High    | ⚠️ Medium  | ✅ Minimal | ⚠️ Medium |
| Human-Writable     | ✅ Yes        | ❌ Verbose | ✅ Yes     | ✅ Yes     | ✅ Yes |
| Designed for Config| ✅ Purposeful | ❌ General | ✅ Yes     | ✅ Yes     | ✅ Yes |
