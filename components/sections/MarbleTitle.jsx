'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';

const CLIP_ID = 'titulo-marmol-clip';
const FONT_SIZE = 100; // unidades del sistema de coordenadas del SVG
const LINE_HEIGHT = 0.95;
const PAD = 6; // margen alrededor del texto medido, para no cortar la cursiva

/** Parte el titular en dos lineas: la primera termina en el acento en cursiva. */
function toLines(title, accent) {
  if (!accent || !title.includes(accent)) return [[{ text: title.toLocaleUpperCase('es') }]];
  const [before, after] = title.split(accent);
  return [
    [{ text: before.toLocaleUpperCase('es') }, { text: accent, accent: true }],
    [{ text: after.trim().toLocaleUpperCase('es') }],
  ];
}

function TitleText({ lines, textRef, ...props }) {
  return (
    <text
      ref={textRef}
      textAnchor="middle"
      fontSize={FONT_SIZE}
      className="font-serif"
      style={{ letterSpacing: '-0.025em' }}
      {...props}
    >
      {lines.map((line, i) => (
        <tspan key={i} x="0" dy={i === 0 ? 0 : FONT_SIZE * LINE_HEIGHT}>
          {line.map((part, j) =>
            part.accent ? (
              <tspan key={j} className="font-body italic">
                {part.text}
              </tspan>
            ) : (
              part.text
            ),
          )}
        </tspan>
      ))}
    </text>
  );
}

/**
 * Titular del hero con el marmol de Vanster fluyendo dentro de las letras.
 *
 * Tecnica: el texto vive en un <clipPath> de SVG que recorta un contenedor
 * HTML con el video dentro. Se usa clipPath y no <mask> porque una mascara SVG
 * aplicada a contenido HTML no funciona en Chrome ni en Safari; el recorte si,
 * en todos (es la misma tecnica que los arcos de la pagina).
 *
 * El texto se mide una vez cargadas las fuentes y el contenedor toma
 * exactamente esa proporcion, asi que el titular escala sin deformarse. El
 * recorte trabaja en pixeles reales del contenedor (userSpaceOnUse), no en
 * unidades relativas: con objectBoundingBox el texto se dibujaba a una
 * fraccion de unidad antes de escalar y Safari lo descartaba por diminuto,
 * dejando el titular invisible. Cada cambio de ancho genera un id de recorte
 * nuevo: Safari no repinta cuando cambia el contenido de un clipPath en uso.
 *
 * Que se ve dentro de las letras:
 * - escritorio: el video del marmol en bucle;
 * - movil o movimiento reducido: un fotograma fijo del mismo marmol (en movil
 *   el video seria peso muerto);
 * - navegador sin recorte SVG: el titular en Blanc Brule plano.
 * El texto real va siempre en el h1 para lectores de pantalla y buscadores.
 */
export default function MarbleTitle({ title, accent }) {
  const measureRef = useRef(null);
  const boxRef = useRef(null);
  const [width, setWidth] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const [box, setBox] = useState(null);
  const [supported, setSupported] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const lines = toLines(title, accent);

  useEffect(() => {
    setSupported(CSS.supports('clip-path', 'url(#a)') || CSS.supports('-webkit-clip-path', 'url(#a)'));

    const query = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled || !measureRef.current) return;
      const b = measureRef.current.getBBox();
      setBox({
        x: b.x - PAD,
        y: b.y - PAD,
        w: b.width + PAD * 2,
        h: b.height + PAD * 2,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [title, accent]);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    observer.observe(el);
    return () => observer.disconnect();
  }, [supported]);

  const showVideo = isDesktop && !shouldReduceMotion;
  const ready = box && width > 1;
  const clipId = `${CLIP_ID}-${width}`;

  return (
    <>
      {/* Fuera del h1: el texto de medicion y el del recorte no deben contar
          como contenido del titular. */}
      <svg aria-hidden="true" width="0" height="0" className="absolute">
        <TitleText lines={lines} textRef={measureRef} visibility="hidden" />
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
            {ready && (
              <TitleText
                lines={lines}
                transform={`scale(${width / box.w}) translate(${-box.x} ${-box.y})`}
              />
            )}
          </clipPath>
        </defs>
      </svg>
      <h1>
        <span
          className={
            supported
              ? 'sr-only'
              : 'block text-balance font-serif text-[clamp(2.25rem,5.6vw,4.5rem)] uppercase leading-[0.95] tracking-tight text-background'
          }
        >
          {title}
        </span>

        {supported && (
          <span aria-hidden="true" className="block">
            <span
              ref={boxRef}
              className="relative mx-auto block max-w-full"
              style={{
                '--title-size': 'clamp(2.25rem, 5.6vw, 4.5rem)',
                width: box ? `calc(${box.w / FONT_SIZE} * var(--title-size))` : '1px',
                aspectRatio: box ? `${box.w} / ${box.h}` : '1 / 1',
                clipPath: ready ? `url(#${clipId})` : 'inset(50%)',
                WebkitClipPath: ready ? `url(#${clipId})` : 'inset(50%)',
                opacity: ready ? 1 : 0,
              }}
            >
              <Image
                src="/images/titulo-marmol.jpg"
                alt=""
                fill
                sizes="(min-width: 768px) 60vw, 90vw"
                className="object-cover"
              />
              {showVideo && (
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src="/videos/titulo-marmol.mp4" type="video/mp4" />
                </video>
              )}
              {/* Velo magenta dentro de las letras: las vetas claras del marmol se
                fundian con el cielo palido y algunas letras perdian el borde.
                En magenta pasan a rosa y recortan contra el cielo sin apagar el
                marmol, que con Noir des Terres se volvia marron. */}
              <span className="absolute inset-0 bg-vanster/25" />
              {/* Un 5% de Noir des Terres, calido, para que el marmol recorte algo
                  mas contra el cielo claro sin perder los tonos de Vanster. */}
              <span className="absolute inset-0 bg-brand/5" />
            </span>
          </span>
        )}
      </h1>
    </>
  );
}
