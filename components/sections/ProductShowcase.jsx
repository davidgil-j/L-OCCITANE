import ProductFeature from '@/components/sections/products/ProductFeature';

/**
 * Pieza de cada producto y su marco ilustrado.
 *
 * - box: proporcion del conjunto (la del marco, o la de la pieza si el adorno
 *   es suelto).
 * - window: donde va la pieza dentro del conjunto, en %. En los marcos
 *   completos es la ventana interior del dibujo, medida sobre el PNG.
 * - ornaments: dibujos encima, en % del conjunto (pueden salirse un poco).
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
    // Ramillete de pie sobre la esquina inferior izquierda, donde el video solo
    // muestra mesa vacia.
    ornaments: [{ src: '/images/marcos/agenda-ramillete.png', left: -7, top: 38, width: 14, height: 70, sizes: '140px' }],
  },
  calendarios: {
    type: 'video',
    src: '/videos/productos/calendario.mp4',
    poster: '/images/productos/calendario-poster.jpg',
    // Marco de 1536x1024 con doble filete; la ventana deja 20 px de aire por
    // dentro del filete interior.
    box: '1536 / 1024',
    window: { left: 6.18, top: 10.94, width: 87.7, height: 78.32 },
    ornaments: [
      {
        src: '/images/marcos/calendario-marco.png',
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        sizes: '(min-width: 768px) 58vw, 90vw',
      },
    ],
  },
  bidon: {
    type: 'image',
    src: '/images/productos/bidon.jpg',
    // Esquinas de olivo; la foto entra un 14% por cada lado para que las
    // ramas abracen sus esquinas sin taparla.
    box: '1122 / 1402',
    window: { left: 14, top: 14, width: 72, height: 72 },
    ornaments: [
      {
        src: '/images/marcos/bidon-marco.png',
        left: 0,
        top: 0,
        width: 100,
        height: 100,
        sizes: '(min-width: 768px) 42vw, 90vw',
      },
    ],
    logo: { left: 41, top: 68, width: 15, opacity: 0.8 },
  },
  merchandising: {
    type: 'image',
    src: '/images/productos/merchandising.jpg',
    box: '1122 / 1402',
    window: { left: 0, top: 0, width: 100, height: 100 },
    // Ramita centrada sobre el borde superior, donde la foto es pared clara.
    ornaments: [{ src: '/images/marcos/mochila-ramita.png', left: 29, top: -4.5, width: 42, height: 8.5, sizes: '240px' }],
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
