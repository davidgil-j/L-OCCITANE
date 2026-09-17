'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/components/animations/easing';

export default function MaskReveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  return (
    <Tag className={`overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
