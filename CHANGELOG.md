# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.7.0-alpha] - 2026-07-09

### Added
- Hardened form filling loop with try/catch boundaries to safely recover from individual field errors.
- Introduced `WeakMap` caching mechanism in `FieldMapper` to prevent redundant DOM checks and accelerate scan speeds.
- Extended the `ResultReporter` autofill report payload with accurate `matched` count metrics.
- Created `docs/PRODUCTION_CHECKLIST.md` and `docs/COMPATIBILITY.md`.

## [0.6.0-alpha] - 2026-07-09

### Added
- Integrated execution flow components (`SupportedPageDetector.ts`, `ExecutionLogger.ts`, `AutofillExecutor.ts`, `ExecutionController.ts`).
- Created summary component (`ExecutionSummary.tsx`) reporting matches, fills, skips, failures, and execution timings.
- Mounted dynamic "Autofill Now" buttons and spinner loader status indicators in the popup card.
- Documented execution structures inside `docs/AUTOFILL_EXECUTION.md`.

## [0.5.0-alpha] - 2026-07-09

### Added
- Reusable, generic Field Mapping Engine decoupled from hardcoded web selectors.
- Built alias registry (`FieldRegistry.ts`) and fuzzy normalization utility (`Normalizer.ts`).
- Created matching elements (`AttributeMatcher.ts`, `LabelMatcher.ts`, `PlaceholderMatcher.ts`) handling name, id, autocomplete, labels, placeholders, and aria-labels.
- Refactored `FieldMapper` to execute the new 6-priority checklist order.
- Refactored `ValueResolver` to delegate values formatting to the new generic `Resolver` module.
- Created `docs/FIELD_MAPPING_ENGINE.md` architectural reference.

## [0.4.0-alpha] - 2026-07-09

### Added
- Standardized settings schemas (`types/settings.ts`, `constants/defaults.ts`) to configure themes, languages, and autofill preferences.
- Built settings handlers (`settings.service.ts`), preferences flags (`preferences.service.ts`), and theme toggles (`theme.service.ts`) watching OS preferences.
- Designed unified Sidebar Layout in Options dashboard to switch between Profile Dashboard and Settings Page.
- Implemented settings controls (Language selectors, Theme triggers, Autofill flags, Storage imports/exports, Profile purging, and Factory resets).
- Created `docs/SETTINGS.md` technical reference.
- Standardized issue templates (Bug, Feature, Question) and Pull Request templates inside `.github/`.
- Created architecture, setup, development, release, coding standard, and Chrome Store guides in `docs/`.
- Added developer prompts (`AI_RULES.md`, `CODING_RULES.md`, `PROJECT_CONTEXT.md`, `SPRINT_TEMPLATE.md`) in `prompts/`.
- Established root configurations for `.editorconfig` and `.prettierrc`.
- Written community and safety standards inside `CODE_OF_CONDUCT.md` and `SECURITY.md`.

## [0.3.0-alpha] - 2026-07-09

### Added
- MVP Autofill Engine inside content script sandbox.
- Priority matching strategy checking Name, ID, Autocomplete tags, labels, and placeholders.
- Date format translation resolver (e.g. converting `YYYY-MM-DD` profiles into `DD/MM/YYYY` text inputs).
- Synthetic DOM event triggers (`input`, `change`, `click`, `blur`) to support modern SPA frameworks.
- Popup-to-tab messaging structure triggering forms automation.
- Result report dialog overlay component (`AutofillResultModal.tsx`) showing execution stats in the popup.
- Technical documentation under `docs/AUTOFILL_ENGINE.md`.

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
