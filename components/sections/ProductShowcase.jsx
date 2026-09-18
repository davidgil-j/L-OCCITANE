import ProductFeature from '@/components/sections/products/ProductFeature';

/**
 * Pieza de cada producto: videos apaisados para agenda y calendario, fotos de
 * escena verticales para bidon y merchandising. `aspect` es la proporcion del
 * propio archivo, para que la ficha no recorte el producto.
 */
const PRODUCT_MEDIA = {
  agendas: {
    type: 'video',
    src: '/videos/productos/agenda.mp4',
    poster: '/images/productos/agenda-poster.jpg',
    aspect: '16 / 9',
  },
  calendarios: {
    type: 'video',
    src: '/videos/productos/calendario.mp4',
    poster: '/images/productos/calendario-poster.jpg',
    aspect: '16 / 9',
  },
  bidon: { type: 'image', src: '/images/productos/bidon.jpg', aspect: '1122 / 1402' },
  merchandising: { type: 'image', src: '/images/productos/merchandising.jpg', aspect: '1122 / 1402' },
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
        />
      ))}
    </>
  );
}
