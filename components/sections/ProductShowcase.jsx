import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';
import Parallax from '@/components/animations/Parallax';

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

export default function ProductShowcase({ items = [] }) {
  return (
    <>
      {items.map((item, i) => {
        const imageSrc = resolveImageSrc(item.id);

        return (
          <section
            key={item.id}
            id={i === 0 ? 'productos' : undefined}
            className="bg-surface px-6 py-16 md:px-12"
          >
            <FadeIn>
              <article className="mx-auto flex min-h-[80vh] max-w-4xl flex-col justify-end border border-background p-8 md:p-14">
                <div
                  className="relative flex-1 bg-backgroundAlt"
                  style={{ clipPath: 'url(#provencal-arch)', WebkitClipPath: 'url(#provencal-arch)' }}
                >
                  {imageSrc && (
                    <Parallax>
                      <Image
                        src={imageSrc}
                        alt={item.name}
                        fill
                        sizes="(min-width: 768px) 900px, 100vw"
                        className="object-cover"
                      />
                    </Parallax>
                  )}
                </div>
                <MaskReveal
                  as="h3"
                  className="mt-10 font-serif text-5xl uppercase leading-[0.95] tracking-tight text-text md:text-7xl"
                >
                  {item.name}
                </MaskReveal>
                <div className="mt-8 flex items-end justify-between font-sans text-[10px] uppercase tracking-[0.08em] text-textMuted md:text-[11px]">
                  <span>
                    {String(i + 1).padStart(2, '0')} — {item.audience}
                  </span>
                  <span>Vänster para L&apos;Occitane · 2027</span>
                </div>
              </article>
            </FadeIn>
          </section>
        );
      })}
    </>
  );
}
