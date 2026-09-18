'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

const PARALLAX = 90; // px de desfase maximo respecto al contenido
const OVERSCAN = PARALLAX + 30; // siempre mayor que el desfase: nunca deja borde

/**
 * Bruma del marmol de Vanster detras del texto de cada ficha.
 *
 * Dos movimientos, los dos casi imperceptibles:
 *  - parallax: el marmol se desplaza con el scroll pero mas despacio que la
 *    ficha, asi letras y fotos suben por delante y el conjunto gana
 *    profundidad;
 *  - deriva: una escala y un desplazamiento lentisimos en bucle (30 s), para
 *    que el marmol parezca vivo sin que se vea moverse.
 *
 * Se desvanece hacia los bordes con una mascara radial (el color es el del
 * propio marmol, no un degradado). Solo transforms. Ambos movimientos se
 * enganchan despues de montar y se quedan quietos con movimiento reducido.
 */
export default function MarbleWash({ side = 'right', index = 0 }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [on, setOn] = useState(false);
  useEffect(() => setOn(!shouldReduceMotion), [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-PARALLAX, PARALLAX]);

  const mask = `radial-gradient(ellipse 74% 58% at ${side === 'left' ? '38%' : '62%'} 50%, #000 0%, rgb(0 0 0 / 0.6) 45%, transparent 82%)`;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 -z-10 hidden w-[70%] overflow-hidden opacity-[0.2] md:block ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <motion.span className="absolute inset-x-0 block" style={{ top: -OVERSCAN, bottom: -OVERSCAN, ...(on ? { y } : null) }}>
        <motion.span
          className="absolute inset-0 block"
          animate={on ? { scale: [1.04, 1.1, 1.04], x: [0, index % 2 ? 24 : -24, 0] } : undefined}
          transition={on ? { duration: 30, ease: 'easeInOut', repeat: Infinity } : undefined}
          style={{ scale: 1.04 }}
        >
          <Image
            src="/images/brand/vanster-marmol-cierre.jpg"
            alt=""
            fill
            sizes="70vw"
            className={`object-cover ${index % 2 ? 'object-left' : 'object-right'}`}
          />
        </motion.span>
      </motion.span>
    </span>
  );
}
