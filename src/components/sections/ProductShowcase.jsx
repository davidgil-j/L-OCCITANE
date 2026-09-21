import ProductFeature from '@/components/sections/products/ProductFeature';

/**
 * Pieza de cada producto.
 *
 * - box: proporcion de la pieza.
 * - window: donde va la pieza dentro de la caja, en % (hoy, a sangre).
 * - logo: logotipo de L'Occitane sobre la foto; left/top son el CENTRO del
 *   logo, en % de la pieza.
 *
 * Los videos (agenda, calendario) no llevan logo encima: el logotipo ya va
 * impreso en la pieza del propio video.
 */
const PRODUCT_MEDIA = {
  agendas: {
    type: 'video',
    src: '/videos/productos/agenda.mp4',
    poster: '/images/productos/agenda-poster.jpg',
    box: '16 / 9',
    window: { left: 0, top: 0, width: 100, height: 100 },
  },
  calendarios: {
    type: 'video',
    src: '/videos/productos/calendario.mp4',
    poster: '/images/productos/calendario-poster.jpg',
    box: '16 / 9',
    window: { left: 0, top: 0, width: 100, height: 100 },
  },
  bidon: {
    type: 'image',
    src: '/images/productos/bidon.jpg',
    box: '1122 / 1402',
    window: { left: 0, top: 0, width: 100, height: 100 },
    // Un logotipo por bidon, sobre el cuerpo de cada uno: negro en los claros
    // (multiplicar, impreso en la pintura) y blanco en los oscuros (marron y
    // verde), como un serigrafiado claro.
    logo: [
      { left: 19.4, top: 52, width: 11.5, opacity: 0.72, tone: 'white' },
      { left: 41, top: 68, width: 15, opacity: 0.8 },
      { left: 59.3, top: 47, width: 11.5, opacity: 0.7 },
      { left: 79.8, top: 63, width: 12, opacity: 0.72, tone: 'white' },
    ],
  },
  merchandising: {
    type: 'image',
    src: '/images/productos/merchandising.jpg',
    box: '1122 / 1402',
    window: { left: 0, top: 0, width: 100, height: 100 },
    logo: { left: 52.5, top: 40, width: 26, opacity: 0.75 },
  },
};

export default function ProductShowcase({ items = [] }) {
  return (
    <>
      {items.map((item, i) => (
        <ProductFeature
          key={item.id}
          item={item}
          index={i}
          media={PRODUCT_MEDIA[item.id]}
          id={item.id}
          reverse={i % 2 === 1}
          credit={i === 0}
        />
      ))}
    </>
  );
}
