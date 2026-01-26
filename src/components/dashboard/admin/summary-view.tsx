"use client";

import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookie";
import { get, getRaw } from "@/lib/api-bridge";
import { MenuItem } from "@/app/types";
import { BestSeller } from "@/app/types";
import {
  ShoppingBag,
  DollarSign,
  UtensilsCrossed,
  Clock,
  Calendar,
} from "lucide-react";


type OrderReport = {
  total_transaksi: number;
};

type PendingReport = {
  data: {
    pending_count: number;
  };
};

type IncomeFilter = {
  type: "all" | "year" | "month" | "week";
  year?: number;
  month?: number;
  week?: number;
};

type IncomeBackendResponse = {
  status: boolean;
  data: {
    filter: {
      type: string;
      year: number | null;
      month: number | null;
      week: number | null;
    };
  };
  total_income: number;
  total_transaksi: number;
};


export default function SummaryView() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalTransaksi: 0,
    totalIncome: 0,
    totalMenu: 0,
    pending: 0,
  });
  const [incomeFilter, setIncomeFilter] = useState<IncomeFilter>({
    type: "all",
  });
  const [draftFilter, setDraftFilter] = useState<IncomeFilter>({
    type: "all",
  });
  const [openFilter, setOpenFilter] = useState(false);
  const [bestSellers, setBestSellers] = useState<BestSeller[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => { fetchSummary(); fetchBestSeller(); }, [incomeFilter]);


  const fetchIncome = async (filter: IncomeFilter) => {
    const token = getCookie("token");
    const params = new URLSearchParams();

    if (filter.type !== "all") {
      params.append("type", filter.type);
      if (filter.year) params.append("year", String(filter.year));
      if (filter.month) params.append("month", String(filter.month));
      if (filter.week) params.append("week", String(filter.week));
    }

    const res = await getRaw<IncomeBackendResponse>(
      `/order/report/income?${params.toString()}`,
      token
    );

    if (!res.status) {
      throw new Error(res.message);
    }

    return res.data.total_income;
  };

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const token = getCookie("token");

      const [orderRes, menuRes, pendingRes, income] = await Promise.all([
        getRaw<OrderReport>("/order/report/order", token),
        get<MenuItem[]>("/menu/menu-admin", token),
        getRaw<PendingReport>("/order/pending", token),
        fetchIncome(incomeFilter),
      ]);

      setSummary({
        totalTransaksi: orderRes.data.total_transaksi,
        totalMenu: menuRes.data.length,
        pending: pendingRes.data.data.pending_count,
        totalIncome: income,
      });
    } catch (error) {
      console.error("Gagal mengambil summary:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBestSeller = async () => {
    try {
      const token = getCookie("token");
      const res = await getRaw<{ status: boolean; data: BestSeller[] }>("/menu/best-seller", token);
      if (res.status) setBestSellers(res.data.data);
    } catch (error) {
      console.error("Gagal mengambil best seller:", error);
    }
  };

  const applyIncomeFilter = () => {
    const { type, year, month, week } = draftFilter;

    if (type === "year" && !year) {
      alert("Tahun wajib diisi");
      return;
    }

    if (type === "month" && (!year || !month)) {
      alert("Tahun dan bulan wajib diisi");
      return;
    }

    if (type === "week" && (!year || !week)) {
      alert("Tahun dan minggu wajib diisi");
      return;
    }

    setIncomeFilter(draftFilter);
    setOpenFilter(false);
  };

  if (!mounted) return null;


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
      filterable: true,
    },
    {
      title: "Total Menu",
      value: loading ? "..." : summary.totalMenu,
      icon: <UtensilsCrossed size={22} />,
      color: "bg-cyan-500/20 text-cyan-400",
    },
    {
      title: "Belum Dikonfirmasi",
      value: loading ? "..." : summary.pending,
      icon: <Clock size={22} />,
      color: "bg-yellow-500/20 text-yellow-400",
    },
  ];


  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="relative card-bg rounded-2xl p-6 flex items-center gap-4 border border-white/10 hover:shadow-sm transition-all hover:shadow-teal-400/50 cursor-pointer"
          >
            <div className={`p-3 rounded-xl ${item.color}`}>
              {item.icon}
            </div>

            <div className="flex-1">
              <p className="text-sm text-gray-400">{item.title}</p>
              <h2 className="text-xl font-bold text-white">
                {item.value}
              </h2>
            </div>

            {item.filterable && (
              <button
                onClick={() => {
                  setDraftFilter(incomeFilter);
                  setOpenFilter(true);
                }}
                className="absolute top-4 right-4 text-teal-400"
              >
                <Calendar size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="border w-full min-h-20 mt-12 card-bg border-white/10 rounded-2xl overflow-hidden">
        <h2 className="px-4 py-4 text-white text-2xl font-semibold Poppins">Menu Favorit</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 pb-4">
          {bestSellers.length === 0 && (
            <p className="text-gray-400 col-span-full">Belum ada data menu favorit</p>
          )}
          {bestSellers.map((menu) => (
            <div key={menu.id} className="bg-white/5 p-4 rounded-xl flex flex-col items-center gap-2">
              {menu.image && (
                <img
                  src={menu.image}
                  alt={menu.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <h3 className="text-white font-semibold">{menu.name}</h3>
              <p className="text-gray-300 text-sm">Terjual: {menu.totalTerjual}</p>
              <p className="text-teal-400 font-bold">Rp {menu.price.toLocaleString("id-ID")}</p>
            </div>
          ))}
      </div>
    </div >

      { openFilter && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-black/10 backdrop-blur-lg w-full max-w-sm rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">
              Filter Pendapatan
            </h3>

            <select
              className="w-full mb-3 p-2 rounded-lg bg-white/10 appearance-none outline-none text-white"
              value={draftFilter.type}
              onChange={(e) =>
                setDraftFilter({ type: e.target.value as any })
              }
            >
              <option className="text-white bg-black/80 outline-none border-none hover:bg-teal-400" value="all">Semua</option>
              <option className="text-white bg-black/80 outline-none border-none hover:bg-teal-400" value="year">Per Tahun</option>
              <option className="text-white bg-black/80 outline-none border-none hover:bg-teal-400" value="month">Per Bulan</option>
              <option className="text-white bg-black/80 outline-none border-none hover:bg-teal-400" value="week">Per Minggu</option>
            </select>

            {draftFilter.type !== "all" && (
              <input
                type="number"
                placeholder="Tahun (contoh: 2026)"
                className="w-full mb-3 p-2 rounded-lg text-white bg-white/10 outline-none"
                value={draftFilter.year ?? ""}
                onChange={(e) =>
                  setDraftFilter((prev) => ({
                    ...prev,
                    year: Number(e.target.value),
                  }))
                }
              />
            )}

            {draftFilter.type === "month" && (
              <input
                type="number"
                placeholder="Bulan (1-12)"
                className="w-full mb-3 p-2 rounded-lg bg-white/10 text-white outline-none"
                value={draftFilter.month ?? ""}
                onChange={(e) =>
                  setDraftFilter((prev) => ({
                    ...prev,
                    month: Number(e.target.value),
                  }))
                }
              />
            )}

            {draftFilter.type === "week" && (
              <input
                type="number"
                placeholder="Minggu ke- (1-52)"
                className="w-full mb-3 p-2 rounded-lg bg-white/10 text-white outline-none"
                value={draftFilter.week ?? ""}
                onChange={(e) =>
                  setDraftFilter((prev) => ({
                    ...prev,
                    week: Number(e.target.value),
                  }))
                }
              />
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setOpenFilter(false)}
                className="px-6 py-2 text-sm text-gray-400 hover:bg-white/5 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={applyIncomeFilter}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 transition-all text-black rounded-lg text-sm font-semibold"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )
}
    </>
  );
}
