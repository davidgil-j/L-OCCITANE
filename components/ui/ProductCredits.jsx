/**
 * Creditos diminutos que llevan las cuatro fichas de producto: numeracion
 * 01-04 + publico a la izquierda, firma a la derecha. Inter (font-sans),
 * reservada en la guia de marca para etiquetas y metadatos.
 *
 * La numeracion va en los colores de Vanster: magenta sobre fondos claros y
 * amarillo sobre fondos saturados, que es exactamente como los usa la agencia
 * en sus propios soportes. El amarillo no se usa nunca sobre claro porque no
 * llega a contrastar.
 */
export default function ProductCredits({ index, audience, className = '', tone = 'dark' }) {
  const isLight = tone === 'light';
  const color = isLight ? 'text-white/70' : 'text-textMuted';
  const numberColor = isLight ? 'text-vansterAmarillo' : 'text-vanster';

  return (
    <div
      className={`flex items-end justify-between gap-6 font-sans text-[10px] uppercase tracking-[0.08em] md:text-[11px] ${color} ${className}`}
    >
      <span>
        <span className={numberColor}>{String(index + 1).padStart(2, '0')}</span> — {audience}
      </span>
      <span>Vänster para L&apos;Occitane · 2027</span>
    </div>
  );
}
