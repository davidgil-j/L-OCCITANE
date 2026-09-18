'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { cancelFrame, frame, useReducedMotion } from 'framer-motion';

/**
 * Scroll con inercia (Lenis). Envuelve la pagina entera.
 *
 * Lenis no lleva su propio requestAnimationFrame: avanza dentro del bucle de
 * Framer Motion (frame.update). Con dos bucles compitiendo, uno movia el
 * scroll y el otro leia la posicion en otro momento del fotograma, y las
 * animaciones ligadas al scroll daban tirones. La instancia vive en un ref y
 * se destruye en la limpieza del efecto.
 *
 * Lenis mantiene la posicion nativa de scroll, asi que useScroll y whileInView
 * de Framer siguen funcionando sin tocar nada. Los anclajes internos si hay
 * que reconducirlos: el salto nativo pelea con la interpolacion de Lenis, de
 * modo que se interceptan y se delegan en lenis.scrollTo.
 */
export default function SmoothScroll({ children }) {
  const shouldReduceMotion = useReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, autoRaf: false });
    lenisRef.current = lenis;

    const update = ({ timestamp }) => lenis.raf(timestamp);
    frame.update(update, true);

    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      const id = link?.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target);
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelFrame(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [shouldReduceMotion]);

  return children;
}
