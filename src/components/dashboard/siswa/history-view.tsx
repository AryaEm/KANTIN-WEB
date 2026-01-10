type HistoryItem = {
  id: string;
  stan: string;
  date: string;
  status: "Selesai";
  items: {
    name: string;
    qty: number;
    price: number;
  }[];
  total: number;
};

export default function HistoryView() {
  const histories: HistoryItem[] = [
    {
      id: "Order #2",
      stan: "Kantin Pak Yoyok",
      date: "14/1/2024",
      status: "Selesai",
      items: [
        { name: "Soto Ayam", qty: 2, price: 28000 },
      ],
      total: 28000,
    },
    {
      id: "Order #3",
      stan: "alfamart",
      date: "14/1/2024",
      status: "Selesai",
      items: [
        { name: "Nasi Goreng Spesial", qty: 1, price: 15000 },
        { name: "Es Teh Manis", qty: 1, price: 5000 },
      ],
      total: 20000,
    },
  ];

  return (
    <div className="space-y-6 Poppins">
      {histories.map((history, index) => (
        <div
          key={index}
          className="card-bg rounded-2xl p-6 shadow-lg border border-white/15"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-white">{history.id}</h2>
              <p className="text-sm text-gray-400">
                {history.stan} • {history.date}
              </p>
            </div>

            <span className="px-4 py-1 rounded-full text-sm bg-emerald-500/20 text-emerald-400">
              {history.status}
            </span>
          </div>

          <hr className="my-4 border-white/10" />

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              {history.items.map((item, i) => (
                <p key={i} className="text-white/70">
                  {item.name} x{item.qty}
                </p>
              ))}
            </div>

            <div className="space-y-2 text-right">
              {history.items.map((item, i) => (
                <p key={i} className="text-white">
                  Rp {item.price.toLocaleString("id-ID")}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-white font-semibold">Total</p>
            <p className="text-white font-semibold">
              Rp {history.total.toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
