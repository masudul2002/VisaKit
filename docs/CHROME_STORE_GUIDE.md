# Chrome Web Store Submission Guide

This guide details packaging and publishing the VisaKit extension to the Chrome Web Store.

---

## 📦 Packaging

To create the release zip package:

1.  Navigate to the extension directory and verify clean build:
    ```bash
    cd extension
    npm run build
    ```
2.  Compress the generated `dist` folder:
    *   On Windows (PowerShell):
        ```powershell
        Compress-Archive -Path dist\* -DestinationPath visakit-extension.zip -Force
        ```
    *   On macOS/Linux:
        ```bash
        cd dist && zip -r ../visakit-extension.zip . *
        ```

---

## 🚀 Publishing Steps

1.  **Open Chrome Developer Dashboard**:
    Go to the [Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole/).
2.  **Create New Item**:
    Click **Add New Item** and upload `visakit-extension.zip`.
3.  **Provide Store Listing Metadata**:
    *   **Detailed Description**: Outline features and local-only safety standards.
    *   **Category**: "Productivity" or "Developer Tools".
    *   **Icons**: Upload the brand logos (128x128px PNG).
    *   **Screenshots**: Add screenshots showcasing the options dashboard and popup report cards.
4.  **Privacy Disclosures**:
    Confirm that VisaKit does not send profile or passport particulars across the network, operates 100% locally, and collects zero telemetry data.
5.  **Submit for Review**:
    Submit the extension. Review usually takes 24 to 72 hours.
