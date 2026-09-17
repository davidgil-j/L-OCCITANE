import Hero from '@/components/sections/Hero';
import ProductShowcase from '@/components/sections/ProductShowcase';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import PageBackground from '@/components/animations/PageBackground';
import FilmGrain from '@/components/animations/FilmGrain';
import SmoothScroll from '@/components/animations/SmoothScroll';
import ArchDefs from '@/components/ArchDefs';
import { loccitane } from '@/content/loccitane';

export default function Home() {
  return (
    <SmoothScroll>
      <ArchDefs />
      <PageBackground />
      <FilmGrain />
      <main>
        <Hero content={loccitane.hero} />
        <ProductShowcase items={loccitane.products} />
        <CTA content={loccitane.cta} />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
