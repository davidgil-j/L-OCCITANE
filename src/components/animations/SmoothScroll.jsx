'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { cancelFrame, frame, useReducedMotion } from 'framer-motion';
import useMediaQuery, { DESKTOP_POINTER } from '@/components/animations/useMediaQuery';

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
 *
 * Con cualquier dispositivo, los anclajes internos no escriben en el
 * historial: "atras" devuelve a donde estaba el lector antes de entrar.
 *
 * Solo se monta con raton. En pantallas tactiles el scroll nativo (con la
 * inercia de iOS y Android) es mejor que cualquier imitacion, y Lenis en
 * Safari de iPhone llegaba a bloquear el desplazamiento.
 */
export default function SmoothScroll({ children }) {
  const shouldReduceMotion = useReducedMotion();
  const hasMouse = useMediaQuery(DESKTOP_POINTER);
  const lenisRef = useRef(null);

  useEffect(() => {
    if (shouldReduceMotion || !hasMouse) return;

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
  }, [shouldReduceMotion, hasMouse]);

  // Sin Lenis (tactil o movimiento reducido), los anclajes internos tambien se
  // interceptan: el salto nativo mete una entrada en el historial por cada
  // toque, y quien llega desde un enlace (WhatsApp, correo) tenia que pulsar
  // "atras" varias veces, saltando por la pagina, para volver. Se baja con el
  // desplazamiento del propio navegador (suave salvo con movimiento reducido,
  // por el scroll-behavior de globals.css) y el historial no se toca.
  useEffect(() => {
    if (!shouldReduceMotion && hasMouse) return;
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"]');
      const id = link?.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ block: 'start' });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [shouldReduceMotion, hasMouse]);

  return children;
}
