import { useState, useEffect, useCallback, useMemo } from 'react';
import { VisaProfile } from '../types/profile';
import { profileService } from '../services/profile.service';

export const useProfiles = () => {
  const [profiles, setProfiles] = useState<VisaProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfiles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await profileService.getAllProfiles();
      setProfiles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load profiles');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  const addProfile = async (profileData: Omit<VisaProfile, 'id' | 'isDefault'>) => {
    setError(null);
    try {
      const newProfile = await profileService.createProfile(profileData);
      setProfiles((prev) => [...prev, newProfile]);
      return newProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create profile');
      throw err;
    }
  };

  const updateProfile = async (id: string, updates: Partial<VisaProfile>) => {
    setError(null);
    try {
      const updated = await profileService.updateProfile(id, updates);
      setProfiles((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      throw err;
    }
  };

  const deleteProfile = async (id: string) => {
    setError(null);
    try {
      await profileService.deleteProfile(id);
      await loadProfiles();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete profile');
      throw err;
    }
  };

  const duplicateProfile = async (id: string) => {
    setError(null);
    try {
      const copied = await profileService.duplicateProfile(id);
      setProfiles((prev) => [...prev, copied]);
      return copied;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to duplicate profile');
      throw err;
    }
  };

  const setActiveProfile = async (id: string) => {
    setError(null);
    try {
      await profileService.setActiveProfile(id);
      setProfiles((prev) =>
        prev.map((p) => ({
          ...p,
          isDefault: p.id === id,
        }))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set active profile');
      throw err;
    }
  };

  const filteredProfiles = useMemo(() => {
    if (!searchQuery.trim()) return profiles;
    const query = searchQuery.toLowerCase().trim();
    return profiles.filter(
      (p) =>
        p.surname.toLowerCase().includes(query) ||
        p.givenName.toLowerCase().includes(query) ||
        p.passportNumber.toLowerCase().includes(query) ||
        p.email.toLowerCase().includes(query)
    );
  }, [profiles, searchQuery]);

  return {
    profiles,
    filteredProfiles,
    searchQuery,
    setSearchQuery,
    isLoading,
    error,
    addProfile,
    updateProfile,
    deleteProfile,
    duplicateProfile,
    setActiveProfile,
    reloadProfiles: loadProfiles,
  };
};
