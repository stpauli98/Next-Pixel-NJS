'use client';

import React from 'react';
import { IconType } from 'react-icons';

interface IconComponentProps {
  icon: IconType;
  size?: number;
  className?: string;
}

/**
 * A wrapper component for React Icons that works with React 19
 * This solves the "cannot be used as a JSX component" error
 */
export const IconComponent: React.FC<IconComponentProps> = ({ 
  icon: Icon, 
  size = 20, 
  className = '' 
}) => {
  // Call the icon as a function with props instead of using JSX
  return (
    <span className={className}>
      {Icon({ size })}
    </span>
  );
};
