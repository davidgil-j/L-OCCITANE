import Hero from '@/components/sections/Hero';
import ProductShowcase from '@/components/sections/ProductShowcase';
import CTA from '@/components/sections/CTA';
import { loccitane } from '@/content/loccitane';

export default function Home() {
  return (
    <main>
      <Hero content={loccitane.hero} />
      <ProductShowcase items={loccitane.products} />
      <CTA content={loccitane.cta} />
    </main>
  );
}
