import { Menu } from '@/app/types';
import Image from 'next/image';
import { ShoppingCart, Tag, Plus, Minus, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

type Props = {
  menu: Menu;
  cartQuantity?: number;
  onAddToCart: (menu: Menu & {
    harga_asli: number;
    harga_setelah_diskon: number;
  }) => void;
  onUpdateQuantity?: (menuId: number, newQuantity: number) => void;
};

export default function MenuCard({ menu, cartQuantity = 0, onAddToCart, onUpdateQuantity }: Props) {
  const [quantity, setQuantity] = useState(cartQuantity);
  const [showSuccess, setShowSuccess] = useState(false);

  const discount = menu.discount ?? 0;
  const hasDiscount = discount > 0;
  const isAvailable = menu.status === "tersedia";
  const isInCart = quantity > 0;

  const finalPrice = hasDiscount
    ? Math.round(menu.price - (menu.price * discount) / 100)
    : menu.price;

  useEffect(() => {
    setQuantity(cartQuantity);
  }, [cartQuantity]);

  const handleAddToCart = () => {
    if (!isAvailable) return;

    onAddToCart({
      ...menu,
      harga_asli: menu.price,
      harga_setelah_diskon: finalPrice,
    });

    setQuantity(1);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 2000);
  };

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    onUpdateQuantity?.(menu.id, newQty);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      onUpdateQuantity?.(menu.id, newQty);
    } else {
      setQuantity(0);
      onUpdateQuantity?.(menu.id, 0);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg p-5 transition-all group Poppins">
      {showSuccess && (
        <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm rounded-2xl z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 animate-scale-in">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Ditambahkan!</p>
              <p className="text-sm text-gray-600">Ke keranjang</p>
            </div>
          </div>
        </div>
      )}

      {hasDiscount && (
        <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-md z-10">
          <Tag className="w-3 h-3" />
          <span className="text-xs font-bold">{menu.discount}%</span>
        </div>
      )}

      {isInCart && (
        <div className="absolute top-3 left-3 z-20">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500 text-white shadow-lg">
            <ShoppingCart className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">{quantity} di keranjang</span>
          </div>
        </div>
      )}

      <div className="relative w-full rounded-xl overflow-hidden mb-4 bg-gray-100 border-2 border-gray-200">
        {menu.image ? (
          <Image
            src={menu.image}
            alt={menu.name}
            width={400}
            height={250}
            className="object-cover h-48 w-full group-hover:scale-110 transition-transform duration-300"
            unoptimized
          />
        ) : (
          <div className="h-48 flex items-center justify-center">
            <span className="text-gray-400 text-sm font-medium">
              No Image
            </span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-lg text-white text-xs font-semibold capitalize">
          {menu.jenis_menu}
        </div>
      </div>

      <div className='min-h-[25dvh] flex flex-col justify-between'>
        <div>
          <div className="flex justify-between items-start mb-2">
            <h4 className="Fredoka font-bold text-gray-900 text-lg flex-1 pr-2">
              {menu.name}
            </h4>
            <span
              className={`text-xs px-2.5 py-1 rounded-full font-bold whitespace-nowrap
          ${isAvailable
                  ? "bg-green-100 text-green-600 border-2 border-green-300"
                  : "bg-red-100 text-red-600 border-2 border-red-300"
                }`}
            >
              {menu.status}
            </span>
          </div>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
            {menu.description}
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-4">
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through font-medium">
                Rp {menu.price.toLocaleString('id-ID')}
              </span>
            )}

            <span className="text-orange-600 font-bold text-lg Fredoka">
              Rp {finalPrice.toLocaleString('id-ID')}
            </span>
          </div>


          {!isInCart ? (
            <button
              disabled={!isAvailable}
              onClick={handleAddToCart}
              className={`w-full rounded-xl py-3 font-bold transition-all flex items-center justify-center gap-2
            ${isAvailable
                  ? "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-md hover:shadow-lg hover:scale-105"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
          `}
            >
              <ShoppingCart className="w-4 h-4" />
              {isAvailable ? "Tambah ke Keranjang" : "Stok Habis"}
            </button>
          ) : (
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-3 border-2 border-orange-300">
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handleDecrease}
                  className="w-10 h-10 rounded-lg bg-white hover:bg-orange-100 border-2 border-orange-300 hover:border-orange-400 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group/btn"
                >
                  <Minus className="w-5 h-5 text-orange-600 group-hover/btn:text-orange-700" />
                </button>

                <div className="flex-1 text-center">
                  <div className="bg-white rounded-lg py-2 px-4 border-2 border-orange-300">
                    <p className="text-xs text-gray-500 font-semibold mb-0.5">Jumlah</p>
                    <p className="text-2xl Fredoka font-black text-orange-600">{quantity}</p>
                  </div>
                </div>

                <button
                  onClick={handleIncrease}
                  className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 border-2 border-orange-400 flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="mt-3 pt-3 border-t-2 border-orange-200 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Subtotal:</span>
                <span className="text-lg Fredoka font-black text-orange-600">
                  Rp {(finalPrice * quantity).toLocaleString('id-ID')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}