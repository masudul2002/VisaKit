import React from 'react';
import { SearchBox } from './SearchBox';

interface ProfileToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewProfile: () => void;
  showCreateButton: boolean;
  onExportAll: () => void;
  onImport: () => void;
}

export const ProfileToolbar: React.FC<ProfileToolbarProps> = ({
  searchQuery,
  onSearchChange,
  onNewProfile,
  showCreateButton,
  onExportAll,
  onImport,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 select-none shrink-0">
      <SearchBox value={searchQuery} onChange={onSearchChange} />

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onImport}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-bold border border-slate-800 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
          title="Import profiles from a JSON backup file"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
            />
          </svg>
          Import
        </button>

        <button
          onClick={onExportAll}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white font-bold border border-slate-800 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm"
          title="Export all profiles to a JSON backup file"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export
        </button>

        {showCreateButton && (
          <button
            onClick={onNewProfile}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Profile
          </button>
        )}
      </div>
    </div>
  );
};
