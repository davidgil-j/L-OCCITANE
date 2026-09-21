'use client';

import { useRef } from 'react';
import { animate, motion, useDragControls, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';

// Medidas fijas de la pildora: el recorrido del circulo depende de ellas.
const WIDTH = 200; // px, ancho total
const KNOB = 44; // px, diametro del circulo
const GAP = 6; // px, aire entre el circulo y el borde
const INNER = WIDTH - 2; // ancho dentro del filete de 1 px
const TRAVEL = INNER - GAP * 2 - KNOB; // lo que se desliza el circulo
const TEXT_SHIFT = -38; // el texto pasa al hueco que deja el circulo
const DRAG_THRESHOLD = 6; // px de arrastre a partir de los que ya no es un toque

// Muelle al estilo de Apple, sin rebote (como el resto del movimiento de la
// pagina) y reversible a mitad de
// camino (si se quita el cursor antes de acabar, vuelve desde donde este).
const spring = { type: 'spring', duration: 0.55, bounce: 0 };

/**
 * Boton de cierre en forma de interruptor, como el de encendido de iOS.
 *
 * En reposo es una pildora con filete claro y un circulo a la izquierda con
 * una flecha. Encendido, el circulo esta a la derecha y es fucsia de Vanster,
 * la pildora se rellena de Blanc Brule detras de el y el texto se corre al
 * hueco que deja, en Noir des Terres.
 *
 * Todo cuelga de una sola posicion, la del circulo (x), que se puede mover de
 * tres maneras, y todas llevan al mismo sitio:
 * - Raton: al pasar el cursor se enciende y al salir se apaga (solo aviso).
 * - Tocar o hacer clic: abre el correo, como cualquier enlace.
 * - Deslizar (dedo o raton): el circulo sigue al puntero en toda la pildora.
 *   Si se suelta pasada la mitad, o con un gesto rapido hacia la derecha,
 *   termina el recorrido y abre el correo; si no, vuelve a su sitio y no
 *   abre nada. En un telefono parece un interruptor, asi que deslizarlo
 *   tiene que funcionar.
 *
 * El arrastre solo toma el eje horizontal: el scroll vertical de la pagina
 * sigue funcionando al tocar el boton. Con movimiento reducido, los cambios
 * son instantaneos pero el arrastre sigue igual.
 */
export default function SwitchButton({ href, children }) {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const controls = useDragControls();
  const dragged = useRef(false);
  const opening = useRef(false);

  const p = useTransform(x, [0, TRAVEL], [0, 1], { clamp: true });
  const fillClip = useTransform(p, (v) => {
    const k = 1 - v;
    return `inset(${GAP * k}px ${(INNER - KNOB - GAP) * k}px ${GAP * k}px ${GAP * k}px round 999px)`;
  });
  // Los colores cambian en un tramo corto del recorrido: a mitad de camino no
  // hay rosas lavados ni grises sin contraste.
  const knobColor = useTransform(p, [0.35, 0.65], ['#FBF9F6', '#C40452']);
  const arrowColor = useTransform(p, [0.35, 0.65], ['#3F2B2E', '#FBF9F6']);
  const labelX = useTransform(p, [0, 1], [0, TEXT_SHIFT]);
  const labelColor = useTransform(p, [0.4, 0.6], ['#FBF9F6', '#3F2B2E']);

  const moveTo = (target) => animate(x, target, shouldReduceMotion ? { duration: 0 } : spring);

  const open = () => {
    opening.current = true;
    moveTo(TRAVEL).then(() => {
      window.location.href = href;
      // La pagina se queda abierta detras del correo: vuelve a reposo.
      setTimeout(() => {
        opening.current = false;
        moveTo(0);
      }, 900);
    });
  };

  const onDragEnd = (_, info) => {
    if (x.get() > TRAVEL / 2 || info.velocity.x > 500) open();
    else moveTo(0);
  };

  return (
    <motion.a
      href={href}
      className="relative inline-flex h-14 touch-pan-y select-none items-center rounded-full border border-background text-background"
      style={{ width: WIDTH }}
      onHoverStart={() => !opening.current && moveTo(TRAVEL)}
      onHoverEnd={() => !opening.current && moveTo(0)}
      // Solo con teclado: al tocar o hacer clic el foco no debe dejarlo encendido.
      onFocus={(e) => e.currentTarget.matches(':focus-visible') && moveTo(TRAVEL)}
      onBlur={() => !opening.current && moveTo(0)}
      onPointerDown={(e) => {
        dragged.current = false;
        controls.start(e);
      }}
      onClick={(e) => {
        // Tras un arrastre no se navega con el clic: decide onDragEnd.
        if (dragged.current) e.preventDefault();
      }}
      draggable={false}
    >
      <motion.span
        aria-hidden="true"
        className="absolute -inset-px rounded-full bg-background"
        style={{ clipPath: fillClip }}
      />
      <motion.span
        aria-hidden="true"
        drag="x"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{ left: 0, right: TRAVEL }}
        dragElastic={0.04}
        dragMomentum={false}
        onDrag={(_, info) => {
          if (Math.abs(info.offset.x) > DRAG_THRESHOLD) dragged.current = true;
        }}
        onDragEnd={onDragEnd}
        className="absolute z-10 grid place-items-center rounded-full"
        style={{ left: GAP, width: KNOB, height: KNOB, x, backgroundColor: knobColor, color: arrowColor }}
      >
        <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
          <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.span>
      <motion.span
        className="relative flex-1 pl-[62px] pr-6 text-center text-[15px] tracking-[0.15em] [font-variant-caps:all-small-caps]"
        style={{ x: labelX, color: labelColor }}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
