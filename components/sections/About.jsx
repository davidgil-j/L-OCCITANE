import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';

const label = 'font-sans text-[11px] uppercase tracking-[0.14em] text-background/90';

/**
 * Quienes somos, con la identidad de Vanster: la seccion entera en su fucsia,
 * el titular partido en silabas con guion (el recurso de su propia web) y una
 * ventana del marmol que cierra la pagina.
 *
 * Cada linea del titular entra tras su mascara, una detras de otra. Para los
 * lectores de pantalla el titular se lee entero, sin los cortes.
 *
 * Va marcada como tono "marble" para que la espiga de scroll pase a Blanc
 * Brule: en magenta sobre el fucsia no se veria.
 */
export default function About({ content }) {
  return (
    <section id="nosotros" data-bg-tone="marble" className="bg-vanster px-6 py-20 text-background md:px-12 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-6">
          <p className={label}>{content.eyebrow}</p>
          <h2
            aria-label={content.title}
            className="mt-6 font-serif text-[clamp(3.5rem,2.2rem+4vw,4.75rem)] uppercase leading-[1] tracking-tight md:mt-8"
          >
            {content.titleLines.map((line, i) => (
              <MaskReveal key={line} as="span" className="-mt-[0.14em] block pt-[0.14em] first:mt-0" delay={i * 0.08}>
                <span aria-hidden="true">{line}</span>
              </MaskReveal>
            ))}
          </h2>
          <FadeIn className="mt-10">
            <div className="relative aspect-[2/1] overflow-hidden rounded-lg md:rounded-xl">
              <Image
                src="/images/brand/vanster-marmol-cierre.jpg"
                alt=""
                aria-hidden="true"
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
        </div>

        <div className="flex flex-col md:col-span-5 md:col-start-8 md:pt-[3.25rem]">
          <FadeIn delay={0.1}>
            <p className="max-w-[40ch] text-pretty font-body text-lg leading-[1.6] text-background/90">{content.text}</p>
          </FadeIn>
          <ol className="mt-8 border-t border-background/30">
            {content.columns.map((col, i) => (
              <li key={col.title} className="border-b border-background/30">
                <FadeIn delay={0.15 + i * 0.06} className="grid grid-cols-[2rem_1fr] gap-x-3 py-4">
                  <span className={`pt-[3px] ${label}`}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className={label}>{col.title}</p>
                    <p className="mt-1.5 font-body text-base leading-relaxed text-background/90">{col.text}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
          <p className={`mt-8 md:mt-auto md:pt-8 ${label} tracking-[0.2em] md:tracking-[0.3em]`}>{content.claim}</p>
        </div>
      </div>
    </section>
  );
}
