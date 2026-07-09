import { FieldMapper } from './FieldMapper';
import { ScannedElement } from './DOMScanner';
import { ProfileKey } from '../mapping/FieldRegistry';

export const runFieldMapperTests = () => {
  const testCases: Array<{
    attributes: Record<string, string>;
    labelText?: string;
    expectedKey: ProfileKey | null;
  }> = [
    {
      attributes: { name: 'first_name' },
      expectedKey: 'givenName',
    },
    {
      attributes: { id: 'passport-no' },
      expectedKey: 'passportNumber',
    },
    {
      attributes: { autocomplete: 'email' },
      expectedKey: 'email',
    },
    {
      attributes: { placeholder: 'Enter Surname' },
      expectedKey: 'surname',
    },
    {
      attributes: {},
      labelText: 'Birth Date',
      expectedKey: 'dob',
    },
    {
      attributes: { 'aria-label': 'Mobile Number' },
      expectedKey: 'phone',
    },
  ];

  console.log('--- Starting Field Mapping Engine Unit Tests ---');
  let passed = 0;

  testCases.forEach((tc, idx) => {
    const mockEl = {
      tagName: 'INPUT',
      getAttribute: (name: string) => tc.attributes[name] || null,
      labels: tc.labelText ? [{ textContent: tc.labelText }] : null,
      closest: () => null,
    } as unknown as ScannedElement;

    const key = FieldMapper.mapField(mockEl);
    if (key === tc.expectedKey) {
      console.log(`Test Case ${idx + 1} PASSED: mapped correctly to ${key}`);
      passed++;
    } else {
      console.error(`Test Case ${idx + 1} FAILED: expected ${tc.expectedKey}, got ${key}`);
    }
  });

  console.log(`--- Unit Tests Finished: ${passed}/${testCases.length} Passed ---`);
};
