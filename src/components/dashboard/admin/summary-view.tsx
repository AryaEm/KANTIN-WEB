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
  TrendingUp,
  Award,
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

  useEffect(() => {
    fetchSummary();
    fetchBestSeller();
  }, [incomeFilter]);

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
      icon: <ShoppingBag size={24} />,
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      title: "Pendapatan",
      value: loading
        ? "..."
        : `Rp ${summary.totalIncome.toLocaleString("id-ID")}`,
      icon: <DollarSign size={24} />,
      gradient: "from-orange-500 to-yellow-500",
      bgGradient: "from-orange-50 to-yellow-50",
      filterable: true,
    },
    {
      title: "Total Menu",
      value: loading ? "..." : summary.totalMenu,
      icon: <UtensilsCrossed size={24} />,
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      title: "Belum Dikonfirmasi",
      value: loading ? "..." : summary.pending,
      icon: <Clock size={24} />,
      gradient: "from-amber-500 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`relative bg-gradient-to-br ${item.bgGradient} rounded-2xl p-6 border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all cursor-pointer group`}
          >
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.gradient} text-white mb-4 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-600 mb-1">{item.title}</p>
              <h2 className="text-2xl font-display font-bold text-gray-900">
                {item.value}
              </h2>
            </div>

            {item.filterable && (
              <button
                onClick={() => {
                  setDraftFilter(incomeFilter);
                  setOpenFilter(true);
                }}
                className="absolute top-4 right-4 p-2 bg-white rounded-lg border-2 border-gray-200 hover:border-orange-400 text-orange-600 hover:scale-110 transition-all"
              >
                <Calendar size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="border-2 border-gray-200 w-full mt-12 bg-white rounded-3xl overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-5 flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg">
            <Award className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-white text-2xl font-display font-bold">Menu Favorit</h2>
            <p className="text-white/90 text-sm">Menu terlaris bulan ini</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {bestSellers.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                <TrendingUp className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Belum ada data menu favorit</p>
            </div>
          )}
          {bestSellers.map((menu, index) => (
            <div
              key={menu.id}
              className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
            >
              {/* Rank Badge */}
              <div className="flex justify-between items-start mb-3">
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full">
                  <Award className="w-4 h-4 text-white" />
                  <span className="text-white font-bold text-sm">#{index + 1}</span>
                </div>
              </div>

              {menu.image && (
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}

              <h3 className="font-display text-lg font-bold text-gray-900 mb-2">{menu.name}</h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-lg">
                    <ShoppingBag className="w-4 h-4 text-green-600" />
                    <span className="text-green-700 font-semibold">{menu.totalTerjual}</span>
                  </div>
                </div>
                <p className="font-display text-lg font-bold text-orange-600">
                  Rp {menu.price.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {openFilter && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white/15 backdrop-blur w-full max-w-md rounded-3xl p-8 border-2 border-orange-500 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                Filter Pendapatan
              </h3>
            </div>

            <div>
              <p className="Poppins pb-2 font-semibold text-white/70 tracking-wide">Kategori</p>
              <select
                className="w-full mb-4 p-3 rounded-xl bg-gray-50 border-2 border-gray-200 font-semibold text-gray-700 focus:border-orange-400 outline-none"
                value={draftFilter.type}
                onChange={(e) =>
                  setDraftFilter({ type: e.target.value as any })
                }
              >
                <option value="all">Semua</option>
                <option value="year">Per Tahun</option>
                <option value="month">Per Bulan</option>
                <option value="week">Per Minggu</option>
              </select>
            </div>

            {draftFilter.type !== "all" && (
              <div>
                <p className="Poppins pb-2 font-semibold text-white/70 tracking-wide">Tahun</p>

                <input
                  type="number"
                  placeholder="Tahun (contoh: 2026)"
                  className="w-full mb-4 p-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-700 focus:border-orange-400 outline-none"
                  value={draftFilter.year ?? ""}
                  onChange={(e) =>
                    setDraftFilter((prev) => ({
                      ...prev,
                      year: Number(e.target.value),
                    }))
                  }
                />
              </div>
            )}

            {draftFilter.type === "month" && (
              <div>
                <p className="Poppins pb-2 font-semibold text-white/70 tracking-wide">Bulan</p>
                <input
                  type="number"
                  placeholder="Bulan (1-12)"
                  className="w-full mb-4 p-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-700 focus:border-orange-400 outline-none"
                  value={draftFilter.month ?? ""}
                  onChange={(e) =>
                    setDraftFilter((prev) => ({
                      ...prev,
                      month: Number(e.target.value),
                    }))
                  }
                />
              </div>
            )}

            {draftFilter.type === "week" && (
              <div>
                <p className="Poppins pb-2 font-semibold text-white/70 tracking-wide">Minggu</p>
                <input
                  type="number"
                  placeholder="Minggu ke- (1-52)"
                  className="w-full mb-4 p-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-700 focus:border-orange-400 outline-none"
                  value={draftFilter.week ?? ""}
                  onChange={(e) =>
                    setDraftFilter((prev) => ({
                      ...prev,
                      week: Number(e.target.value),
                    }))
                  }
                />
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenFilter(false)}
                className="px-6 py-3 text-sm font-bold text-white/50 hover:text-orange-500 hover:bg-white/80 border-2 border-white/50 rounded-xl transition-all"
              >
                Batal
              </button>
              <button
                onClick={applyIncomeFilter}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}