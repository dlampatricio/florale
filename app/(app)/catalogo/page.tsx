import { ProductGrid } from '@/components/product-grid';
import { getProducts, getCategories } from '@/lib/products';
import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
});

export default async function CatalogoPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="bg-cream pb-20">
      <div className="mx-auto max-w-6xl px-4 pt-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className={`${greatVibes.className} text-5xl text-charcoal sm:text-7xl`}>
            Nuestros Regalos
          </h1>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-px w-6 bg-terracotta-300/60" />
            <span className="text-[10px] text-terracotta-400/60">&#10022;</span>
            <span className="h-px w-6 bg-terracotta-300/60" />
          </div>
        </div>
      </div>
      <ProductGrid products={products} categories={categories} />
    </div>
  );
}
