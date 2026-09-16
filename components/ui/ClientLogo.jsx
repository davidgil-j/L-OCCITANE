import Image from 'next/image';

/**
 * Logo oficial de L'Occitane en Provence.
 * Archivo: public/images/brand/loccitane-logo-black.png
 * (fondo transparente, negro / Noir des Terres, formato horizontal oficial).
 * No recolorear ni deformar -- así lo exige la guía de marca.
 */
export default function ClientLogo({ className = '' }) {
  return (
    <div className={className}>
      <Image
        src="/images/brand/loccitane-logo-black.png"
        alt="L'Occitane en Provence"
        width={320}
        height={80}
        className="mx-auto h-auto w-40 md:w-48"
        priority
      />
    </div>
  );
}
