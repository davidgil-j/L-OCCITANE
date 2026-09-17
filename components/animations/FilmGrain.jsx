/**
 * Grano fotografico: ruido SVG (feTurbulence) fijo sobre toda la pagina, a
 * opacidad muy baja y en modo overlay. Da la textura de campana impresa en
 * lugar de interfaz digital plana.
 *
 * Es puramente decorativo y no reacciona al scroll ni al puntero, asi que no
 * necesita ser componente de cliente ni respetar prefers-reduced-motion: no
 * se mueve.
 */
export default function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay"
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
