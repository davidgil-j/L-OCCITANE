'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '@/components/animations/easing';

/**
 * Foto o video de producto en rectangulo limpio, a sangre dentro de su cartel
 * (marco fino y creditos en la esquina).
 *
 * Entra con una mascara que sube desde abajo, hecha solo con transforms: la
 * capa exterior sube desde translateY(100%) mientras la interior baja lo
 * mismo, de modo que la imagen se queda quieta y lo que avanza es el borde.
 *
 * El video solo se reproduce mientras esta en pantalla y no descarga nada
 * hasta entonces (preload="none", con su fotograma fijo como poster). Con
 * movimiento reducido se queda el fotograma fijo.
 */
export default function ProductMedia({ media, alt, sizes }) {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(frameRef, { once: true, amount: 0.2 });
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;
    const observer = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) video.play().catch(() => {});
    else video.pause();
  }, [playing]);

  const transition = { duration: 1, ease: EASE };

  return (
    <figure>
      <div ref={frameRef} className="border border-brand/15 p-2 md:p-2.5">
        <div className="relative overflow-hidden bg-surface" style={{ aspectRatio: media.aspect }}>
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ y: '100%' }}
            animate={inView ? { y: 0 } : undefined}
            transition={transition}
          >
            <motion.div
              className="absolute inset-0"
              initial={{ y: '-100%' }}
              animate={inView ? { y: 0 } : undefined}
              transition={transition}
            >
              {media.type === 'video' ? (
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  poster={media.poster}
                  muted
                  loop
                  playsInline
                  preload="none"
                  aria-label={alt}
                >
                  <source src={media.src} type="video/mp4" />
                </video>
              ) : (
                <Image src={media.src} alt={alt} fill sizes={sizes} className="object-cover" />
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <figcaption className="mt-3 text-right font-sans text-[10px] uppercase tracking-[0.14em] text-textMuted">
        Vänster para L&apos;Occitane · 2027
      </figcaption>
    </figure>
  );
}
