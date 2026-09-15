import FadeIn from '@/components/animations/FadeIn';

export default function ProductShowcase({ items = [] }) {
  return (
    <section id="productos" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2">
          {items.map((item, i) => (
            <FadeIn key={item.id} delay={i * 0.05}>
              <article>
                <div className="aspect-[4/3] rounded-lg bg-neutral-100" />
                <h3 className="mt-4 text-xl font-medium">{item.name}</h3>
                <p className="mt-2 text-neutral-600">{item.description}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
