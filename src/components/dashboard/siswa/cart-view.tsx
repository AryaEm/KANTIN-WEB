'use client';

import EmptyCart from './empty-cart';
import CartItem from './cart-item';
import CartSummary from './cart-summary';

import { CartItem as Item } from '@/app/types';

export default function CartView({
  cart,
  setCart,
  onCheckout,
  loading,
}: {
  cart: Item[];
  setCart: React.Dispatch<React.SetStateAction<Item[]>>;
  onCheckout: () => void;
  loading: boolean;
}) {

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 space-y-4">
        {cart.map(item => (
          <CartItem
            key={item.id_menu}
            item={item}
            onPlus={() =>
              setCart(prev =>
                prev.map(i =>
                  i.id_menu === item.id_menu
                    ? { ...i, qty: i.qty + 1 }
                    : i
                )
              )
            }
            onMinus={() =>
              setCart(prev =>
                prev.map(i =>
                  i.id_menu === item.id_menu
                    ? { ...i, qty: Math.max(1, i.qty - 1) }
                    : i
                )
              )
            }
            onRemove={() =>
              setCart(prev =>
                prev.filter(i => i.id_menu !== item.id_menu)
              )
            }
          />
        ))}

      </div>

      <CartSummary
        cart={cart}
        onCheckout={onCheckout}
        loading={loading}
      />
    </div>
  );
}
