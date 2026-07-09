export interface VisaProfile {
  id: string;
  isDefault: boolean;
  category?: 'Tourist' | 'Business' | 'Medical' | 'Employment' | 'Other';
  isFavorite?: boolean;
  tags?: string[];
  
  // Personal Information
  surname: string;
  givenName: string;
  gender: 'MALE' | 'FEMALE' | 'TRANSGENDER';
  dob: string;
  birthPlace: string;
  nationality: string;
  religion: string;
  maritalStatus: 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED';
  occupation: string;
  
  // Passport Information
  passportNumber: string;
  issueDate: string;
  expiryDate: string;
  issuePlace: string;
  
  // Contact
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
}
