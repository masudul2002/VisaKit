import React from 'react';

export const ProfileHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-3.5 border-b border-slate-900 pb-5 mb-8 shrink-0">
      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
        V
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-extrabold text-white tracking-tight leading-none">
          VisaKit Profile Manager
        </h1>
        <span className="text-[11px] text-slate-500 font-bold tracking-wide mt-1.5 uppercase">
          Secure Local Sandbox Storage
        </span>
      </div>
    </div>
  );
};
