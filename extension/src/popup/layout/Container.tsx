import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex-1 flex flex-col p-5 overflow-y-auto ${className}`}>
      {children}
    </div>
  );
};
