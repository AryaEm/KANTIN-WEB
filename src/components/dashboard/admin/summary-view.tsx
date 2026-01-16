"use client"

import { useEffect, useState } from "react";
// import { BASE_API_URL } from "../../../../global";
import { getCookie } from "@/lib/client-cookie";
import { get, getRaw } from "@/lib/api-bridge";
import { MenuItem } from "@/app/types";
import { ShoppingBag, DollarSign, UtensilsCrossed, Clock } from "lucide-react";

type OrderReport = {
  total_transaksi: number;
};

type IncomeReport = {
  total_income: number;
};

type PendingReport = {
  data: {
    pending_count: number;
  }
};

export default function SummaryView() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [summary, setSummary] = useState({
    totalTransaksi: 0,
    totalIncome: 0,
    totalMenu: 0,
    pending: 0,
  });

  useEffect(() => {
    setMounted(true); // menandakan component sudah mount di client
  }, []);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = getCookie("token");

        
        const [orderRes, incomeRes, menuRes, pendingRes] =
        
        await Promise.all([
          getRaw<OrderReport>("/order/report/order", token),
          getRaw<IncomeReport>("/order/report/income", token),
          get<MenuItem[]>("/menu/menu-admin", token),
          getRaw<PendingReport>("/order/pending", token),
        ]);
        
        console.log("TOKEN:", token);
        console.log("OrderRes:", orderRes);
        console.log("IncomeRes:", incomeRes);
        console.log("MenuRes:", menuRes);
        console.log("PendingRes:", pendingRes);

        if (!orderRes.status) throw new Error(orderRes.message);
        if (!incomeRes.status) throw new Error(incomeRes.message);
        if (!menuRes.status) throw new Error(menuRes.message);
        if (!pendingRes.status) throw new Error(pendingRes.message);

        setSummary({
          totalTransaksi: orderRes.data.total_transaksi,
          totalIncome: incomeRes.data.total_income,
          totalMenu: menuRes.data.length,
          pending: pendingRes.data.data.pending_count,
        });
      } catch (error) {
        console.error("Gagal mengambil summary:", error);

      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (!mounted) return null; // jangan render apapun saat SSR 

  const stats = [
    {
      title: "Total Transaksi",
      value: loading ? "..." : summary.totalTransaksi,
      icon: <ShoppingBag size={22} />,
      color: "bg-[#123735] text-emerald-400",
    },
    {
      title: "Pendapatan",
      value: loading
        ? "..."
        : `Rp ${summary.totalIncome.toLocaleString("id-ID")}`,
      icon: <DollarSign size={22} />,
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Total Menu",
      value: loading ? "..." : `${summary.totalMenu ?? 0}`,
      icon: <UtensilsCrossed size={22} />,
      color: "bg-cyan-500/20 text-cyan-400",
    },
    {
      title: "Belum Dikonfirmasi",
      value: loading ? "..." : `${summary.pending ?? 0}`,
      icon: <Clock size={22} />,
      color: "bg-yellow-500/20 text-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="card-bg rounded-2xl p-6 flex items-center gap-4 shadow-2xl border border-white/10 hover:shadow-teal-300/20 hover:shadow transition-all duration-500 cursor-pointer"
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
