# VisaKit Roadmap

This roadmap details the active development stages and upcoming features planned for VisaKit.

---

## 🚀 Release Versions

### 🟩 Version 0.1 (Completed)
- Initial environment setups (Manifest V3, React 19, TS, Tailwind CSS v3).
- Brand icon assets generated (16px, 32px, 48px, 128px PNG).
- Production-ready popup mockup layout.
- Next.js 15 landing website with subpages (Docs, FAQ, Download, Privacy).
- Node CI build workflow pipeline via GitHub Actions.

### 🟩 Version 0.2 (Completed)
- Modular Profile Management options page app dashboard.
- Safe CRUD services (`storage.service.ts`, `profile.service.ts`) with transparent fallback compatibility.
- Decoupled state management hook (`useProfiles`).
- Advanced schema validation (email formats, alphanumeric passport numbers, phone strings, logical dob/expiry dates).
- Form inputs split under 300 lines limit.

### 🟩 Version 0.3 (Completed)
- Autofill Engine MVP matching elements (Name, ID, Autocomplete tags, associated labels, placeholders).
- Event dispatcher simulator (`input`, `change`, `click`, `blur`) for SPA compatibility.
- Date translation parser converting standard dates to fit `DD/MM/YYYY` text inputs.
- Popup-to-tab runtime message brokers.
- Popup report dialog modal overlay (`AutofillResultModal.tsx`).

### ⬜ Version 1.0 (Upcoming)
- Profile Import/Export and backup utility.
- Multi-page form filling coverage on `indianvisaonline.gov.in`.
- Chrome Web Store deployment.
- Public release.
