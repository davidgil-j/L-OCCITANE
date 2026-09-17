import Image from 'next/image';

/**
 * Imagen de producto recortada con el arco provenzal (una de las 5 formas
 * iconicas de la marca). El fondo es Blanc Brule Moyen porque la guia lo
 * reserva justamente para packshots.
 *
 * `object-contain` y no `cover`: las fotos disponibles son packshots de
 * producto recortado, no fotografia de ambiente; recortarlas partiria el
 * objeto. Cuando lleguen fotos de ambiente reales, `fit="cover"`.
 */
export default function ArchImage({
  src,
  alt,
  sizes = '100vw',
  className = '',
  fit = 'contain',
  children,
}) {
  return (
    <div
      className={`relative overflow-hidden bg-backgroundAlt ${className}`}
      style={{ clipPath: 'url(#provencal-arch)', WebkitClipPath: 'url(#provencal-arch)' }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={fit === 'cover' ? 'object-cover' : 'object-contain p-10 md:p-16'}
        />
      ) : (
        <span className="absolute inset-x-0 bottom-10 text-center font-sans text-[10px] uppercase tracking-[0.08em] text-textMuted">
          Foto pendiente
        </span>
      )}
      {/* Capas que deban ir recortadas por el arco (p.ej. un velo). */}
      {children}
    </div>
  );
}
