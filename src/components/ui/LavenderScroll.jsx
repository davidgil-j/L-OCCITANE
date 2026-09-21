'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import useHasScrolled from '@/components/animations/useHasScrolled';
import useMediaQuery, { DESKTOP_POINTER } from '@/components/animations/useMediaQuery';

// Silueta de la espiga (recortada de foto_png_lavandaespiga_scroll.png).
const MASK = 'url(/images/espiga-scroll.png)';

/**
 * Indicador de progreso de scroll: la espiga de lavanda se llena de arriba
 * abajo con el magenta de Vanster, en el mismo sentido en que se recorre la
 * pagina: lo relleno es lo ya leido.
 *
 * El PNG de la espiga hace de mascara sobre dos capas: la base, apagada, y
 * encima el magenta, que crece con scaleY desde arriba. La base cambia de
 * color segun el fondo que tenga detras (Noir des Terres sobre claro, Blanc
 * Brule sobre oscuro): son dos capas que se cruzan con opacidad, asi todo lo
 * que se anima es transform u opacity.
 *
 * Por debajo de 1440 px va mas pequena y pegada al borde: el texto de las
 * fichas llega ahi a 48 px del borde y la espiga grande lo pisaba.
 *
 * Aparece con el primer scroll, se oculta en movil y es decorativa (el
 * progreso no aporta nada a un lector de pantalla). Con movimiento reducido
 * el relleno sigue al scroll sin suavizado, porque Lenis no se monta.
 */
export default function LavenderScroll() {
  // Sin raton ni se monta: oculta con CSS seguia recalculandose en cada scroll.
  const hasMouse = useMediaQuery(DESKTOP_POINTER);
  return hasMouse ? <LavenderScrollInner /> : null;
}

function LavenderScrollInner() {
  const { scrollYProgress } = useScroll();
  const hasScrolled = useHasScrolled();
  const [bgTone, setBgTone] = useState('dark');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setBgTone(entry.target.dataset.bgTone || 'light');
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
      data-print="hide"
      className={`pointer-events-none fixed right-3 top-1/2 z-50 hidden h-[160px] w-[28px] -translate-y-1/2 transition-opacity duration-700 motion-reduce:transition-none md:block min-[1440px]:right-10 min-[1440px]:h-[200px] min-[1440px]:w-[36px] ${
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
          bgTone === 'light' ? 'opacity-0' : 'opacity-40'
        }`}
      />
      {/* Magenta de Vanster (#C40452): tomado del bloque de color plano del
          PDF oficial de aplicaciones de marca, no estimado a ojo. Sobre el
          marmol del final el magenta se perdia en el propio marmol, asi que
          ahi el relleno pasa a Blanc Brule. */}
      <motion.span
        className={`absolute inset-0 origin-top bg-vanster transition-opacity duration-700 motion-reduce:transition-none ${
          bgTone === 'marble' ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ scaleY: scrollYProgress }}
      />
      <motion.span
        className={`absolute inset-0 origin-top bg-background transition-opacity duration-700 motion-reduce:transition-none ${
          bgTone === 'marble' ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ scaleY: scrollYProgress }}
      />
    </div>
  );
}
