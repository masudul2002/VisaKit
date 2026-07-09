# Contributing to VisaKit

Thank you for your interest in contributing to VisaKit! This document provides instructions and standards for submitting contributions.

---

## 🔒 Security & Privacy Notice

VisaKit is a local-first, privacy-respecting Chrome Extension.
- **Rule**: Never add features that transmit user profile inputs (especially passport or sensitive personal information) to external servers, APIs, or trackers.
- **Rule**: Do not add unnecessary tracking, analytics, or remote third-party scripts.

---

## 🌿 Git Branching Strategy

We follow a structured branching model:
- `main`: Stores official production releases.
- `develop`: The primary integration branch where new features are merged.
- `feature/<feature-name>`: Dedicated branches for developing specific features or sprints.

### Creating a Pull Request
1. Branch off from `develop`.
2. Implement and test your changes.
3. Submit a Pull Request targeting the `develop` branch.

---

## ✍️ Coding Guidelines

- **TypeScript Only**: All extension scripts and React components must be written in TypeScript with strict type checking enabled.
- **Functional Components**: All React components should be written as functional components using hooks.
- **Code Style**: We use ESLint and Prettier. Run formatting before committing:
  ```bash
  npm run lint
  ```
- **Local Verification**: Ensure that the build succeeds locally:
  ```bash
  npm run build
  ```

---

## 📝 Commit Standards

We follow the **Conventional Commits** specification:
- `feat`: A new user-facing feature.
- `fix`: A bug fix.
- `docs`: Documentation updates.
- `style`: Changes that do not affect code logic (formatting, spacing, etc.).
- `refactor`: Code changes that neither fix bugs nor add features.
- `test`: Adding or correcting tests.
- `chore`: Updates to build scripts, configurations, or packages.

Example:
```text
feat: add passport inputs section to option form
```
