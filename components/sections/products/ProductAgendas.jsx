import ArchImage from '@/components/ui/ArchImage';
import ProductCredits from '@/components/ui/ProductCredits';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';

/**
 * 01 — Composicion asimetrica. La imagen ocupa 7 de 12 columnas a la
 * izquierda y el titular arranca en la 5, de modo que invade su borde
 * derecho. En movil no hay solape: imagen, titular y descripcion apilados.
 */
export default function ProductAgendas({ item, index, imageSrc, id }) {
  return (
    <section id={id} className="bg-background px-6 py-24 md:px-12 md:py-32">
      <article className="mx-auto max-w-6xl">
        <div className="md:grid md:grid-cols-12 md:items-center">
          <FadeIn className="md:col-start-1 md:col-end-8 md:row-start-1">
            <ArchImage
              src={imageSrc}
              alt={item.name}
              sizes="(min-width: 768px) 60vw, 100vw"
              fit="cover"
              className="aspect-[4/5] w-full"
            />
          </FadeIn>
          <MaskReveal
            as="h3"
            className="relative z-10 mt-8 font-serif text-[clamp(2.6rem,6vw,6rem)] uppercase leading-[0.9] tracking-tight text-text md:col-start-7 md:col-end-13 md:row-start-1 md:mt-0 md:self-end md:pb-16"
          >
            {item.name}
          </MaskReveal>
        </div>

        <FadeIn delay={0.1}>
          <p className="mt-8 font-body text-base leading-relaxed text-text md:ml-auto md:mt-12 md:max-w-sm md:text-right">
            {item.description}
          </p>
        </FadeIn>

        <ProductCredits index={index} audience={item.audience} className="mt-12 md:mt-16" />
      </article>
    </section>
  );
}
