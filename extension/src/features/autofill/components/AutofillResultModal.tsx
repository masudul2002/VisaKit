import React from 'react';
import { AutofillReport } from '../types/types';

interface AutofillResultModalProps {
  isOpen: boolean;
  report: AutofillReport | null;
  error?: string | null;
  onClose: () => void;
}

export const AutofillResultModal: React.FC<AutofillResultModalProps> = ({
  isOpen,
  report,
  error,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal box */}
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-[20px] p-5 w-[325px] relative z-10 shadow-2xl flex flex-col gap-4 text-slate-855 dark:text-slate-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="result-dialog-title"
      >
        <div className="flex flex-col gap-1">
          <h3
            id="result-dialog-title"
            className="text-sm font-extrabold text-slate-900 dark:text-white leading-none"
          >
            {error ? 'Autofill Failure' : 'Autofill Completed'}
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {error ? 'Could not execute automation' : 'Execution summary report'}
          </p>
        </div>

        {error ? (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-[12px] text-xs font-semibold leading-relaxed">
            {error}
          </div>
        ) : report ? (
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 rounded-[12px] flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Filled
              </span>
              <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-300">
                {report.filled}
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-[12px] flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Skipped
              </span>
              <span className="text-base font-extrabold text-slate-700 dark:text-slate-300">
                {report.skipped}
              </span>
            </div>

            <div className="p-3 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/50 rounded-[12px] flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider">
                Failed
              </span>
              <span className="text-base font-extrabold text-red-700 dark:text-red-300">
                {report.failed}
              </span>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-[12px] flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Time
              </span>
              <span className="text-base font-extrabold text-blue-700 dark:text-blue-300">
                {report.timeMs}ms
              </span>
            </div>
          </div>
        ) : null}

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-[12px] text-xs shadow-md transition-all cursor-pointer"
        >
          Close Report
        </button>
      </div>
    </div>
  );
};
