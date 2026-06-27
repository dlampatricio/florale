import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://florale-uy.vercel.app'),
  title: 'Floralé — Regalos Artesanales Hechos a Mano con Amor',
  description:
    'Descubre regalos artesanales únicos, hechos a mano con amor por artesanos locales. Velas, jabones, cerámica y más.',
  openGraph: {
    title: 'Floralé — Regalos Artesanales Hechos a Mano con Amor',
    description:
      'Descubre regalos artesanales únicos, hechos a mano con amor por artesanos locales. Velas, jabones, cerámica y más.',
    siteName: 'Floralé',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Floralé — Regalos Artesanales Hechos a Mano con Amor',
    description:
      'Descubre regalos artesanales únicos, hechos a mano con amor por artesanos locales.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${sora.variable} scroll-smooth`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
