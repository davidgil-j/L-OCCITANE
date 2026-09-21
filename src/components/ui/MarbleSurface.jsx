import Image from 'next/image';

/**
 * Superficie de marmol de Vanster bajo el contacto y el pie. Una sola imagen con un
 * solo velo: cuando el marmol se repetia en dos secciones seguidas, la union
 * se veia como un corte. El velo es neutro y no magenta, para que el marmol
 * conserve sus propios colores y el texto se lea igual en todo el bloque.
 *
 * La textura es el marmol del PDF de marca con los naranjas desplazados hacia
 * el coral (tono -40 solo en amarillos): bajo el velo, el naranja original se
 * volvia mostaza. Asi comparte paleta con el cielo del video del hero.
 */
export default function MarbleSurface({ children }) {
  return (
    <div className="relative isolate overflow-hidden">
      <Image
        src="/images/brand/vanster-marmol-cierre.jpg"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand/55" />
      <div className="relative">{children}</div>
    </div>
  );
}
