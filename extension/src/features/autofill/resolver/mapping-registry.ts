import { PORT_MAPPINGS } from './port-mapping';

export interface FieldSchema {
  label: string;
  aliases: string[];
  type: 'select' | 'text' | 'radio' | 'date';
  validation?: (val: string) => boolean;
  resolver?: (val: string, options: HTMLOptionElement[]) => string | null;
}

export const MAPPING_REGISTRY: Record<string, FieldSchema> = {
  religion: {
    label: 'Religion',
    aliases: ['religion', 'faith'],
    type: 'select',
    resolver: (val, options) => {
      const norm = val.toUpperCase().trim();
      const match = options.find(
        (o) =>
          o.value.toUpperCase().trim() === norm ||
          o.text.toUpperCase().trim() === norm
      );
      return match ? match.value : null;
    },
  },
  education: {
    label: 'Education',
    aliases: ['education', 'qualification'],
    type: 'select',
    resolver: (val, options) => {
      const norm = val.toUpperCase().trim();
      const match = options.find(
        (o) =>
          o.value.toUpperCase().trim() === norm ||
          o.text.toUpperCase().trim() === norm
      );
      return match ? match.value : null;
    },
  },
  nationality: {
    label: 'Nationality',
    aliases: ['nationality', 'citizenship'],
    type: 'select',
    resolver: (val, options) => {
      const norm = val.toLowerCase().trim();
      if (norm === 'bangladesh' || norm === 'bgd' || norm === 'bangladeshi') {
        const found = options.find((o) => o.value === 'BGD' || o.text.includes('BANGLADESH'));
        if (found) return found.value;
      }
      const match = options.find(
        (o) =>
          o.value.toLowerCase() === norm ||
          o.text.toLowerCase().includes(norm)
      );
      return match ? match.value : null;
    },
  },
  maritalStatus: {
    label: 'Marital Status',
    aliases: ['maritalstatus', 'marital_status'],
    type: 'select',
    resolver: (val, options) => {
      const norm = val.toUpperCase().trim();
      const match = options.find(
        (o) =>
          o.value.toUpperCase().trim() === norm ||
          o.text.toUpperCase().trim() === norm
      );
      return match ? match.value : null;
    },
  },
  occupation: {
    label: 'Occupation',
    aliases: ['occupation', 'profession'],
    type: 'select',
    resolver: (val, options) => {
      const norm = val.toUpperCase().trim();
      const match = options.find(
        (o) =>
          o.value.toUpperCase().trim() === norm ||
          o.text.toUpperCase().trim() === norm
      );
      return match ? match.value : null;
    },
  },
  arrivalPort: {
    label: 'Arrival Port',
    aliases: ['arrivalport', 'portofentry', 'entry_port'],
    type: 'select',
    resolver: (val, options) => {
      const norm = val.toLowerCase().trim();
      const mappedPort = PORT_MAPPINGS[norm] || val;
      const target = mappedPort.toLowerCase().trim();
      const match = options.find(
        (o) =>
          o.value.toLowerCase().trim() === target ||
          o.text.toLowerCase().trim().includes(target)
      );
      return match ? match.value : null;
    },
  },
  exitPort: {
    label: 'Exit Port',
    aliases: ['exitport', 'portofexit', 'exit_port'],
    type: 'select',
    resolver: (val, options) => {
      const norm = val.toLowerCase().trim();
      const mappedPort = PORT_MAPPINGS[norm] || val;
      const target = mappedPort.toLowerCase().trim();
      const match = options.find(
        (o) =>
          o.value.toLowerCase().trim() === target ||
          o.text.toLowerCase().trim().includes(target)
      );
      return match ? match.value : null;
    },
  },
  visaType: {
    label: 'Visa Type',
    aliases: ['visatype', 'type_of_visa', 'visa_type', 'previous_visa_type', 'prev_visa_type'],
    type: 'select',
    resolver: (val, options) => {
      const norm = val.toUpperCase().trim();
      const match = options.find(
        (o) =>
          o.value.toUpperCase().trim() === norm ||
          o.text.toUpperCase().trim() === norm
      );
      if (match) return match.value;

      const subMatch = options.find(
        (o) =>
          o.text.toUpperCase().trim().includes(norm) ||
          norm.includes(o.text.toUpperCase().trim())
      );
      return subMatch ? subMatch.value : null;
    },
  },
};
