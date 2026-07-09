import React from 'react';
import { VisaProfile } from '../types/profile';
import { ProfileCard } from './ProfileCard';

interface ProfileListProps {
  profiles: VisaProfile[];
  onEdit: (profile: VisaProfile) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onSetActive: (id: string) => void;
  onExport: (profile: VisaProfile) => void;
  onToggleFavorite: (id: string) => void;
}

export const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  onEdit,
  onDelete,
  onDuplicate,
  onSetActive,
  onExport,
  onToggleFavorite,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onSetActive={onSetActive}
          onExport={onExport}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};
