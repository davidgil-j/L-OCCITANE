import Image from 'next/image';
import MaskReveal from '@/components/animations/MaskReveal';
import WordReveal from '@/components/animations/WordReveal';

/**
 * Quienes somos: la voz de Vanster antes del contacto. A la izquierda, fijo
 * mientras se lee en escritorio, el titular con el logotipo; a la derecha,
 * el texto apareciendo palabra a palabra y los proyectos que avalan a la
 * agencia.
 */
export default function About({ content }) {
  return (
    <section id="nosotros" data-bg-tone="light" className="bg-background px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <p className="flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.14em] text-textMuted">
              <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-vanster" />
              {content.eyebrow}
            </p>
            <MaskReveal
              as="h2"
              className="mt-5 font-serif text-[clamp(2.25rem,3.8vw,3.5rem)] uppercase leading-[0.95] tracking-tight text-text"
            >
              {content.title}
            </MaskReveal>
            <Image
              src="/images/brand/vanster-logo.png"
              alt="Vänster"
              width={800}
              height={170}
              unoptimized
              className="mt-8 h-auto w-[104px]"
            />
          </div>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="space-y-7 text-pretty font-body text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] leading-[1.45] text-text">
            {content.paragraphs.map((p, i) => (
              <WordReveal key={i} text={p} delay={i === 0 ? 0 : 60} />
            ))}
          </div>

          <div className="mt-14 border-t border-brand/15 pt-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-textMuted">
              Han confiado en nosotros
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 font-body text-base italic text-text/80">
              {content.clients.map((c, i) => (
                <li key={c} className="flex items-center gap-5">
                  {i > 0 && <span aria-hidden="true" className="block h-1 w-1 rounded-full bg-vanster/60" />}
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
