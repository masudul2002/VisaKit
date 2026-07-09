import { VisaProfile } from '../types/profile';

export type ProfileErrors = Partial<Record<keyof Omit<VisaProfile, 'id' | 'isDefault'>, string>>;

export const validateProfile = (profile: Omit<VisaProfile, 'id' | 'isDefault'>): ProfileErrors => {
  const errors: ProfileErrors = {};

  const requiredFields: Array<keyof Omit<VisaProfile, 'id' | 'isDefault'>> = [
    'surname',
    'givenName',
    'dob',
    'birthPlace',
    'nationality',
    'religion',
    'maritalStatus',
    'occupation',
    'passportNumber',
    'issueDate',
    'expiryDate',
    'issuePlace',
    'email',
    'phone',
    'country',
    'city',
    'address',
    'postalCode',
  ];

  requiredFields.forEach((field) => {
    if (!profile[field] || String(profile[field]).trim() === '') {
      errors[field] = 'This field is required';
    }
  });

  // Email format validation
  if (profile.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
    errors.email = 'Invalid email address';
  }

  // Passport format (typically alphanumeric, 6-12 chars)
  if (profile.passportNumber && !/^[a-zA-Z0-9]{6,12}$/.test(profile.passportNumber)) {
    errors.passportNumber = 'Passport number must be 6-12 alphanumeric characters';
  }

  // Phone validation (numeric and standard length)
  if (profile.phone && !/^\+?[0-9\s\-()]{7,18}$/.test(profile.phone)) {
    errors.phone = 'Invalid phone number';
  }

  // Date validations
  if (profile.dob) {
    const dobDate = new Date(profile.dob);
    if (isNaN(dobDate.getTime()) || dobDate > new Date()) {
      errors.dob = 'Date of birth must be in the past';
    }
  }

  if (profile.issueDate && profile.expiryDate) {
    const issue = new Date(profile.issueDate);
    const expiry = new Date(profile.expiryDate);

    if (isNaN(issue.getTime())) {
      errors.issueDate = 'Invalid issue date';
    }
    if (isNaN(expiry.getTime())) {
      errors.expiryDate = 'Invalid expiry date';
    } else if (expiry <= issue) {
      errors.expiryDate = 'Expiry date must be after issue date';
    }
  }

  return errors;
};
