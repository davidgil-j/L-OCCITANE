/**
 * Grano fotografico: ruido SVG (feTurbulence) fijo sobre toda la pagina, a
 * opacidad muy baja y en modo overlay. Da la textura de campana impresa en
 * lugar de interfaz digital plana.
 *
 * Es puramente decorativo y no reacciona al scroll ni al puntero, asi que no
 * necesita ser componente de cliente ni respetar prefers-reduced-motion: no
 * se mueve.
 *
 * Solo en escritorio con raton: en movil, una capa fija a pantalla completa
 * con mezcla overlay y un filtro de ruido obliga a recomponer toda la pagina
 * en cada fotograma de scroll, y en iPhone eso lo volvia torpe.
 */
export default function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 hidden opacity-[0.03] mix-blend-overlay [@media(hover:hover)_and_(pointer:fine)]:block"
    >
      <svg className="h-full w-full">
        <filter id="film-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </div>
  );
}
