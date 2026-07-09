import { VisaProfile } from '../types/profile';
import { storageService } from './storage.service';
import { encryptionService } from './encryption';

const STORAGE_KEY = 'visakit_profiles';
const VERIFY_KEY = 'visakit_passcode_verify';

let sessionPasscode: string | null = null;

export const profileService = {
  setSessionPasscode: (passcode: string | null) => {
    sessionPasscode = passcode;
  },

  getSessionPasscode: () => {
    return sessionPasscode;
  },

  isEncrypted: async (): Promise<boolean> => {
    const verify = await storageService.get<string>(VERIFY_KEY);
    return !!verify;
  },

  unlock: async (passcode: string): Promise<boolean> => {
    const verify = await storageService.get<string>(VERIFY_KEY);
    if (!verify) {
      sessionPasscode = passcode;
      return true;
    }
    try {
      const decrypted = await encryptionService.decrypt(verify, passcode);
      if (decrypted === 'visakit-token') {
        sessionPasscode = passcode;
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },

  setupEncryption: async (passcode: string): Promise<void> => {
    const currentProfiles = await profileService.getAllProfiles();
    const tokenHex = await encryptionService.encrypt('visakit-token', passcode);
    await storageService.set(VERIFY_KEY, tokenHex);
    sessionPasscode = passcode;
    await profileService.saveProfiles(currentProfiles);
  },

  removeEncryption: async (): Promise<void> => {
    const currentProfiles = await profileService.getAllProfiles();
    await storageService.remove(VERIFY_KEY);
    sessionPasscode = null;
    await profileService.saveProfiles(currentProfiles);
  },

  getAllProfiles: async (): Promise<VisaProfile[]> => {
    const raw = await storageService.get<string | VisaProfile[]>(STORAGE_KEY);
    if (!raw) return [];

    const isEnc = await profileService.isEncrypted();
    if (isEnc) {
      if (!sessionPasscode) {
        return [];
      }
      try {
        const decryptedStr = await encryptionService.decrypt(raw, sessionPasscode);
        return JSON.parse(decryptedStr) as VisaProfile[];
      } catch (err) {
        console.error('Decryption failed during profile loading:', err);
        return [];
      }
    }

    return (typeof raw === 'string' ? JSON.parse(raw) : raw) as VisaProfile[];
  },

  saveProfiles: async (profiles: VisaProfile[]): Promise<void> => {
    const isEnc = await profileService.isEncrypted();
    if (isEnc && sessionPasscode) {
      const encryptedStr = await encryptionService.encrypt(
        JSON.stringify(profiles),
        sessionPasscode
      );
      await storageService.set(STORAGE_KEY, encryptedStr);
      return;
    }
    await storageService.set(STORAGE_KEY, profiles);
  },

  createProfile: async (
    profileData: Omit<VisaProfile, 'id' | 'isDefault'>
  ): Promise<VisaProfile> => {
    const profiles = await profileService.getAllProfiles();
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
