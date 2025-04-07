import React from 'react';
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
  return (
    <IconComponent 
      className={className} 
      size={size} 
      color={color}
      {...props}
    />
  );
};
