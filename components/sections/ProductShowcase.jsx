import fs from 'node:fs';
import path from 'node:path';
import ArchImage from '@/components/ui/ArchImage';
import ProductCredits from '@/components/ui/ProductCredits';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';
import ProductAgendas from '@/components/sections/products/ProductAgendas';
import ProductMerchandising from '@/components/sections/products/ProductMerchandising';

const PRODUCT_IMAGES = {
  agendas: '/images/agendas/agenda.png',
  // calendarios y bidon: pendientes de foto real de L'Occitane (las anteriores
  // llevaban branding de otros clientes de Vänster). Placeholder mientras tanto.
  merchandising: '/images/merchandising/merchandising.png',
};

function resolveImageSrc(id) {
  const src = PRODUCT_IMAGES[id];
  if (!src) return null;
  const absolutePath = path.join(process.cwd(), 'public', src);
  return fs.existsSync(absolutePath) ? src : null;
}

/** Plantilla original, todavia en uso por 02 y 03 hasta que tengan composicion propia. */
function ProductDefault({ item, index, imageSrc, id }) {
  return (
    <section id={id} className="bg-surface px-6 py-16 md:px-12">
      <FadeIn>
        <article className="mx-auto flex min-h-[80vh] max-w-4xl flex-col justify-end border border-background p-8 md:p-14">
          <ArchImage
            src={imageSrc}
            alt={item.name}
            sizes="(min-width: 768px) 900px, 100vw"
            className="flex-1"
          />
          <MaskReveal
            as="h3"
            className="mt-10 font-serif text-5xl uppercase leading-[0.95] tracking-tight text-text md:text-7xl"
          >
            {item.name}
          </MaskReveal>
          <ProductCredits index={index} audience={item.audience} className="mt-8" />
        </article>
      </FadeIn>
    </section>
  );
}

const COMPOSITIONS = {
  agendas: ProductAgendas,
  merchandising: ProductMerchandising,
};

export default function ProductShowcase({ items = [] }) {
  return (
    <>
      {items.map((item, i) => {
        const Composition = COMPOSITIONS[item.id] ?? ProductDefault;

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
