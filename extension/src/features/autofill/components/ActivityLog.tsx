import React, { useState, useEffect } from 'react';
import { activityService, ActivityLogEntry } from '../services/activity.service';

export const ActivityLog: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadLogs = async () => {
    setIsLoading(true);
    const data = await activityService.getLogs();
    setLogs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleClear = async () => {
    if (confirm('Are you sure you want to clear your autofill activity logs?')) {
      await activityService.clearLogs();
      setLogs([]);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-grow flex items-center justify-center p-12 text-slate-400">
        <span className="font-bold text-sm">Loading activity logs...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl px-8 py-10 flex flex-col gap-8">
      <div className="flex justify-between items-center border-b border-slate-900 pb-5 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
            H
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold text-white tracking-tight leading-none">
              Activity History Log
            </h1>
            <span className="text-[11px] text-slate-500 font-bold tracking-wide mt-1.5 uppercase">
              Review and audit your recent form autofill executions
            </span>
          </div>
        </div>

        {logs.length > 0 && (
          <button
            onClick={handleClear}
            className="px-3.5 py-1.5 bg-red-600/10 hover:bg-red-655/20 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Clear History
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-slate-900 rounded-[24px] bg-slate-950/20">
          <span className="text-xs font-bold text-slate-500">No activity logged yet.</span>
          <span className="text-[11px] text-slate-600 mt-1 max-w-xs leading-relaxed">
            Autofill logs will appear here once you trigger form filling on supported portal pages.
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {logs.map((log, idx) => (
            <div
              key={idx}
              className="p-5 bg-slate-900/30 border border-slate-900 rounded-[20px] flex flex-col md:flex-row md:justify-between md:items-center gap-4 transition-all hover:bg-slate-900/40"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="font-extrabold text-sm text-white">{log.profileName}</span>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium truncate max-w-md">
                  {log.url}
                </span>
              </div>

              <div className="flex items-center gap-6 text-xs select-none">
                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    Matched
                  </span>
                  <span className="font-extrabold text-blue-400 mt-0.5">{log.matched}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    Filled
                  </span>
                  <span className="font-extrabold text-emerald-400 mt-0.5">{log.filled}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    Failed
                  </span>
                  <span className="font-extrabold text-red-500 mt-0.5">{log.failed}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    Duration
                  </span>
                  <span className="font-bold text-slate-200 mt-0.5">{log.timeMs}ms</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
