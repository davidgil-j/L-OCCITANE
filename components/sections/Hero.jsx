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
    <section className="px-6 pb-28 pt-16 md:pb-40 md:pt-24">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div
            className="relative h-[38vh] bg-backgroundAlt md:h-[54vh]"
            style={{ clipPath: 'url(#provencal-arch)', WebkitClipPath: 'url(#provencal-arch)' }}
          >
            <Parallax offset={12}>
              <Image
                src="/images/hero.jpeg"
                alt="Campo de lavanda al atardecer en Haute-Provence"
                fill
                priority
                sizes="(min-width: 768px) 900px, 100vw"
                className="object-cover"
              />
            </Parallax>
          </div>
        </FadeIn>

        <div className="mx-auto mt-16 max-w-2xl text-center">
          <FadeIn>
            <ClientLogo className="mb-10" />
          </FadeIn>
          <MaskReveal
            as="h1"
            delay={0.1}
            className="font-serif text-4xl uppercase leading-[1.1] tracking-tight text-text md:text-6xl"
          >
            {content?.title ?? 'Título pendiente de contenido de Yasmina'}
          </MaskReveal>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 block h-px w-16 origin-center bg-brand"
          />
          <FadeIn delay={0.2}>
            <p className="mx-auto mt-8 max-w-md text-lg text-textMuted">
              {content?.subtitle ?? 'Subtítulo pendiente de contenido'}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-10">
              <Button href="#productos">Ver la propuesta</Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
