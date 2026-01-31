import { CartItem } from "@/app/types";

const CART_KEY = "siswa_cart";

export const loadCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_KEY);
};
