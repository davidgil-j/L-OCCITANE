/**
 * Creditos diminutos que llevan las cuatro fichas de producto: numeracion
 * 01-04 + publico a la izquierda, firma a la derecha. Inter (font-sans),
 * reservada en la guia de marca para etiquetas y metadatos.
 */
export default function ProductCredits({ index, audience, className = '', tone = 'dark' }) {
  const color = tone === 'light' ? 'text-background/70' : 'text-textMuted';

  return (
    <div
      className={`flex items-end justify-between font-sans text-[10px] uppercase tracking-[0.08em] md:text-[11px] ${color} ${className}`}
    >
      <span>
        {String(index + 1).padStart(2, '0')} — {audience}
      </span>
      <span>Vänster para L&apos;Occitane · 2027</span>
    </div>
  );
}
