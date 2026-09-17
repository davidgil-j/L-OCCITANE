'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Button from '@/components/ui/Button';
import ClientLogo from '@/components/ui/ClientLogo';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';
import HeroMedia from '@/components/sections/HeroMedia';
import useHasScrolled from '@/components/animations/useHasScrolled';
import { EASE_CSS } from '@/components/animations/easing';

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
      className="relative isolate flex min-h-dvh items-center overflow-hidden px-6 py-16 md:py-24">
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

      <div className="relative mx-auto max-w-6xl text-center">
        <FadeIn>
          <ClientLogo invert className="mb-10" />
        </FadeIn>
        <MaskReveal
          as="h1"
          delay={0.1}
          className="font-serif text-[clamp(2.8rem,6.4vw,6rem)] uppercase leading-[0.95] tracking-tight text-background"
        >
          {titleStart}
          {accent && <em className="whitespace-nowrap font-body normal-case italic">{accent}</em>}
          {titleEnd}
        </MaskReveal>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 block h-px w-16 origin-center bg-background"
        />
        <FadeIn delay={0.2}>
          <p className="mx-auto mt-8 max-w-md text-lg text-background/85">
            {content?.subtitle ?? 'Subtítulo pendiente de contenido'}
          </p>
        </FadeIn>
        <FadeIn delay={0.3}>
          <div className="mt-10">
            <Button href="#agendas" variant="inverted">
              Ver la propuesta
            </Button>
          </div>
        </FadeIn>
      </div>

      {/* Indicador de scroll: linea de 40px cuyo trazo recorre el raíl en
          bucle. Estatico si el usuario pide movimiento reducido. Se desvanece
          con el primer scroll y no vuelve: a partir de ahi orienta la
          navegacion lateral. */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-10 flex justify-center transition-opacity duration-700 motion-reduce:transition-none ${
          hasScrolled ? 'opacity-0' : 'opacity-100'
        }`}
        style={{ transitionTimingFunction: EASE_CSS }}
      >
        <div className="h-10 w-px overflow-hidden bg-background/25">
          <motion.div
            className="h-full w-full bg-background"
            animate={shouldReduceMotion ? { y: 0 } : { y: ['-100%', '100%'] }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 2.4, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatDelay: 0.4 }
            }
          />
        </div>
      </div>
    </section>
  );
}
