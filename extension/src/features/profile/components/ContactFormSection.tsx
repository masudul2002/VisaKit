import React from 'react';
import { VisaProfile } from '../types/profile';
import { ProfileErrors } from '../validators/profile.validator';

interface ContactFormSectionProps {
  data: Omit<VisaProfile, 'id' | 'isDefault'>;
  errors: ProfileErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
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
      {/* Email */}
      <div className={fieldContainer}>
        <label htmlFor="email" className={labelClass}>Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={onChange}
          placeholder="e.g., applicant@example.com"
          className={inputClass}
        />
        {errors.email && <span className={errorClass}>{errors.email}</span>}
      </div>

      {/* Phone */}
      <div className={fieldContainer}>
        <label htmlFor="phone" className={labelClass}>Phone Number *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={data.phone}
          onChange={onChange}
          placeholder="e.g., +447700900077"
          className={inputClass}
        />
        {errors.phone && <span className={errorClass}>{errors.phone}</span>}
      </div>

      {/* Country */}
      <div className={fieldContainer}>
        <label htmlFor="country" className={labelClass}>Country *</label>
        <input
          type="text"
          id="country"
          name="country"
          value={data.country}
          onChange={onChange}
          placeholder="e.g., UNITED KINGDOM"
          className={inputClass}
        />
        {errors.country && <span className={errorClass}>{errors.country}</span>}
      </div>

      {/* City */}
      <div className={fieldContainer}>
        <label htmlFor="city" className={labelClass}>City/Town *</label>
        <input
          type="text"
          id="city"
          name="city"
          value={data.city}
          onChange={onChange}
          placeholder="e.g., London"
          className={inputClass}
        />
        {errors.city && <span className={errorClass}>{errors.city}</span>}
      </div>

      {/* Postal Code */}
      <div className={fieldContainer}>
        <label htmlFor="postalCode" className={labelClass}>Postal/Zip Code *</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={data.postalCode}
          onChange={onChange}
          placeholder="e.g., SW1A 1AA"
          className={inputClass}
        />
        {errors.postalCode && <span className={errorClass}>{errors.postalCode}</span>}
      </div>

      {/* Address */}
      <div className={`${fieldContainer} md:col-span-3`}>
        <label htmlFor="address" className={labelClass}>Street Address *</label>
        <input
          type="text"
          id="address"
          name="address"
          value={data.address}
          onChange={onChange}
          placeholder="e.g., 10 Downing Street"
          className={inputClass}
        />
        {errors.address && <span className={errorClass}>{errors.address}</span>}
      </div>
    </div>
  );
};
