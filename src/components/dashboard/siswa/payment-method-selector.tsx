import { Smartphone, Wallet } from 'lucide-react';

export type PaymentMethod = 'qris' | 'gopay' | 'cash' | 'dana';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const paymentMethods = [
  {
    id: 'qris' as PaymentMethod,
    name: 'QRIS',
    icon: '📱',
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-300',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'gopay' as PaymentMethod,
    name: 'GoPay',
    icon: '🟢',
    color: 'from-green-500 to-green-600',
    borderColor: 'border-green-300',
    bgColor: 'bg-green-50',
  },
  {
    id: 'cash' as PaymentMethod,
    name: 'Cash',
    icon: '💵',
    color: 'from-yellow-500 to-yellow-600',
    borderColor: 'border-yellow-300',
    bgColor: 'bg-yellow-50',
  },
  {
    id: 'dana' as PaymentMethod,
    name: 'DANA',
    icon: '🔵',
    color: 'from-cyan-500 to-cyan-600',
    borderColor: 'border-cyan-300',
    bgColor: 'bg-cyan-50',
  },
];

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <Wallet className="w-4 h-4 text-gray-600" />
        <h4 className="text-sm font-bold text-gray-900">Metode Pembayaran</h4>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onMethodChange(method.id)}
            className={`relative p-3 rounded-xl border-2 transition-all hover:scale-105 ${
              selectedMethod === method.id
                ? `${method.borderColor} ${method.bgColor} shadow-md`
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            {selectedMethod === method.id && (
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}

            <div className="flex flex-col items-center gap-2">
              <span className="text-2xl">{method.icon}</span>
              <span className={`text-xs font-bold ${
                selectedMethod === method.id ? 'text-gray-900' : 'text-gray-600'
              }`}>
                {method.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}