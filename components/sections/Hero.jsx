import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';

export default function Hero({ content }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <h1 className="text-4xl font-serif md:text-6xl">
            {content?.title ?? 'Título pendiente de contenido de Yasmina'}
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-6 text-lg text-neutral-600">
            {content?.subtitle ?? 'Subtítulo pendiente de contenido'}
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-10">
            <Button href="#productos">Ver la propuesta</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
