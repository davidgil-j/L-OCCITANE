'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import MarbleTitle from '@/components/sections/MarbleTitle';
import Lockup from '@/components/ui/Lockup';
import useHasScrolled from '@/components/animations/useHasScrolled';
import { EASE, EASE_CSS } from '@/components/animations/easing';

export default function Hero({ content }) {
  const shouldReduceMotion = useReducedMotion();
  const hasScrolled = useHasScrolled();

  return (
    <section id="inicio" data-bg-tone="dark" className="relative isolate min-h-dvh overflow-hidden px-6">
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

      <div className="absolute inset-x-6 top-8 flex justify-center md:top-10">
        <Lockup className="text-background" />
      </div>

      {/* El titular va sobre el cielo, que ocupa la mitad superior de la foto. */}
      <div className="absolute inset-x-6 top-[26%] -translate-y-1/2">
        <MarbleTitle title={content?.title ?? ''} accent={content?.titleAccent} />
      </div>

      {/* Marca de scroll: etiqueta y capsula con un punto que baja en bucle,
          para que se vea sin dudas que hay que bajar. Hace de boton hacia la
          primera ficha y se desvanece con el primer scroll; a partir de ahi
          orienta la navegacion lateral. */}
      <a
        href="#agendas"
        tabIndex={hasScrolled ? -1 : undefined}
        className={`absolute bottom-8 left-1/2 flex w-max -translate-x-1/2 flex-col items-center gap-3 text-background transition-opacity duration-700 motion-reduce:transition-none ${
          hasScrolled ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
        style={{ transitionTimingFunction: EASE_CSS }}
      >
        <span className="whitespace-nowrap font-sans text-xs uppercase tracking-[0.18em]">Descubre la propuesta</span>
        <span
          aria-hidden="true"
          className="flex h-9 w-[22px] justify-center rounded-full border border-background/80 pt-[7px]"
        >
          <motion.span
            className="block h-1.5 w-[3px] rounded-full bg-background"
            animate={shouldReduceMotion ? undefined : { y: [0, 10], opacity: [1, 0] }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 1.6, ease: EASE, repeat: Infinity, repeatDelay: 0.3 }
            }
          />
        </span>
      </a>
    </section>
  );
}
