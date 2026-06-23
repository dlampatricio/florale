import type { Category, Product } from '@/types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const headers = {
  apikey: SUPABASE_ANON_KEY || '',
  Authorization: `Bearer ${SUPABASE_ANON_KEY || ''}`,
  'Content-Type': 'application/json',
};

async function fetchFromSupabase<T>(path: string): Promise<T[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, { headers, cache: 'no-store' });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  const data = await fetchFromSupabase<Record<string, unknown>>(
    'products?select=*&order=created_at.asc'
  );
  return data.map(mapProduct);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const data = await fetchFromSupabase<Record<string, unknown>>(
    `products?select=*&id=eq.${encodeURIComponent(id)}`
  );
  const product = data[0];
  return product ? mapProduct(product) : undefined;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const data = await fetchFromSupabase<Record<string, unknown>>(
    `products?select=*&category_id=eq.${encodeURIComponent(categoryId)}&order=created_at.asc`
  );
  return data.map(mapProduct);
}

export async function getCategories(): Promise<Category[]> {
  return fetchFromSupabase<Category>('categories?select=*&order=id.asc');
}

function mapProduct(item: Record<string, unknown>): Product {
  return {
    id: item.id as string,
    name: item.name as string,
    description: (item.description as string) || '',
    price: item.price as number,
    image: (item.image as string) || '',
    categoryId: String(item.category_id),
  };
}
