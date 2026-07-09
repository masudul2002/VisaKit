export const Normalizer = {
  normalize: (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[\s\-_]+/g, '')
      .replace(/[^a-z0-9]/g, '');
  },

  normalizeLabel: (label: string): string => {
    return label.toLowerCase().trim().replace(/\s+/g, ' ');
  },
};
