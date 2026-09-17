import ArchImage from '@/components/ui/ArchImage';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';

/**
 * Ficha de producto a dos columnas: foto a un lado y texto al otro. Las
 * fichas alternan el lado (`reverse`) para recorrer todo el ancho de la
 * pagina en zigzag. En movil se apilan siempre con la foto primero.
 */
export default function ProductFeature({ item, index, imageSrc, id, reverse = false }) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <section id={id} data-bg-tone="light" className="bg-background px-6 py-20 md:px-12 md:py-28">
      <article className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div className={`w-full justify-self-center ${reverse ? 'md:order-2' : ''}`}>
          <ArchImage
            src={imageSrc}
            alt={item.name}
            sizes="(min-width: 768px) 420px, 90vw"
            fit="cover"
            className="mx-auto aspect-[4/5] w-full max-w-[26rem]"
          />
        </div>

        <div className={reverse ? 'md:order-1' : ''}>
          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-textMuted">
            <span className="text-vanster">{number}</span>
            <span className="ml-3">{item.audience}</span>
          </p>
          <MaskReveal
            as="h3"
            className="mt-5 text-balance font-serif text-[clamp(2rem,3.4vw,3.25rem)] uppercase leading-[0.95] tracking-tight text-text"
          >
            {item.name}
          </MaskReveal>
          <FadeIn delay={0.1}>
            <div className="mt-7 max-w-md space-y-4 text-pretty font-body text-base leading-relaxed text-text/85">
              {item.description.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>
        </div>
      </article>
    </section>
  );
}
