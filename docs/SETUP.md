# Setup & Installation Guide

Follow these steps to set up and run the VisaKit project locally.

---

## 🛠️ Prerequisites

*   Node.js (v18.0.0 or higher)
*   npm (v9.0.0 or higher)

---

## 📥 Getting the Code

1.  Clone the repository:
    ```bash
    git clone https://github.com/masudul2002/VisaKit.git
    cd VisaKit
    ```

---

## 🚀 Setting up the Chrome Extension

1.  Navigate to the extension directory:
    ```bash
    cd extension
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build the bundle:
    ```bash
    npm run build
    ```
4.  Load into Google Chrome:
    *   Open Chrome and go to `chrome://extensions/`.
    *   Turn on **Developer mode** (top-right toggle).
    *   Click **Load unpacked** (top-left button).
    *   Select the `extension/dist` folder.

---

## 🌐 Setting up the Website

1.  Navigate to the website directory from the repository root:
    ```bash
    cd website
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open `http://localhost:3000` in your web browser.
