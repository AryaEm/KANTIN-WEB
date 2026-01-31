import { CartItem } from '@/app/types';

export default function CartSummary({
  cart,
  onCheckout,
  loading,
}: {
  cart: CartItem[];
  onCheckout: () => void;
  loading: boolean;
}) {

  const total = cart.reduce(
    (sum, item) => sum + item.harga_setelah_diskon * item.qty,
    0
  );

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 h-fit Poppins text-white">
      <h3 className="text-lg font-semibold mb-4">Ringkasan</h3>

      {cart.map(item => (
        <div
          key={item.id_menu}
          className="flex justify-between text-sm mb-2"
        >
          <span className="text-white/60">
            {item.nama_menu} x{item.qty}
          </span>
          <span>
            Rp {(item.harga_setelah_diskon * item.qty).toLocaleString()}
          </span>
        </div>
      ))}

      <div className="border-t border-white/10 my-4" />

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span className="text-teal-400">
          Rp {total.toLocaleString()}
        </span>
      </div>

      <button
        disabled={loading}
        onClick={onCheckout}
        className={`mt-6 w-full rounded-xl py-2 font-semibold outline-none transition-all
    ${loading
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-teal-500 text-black hover:bg-teal-400"
          }`}
      >
        {loading ? "Memproses..." : "Checkout"}
      </button>

    </div>
  );
}
