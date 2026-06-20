'use client';

import { motion } from 'framer-motion';
import { Great_Vibes } from 'next/font/google';
import Link from 'next/link';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
});

export default function LandingPage() {
  return (
    <main className="relative grid h-screen w-full place-items-center overflow-hidden bg-gradient-to-b from-cream via-terracotta-50/20 to-cream">
      <div
        className="absolute inset-0 opacity-[0.20]"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="pointer-events-none absolute left-6 top-12 text-5xl text-terracotta-200/15 sm:left-16 sm:top-20 sm:text-6xl lg:text-7xl">
        &#10046;
      </div>
      <div className="pointer-events-none absolute bottom-20 right-10 text-4xl text-terracotta-200/15 sm:bottom-28 sm:right-20 sm:text-5xl lg:text-6xl">
        &#10047;
      </div>
      <div className="pointer-events-none absolute bottom-1/3 left-8 text-3xl text-terracotta-200/10 sm:text-4xl">
        &#10086;
      </div>
      <div className="pointer-events-none absolute right-8 top-1/4 text-3xl text-gold-200/10 sm:text-4xl">
        &#10087;
      </div>

      <div className="relative z-10 flex flex-col items-center px-4">
        <h1
          className={`${greatVibes.className} text-7xl leading-none text-charcoal sm:text-8xl md:text-9xl lg:text-[10rem]`}
        >
          Floralé
        </h1>

        <p className="mt-5 text-xs uppercase tracking-[0.35em] text-stone sm:text-sm">
          Regalos Únicos
        </p>

        <div className="mt-10 flex items-center gap-3">
          <span className="h-px w-8 bg-charcoal sm:w-12" />
          <span className="text-xs text-charcoal">&#10022;</span>
          <span className="h-px w-8 bg-charcoal sm:w-12" />
        </div>

        <Link
          href="/catalogo"
          className="group mt-10 inline-flex h-11 items-center gap-2.5 rounded-full border border-charcoal/20 px-7 text-sm font-medium tracking-wide text-charcoal transition-all hover:border-charcoal/60 hover:bg-charcoal hover:text-cream active:scale-[0.97]"
        >
          Entrar a la Tienda
          <motion.span
            className="inline-block"
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            &#8594;
          </motion.span>
        </Link>
      </div>

      <motion.div
        className="absolute bottom-6 text-stone-light/30"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M6 8l4 4 4-4" />
        </svg>
      </motion.div>
    </main>
  );
}
