'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { EASE_CSS } from '@/components/animations/easing';

const STEP_MS = 28;

/**
 * Parrafo que aparece palabra a palabra al entrar en pantalla: cada palabra
 * sube un tercio de linea y aparece, con 28 ms de retardo respecto a la
 * anterior. Es la misma idea que el texto de "Quienes somos" de EvoMeet, sin
 * el desenfoque: animar un filtro en cada palabra es caro y la guia de marca
 * no usa desenfoques.
 *
 * Lo que va entre *asteriscos* (una palabra o varias) va en cursiva magenta.
 *
 * Las palabras solo se esconden una vez montado el componente, asi que sin
 * JavaScript el texto se ve entero. Se anima con transiciones CSS (transform
 * y opacidad), no con un bucle por palabra. Con movimiento reducido aparece
 * todo de golpe.
 */
export default function WordReveal({ text, className = '', delay = 0 }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;
    setArmed(true);
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldReduceMotion]);

  const hidden = armed && !visible;
  // Marca que palabras caen dentro de un tramo entre asteriscos.
  let open = false;
  const words = text.split(' ').map((raw) => {
    const starts = raw.startsWith('*');
    const ends = /\*[.,:;]?$/.test(raw);
    const accent = open || starts;
    open = accent && !ends;
    return { word: raw.replace(/\*/g, ''), accent };
  });

  return (
    <p ref={ref} className={className}>
      {words.map(({ word, accent }, i) => {
        return (
          <span key={i}>
            <span
              className={`inline-block transition-[opacity,transform] duration-700 motion-reduce:transition-none ${
                accent ? 'font-body italic text-vanster' : ''
              } ${hidden ? 'translate-y-[0.34em] opacity-0' : 'translate-y-0 opacity-100'}`}
              style={{ transitionDelay: `${delay + i * STEP_MS}ms`, transitionTimingFunction: EASE_CSS }}
            >
              {word}
            </span>
            {i < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </p>
  );
}
