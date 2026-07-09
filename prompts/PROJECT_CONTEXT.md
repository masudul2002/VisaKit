# Project Context Reference

VisaKit is a local-first Chrome Extension designed to help users securely save their personal visa profiles and autofill online Indian Visa application forms.

---

## 🎯 MVP Goals & Constraints

*   **Supported Portals**: Indian Visa online application portal (`indianvisaonline.gov.in`).
*   **Security Guarantee**: All passport, personal, and contact data remains stored locally inside browser extension sandboxes. We do not sync records, host APIs, or transmit data over the network.
*   **No CAPTCHA Solver**: Bypassing captchas or automating submissions is strictly out of scope. The user must solve captchas and click submit manually.
*   **No Remote Code**: All code is bundled locally. Injection of remote scripts is forbidden.

---

## 📂 Directories Summary

*   `extension/`: Vite project hosting Manifest V3 popup dashboard and profile manager options page.
*   `website/`: Next.js product landing page and documentation index.
*   `docs/`: Design architecture reference guides.
*   `prompts/`: Configuration guidelines for AI assistants.
