# Architecture Reference

This document describes the architectural layout of VisaKit.

---

## 🏛️ System Overview

VisaKit operates as a decoupled local-first system within the browser sandbox:

```text
┌──────────────────────────────────────────────────────────────────────────┐
│                             VisaKit Extension                            │
│                                                                          │
│  ┌───────────────────────┐              ┌─────────────────────────────┐  │
│  │       Popup App       │              │     Options Dashboard       │  │
│  │ (Trigger Autofill UI) │              │  (Profile Creation/CRUD)    │  │
│  └───────────┬───────────┘              └──────────────┬──────────────┘  │
│              │ (Messaging)                             │                 │
│              ▼                                         ▼                 │
│  ┌───────────────────────┐              ┌─────────────────────────────┐  │
│  │    Content Script     │─────────────►│    chrome.storage.local     │  │
│  │ (DOM Autofill Engine) │ (Reads active│    (Secure Local Storage)   │  │
│  └───────────────────────┘   profile)   └─────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 🧩 Architectural Modules

1.  **Popup Dashboard (`src/popup/`)**:
    *   Saves size parameters at exactly `400x600px`.
    *   Exposes a clean list of action cards (Autofill, Settings, Import, Export).
    *   Queries active tab states and dispatches cross-context runtime messages.
2.  **Options Manager (`src/options/`)**:
    *   Bootstraps a complete profile grid dashboard.
    *   Provides inputs mapped to schema keys, managing validation warning states.
3.  **Profile Feature (`src/features/profile/`)**:
    *   Encapsulates types, validators, hooks, services, and subcomponents for user profiles.
4.  **Autofill Feature (`src/features/autofill/`)**:
    *   Runs the automation engine: DOMScanner, FieldMapper, ValueResolver, and FormFiller.
    *   Communicates results back to the popup using reports.
