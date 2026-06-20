'use client';

import { useCartStore } from '@/lib/cart-store';
import { AnimatePresence, motion } from 'framer-motion';
import { Info, LayoutGrid, MessageCircle, ShoppingBag } from 'lucide-react';
import { Great_Vibes } from 'next/font/google';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
});

const navItems = [
  { href: '/catalogo', icon: LayoutGrid, label: 'Catálogo' },
  { href: '/informacion', icon: Info, label: 'Información' },
  { href: '/contacto', icon: MessageCircle, label: 'Contacto' },
];

export function Header() {
  const pathname = usePathname();
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (href: string) => {
    if (href === '/catalogo') {
      return pathname === '/catalogo' || pathname.startsWith('/producto');
    }
    return pathname === href;
  };

  return (
    <header className="relative border-b border-stone-light/30 bg-cream">
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: 'url(/background.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className={`${greatVibes.className} text-3xl leading-none text-charcoal sm:text-4xl`}
        >
          Floralé
        </Link>

        <div className="flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'bg-terracotta-100 text-terracotta-600'
                  : 'text-stone hover:bg-stone-light/30 hover:text-charcoal'
              }`}
              aria-label={item.label}
            >
              <item.icon className="h-[18px] w-[18px]" />
            </Link>
          ))}
          <Link
            href="/carrito"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors text-stone hover:bg-stone-light/30 hover:text-charcoal"
            aria-label="Carrito"
          >
            <ShoppingBag className="h-[18px] w-[18px]" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-terracotta-500 text-[10px] font-semibold text-white"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </div>
    </header>
  );
}
