import Button from '@/components/ui/Button';

export default function CTA({ content }) {
  return (
    <section className="bg-brand px-6 py-20 text-center text-white">
      <h2 className="text-3xl font-serif">
        {content?.title ?? 'Llamada a la acción pendiente de contenido'}
      </h2>
      <div className="mt-8">
        <Button href={content?.href ?? '#'} variant="secondary">
          {content?.buttonLabel ?? 'Hablemos'}
        </Button>
      </div>
    </section>
  );
}
