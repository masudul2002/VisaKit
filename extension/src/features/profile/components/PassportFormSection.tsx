import React from 'react';
import { VisaProfile } from '../types/profile';
import { ProfileErrors } from '../validators/profile.validator';

interface PassportFormSectionProps {
  data: Omit<VisaProfile, 'id' | 'isDefault'>;
  errors: ProfileErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const PassportFormSection: React.FC<PassportFormSectionProps> = ({
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {/* Passport Number */}
      <div className={fieldContainer}>
        <label htmlFor="passportNumber" className={labelClass}>Passport Number *</label>
        <input
          type="text"
          id="passportNumber"
          name="passportNumber"
          value={data.passportNumber}
          onChange={onChange}
          placeholder="e.g., G1234567"
          className={inputClass}
        />
        {errors.passportNumber && <span className={errorClass}>{errors.passportNumber}</span>}
      </div>

      {/* Issue Place */}
      <div className={fieldContainer}>
        <label htmlFor="issuePlace" className={labelClass}>Place of Issue *</label>
        <input
          type="text"
          id="issuePlace"
          name="issuePlace"
          value={data.issuePlace}
          onChange={onChange}
          placeholder="e.g., IPSWICH"
          className={inputClass}
        />
        {errors.issuePlace && <span className={errorClass}>{errors.issuePlace}</span>}
      </div>

      {/* Issue Date */}
      <div className={fieldContainer}>
        <label htmlFor="issueDate" className={labelClass}>Date of Issue *</label>
        <input
          type="date"
          id="issueDate"
          name="issueDate"
          value={data.issueDate}
          onChange={onChange}
          className={inputClass}
        />
        {errors.issueDate && <span className={errorClass}>{errors.issueDate}</span>}
      </div>

      {/* Expiry Date */}
      <div className={fieldContainer}>
        <label htmlFor="expiryDate" className={labelClass}>Date of Expiry *</label>
        <input
          type="date"
          id="expiryDate"
          name="expiryDate"
          value={data.expiryDate}
          onChange={onChange}
          className={inputClass}
        />
        {errors.expiryDate && <span className={errorClass}>{errors.expiryDate}</span>}
      </div>
    </div>
  );
};
