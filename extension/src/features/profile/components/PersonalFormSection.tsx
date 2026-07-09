import React from 'react';
import { VisaProfile } from '../types/profile';
import { ProfileErrors } from '../validators/profile.validator';

interface PersonalFormSectionProps {
  data: Omit<VisaProfile, 'id' | 'isDefault'>;
  errors: ProfileErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const PersonalFormSection: React.FC<PersonalFormSectionProps> = ({
  data,
  errors,
  onChange,
}) => {
  const inputClass =
    'bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all';
  const labelClass = 'text-xs font-bold text-slate-400 select-none';
  const fieldContainer = 'flex flex-col gap-1.5';
  const errorClass = 'text-[11px] text-red-500 font-semibold';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {/* Surname */}
      <div className={fieldContainer}>
        <label htmlFor="surname" className={labelClass}>Surname *</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={data.surname}
          onChange={onChange}
          placeholder="e.g., SMITH"
          className={inputClass}
        />
        {errors.surname && <span className={errorClass}>{errors.surname}</span>}
      </div>

      {/* Given Name */}
      <div className={fieldContainer}>
        <label htmlFor="givenName" className={labelClass}>Given Name(s) *</label>
        <input
          type="text"
          id="givenName"
          name="givenName"
          value={data.givenName}
          onChange={onChange}
          placeholder="e.g., JOHN DAVID"
          className={inputClass}
        />
        {errors.givenName && <span className={errorClass}>{errors.givenName}</span>}
      </div>

      {/* Gender */}
      <div className={fieldContainer}>
        <label htmlFor="gender" className={labelClass}>Gender *</label>
        <select
          id="gender"
          name="gender"
          value={data.gender}
          onChange={onChange}
          className={inputClass}
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="TRANSGENDER">Transgender</option>
        </select>
        {errors.gender && <span className={errorClass}>{errors.gender}</span>}
      </div>

      {/* DOB */}
      <div className={fieldContainer}>
        <label htmlFor="dob" className={labelClass}>Date of Birth *</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={data.dob}
          onChange={onChange}
          className={inputClass}
        />
        {errors.dob && <span className={errorClass}>{errors.dob}</span>}
      </div>

      {/* Birth Place */}
      <div className={fieldContainer}>
        <label htmlFor="birthPlace" className={labelClass}>Place of Birth *</label>
        <input
          type="text"
          id="birthPlace"
          name="birthPlace"
          value={data.birthPlace}
          onChange={onChange}
          placeholder="e.g., London"
          className={inputClass}
        />
        {errors.birthPlace && <span className={errorClass}>{errors.birthPlace}</span>}
      </div>

      {/* Nationality */}
      <div className={fieldContainer}>
        <label htmlFor="nationality" className={labelClass}>Nationality *</label>
        <input
          type="text"
          id="nationality"
          name="nationality"
          value={data.nationality}
          onChange={onChange}
          placeholder="e.g., BRITISH"
          className={inputClass}
        />
        {errors.nationality && <span className={errorClass}>{errors.nationality}</span>}
      </div>

      {/* Religion */}
      <div className={fieldContainer}>
        <label htmlFor="religion" className={labelClass}>Religion *</label>
        <input
          type="text"
          id="religion"
          name="religion"
          value={data.religion}
          onChange={onChange}
          placeholder="e.g., CHRISTIAN"
          className={inputClass}
        />
        {errors.religion && <span className={errorClass}>{errors.religion}</span>}
      </div>

      {/* Marital Status */}
      <div className={fieldContainer}>
        <label htmlFor="maritalStatus" className={labelClass}>Marital Status *</label>
        <select
          id="maritalStatus"
          name="maritalStatus"
          value={data.maritalStatus}
          onChange={onChange}
          className={inputClass}
        >
          <option value="SINGLE">Single</option>
          <option value="MARRIED">Married</option>
          <option value="DIVORCED">Divorced</option>
          <option value="WIDOWED">Widowed</option>
        </select>
        {errors.maritalStatus && <span className={errorClass}>{errors.maritalStatus}</span>}
      </div>

      {/* Occupation */}
      <div className={fieldContainer}>
        <label htmlFor="occupation" className={labelClass}>Occupation *</label>
        <input
          type="text"
          id="occupation"
          name="occupation"
          value={data.occupation}
          onChange={onChange}
          placeholder="e.g., DEVELOPER"
          className={inputClass}
        />
        {errors.occupation && <span className={errorClass}>{errors.occupation}</span>}
      </div>
    </div>
  );
};
