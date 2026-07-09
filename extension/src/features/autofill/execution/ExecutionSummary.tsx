import React from 'react';
import { AutofillReport } from '../types/types';

interface ExecutionSummaryProps {
  report: AutofillReport | null;
  error: string | null;
  onClose: () => void;
}

export const ExecutionSummary: React.FC<ExecutionSummaryProps> = ({
  report,
  error,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-[24px] p-6 shadow-2xl flex flex-col gap-5 text-slate-200">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <h3 className="font-extrabold text-sm text-white select-none">Execution Summary</h3>
          <button
            onClick={onClose}
            className="text-slate-450 hover:text-white text-[11px] font-bold px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        {error ? (
          <div className="text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 p-4 rounded-xl leading-relaxed">
            {error}
          </div>
        ) : report ? (
          <div className="flex flex-col gap-4 text-xs">
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Matched
                </span>
                <span className="text-base font-extrabold text-blue-400 mt-1">
                  {report.matched !== undefined ? report.matched : report.filled}
                </span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Filled
                </span>
                <span className="text-base font-extrabold text-emerald-400 mt-1">
                  {report.filled}
                </span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Skipped
                </span>
                <span className="text-base font-extrabold text-amber-500 mt-1">
                  {report.skipped}
                </span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex flex-col">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Failed
                </span>
                <span className="text-base font-extrabold text-red-500 mt-1">{report.failed}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Time Elapsed
              </span>
              <span className="font-extrabold text-slate-200">
                {report.timeMs !== undefined ? `${report.timeMs.toFixed(0)}ms` : 'N/A'}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-400">No report available.</div>
        )}
      </div>
    </div>
  );
};
