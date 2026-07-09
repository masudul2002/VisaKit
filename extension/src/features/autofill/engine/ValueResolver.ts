import { VisaProfile } from '../../profile/types/profile';
import { ProfileKey } from '../mappers/indianVisaMap';
import { ScannedElement } from './DOMScanner';

export const ValueResolver = {
  resolveValue: (
    el: ScannedElement,
    key: ProfileKey,
    profile: VisaProfile
  ): string | boolean | null => {
    const rawVal = profile[key];
    if (rawVal === undefined || rawVal === null) return null;

    const valStr = String(rawVal);

    if (el.tagName === 'SELECT') {
      const selectEl = el as HTMLSelectElement;
      return ValueResolver.matchSelectOption(selectEl, valStr);
    }

    if (el.tagName === 'INPUT' && (el as HTMLInputElement).type === 'radio') {
      const inputEl = el as HTMLInputElement;
      const radioValue = (inputEl.value || '').toLowerCase();
      const targetValue = valStr.toLowerCase();
      return radioValue === targetValue || (targetValue.length > 0 && radioValue.startsWith(targetValue[0]));
    }

    if (el.tagName === 'INPUT' && (el as HTMLInputElement).type === 'date') {
      return valStr;
    }

    if (el.tagName === 'INPUT' && (el as HTMLInputElement).type === 'text') {
      const placeholder = el.getAttribute('placeholder') || '';
      const isDateKey = ['dob', 'issueDate', 'expiryDate'].includes(key);
      if (isDateKey) {
        return ValueResolver.formatDate(valStr, placeholder);
      }
    }

    return valStr;
  },

  matchSelectOption: (select: HTMLSelectElement, targetVal: string): string | null => {
    const target = targetVal.toLowerCase().trim();
    const options = Array.from(select.options);

    for (const opt of options) {
      if (opt.value.toLowerCase().trim() === target) {
        return opt.value;
      }
    }

    for (const opt of options) {
      if (opt.text.toLowerCase().trim() === target) {
        return opt.value;
      }
    }

    for (const opt of options) {
      const optText = opt.text.toLowerCase().trim();
      if (optText.includes(target) || target.includes(optText)) {
        return opt.value;
      }
    }

    return null;
  },

  formatDate: (val: string, placeholder?: string): string => {
    if (!val) return '';
    const parts = val.split('-');
    if (parts.length !== 3) return val;
    const [year, month, day] = parts;

    const placeholderLower = (placeholder || '').toLowerCase();
    if (placeholderLower.includes('dd/mm') || placeholderLower.includes('dd-mm') || placeholderLower.includes('dd/')) {
      const separator = placeholderLower.includes('/') ? '/' : '-';
      return `${day}${separator}${month}${separator}${year}`;
    }

    return val;
  },
};
