import { CartItem } from '@/app/types';

export default function CartSummary({
  cart,
  onCheckout,
}: {
  cart: CartItem[];
  onCheckout: () => void;
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
        onClick={onCheckout}
        className="mt-6 w-full rounded-xl bg-teal-500 py-2 text-black font-semibold outline-none hover:bg-teal-400 transition-all"
      >
        Checkout
      </button>
    </div>
  );
}
