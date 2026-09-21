'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { EASE } from '@/components/animations/easing';
import { REVEAL_VIEWPORT } from '@/components/animations/viewport';

/**
 * Parrafo que entra linea a linea, cada una tras su propia mascara vertical
 * (sube desde translateY(100%) dentro de un contenedor overflow-hidden). Sin
 * fundido de opacidad.
 *
 * Las lineas son las reales de la maquetacion: se miden sobre una copia
 * invisible del parrafo, palabra a palabra, una vez cargadas las fuentes, y
 * se vuelven a medir si cambia el ancho. Hasta medir se pinta el texto
 * corrido, que es lo que ve quien no tenga JavaScript.
 *
 * `mutedFrom` (opcional): a partir de esa palabra el texto va en el tono
 * secundario (`mutedClassName`), para las frases en dos tonos.
 */
export default function RevealLines({
  text,
  as: Tag = 'p',
  className = '',
  stagger = 0.08,
  mutedFrom = Infinity,
  mutedClassName = 'text-textMuted',
}) {
  const ref = useRef(null);
  const measureRef = useRef(null);
  const [lines, setLines] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const inView = useInView(ref, REVEAL_VIEWPORT);
  const words = text.split(' ');
  // Palabras de un tramo, con el tono secundario donde toque.
  const renderWords = (indices) =>
    indices.map((i, k) => (
      <span key={i} className={i >= mutedFrom ? mutedClassName : undefined}>
        {words[i]}
        {k < indices.length - 1 ? ' ' : ''}
      </span>
    ));

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const measure = () => {
      const groups = [];
      let lastTop = null;
      [...el.children].forEach((span, i) => {
        const top = span.offsetTop;
        if (lastTop === null || Math.abs(top - lastTop) > 2) groups.push([]);
        groups[groups.length - 1].push(i);
        lastTop = top;
      });
      setLines(groups);
    };

    let width = 0;
    const observer = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width);
      if (w !== width) {
        width = w;
        measure();
      }
    });
    document.fonts.ready.then(() => {
      measure();
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, [text]);

  useEffect(() => {
    if (!inView || !lines) return;
    const t = setTimeout(() => setRevealed(true), (0.8 + lines.length * stagger) * 1000);
    return () => clearTimeout(t);
  }, [inView, lines, stagger]);

  return (
    <div className="relative">
      <Tag ref={ref} className={className}>
        {lines
          ? lines.map((line, i) => (
              <span key={`${i}-${line.join('-')}`} className="block overflow-hidden">
                <motion.span
                  data-reveal
                  className="block"
                  initial={revealed ? false : { y: '100%' }}
                  animate={inView ? { y: 0 } : undefined}
                  transition={{ duration: 0.8, delay: i * stagger, ease: EASE }}
                >
                  {renderWords(line)}
                  {/* Espacio al final de cada linea: sin el, el texto (y los
                      lectores de pantalla) pegaba la ultima palabra de una
                      linea con la primera de la siguiente. */}
                  {i < lines.length - 1 ? ' ' : ''}
                </motion.span>
              </span>
            ))
          : renderWords(words.map((_, i) => i))}
      </Tag>
      {/* Copia invisible con la misma tipografia y ancho, solo para medir. */}
      <Tag
        ref={measureRef}
        aria-hidden="true"
        className={`pointer-events-none invisible absolute inset-x-0 top-0 ${className}`}
      >
        {words.map((word, i) => (
          <span key={i}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Tag>
    </div>
  );
}
