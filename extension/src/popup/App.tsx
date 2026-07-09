import React from 'react';

const App: React.FC = () => {
  return (
    <div className="w-[380px] h-[550px] bg-[#F8FAFC] text-slate-900 font-sans select-none p-8 flex flex-col justify-between items-center text-center">
      {/* Spacer/Top */}
      <div />

      {/* Main Content */}
      <div className="flex flex-col items-center gap-6">
        {/* VisaKit Logo Monogram */}
        <div className="w-24 h-24 rounded-[16px] bg-[#2563EB] flex items-center justify-center shadow-lg shadow-[#2563EB]/20 border border-[#1E40AF]/10">
          <svg
            className="w-14 h-14 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1E40AF]">
            VisaKit
          </h1>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
            Smart Visa Form Autofill
          </p>
        </div>

        {/* Version */}
        <span className="text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200/60 px-3 py-1 rounded-[16px]">
          Version 0.1.0-alpha
        </span>
      </div>

      {/* Status / Bottom */}
      <div className="w-full">
        <div className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-[16px] flex items-center justify-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-bold text-emerald-600">Ready</span>
        </div>
      </div>
    </div>
  );
};

export default App;
