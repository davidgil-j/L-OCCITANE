'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * "365 dias de Provenza": capa fija a pantalla completa que tine el
 * fondo muy sutilmente (5-8% opacidad) a medida que se recorre la
 * pagina, recorriendo el dia en Haute-Provence con los colores
 * complementarios oficiales de la marca. Puramente atmosferico
 * (pointer-events-none), no altera el contraste del contenido.
 */
const SCROLL_STOPS = [0, 0.18, 0.2, 0.48, 0.5, 0.66, 0.68, 1];
const TINTS = [
  'rgba(91,56,69,0)', // manana -- Hero: Blanc Brule puro, sin tinte
  'rgba(91,56,69,0)',
  'rgba(91,56,69,0.06)', // mediodia -- Lavande Valensolaire (productos 01-02)
  'rgba(91,56,69,0.06)',
  'rgba(162,164,104,0.06)', // tarde -- Verveine au Soir (producto 03)
  'rgba(162,164,104,0.06)',
  'rgba(63,68,82,0.07)', // noche -- Nuit Haute-Provencale (producto 04 + CTA)
  'rgba(63,68,82,0.07)',
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
