import { Menu } from '@/app/types';
import Image from 'next/image';

type Props = {
  menu: Menu;
  onAddToCart: (menu: Menu & {
    harga_asli: number;
    harga_setelah_diskon: number;
  }) => void;
};

export default function MenuCard({ menu, onAddToCart }: Props) {
  const discount = menu.discount ?? 0;
  const hasDiscount = discount > 0;

  const finalPrice = hasDiscount
    ? Math.round(menu.price - (menu.price * discount) / 100)
    : menu.price;

  return (
    <div className="relative rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition Poppins">
      {hasDiscount && (
        <span className="absolute top-2 right-1 text-xs px-3 py-1 rounded-full 
          bg-teal-500/60 text-white border border-teal-400">
          {menu.discount}%
        </span>
      )}

      <div className="w-full rounded-lg bg-white/10 mb-4 flex items-center justify-center border border-white/10">
        {menu.image ? (
          <Image
            src={menu.image}  
            alt={menu.name}
            width={144} 
            height={144}
            className="object-cover h-44 rounded-lg w-full"
          />
        ) : (
          <span className="text-white/30 h-44 text-sm flex items-center justify-center">
            No Image
          </span>
        )}
      </div>

      <h4 className="font-medium mb-1">{menu.name}</h4>
      <p className='text-white/60 text-sm mb-1 line-clamp-2'>
        {menu.description}
      </p>

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
        onClick={() =>
          onAddToCart({
            ...menu,
            harga_asli: menu.price,
            harga_setelah_diskon: finalPrice,
          })
        }
        className="w-full rounded-lg bg-teal-500 py-2 text-black font-medium hover:bg-teal-400 transition outline-none"
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
}
