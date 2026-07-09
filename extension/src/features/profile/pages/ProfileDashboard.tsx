import React, { useState, useRef } from 'react';
import { useProfiles } from '../hooks/useProfiles';
import { VisaProfile } from '../types/profile';
import {
  ProfileHeader,
  ProfileToolbar,
  ProfileList,
  ProfileForm,
  DeleteDialog,
  EmptyState,
  ConflictDialog,
} from '../components';
import { exportService } from '../services/export.service';
import { importService } from '../services/import.service';
import { backupService } from '../services/backup.service';

export const ProfileDashboard: React.FC = () => {
  const {
    profiles,
    filteredProfiles,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    showFavoritesOnly,
    setShowFavoritesOnly,
    tagFilter,
    setTagFilter,
    isLoading,
    error,
    addProfile,
    updateProfile,
    toggleFavorite,
    deleteProfile,
    duplicateProfile,
    setActiveProfile,
    reloadProfiles,
  } = useProfiles();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingProfile, setEditingProfile] = useState<VisaProfile | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingName, setDeletingName] = useState<string>('');

  const [conflictOpen, setConflictOpen] = useState<boolean>(false);
  const [conflictCount, setConflictCount] = useState<number>(0);
  const [pendingProfiles, setPendingProfiles] = useState<VisaProfile[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleNewProfileClick = () => {
    setEditingProfile(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (profile: VisaProfile) => {
    setEditingProfile(profile);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const profile = filteredProfiles.find((p) => p.id === id);
    if (profile) {
      setDeletingId(id);
      setDeletingName(`${profile.surname}, ${profile.givenName}`);
      setIsDeleteOpen(true);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingId) {
      await deleteProfile(deletingId);
      setIsDeleteOpen(false);
      setDeletingId(null);
    }
  };

  const handleFormSubmit = async (formData: Omit<VisaProfile, 'id' | 'isDefault'>) => {
    if (editingProfile) {
      await updateProfile(editingProfile.id, formData);
    } else {
      await addProfile(formData);
    }
    setIsFormOpen(false);
    setEditingProfile(null);
  };

  const handleExportAll = () => {
    exportService.exportProfiles(profiles);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const validated = importService.parseAndValidate(text);

        const { duplicates } = importService.findConflicts(profiles, validated);

        if (duplicates.length > 0) {
          setPendingProfiles(validated);
          setConflictCount(duplicates.length);
          setConflictOpen(true);
        } else {
          await backupService.mergeBackup(validated);
          await reloadProfiles();
          alert('Profiles imported successfully!');
        }
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Import failed.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleMergeConfirm = async () => {
    await backupService.mergeBackup(pendingProfiles);
    setConflictOpen(false);
    await reloadProfiles();
    alert('Unique profiles imported successfully!');
  };

  const handleReplaceConfirm = async () => {
    if (
      confirm(
        'Are you absolutely sure? This will delete all your local profiles and replace them with the backup file data.'
      )
    ) {
      await backupService.replaceBackup(pendingProfiles);
      setConflictOpen(false);
      await reloadProfiles();
      alert('Profiles replaced successfully!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col min-h-screen">
      <ProfileHeader />

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center py-20 text-slate-400">
          <span className="flex items-center gap-2 font-bold text-sm">
            <svg className="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading profiles...
          </span>
        </div>
      ) : error ? (
        <div className="flex-1 p-6 bg-red-500/10 border border-red-500/20 rounded-[16px] text-red-400 text-sm font-semibold max-w-lg mx-auto mt-10">
          Error loading profiles: {error}
        </div>
      ) : isFormOpen ? (
        <div className="flex flex-col gap-6">
          <h2 className="text-lg font-bold text-white leading-none select-none">
            {editingProfile ? 'Edit Visa Profile' : 'Create Visa Profile'}
          </h2>
          <ProfileForm
            profile={editingProfile}
            onSubmit={handleFormSubmit}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <ProfileToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            showFavoritesOnly={showFavoritesOnly}
            onFavoritesToggle={() => setShowFavoritesOnly(!showFavoritesOnly)}
            tagFilter={tagFilter}
            onTagChange={setTagFilter}
            onNewProfile={handleNewProfileClick}
            showCreateButton={filteredProfiles.length > 0 || searchQuery !== ''}
            onExportAll={handleExportAll}
            onImport={handleImportClick}
          />

          {filteredProfiles.length === 0 ? (
            <EmptyState onNewProfile={handleNewProfileClick} isSearch={searchQuery !== ''} />
          ) : (
            <ProfileList
              profiles={filteredProfiles}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onDuplicate={duplicateProfile}
              onSetActive={setActiveProfile}
              onExport={exportService.exportSingleProfile}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json"
        className="hidden"
      />

      <DeleteDialog
        isOpen={isDeleteOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setIsDeleteOpen(false)}
        profileName={deletingName}
      />

      <ConflictDialog
        isOpen={conflictOpen}
        duplicateCount={conflictCount}
        onMerge={handleMergeConfirm}
        onReplace={handleReplaceConfirm}
        onCancel={() => setConflictOpen(false)}
      />
    </div>
  );
};
