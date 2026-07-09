import { VisaProfile } from '../types/profile';
import { validateProfile } from '../validators/profile.validator';

export const importService = {
  parseAndValidate: (jsonString: string): VisaProfile[] => {
    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(jsonString) as Record<string, unknown>;
    } catch {
      throw new Error('Invalid JSON format. Please upload a valid JSON file.');
    }

    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Import failed: invalid backup file structure.');
    }

    if (parsed['type'] !== 'visakit_profiles') {
      throw new Error("Import failed: File type signature is not 'visakit_profiles'.");
    }

    const data = parsed['data'];
    if (!Array.isArray(data)) {
      throw new Error('Import failed: Backup profile records list is missing.');
    }

    const validated: VisaProfile[] = [];

    for (const item of data) {
      const profile = item as VisaProfile;
      const errors = validateProfile(profile);

      if (
        errors.email ||
        errors.passportNumber ||
        errors.phone ||
        !profile.givenName ||
        !profile.surname
      ) {
        throw new Error(
          `Validation failed for profile (${profile.givenName || 'Unknown'} ${
            profile.surname || ''
          }): ` + Object.values(errors).join(', ')
        );
      }
      validated.push({
        ...profile,
        id: profile.id || crypto.randomUUID(),
        isDefault: Boolean(profile.isDefault),
      });
    }

    return validated;
  },

  findConflicts: (
    existing: VisaProfile[],
    imported: VisaProfile[]
  ): { duplicates: VisaProfile[]; unique: VisaProfile[] } => {
    const duplicates: VisaProfile[] = [];
    const unique: VisaProfile[] = [];

    const existingPassports = new Set(existing.map((p) => p.passportNumber.toUpperCase()));
    const existingEmails = new Set(existing.map((p) => p.email.toLowerCase()));

    for (const p of imported) {
      if (
        existingPassports.has(p.passportNumber.toUpperCase()) ||
        existingEmails.has(p.email.toLowerCase())
      ) {
        duplicates.push(p);
      } else {
        unique.push(p);
      }
    }

    return { duplicates, unique };
  },
};
