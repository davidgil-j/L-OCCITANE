'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import ClientLogo from '@/components/ui/ClientLogo';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';
import Parallax from '@/components/animations/Parallax';

export default function Hero({ content }) {
  return (
    <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden px-6 py-28 md:py-40">
      <Parallax offset={20}>
        <Image
          src="/images/hero.jpeg"
          alt="Campo de lavanda al atardecer en Haute-Provence"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </Parallax>
      {/* Velo plano (un unico efecto, sin gradiente) para que el texto claro sea legible sobre la foto */}
      <div className="absolute inset-0 bg-brand/45" />

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
