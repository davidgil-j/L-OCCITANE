import ArchImage from '@/components/ui/ArchImage';
import ProductCredits from '@/components/ui/ProductCredits';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';

/**
 * 02 — Lo contrario de la 01: simetrica y serena. Nombre pequeno arriba,
 * imagen centrada y contenida, claim grande debajo, y mucho aire alrededor.
 */
export default function ProductCalendarios({ item, index, imageSrc, id }) {
  return (
    <section id={id} data-bg-tone="light" className="bg-background px-6 py-28 md:px-12 md:py-40">
      <article className="mx-auto max-w-3xl text-center">
        <h3 className="font-sans text-[11px] uppercase tracking-[0.14em] text-textMuted">
          {item.name}
        </h3>

        <ArchImage
          src={imageSrc}
          alt={item.name}
          sizes="(min-width: 768px) 352px, 70vw"
          fit="cover"
          className="mx-auto mt-14 aspect-[3/4] w-[min(70vw,22rem)]"
        />

        <MaskReveal
          as="p"
          className="mt-16 font-serif text-[clamp(2rem,4.6vw,4.5rem)] uppercase leading-[0.95] tracking-tight text-text"
        >
          {item.claim ?? item.name}
        </MaskReveal>

        <FadeIn delay={0.1}>
          <p className="mx-auto mt-10 max-w-md font-body text-base leading-relaxed text-text">
            {item.description}
          </p>
        </FadeIn>

        <ProductCredits index={index} audience={item.audience} className="mt-20" />
      </article>
    </section>
  );
}
