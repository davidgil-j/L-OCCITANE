'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Capa fija a pantalla completa que tine el fondo muy sutilmente (5-7% de
 * opacidad) a medida que se recorre la pagina. Puramente atmosferico
 * (pointer-events-none), no altera el contraste del contenido.
 *
 * Antes recorria el dia en Haute-Provence con los complementarios de
 * L'Occitane. Al pasar el armazon de la pagina a la identidad de Vanster ese
 * recorrido dejaba de tener sentido, asi que ahora deriva por los tonos del
 * marmol de Vanster: entra en magenta y va calentando hacia el naranja segun
 * se acerca al cierre, donde el marmol aparece ya a sangre.
 */
// Los tramos siguen el ritmo real de las secciones, medido sobre la pagina:
// hero 0-0.18 | 01 0.18-0.44 | 02 0.44-0.68 | 03 0.68-0.88 | 04 y CTA 0.88-1.
// El tinte entra ya empezada cada seccion y se mantiene, para que el cambio
// nunca coincida con el borde y se sienta como una deriva, no como un corte.
// Si cambia el numero de secciones o su altura, hay que recalcularlos.
const SCROLL_STOPS = [0, 0.18, 0.24, 0.62, 0.7, 0.8, 0.88, 1];
const TINTS = [
  'rgba(196,4,82,0)', // Hero: sin tinte, el velo magenta ya vive en la propia seccion
  'rgba(196,4,82,0)',
  'rgba(196,4,82,0.05)', // productos 01-02: magenta de Vanster, apenas insinuado
  'rgba(196,4,82,0.05)',
  'rgba(207,84,50,0.06)', // producto 03: empieza a calentar hacia el naranja del marmol
  'rgba(207,84,50,0.06)',
  'rgba(214,88,48,0.07)', // producto 04 y CTA: naranja pleno antes del marmol a sangre
  'rgba(214,88,48,0.07)',
];

export default function PageBackground() {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(scrollYProgress, SCROLL_STOPS, TINTS);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40"
      style={{ backgroundColor }}
    />
  );
}
