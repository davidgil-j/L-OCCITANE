'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import MarbleTitle from '@/components/sections/MarbleTitle';
import useHasScrolled from '@/components/animations/useHasScrolled';
import { EASE, EASE_CSS } from '@/components/animations/easing';

export default function Hero({ content }) {
  const shouldReduceMotion = useReducedMotion();
  const hasScrolled = useHasScrolled();
  const heroRef = useRef(null);

  // Al salir, la foto se retira: se encoge hacia arriba, se despega de los
  // bordes y se le redondean las esquinas, como una tarjeta que se aleja
  // sobre el Blanc Brule de la pagina. Es el gesto inverso al del marmol del
  // cierre (alli la ventana se abre; aqui se cierra). Solo transform y
  // border-radius, ligados al scroll; con movimiento reducido, quieta.
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const eased = useTransform(scrollYProgress, (v) => 1 - (1 - Math.min(1, v * 1.15)) ** 2);
  const scale = useTransform(eased, [0, 1], [1, 0.86]);
  const radius = useTransform(eased, [0, 1], [0, 36]);
  const retreat = shouldReduceMotion ? undefined : { scale, borderRadius: radius, transformOrigin: '50% 0%' };

  return (
    <motion.section
      ref={heroRef}
      id="inicio"
      data-bg-tone="dark"
      className="relative isolate min-h-svh overflow-hidden px-6 print:!transform-none"
      style={retreat}
    >
      <Image
        src="/images/imagen_estatica_lavanda.png"
        alt="Campo de lavanda al atardecer en Haute-Provence"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[28%_center] md:object-center"
      />
      {/* Vineteado en un solo color, Noir des Terres, que solo oscurece los
          bordes: no es un degradado entre colores. Algo mas arriba, donde el
          cielo es claro, para que el rotulo pequeno se lea. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: [
            'linear-gradient(to bottom, rgb(63 43 46 / 0.6), rgb(63 43 46 / 0) 18%)',
            'radial-gradient(ellipse 80% 75% at 50% 45%, rgb(63 43 46 / 0) 55%, rgb(63 43 46 / 0.45) 100%)',
          ].join(', '),
        }}
      />

      {/* El rotulo L'OCCITANE × VÄNSTER lo pone la cabecera fija (SiteHeader):
          arriba del todo esta en la parte baja del hero, encima de la marca
          de scroll, y al hacer scroll sube con la pagina hasta la isla. */}

      {/* El titular va sobre el cielo, que ocupa la mitad superior de la foto. */}
      <div data-hero-title className="absolute inset-x-6 top-[26%] -translate-y-1/2">
        <MarbleTitle title={content?.title ?? ''} accent={content?.titleAccent} />
      </div>

      {/* Marca de scroll: etiqueta y una linea de 40 px por la que baja un
          trazo en bucle, como una gota que cae. Hace de boton hacia la primera
          ficha y se desvanece con el primer scroll. Estatica con movimiento
          reducido. */}
      <a
        href="#agendas"
        data-print="hide"
        tabIndex={hasScrolled ? -1 : undefined}
        className={`absolute bottom-8 left-1/2 flex w-max [@media(max-height:480px)]:hidden -translate-x-1/2 flex-col items-center gap-4 text-background transition-opacity duration-700 motion-reduce:transition-none ${
          hasScrolled ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        style={{ transitionTimingFunction: EASE_CSS }}
      >
        <span className="whitespace-nowrap font-sans text-xs uppercase tracking-[0.18em]">Descubre la propuesta</span>
        <span aria-hidden="true" className="block h-10 w-px overflow-hidden bg-background/30">
          <motion.span
            className="block h-full w-full origin-top bg-background"
            initial={{ y: '-100%' }}
            animate={shouldReduceMotion ? { y: 0 } : { y: ['-100%', '100%'] }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { duration: 2, ease: EASE, repeat: Infinity, repeatDelay: 0.5 }
            }
          />
        </span>
      </a>
    </motion.section>
  );
}
