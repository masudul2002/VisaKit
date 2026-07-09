# VisaKit - Project-Scoped Development Rules

These rules apply specifically to all work done within the VisaKit repository.

## 🎯 Project Goal
Build a production-quality Chrome Extension called VisaKit (Manifest V3) that securely saves user profiles locally and autofills supported Indian Visa application forms.

## 🛑 Absolute Rules
- **No Deletions**: Never remove existing working code.
- **No Architecture Changes**: Never change project architecture without reason.
- **No Duplication**: Never create duplicate files.
- **No TODOs**: Never leave TODO comments or incomplete scaffolding.
- **Strict Typing**: Never use `any` in TypeScript unless absolutely necessary.
- **Modularity**: Keep files modular and components reusable.
- **File Size Limit**: Maximum file size is 300 lines. If larger, split it into smaller sub-components.

## 🌿 Git Strategy & Rules
- **Pre-flight Check**: Always run `git status` before starting any changes.
- **Micro-commits**: After every completed task, run:
  ```bash
  git add .
  git commit -m "<conventional commit>"
  ```
- **Push**: If a remote is configured, run `git push`.
- **Commits Check**: Never leave completed work uncommitted.
- **Branch Naming**:
  - `main` - Stable Release
  - `develop` - Development
  - `feature/<name>` - New Feature
  - `fix/<name>` - Bug Fix
- **Commit Format**: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `build:`, `chore:`

## 📝 Documentation
Whenever changes occur:
- Update [README.md](file:///c:/Users/Masudul/VS%20Code/Project/VisaKit/README.md) for new features.
- Update [CHANGELOG.md](file:///c:/Users/Masudul/VS%20Code/Project/VisaKit/CHANGELOG.md) for releases.
- Update files under `docs/` for architectural shifts.

## 🎨 Code Style
- TypeScript Strict Mode.
- React Functional Components & Hooks.
- Reusable Components.
- Feature-based Architecture.

## 🧪 Testing & Validation
Before completing any sprint:
- Run `npm run build` and ensure compilation is clean.
- Fix all warnings and errors.
- Ensure zero ESLint, TypeScript, or browser console errors.

## 🔒 Security & Privacy
- **Local-Only**: Store all user data locally. Never upload passport or personal data.
- **No Bypass**: Do not implement CAPTCHA solving or security bypass scripts.
- **Least Privilege**: Never request unnecessary permissions.
