import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import ProductShowcase from '@/components/sections/ProductShowcase';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import FilmGrain from '@/components/animations/FilmGrain';
import SmoothScroll from '@/components/animations/SmoothScroll';
import Loader from '@/components/animations/Loader';
import LavenderScroll from '@/components/ui/LavenderScroll';
import MarbleSurface from '@/components/ui/MarbleSurface';
import { loccitane } from '@/content/loccitane';

export default function Home() {
  return (
    <SmoothScroll>
      <Loader />
      <LavenderScroll />
      <FilmGrain />
      <main>
        <Hero content={loccitane.hero} />
        <Intro text={loccitane.intro} />
        <ProductShowcase items={loccitane.products} />
        <MarbleSurface>
          <CTA content={loccitane.cta} />
          <Footer />
        </MarbleSurface>
      </main>
    </SmoothScroll>
  );
}
