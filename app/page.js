import Hero from '@/components/sections/Hero';
import ProductShowcase from '@/components/sections/ProductShowcase';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import FilmGrain from '@/components/animations/FilmGrain';
import SmoothScroll from '@/components/animations/SmoothScroll';
import Loader from '@/components/animations/Loader';
import SideScrollIndicator from '@/components/ui/SideScrollIndicator';
import MarbleSurface from '@/components/ui/MarbleSurface';
import ArchDefs from '@/components/ArchDefs';
import { loccitane } from '@/content/loccitane';

// Un punto de la navegacion lateral por cada seccion real de la pagina. Los
// id tienen que coincidir con los de las secciones.
const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  ...loccitane.products.map((product) => ({ id: product.id, label: product.navLabel })),
  { id: 'contacto', label: 'Contacto' },
];

export default function Home() {
  return (
    <SmoothScroll>
      <Loader />
      <ArchDefs />
      <SideScrollIndicator sections={SECTIONS} />
      <FilmGrain />
      <main>
        <Hero content={loccitane.hero} />
        <ProductShowcase items={loccitane.products} />
        <MarbleSurface>
          <CTA content={loccitane.cta} />
          <Footer />
        </MarbleSurface>
      </main>
    </SmoothScroll>
  );
}
