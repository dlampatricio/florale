import type { Category, Product } from '@/types';
import { ProductCard } from './product-card';

interface GroupedProducts {
  [key: string]: Product[];
}

export function ProductGrid({ products, categories }: { products: Product[]; categories: Category[] }) {
  const grouped = products.reduce<GroupedProducts>((acc, product) => {
    if (!acc[product.categoryId]) acc[product.categoryId] = [];
    acc[product.categoryId].push(product);
    return acc;
  }, {});

  return (
    <section id="catalogo" className="bg-cream px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {categories.map((category) => {
          const catProducts = grouped[category.id];
          if (!catProducts) return null;

          const startIndex = products.indexOf(catProducts[0]);

          return (
            <div key={category.id} id={category.id} className="mb-14 scroll-mt-20">
              <div className="mb-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1.5 h-8 w-1 shrink-0 rounded-full bg-terracotta-400" />
                  <div>
                    <h3 className="font-display text-2xl text-charcoal">{category.name}</h3>
                    <p className="mt-0.5 text-sm text-stone">{category.description}</p>
                  </div>
                </div>
                <hr className="mt-4 border-stone-light/30" />
              </div>

              <div className="grid gap-6 grid-cols-2 lg:grid-cols-3">
                {catProducts.map((product) => {
                  const idx = startIndex + catProducts.indexOf(product);
                  return <ProductCard key={product.id} product={product} index={idx} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
