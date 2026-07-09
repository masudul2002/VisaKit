# VisaKit

VisaKit is a lightweight, secure Chrome Extension (Manifest V3) designed to help users securely save their personal visa profiles and autofill online Indian Visa application forms.

---

## 🔒 Security First

*   **100% Local Storage**: All profile data is saved locally on your machine using Chrome's Storage API.
*   **Zero Server Communication**: We do not send your data to any server. No APIs, no remote databases.
*   **No Analytics or Tracking**: We do not collect usage metrics, trackers, or telemetry.
*   **Ethical Automation**: This tool **does not** solve captchas, bypass security measures, or perform automated submissions. It only autofills form fields with your user-provided data.

---

## 🎯 MVP Scope & Non-Goals

### Included in MVP
- Chrome Extension (Manifest V3) built with React, TypeScript, Vite, and TailwindCSS.
- Local-only profile storage using Chrome Storage Local API.
- Secure field mapping and DOM form autofilling for the Indian Visa portal.

### Non-Goals (Out of Scope)
- No Captcha solving or bypass automation.
- No Optical Character Recognition (OCR) or document scanning.
- No AI integration or LLM form-parsing.
- No remote cloud sync or user log-in system.

---

## ✨ Features

- **Reusable Field Mapping Engine**: Decoupled, fuzzy-matching engine mapping profile keys to HTML inputs, dropdowns, textareas, and radio buttons using a six-priority attribute/label checklist (see [docs/FIELD_MAPPING_ENGINE.md](docs/FIELD_MAPPING_ENGINE.md)).
- **Profile Management Dashboard**: Options page app managing multiple profiles (create, edit, delete, duplicate, search, set active profile) with strict schema validation.
- **Settings & Preferences Dashboard**: Unified settings panel managing languages, themes (light/dark/system), autofill configurations, local backup imports/exports, and factory resets (see [docs/SETTINGS.md](docs/SETTINGS.md)).
- **Extension Popup Dashboard**: 400x600px SaaS-style control panel showing active profile status, quick actions, and execution reports.
- **Autofill Execution Engine**: Safe, local sandboxed orchestrator reading profiles, detecting visa portals, mapping inputs, and displaying execution summaries (see [docs/AUTOFILL_EXECUTION.md](docs/AUTOFILL_EXECUTION.md)).
- **Production Hardened**: Memory-cached selectors (`WeakMap`), field error try/catch isolate loops, and Edge/Brave/Chrome compatibility normalizations (see [docs/COMPATIBILITY.md](docs/COMPATIBILITY.md) and [docs/PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md)).

---

## 🛠️ Tech Stack

*   **React** (Functional components, Strict Mode)
*   **TypeScript**
*   **Vite** (Optimized bundling with separate content script compilation)
*   **TailwindCSS** (Modern utility-first styling)
*   **Chrome Extension Manifest V3**
*   **ESLint & Prettier** (Linting & code formatting)

---

## 📂 Repository Structure

```text
visakit/
├── extension/          # Chrome Extension source code
│   ├── public/         # Static assets (icons, manifest.json)
│   ├── src/            # Extension react & script source
│   │   ├── popup/      # Extension popup UI (React)
│   │   ├── options/    # Options/Settings page (React)
│   │   ├── content/    # Content scripts for DOM autofill
│   │   ├── storage/    # Chrome Local Storage utilities
│   │   ├── utils/      # General utilities & helpers
│   │   └── assets/     # Images, styles, & styling tokens
│   ├── package.json    # Build commands & dependencies
│   └── vite.config.ts  # Vite build configuration
├── docs/               # Architecture, design, and roadmap documents
├── prompts/            # System & development prompts
├── assets/             # Brand logos & design assets
├── LICENSE             # MIT License
└── README.md           # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18.0.0 or higher)
*   npm (v9.0.0 or higher)

### Installation & Development

1.  Clone the repository:
    ```bash
    git clone https://github.com/masudul2002/visakit.git
    cd visakit/extension
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build the extension:
    ```bash
    npm run build
    ```
4.  Load the extension in Chrome:
    *   Open Chrome and navigate to `chrome://extensions/`
    *   Enable **Developer mode** (top-right toggle).
    *   Click **Load unpacked** (top-left button).
    *   Select the `visakit/extension/dist` folder.

---

## 📋 Visa Profile Model

Profiles saved by the user contain the following structured fields:

- **Personal Information**:
  - Surname & Given Name
  - Gender (`MALE`, `FEMALE`, `TRANSGENDER`)
  - Date of Birth & Place of Birth
  - Nationality, Religion, Marital Status (`SINGLE`, `MARRIED`, `DIVORCED`, `WIDOWED`)
  - Occupation
- **Passport Information**:
  - Passport Number (6-12 Alphanumeric characters)
  - Date of Issue & Date of Expiry (Expiry must be after issue, DOB must be in past)
  - Place of Issue
- **Contact Details**:
  - Email (Standard format check)
  - Phone (International digit format check)
  - Street Address, City/Town, Country, Postal/Zip Code

---

## 🗺️ Roadmap & Production Release
- **Project Roadmap**: See [ROADMAP.md](ROADMAP.md) for future release milestones.
- **Production Release**: See [docs/FINAL_RELEASE.md](docs/FINAL_RELEASE.md) for release audits and checklist details, and [docs/REFACTOR_REPORT.md](docs/REFACTOR_REPORT.md) for code quality refactors.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
