'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { EASE, EASE_CSS } from '@/components/animations/easing';

/** Estilo de posicion de una caja expresada en % de su contenedor. */
// Hover: px que crece la pieza por cada lado.
const HOVER_POP = 4;
const HOVER_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

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
 * La caja tiene las esquinas algo redondeadas y el borde difuminado un par de
 * pixeles hacia el Blanc Brule del fondo, para que la pieza se funda con la
 * pagina y no parezca pegada encima. El difuminado es una capa fija encima:
 * no se repinta aunque la imagen se mueva debajo.
 *
 * Con el cursor encima, la pieza entera (marco e imagen juntos) crece unos
 * pixeles por cada lado, sin zoom por dentro. Solo con raton y nunca con
 * movimiento reducido.
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

  const pop = (e) => {
    if (e.pointerType !== 'mouse' || !window.matchMedia(HOVER_QUERY).matches) return;
    const box = e.currentTarget;
    box.style.transform = `translateZ(0) scale(${(box.offsetWidth + HOVER_POP * 2) / box.offsetWidth})`;
  };
  const release = (e) => {
    e.currentTarget.style.transform = '';
  };

  const transition = { duration: 1, ease: EASE };
  const logo = media.logo;

  return (
    <figure>
      <div ref={boxRef} className="relative" style={{ aspectRatio: media.box }}>
        <div
          className="absolute overflow-hidden rounded-lg bg-surface transition-transform duration-500 [transform:translateZ(0)] md:rounded-xl"
          style={{ ...place(media.window), transitionTimingFunction: EASE_CSS }}
          onPointerEnter={pop}
          onPointerLeave={release}
        >
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
              <div className="absolute inset-0">
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
              </div>
            </motion.div>
          </motion.div>
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_1.5px_0.5px_#FBF9F6]" />
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
