# Autofill Execution Engine Architecture

This document describes the orchestration flow and modules involved in executing autofills on target pages.

---

## 🔄 Execution Workflow

The fill routine is initiated from the extension Popup and flows as follows:

```text
┌──────────────┐         1. Read Active Profile         ┌─────────────────────┐
│  Extension   ├───────────────────────────────────────>│   profileService    │
│    Popup     │<───────────────────────────────────────┤ (chrome.storage)    │
└──────┬───────┘         Active Profile Struct          └─────────────────────┘
       │
       │ 2. Query Tab & URL
       ▼
┌──────────────────────┐ 3. Test URL Pattern            ┌─────────────────────┐
│ ExecutionController  ├───────────────────────────────>│SupportedPageDetector│
└──────┬───────────────┘<───────────────────────────────┤ (domain validator)  │
       │                 Is Supported: true             └─────────────────────┘
       │
       │ 4. Send action: 'AUTOFILL'
       ▼
┌──────────────────────┐ 5. Scan & Map DOM elements     ┌─────────────────────┐
│    Content Script    ├───────────────────────────────>│  AutofillExecutor   │
└──────────────────────┘<───────────────────────────────┤  (ResultReporter)   │
                         Execution Summary Report       └─────────────────────┘
```

---

## ⚙️ Core Modules

All execution logic is placed under [src/features/autofill/execution/](file:///c:/Users/Masudul/VS%20Code/Project/VisaKit/extension/src/features/autofill/execution/):
1.  **Supported Page Detector** (`SupportedPageDetector.ts`): Checks tab URLs against extension content script matches.
2.  **Execution Logger** (`ExecutionLogger.ts`): Encapsulates logging formatting.
3.  **Autofill Executor** (`AutofillExecutor.ts`): Triggers field scanners, mappings, resolves values, and fills inputs.
4.  **Execution Controller** (`ExecutionController.ts`): Fetches default profiles, active tabs, and forwards `AUTOFILL` payloads.
5.  **Execution Summary** (`ExecutionSummary.tsx`): Displays matched, filled, skipped, and failed statistics in popup alerts.

---

## 🛡️ Security & Integrity Constraints

*   **No Auto-Submit**: The engine populates forms but never clicks submit buttons.
*   **No CAPTCHA Interaction**: Bypasses any CAPTCHA inputs.
*   **Local Sandboxing**: Reads data strictly via local storage. No tracking or telemetry calls are made.
