import fs from 'node:fs';
import path from 'node:path';
import ProductAgendas from '@/components/sections/products/ProductAgendas';
import ProductCalendarios from '@/components/sections/products/ProductCalendarios';
import ProductBidon from '@/components/sections/products/ProductBidon';
import ProductMerchandising from '@/components/sections/products/ProductMerchandising';

const PRODUCT_IMAGES = {
  agendas: '/images/agendas/agenda.png',
  // calendarios y bidon: pendientes de foto real de L'Occitane (las anteriores
  // llevaban branding de otros clientes de Vänster). Sin imagen, ArchImage
  // pinta el arco vacio con la nota "Foto pendiente".
  merchandising: '/images/merchandising/merchandising.png',
};

/** Cada producto tiene su propia composicion: son cuatro paginas de la misma revista. */
const COMPOSITIONS = {
  agendas: ProductAgendas,
  calendarios: ProductCalendarios,
  bidon: ProductBidon,
  merchandising: ProductMerchandising,
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
      {items.map((item, i) => {
        const Composition = COMPOSITIONS[item.id];
        if (!Composition) return null;

        return (
          <Composition
            key={item.id}
            item={item}
            index={i}
            imageSrc={resolveImageSrc(item.id)}
            id={i === 0 ? 'productos' : undefined}
          />
        );
      })}
    </>
  );
}
