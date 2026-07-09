import React from 'react';

export interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-[390px] min-h-[640px] max-h-[700px] h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans select-none overflow-hidden relative border border-slate-100 dark:border-slate-900 shadow-2xl">
      {/* Subtle background glow */}
      <div className="absolute top-[-80px] right-[-80px] w-48 h-48 rounded-full bg-blue-500/10 dark:bg-blue-600/15 blur-3xl -z-10" />
      <div className="absolute bottom-[-80px] left-[-80px] w-48 h-48 rounded-full bg-indigo-500/10 dark:bg-indigo-600/15 blur-3xl -z-10" />
      {children}
    </div>
  );
};
