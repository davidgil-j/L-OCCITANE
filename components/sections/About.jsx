import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';

const label = 'font-sans text-[11px] uppercase tracking-[0.14em] text-textMuted';

/**
 * Quienes somos: presentacion sobria del estudio antes del contacto.
 *
 * Misma escala y rejilla que las fichas de producto: titular a la izquierda
 * con tres datos, texto a cuerpo de lectura a la derecha y la lista de
 * servicios debajo. Sin elementos de exhibicion: la seccion informa.
 */
export default function About({ content }) {
  return (
    <section id="nosotros" data-bg-tone="light" className="bg-background px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 border-t border-brand/15 pt-12 md:grid-cols-12 md:gap-8 md:pt-16">
        <div className="md:col-span-4">
          <p className={label}>{content.eyebrow}</p>
          <MaskReveal
            as="h2"
            className="mt-5 font-serif text-[clamp(2rem,3.4vw,3.25rem)] uppercase leading-[0.95] tracking-tight text-text"
          >
            {content.title}
          </MaskReveal>
          <dl className="mt-10 space-y-3">
            {content.facts.map((fact) => (
              <div key={fact.term} className="flex items-baseline gap-4">
                <dt className={`w-24 shrink-0 ${label}`}>{fact.term}</dt>
                <dd className="font-body text-base text-text">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <FadeIn className="max-w-[60ch] space-y-5 text-pretty font-body text-lg leading-[1.6] text-text/85">
            {content.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </FadeIn>

          <FadeIn delay={0.1} className="mt-14">
            <p className={label}>{content.servicesLabel}</p>
            <ul className="mt-4 grid gap-x-8 border-t border-brand/15 sm:grid-cols-2">
              {content.services.map((service) => (
                <li key={service} className="border-b border-brand/15 py-3 font-body text-base text-text">
                  {service}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
