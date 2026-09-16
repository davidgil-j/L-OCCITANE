/**
 * Mascara SVG compartida: la forma del arco provenzal (una de las 5 formas
 * iconicas de la marca, ver design/guias-marca/RESUMEN.md). Se renderiza
 * una sola vez por pagina; cualquier elemento puede recortarse a esta forma
 * con style={{ clipPath: 'url(#provencal-arch)' }}.
 */
export default function ArchDefs() {
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        <clipPath id="provencal-arch" clipPathUnits="objectBoundingBox">
          <path d="M0,0.35 A0.5,0.35 0 0 1 1,0.35 L1,1 L0,1 Z" />
        </clipPath>
      </defs>
    </svg>
  );
}
