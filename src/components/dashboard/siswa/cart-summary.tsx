import { CartItem } from '@/app/types';
import { Receipt, Wallet, ShoppingBag, ArrowRight } from 'lucide-react';
import PaymentMethodSelector, { PaymentMethod } from './payment-method-selector';

export default function CartSummary({
  cart,
  onCheckout,
  loading,
  selectedPaymentMethod,
  onPaymentMethodChange,
}: {
  cart: CartItem[];
  onCheckout: () => void;
  loading: boolean;
  selectedPaymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
}) {

  const subtotal = cart.reduce(
    (sum, item) => sum + item.harga_setelah_diskon * item.qty,
    0
  );

  const totalDiscount = cart.reduce(
    (sum, item) => sum + (item.harga_asli - item.harga_setelah_diskon) * item.qty,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const total = subtotal

  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Receipt className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg Fredoka font-bold text-white">Ringkasan Belanja</h3>
            <p className="text-white/90 text-xs font-semibold">{totalItems} item pesanan</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="space-y-2.5 max-h-52 overflow-y-auto custom-scrollbar">
          {cart.map(item => (
            <div
              key={item.id_menu}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {item.nama_menu}
                </p>
                <p className="text-xs text-gray-500 font-medium">
                  {item.qty} × Rp {item.harga_setelah_diskon.toLocaleString('id-ID')}
                </p>
              </div>
              <span className="text-sm font-bold text-gray-900 ml-2">
                Rp {(item.harga_setelah_diskon * item.qty).toLocaleString('id-ID')}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-gray-100" />

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 font-semibold flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Subtotal
            </span>
            <span className="text-sm font-bold text-gray-900">
              Rp {subtotal.toLocaleString('id-ID')}
            </span>
          </div>

          {totalDiscount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-green-600 font-semibold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Hemat
              </span>
              <span className="text-sm font-bold text-green-600">
                - Rp {totalDiscount.toLocaleString('id-ID')}
              </span>
            </div>
          )}

        </div>

        <div className="border-t-2 border-gray-200" />

        {/* Payment Method Selector */}
        <PaymentMethodSelector
          selectedMethod={selectedPaymentMethod}
          onMethodChange={onPaymentMethodChange}
        />

        <div className="border-t-2 border-gray-200" />

        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-200">
          <div className="flex justify-between items-center mb-1">
            <span className="text-base font-bold text-gray-900">Total Pembayaran</span>
            <div className="text-right">
              <p className="text-2xl Fredoka font-black text-orange-600">
                Rp {total.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>

        <button
          disabled={loading}
          onClick={onCheckout}
          className={`relative w-full rounded-xl py-4 font-bold transition-all flex items-center justify-center gap-3 text-base overflow-hidden group ${
            loading
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl hover:scale-105"
          }`}
        >
          {!loading && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          )}
          
          <span className="relative z-10 flex items-center gap-2">
            {loading ? (
              <>
                <div className="w-5 h-5 border-3 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
                Memproses...
              </>
            ) : (
              <>
                <Wallet className="w-5 h-5" />
                Checkout Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </span>
        </button>
      </div>
    </div>
  );
}