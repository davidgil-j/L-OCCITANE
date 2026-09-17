'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { EASE } from '@/components/animations/easing';

/**
 * Margen extra, en px, que la capa del parallax desborda por arriba y por
 * abajo. Va en px y no en %, porque tiene que superar siempre al
 * desplazamiento (tambien en px) sea cual sea el alto del contenedor. Cuanto
 * mas justo, menos amplia `object-cover` la foto.
 */
const OVERSCAN_EXTRA = 20;

/**
 * Imagen de producto recortada con el arco provenzal (una de las 5 formas
 * iconicas de la marca). El arco es Beige Travertin, que la guia recomienda
 * para fondos de foto de producto: asi se lee como marco tambien cuando aun
 * no hay foto.
 *
 * Las fotos van en modo multiplicar sobre ese beige: los packshots traen su
 * fondo horneado (blanco puro la agenda, crema la mochila) y sin fundirlo se
 * veia un recorte de otro color dentro del arco. El beige esta tambien en la
 * capa del parallax porque la mezcla solo ve el fondo de su propio contexto
 * de apilamiento, y el transform de esa capa crea uno nuevo.
 *
 * Lleva las dos animaciones de la familia de la pagina:
 *  - reveal con clip-path desde abajo, dentro de la silueta del arco (el
 *    recorte del arco vive en el contenedor y el `inset()` animado en una
 *    capa interior, porque un elemento solo admite un clip-path);
 *  - parallax leve ligado al scroll de la propia seccion.
 *
 * El parallax solo se engancha despues de montar: `useReducedMotion` no
 * existe en el servidor, asi que decidir el desplazamiento en el primer
 * render romperia la hidratacion.
 */
export default function ArchImage({
  src,
  alt,
  sizes = '100vw',
  className = '',
  fit = 'contain',
  parallax = 30,
  children,
}) {
  const overscan = parallax + OVERSCAN_EXTRA;
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [parallaxOn, setParallaxOn] = useState(false);

  useEffect(() => {
    setParallaxOn(!shouldReduceMotion);
  }, [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-parallax, parallax]);

  // El observador va en el contenedor y no en la capa del reveal: esa capa se
  // recorta a si misma con inset(100%), de modo que su area visible es cero y
  // nunca llegaria a cruzar el umbral del IntersectionObserver.
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-surface ${className}`}
      style={{ clipPath: 'url(#provencal-arch)', WebkitClipPath: 'url(#provencal-arch)' }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {src ? (
          <motion.div
            className="absolute inset-x-0 bg-surface"
            style={{ top: -overscan, bottom: -overscan, ...(parallaxOn ? { y } : null) }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              className={`mix-blend-multiply ${fit === 'cover' ? 'object-cover' : 'object-contain p-10 md:p-16'}`}
            />
          </motion.div>
        ) : (
          <span className="absolute inset-x-0 bottom-10 text-center font-sans text-[10px] uppercase tracking-[0.08em] text-textMuted">
            Foto pendiente
          </span>
        )}
      </motion.div>
      {/* Capas que deban ir recortadas por el arco (p.ej. un velo). */}
      {children}
    </div>
  );
}
