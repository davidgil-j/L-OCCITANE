import RevealLines from '@/components/animations/RevealLines';

/**
 * Entrada breve entre el hero y los productos: una sola pregunta que abre
 * las cuatro fichas. Alineada a la izquierda sobre el mismo borde
 * que las fichas, para que caiga en la rejilla de la pagina, y entrando linea
 * a linea tras su mascara.
 *
 * Sin ramita de lavanda al lado: la espiga de scroll ya lleva ese motivo por
 * el mismo lateral, y juntas se repetian.
 */
export default function Intro({ text }) {
  return (
    <section
      id="intro"
      data-bg-tone="light"
      className="bg-background px-6 pb-8 pt-24 md:px-12 md:pb-10 md:pt-32"
    >
      <div className="mx-auto max-w-6xl">
        <RevealLines
          text={text}
          className="max-w-[22ch] text-balance font-body text-[clamp(2rem,1.3rem+2.6vw,3.25rem)] leading-[1.12] tracking-[-0.01em] text-text"
        />
      </div>
    </section>
  );
}
