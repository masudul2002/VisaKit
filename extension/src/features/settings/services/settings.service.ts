import { UserSettings } from '../types/settings';
import { DEFAULT_SETTINGS } from '../constants/defaults';
import { storageService } from '../../profile/services/storage.service';

const STORAGE_KEY = 'visakit_settings';

export const settingsService = {
  getSettings: async (): Promise<UserSettings> => {
    try {
      const stored = await storageService.get<UserSettings>(STORAGE_KEY);
      if (!stored) return DEFAULT_SETTINGS;

      return {
        general: { ...DEFAULT_SETTINGS.general, ...stored.general },
        appearance: { ...DEFAULT_SETTINGS.appearance, ...stored.appearance },
        autofill: { ...DEFAULT_SETTINGS.autofill, ...stored.autofill },
        advanced: { ...DEFAULT_SETTINGS.advanced, ...stored.advanced },
      };
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings: async (settings: UserSettings): Promise<void> => {
    await storageService.set(STORAGE_KEY, settings);
  },

  updateSettings: async (updates: Partial<UserSettings>): Promise<UserSettings> => {
    const current = await settingsService.getSettings();
    const updated: UserSettings = {
      general: { ...current.general, ...updates.general },
      appearance: { ...current.appearance, ...updates.appearance },
      autofill: { ...current.autofill, ...updates.autofill },
      advanced: { ...current.advanced, ...updates.advanced },
    };
    await settingsService.saveSettings(updated);
    return updated;
  },

  resetSettings: async (): Promise<UserSettings> => {
    await settingsService.saveSettings(DEFAULT_SETTINGS);
    return DEFAULT_SETTINGS;
  },
};
