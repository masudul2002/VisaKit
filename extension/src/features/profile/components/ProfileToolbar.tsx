import React from 'react';
import { SearchBox } from './SearchBox';

interface ProfileToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  showFavoritesOnly: boolean;
  onFavoritesToggle: () => void;
  tagFilter: string;
  onTagChange: (value: string) => void;
  onNewProfile: () => void;
  showCreateButton: boolean;
  onExportAll: () => void;
  onImport: () => void;
}

export const ProfileToolbar: React.FC<ProfileToolbarProps> = ({
  searchQuery,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  showFavoritesOnly,
  onFavoritesToggle,
  tagFilter,
  onTagChange,
  onNewProfile,
  showCreateButton,
  onExportAll,
  onImport,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6 select-none shrink-0">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
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

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="bg-slate-900 border border-slate-850 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-300 outline-none cursor-pointer"
        >
          <option value="All">All Categories</option>
          <option value="Tourist">Tourist</option>
          <option value="Business">Business</option>
          <option value="Medical">Medical</option>
          <option value="Employment">Employment</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Filter by tag..."
          value={tagFilter}
          onChange={(e) => onTagChange(e.target.value)}
          className="bg-slate-900 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-300 placeholder-slate-600 outline-none w-32 focus:border-blue-500/50"
        />

        <button
          onClick={onFavoritesToggle}
          className={`px-3 py-1.5 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
            showFavoritesOnly
              ? 'bg-amber-600/10 border-amber-500/30 text-amber-400'
              : 'bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          ★ Favorites Only
        </button>
      </div>
    </div>
  );
};
