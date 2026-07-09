import { VisaProfile } from '../../profile/types/profile';

export type ProfileKey = keyof Omit<VisaProfile, 'id' | 'isDefault'>;

export const FIELD_REGISTRY: Record<ProfileKey, string[]> = {
  surname: ['surname', 'lastname', 'familyname', 'last_name', 'family_name', 'lName'],
  givenName: ['givenname', 'firstname', 'first_name', 'fname', 'name'],
  gender: ['gender', 'sex'],
  dob: ['dob', 'dateofbirth', 'birthdate', 'birth_date', 'date_of_birth'],
  birthPlace: ['birthplace', 'placeofbirth', 'place_of_birth'],
  nationality: ['nationality', 'citizen', 'citizenship'],
  passportNumber: ['passportnumber', 'passportno', 'passport_number', 'passport_no', 'passno'],
  passportIssueDate: ['passportissuedate', 'issue_date', 'issuedate', 'dateofissue'],
  passportExpiryDate: [
    'passportexpirydate',
    'expiry_date',
    'expirydate',
    'dateofexpiry',
    'expirationdate',
  ],
  passportIssuePlace: ['passportissueplace', 'placeofissue', 'issueplace', 'issue_place'],
  religion: ['religion', 'faith'],
  maritalStatus: ['maritalstatus', 'marital_status', 'marriage'],
  occupation: ['occupation', 'profession', 'job', 'work'],
  email: ['email', 'emailaddress', 'email_address', 'mail'],
  phone: ['phone', 'phonenumber', 'phone_number', 'mobile', 'cell', 'tel'],
  address: ['address', 'streetaddress', 'street', 'addressline1'],
  city: ['city', 'town', 'district'],
  country: ['country', 'nation'],
  postalCode: ['postalcode', 'zipcode', 'zip', 'postal_code', 'pin', 'pincode'],
  visaType: ['visatype', 'type_of_visa', 'visa_type', 'prev_visa_type', 'previous_visa_type', 'visa_type_selected'],
};
