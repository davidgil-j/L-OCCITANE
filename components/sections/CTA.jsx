import Button from '@/components/ui/Button';

export default function CTA({ content }) {
  return (
    <section className="bg-brand px-6 py-20 text-center text-background md:py-28">
      <h2 className="mx-auto max-w-xl font-serif text-3xl">
        {content?.title ?? 'Llamada a la acción pendiente de contenido'}
      </h2>
      <div className="mt-8">
        <Button href={content?.href ?? '#'} variant="inverse">
          {content?.buttonLabel ?? 'Hablemos'}
        </Button>
      </div>
    </section>
  );
}
