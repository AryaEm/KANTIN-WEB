import { Menu } from '@/app/types';
import Image from 'next/image';

type Props = {
  menu: Menu;
  onAddToCart: (menu: Menu) => void;
};

export default function MenuCard({ menu, onAddToCart }: Props) {
  const hasDiscount = menu.discount && menu.discount > 0;

  const finalPrice = hasDiscount
    ? menu.price - (menu.price * menu.discount!) / 100
    : menu.price;

  return (
    <div className="relative rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition">
      
      {hasDiscount && (
        <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full 
          bg-teal-500/20 text-teal-400 border border-teal-400/30">
          {menu.discount}%
        </span>
      )}

      <div className="h-32 rounded-lg bg-white/10 mb-4 flex items-center justify-center">
        {menu.image ? (
          <Image
            src={menu.image}
            alt={menu.name}
            className="h-full object-cover rounded-lg"
          />
        ) : (
          <span className="text-white/30 text-sm">No Image</span>
        )}
      </div>

      <h4 className="font-medium mb-1">{menu.name}</h4>

      <div className="flex items-center gap-2 mb-4">
        {hasDiscount && (
          <span className="text-xs text-white/40 line-through">
            Rp {menu.price.toLocaleString()}
          </span>
        )}

        <span className="text-teal-400 font-semibold">
          Rp {finalPrice.toLocaleString()}
        </span>
      </div>

      <button
        onClick={() => onAddToCart(menu)}
        className="w-full rounded-lg bg-teal-500 py-2 text-black font-medium hover:bg-teal-400 transition outline-none"
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
}
