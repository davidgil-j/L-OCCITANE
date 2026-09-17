import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';
import MaskReveal from '@/components/animations/MaskReveal';
import Button from '@/components/ui/Button';
import { vanster } from '@/content/vanster';

/**
 * Cierre a sangre sobre el marmol de Vanster. Es el momento en que habla la
 * agencia y no el producto, asi que es donde la identidad de Vanster se ve
 * entera. El claim va en amarillo de marca, que es como Vanster lo usa en sus
 * propios soportes: sobre fondo saturado, nunca sobre claro.
 */
export default function CTA({ content }) {
  return (
    <section
      id="contacto"
      data-bg-tone="dark"
      className="relative isolate overflow-hidden px-6 py-32 md:px-12 md:py-40"
    >
      <Image
        src="/images/brand/vanster-marmol.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Velo plano de magenta: el marmol tiene mucho contraste y el titular
          tiene que leerse sin recurrir a sombras. */}
      <div className="absolute inset-0 bg-vanster/55" />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="font-sans text-[11px] uppercase tracking-[0.14em] text-vansterAmarillo">
          Your online &amp; offline creative partner
        </p>
        <MaskReveal
          as="h2"
          className="mt-8 font-serif text-[clamp(2rem,4.4vw,3.75rem)] uppercase leading-[0.95] tracking-tight text-white"
        >
          {content?.title}
        </MaskReveal>
        <FadeIn delay={0.15}>
          <div className="mt-12">
            <Button href={content?.href ?? `mailto:${vanster.email}`} variant="inverted">
              {content?.buttonLabel}
            </Button>
          </div>
        </FadeIn>
      </div>

      {/* Contenedor propio, mas ancho que el del titular, para que el contacto
          quepa en una sola linea en escritorio. */}
      <div className="relative mx-auto max-w-4xl">
        <address className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-2 font-sans text-xs not-italic tracking-[0.02em] text-white/85 md:text-sm">
          <a href={`mailto:${vanster.email}`} className="transition-opacity duration-300 hover:opacity-70">
            {vanster.email}
          </a>
          <a href={vanster.phoneHref} className="transition-opacity duration-300 hover:opacity-70">
            T {vanster.phone}
          </a>
          <span>{vanster.address.join(' · ')}</span>
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
