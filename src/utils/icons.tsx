"use client";

import React, { ElementType } from 'react';
import { IconType } from 'react-icons';

interface IconProps {
  icon: IconType;
  className?: string;
  size?: number;
  color?: string;
  'aria-hidden'?: boolean;
}

export const Icon: React.FC<IconProps> = ({ 
  icon: IconComponent, 
  className = '', 
  size, 
  color,
  ...props 
}) => {
  // Koristi ElementType da bi TypeScript znao da je IconComponent React komponenta
  const Component = IconComponent as ElementType;
  
  return (
    <Component 
      className={className} 
      size={size} 
      color={color}
      {...props}
    />
  );
};
