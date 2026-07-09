import React from 'react';

export interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Section: React.FC<SectionProps> = ({ title, children, className = '' }) => {
  return (
    <section className={`flex flex-col gap-2.5 ${className}`}>
      {title && (
        <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider select-none px-0.5">
          {title}
        </h3>
      )}
      {children}
    </section>
  );
};
