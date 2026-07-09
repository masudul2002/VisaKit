import { indianVisaFieldMap, ProfileKey } from '../mappers/indianVisaMap';
import { ScannedElement } from './DOMScanner';

export const FieldMapper = {
  mapField: (el: ScannedElement): ProfileKey | null => {
    const nameAttr = el.getAttribute('name');
    if (nameAttr) {
      const match = FieldMapper.findMatch(nameAttr);
      if (match) return match;
    }

    const idAttr = el.getAttribute('id');
    if (idAttr) {
      const match = FieldMapper.findMatch(idAttr);
      if (match) return match;
    }

    const autocompleteAttr = el.getAttribute('autocomplete');
    if (autocompleteAttr) {
      const match = FieldMapper.findMatch(autocompleteAttr);
      if (match) return match;
    }

    const labelText = FieldMapper.getLabelText(el);
    if (labelText) {
      const match = FieldMapper.findMatch(labelText);
      if (match) return match;
    }

    const placeholderAttr = el.getAttribute('placeholder');
    if (placeholderAttr) {
      const match = FieldMapper.findMatch(placeholderAttr);
      if (match) return match;
    }

    return null;
  },

  findMatch: (str: string): ProfileKey | null => {
    const cleanStr = str.toLowerCase().replace(/[^a-z0-9_]/g, '');

    if (indianVisaFieldMap[cleanStr]) {
      return indianVisaFieldMap[cleanStr];
    }

    for (const key of Object.keys(indianVisaFieldMap)) {
      if (cleanStr.includes(key) || key.includes(cleanStr)) {
        return indianVisaFieldMap[key];
      }
    }

    return null;
  },

  getLabelText: (el: ScannedElement): string | null => {
    if ('labels' in el && el.labels && el.labels.length > 0) {
      return el.labels[0].textContent;
    }

    const id = el.getAttribute('id');
    if (id) {
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) return label.textContent;
    }

    const parent = el.closest('label');
    if (parent) return parent.textContent;

    return null;
  },
};
