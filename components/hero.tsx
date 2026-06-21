export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-terracotta-100/60 via-cream to-cream px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="h-px w-8 bg-terracotta-300" />
          <span className="font-sans text-xs font-medium uppercase tracking-[0.25em] text-terracotta-500">
            Hecho a mano con amor
          </span>
          <span className="h-px w-8 bg-terracotta-300" />
        </div>

        <h1 className="font-display text-4xl leading-tight tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
          Regalos Artesanales
          <br />
          <span className="text-terracotta-500">con alma y propósito</span>
        </h1>

        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-stone sm:mt-6 sm:text-lg">
          Descubre nuestra colección de regalos únicos, hechos a mano con dedicación por artesanos
          locales. Cada pieza cuenta una historia.
        </p>

        <a
          href="#catalogo"
          className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-terracotta-500 px-8 text-sm font-medium text-white transition-all hover:bg-terracotta-600 hover:shadow-lg hover:shadow-terracotta-500/25 active:scale-[0.98] sm:mt-10"
        >
          Explorar colección
          <span className="text-lg">↓</span>
        </a>
      </div>

      <div className="mx-auto mt-14 max-w-3xl sm:mt-16">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4">
          {[
            { id: 'cajas', label: 'Cajas' },
            { id: 'desayunos', label: 'Desayunos' },
          ].map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="group flex flex-col items-center gap-2 rounded-2xl bg-white/70 px-3 py-4 text-center shadow-sm ring-1 ring-stone-light/40 backdrop-blur-sm transition-all hover:-translate-y-1 hover:bg-white hover:shadow-md"
            >
              <span className="text-[11px] font-medium leading-tight text-charcoal sm:text-xs">
                {cat.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-terracotta-200/20 blur-3xl" />
    </section>
  );
}
