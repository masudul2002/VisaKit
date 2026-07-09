# VisaKit Roadmap

This roadmap details the active development stages and upcoming features planned for VisaKit.

---

## 🗺️ Sprint Plan

### 🟩 Sprint 00: Project Foundation (Completed)
- Initialize project structure, LICENSE, and README files.

### 🟩 Sprint 01: Environment Setup (Completed)
- Establish Vite, React, TypeScript, and TailwindCSS v3 configurations.
- Verify extension load and popup rendering.

### 🟩 Sprint 02: Project Bootstrap (Active)
- Finalize folder structures.
- Add repository documents (`CHANGELOG.md`, `CONTRIBUTING.md`, `ROADMAP.md`).
- Configure GitHub Actions CI workflow.

### ⬜ Sprint 03: Profile Form UI
- Design options dashboard and forms for entering visa applicant profiles.
- Support core sections: Personal Details, Passport Info, Contact Info, Address.

### ⬜ Sprint 04: Local Storage Integration
- Integrate options form with Chrome local storage.
- Support profile import, export, and secure reset.

### ⬜ Sprint 05: Content Script & Autofill Engine
- Implement DOM selectors and matching functions for Indian Visa portal inputs.
- Hook triggers to initiate form filling.

### ⬜ Sprint 06: Form Mapping & Verification
- Map fields for multi-page application flows on `indianvisaonline.gov.in`.
- Conduct edge case checks and error handling.

### ⬜ Sprint 07: Chrome Web Store Prep
- Design assets, promotional tiles, and store copy.
- Package extension and perform final store validation.
