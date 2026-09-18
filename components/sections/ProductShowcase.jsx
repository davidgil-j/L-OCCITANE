import ProductFeature from '@/components/sections/products/ProductFeature';

/**
 * Pieza de cada producto.
 *
 * - box: proporcion de la pieza.
 * - window: donde va la pieza dentro de la caja, en % (hoy, a sangre).
 * - logo: logotipo de L'Occitane sobre la foto; left/top son el CENTRO del
 *   logo, en % de la pieza.
 *
 * Los videos (agenda, calendario) no llevan logo: el producto se mueve en
 * ellos (se abre la agenda, pasa la hoja del calendario) y un logo fijo
 * encima se despegaria del objeto.
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
    logo: { left: 41, top: 68, width: 15, opacity: 0.8 },
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
