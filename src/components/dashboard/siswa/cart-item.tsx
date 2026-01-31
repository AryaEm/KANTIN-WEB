import Image from 'next/image';
import { CartItem } from '@/app/types';
import { X } from 'lucide-react';

export default function CartItems({
  item,
  onPlus,
  onMinus,
  onRemove,
}: {
  item: CartItem; 
  onPlus: () => void;
  onMinus: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex justify-between items-center rounded-xl border border-white/10 bg-white/5 p-4 Poppins">
      <div className="flex items-center gap-4">
        <div className="border border-teal-400/50 rounded-lg h-20 w-20">
          {item.foto   ? (
            <Image
              src={item.foto ?? ""}
              alt={item.nama_menu}
              width={80}
              height={80}
              className="h-full object-cover rounded-lg"
              unoptimized
            />
          ) : (
            <span className="text-white/30 text-sm flex justify-center items-center h-full text-center">
              No <br /> Image
            </span>
          )}
        </div>

        <div>
          <h4 className="font-medium text-white">{item.nama_menu}</h4>

          <div className="flex gap-2">
            {item.harga_asli !== item.harga_setelah_diskon && (
              <span className="line-through text-white/40 text-sm">
                Rp {item.harga_asli.toLocaleString()}
              </span>
            )}

            <span className="text-teal-400 font-semibold">
              Rp {item.harga_setelah_diskon.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 text-white">
        <div className="w-32 flex justify-between items-center">
          <button
            onClick={onMinus}
            className="w-8 h-8 border border-white/15 hover:bg-teal-400 hover:text-black transition-all outline-none rounded-lg"
          >
            −
          </button>

          <span>{item.qty}</span>

          <button
            onClick={onPlus}
            className="w-8 h-8 border border-white/15 hover:bg-teal-400 hover:text-black transition-all outline-none rounded-lg"
          >
            +
          </button>
        </div>

        <button onClick={onRemove} className="text-red-400 ml-2">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
