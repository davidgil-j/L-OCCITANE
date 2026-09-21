'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const FAINT = 0.14; // opacidad de las palabras aun sin "escribir"

/**
 * Parrafo que se va escribiendo a medida que se baja: las palabras empiezan
 * muy tenues y se encienden una a una ligadas al scroll (si se sube, se
 * apagan otra vez). Empieza cuando el parrafo asoma por abajo (85 % de la
 * pantalla) y termina cuando su final llega a la mitad.
 *
 * Rendimiento: una sola variable CSS por parrafo (--p, de 0 a 1), escrita en
 * un requestAnimationFrame por fotograma de scroll. Cada palabra calcula su
 * opacidad en CSS con su indice (--i) y el total (--n): sin un valor animado
 * por palabra, que con cientos de palabras pesaba en movil.
 *
 * El texto esta completo en el HTML (buscadores, lectores de pantalla,
 * copiar). Hasta montarse, con movimiento reducido, sin JavaScript y al
 * imprimir se ve entero.
 */
export default function ScrollWrite({ text, className = '' }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [on, setOn] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    if (shouldReduceMotion) return;
    setOn(true);
    const el = ref.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85; // top del parrafo aqui: p = 0
      const end = vh * 0.5; // bottom del parrafo aqui: p = 1
      const total = start - end + r.height;
      const p = Math.min(1, Math.max(0, (start - r.top) / total));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [shouldReduceMotion]);

  return (
    <p ref={ref} className={`${on ? 'scroll-write' : ''} ${className}`} style={{ '--n': words.length, '--faint': FAINT }}>
      {words.map((word, i) => (
        <span key={i} style={{ '--i': i }}>
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}
