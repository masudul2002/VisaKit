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
  category: 'Tourist',
  tags: [],
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

        {/* Section 4: Classification */}
        <div className="flex flex-col gap-4 border-t border-slate-900 pt-6">
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider select-none">
            4. Profile Classification
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="category"
                className="text-xs font-semibold text-slate-400 uppercase tracking-wider"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category || 'Tourist'}
                onChange={handleChange}
                className="bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-blue-500/50 cursor-pointer"
              >
                <option value="Tourist">Tourist</option>
                <option value="Business">Business</option>
                <option value="Medical">Medical</option>
                <option value="Employment">Employment</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="visaType"
                className="text-xs font-semibold text-slate-400 uppercase tracking-wider"
              >
                Visa Type
              </label>
              <select
                id="visaType"
                name="visaType"
                value={formData.visaType || 'TOURIST VISA'}
                onChange={handleChange}
                className="bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-blue-500/50 cursor-pointer"
              >
                {[
                  'BUSINESS VISA',
                  'CONFERENCE VISA',
                  'DIPLOMATIC VISA',
                  'DOUBLE ENTRY',
                  'EMPLOYMENT VISA',
                  'ENTRY VISA',
                  'FILM VISA',
                  'JOURNALIST VISA',
                  'MEDICAL VISA',
                  'MISSIONARY VISA',
                  'MOUNTAINEERING VISA',
                  'OFFICIAL VISA',
                  'PILGRIMS VISA',
                  'STUDENT VISA',
                  'TOURIST VISA',
                  'TRANSIT VISA',
                  'UN DIPLOMAT',
                  'UN OFFICIAL',
                  'VISIT VISA',
                ].map((vt) => (
                  <option key={vt} value={vt}>
                    {vt}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="tagsInput"
                className="text-xs font-semibold text-slate-400 uppercase tracking-wider"
              >
                Tags (Comma-separated)
              </label>
              <input
                id="tagsInput"
                type="text"
                value={(formData.tags || []).join(', ')}
                onChange={(e) => {
                  const tagList = e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter((t) => t.length > 0);
                  setFormData((prev) => ({ ...prev, tags: tagList }));
                }}
                placeholder="e.g. Urgent, Personal, Family"
                className="bg-slate-950 border border-slate-900 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-700 outline-none focus:border-blue-500/50"
              />
            </div>
          </div>
        </div>

        {/* Section 5: Photo & Signature */}
        <div className="flex flex-col gap-4 border-t border-slate-900 pt-6">
          <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider select-none">
            5. Photo & Signature Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Passport Photo (JPG/PNG)
              </span>
              <div className="flex items-center gap-4">
                {formData.photoData && (
                  <img
                    src={formData.photoData}
                    alt="Passport Photo Preview"
                    className="w-16 h-16 rounded-xl border border-slate-800 object-cover"
                  />
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setFormData((prev) => ({
                          ...prev,
                          photoData: event.target?.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-slate-300 hover:file:bg-slate-800 cursor-pointer"
                />
                {formData.photoData && (
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, photoData: undefined }))}
                    className="text-[11px] font-bold text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Signature Specimen (PNG/JPG)
              </span>
              <div className="flex items-center gap-4">
                {formData.signatureData && (
                  <img
                    src={formData.signatureData}
                    alt="Signature Preview"
                    className="w-24 h-10 rounded-xl border border-slate-800 object-contain bg-slate-950 p-1"
                  />
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setFormData((prev) => ({
                          ...prev,
                          signatureData: event.target?.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-slate-300 hover:file:bg-slate-800 cursor-pointer"
                />
                {formData.signatureData && (
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, signatureData: undefined }))}
                    className="text-[11px] font-bold text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
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
