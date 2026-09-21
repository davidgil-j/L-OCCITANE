import FadeIn from '@/components/animations/FadeIn';
import RevealLines from '@/components/animations/RevealLines';

const label = 'font-sans text-[11px] uppercase tracking-[0.14em] text-textMuted';

/**
 * Quienes somos: una sola frase en dos tonos (lo esencial en Noir des Terres,
 * el resto en el tono secundario) y tres columnas breves debajo. La frase
 * entra linea a linea, como la intro, para que la pagina tenga un solo
 * idioma de movimiento.
 */
export default function About({ content }) {
  const statement = `${content.statement} ${content.statementMuted}`;
  const mutedFrom = content.statement.split(' ').length;

  return (
    <section id="nosotros" data-bg-tone="light" className="bg-background px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className={label}>{content.eyebrow}</p>
        <RevealLines
          text={statement}
          mutedFrom={mutedFrom}
          className="mt-8 max-w-[30ch] text-balance font-body text-[clamp(1.75rem,1.1rem+2.4vw,3.25rem)] leading-[1.18] tracking-[-0.01em] text-text md:mt-10"
        />
        <div className="mt-16 grid gap-8 border-t border-brand/15 pt-6 md:mt-20 md:grid-cols-3">
          {content.columns.map((col, i) => (
            <FadeIn key={col.title} delay={i * 0.08}>
              <p className={label}>{col.title}</p>
              <p className="mt-3 max-w-[32ch] font-body text-base leading-relaxed text-text/85">{col.text}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
