import React from 'react';

interface ConflictDialogProps {
  isOpen: boolean;
  onMerge: () => void;
  onReplace: () => void;
  onCancel: () => void;
  duplicateCount: number;
}

export const ConflictDialog: React.FC<ConflictDialogProps> = ({
  isOpen,
  onMerge,
  onReplace,
  onCancel,
  duplicateCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onCancel} />

      {/* Modal card */}
      <div
        className="bg-slate-900 border border-slate-800 rounded-[24px] p-6 w-[400px] relative z-10 shadow-2xl flex flex-col gap-4 text-slate-200 select-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="conflict-dialog-title"
      >
        <div className="flex flex-col gap-1">
          <h3 id="conflict-dialog-title" className="text-base font-extrabold text-white">
            Conflicts Detected
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mt-1">
            We found {duplicateCount} profile(s) with passport numbers or emails that already exist
            locally. How would you like to proceed?
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={onMerge}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Merge (Only import unique records)
          </button>
          <button
            onClick={onReplace}
            className="w-full py-2.5 bg-red-600/10 hover:bg-red-600/20 border border-red-500/20 text-red-400 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Overwrite (Replace all local profiles)
          </button>
          <button
            onClick={onCancel}
            className="w-full py-2.5 bg-slate-800 hover:bg-slate-750 text-slate-400 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
