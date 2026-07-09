# VisaKit System Architecture

This document describes the high-level architecture of VisaKit, a Manifest V3 Chrome Extension.

## Components Overview

### 1. Options Page (React App)
- Serves as the primary configuration dashboard and profile manager.
- Features a secure settings layout built with React and Tailwind CSS.
- Permits input of visa applicant profiles (e.g. Personal Details, Passport Info, Contact Info, Family Details, Address, Previous Visa).
- Persists all configuration states into Chrome's Local Storage via the `chrome.storage.local` API.

### 2. Popup Page (React App)
- Serves as the quick-action interface displayed upon clicking the extension badge.
- Shows current security audits (e.g. data locally stored) and indicates if an Indian Visa application form is detected on the active tab.
- Provides a quick action to launch the full Profile Manager Options page.

### 3. Content Scripts (TypeScript iife build)
- Sandboxed DOM script injected into `indianvisaonline.gov.in/*` matches.
- Reads user-saved profile properties from `chrome.storage.local` memory.
- Performs automated, secure form filling for matching input text, select dropdowns, and datepickers.
- Operates entirely locally. Does not intercept network calls or upload inputs to any external endpoint.

---

## Data flow Diagram

```text
+-----------------------+              +------------------------+
|   Options UI (React)  |              |    Popup UI (React)    |
+-----------+-----------+              +-----------+------------+
            |                                      |
            | write                                | query status
            v                                      v
  +------------------+                   +------------------+
  |  Chrome Storage  | <---------------- |  Content Script  |
  |     (Local)      |      read         |  (DOM Inject)    |
  +------------------+                   +---------+--------+
                                                   |
                                                   | fills
                                                   v
                                         +------------------+
                                         | Indian Visa Form |
                                         +------------------+
```
