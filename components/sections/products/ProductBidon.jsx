import ArchImage from '@/components/ui/ArchImage';
import ProductCredits from '@/components/ui/ProductCredits';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';

/**
 * 03 — Corta el ritmo a mitad del recorrido: unica ficha sobre Beige
 * en lugar de Blanc Brule. Imagen a la derecha, texto a la
 * izquierda alineado abajo.
 */
export default function ProductBidon({ item, index, imageSrc, id }) {
  return (
    <section id={id} data-bg-tone="light" className="bg-vansterPalido px-6 py-24 md:px-12 md:py-32">
      <article className="mx-auto max-w-6xl">
        <div className="md:grid md:grid-cols-12 md:items-end md:gap-12">
          <div className="md:col-start-7 md:col-end-13 md:row-start-1">
            <ArchImage
              src={imageSrc}
              alt={item.name}
              sizes="(min-width: 768px) 45vw, 100vw"
              fit="cover"
              className="aspect-[4/5] w-full"
            />
          </div>

          <div className="mt-10 md:col-start-1 md:col-end-6 md:row-start-1 md:mt-0 md:self-end md:pb-4">
            <MaskReveal
              as="h3"
              className="font-serif text-[clamp(2.6rem,5.5vw,5rem)] uppercase leading-[0.9] tracking-tight text-text"
            >
              {item.name}
            </MaskReveal>
            <FadeIn delay={0.1}>
              <p className="mt-8 font-body text-base leading-relaxed text-text">
                {item.description}
              </p>
            </FadeIn>
          </div>
        </div>

        <ProductCredits index={index} audience={item.audience} className="mt-16" />
      </article>
    </section>
  );
}
