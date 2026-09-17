import fs from 'node:fs';
import path from 'node:path';
import ProductFeature from '@/components/sections/products/ProductFeature';

const PRODUCT_IMAGES = {
  agendas: '/images/agendas/agenda.png',
  // calendarios y bidon: pendientes de foto real de L'Occitane (las anteriores
  // llevaban branding de otros clientes de Vänster). Sin imagen, ArchImage
  // pinta el arco vacio con la nota "Foto pendiente".
  merchandising: '/images/merchandising/merchandising.png',
};

function resolveImageSrc(id) {
  const src = PRODUCT_IMAGES[id];
  if (!src) return null;
  const absolutePath = path.join(process.cwd(), 'public', src);
  return fs.existsSync(absolutePath) ? src : null;
}

export default function ProductShowcase({ items = [] }) {
  return (
    <>
      {items.map((item, i) => (
        <ProductFeature
          key={item.id}
          item={item}
          index={i}
          imageSrc={resolveImageSrc(item.id)}
          id={item.id}
          reverse={i % 2 === 1}
        />
      ))}
    </>
  );
}
