import Hero from '@/components/sections/Hero';
import Intro from '@/components/sections/Intro';
import ProductShowcase from '@/components/sections/ProductShowcase';
import About from '@/components/sections/About';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import FilmGrain from '@/components/animations/FilmGrain';
import SmoothScroll from '@/components/animations/SmoothScroll';
import Loader from '@/components/animations/Loader';
import LavenderScroll from '@/components/ui/LavenderScroll';
import SiteHeader from '@/components/ui/SiteHeader';
import MarbleClosing from '@/components/ui/MarbleClosing';
import { loccitane } from '@/content/loccitane';
import { vanster } from '@/content/vanster';

export default function Home() {
  return (
    <SmoothScroll>
      <Loader />
      <SiteHeader />
      <LavenderScroll />
      <FilmGrain />
      <main>
        <Hero content={loccitane.hero} />
        <Intro text={loccitane.intro} />
        <ProductShowcase items={loccitane.products} />
        <MarbleClosing top={<About content={vanster.about} />}>
          <CTA content={loccitane.cta} />
          <Footer />
        </MarbleClosing>
      </main>
    </SmoothScroll>
  );
}
