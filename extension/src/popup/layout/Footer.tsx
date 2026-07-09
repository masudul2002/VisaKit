import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="flex items-center justify-between border-t border-slate-200/60 dark:border-slate-800/80 pt-3.5 mt-4 text-[10px] font-bold text-slate-400 dark:text-slate-500 shrink-0">
      <span>v0.1.0-alpha</span>
      <div className="flex items-center gap-3">
        <a
          href="https://github.com/masudul2002/VisaKit"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          aria-label="View source code on GitHub"
        >
          GitHub
        </a>
        <span>•</span>
        <span>MIT License</span>
      </div>
    </footer>
  );
};
