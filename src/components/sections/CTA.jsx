import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';
import SwitchButton from '@/components/ui/SwitchButton';
import { vanster } from '@/content/vanster';

/**
 * Cierre de la propuesta: invitacion a hablar y datos de contacto de Vanster.
 * No lleva fondo propio; va sobre la MarbleSurface.
 */
export default function CTA({ content }) {
  return (
    <section id="contacto" data-bg-tone="marble" className="px-6 pb-16 pt-24 md:px-12 md:pb-20 md:pt-28">
      <div className="mx-auto max-w-2xl text-center">
        <MaskReveal
          as="h2"
          className="text-balance font-serif text-[clamp(2rem,3.4vw,3.25rem)] uppercase leading-[1.02] tracking-tight text-background"
        >
          {content?.title}
        </MaskReveal>
        {content?.text && (
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-6 max-w-lg text-balance text-base leading-relaxed text-background">
              {content.text}
            </p>
          </FadeIn>
        )}
        <FadeIn delay={0.15}>
          <div className="mt-9">
            <SwitchButton href={content?.href ?? `mailto:${vanster.email}?subject=${encodeURIComponent(content?.subject ?? '')}`}>
              {content?.buttonLabel}
            </SwitchButton>
          </div>
        </FadeIn>
      </div>

      {/* Contenedor propio, mas ancho que el del titular, para que el contacto
          quepa en una sola linea en escritorio. */}
      <div className="mx-auto max-w-4xl">
        <address className="mt-10 flex flex-col items-center font-sans text-sm not-italic tracking-[0.02em] text-background md:mt-12 md:flex-row md:flex-wrap md:justify-center md:gap-x-6">
          <a href={`mailto:${vanster.email}`} className="inline-flex min-h-11 items-center transition-opacity duration-300 hover:opacity-70 active:opacity-60">
            {vanster.email}
          </a>
          <a href={vanster.phoneHref} className="inline-flex min-h-11 items-center transition-opacity duration-300 hover:opacity-70 active:opacity-60">
            T {vanster.phone}
          </a>
          <a
            href={vanster.mapsHref}
            target="_blank"
            rel="noreferrer"
            aria-label={`${vanster.address.join(', ')} (abrir en Google Maps)`}
            className="inline-flex min-h-11 items-center underline decoration-background/40 underline-offset-4 transition-opacity duration-300 hover:opacity-70 active:opacity-60"
          >
            {vanster.address.join(', ')}
          </a>
          <a
            href={vanster.webHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center transition-opacity duration-300 hover:opacity-70 active:opacity-60"
          >
            {vanster.web}
          </a>
        </address>
      </div>
    </section>
  );
}
