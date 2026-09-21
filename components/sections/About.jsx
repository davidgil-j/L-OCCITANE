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
        <div className="md:col-span-7">
          <p className={label}>{content.eyebrow}</p>
          <h2
            aria-label={content.title}
            className="mt-6 font-serif text-[clamp(3.5rem,2.2rem+4vw,4.75rem)] uppercase leading-[0.92] tracking-tight md:mt-8"
          >
            {content.titleLines.map((line, i) => (
              <MaskReveal key={line} as="span" className="block" delay={i * 0.08}>
                <span aria-hidden="true">{line}</span>
              </MaskReveal>
            ))}
          </h2>
        </div>

        <div className="flex flex-col md:col-span-5">
          <FadeIn>
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg md:rounded-xl">
              <Image
                src="/images/brand/vanster-marmol-cierre.jpg"
                alt=""
                aria-hidden="true"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-7 max-w-[40ch] text-pretty font-body text-lg leading-[1.6] text-background/90">{content.text}</p>
          </FadeIn>
          <p className={`mt-8 md:mt-auto md:pt-8 ${label} tracking-[0.2em] md:tracking-[0.3em]`}>{content.claim}</p>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-6xl gap-8 border-t border-background/30 pt-6 md:mt-16 md:grid-cols-3">
        {content.columns.map((col, i) => (
          <FadeIn key={col.title} delay={i * 0.08}>
            <p className={label}>
              {String(i + 1).padStart(2, '0')} · {col.title}
            </p>
            <p className="mt-3 max-w-[32ch] font-body text-base leading-relaxed text-background/90">{col.text}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
