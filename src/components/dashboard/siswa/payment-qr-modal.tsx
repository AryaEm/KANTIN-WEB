import { useEffect, useState } from 'react';
import { X, CheckCircle, Banknote } from 'lucide-react';
import { PaymentMethod } from './payment-method-selector';
import Image from 'next/image';

interface PaymentQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  paymentMethod: PaymentMethod;
  totalAmount: number;
  orderId?: number;
}

const paymentMethodNames: Record<PaymentMethod, string> = {
  qris: 'QRIS',
  gopay: 'GoPay',
  cash: 'Cash',
  dana: 'DANA',
};

const paymentMethodColors: Record<PaymentMethod, string> = {
  qris: 'from-blue-500 to-blue-600',
  gopay: 'from-green-500 to-green-600',
  cash: 'from-yellow-500 to-yellow-600',
  dana: 'from-cyan-500 to-cyan-600',
};

const qrCodeImages: Record<Exclude<PaymentMethod, 'cash'>, string> = {
  qris: '/qr/qris.jpg',
  gopay: '/qr/gopay.jpeg',
  dana: '/qr/dana.png',
};

export default function PaymentQRModal({
  isOpen,
  onClose,
  paymentMethod,
  totalAmount,
  orderId,
}: PaymentQRModalProps) {
  const [countdown, setCountdown] = useState(5);
  const [isSuccess, setIsSuccess] = useState(false);
  const isCash = paymentMethod === 'cash';

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5);
      setIsSuccess(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsSuccess(true);
          setTimeout(() => {
            onClose();
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        <div className={`bg-gradient-to-r ${paymentMethodColors[paymentMethod]} p-6 text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm mb-3">
              <span className="text-xl">
                {paymentMethod === 'qris' && '📱'}
                {paymentMethod === 'gopay' && '🟢'}
                {paymentMethod === 'cash' && '💵'}
                {paymentMethod === 'dana' && '🔵'}
              </span>
            </div>
            <h3 className="text-xl Fredoka font-bold mb-1">
              {isCash ? 'Pembayaran Cash' : `Scan QR ${paymentMethodNames[paymentMethod]}`}
            </h3>
            <p className="text-white/90 text-sm font-semibold">
              Order #{orderId || '00000'}
            </p>
          </div>
        </div>

        <div className="p-6">
          {!isSuccess ? (
            <>
              {isCash ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-2 border-yellow-200 p-6">
                    <div className="text-center mb-4">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 mb-4">
                        <Banknote className="w-12 h-12 text-yellow-600" />
                      </div>
                      <h4 className="text-lg Fredoka font-bold text-gray-900 mb-2">
                        Siapkan Uang Cash
                      </h4>
                      <p className="text-sm text-gray-600 font-semibold mb-4">
                        Bayar langsung ke penjual saat mengambil pesanan
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-4 border-2 border-yellow-300">
                      <p className="text-sm text-gray-600 font-semibold mb-2 text-center">
                        Total Pembayaran
                      </p>
                      <p className="text-3xl Fredoka font-black text-yellow-600 text-center">
                        Rp {totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-4">
                    <p className="text-xs text-blue-800 font-semibold leading-relaxed">
                      💡 <span className="font-bold">Catatan:</span> Pesanan Anda akan segera diproses. Silakan bayar dengan uang cash pas atau siapkan uang kembalian saat mengambil pesanan di stan.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 p-6 mb-4">
                    <div className="bg-white rounded-xl p-4 shadow-inner mb-4">
                      <div className="aspect-square bg-white rounded-lg flex items-center justify-center border-4 border-gray-900 relative overflow-hidden">
                        <Image
                          src={qrCodeImages[paymentMethod as Exclude<PaymentMethod, 'cash'>]}
                          alt={`QR Code ${paymentMethodNames[paymentMethod]}`}
                          width={300}
                          height={300}
                          className="w-full h-full object-contain"
                          unoptimized
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-600 font-semibold">
                        Total Pembayaran
                      </p>
                      <p className="text-2xl Fredoka font-black text-orange-600">
                        Rp {totalAmount.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl border-2 border-blue-200 p-4">
                    <p className="text-xs text-blue-800 font-semibold text-center leading-relaxed">
                      💡 Buka aplikasi {paymentMethodNames[paymentMethod]} dan scan QR code di atas untuk menyelesaikan pembayaran
                    </p>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center py-8 animate-scale-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h4 className="text-xl Fredoka font-bold text-gray-900 mb-2">
                {isCash ? 'Pesanan Berhasil!' : 'Pembayaran Berhasil!'}
              </h4>
              <p className="text-gray-600 font-semibold">
                Pesanan Anda sedang diproses
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}