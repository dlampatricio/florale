import type { Product, Category } from '@/types'

export const categories: Category[] = [
  {
    id: 'velas',
    name: 'Velas Aromáticas',
    description: 'Velas hechas a mano con cera de soya y aceites esenciales naturales',
    emoji: '🕯️',
  },
  {
    id: 'jabones',
    name: 'Jabones Artesanales',
    description: 'Jabones naturales con ingredientes orgánicos y fragancias únicas',
    emoji: '🧼',
  },
  {
    id: 'ceramica',
    name: 'Cerámica',
    description: 'Piezas únicas de cerámica hechas a mano por artesanos locales',
    emoji: '🏺',
  },
  {
    id: 'flores',
    name: 'Flores Secas',
    description: 'Arreglos de flores preservadas que duran toda la vida',
    emoji: '💐',
  },
  {
    id: 'difusores',
    name: 'Difusores',
    description: 'Difusores de aroma con varillas y aceites esenciales puros',
    emoji: '✨',
  },
]

export const products: Product[] = [
  {
    id: 'vela-lavanda',
    name: 'Vela Aromática de Lavanda',
    description:
      'Vela artesanal de cera de soya con aceite esencial puro de lavanda. Aroma relajante que perdura hasta 40 horas.',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=600&fit=crop',
    categoryId: 'velas',
    features: ['40 horas de duración', 'Cera de soya natural', 'Aceite esencial puro', 'Mecha de algodón'],
  },
  {
    id: 'vela-vainilla',
    name: 'Vela Aromática de Vainilla',
    description:
      'Vela artesanal con aroma dulce y cálido a vainilla bourbon. Crea una atmósfera acogedora en cualquier espacio.',
    price: 13000,
    image: 'https://images.unsplash.com/photo-1600612253971-422e7f7faeb6?w=600&h=600&fit=crop',
    categoryId: 'velas',
    features: ['45 horas de duración', 'Cera de soya natural', 'Fragancia premium', 'Presentación en vidrio'],
  },
  {
    id: 'jabon-rosa',
    name: 'Jabón Artesanal de Rosa',
    description:
      'Jabón natural elaborado con pétalos de rosa secos, aceite de oliva y manteca de karité. Ideal para pieles sensibles.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1600857062245-4e2dce5e1a18?w=600&h=600&fit=crop',
    categoryId: 'jabones',
    features: ['Ingredientes 100% naturales', 'Aceite de oliva', 'Manteca de karité', 'Pétalos de rosa reales'],
  },
  {
    id: 'jabon-miel',
    name: 'Jabón de Miel y Avena',
    description:
      'Jabón exfoliante suave con miel de abejas local y avena coloidal. Nutre y renueva la piel de forma natural.',
    price: 9000,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&h=600&fit=crop',
    categoryId: 'jabones',
    features: ['Exfoliante suave', 'Miel local', 'Avena coloidal', 'Sin químicos artificiales'],
  },
  {
    id: 'maceta-ceramica',
    name: 'Maceta Cerámica Hecha a Mano',
    description:
      'Maceta de cerámica artesanal con esmaltado natural. Cada pieza es única con su propio carácter y textura.',
    price: 15900,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=600&fit=crop',
    categoryId: 'ceramica',
    features: ['Hecha a mano', 'Esmaltado natural', 'Pieza única', 'Incluye plato base'],
  },
  {
    id: 'tazas-ceramica',
    name: 'Set de Tazas Artesanales (x2)',
    description:
      'Par de tazas de cerámica hechas a torno. Perfectas para disfrutar de tu café o té con estilo artesanal.',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop',
    categoryId: 'ceramica',
    features: ['Set de 2 unidades', 'Hechas a torno', 'Capacidad 280ml', 'Esmalte apto para alimentos'],
  },
  {
    id: 'ramo-flores-secas',
    name: 'Ramo de Flores Secas Eterno',
    description:
      'Arreglo de flores preservadas que mantienen su belleza por meses. Combinación de eucalipto, lavanda y trigo.',
    price: 14500,
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=600&fit=crop',
    categoryId: 'flores',
    features: ['Duración de meses', 'Eucalipto natural', 'Lavanda presevada', 'Atado con yute artesanal'],
  },
  {
    id: 'ramo-minimalista',
    name: 'Mini Ramo Seco Boho',
    description:
      'Pequeño arreglo floral seco con estilo boho. Ideal para decoración de escritorio o espacios pequeños.',
    price: 9500,
    image: 'https://images.unsplash.com/photo-1589128777073-2636ae7d5a51?w=600&h=600&fit=crop',
    categoryId: 'flores',
    features: ['Formato compacto', 'Estilo boho-chic', 'Incluye maceta decorativa', 'Mantenimiento cero'],
  },
  {
    id: 'difusor-lavanda',
    name: 'Difusor de Lavanda y Eucalipto',
    description:
      'Difusor de varillas con aceite esencial de lavanda y eucalipto. Aroma fresco y natural que dura hasta 3 meses.',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1613526951055-4a702bea2228?w=600&h=600&fit=crop',
    categoryId: 'difusores',
    features: ['Duración 3 meses', 'Varillas de rattan', 'Aceite esencial puro', 'Frasco de vidrio soplado'],
  },
  {
    id: 'set-regalo',
    name: '✨ Set de Regalo Bienestar',
    description:
      'Caja de regalo que incluye vela aromática, jabón artesanal y difusor. El regalo perfecto para consentir.',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238ae1d?w=600&h=600&fit=crop',
    categoryId: 'difusores',
    features: ['Vela aromática 30h', 'Jabón artesanal 100g', 'Difusor 100ml', 'Caja de regalo incluida'],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId)
}
