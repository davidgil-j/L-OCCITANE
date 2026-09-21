'use client';

import { useEffect, useState } from 'react';

/** Consulta que identifica un escritorio con raton: ancho y puntero fino. */
export const DESKTOP_POINTER = '(min-width: 768px) and (hover: hover) and (pointer: fine)';

/**
 * true si la consulta coincide. Es false en el servidor y en el primer
 * render del cliente, asi que lo que dependa de ella se monta despues de
 * hidratar, sin descuadres entre servidor y cliente.
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [query]);

  return matches;
}
