'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Lockup from '@/components/ui/Lockup';
import { EASE } from '@/components/animations/easing';

const MIN_MS = 900; // por debajo, con todo en cache, se leeria como un parpadeo
const MAX_MS = 2500;

/** Promesa que se cumple cuando la imagen termina (o falla) de cargar. */
function imageReady(selector) {
  const img = document.querySelector(selector);
  if (!img || (img.complete && img.naturalWidth > 0)) return Promise.resolve();
  return new Promise((resolve) => {
    img.addEventListener('load', resolve, { once: true });
    img.addEventListener('error', resolve, { once: true });
  });
}

/**
 * Pantalla de carga: el rotulo sobre Blanc Brule y un filete que se llena
 * segun cargan los recursos criticos del hero (fuentes, foto de fondo y
 * marmol del titular). Se retira como una mascara que sube: la capa exterior
 * sube mientras el contenido baja lo mismo, asi el rotulo se queda quieto y
 * lo que avanza es el borde. Solo transforms.
 *
 * Se renderiza ya en el HTML del servidor para tapar desde el primer pintado.
 * Nunca dura mas de 2,5 s aunque algo tarde; con movimiento reducido
 * desaparece sin animacion.
 */
export default function Loader() {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    // performance.now() cuenta desde que se abrio la pagina, no desde que
    // arranca este efecto: los limites son los que percibe quien entra.
    let finished = false;

    const tasks = [document.fonts.ready, imageReady('#inicio > img'), imageReady('#inicio h1 img')];
    let done = 0;
    tasks.forEach((task) => task.then(() => setProgress(++done / tasks.length)));

    const finish = () => {
      if (finished) return;
      finished = true;
      setProgress(1);
      setLeaving(true);
    };
    Promise.all(tasks).then(() => {
      const wait = Math.max(0, MIN_MS - performance.now());
      setTimeout(finish, wait);
    });
    const cap = setTimeout(finish, Math.max(0, MAX_MS - performance.now()));

    // Mientras tapa la pagina, que la rueda o el dedo no la desplacen debajo.
    const root = rootRef.current;
    const block = (e) => e.preventDefault();
    root?.addEventListener('wheel', block, { passive: false });
    root?.addEventListener('touchmove', block, { passive: false });

    return () => {
      clearTimeout(cap);
      root?.removeEventListener('wheel', block);
      root?.removeEventListener('touchmove', block);
    };
  }, []);

  useEffect(() => {
    if (leaving && shouldReduceMotion) setGone(true);
  }, [leaving, shouldReduceMotion]);

  if (gone) return null;

  const exit = { duration: 0.8, ease: EASE };

  return (
    <motion.div
      ref={rootRef}
      role="status"
      aria-label="Cargando la propuesta"
      className="fixed inset-0 z-[70] overflow-hidden"
      initial={false}
      animate={leaving && !shouldReduceMotion ? { y: '-100%' } : { y: 0 }}
      transition={exit}
      onAnimationComplete={() => leaving && setGone(true)}
    >
      <motion.div
        className="flex h-full w-full flex-col items-center justify-center gap-6 bg-background"
        initial={false}
        animate={leaving && !shouldReduceMotion ? { y: '100%' } : { y: 0 }}
        transition={exit}
      >
        <Lockup className="text-brand" />
        <span aria-hidden="true" className="block h-px w-40 overflow-hidden bg-brand/15">
          <span
            className="block h-full w-full origin-left bg-brand transition-transform duration-500 motion-reduce:transition-none"
            style={{ transform: `scaleX(${progress})` }}
          />
        </span>
      </motion.div>
    </motion.div>
  );
}
