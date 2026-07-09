import { ProfileKey, FIELD_REGISTRY } from '../mapping/FieldRegistry';
import { Normalizer } from '../mapping/Normalizer';

export const AttributeMatcher = {
  match: (attrValue: string | null): ProfileKey | null => {
    if (!attrValue) return null;
    const norm = Normalizer.normalize(attrValue);

    for (const [key, aliases] of Object.entries(FIELD_REGISTRY)) {
      if (
        aliases.some(
          (alias) =>
            Normalizer.normalize(alias) === norm || norm.includes(Normalizer.normalize(alias))
        )
      ) {
        return key as ProfileKey;
      }
    }
    return null;
  },
};
