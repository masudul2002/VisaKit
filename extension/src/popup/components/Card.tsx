import React from 'react';

export interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export const Card: React.FC<CardProps> = ({
  icon,
  title,
  description,
  onClick,
  ariaLabel,
}) => {
  const cardContent = (
    <>
      <div className="w-10 h-10 rounded-[8px] bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
        {icon}
      </div>
      <div className="flex flex-col gap-0.5 text-left">
        <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h4>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
          {description}
        </p>
      </div>
    </>
  );

  const baseStyles =
    'group w-full p-3.5 bg-white dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-850 rounded-[12px] flex items-center gap-3.5 transition-all duration-200 hover:-translate-y-[2px] hover:shadow-sm hover:border-blue-500/40 dark:hover:border-blue-500/40';

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 cursor-pointer`}
        aria-label={ariaLabel || `Open ${title}`}
      >
        {cardContent}
      </button>
    );
  }

  return <div className={baseStyles}>{cardContent}</div>;
};
