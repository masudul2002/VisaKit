import React from 'react';
import { SearchBox } from './SearchBox';

interface ProfileToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewProfile: () => void;
  showCreateButton: boolean;
}

export const ProfileToolbar: React.FC<ProfileToolbarProps> = ({
  searchQuery,
  onSearchChange,
  onNewProfile,
  showCreateButton,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6 select-none shrink-0">
      <SearchBox value={searchQuery} onChange={onSearchChange} />

      {showCreateButton && (
        <button
          onClick={onNewProfile}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Profile
        </button>
      )}
    </div>
  );
};
