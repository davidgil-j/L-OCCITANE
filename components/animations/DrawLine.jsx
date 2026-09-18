'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE } from '@/components/animations/easing';

/**
 * Filete de 1px que se dibuja de izquierda a derecha al entrar en pantalla
 * (scaleX desde 0, solo transform). Con movimiento reducido MotionConfig lo
 * deja dibujado sin animar.
 */
export default function DrawLine({ className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 1 });

  return (
    <span ref={ref} aria-hidden="true" className={`block h-px ${className}`}>
      <motion.span
        className="block h-full w-full origin-left bg-current"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : undefined}
        transition={{ duration: 1.2, ease: EASE }}
      />
    </span>
  );
}
