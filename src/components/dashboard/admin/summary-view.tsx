import { ShoppingBag, DollarSign, UtensilsCrossed, Clock } from "lucide-react";

export default function SummaryView() {
  const stats = [
    {
      title: "Total Transaksi",
      value: "156",
      icon: <ShoppingBag size={22} />,
      color: "bg-[#123735] text-emerald-400",
    },
    {
      title: "Pendapatan",
      value: "Rp 4,250,000",
      icon: <DollarSign size={22} />,
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Total Menu",
      value: "24",
      icon: <UtensilsCrossed size={22} />,
      color: "bg-cyan-500/20 text-cyan-400",
    },
    {
      title: "Belum Dikonfirmasi",
      value: "5",
      icon: <Clock size={22} />,
      color: "bg-yellow-500/20 text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="card-bg rounded-2xl p-6 flex items-center gap-4 shadow-2xl border border-white/10 hover:shadow-teal-300/20 hover:shadow transition-all duration-500"
        >
          <div className={`p-3 rounded-xl ${item.color}`}>
            {item.icon}
          </div>

          <div className="Poppins">
            <p className="text-sm mb-px text-gray-400">{item.title}</p>
            <h2 className="text-xl font-bold text-white">{item.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
