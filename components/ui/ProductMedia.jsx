'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE } from '@/components/animations/easing';

/** Estilo de posicion de una caja expresada en % de su contenedor. */
const place = ({ left, top, width, height }) => ({
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
  ...(height !== undefined ? { height: `${height}%` } : null),
});

/**
 * Foto o video de producto, a sangre en su caja (`media.box`, la proporcion
 * del archivo, para no recortar el producto).
 *
 * Sobre las fotos puede ir el logotipo de L'Occitane (`media.logo`) en el
 * hueco del producto, en modo multiplicar y algo transparente para que se lea
 * impreso en el material y no pegado encima.
 *
 * La pieza entra con una mascara que sube (solo transforms: la capa exterior
 * sube y la interior baja lo mismo).
 * El video no descarga nada hasta llegar a el, se para al salir de pantalla y
 * con movimiento reducido se queda en su fotograma fijo.
 */
export default function ProductMedia({ media, alt, sizes, credit = false }) {
  const boxRef = useRef(null);
  const videoRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const inView = useInView(boxRef, { once: true, amount: 0.2 });
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
  const logo = media.logo;

  return (
    <figure>
      <div ref={boxRef} className="relative" style={{ aspectRatio: media.box }}>
        <div className="absolute overflow-hidden bg-surface" style={place(media.window)}>
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
              {logo && (
                <span
                  aria-hidden="true"
                  className="absolute block mix-blend-multiply"
                  style={{ ...place(logo), opacity: logo.opacity, transform: `translate(-50%, -50%) rotate(${logo.rotate ?? 0}deg)` }}
                >
                  <Image
                    src="/images/brand/loccitane-logo-black.png"
                    alt=""
                    width={2048}
                    height={512}
                    sizes="200px"
                    className="h-auto w-full"
                  />
                </span>
              )}
            </motion.div>
          </motion.div>
        </div>

      </div>
      {credit && (
        <figcaption className="mt-3 text-right font-sans text-[11px] uppercase tracking-[0.14em] text-textMuted">
          Vänster para L&apos;Occitane · 2027
        </figcaption>
      )}
    </figure>
  );
}
