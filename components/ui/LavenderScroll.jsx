'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import useHasScrolled from '@/components/animations/useHasScrolled';

// Silueta de la espiga (recortada de foto_png_lavandaespiga_scroll.png).
const MASK = 'url(/images/espiga-scroll.png)';

/**
 * Indicador de progreso de scroll: la espiga de lavanda se llena de abajo
 * arriba con el magenta de Vanster segun se avanza por la pagina.
 *
 * El PNG de la espiga hace de mascara sobre dos capas: la base, apagada, y
 * encima el magenta, que crece con scaleY desde abajo. La base cambia de
 * color segun el fondo que tenga detras (Noir des Terres sobre claro, Blanc
 * Brule sobre oscuro): son dos capas que se cruzan con opacidad, asi todo lo
 * que se anima es transform u opacity.
 *
 * Aparece con el primer scroll, se oculta en movil y es decorativa (el
 * progreso no aporta nada a un lector de pantalla). Con movimiento reducido
 * el relleno sigue al scroll sin suavizado, porque Lenis no se monta.
 */
export default function LavenderScroll() {
  const { scrollYProgress } = useScroll();
  const hasScrolled = useHasScrolled();
  const [bgTone, setBgTone] = useState('dark');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setBgTone(entry.target.dataset.bgTone === 'dark' ? 'dark' : 'light');
        });
      },
      // Solo cuenta la seccion que cruza el centro vertical, donde esta la espiga.
      { rootMargin: '-50% 0px -50% 0px' },
    );
    document.querySelectorAll('[data-bg-tone]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const mask = {
    maskImage: MASK,
    WebkitMaskImage: MASK,
    maskSize: 'contain',
    WebkitMaskSize: 'contain',
    maskRepeat: 'no-repeat',
    WebkitMaskRepeat: 'no-repeat',
    maskPosition: 'center',
    WebkitMaskPosition: 'center',
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed right-6 top-1/2 z-50 hidden h-[200px] w-[36px] -translate-y-1/2 transition-opacity duration-700 motion-reduce:transition-none md:block xl:right-10 ${
        hasScrolled ? 'opacity-100' : 'opacity-0'
      }`}
      style={mask}
    >
      <span
        className={`absolute inset-0 bg-brand transition-opacity duration-700 motion-reduce:transition-none ${
          bgTone === 'light' ? 'opacity-25' : 'opacity-0'
        }`}
      />
      <span
        className={`absolute inset-0 bg-background transition-opacity duration-700 motion-reduce:transition-none ${
          bgTone === 'dark' ? 'opacity-40' : 'opacity-0'
        }`}
      />
      {/* Magenta de Vanster (#C40452): tomado del bloque de color plano del
          PDF oficial de aplicaciones de marca, no estimado a ojo. */}
      <motion.span className="absolute inset-0 origin-bottom bg-vanster" style={{ scaleY: scrollYProgress }} />
    </div>
  );
}
