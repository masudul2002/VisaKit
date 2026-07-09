# Cross-Browser Compatibility Report

This document reports the browser support matrices and normalization strategies for VisaKit.

---

## 🌐 Supported Browsers

VisaKit is fully optimized to run on standard Manifest V3 Chromium runtimes:

1.  **Google Chrome** (v100+): Primary development target. Uses standard `chrome.storage.local` storage systems.
2.  **Brave Browser**: Operates identically. AdShield configurations do not block local DOM parsing structures.
3.  **Microsoft Edge**: Compatible. Standardized styling renders without scrolling anomalies.

---

## 🛠️ Normalization Strategies

To cope with markup discrepancies (camelCase, snake_case, spaces, casing) on external portals:

*   **Registry Aliases**: Associates profile properties with multiple string labels (e.g. `family_name`, `lastName`).
*   **Fuzzy Cleaning**: `Normalizer.normalize` strips out special characters, ignores spaces, and maps comparisons using lowercase strings.
*   **Multi-Priority Elements Scanner**: Maps inputs by querying standard names, selector IDs, autocomplete descriptions, text labels, placeholders, and aria-labels.
