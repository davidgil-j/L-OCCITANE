import RevealLines from '@/components/animations/RevealLines';

/**
 * Entrada breve entre el hero y los productos: que se sepa de un vistazo que
 * son cuatro piezas y para que. Alineada a la izquierda sobre el mismo borde
 * que las fichas, para que caiga en la rejilla de la pagina, y entrando linea
 * a linea tras su mascara.
 */
export default function Intro({ text }) {
  return (
    <section id="intro" data-bg-tone="light" className="bg-background px-6 pb-8 pt-24 md:px-12 md:pb-10 md:pt-32">
      <div className="mx-auto max-w-6xl">
        <RevealLines
          text={text}
          className="max-w-[42ch] text-pretty font-body text-[clamp(1.375rem,1.8vw,1.5rem)] leading-[1.4] text-text"
        />
      </div>
    </section>
  );
}
