'use client';

import EmptyCart from './empty-cart';
import CartItem from './cart-item';
import CartSummary from './cart-summary';
import { ShoppingBag, Package } from 'lucide-react';

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

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-white via-orange-50/50 to-yellow-50/50 rounded-2xl border-2 border-orange-200 p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl Fredoka font-bold text-gray-900">Keranjang Belanja</h2>
              <p className="text-gray-600 font-medium">
                {totalItems} item siap untuk checkout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border-2 border-orange-300 shadow-sm">
            <Package className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-xs text-gray-500 font-semibold">Total Item</p>
              <p className="text-lg Fredoka font-bold text-orange-600">{cart.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
            <h3 className="text-lg Fredoka font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 text-sm">
                {cart.length}
              </span>
              Item dalam Keranjang
            </h3>
            
            <div className="space-y-3">
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
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <CartSummary
              cart={cart}
              onCheckout={onCheckout}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}