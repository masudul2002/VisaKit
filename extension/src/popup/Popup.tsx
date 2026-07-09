import React, { useEffect, useState } from 'react';

export const Popup: React.FC = () => {
  const [isFormPage, setIsFormPage] = useState<boolean>(false);
  const [autofillEnabled, setAutofillEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Check if current tab is an Indian Visa Application page
    if (typeof chrome !== 'undefined' && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (activeTab?.url?.includes('indianvisaonline.gov.in')) {
          setIsFormPage(true);
        }
      });
    }
  }, []);

  const handleOpenOptions = () => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open('../options/index.html');
    }
  };

  return (
    <div className="w-[360px] p-6 bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden min-h-[400px] flex flex-col justify-between border border-slate-900 rounded-lg shadow-2xl relative">
      {/* Background gradients */}
      <div className="absolute top-[-50px] right-[-50px] w-36 h-36 rounded-full bg-indigo-600/20 blur-3xl -z-10" />
      <div className="absolute bottom-[-30px] left-[-30px] w-36 h-36 rounded-full bg-violet-600/20 blur-3xl -z-10" />

      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 shadow-md shadow-indigo-500/20">
            <span className="font-extrabold text-white text-xl tracking-tight">V</span>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent tracking-wide">
              VisaKit
            </h1>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Indian Visa Helper
            </p>
          </div>
        </div>

        {/* Security Alert Banner */}
        <div className="p-3 mb-5 border border-indigo-500/20 bg-indigo-500/5 rounded-xl flex items-start gap-3 backdrop-blur-md">
          <div className="mt-0.5 text-indigo-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xs font-semibold text-indigo-300">Privacy Guaranteed</h3>
            <p className="text-[10px] text-slate-400 leading-normal mt-0.5">
              Your profile data is stored 100% locally. No servers, trackers, or telemetry.
            </p>
          </div>
        </div>

        {/* Status card */}
        <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl mb-6 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-slate-400 font-medium">Autofill Status</span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isFormPage
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/25'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              {isFormPage ? 'Visa Site Detected' : 'Idle'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {isFormPage
              ? 'Ready to autofill. Open the application form page and VisaKit will handle the rest.'
              : 'Visit the official Indian Visa site to begin autofilling.'}
          </p>

          {isFormPage && (
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
              <label htmlFor="autofill-toggle" className="text-xs font-medium text-slate-400">
                Enable Autofill
              </label>
              <button
                id="autofill-toggle"
                onClick={() => setAutofillEnabled(!autofillEnabled)}
                className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  autofillEnabled ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    autofillEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div>
        <button
          onClick={handleOpenOptions}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white font-semibold rounded-xl text-sm shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-indigo-500/30 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Manage Visa Profile</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
        <p className="text-[10px] text-center text-slate-500 mt-3 font-medium">
          VisaKit v1.0.0 • Local Secure Mode
        </p>
      </div>
    </div>
  );
};
