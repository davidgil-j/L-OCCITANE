'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import MarbleSurface from '@/components/ui/MarbleSurface';

const MARBLE = '/images/brand/vanster-marmol-cierre.jpg';
const RADIUS = 12; // px, el mismo redondeo que la ventana en escritorio
// Tramo de la apertura, en fracciones de la altura de pantalla: empieza cuando
// la ventana esta entera a la vista (su borde inferior al 85 %) y termina
// cuando el cierre ha subido hasta el 40 %, para que el titular del cierre
// llegue ya sobre el marmol.
const OPEN_FROM = 0.85;
const OPEN_TO = 0.4;

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * El paso de "Quienes somos" al cierre: la ventana de marmol se abre hasta ser
 * el fondo del contacto.
 *
 * Hay una sola capa de marmol, fija a la pantalla (sticky), por debajo del
 * texto de "Quienes somos" y del contenido del cierre. Mientras se lee la
 * seccion fucsia, esa capa esta recortada exactamente a la ventana
 * (data-marble-window): la ventana se mueve con el scroll y el marmol se queda
 * quieto detras, como una ventana de verdad. Al llegar el cierre, el recorte
 * se abre con aceleracion y frenada suaves hasta cubrir toda la pantalla, y
 * esa misma capa es ya el fondo del contacto y del pie. Al no haber dos
 * marmoles, no hay empalme que se note.
 *
 * El recorte se calcula en cada fotograma de scroll con las posiciones reales
 * de la ventana, la capa y el cierre (lectura primero, escritura despues, un
 * solo requestAnimationFrame por fotograma).
 *
 * Con movimiento reducido, antes de montarse y sin JavaScript, se pinta lo de
 * siempre: la ventana con su imagen y el cierre sobre MarbleSurface.
 */
export default function MarbleClosing({ top, children }) {
  const shouldReduceMotion = useReducedMotion();
  const [on, setOn] = useState(false);
  const layerRef = useRef(null);
  const veilRef = useRef(null);
  const closingRef = useRef(null);

  useEffect(() => {
    setOn(!shouldReduceMotion && CSS.supports('clip-path', 'inset(0px round 1px)'));
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!on) return;
    const layer = layerRef.current;
    const closing = closingRef.current;
    const win = document.querySelector('[data-marble-window]');
    if (!layer || !closing || !win) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const L = layer.getBoundingClientRect();
      const W = win.getBoundingClientRect();
      const C = closing.getBoundingClientRect();
      const vh = window.innerHeight;
      // La distancia entre la ventana y el cierre no cambia con el scroll.
      const gap = C.top - W.bottom;
      const from = vh * OPEN_FROM;
      const to = vh * OPEN_TO - gap;
      const raw = Math.min(1, Math.max(0, (from - W.bottom) / (from - to)));
      const e = easeInOutCubic(raw);
      // El velo del cierre aparece a la vez: la ventana mantiene su color.
      veilRef.current.style.opacity = e;
      // Al final de la curva se suelta el recorte: si no, quedaban unos
      // pixeles de fucsia en los bordes.
      if (e > 0.985) {
        layer.style.clipPath = 'none';
        return;
      }
      const k = 1 - e;
      const t = (W.top - L.top) * k;
      const r = (L.right - W.right) * k;
      const b = (L.bottom - W.bottom) * k;
      const l = (W.left - L.left) * k;
      const radius = parseFloat(getComputedStyle(win).borderTopLeftRadius) || RADIUS;
      layer.style.clipPath = `inset(${t}px ${r}px ${b}px ${l}px round ${radius * k}px)`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(win);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
    };
  }, [on]);

  if (!on) {
    return (
      <>
        {top}
        <MarbleSurface>{children}</MarbleSurface>
      </>
    );
  }

  return (
    // En este modo "Quienes somos" pierde su fondo (lo pone este contenedor) y
    // queda por encima de la capa de marmol: la ventana se abre por detras
    // del texto, sin taparlo. La imagen fija de la ventana se oculta: lo que
    // se ve por ella es la capa.
    <div className="relative bg-vanster [&_#nosotros]:relative [&_#nosotros]:z-[15] [&_#nosotros]:bg-transparent [&_[data-marble-window]_img]:opacity-0">
      {/* La capa de marmol: fija a la pantalla durante todo el tramo final.
          Mide lo mismo que la pantalla grande del movil (lvh), para que al
          esconderse la barra del navegador no quede un hueco por debajo. */}
      <div
        ref={layerRef}
        aria-hidden="true"
        data-print="hide"
        className="pointer-events-none sticky top-0 z-10 -mb-[100lvh] h-lvh overflow-hidden"
        style={{ clipPath: 'inset(50%)' }}
      >
        <div className="absolute inset-0">
          <Image src={MARBLE} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div ref={veilRef} className="absolute inset-0 bg-brand/55" style={{ opacity: 0 }} />
      </div>
      {top}
      <div ref={closingRef} className="relative z-20">
        {children}
      </div>
    </div>
  );
}
