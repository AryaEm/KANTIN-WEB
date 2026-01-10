import { Check, X } from "lucide-react";

export default function OrderView() {
  const orders = [
    {
      id: "TRX-001",
      customer: "Ahmad Rizki",
      date: "15/1/2024",
      status: "belum dikonfirmasi",
      items: [
        { name: "Nasi Goreng Spesial", qty: 2, price: 30000 },
        { name: "Es Teh Manis", qty: 2, price: 10000 },
      ],
      total: 40000,
    },
    {
      id: "TRX-002",
      customer: "Siti Nurhaliza",
      date: "15/1/2024",
      status: "proses",
      items: [
        { name: "Ayam Geprek", qty: 1, price: 18000 },
        { name: "Es Jeruk", qty: 1, price: 6000 },
      ],
      total: 24000,
    },
    {
      id: "TRX-003",
      customer: "Joko",
      date: "15/1/2025",
      status: "selesai",
      items: [
        { name: "Mie Ayam", qty: 2, price: 12000 },
        { name: "Es Teh", qty: 1, price: 3000 },
      ],
      total: 24000,
    },
  ];

const statusStyle = (status: string) => {
    if (status === "belum dikonfirmasi")
      return "bg-yellow-500/20 text-yellow-400";
    if (status === "proses") return "bg-teal-500/20 text-teal-400";
    return "bg-green-500/20 text-green-400";
  };

  return (
    <div className="space-y-6">
      {orders.map((order, index) => (
        <div
          key={index}
          className="card-bg rounded-2xl p-6 border border-teal-300/25 Poppins shadow-2xl"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-semibold mb-px text-white">{order.id}</h2>
              <p className="text-xs text-gray-400 mt-px">
                {order.customer} • {order.date}
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm ${statusStyle(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          <hr className="my-4 border-white/10" />

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <p key={i} className="text-white/80">
                  {item.name} x{item.qty}
                </p>
              ))}
            </div>

            <div className="space-y-2 text-right">
              {order.items.map((item, i) => (
                <p key={i} className="text-white">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-white font-semibold">
              Total: Rp {order.total.toLocaleString("id-ID")}
            </p>

            <div className="flex gap-3">
              {order.status === "belum dikonfirmasi" && (
                <>
                  <button className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-2 rounded-xl font-medium text-xs outline-none">
                    <Check size={18} className="mr-[4px]"/> Konfirmasi
                  </button>
                  <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-medium text-xs outline-none">
                    <X size={18} className="mr-[4px]"/> Tolak
                  </button>
                </>
              )}

              {order.status === "proses" && (
                <button className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-2 rounded-xl font-medium text-xs outline-none">
                  <Check size={18} className="mr-[4px]"/> Selesai
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
