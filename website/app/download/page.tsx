import React from "react";

export default function Download() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-10">
      <div className="border-b border-slate-200 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Download Extension
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Get started with VisaKit on your browser.
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <div className="p-6 bg-blue-50/50 border border-blue-200/50 rounded-[16px] flex gap-4 items-start">
          <div className="mt-1 text-[#2563EB]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-slate-900 text-lg">Web Store Notice</h3>
            <p className="text-sm text-slate-600">
              VisaKit is currently in development (version 0.1.0-alpha). You can download the source code from GitHub and load it manually as an unpacked extension.
            </p>
          </div>
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-slate-900">How to Install Unpacked</h2>
          
          <div className="flex flex-col gap-6 mt-2">
            {/* Step 1 */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-sm shrink-0">
                1
              </div>
              <div className="flex flex-col gap-1 pt-0.5">
                <h3 className="font-bold text-slate-900">Download Source Code</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Clone our official repository from GitHub:
                </p>
                <pre className="bg-slate-900 text-slate-200 text-xs p-3 rounded-lg mt-2 overflow-x-auto">
                  git clone https://github.com/masudul2002/visakit.git
                </pre>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-sm shrink-0">
                2
              </div>
              <div className="flex flex-col gap-1 pt-0.5">
                <h3 className="font-bold text-slate-900">Install and Build</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Navigate to the <code>extension</code> folder, install packages, and compile:
                </p>
                <pre className="bg-slate-900 text-slate-200 text-xs p-3 rounded-lg mt-2 overflow-x-auto">
                  cd visakit/extension{"\n"}
                  npm install{"\n"}
                  npm run build
                </pre>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#2563EB] flex items-center justify-center font-bold text-sm shrink-0">
                3
              </div>
              <div className="flex flex-col gap-1 pt-0.5">
                <h3 className="font-bold text-slate-900">Load into browser</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Open Chrome and go to <code className="bg-slate-100 px-1 py-0.5 rounded">chrome://extensions/</code>. Toggle **Developer mode** on (top-right). Click **Load unpacked** (top-left) and select the generated <code>dist</code> folder: <code>visakit/extension/dist</code>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
