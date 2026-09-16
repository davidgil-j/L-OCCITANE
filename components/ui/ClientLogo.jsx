import Image from 'next/image';

/**
 * Logo oficial de L'Occitane en Provence.
 * Archivo: public/images/brand/loccitane-logo-black.png
 * (fondo transparente, negro / Noir des Terres, formato horizontal oficial).
 * No deformar, rotar ni encerrar en marco/caja -- así lo exige la guía de
 * marca (design/guias-marca/RESUMEN.md). El color SÍ puede adaptarse segun
 * la intensidad del fondo -- la guía muestra el logo en Noir des Terres,
 * Beige Travertin o blanco sobre fondos oscuros/foto. Como solo tenemos el
 * PNG negro, `invert` lo lleva a blanco (Blanc Brûlé) manteniendo la forma
 * exacta del trazo, sin recrearlo en otra tipografía.
 */
export default function ClientLogo({ className = '', invert = false }) {
  return (
    <div className={className}>
      <Image
        src="/images/brand/loccitane-logo-black.png"
        alt="L'Occitane en Provence"
        width={320}
        height={80}
        className={`mx-auto h-auto w-40 md:w-48 ${invert ? 'brightness-0 invert' : ''}`}
      />
    </div>
  );
}
