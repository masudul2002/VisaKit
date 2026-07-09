import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-10">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Last Updated: July 2026
        </p>
      </div>

      <div className="flex flex-col gap-8 text-slate-700 leading-relaxed">
        {/* Core Guarantee */}
        <div className="p-6 border border-emerald-500/20 bg-emerald-500/5 rounded-[16px] flex gap-4 items-start">
          <div className="mt-1 text-emerald-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="flex flex-col gap-1.5">
            <h3 className="font-bold text-emerald-800 text-lg">Our Security Commitment</h3>
            <p className="text-sm text-emerald-700">
              VisaKit is a local-first application. We do not transmit, sync, or collect any personal details, passport particulars, or application selections. Everything operates strictly within your browser.
            </p>
          </div>
        </div>

        {/* Section 1 */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-slate-900">1. Data Storage</h2>
          <p>
            When you enter your profile information into the VisaKit Options page, it is written directly to your browser&apos;s local sandbox memory using the <code>chrome.storage.local</code> API. This data remains locked in your local application directory and is never written to remote clouds or database sync networks.
          </p>
        </section>

        {/* Section 2 */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-slate-900">2. External Transmissions</h2>
          <p>
            VisaKit contains no server connectors, database endpoints, or API integrations. It is unable to send data packets over the network. Your sensitive documents (such as passport number, date of birth, family records, or address credentials) remain strictly on your local hardware.
          </p>
        </section>

        {/* Section 3 */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-slate-900">3. Analytics and Telemetry</h2>
          <p>
            We do not load any tracking pixels, cookies, marketing analytics (such as Google Analytics), or error logging networks. We do not track how many times you run autofills or what forms you visit.
          </p>
        </section>

        {/* Section 4 */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-slate-900">4. Form Interaction</h2>
          <p>
            The content script only interacts with fields on the matching domain <code>https://indianvisaonline.gov.in/*</code>. It does not monitor inputs or keylogs on other websites.
          </p>
        </section>

        {/* Section 5 */}
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-slate-900">5. Changes to This Policy</h2>
          <p>
            Because we do not sync code remotely, any changes to our privacy rules will only occur through official version updates packaged on the Chrome Web Store.
          </p>
        </section>
      </div>
    </div>
  );
}
