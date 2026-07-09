import React from "react";

export default function Docs() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-10">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Documentation
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Learn how to install, configure, and secure your VisaKit profile.
        </p>
      </div>

      <div className="flex flex-col gap-8 text-slate-700 leading-relaxed">
        {/* Architecture */}
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-slate-900">How it Works</h2>
          <p>
            VisaKit operates strictly as a Chrome Extension inside your browser sandbox. When you save your details in the options dashboard, the data is stored in the browser using the <code>chrome.storage.local</code> API.
          </p>
          <p>
            When you visit supported visa portal pages (such as the Indian Visa Online website), the content script checks if you have a local profile saved. If a profile exists, the extension automatically populates matching fields without needing external network queries.
          </p>
        </section>

        {/* Security guidelines */}
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-slate-900">Security Model</h2>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>
              <strong>No Cloud Sync</strong>: Your profile is stored strictly locally. We do not sync your passport particulars to Google, Vercel, or any other server.
            </li>
            <li>
              <strong>Manifest V3 Permissions</strong>: We request only three browser permissions:
              <ul className="list-circle pl-5 mt-1 flex flex-col gap-1 text-slate-600">
                <li><code>storage</code> - to persist your profile locally.</li>
                <li><code>activeTab</code> - to securely interact with the active visa portal tab.</li>
                <li><code>scripting</code> - to inject the autofill script when you authorize form filling.</li>
              </ul>
            </li>
            <li>
              <strong>Zero Captcha Automation</strong>: To maintain compliance with government portals, we do not automate captcha inputs or form submissions. You are always responsible for solving captchas and double-checking details before manual submission.
            </li>
          </ul>
        </section>

        {/* Getting support */}
        <section className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-slate-900">Contribution & Development</h2>
          <p>
            Developers can inspect or contribute to the project on our GitHub repository. Please review our <code>CONTRIBUTING.md</code> file in the repository root for code specifications and branch guidelines.
          </p>
        </section>
      </div>
    </div>
  );
}
