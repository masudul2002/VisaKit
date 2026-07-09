import React from 'react';
import { VisaProfile } from '../types/profile';

interface ProfileCardProps {
  profile: VisaProfile;
  onEdit: (profile: VisaProfile) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onSetActive: (id: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onEdit,
  onDelete,
  onDuplicate,
  onSetActive,
}) => {
  return (
    <div
      className={`p-6 bg-slate-900/30 border rounded-[16px] backdrop-blur-md flex flex-col justify-between gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
        profile.isDefault
          ? 'border-blue-500/40 bg-blue-500/[0.02]'
          : 'border-slate-900 bg-slate-900/10'
      }`}
    >
      {/* Upper header */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-white">
              {profile.surname}, {profile.givenName}
            </h3>
            {profile.isDefault && (
              <span className="px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 rounded-full">
                Active
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
            {profile.nationality}
          </span>
        </div>

        {/* Toggle default active */}
        {!profile.isDefault && (
          <button
            onClick={() => onSetActive(profile.id)}
            className="text-[10px] font-bold text-slate-400 hover:text-blue-400 border border-slate-800 hover:border-blue-500/20 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
            aria-label={`Set ${profile.givenName} as active profile`}
          >
            Use Profile
          </button>
        )}
      </div>

      {/* Profile summary details */}
      <div className="grid grid-cols-2 gap-3 text-xs border-y border-slate-900 py-3 text-slate-400">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Passport
          </span>
          <span className="font-semibold text-slate-200 mt-0.5">{profile.passportNumber}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Occupation
          </span>
          <span className="font-semibold text-slate-200 mt-0.5">{profile.occupation}</span>
        </div>
        <div className="flex flex-col col-span-2">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Email
          </span>
          <span className="font-semibold text-slate-200 mt-0.5 truncate">{profile.email}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 shrink-0">
        <button
          onClick={() => onEdit(profile)}
          className="text-xs font-bold text-slate-400 hover:text-white px-2 py-1 rounded-lg transition-colors cursor-pointer"
          aria-label={`Edit ${profile.givenName}`}
        >
          Edit
        </button>
        <button
          onClick={() => onDuplicate(profile.id)}
          className="text-xs font-bold text-slate-400 hover:text-white px-2 py-1 rounded-lg transition-colors cursor-pointer"
          aria-label={`Duplicate ${profile.givenName}`}
        >
          Duplicate
        </button>
        <button
          onClick={() => onDelete(profile.id)}
          className="text-xs font-bold text-red-500 hover:text-red-400 px-2 py-1 rounded-lg transition-colors cursor-pointer"
          aria-label={`Delete ${profile.givenName}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
