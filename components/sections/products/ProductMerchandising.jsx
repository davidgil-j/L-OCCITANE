import ArchImage from '@/components/ui/ArchImage';
import ProductCredits from '@/components/ui/ProductCredits';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';

/**
 * 04 — Cierre a pantalla completa. La seccion es la que va a sangre; la
 * foto NO se estira a todo el ancho porque el original mide 440x484 px y
 * escalarlo x3 lo dejaria borroso (ver nota en la conversacion de fase 2).
 * Velo plano de Noir des Terres sobre el conjunto para que el titular en
 * Blanc Brule se lea por encima de la mochila negra.
 */
export default function ProductMerchandising({ item, index, imageSrc }) {
  return (
    <section className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-surface px-6 py-24">
      <FadeIn>
        <ArchImage
          src={imageSrc}
          alt={item.name}
          sizes="(min-width: 768px) 640px, 90vw"
          fit="cover"
          className="aspect-[4/5] w-[min(90vw,40rem)]"
        />
      </FadeIn>

      <div className="absolute inset-0 bg-brand/50" />

      <MaskReveal
        as="h3"
        className="absolute inset-x-6 top-1/2 mx-auto max-w-5xl -translate-y-1/2 text-center font-serif text-[clamp(2.6rem,8vw,7.5rem)] uppercase leading-[0.9] tracking-tight text-background"
      >
        {item.name}
      </MaskReveal>

      <div className="absolute inset-x-6 bottom-8 md:inset-x-12">
        <p className="max-w-sm font-body text-sm leading-relaxed text-background/80">
          {item.description}
        </p>
        <ProductCredits index={index} audience={item.audience} tone="light" className="mt-8" />
      </div>
    </section>
  );
}
