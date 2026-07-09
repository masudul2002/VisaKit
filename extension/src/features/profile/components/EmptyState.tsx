import React from 'react';

interface EmptyStateProps {
  onNewProfile: () => void;
  isSearch: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onNewProfile, isSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-slate-800 rounded-[20px] bg-slate-900/10 shadow-sm max-w-lg mx-auto mt-8 select-none">
      <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5">
        {isSearch ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        )}
      </div>

      <h3 className="font-extrabold text-white text-lg">
        {isSearch ? 'No matching profiles' : 'No Profiles Found'}
      </h3>
      <p className="text-sm text-slate-400 mt-2 mb-6 leading-relaxed max-w-sm">
        {isSearch
          ? 'Try refining your search query or check the passport number spelling.'
          : 'Create your first secure visa profile. All data remains saved locally in your browser storage sandbox.'}
      </p>

      {!isSearch && (
        <button
          onClick={onNewProfile}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create First Profile
        </button>
      )}
    </div>
  );
};
