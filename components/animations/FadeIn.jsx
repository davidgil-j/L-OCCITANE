'use client';

import { motion } from 'framer-motion';

/**
 * Envoltorio reutilizable para revelar contenido al entrar en el viewport.
 * Uso: <FadeIn><h2>Título</h2></FadeIn>
 */
export default function FadeIn({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
