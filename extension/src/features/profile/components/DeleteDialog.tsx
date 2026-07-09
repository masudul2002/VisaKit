import React from 'react';

interface DeleteDialogProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  profileName: string;
}

export const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  profileName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onCancel} />

      {/* Dialog container */}
      <div
        className="bg-slate-900 border border-slate-800 rounded-[20px] p-6 max-w-md w-full relative z-10 shadow-2xl flex flex-col gap-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
      >
        <div className="flex flex-col gap-2">
          <h3 id="delete-dialog-title" className="text-lg font-bold text-white leading-tight">
            Delete Profile
          </h3>
          <p className="text-sm text-slate-400 leading-normal">
            Are you sure you want to delete the profile for{' '}
            <strong className="text-slate-200">{profileName}</strong>? This action cannot be
            undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 shrink-0">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-red-500/10 hover:shadow-red-500/20 transition-all cursor-pointer"
          >
            Delete Profile
          </button>
        </div>
      </div>
    </div>
  );
};
