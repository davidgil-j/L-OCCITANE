'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import Lockup from '@/components/ui/Lockup';

const ISLAND_Y = 28; // px desde arriba del rotulo cuando es isla
const FROM_BOTTOM = 150; // px del borde inferior del hero al rotulo, arriba del todo
const MORPH = 280; // px de recorrido final en los que se convierte en isla

/**
 * Cabecera con el rotulo L'OCCITANE × VÄNSTER, como en la web de EvoMeet.
 *
 * Arriba del todo el rotulo esta en la parte baja del hero, encima de
 * "Descubre la propuesta", quieto como parte de la foto. Al hacer scroll sube
 * pegado a la pagina, al mismo ritmo que el resto (1:1), y al llegar arriba
 * se queda enganchado: en los ultimos 280 px de recorrido se convierte, sin
 * prisa y con muelle, en la isla flotante (capsula en Blanc Brule con filete fino, algo mas pequena).
 * Al volver arriba hace el camino inverso.
 *
 * La posicion de salida se mide sobre el hero y se vuelve a medir si cambia
 * su tamano. Hasta medir queda oculto (la pantalla de carga lo tapa igual).
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
    const hero = document.querySelector('#inicio');
    if (!hero) return;
    const measure = () => {
      const bottom = hero.getBoundingClientRect().bottom + window.scrollY;
      // En pantallas muy bajas (movil en horizontal) nunca por encima del
      // final del titular.
      const title = document.querySelector('[data-hero-title]');
      const titleBottom = title ? title.getBoundingClientRect().bottom + window.scrollY + 24 : 0;
      startY.set(Math.max(ISLAND_Y, titleBottom, Math.round(bottom - FROM_BOTTOM)));
      setReady(true);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(hero);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [startY]);

  // Sube con la pagina hasta la isla y alli se queda.
  const y = useTransform(() => Math.max(ISLAND_Y, startY.get() - scrollY.get()));
  // 0 mientras viaja con la pagina, 1 ya convertido en isla.
  const rawProgress = useTransform(() => {
    const left = startY.get() - scrollY.get() - ISLAND_Y;
    return Math.min(1, Math.max(0, 1 - left / MORPH));
  });
  // La conversion en isla va con muelle: llega un poco despues del scroll y
  // se asienta con suavidad, aunque se baje deprisa. La posicion no: sigue
  // pegada a la pagina.
  const smoothProgress = useSpring(rawProgress, { stiffness: 90, damping: 22, mass: 0.9 });
  const progress = shouldReduceMotion ? rawProgress : smoothProgress;
  const scale = useTransform(progress, [0, 1], [1, 0.88]);
  const pillOpacity = useTransform(progress, [0.3, 1], [0, 1]);
  const pillScale = useTransform(progress, [0.3, 1], [0.9, 1]);
  const color = useTransform(progress, [0.35, 0.85], ['#FBF9F6', '#3F2B2E']);

  return (
    <header data-print="hide" className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-center">
      <motion.div
        data-noscript-show
        className={`relative transition-opacity duration-500 ${ready ? 'opacity-100' : 'opacity-0'}`}
        style={{ y, scale }}
      >
        <motion.span
          aria-hidden="true"
          className="absolute -inset-x-7 -inset-y-[14px] rounded-full border border-brand/10 bg-background"
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
