# Vercel Deployment Guide

This document describes how to deploy the VisaKit product page website to Vercel.

---

## 🚀 Deployment Options

### Option 1: GitHub Integration (Recommended)

1.  **Import Repository**:
    *   Sign in to the [Vercel Dashboard](https://vercel.com/dashboard).
    *   Click **Add New...** and select **Project**.
    *   Connect your GitHub account and import the `masudul2002/VisaKit` repository.
2.  **Configure Project Settings**:
    *   **Project Name**: `visakit-website` (or custom name).
    *   **Framework Preset**: `Next.js`.
    *   **Root Directory**: Set this to **`website`** (do NOT use the repository root).
3.  **Build Commands**:
    *   Vercel automatically detects the Next.js build presets:
        *   Build Command: `next build`
        *   Output Directory: `.next`
        *   Install Command: `npm install`
4.  **Deploy**:
    *   Click **Deploy**. Vercel will build the Next.js app and assign a default `.vercel.app` domain.

---

### Option 2: Vercel CLI (Local Deployment)

1.  **Install Vercel CLI**:
    ```bash
    npm install -g vercel
    ```
2.  **Authenticate**:
    ```bash
    vercel login
    ```
3.  **Deploy**:
    Run the deployment command from the repository root:
    ```bash
    vercel website/
    ```
    Follow the prompt instructions:
    *   Link to existing project? **No**
    *   What is the project name? **visakit-website**
    *   Which directory is your code located in? **website**
    *   Vercel will upload and compile the project. To push to production, run:
        ```bash
        vercel website/ --prod
        ```
