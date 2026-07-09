import { VisaProfile } from '../types/profile';
import { profileService } from './profile.service';
import { importService } from './import.service';

export const backupService = {
  mergeBackup: async (importedProfiles: VisaProfile[]): Promise<void> => {
    const existing = await profileService.getAllProfiles();
    const { unique } = importService.findConflicts(existing, importedProfiles);

    const merged = [...existing, ...unique];

    const hasDefault = merged.some((p) => p.isDefault);
    if (!hasDefault && merged.length > 0) {
      merged[0].isDefault = true;
    }

    await profileService.saveProfiles(merged);
  },

  replaceBackup: async (importedProfiles: VisaProfile[]): Promise<void> => {
    const records = [...importedProfiles];

    const hasDefault = records.some((p) => p.isDefault);
    if (!hasDefault && records.length > 0) {
      records[0].isDefault = true;
    }

    await profileService.saveProfiles(records);
  },
};
