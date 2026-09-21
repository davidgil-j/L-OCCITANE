'use client';

import { motion } from 'framer-motion';

// Medidas fijas de la pildora: el recorrido del circulo depende de ellas.
const WIDTH = 200; // px, ancho total
const KNOB = 44; // px, diametro del circulo
const GAP = 6; // px, aire entre el circulo y el borde
const INNER = WIDTH - 2; // ancho dentro del filete de 1 px
const TRAVEL = INNER - GAP * 2 - KNOB; // lo que se desliza el circulo
const TEXT_SHIFT = -38; // el texto pasa al hueco que deja el circulo

// Muelle al estilo de Apple: sin rebote exagerado y reversible a mitad de
// camino (si se quita el cursor antes de acabar, vuelve desde donde este).
const spring = { type: 'spring', duration: 0.55, bounce: 0.12 };

const knob = {
  off: { x: 0, backgroundColor: '#FBF9F6' },
  on: { x: TRAVEL, backgroundColor: '#C40452' },
};
const fill = {
  // Apagado, el relleno queda escondido detras del circulo (mismo ancho y
  // margen), asi que en reposo solo se ve el circulo.
  off: { clipPath: `inset(${GAP}px ${INNER - KNOB - GAP}px ${GAP}px ${GAP}px round 999px)` },
  on: { clipPath: 'inset(0px 0px 0px 0px round 999px)' },
};
const label = {
  off: { x: 0, color: '#FBF9F6' },
  on: { x: TEXT_SHIFT, color: '#3F2B2E' },
};
const arrow = {
  off: { color: '#3F2B2E' },
  on: { color: '#FBF9F6' },
};

/**
 * Boton de cierre en forma de interruptor, como el de encendido de iOS.
 *
 * En reposo es una pildora con filete claro y un circulo a la izquierda con
 * una flecha. Al pasar el cursor (o al pulsar, o al llegar con el teclado)
 * el circulo se desliza hasta la derecha y se vuelve fucsia de Vanster, la
 * pildora se rellena de Blanc Brule detras de el y el texto se corre al hueco
 * que deja, en Noir des Terres.
 *
 * Todo va con muelles de Framer Motion, que parten del valor que hay en
 * pantalla: el gesto se puede deshacer a mitad. El hover de Framer ignora el
 * tacto, asi que en movil no se queda encendido tras tocar; alli el cambio lo
 * da la pulsacion. Con movimiento reducido no hay desplazamiento, solo el
 * cambio de color.
 */
export default function SwitchButton({ href, children }) {
  return (
    <motion.a
      href={href}
      initial="off"
      animate="off"
      whileHover="on"
      whileFocus="on"
      whileTap="on"
      className="relative inline-flex h-14 select-none items-center rounded-full border border-background text-background"
      style={{ width: WIDTH }}
    >
      <motion.span
        aria-hidden="true"
        variants={fill}
        transition={spring}
        className="absolute inset-0 rounded-full bg-background"
      />
      <motion.span
        aria-hidden="true"
        variants={knob}
        transition={spring}
        className="absolute z-10 grid place-items-center rounded-full"
        style={{ left: GAP, width: KNOB, height: KNOB }}
      >
        <motion.svg variants={arrow} transition={spring} viewBox="0 0 16 16" className="h-4 w-4" fill="none">
          <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.span>
      <motion.span
        variants={label}
        transition={spring}
        className="relative flex-1 pl-[62px] pr-6 text-center text-[15px] tracking-[0.15em] [font-variant-caps:all-small-caps]"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
