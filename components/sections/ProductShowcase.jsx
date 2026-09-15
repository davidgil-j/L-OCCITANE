import FadeIn from '@/components/animations/FadeIn';

export default function ProductShowcase({ items = [] }) {
  return (
    <section id="productos" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl divide-y divide-brand/10 border-t border-brand/10">
        {items.map((item, i) => (
          <FadeIn key={item.id} delay={i * 0.05}>
            <article className="grid gap-6 py-12 md:grid-cols-2 md:items-center md:gap-16 md:py-16">
              <div
                className={`aspect-[4/3] bg-surface ${i % 2 === 1 ? 'md:order-2' : ''}`}
              />
              <div>
                <span className="font-serif text-sm text-textMuted">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-serif text-2xl text-text">{item.name}</h3>
                <p className="mt-3 text-textMuted">{item.description}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
