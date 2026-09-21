import ProductMedia from '@/components/ui/ProductMedia';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';
import MarbleWash from '@/components/animations/MarbleWash';

/**
 * Ficha de producto a dos columnas: pieza a un lado y texto al otro, y las
 * fichas alternan el lado (`reverse`) para recorrer el ancho en zigzag. Los
 * videos son apaisados y las fotos verticales, asi que la pieza apaisada toma
 * mas columnas que la vertical y ninguna se recorta. En movil se apila, con
 * la pieza primero.
 *
 * Toque Vanster sobre el fondo claro, sin tocar las fotos: una bruma de su
 * marmol en el lado del texto (MarbleWash). Solo en escritorio, donde ese
 * lado tiene aire; en movil no hay hueco.
 */
export default function ProductFeature({ item, index, media, id, reverse = false, credit = false }) {
  const number = String(index + 1).padStart(2, '0');
  const wide = media.type === 'video';
  // Rejilla de 12: apaisada 7 + texto 5; vertical 5 + hueco 1 + texto 6.
  // La pieza siempre toca su borde exterior y el texto queda al otro lado.
  const mediaPlace = wide
    ? `md:col-span-7 ${reverse ? 'md:col-start-6 md:row-start-1' : 'md:col-start-1'}`
    : `md:col-span-5 ${reverse ? 'md:col-start-8 md:row-start-1' : 'md:col-start-1'}`;
  const textPlace = wide
    ? `md:col-span-5 ${reverse ? 'md:col-start-1 md:row-start-1' : 'md:col-start-8'}`
    : `md:col-span-6 ${reverse ? 'md:col-start-1 md:row-start-1' : 'md:col-start-7'}`;

  return (
    <section id={id} data-bg-tone="light" className="relative isolate overflow-hidden bg-background px-6 py-10 md:px-12 md:py-14">
      <MarbleWash side={reverse ? 'left' : 'right'} index={index} />
      <article className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-12 md:gap-x-[4%] md:gap-y-12 lg:gap-x-[5%]">
        <div className={mediaPlace}>
          <ProductMedia
            media={media}
            alt={item.name}
            sizes={wide ? '(min-width: 768px) 58vw, 90vw' : '(min-width: 768px) 42vw, 90vw'}
            credit={credit}
          />
        </div>

        <div className={textPlace}>
          <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-text/70">
            <span className="text-vanster">{number}</span>
            <span className="ml-3">{item.audience}</span>
          </p>
          <MaskReveal
            as="h2"
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
