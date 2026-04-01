'use client';

import { motion } from 'framer-motion';
import { useTranslate } from '@/context/LanguageContext';
import { AlertCircle, ArrowRight } from 'lucide-react';

const PROBLEM_COUNT = 3;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function SajamProblems() {
  const { t } = useTranslate();

  return (
    <section id="problems" className="py-24 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('sajam2026:problems.sectionTitle')}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            {t('sajam2026:problems.sectionSubtitle')}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {Array.from({ length: PROBLEM_COUNT }).map((_, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="bg-gray-900/80 border border-gray-800 rounded-2xl p-6 hover:border-amber-500/20 transition-all flex flex-col"
            >
              {/* Problem */}
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                <h3 className="text-lg font-semibold text-amber-300">
                  {t(`sajam2026:problems.items.${i}.problem`)}
                </h3>
              </div>

              {/* Pain description */}
              <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
                {t(`sajam2026:problems.items.${i}.description`)}
              </p>

              {/* Solution */}
              <div className="flex items-start gap-2 pt-4 border-t border-gray-800">
                <ArrowRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                <p className="text-cyan-300 text-sm font-medium">
                  {t(`sajam2026:problems.items.${i}.solution`)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
