/**
 * Profile service for managing visa applicant profiles.
 * Stores data locally in Chrome Extension storage.
 */
import { VisaProfile } from '../types/profile';
import { storageService } from './storage.service';

const STORAGE_KEY = 'visakit_profiles';

export const profileService = {
  getAllProfiles: async (): Promise<VisaProfile[]> => {
    const profiles = await storageService.get<VisaProfile[]>(STORAGE_KEY);
    return profiles || [];
  },

  saveProfiles: async (profiles: VisaProfile[]): Promise<void> => {
    await storageService.set(STORAGE_KEY, profiles);
  },

  createProfile: async (
    profileData: Omit<VisaProfile, 'id' | 'isDefault'>
  ): Promise<VisaProfile> => {
    const profiles = await profileService.getAllProfiles();
    
    // If it's the first profile, set it as default active profile
    const isDefault = profiles.length === 0;
    
    const newProfile: VisaProfile = {
      ...profileData,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      isDefault,
    };

    const updatedProfiles = [...profiles, newProfile];
    await profileService.saveProfiles(updatedProfiles);
    return newProfile;
  },

  updateProfile: async (id: string, updates: Partial<VisaProfile>): Promise<VisaProfile> => {
    const profiles = await profileService.getAllProfiles();
    let updatedProfile: VisaProfile | null = null;

    const updatedProfiles = profiles.map((p) => {
      if (p.id === id) {
        updatedProfile = { ...p, ...updates };
        return updatedProfile;
      }
      return p;
    });

    if (!updatedProfile) {
      throw new Error(`Profile with ID ${id} not found.`);
    }

    await profileService.saveProfiles(updatedProfiles);
    return updatedProfile;
  },

  deleteProfile: async (id: string): Promise<void> => {
    const profiles = await profileService.getAllProfiles();
    const target = profiles.find((p) => p.id === id);
    
    const updatedProfiles = profiles.filter((p) => p.id !== id);

    // If we deleted the default profile, set a new default from remaining if they exist
    if (target?.isDefault && updatedProfiles.length > 0) {
      updatedProfiles[0].isDefault = true;
    }

    await profileService.saveProfiles(updatedProfiles);
  },

  duplicateProfile: async (id: string): Promise<VisaProfile> => {
    const profiles = await profileService.getAllProfiles();
    const source = profiles.find((p) => p.id === id);

    if (!source) {
      throw new Error(`Profile with ID ${id} not found.`);
    }

    const duplicated: VisaProfile = {
      ...source,
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      surname: `${source.surname} (Copy)`,
      isDefault: false,
    };

    const updatedProfiles = [...profiles, duplicated];
    await profileService.saveProfiles(updatedProfiles);
    return duplicated;
  },

  setActiveProfile: async (id: string): Promise<void> => {
    const profiles = await profileService.getAllProfiles();
    const updatedProfiles = profiles.map((p) => ({
      ...p,
      isDefault: p.id === id,
    }));
    await profileService.saveProfiles(updatedProfiles);
  },
};
