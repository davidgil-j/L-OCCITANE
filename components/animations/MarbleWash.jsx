'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import useMediaQuery, { DESKTOP_POINTER } from '@/components/animations/useMediaQuery';

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
 * Rendimiento: antes la bruma era una mascara CSS sobre una capa que se movia,
 * y el navegador rasterizaba de nuevo las cuatro brumas en cada fotograma
 * (~940 ms de pintado por segundo de scroll: la pagina iba a tirones). Ahora
 * el marmol se mueve solo, al 20%, y encima va un velo fijo del color del fondo
 * (Blanc Brule, un solo color) que hace el desvanecido. Como el fondo de la
 * ficha es liso, se ve igual que la mascara, pero la GPU solo compone capas ya
 * pintadas. Ambos movimientos se enganchan despues de montar y se quedan
 * quietos con movimiento reducido.
 */
export default function MarbleWash(props) {
  // Sin raton ni se monta: oculta con CSS, su deriva en bucle seguia
  // calculandose en cada fotograma.
  const hasMouse = useMediaQuery(DESKTOP_POINTER);
  return hasMouse ? <MarbleWashInner {...props} /> : null;
}

function MarbleWashInner({ side = 'right', index = 0 }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [on, setOn] = useState(false);
  useEffect(() => setOn(!shouldReduceMotion), [shouldReduceMotion]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-PARALLAX, PARALLAX]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 -z-10 hidden w-[70%] overflow-hidden md:block ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
    >
      <motion.span
        className="absolute inset-x-0 block will-change-transform"
        style={{ top: -OVERSCAN, bottom: -OVERSCAN, ...(on ? { y } : null) }}
      >
        <motion.span
          className="absolute inset-0 block will-change-transform"
          animate={on ? { scale: [1.04, 1.1, 1.04], x: [0, index % 2 ? 24 : -24, 0] } : undefined}
          transition={on ? { duration: 30, ease: 'easeInOut', repeat: Infinity } : undefined}
          style={{ scale: 1.04 }}
        >
          {/* El lado izquierdo es la misma imagen volteada: el marmol no se repite. */}
          <span className={`absolute inset-0 block opacity-20 ${side === 'left' ? '-scale-x-100' : ''}`}>
            <Image src="/images/brand/vanster-marmol-cierre.jpg" alt="" fill sizes="70vw" className="object-cover" />
          </span>
        </motion.span>
      </motion.span>
      {/* Velo fijo del color del fondo que hace el desvanecido: no se mueve, asi
          la bruma nunca asoma hasta el borde de la ficha. Se sale 2 px por cada
          lado: al redondear subpixeles asomaba una fila del marmol en el borde. */}
      <span
        className="absolute -inset-0.5 block will-change-transform"
        style={{
          background: `radial-gradient(ellipse 74% 58% at ${side === 'left' ? '38%' : '62%'} 50%, rgb(251 249 246 / 0) 0%, rgb(251 249 246 / 0.4) 45%, #FBF9F6 82%)`,
        }}
      />
    </span>
  );
}
