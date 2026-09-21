import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';
import WordReveal from '@/components/animations/WordReveal';

// Ancho de "VÄNSTER" en Gambarino, en em (medido con Playwright). El nombre
// ocupa todo el ancho de la rejilla: font-size = ancho del contenedor / esto.
const WORD_WIDTH_EM = 3.9;

const label = 'font-sans text-[11px] uppercase tracking-[0.14em]';

/**
 * Quienes somos, compuesto como la entrada de diccionario del nombre: vänster
 * es "izquierda" en sueco, y de ahi sale la manera de trabajar del estudio.
 *
 * - El nombre a todo el ancho, relleno del mismo marmol que cierra la pagina
 *   (una imagen fija recortada por el texto: nada se repinta al hacer scroll).
 * - Debajo, pronunciacion y acepciones a la izquierda y el texto apareciendo
 *   palabra a palabra a la derecha, sobre la misma rejilla.
 * - El indice de disciplinas, con la de esta propuesta senalada.
 * - La frase para L'Occitane como cierre, firmada con el logotipo.
 */
export default function About({ content }) {
  return (
    <section id="nosotros" data-bg-tone="light" className="bg-background px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <div className={`flex items-center justify-between gap-6 border-t border-brand/15 pt-4 text-textMuted ${label}`}>
          <p className="flex items-center gap-3">
            <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-vanster" />
            {content.eyebrow}
          </p>
          <p>{content.place}</p>
        </div>

        <div className="mt-8 [container-type:inline-size] md:mt-12">
          <MaskReveal
            as="h2"
            className="font-serif uppercase leading-[1.08]"
          >
            <span
              className="block bg-cover bg-center bg-clip-text pt-[0.06em] text-transparent [-webkit-background-clip:text]"
              style={{
                fontSize: `calc(100cqi / ${WORD_WIDTH_EM})`,
                backgroundImage: 'url(/images/brand/vanster-marmol-cierre.jpg)',
              }}
            >
              {content.word}
            </span>
          </MaskReveal>
        </div>

        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-12 md:gap-8">
          <FadeIn className="md:col-span-5" delay={0.2}>
            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-body text-xl italic text-text">{content.phonetic}</span>
              <span className={`text-textMuted ${label}`}>{content.grammar}</span>
            </p>
            <ol className="mt-6 space-y-4 border-l border-vanster/40 pl-5">
              {content.senses.map((sense, i) => (
                <li key={i} className="flex gap-4 font-body text-lg leading-[1.45] text-text">
                  <span className={`pt-[0.3em] text-vanster ${label}`}>{i + 1}.</span>
                  <span className="max-w-[34ch]">{sense}</span>
                </li>
              ))}
            </ol>
          </FadeIn>

          <div className="space-y-6 text-pretty font-body text-[clamp(1.25rem,1.1rem+0.55vw,1.625rem)] leading-[1.45] text-text md:col-span-6 md:col-start-7">
            {content.paragraphs.map((p, i) => (
              <WordReveal key={i} text={p} delay={i === 0 ? 0 : 60} />
            ))}
          </div>
        </div>

        <div className="mt-24 grid gap-8 md:mt-32 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className={`text-textMuted ${label}`}>Lo que hacemos</p>
          </div>
          <ol className="border-t border-brand/15 md:col-span-6 md:col-start-7">
            {content.services.map((service, i) => (
              <li key={service.name} className="border-b border-brand/15">
                <FadeIn delay={i * 0.05} className="flex flex-wrap items-baseline gap-x-5 gap-y-1 py-4">
                  <span className={`w-6 shrink-0 tabular-nums ${service.current ? 'text-vanster' : 'text-textMuted'} ${label}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`min-w-0 flex-1 font-body text-[clamp(1.125rem,1rem+0.3vw,1.25rem)] leading-snug ${
                      service.current ? 'italic text-vanster' : 'text-text'
                    }`}
                  >
                    {service.name}
                  </span>
                  {service.current && (
                    <span className={`flex basis-full items-center gap-2 pl-11 text-vanster sm:basis-auto sm:pl-0 ${label}`}>
                      <span aria-hidden="true" className="block h-1.5 w-1.5 rounded-full bg-vanster" />
                      {content.currentLabel}
                    </span>
                  )}
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-24 md:mt-36 md:grid md:grid-cols-12">
          <div className="md:col-span-10 md:col-start-2">
            <WordReveal
              text={content.closing}
              className="text-balance font-body text-[clamp(1.5rem,1.2rem+1.3vw,2.375rem)] leading-[1.3] text-text"
            />
            <FadeIn delay={0.3} className="mt-10 flex items-center gap-4">
              <span aria-hidden="true" className="block h-px w-10 bg-vanster" />
              <Image
                src="/images/brand/vanster-logo.png"
                alt="Vänster"
                width={800}
                height={170}
                unoptimized
                className="h-auto w-[92px]"
              />
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
