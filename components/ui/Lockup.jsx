/**
 * Rotulo "L'OCCITANE ✕ VÄNSTER" compuesto en tipografia, no con los PNG de
 * los logotipos. La equis es un trazo SVG y no el glifo ✕: Gambarino no lo
 * tiene y el de la fuente de sustitucion no se deja centrar con precision.
 *
 * El tracking de 0.3em se anade tambien tras la ultima letra de cada palabra;
 * el pl compensa el de "VÄNSTER" para que el conjunto quede centrado, y el
 * margen izquierdo de la equis resta el de "L'OCCITANE" para que respire
 * igual por los dos lados. Margenes y desplazamiento medidos al pixel: ~8,5 px
 * de hueco a cada lado y la equis centrada en la altura de las mayusculas.
 */
export default function Lockup({ className = '' }) {
  return (
    <p className={`pl-[0.3em] font-serif text-base uppercase leading-none tracking-[0.3em] ${className}`}>
      L&apos;Occitane
      <span className="sr-only"> y </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 10 10"
        className="relative -top-[0.105em] ml-[0.24em] mr-[0.56em] inline-block h-[0.3em] w-[0.3em] align-middle"
      >
        <path d="M1 1 9 9M9 1 1 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      Vänster
    </p>
  );
}
