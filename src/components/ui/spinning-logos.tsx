"use client"

import React from 'react';
import {
  FaLightbulb,
  FaRocket,
  FaUsers,
  FaHeadset,
  FaClock,
  FaCheckCircle,
  FaChartLine,
  FaHandshake,
  FaBriefcase
} from 'react-icons/fa';
import { IconType } from 'react-icons';
import { Icon } from '../../utils/icons';
import { cn } from '@/lib/utils';

interface LogoItem {
  icon: IconType;
  bgClassName: string;
  name: string;
}

interface SpinningLogosProps {
  centerText?: string;
  className?: string;
}

export const SpinningLogos: React.FC<SpinningLogosProps> = ({
  centerText = "NextPixel",
  className
}) => {
  const radiusToCenterOfIcons = 140;
  const iconWrapperWidth = 50;
  const ringPadding = 30;

  const toRadians = (degrees: number): number => (Math.PI / 180) * degrees;

  const logos: LogoItem[] = [
    { icon: FaLightbulb, bgClassName: 'bg-yellow-500', name: 'Creativity' },
    { icon: FaRocket, bgClassName: 'bg-red-600', name: 'Fast Delivery' },
    { icon: FaUsers, bgClassName: 'bg-blue-600', name: 'Expert Team' },
    { icon: FaHeadset, bgClassName: 'bg-green-600', name: 'Support' },
    { icon: FaClock, bgClassName: 'bg-orange-600', name: 'Deadlines' },
    { icon: FaCheckCircle, bgClassName: 'bg-emerald-600', name: 'Quality' },
    { icon: FaChartLine, bgClassName: 'bg-purple-600', name: 'Results' },
    { icon: FaHandshake, bgClassName: 'bg-cyan-600', name: 'Client Focus' },
    { icon: FaBriefcase, bgClassName: 'bg-indigo-600', name: 'Experience' },
  ];

  return (
    <div className={cn("flex justify-center items-center", className)}>
      <div
        style={{
          width: radiusToCenterOfIcons * 2 + iconWrapperWidth + ringPadding,
          height: radiusToCenterOfIcons * 2 + iconWrapperWidth + ringPadding,
        }}
        className="relative rounded-full bg-nextpixel-blue/20 shadow-lg border border-nextpixel-blue/30"
      >
        <div className="absolute inset-0 animate-spin-slow">
          {logos.map((logo, index) => {
            const angle = (360 / logos.length) * index;
            return (
              <div
                key={index}
                style={{
                  top: `calc(50% - ${iconWrapperWidth / 2}px + ${radiusToCenterOfIcons * Math.sin(toRadians(angle))}px)`,
                  left: `calc(50% - ${iconWrapperWidth / 2}px + ${radiusToCenterOfIcons * Math.cos(toRadians(angle))}px)`,
                  width: iconWrapperWidth,
                  height: iconWrapperWidth,
                }}
                className={cn(
                  "absolute flex items-center justify-center rounded-full shadow-md border-2 border-white/20 animate-spin-reverse",
                  logo.bgClassName
                )}
                aria-label={`${logo.name} service`}
              >
                <Icon icon={logo.icon} size={20} className="text-white" aria-hidden={true} />
              </div>
            );
          })}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-nextpixel-dark rounded-full w-3/5 h-3/5 flex items-center justify-center shadow-inner border-4 border-nextpixel-turquoise/50">
            <span className="text-lg sm:text-xl font-bold text-white text-center px-2">
              {centerText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinningLogos;
