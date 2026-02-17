"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { ChevronDown } from "lucide-react";
import { Icon } from "../../utils/icons";

interface Service {
  icon: IconType;
  title: string;
  description: string;
}

interface ServiceVerticalStackProps {
  services: Service[];
  onFrontIndexChange?: (index: number) => void;
}

const springConfig = {
  type: "spring" as const,
  stiffness: 260,
  damping: 30,
  mass: 0.8,
};

export function ServiceVerticalStack({
  services,
  onFrontIndexChange,
}: ServiceVerticalStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextCard = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % services.length;
      return next;
    });
  }, [services.length]);

  // Notify parent of index changes
  useEffect(() => {
    onFrontIndexChange?.(currentIndex);
  }, [currentIndex, onFrontIndexChange]);

  // Auto-advance every 5s, pauses 8s after user interaction
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(() => {
      nextCard();
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextCard]);

  const handleUserInteraction = useCallback(() => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 8000);
  }, []);

  const handleAdvance = useCallback(() => {
    handleUserInteraction();
    nextCard();
  }, [handleUserInteraction, nextCard]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const getCardStyle = (index: number) => {
    const total = services.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Front card (fully visible)
    if (diff === 0) {
      return { y: 40, scale: 1, opacity: 1, zIndex: 5 };
    }
    // Card behind (middle)
    if (diff === 1 || diff === -(total - 1)) {
      return { y: 16, scale: 0.94, opacity: 0.6, zIndex: 4 };
    }
    // Card further behind (back)
    if (diff === 2 || diff === -(total - 2)) {
      return { y: -6, scale: 0.88, opacity: 0.3, zIndex: 3 };
    }
    // Exiting card (just left front position, goes down)
    if (diff === -1 || diff === total - 1) {
      return { y: 360, scale: 0.95, opacity: 0, zIndex: 6 };
    }
    // All others: hidden above
    return { y: -50, scale: 0.82, opacity: 0, zIndex: 0 };
  };

  const isVisible = (index: number) => {
    const total = services.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 3;
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {/* Card stack container */}
      <div className="relative h-[300px] w-full max-w-[calc(100%-24px)] overflow-hidden sm:h-[380px] sm:max-w-[520px]">
        {services.map((service, index) => {
          if (!isVisible(index)) return null;
          const style = getCardStyle(index);
          const isFront = index === currentIndex;

          return (
            <motion.div
              key={index}
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
              }}
              transition={springConfig}
              onClick={isFront ? handleAdvance : undefined}
              style={{
                zIndex: style.zIndex,
                left: "50%",
                x: "-50%",
                top: 0,
              }}
              className={`absolute flex w-[calc(100%-32px)] max-w-[480px] flex-col items-center gap-2 overflow-hidden rounded-2xl border border-nextpixel-blue/15 bg-white px-4 py-4 shadow-xl will-change-transform sm:gap-4 sm:px-7 sm:py-6 ${
                isFront ? "cursor-pointer" : "pointer-events-none"
              }`}
            >
              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-nextpixel-turquoise/10 sm:h-16 sm:w-16">
                <Icon
                  icon={service.icon}
                  className="text-nextpixel-turquoise"
                  size={24}
                  aria-hidden={true}
                />
              </div>

              {/* Title */}
              <h3 className="text-center text-base font-bold text-nextpixel-dark sm:text-xl">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-center text-xs leading-relaxed text-nextpixel-gray line-clamp-3 sm:text-base sm:line-clamp-4">
                {service.description}
              </p>

              {/* Dot indicators */}
              <div className="flex gap-1 pt-1 sm:gap-1.5 sm:pt-2">
                {services.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                      i === currentIndex
                        ? "bg-nextpixel-turquoise"
                        : "bg-nextpixel-gray/30"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Advance button */}
      <div className="relative z-10 flex w-full items-center justify-center py-2 sm:py-4">
        <button
          onClick={handleAdvance}
          className="flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full bg-nextpixel-navy text-white shadow-md transition-all duration-300 hover:bg-nextpixel-dark hover:shadow-lg active:scale-95"
          aria-label="Next service"
        >
          <ChevronDown size={20} />
        </button>
      </div>
    </div>
  );
}
