import FadeIn from '@/components/animations/FadeIn';

export default function ProductShowcase({ items = [] }) {
  return (
    <>
      {items.map((item, i) => (
        <section
          key={item.id}
          id={i === 0 ? 'productos' : undefined}
          className="bg-surface px-6 py-16 md:px-12"
        >
          <FadeIn>
            <article className="mx-auto flex min-h-[80vh] max-w-4xl flex-col justify-end border border-background p-8 md:p-14">
              <div className="flex-1 bg-backgroundAlt" />
              <h3 className="mt-10 font-serif text-5xl uppercase leading-[0.95] tracking-tight text-text md:text-7xl">
                {item.name}
              </h3>
              <div className="mt-8 flex items-end justify-between font-sans text-[10px] uppercase tracking-[0.08em] text-textMuted md:text-[11px]">
                <span>
                  {String(i + 1).padStart(2, '0')} — {item.audience}
                </span>
                <span>Vänster per a L&apos;Occitane · 2027</span>
              </div>
            </article>
          </FadeIn>
        </section>
      ))}
    </>
  );
}
