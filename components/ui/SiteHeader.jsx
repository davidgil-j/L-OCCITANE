'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Lockup from '@/components/ui/Lockup';

const ISLAND_Y = 28; // px desde arriba del rotulo cuando es isla
const GAP = 14; // px entre el rotulo y el titular del hero, arriba del todo
const TRAVEL = 220; // px de scroll en los que el rotulo sube hasta la isla

/**
 * Cabecera con el rotulo L'OCCITANE × VÄNSTER.
 *
 * Arriba del todo el rotulo hace de antetitulo: va justo encima del titular
 * del hero, dentro de la composicion. Al hacer scroll se despega y sube hasta
 * quedarse como isla flotante (capsula en Blanc Brule con filete fino, algo
 * mas pequena), fija arriba mientras se recorre la pagina. Al volver arriba
 * baja otra vez a su sitio.
 *
 * El recorrido va ligado al scroll y pasa por un muelle, asi que el rotulo
 * llega un poco tarde: se nota que lo arrastra el scroll. Con movimiento
 * reducido sigue al scroll sin muelle.
 *
 * La posicion de salida se mide sobre el titular (data-hero-title) y se
 * vuelve a medir si cambia su tamano. Hasta medir queda donde estaba antes,
 * tapado por la pantalla de carga.
 *
 * Solo se anima transform, opacidad y el color del texto. Sin sombras ni
 * desenfoques, como pide la guia de marca: el borde lo marca el filete.
 */
export default function SiteHeader() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const startY = useMotionValue(40);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const title = document.querySelector('[data-hero-title]');
    if (!title) return;
    const measure = () => {
      const top = title.getBoundingClientRect().top + window.scrollY;
      startY.set(Math.max(ISLAND_Y, Math.round(top - 16 - GAP)));
      setReady(true);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(title);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [startY]);

  const raw = useTransform(scrollY, [0, TRAVEL], [0, 1], { clamp: true });
  const spring = useSpring(raw, { stiffness: 140, damping: 24, mass: 0.7 });
  const progress = shouldReduceMotion ? raw : spring;

  const y = useTransform(() => {
    const s = startY.get();
    return s + (ISLAND_Y - s) * progress.get();
  });
  const scale = useTransform(progress, [0, 1], [1, 0.88]);
  const pillOpacity = useTransform(progress, [0.5, 1], [0, 1]);
  const pillScale = useTransform(progress, [0.5, 1], [0.9, 1]);
  const color = useTransform(progress, [0.45, 0.9], ['#FBF9F6', '#3F2B2E']);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center">
      <motion.div
        className={`relative transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
        style={{ y, scale }}
      >
        <motion.span
          aria-hidden="true"
          className="absolute -inset-x-7 -inset-y-[14px] rounded-full border border-brand/10 bg-background/95"
          style={{ opacity: pillOpacity, scale: pillScale }}
        />
        <motion.a
          href="#inicio"
          aria-label="L'Occitane y Vänster: volver al inicio"
          className="pointer-events-auto relative -mx-3 -my-4 block px-3 py-4"
          style={{ color }}
        >
          <Lockup />
        </motion.a>
      </motion.div>
    </header>
  );
}
