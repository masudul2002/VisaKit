# Settings & Configuration Architecture

This document describes the structure and state lifecycle of settings and user configurations in VisaKit.

---

## 🏗️ Technical Modules

The settings configurations reside under [src/features/settings/](file:///c:/Users/Masudul/VS%20Code/Project/VisaKit/extension/src/features/settings/):
*   **Types** (`types/settings.ts`): Declares interface types (`ThemeMode`, `LanguageMode`, and the master `UserSettings` schema).
*   **Defaults** (`constants/defaults.ts`): Holds default configs for general settings, themes, autofill preferences, and advanced parameters.
*   **Settings Service** (`services/settings.service.ts`): Loads settings from local storage, deep-merging with defaults to repair missing or corrupted keys.
*   **Preferences Service** (`services/preferences.service.ts`): Resolves preference flags used by the form automator.
*   **Theme Service** (`services/theme.service.ts`): Toggles dark/light root classes on the HTML document body reactively and watches system preferences.
*   **React Hook** (`hooks/useSettings.ts`): Simplifies state bindings for components.

---

## 🎨 Theme Applications

Theme modes are dynamically handled by the `themeService`:
1.  **Light Mode**: Removes the `dark` class from `documentElement`.
2.  **Dark Mode**: Adds the `dark` class to `documentElement`.
3.  **System Mode**: Queries `window.matchMedia('(prefers-color-scheme: dark)')` to synchronize with OS themes. The extension registers media event listeners, adjusting classes automatically if color schemes toggle in the OS settings.

---

## 🔒 Storage & Purification Actions

To guarantee privacy, settings are saved strictly in `chrome.storage.local`. Under **Storage Settings**, users can perform key administrative purges:
*   **Clear Profiles**: Deletes the list of applicant profiles but preserves settings.
*   **Reset Settings**: Reverts configs to standard defaults but preserves applicant profiles.
*   **Factory Reset**: Wipes both profiles list AND configurations, returning VisaKit to a clean-slate environment.
