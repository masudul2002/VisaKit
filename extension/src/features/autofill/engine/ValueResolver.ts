import { VisaProfile } from '../../profile/types/profile';
import { ProfileKey } from '../mapping/FieldRegistry';
import { ScannedElement } from './DOMScanner';
import { Resolver } from '../resolver/Resolver';

export const ValueResolver = {
  resolveValue: (
    el: ScannedElement,
    key: ProfileKey,
    profile: VisaProfile
  ): string | boolean | null => {
    return Resolver.resolve(el, key, profile);
  },
};
