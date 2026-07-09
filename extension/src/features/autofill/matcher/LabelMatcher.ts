import { ProfileKey, FIELD_REGISTRY } from '../mapping/FieldRegistry';
import { Normalizer } from '../mapping/Normalizer';

export const LabelMatcher = {
  match: (labelContent: string | null): ProfileKey | null => {
    if (!labelContent) return null;
    const norm = Normalizer.normalize(labelContent);

    for (const [key, aliases] of Object.entries(FIELD_REGISTRY)) {
      for (const alias of aliases) {
        const normAlias = Normalizer.normalize(alias);
        if (norm === normAlias || norm.includes(normAlias)) {
          return key as ProfileKey;
        }
      }
    }
    return null;
  },
};
