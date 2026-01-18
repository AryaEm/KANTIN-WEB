import Cookies from 'js-cookie'
import { CartItem } from '@/app/types'

const CART_KEY = 'kantin_cart'

export const getCartCookie = (): CartItem[] => {
  const raw = Cookies.get(CART_KEY)
  if (!raw) return []

  try {
    return JSON.parse(raw)
  } catch {
    return []
  }
}

export const setCartCookie = (cart: CartItem[]) => {
  Cookies.set(CART_KEY, JSON.stringify(cart), {
    expires: 1, // 1 hari
  })
}

export const clearCartCookie = () => {
  Cookies.remove(CART_KEY)
}
