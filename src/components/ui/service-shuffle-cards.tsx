"use client";

import * as React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { Icon } from '../../utils/icons';

interface ServiceCardProps {
  handleShuffle: () => void;
  title: string;
  description: string;
  icon: IconType;
  position: "front" | "middle" | "back";
  totalServices: number;
  currentServiceIndex: number;
}

export function ServiceCard({
  handleShuffle,
  title,
  description,
  icon,
  position,
  totalServices,
  currentServiceIndex
}: ServiceCardProps) {
  const dragRef = React.useRef(0);
  const isFront = position === "front";

  return (
    <motion.div
      style={{
        zIndex: position === "front" ? 3 : position === "middle" ? 2 : 1
      }}
      animate={{
        rotate: position === "front" ? "-6deg" : position === "middle" ? "0deg" : "6deg",
        // Smaller offset on mobile
        x: position === "front" ? "0%" : position === "middle" ? "15%" : "30%"
      }}
      drag={true}
      dragElastic={0.35}
      dragListener={isFront}
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      onDragStart={(e: any) => {
        dragRef.current = e.clientX || e.touches?.[0]?.clientX || 0;
      }}
      onDragEnd={(e: any) => {
        const endX = e.clientX || e.changedTouches?.[0]?.clientX || 0;
        // Lower threshold for mobile (50px instead of 100px)
        if (dragRef.current - endX > 50) {
          handleShuffle();
        }
        dragRef.current = 0;
      }}
      transition={{ duration: 0.35 }}
      className={`absolute left-0 top-0 grid h-[340px] w-[280px] md:h-[420px] md:w-[340px] select-none place-content-center space-y-4 md:space-y-5 rounded-2xl border border-nextpixel-blue/20 bg-white p-5 md:p-6 shadow-xl ${
        isFront ? "cursor-grab active:cursor-grabbing" : ""
      }`}
    >
      {/* Icon */}
      <div className="mx-auto flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-nextpixel-light text-nextpixel-blue">
        <Icon icon={icon} size={36} aria-hidden={true} />
      </div>

      {/* Title */}
      <h3 className="text-center text-lg md:text-xl font-bold text-nextpixel-dark">
        {title}
      </h3>

      {/* Description */}
      <p className="text-center text-sm md:text-base text-nextpixel-gray leading-relaxed line-clamp-3 md:line-clamp-4">
        {description}
      </p>

      {/* Card number indicator - shows which service of total */}
      <div className="flex justify-center gap-1.5 pt-2">
        {Array.from({ length: totalServices }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === currentServiceIndex ? 'bg-nextpixel-turquoise' : 'bg-nextpixel-gray/30'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface Service {
  icon: IconType;
  title: string;
  description: string;
}

interface ShuffleCardsProps {
  services: Service[];
  dragHint?: string;
}

export function ShuffleCards({ services, dragHint = "Drag to explore" }: ShuffleCardsProps) {
  // Current front card index - cycles through all services
  const [frontIndex, setFrontIndex] = React.useState(0);

  const handleShuffle = () => {
    setFrontIndex(prev => (prev + 1) % services.length);
  };

  // Calculate which 3 services to show based on front index
  const getServiceIndex = (offset: number) => {
    return (frontIndex + offset) % services.length;
  };

  const cardData = [
    { position: "front" as const, serviceIndex: getServiceIndex(0) },
    { position: "middle" as const, serviceIndex: getServiceIndex(1) },
    { position: "back" as const, serviceIndex: getServiceIndex(2) },
  ];

  return (
    <div className="relative flex flex-col items-center">
      {/* Cards container - adjusted for mobile */}
      <div className="relative h-[360px] w-[280px] md:h-[450px] md:w-[350px] -ml-[20px] md:-ml-[50px]">
        {cardData.map(({ position, serviceIndex }) => {
          const service = services[serviceIndex];
          return (
            <ServiceCard
              key={serviceIndex}
              icon={service.icon}
              title={service.title}
              description={service.description}
              handleShuffle={handleShuffle}
              position={position}
              totalServices={services.length}
              currentServiceIndex={serviceIndex}
            />
          );
        })}
      </div>

      {/* Drag hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-6 md:mt-8 text-sm text-nextpixel-gray flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
        {dragHint}
      </motion.p>
    </div>
  );
}
