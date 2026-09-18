import RevealLines from '@/components/animations/RevealLines';

/**
 * Cambio de ritmo entre el hero y los productos: de imagen a tipografia pura,
 * sobre Blanc Brule limpio y con mucho aire.
 */
export default function Manifesto({ text }) {
  return (
    <section id="manifiesto" data-bg-tone="light" className="bg-background px-6 py-32 md:px-12 md:py-44">
      <RevealLines
        text={text}
        className="mx-auto max-w-3xl text-pretty text-center font-body text-[clamp(1.4rem,3vw,2.8rem)] leading-[1.3] text-text"
      />
    </section>
  );
}
