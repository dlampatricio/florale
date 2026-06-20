export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  categoryId: CategoryId
  features?: string[]
}

export type CategoryId = 'velas' | 'jabones' | 'ceramica' | 'flores' | 'difusores'

export interface Category {
  id: CategoryId
  name: string
  description: string
  emoji: string
}

export interface CartItem {
  productId: string
  quantity: number
}
