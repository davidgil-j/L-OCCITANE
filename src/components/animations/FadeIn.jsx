'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/components/animations/easing';
import { REVEAL_VIEWPORT } from '@/components/animations/viewport';

export default function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
