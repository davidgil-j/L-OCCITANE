'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Video de fondo del HERO.
 *
 * No lleva el atributo `autoPlay`: la reproduccion se lanza desde el efecto
 * solo si el usuario no ha pedido movimiento reducido. Asi el marcado que
 * genera el servidor y el del cliente son identicos (cambiar el elemento
 * segun `useReducedMotion` rompia la hidratacion), y con movimiento reducido
 * simplemente se queda el poster fijo.
 */
export default function HeroMedia() {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (shouldReduceMotion) {
      video.pause();
      return;
    }
    video.play().catch(() => {
      // Si el navegador bloquea la reproduccion automatica se queda el poster.
    });
  }, [shouldReduceMotion]);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover object-[28%_center] md:object-center"
      poster="/images/hero-marmol-poster.jpg"
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src="/videos/hero-marmol.mp4" type="video/mp4" />
    </video>
  );
}
