import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';
import Button from '@/components/ui/Button';
import { vanster } from '@/content/vanster';

/**
 * Cierre de la propuesta: invitacion a hablar y datos de contacto de Vanster.
 * No lleva fondo propio; va sobre la MarbleSurface que comparte con el pie.
 */
export default function CTA({ content }) {
  return (
    <section id="contacto" data-bg-tone="dark" className="px-6 pb-16 pt-24 md:px-12 md:pb-20 md:pt-28">
      <div className="mx-auto max-w-2xl text-center">
        <MaskReveal
          as="h2"
          className="text-balance font-serif text-[clamp(1.75rem,3.2vw,2.75rem)] uppercase leading-[0.95] tracking-tight text-background"
        >
          {content?.title}
        </MaskReveal>
        {content?.text && (
          <FadeIn delay={0.1}>
            <p className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-background/85">
              {content.text}
            </p>
          </FadeIn>
        )}
        <FadeIn delay={0.15}>
          <div className="mt-9">
            <Button href={content?.href ?? `mailto:${vanster.email}`} variant="inverted">
              {content?.buttonLabel}
            </Button>
          </div>
        </FadeIn>
      </div>

      {/* Contenedor propio, mas ancho que el del titular, para que el contacto
          quepa en una sola linea en escritorio. */}
      <div className="mx-auto max-w-4xl">
        <address className="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-2 font-sans text-xs not-italic tracking-[0.02em] text-background/85 md:text-sm">
          <a href={`mailto:${vanster.email}`} className="transition-opacity duration-300 hover:opacity-70">
            {vanster.email}
          </a>
          <a href={vanster.phoneHref} className="transition-opacity duration-300 hover:opacity-70">
            T {vanster.phone}
          </a>
          <span>{vanster.address.join(', ')}</span>
          <a
            href={vanster.webHref}
            target="_blank"
            rel="noreferrer"
            className="transition-opacity duration-300 hover:opacity-70"
          >
            {vanster.web}
          </a>
        </address>
      </div>
    </section>
  );
}
