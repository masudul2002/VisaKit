# Reusable Field Mapping Engine

This document details the architecture, normalized comparison workflows, and matching priority hierarchies of the VisaKit Field Mapping Engine.

---

## 🏗️ Architecture

The Field Mapping Engine is decoupled from any specific website DOM. Instead of binding directly to hardcoded form selectors, it identifies targets fuzzy-matched to our local `VisaProfile` schema:

```text
┌──────────────────────────────────────────────┐
│                  FieldMapper                 │
│      (Queries HTML attribute matchers)       │
└──────────────────────┬───────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
 ┌─────────────┐ ┌───────────┐ ┌─────────────┐
 │  Attribute  │ │   Label   │ │ Placeholder │
 │   Matcher   │ │  Matcher  │ │   Matcher   │
 └──────┬──────┘ └─────┬─────┘ └──────┬──────┘
        │              │              │
        └──────────────┼──────────────┘
                       ▼
             ┌───────────────────┐
             │   Normalizer &    │
             │  Field Registry   │
             └───────────────────┘
```

---

## 🔍 Matching Priorities

The `FieldMapper` evaluates inputs according to a six-priority checklist, exiting immediately on the first match:

| Priority | Attribute Checked | Matcher Used | Description |
| :---: | --- | --- | --- |
| **1** | `name` | `AttributeMatcher` | Standard form element name tag |
| **2** | `id` | `AttributeMatcher` | Element ID selector |
| **3** | `autocomplete` | `AttributeMatcher` | Standard browser autocomplete tag |
| **4** | `label` | `LabelMatcher` | Text content of linked or parent labels |
| **5** | `placeholder` | `PlaceholderMatcher` | Target input helper placeholder text |
| **6** | `aria-label` | `LabelMatcher` | Accessibility screen reader labels |

---

## ⚙️ String Normalization & Registry

To support fuzzy mapping across variations (e.g. matching `family_name` or `familyName` to `surname`), values are parsed using the `Normalizer` before alias comparisons:
*   Trims spaces and removes special chars (hyphens, underscores).
*   Translates inputs to lowercase.

The `FIELD_REGISTRY` stores collections of aliases grouped by profile keys, enabling robust and flexible matching.

---

## 📅 Value Resolvers

Once an input element is matched to a profile key, the `Resolver` translates values to match the HTML tag:
*   **Select options**: Compares option values and text fuzzy-wise to the profile property.
*   **Radios**: Tests if the element value is a substring/start-match of the profile value.
*   **Dates**: Checks placeholders and reformats date strings (e.g. `YYYY-MM-DD` -> `DD/MM/YYYY`).
*   **Checkboxes**: Resolves to boolean flags.
