# Directory Structure

This document details the folder organization of VisaKit.

---

## 📂 Repository Root Map

```text
VisaKit/
├── .github/            # GitHub templates and workflow actions
├── assets/             # Brand designs, banners, and logo PNG files
├── docs/               # Technical documents and release guides
├── prompts/            # Prompts configuring AI developers
├── extension/          # Chrome Extension source code (Manifest V3)
└── website/            # Next.js product page
```

---

## 🧩 Extension Folder Map

```text
extension/
├── public/             # Static icons, manifest.json definitions
├── src/                # Source React & TypeScript code
│   ├── background/     # MV3 service worker scripts
│   ├── content/        # DOM injected content scripts
│   ├── features/       # Feature directories (profile, autofill)
│   │   └── <feature>/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── services/
│   │       └── index.ts
│   ├── options/        # Options React bootstrappers
│   ├── popup/          # Popup UI shell and layout
│   └── index.css       # Tailwind directives stylesheet
├── package.json        # Manifest build packages
└── vite.config.ts      # Vite compiling parameters
```
