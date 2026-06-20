import type { Category, Product } from '@/types';

export const categories: Category[] = [
  {
    id: 'cajas',
    name: 'Cajas de Regalo',
    description: 'Cajas de regalo con un diseño elegante y una variedad de productos',
  },
  {
    id: 'desayunos',
    name: 'Desayunos',
    description:
      'Desayunos deliciosos y saludables preparados con ingredientes frescos y orgánicos',
  },
];

export const products: Product[] = [
  {
    id: 'corazon_red_oso',
    name: 'Box de Corazón con Peluche Oso',
    description:
      'Elegante box en forma de corazón de cartón corrugado. Incluye un peluche de oso (colores según stock), 6 flores de cinta de raso (colores a elección), 6 bombones Ferrero Rocher, cinta de envoltura, lazo decorativo y una mariposa dorada. Se entrega con tarjeta de regalo.',
    price: 1850,
    image: '/products/corazon_red_oso.jpg',
    categoryId: 'cajas',
  },
  {
    id: 'corazon_red',
    name: 'Box Corazón Grande Red',
    description:
      'Box grande en forma de corazón de cartón corrugado. Incluye 8 flores de cinta de raso (colores a elección), 12 bombones Ferrero Rocher, cinta de envoltura, lazo decorativo y una mariposa dorada. Se entrega con tarjeta de regalo.',
    price: 1750,
    image: '/products/corazon_red.jpg',
    categoryId: 'cajas',
  },
  {
    id: 'girasol_bombones',
    name: 'Box con Girasoles y Bombones',
    description:
      'Caja rígida en forma de corazón decorada con cinta. Incluye un oso de peluche (color según stock), 4 girasoles de cinta amarillos, follaje artificial decorativo y 3 bombones Ferrero Rocher. Incluye tarjeta de felicitación gratuita. (Opcionales con costo: globo burbuja, globo de corazón metálico o pack adicional de 3 bombones Ferrero Rocher).',
    price: 1650,
    image: '/products/girasol_bombones.jpg',
    categoryId: 'cajas',
  },
  {
    id: 'girasol_peluche',
    name: 'Box con Girasoles y Peluche',
    description:
      'Caja rígida en forma de corazón decorada con cinta. Incluye un oso de peluche (color según stock), 4 girasoles de cinta amarillos, follaje artificial decorativo. Incluye tarjeta de felicitación gratuita. (Opcionales con costo: globo burbuja, globo de corazón metálico o pack adicional de 3 bombones Ferrero Rocher).',
    price: 1450,
    image: '/products/girasol_peluche.jpg',
    categoryId: 'cajas',
  },
  {
    id: 'corazon_blue',
    name: 'Box Corazón Grande Blue',
    description:
      'Box grande en forma de corazón de cartón corrugado. Incluye 8 flores de cinta de raso (colores a elección), 12 bombones Ferrero Rocher, cinta de envoltura, lazo decorativo y una mariposa dorada. Se entrega con tarjeta de regalo.',
    price: 1750,
    image: '/products/corazon_blue.jpg',
    categoryId: 'cajas',
  },
  {
    id: 'corazon_purple_oso',
    name: 'Box de Corazón con Peluche Oso',
    description:
      'Elegante box en forma de corazón de cartón corrugado. Incluye un peluche de oso (colores según stock), 7 flores de cinta de raso (colores a elección), 12 bombones Ferrero Rocher, cinta de envoltura, lazo decorativo y una mariposa dorada. Se entrega con tarjeta de regalo.',
    price: 2150,
    image: '/products/corazon_purple_oso.jpg',
    categoryId: 'cajas',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}
