import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  onCreateProfile: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onCreateProfile }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-[16px] bg-white dark:bg-slate-900/50 shadow-sm">
      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3.5">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.8}
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">No Profile Found</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4 leading-normal">
        Create your first Visa Profile.
      </p>
      <Button
        onClick={onCreateProfile}
        variant="primary"
        size="sm"
        aria-label="Create new visa profile"
      >
        Create Profile
      </Button>
    </div>
  );
};
