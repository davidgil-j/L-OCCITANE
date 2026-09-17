'use client';

import { useEffect, useState } from 'react';
import { useMotionValueEvent, useScroll } from 'framer-motion';

/**
 * Pasa a true en cuanto el usuario empieza a desplazarse y ya no vuelve a
 * false: lo que aparece o desaparece con el primer scroll no debe parpadear
 * cada vez que se vuelve arriba.
 *
 * El umbral evita que un roce del trackpad en lo alto de la pagina cuente
 * como scroll.
 */
export default function useHasScrolled(threshold = 24) {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  // Si el navegador restaura la posicion al recargar, no llega ningun evento
  // de cambio: hay que mirarlo una vez al montar.
  useEffect(() => {
    if (window.scrollY > threshold) setHasScrolled(true);
  }, [threshold]);

  useMotionValueEvent(scrollY, 'change', (y) => {
    if (y > threshold) setHasScrolled(true);
  });

  return hasScrolled;
}
