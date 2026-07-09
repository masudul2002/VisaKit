import { storageService } from '../../profile/services/storage.service';

export interface StorageUtilization {
  bytesUsed: number;
  capacityLimitBytes: number;
  profileCount: number;
  footprintPercentage: number;
}

export const inspectorService = {
  getStorageUtilization: async (): Promise<StorageUtilization> => {
    const capacityLimitBytes = 5 * 1024 * 1024; // 5 MB
    let bytesUsed = 0;

    if (
      typeof chrome !== 'undefined' &&
      chrome.storage &&
      chrome.storage.local &&
      chrome.storage.local.getBytesInUse
    ) {
      bytesUsed = await new Promise<number>((resolve) => {
        chrome.storage.local.getBytesInUse(null, (bytes) => resolve(bytes || 0));
      });
    } else {
      const rawProfiles = await storageService.get<unknown>('visakit_profiles');
      bytesUsed = rawProfiles ? JSON.stringify(rawProfiles).length : 0;
    }

    const profiles = (await storageService.get<unknown[]>('visakit_profiles')) || [];
    const profileCount = profiles.length;

    return {
      bytesUsed,
      capacityLimitBytes,
      profileCount,
      footprintPercentage: Math.min(100, Math.round((bytesUsed / capacityLimitBytes) * 100)),
    };
  },
};
