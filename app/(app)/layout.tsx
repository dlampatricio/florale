import { Header } from '@/components/header';
import { Great_Vibes } from 'next/font/google';
import Link from 'next/link';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
});

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-cream via-terracotta-50/20 to-cream">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.20]"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10">
        <Header />
        {children}
      </div>

      <footer className="relative z-10 border-t border-stone-light/30 bg-cream">
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: 'url(/background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-10 px-4 py-10 text-center sm:px-6">
          <div className="mx-auto max-w-6xl">
            <span className={`${greatVibes.className} text-2xl text-charcoal`}>Floralé</span>
            <p className="mt-2 text-xs text-stone">
              Design and Dev by
              <Link href="https://dlampatricio.github.io"> David Lam</Link>
            </p>
            <p className="mt-4 text-xs text-charcoal/50">
              © {new Date().getFullYear()} Floralé. Todos los Derechos Reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
