'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Desplaza `children` unos pocos px mas lento que el scroll mientras
 * atraviesa el viewport. Pensado para vivir dentro de un contenedor
 * `relative` que recorte el resultado (p.ej. con clip-path).
 *
 * useScroll/useTransform son valores derivados del scroll, no
 * animaciones tween/spring, asi que MotionConfig no los desactiva solos:
 * hay que comprobar useReducedMotion() a mano.
 */
export default function Parallax({ children, offset = 16 }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const range = shouldReduceMotion ? [0, 0] : [-offset, offset];
  const y = useTransform(scrollYProgress, [0, 1], range);
  // El desbordamiento vertical debe superar siempre el desplazamiento maximo
  // del parallax (`offset`), o el fondo deja un hueco visible en los bordes
  // cuando `y` llega a su extremo (p.ej. en el rebote de scroll de iOS).
  const overscan = offset + 32;

  return (
    <motion.div
      ref={ref}
      style={{ y, top: -overscan, bottom: -overscan }}
      className="absolute inset-x-0"
    >
      {children}
    </motion.div>
  );
}
