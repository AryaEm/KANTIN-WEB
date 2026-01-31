"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api-bridge";
import { HistoryItem } from "@/app/types";
import { getCookie } from "@/lib/client-cookie";
import { History, Calendar, Clock, User, ShoppingBag, CheckCircle, Receipt, Sparkles, TrendingUp } from "lucide-react";

export default function HistoryView() {
  const [histories, setHistories] = useState<HistoryItem[]>([]);
  const [filterType, setFilterType] = useState<"all" | "month" | "week">("all");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [week, setWeek] = useState<number>(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Only show filter loading if not initial load
        if (!initialLoading) {
          setFilterLoading(true);
        }
        
        const token = getCookie("token");
        if (!token) return;

        if (year < 2000 || year > 2100) return;
        if (filterType === "month" && (month < 1 || month > 12)) return;
        if (filterType === "week" && (week < 1 || week > 53)) return;

        let url = "/order/history/stan/selesai";

        if (filterType !== "all") {
          const query = new URLSearchParams({
            type: filterType,
            year: String(year),
          });

          if (filterType === "month") {
            query.append("month", String(month));
          }

          if (filterType === "week") {
            query.append("week", String(week));
          }

          url += `?${query.toString()}`;
        }

        const res = await get<any>(url, token);

        if (res?.status === false) {
          console.error("API Error:", res.message);
          setHistories([]);
          return;
        }

        setHistories(res.data ?? res ?? []);
      } catch (err) {
        console.error("Gagal ambil history:", err);
        setHistories([]);
      } finally {
        setInitialLoading(false);
        setFilterLoading(false);
      }
    };

    fetchHistory();
  }, [filterType, year, month, week]);

  useEffect(() => {
    if (filterType === "all") return;

    if (filterType === "month") {
      setWeek(1);
    }

    if (filterType === "week") {
      setMonth(new Date().getMonth() + 1);
    }
  }, [filterType]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filterButtons = [
    {
      value: "all" as const,
      label: "Semua Waktu",
      icon: <History className="w-4 h-4" />,
      description: "Menampilkan seluruh riwayat transaksi tanpa batas waktu",
    },
    {
      value: "month" as const,
      label: "Per Bulan",
      icon: <Calendar className="w-4 h-4" />,
      description: "Menampilkan transaksi pada bulan tertentu di tahun yang dipilih",
    },
    {
      value: "week" as const,
      label: "Per Minggu",
      icon: <Clock className="w-4 h-4" />,
      description: "Minggu mengikuti standar ISO Week (Minggu 1–53)",
    },
  ];

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-flex p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full mb-4 animate-pulse">
            <History className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-gray-600 font-medium">Memuat riwayat transaksi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl Fredoka font-bold text-gray-900 mb-2">
          History Penjualan
        </h1>
        <p className="text-gray-600 font-medium">
          Lihat dan analisis riwayat transaksi yang telah selesai
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 space-y-4">
        <div>
          <p className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-orange-500" />
            Periode Waktu
          </p>
          <div className="flex flex-wrap gap-3">
            {filterButtons.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterType(filter.value)}
                className={`flex items-center gap-2 px-5 py-3 text-sm transition-all
                  font-bold rounded-xl whitespace-nowrap border-2
                  ${
                    filterType === filter.value
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-transparent shadow-lg scale-105"
                      : "text-gray-600 bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600"
                  }`}
              >
                {filter.icon}
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {filterType !== "all" && (
          <div className="pt-4 border-t-2 border-gray-100">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[150px]">
                <label className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  Tahun
                </label>
                <input
                  type="number"
                  min={2000}
                  max={2100}
                  value={year}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 2000 && val <= 2100) setYear(val);
                  }}
                  placeholder="Contoh: 2025"
                  className="w-full p-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 font-semibold outline-none focus:border-orange-400 focus:bg-white transition-all"
                />
              </div>

              {filterType === "month" && (
                <div className="flex-1 min-w-[150px]">
                  <label className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    Bulan
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={month}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 1 && val <= 12) setMonth(val);
                    }}
                    placeholder="1 - 12"
                    className="w-full p-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 font-semibold outline-none focus:border-orange-400 focus:bg-white transition-all"
                  />
                </div>
              )}

              {filterType === "week" && (
                <div className="flex-1 min-w-[150px]">
                  <label className="flex items-center gap-2 mb-2 text-gray-700 font-semibold text-sm">
                    <Clock className="w-4 h-4 text-orange-500" />
                    Minggu
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={53}
                    value={week}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 1 && val <= 53) setWeek(val);
                    }}
                    placeholder="1 - 53"
                    className="w-full p-3 rounded-xl bg-gray-50 border-2 border-gray-200 text-gray-900 font-semibold outline-none focus:border-orange-400 focus:bg-white transition-all"
                  />
                </div>
              )}
            </div>

            {/* Info Badge */}
            <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
              <p className="text-sm text-orange-700 font-medium">
                💡 {filterButtons.find((f) => f.value === filterType)?.description}
              </p>
            </div>

            {/* Filter Loading Indicator */}
            {filterLoading && (
              <div className="mt-3 flex items-center gap-2 text-sm text-orange-600">
                <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="font-medium">Memuat data...</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* History List */}
      {histories.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 border-2 border-gray-200 text-center">
          <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
            <Receipt className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="Fredoka text-xl font-bold text-gray-900 mb-2">
            Belum Ada Transaksi
          </h3>
          <p className="text-gray-500">
            Tidak ditemukan riwayat transaksi pada{" "}
            {filterType === "month" && "bulan"}
            {filterType === "week" && "minggu"}
            {filterType === "all" && "periode ini"}.
            <br />
            Coba ubah filter atau tunggu hingga ada transaksi baru.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {histories.map((history, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="inline-flex p-2 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg">
                      <Receipt className="w-4 h-4 text-orange-600" />
                    </div>
                    <h3 className="Fredoka text-lg font-bold text-gray-900">
                      {history.kode_transaksi}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{history.siswa.nama_siswa}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{formatDate(history.tanggal)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-bold text-green-700">
                    {history.status}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t-2 border-gray-100 my-4"></div>

              {/* Items */}
              <div className="space-y-2 mb-4">
                {history.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 px-3 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center">
                        <span className="font-bold text-orange-600 text-sm">
                          {item.qty}×
                        </span>
                      </div>
                      <span className="font-medium text-gray-700">
                        {item.nama_menu}
                      </span>
                    </div>
                    <span className="font-bold text-gray-900">
                      Rp {item.harga_satuan.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100">
                <span className="text-gray-600 font-semibold">Total Pembayaran:</span>
                <span className="Fredoka text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  Rp {history.total_harga.toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}