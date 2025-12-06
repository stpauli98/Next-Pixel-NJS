"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  duration?: number;
  onComplete?: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  duration = 2000,
  onComplete
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Provjeri da li je već prikazan u ovoj sesiji
    const hasSeenSplash = sessionStorage.getItem('splashShown');
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      setHasAnimated(true);
      sessionStorage.setItem('splashShown', 'true');
      onComplete?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  // Ne renderuj ništa ako je već viđen
  if (!isVisible && !hasAnimated) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-nextpixel-dark to-nextpixel-blue"
          aria-hidden="true"
        >
          {/* Logo animacija */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h2
              className="text-5xl md:text-7xl font-bold text-white"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Next<span className="text-nextpixel-turquoise">Pixel</span>
            </motion.h2>

            {/* Loading bar */}
            <motion.div
              className="mt-8 h-1 bg-white/20 rounded-full overflow-hidden w-48 mx-auto"
            >
              <motion.div
                className="h-full bg-nextpixel-turquoise"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: duration / 1000 - 0.5, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
