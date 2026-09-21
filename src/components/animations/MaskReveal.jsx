'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE } from '@/components/animations/easing';
import { REVEAL_VIEWPORT } from '@/components/animations/viewport';

/**
 * Titular que entra desde abajo tras una mascara, sin fundido de opacidad.
 *
 * El observador va en el contenedor, no en el texto: el texto arranca
 * desplazado un 100% y el contenedor lo recorta, asi que su area visible es
 * cero y un IntersectionObserver puesto sobre el no llegaria a dispararse.
 */
export default function MaskReveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, REVEAL_VIEWPORT);

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '100%' }}
        animate={inView ? { y: 0 } : undefined}
        transition={{ duration: 0.8, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
