import Image from 'next/image';
import { CartItem } from '@/app/types';
import { X, Plus, Minus, Tag } from 'lucide-react';

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
  const hasDiscount = item.harga_asli !== item.harga_setelah_diskon;
  const subtotal = item.harga_setelah_diskon * item.qty;

  return (
    <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-gray-200 hover:border-orange-300 p-4 transition-all hover:shadow-lg">
      {hasDiscount && (
        <div className="absolute -top-2 -left-4 z-10">
          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg">
            <Tag className="w-3 h-3 text-white" />
            <span className="text-xs font-bold text-white">
              {item.diskon_persen}%
            </span>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-36 h-36 rounded-xl overflow-hidden bg-gray-100 border-2 border-gray-200 group-hover:border-orange-300 transition-colors">
            {item.foto ? (
              <Image
                src={item.foto}
                alt={item.nama_menu}
                width={96}
                height={96}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400 text-xs font-medium text-center">
                  No<br />Image
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-end justify-between gap-2 mb-2">
              
              <h4 className="font-bold text-gray-900 text-base leading-tight flex-1">
                {item.nama_menu}
              </h4>
              <button
                onClick={onRemove}
                className="w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 border-2 border-red-200 hover:border-red-300 flex items-center justify-center transition-all hover:scale-110 group/remove"
                aria-label="Hapus item"
              >
                <X className="w-4 h-4 text-red-500 group-hover/remove:text-red-600" />
              </button>

            </div>

            <div className="flex items-center gap-2 mb-3">
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  Rp {item.harga_asli.toLocaleString('id-ID')}
                </span>
              )}
              <span className="text-base font-bold text-orange-600">
                Rp {item.harga_setelah_diskon.toLocaleString('id-ID')}
              </span>
              <span className="text-xs text-gray-500 font-medium">/ item</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onMinus}
                disabled={item.qty <= 1}
                className="w-9 h-9 rounded-lg border-2 border-gray-300 hover:border-orange-400 bg-white hover:bg-orange-50 flex items-center justify-center transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:border-gray-300"
                aria-label="Kurangi jumlah"
              >
                <Minus className="w-4 h-4 text-gray-700" />
              </button>

              <div className="w-12 h-9 rounded-lg border-2 border-orange-200 bg-orange-50 flex items-center justify-center">
                <span className="font-bold text-orange-600 text-base">{item.qty}</span>
              </div>

              <button
                onClick={onPlus}
                className="w-9 h-9 rounded-lg border-2 border-gray-300 hover:border-orange-400 bg-white hover:bg-orange-50 flex items-center justify-center transition-all hover:scale-110"
                aria-label="Tambah jumlah"
              >
                <Plus className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Subtotal */}
            <div className="text-right">
              <p className="text-xs text-gray-500 font-semibold mb-0.5">Subtotal</p>
              <p className="text-lg Fredoka font-black text-gray-900">
                Rp {subtotal.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}