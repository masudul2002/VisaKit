# Development Guide

This guide describes development workflows, CLI commands, and test strategies.

---

## 🛠️ Development Workflow

To work on VisaKit features locally:

1.  **Start Dev server (Hot Reloading)**:
    Navigate to the `extension/` folder and run:
    ```bash
    npm run dev
    ```
    This launches a development server compiling the popup and options page. You can open `http://localhost:5173` to test Options UI in standard tab browser environments.
2.  **Inspect Extensions DOM**:
    Right-click the extension popup button in Chrome and select **Inspect Popup**. You can view console output, network calls, and CSS structures inside standard dev tools.

---

## 📝 CLI Reference Commands

Inside the `extension/` directory:
-   `npm run build`: Bundlespopup UI, background worker, content script, options page, and copies the manifest file to `dist/`.
-   `npm run dev`: Hot reloadspopup/options apps.
-   `npm run lint`: Evaluates typescript syntax and lints files using ESLint.

---

## 🧪 Manual Verification Checklist

When building new features:
1.  **Run build**: Always run `npm run build` to verify webpack/vite asset outputs.
2.  **Lint Check**: Run `npm run lint` and resolve all warnings.
3.  **Storage Persistence test**: Create a profile, edit it, reload the extension unpacked dist, and verify profiles remain intact.
