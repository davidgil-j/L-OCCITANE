import Link from 'next/link';
import Lockup from '@/components/ui/Lockup';

export const metadata = { title: "Página no encontrada | L'Occitane × Vänster" };

/**
 * Pagina para enlaces mal escritos o caducados: en español y con la
 * identidad de la propuesta, con un unico camino de vuelta.
 */
export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-10 bg-vanster px-6 text-center text-background">
      <Lockup />
      <div>
        <h1 className="text-balance font-serif text-[clamp(2.25rem,6vw,4rem)] uppercase leading-[0.95] tracking-tight">
          Esta página no existe
        </h1>
        <p className="mx-auto mt-5 max-w-sm text-pretty font-body text-lg leading-relaxed text-background/90">
          Puede que el enlace esté mal escrito o que haya cambiado. La propuesta sigue en la página principal.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex h-14 items-center rounded-full border border-background px-8 text-[15px] tracking-[0.15em] transition-colors duration-300 [font-variant-caps:all-small-caps] hover:bg-background hover:text-brand"
      >
        Ver la propuesta
      </Link>
    </main>
  );
}
