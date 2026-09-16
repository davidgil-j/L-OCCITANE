import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';
import Button from '@/components/ui/Button';

export default function CTA({ content }) {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-xl text-center">
        <MaskReveal
          as="h2"
          className="font-serif text-3xl uppercase tracking-tight text-text md:text-4xl"
        >
          {content?.title}
        </MaskReveal>
        <FadeIn delay={0.15}>
          <div className="mt-10">
            <Button href={content?.href ?? '#'}>{content?.buttonLabel}</Button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
