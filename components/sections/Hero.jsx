'use client';

import { motion, useReducedMotion } from 'framer-motion';
import ClientLogo from '@/components/ui/ClientLogo';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';
import HeroMedia from '@/components/sections/HeroMedia';
import useHasScrolled from '@/components/animations/useHasScrolled';
import { EASE, EASE_CSS } from '@/components/animations/easing';

export default function Hero({ content }) {
  const shouldReduceMotion = useReducedMotion();
  const hasScrolled = useHasScrolled();
  const title = content?.title ?? 'Título pendiente de contenido de Yasmina';
  const accent = content?.titleAccent;
  const [titleStart, titleEnd] = accent ? title.split(accent) : [title, ''];

  return (
    <section
      id="inicio"
      data-bg-tone="dark"
      className="relative isolate flex min-h-dvh items-center overflow-hidden px-6 pb-28 pt-16 md:pb-32 md:pt-24"
    >
      {/* Sin Parallax: un transform ligado al scroll necesita un margen de
          desbordamiento "suficientemente grande" que nunca esta garantizado
          (zoom del navegador, rebote de scroll en iOS...). Anclado con
          inset-0 es geometricamente imposible que deje un hueco. */}
      <HeroMedia />
      {/* Velo neutro y plano, solo para que el titular se lea sobre el
          marmol. Nada de magenta aqui: la firma de Vanster ya esta en el
          cielo del video, y un velo magenta tenia tambien la lavanda.
          Las opacidades van de cinco en cinco: la escala de Tailwind no
          genera CSS para valores intermedios y la capa quedaria invisible. */}
      <div className="absolute inset-0 bg-brand/40" />

      <div className="relative mx-auto max-w-5xl text-center">
        <FadeIn>
          <ClientLogo invert className="mb-8" />
        </FadeIn>
        <MaskReveal
          as="h1"
          delay={0.1}
          className="text-balance font-serif text-[clamp(2.25rem,4.4vw,4rem)] uppercase leading-[0.95] tracking-tight text-background"
        >
          {titleStart}
          {accent && <em className="whitespace-nowrap font-body normal-case italic">{accent}</em>}
          {titleEnd}
        </MaskReveal>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="mx-auto mt-7 block h-px w-14 origin-center bg-background"
        />
        <FadeIn delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-pretty text-base leading-relaxed text-background/85 md:text-lg">
            {content?.subtitle ?? 'Subtítulo pendiente de contenido'}
          </p>
        </FadeIn>
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
