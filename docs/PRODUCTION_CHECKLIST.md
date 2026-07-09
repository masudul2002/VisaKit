# Production Quality Checklist

This list details the production validation controls for releasing VisaKit.

---

## 🔒 Security & Privacy Sanitization
- [x] **No Analytics**: Verify no remote analytics scripts or telemetry libraries exist.
- [x] **Local Sandbox**: Ensure profiles are stored exclusively on `chrome.storage.local`.
- [x] **No Autofill Submits**: Verify the filler engine does not trigger programatic form submits.
- [x] **Strict Domain Scope**: Make sure extension injection rules are scoped to the official governmental portal domains.

---

## 🛠️ Code Stability Controls
- [x] **Linter Execution**: Confirm `npm run lint` yields zero warnings and errors.
- [x] **Build Checks**: Verify `npm run build` succeeds on popups, settings options pages, content, and background modules.
- [x] **Try/Catch Scope Isolation**: Ensure errors on individual form elements do not interrupt execution of other fields.
- [x] **Caching**: Confirm element matches are cached in WeakMap memory loops to avoid redundant scans.

---

## 🧪 Testing Scenarios
- [x] **Theme Syncing**: Test light, dark, and system themes.
- [x] **Language Changes**: Verify selecting system languages does not disrupt option renders.
- [x] **Profile Backups**: Verify profiles JSON backups successfully merge and overwrite schemas.
