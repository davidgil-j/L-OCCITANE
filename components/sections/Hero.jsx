'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import ClientLogo from '@/components/ui/ClientLogo';

export default function Hero({ content }) {
  return (
    <section className="px-6 py-28 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-2xl text-center"
      >
        <ClientLogo className="mb-10" />
        <h1 className="font-serif text-4xl leading-[1.1] text-text md:text-6xl">
          {content?.title ?? 'Título pendiente de contenido de Yasmina'}
        </h1>
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 block h-px w-16 origin-center bg-brand"
        />
        <p className="mx-auto mt-8 max-w-md text-lg text-textMuted">
          {content?.subtitle ?? 'Subtítulo pendiente de contenido'}
        </p>
        <div className="mt-10">
          <Button href="#productos">Ver la propuesta</Button>
        </div>
      </motion.div>
    </section>
  );
}
