import { ScannedElement } from '../engine/DOMScanner';
import { ProfileKey } from '../mapping/FieldRegistry';
import { VisaProfile } from '../../profile/types/profile';

export const Resolver = {
  resolve: (
    el: ScannedElement,
    key: ProfileKey,
    profile: VisaProfile
  ): string | boolean | null => {
    const value = profile[key];
    if (value === undefined || value === null) return null;

    const tagName = el.tagName;

    if (tagName === 'SELECT') {
      const selectEl = el as HTMLSelectElement;
      const normVal = String(value).toLowerCase().trim();

      for (let i = 0; i < selectEl.options.length; i++) {
        const opt = selectEl.options[i];
        if (
          opt.value.toLowerCase().trim() === normVal ||
          opt.text.toLowerCase().trim() === normVal
        ) {
          return opt.value;
        }
      }
      return selectEl.options[0]?.value || null;
    }

    if (tagName === 'INPUT') {
      const inputEl = el as HTMLInputElement;

      if (inputEl.type === 'radio') {
        const radioVal = inputEl.value.toLowerCase().trim();
        const profileVal = String(value).toLowerCase().trim();
        return radioVal === profileVal || profileVal.startsWith(radioVal);
      }

      if (inputEl.type === 'checkbox') {
        return Boolean(value);
      }

      const placeholder = inputEl.getAttribute('placeholder') || '';
      const valStr = String(value);

      if (
        valStr.includes('-') &&
        (placeholder.includes('DD/MM/YYYY') || placeholder.includes('dd/mm/yyyy'))
      ) {
        const parts = valStr.split('-');
        if (parts.length === 3) {
          return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
      }
    }

    return String(value);
  },
};
