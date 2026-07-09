import React, { useState, useEffect } from 'react';
import { VisaProfile } from '../types/profile';
import { validateProfile, ProfileErrors } from '../validators/profile.validator';
import { PersonalFormSection } from './PersonalFormSection';
import { PassportFormSection } from './PassportFormSection';
import { ContactFormSection } from './ContactFormSection';

interface ProfileFormProps {
  profile?: VisaProfile | null;
  onSubmit: (data: Omit<VisaProfile, 'id' | 'isDefault'>) => void;
  onCancel: () => void;
}

const initialFormState: Omit<VisaProfile, 'id' | 'isDefault'> = {
  surname: '',
  givenName: '',
  gender: 'MALE',
  dob: '',
  birthPlace: '',
  nationality: '',
  religion: '',
  maritalStatus: 'SINGLE',
  occupation: '',
  passportNumber: '',
  issueDate: '',
  expiryDate: '',
  issuePlace: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  address: '',
  postalCode: '',
};

export const ProfileForm: React.FC<ProfileFormProps> = ({ profile, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Omit<VisaProfile, 'id' | 'isDefault'>>(initialFormState);
  const [errors, setErrors] = useState<ProfileErrors>({});

  useEffect(() => {
    if (profile) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, isDefault, ...rest } = profile;
      setFormData(rest);
    } else {
      setFormData(initialFormState);
    }
    setErrors({});
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when the user edits the input
    if (errors[name as keyof Omit<VisaProfile, 'id' | 'isDefault'>]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProfile(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to first error if needed
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 bg-slate-900/35 border border-slate-900 p-6 sm:p-8 rounded-[16px] backdrop-blur-md">
      <div className="flex flex-col gap-8">
        {/* Section 1: Personal */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider select-none">
            1. Personal Details
          </h3>
          <PersonalFormSection data={formData} errors={errors} onChange={handleChange} />
        </div>

        {/* Section 2: Passport */}
        <div className="flex flex-col gap-4 border-t border-slate-900 pt-6">
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider select-none">
            2. Passport Details
          </h3>
          <PassportFormSection data={formData} errors={errors} onChange={handleChange} />
        </div>

        {/* Section 3: Contact */}
        <div className="flex flex-col gap-4 border-t border-slate-900 pt-6">
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider select-none">
            3. Contact & Address Details
          </h3>
          <ContactFormSection data={formData} errors={errors} onChange={handleChange} />
        </div>
      </div>

      {/* Toolbar Buttons */}
      <div className="border-t border-slate-900 pt-6 flex items-center justify-end gap-4 shrink-0">
        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold rounded-xl text-sm border border-slate-800 transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 transition-all cursor-pointer"
        >
          {profile ? 'Save Changes' : 'Create Profile'}
        </button>
      </div>
    </form>
  );
};
