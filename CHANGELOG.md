# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0-alpha] - 2026-07-09

### Added
- Complete Profile Management System inside the Options page dashboard.
- Built reusable repository services (`storage.service.ts`, `profile.service.ts`) with fallback logic.
- Implemented `useProfiles` and `useStorage` custom hooks.
- Configured validation checks for email, phone formats, alphanumeric passport numbers, and dates.
- Split form inputs into modular components (`PersonalFormSection`, `PassportFormSection`, `ContactFormSection`) to keep all files below 300 lines.
- Mounted the React options dashboard from `options.html`.

## [0.1.0-alpha] - 2026-07-09

### Added
- Professional Popup Dashboard UI (400x600px) with custom theme values.
- Reusable components: Button, Card, Badge, and EmptyState.
- Reusable layouts: Header, Footer, Section, Layout, and Container.
- Support for popup keyboard navigation, ARIA attributes, and visible focus rings.
- Dark mode readiness styles for the extension popup.

## [0.0.1] - 2026-07-09

### Added
- Initial repository structure setup.
- Chrome Extension (Manifest V3) environment setup.
- TypeScript, Vite, React, and Tailwind CSS v3 integrations.
- Local PostCSS and Autoprefixer style configurations.
- ESLint flat configuration and Prettier setups.
- CI pipeline workflow via GitHub Actions.
- Repository documentation (`README.md`, `LICENSE`, `CONTRIBUTING.md`, `ROADMAP.md`, `CHANGELOG.md`).
