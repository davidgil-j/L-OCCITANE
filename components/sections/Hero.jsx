'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Button from '@/components/ui/Button';
import ClientLogo from '@/components/ui/ClientLogo';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';
import Parallax from '@/components/animations/Parallax';
import HeroMedia from '@/components/sections/HeroMedia';

export default function Hero({ content }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden px-6 py-28 md:py-40">
      <Parallax offset={20}>
        <HeroMedia reduceMotion={shouldReduceMotion} />
      </Parallax>
      {/* Gradiente (reemplaza el velo plano anterior): oscurece el borde
          superior e inferior para legibilidad y deja el centro del vídeo
          casi sin tapar, para que se vea el color natural de la lavanda. */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand/60 via-brand/15 to-brand/65" />

      <div className="relative mx-auto max-w-2xl text-center">
        <FadeIn>
          <ClientLogo invert className="mb-10" />
        </FadeIn>
        <MaskReveal
          as="h1"
          delay={0.1}
          className="font-serif text-4xl uppercase leading-[1.1] tracking-tight text-background md:text-6xl"
        >
          {content?.title ?? 'Título pendiente de contenido de Yasmina'}
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
            <Button href="#productos" variant="inverted">
              Ver la propuesta
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
