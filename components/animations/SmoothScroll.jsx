'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

/**
 * Scroll con inercia (Lenis). Envuelve la pagina entera.
 *
 * Lenis mantiene la posicion nativa de scroll, asi que `useScroll` de Framer
 * Motion y el resto de animaciones ligadas al scroll siguen funcionando sin
 * tocar nada.
 *
 * Los anclajes internos (boton del hero, navegacion lateral) si hay que
 * reconducirlos: el salto nativo pelea con la interpolacion de Lenis, de modo
 * que se interceptan y se delegan en `lenis.scrollTo`.
 */
export default function SmoothScroll({ children }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

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
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [shouldReduceMotion]);

  return children;
}
