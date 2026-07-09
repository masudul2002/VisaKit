import { ProfileKey } from '../mapping/FieldRegistry';
import { ScannedElement } from './DOMScanner';
import { AttributeMatcher } from '../matcher/AttributeMatcher';
import { LabelMatcher } from '../matcher/LabelMatcher';
import { PlaceholderMatcher } from '../matcher/PlaceholderMatcher';

export const FieldMapper = {
  mapField: (el: ScannedElement): ProfileKey | null => {
    const nameAttr = el.getAttribute('name');
    let match = AttributeMatcher.match(nameAttr);
    if (match) return match;

    const idAttr = el.getAttribute('id');
    match = AttributeMatcher.match(idAttr);
    if (match) return match;

    const autocompleteAttr = el.getAttribute('autocomplete');
    match = AttributeMatcher.match(autocompleteAttr);
    if (match) return match;

    const labelText = FieldMapper.getLabelText(el);
    match = LabelMatcher.match(labelText);
    if (match) return match;

    const placeholderAttr = el.getAttribute('placeholder');
    match = PlaceholderMatcher.match(placeholderAttr);
    if (match) return match;

    const ariaLabel = el.getAttribute('aria-label');
    match = LabelMatcher.match(ariaLabel);
    if (match) return match;

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
