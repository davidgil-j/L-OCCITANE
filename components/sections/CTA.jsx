import FadeIn from '@/components/animations/FadeIn';
import Button from '@/components/ui/Button';

export default function CTA({ content }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <FadeIn>
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-3xl uppercase tracking-tight text-text md:text-4xl">
            {content?.title}
          </h2>
          <div className="mt-10">
            <Button href={content?.href ?? '#'}>{content?.buttonLabel}</Button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
