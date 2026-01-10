export type Menu = {
  id: number
  name: string
  category: 'makanan' | 'minuman'
  description: string
  image?: string
  price: number
  discount?: number
}

export type Stan = {
  id: number
  name: string
  owner: string
  phone: string
  menus: Menu[]
}

export type CartItem = {
  id: number
  name: string
  image?: string
  price: number
  originalPrice?: number
  qty: number
}
