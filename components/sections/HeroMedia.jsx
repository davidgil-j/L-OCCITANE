'use client';

/**
 * Video de fondo del HERO. Cae a la imagen estatica (poster) cuando el
 * usuario tiene activado prefers-reduced-motion, para no forzar autoplay.
 */
export default function HeroMedia({ reduceMotion }) {
  if (reduceMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/images/hero-video-poster.jpg"
        alt="Campo de lavanda al atardecer en Haute-Provence"
        className="absolute inset-0 h-full w-full object-cover object-[28%_center] md:object-center"
      />
    );
  }

  return (
    <video
      className="absolute inset-0 h-full w-full object-cover object-[28%_center] md:object-center"
      poster="/images/hero-video-poster.jpg"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src="/videos/hero-lavender.mp4" type="video/mp4" />
    </video>
  );
}
