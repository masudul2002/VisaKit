import { ProfileKey } from '../mapping/FieldRegistry';
import { LabelMatcher } from './LabelMatcher';

export const PlaceholderMatcher = {
  match: (placeholder: string | null): ProfileKey | null => {
    return LabelMatcher.match(placeholder);
  },
};
