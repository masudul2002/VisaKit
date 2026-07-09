import React from 'react';
import { Badge } from '../components/Badge';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 pb-3 mb-4 shrink-0">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-[8px] bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-sm">
          V
        </div>
        <div className="flex flex-col">
          <h1 className="font-extrabold text-[15px] text-slate-900 dark:text-white tracking-tight leading-none">
            VisaKit
          </h1>
          <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold tracking-wider uppercase mt-0.5">
            Form Autofill
          </span>
        </div>
      </div>
      <Badge variant="success" pulse>
        Ready
      </Badge>
    </header>
  );
};
