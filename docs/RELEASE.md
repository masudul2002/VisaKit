# Release Guide

This document describes how to package and release new versions of VisaKit.

---

## 🏷️ Versioning Protocol

We adhere to [Semantic Versioning (SemVer)](https://semver.org/):
*   **Major**: Breaking changes or architecture re-alignments.
*   **Minor**: New feature additions (e.g. adding new visa autofill portal support).
*   **Patch**: Bug fixes and security patches.

---

## 🚀 Release Steps

1.  **Branch Merge**:
    Merge feature branches into `develop`. Run final automated linting and validation:
    ```bash
    npm run lint
    npm run build
    ```
2.  **Version Bump**:
    *   Update version string in `extension/package.json`.
    *   Update version string in `extension/public/manifest.json`.
3.  **Update Changelog**:
    Add release details under a new version heading in [CHANGELOG.md](../../CHANGELOG.md).
4.  **Create Tag & Merge to Main**:
    *   Merge `develop` into `main`.
    *   Tag the commit: `git tag -a v[version] -m "Release v[version]"`.
    *   Push main and tags: `git push origin main --tags`.

---

## 📋 Release Checklist

Before marking a version as ready for release:
- [ ] All local tests pass successfully.
- [ ] Linter is run and returns zero errors: `npm run lint` in `extension/` and `website/`.
- [ ] Extension build compiles cleanly: `npm run build` in `extension/`.
- [ ] Website build compiles cleanly: `npm run build` in `website/`.
- [ ] Version strings in `extension/package.json` and `extension/public/manifest.json` match.
- [ ] `CHANGELOG.md` is updated with version release logs.
- [ ] Merge `develop` into `main` and tag the release version.
- [ ] Generate the release archive: zip the `extension/dist/` folder.
- [ ] Create a GitHub Release on the new tag, pasting the release template and attaching the pre-built zip.

