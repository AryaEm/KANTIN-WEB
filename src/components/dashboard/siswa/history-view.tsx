"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api-bridge";
import { HistorySiswa } from "@/app/types";
import { getCookie } from "@/lib/client-cookie";
import { 
  History, 
  Download, 
  Store, 
  Calendar, 
  ShoppingBag,
  Filter,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Package,
  FileText,
  Sparkles
} from "lucide-react";
import { downloadFile } from "@/lib/api-bridge";

export default function HistoryView() {
  const [histories, setHistories] = useState<HistorySiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const [filterType, setFilterType] =
    useState<"all" | "month" | "week">("all");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [week, setWeek] = useState<number>(1);

  const fetchHistory = async (withLoading = false) => {
    try {
      if (withLoading) setIsFetching(true);

      const token = getCookie("token");
      if (!token) return;

      let url = "/order/history/siswa";

      if (filterType !== "all") {
        const query = new URLSearchParams({
          type: filterType,
          year: String(year),
        });

        if (filterType === "month") query.append("month", String(month));
        if (filterType === "week") query.append("week", String(week));

        url += `?${query.toString()}`;
      }

      const res = await get<any>(url, token);
      setHistories(res?.data ?? []);
    } catch {
      setHistories([]);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchHistory(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchHistory(true);
    }
  }, [filterType, year, month, week]);

  useEffect(() => {
    if (filterType === "month") setWeek(1);
    if (filterType === "week") setMonth(new Date().getMonth() + 1);
  }, [filterType]);

  const handleDownloadInvoice = async (id: number) => {
    try {
      setDownloadingId(id);
      const token = getCookie("token");
      if (!token) return;

      const blob = await downloadFile(
        `/order/nota/${id}/download`,
        token
      );

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-kantinIn-${id}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Gagal download invoice");
    } finally {
      setDownloadingId(null);
    }
  };

  const totalTransactions = histories.length;
  const totalSpent = histories.reduce((sum, h) => sum + h.total_harga, 0);
  const completedOrders = histories.filter(h => h.status === "selesai").length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-semibold text-lg">Memuat riwayat...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 Poppins">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-white via-orange-50/50 to-yellow-50/50 rounded-2xl border-2 border-orange-200 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
              <History className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl Fredoka font-bold text-gray-900">Riwayat Transaksi</h2>
              <p className="text-gray-600 font-medium">
                Lihat semua transaksi yang telah selesai
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border-2 border-orange-300 shadow-sm">
            <FileText className="w-5 h-5 text-orange-600" />
            <div>
              <p className="text-xs text-gray-500 font-semibold">Total Riwayat</p>
              <p className="text-lg Fredoka font-bold text-orange-600">{totalTransactions}</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 hover:border-orange-300 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Pesanan Selesai</p>
                <p className="text-xl Fredoka font-bold text-gray-900">{completedOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 hover:border-orange-300 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Total Pengeluaran</p>
                <p className="text-lg Fredoka font-bold text-gray-900">
                  Rp {totalSpent.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 hover:border-orange-300 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">Rata-rata Belanja</p>
                <p className="text-lg Fredoka font-bold text-gray-900">
                  Rp {totalTransactions > 0 ? Math.round(totalSpent / totalTransactions).toLocaleString("id-ID") : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg Fredoka font-bold text-gray-900">Filter Periode</h3>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {[
              { value: "all", label: "Semua Waktu", icon: Sparkles },
              { value: "month", label: "Per Bulan", icon: Calendar },
              { value: "week", label: "Per Minggu", icon: Package }
            ].map((filter) => {
              const FilterIcon = filter.icon;
              return (
                <button
                  key={filter.value}
                  onClick={() => setFilterType(filter.value as any)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all border-2 ${
                    filterType === filter.value
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-transparent shadow-lg"
                      : "bg-gray-50 text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                  }`}
                >
                  <FilterIcon className="w-4 h-4" />
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Filter Inputs */}
          {filterType !== "all" && (
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-200">
              <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-[150px]">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tahun
                  </label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                  />
                </div>

                {filterType === "month" && (
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bulan
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={month}
                      onChange={(e) => setMonth(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                    />
                  </div>
                )}

                {filterType === "week" && (
                  <div className="flex-1 min-w-[150px]">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Minggu Ke-
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="53"
                      value={week}
                      onChange={(e) => setWeek(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-white border-2 border-gray-200 rounded-xl font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                    />
                  </div>
                )}
              </div>

              {/* Filter Info */}
              <div className="mt-3 flex items-start gap-2">
                <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <p className="text-sm text-gray-700 font-medium">
                  {filterType === "month" 
                    ? "Menampilkan transaksi pada bulan tertentu di tahun yang dipilih."
                    : "Menampilkan transaksi berdasarkan minggu ke-n dalam satu tahun."}
                </p>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isFetching && (
            <div className="flex items-center gap-2 px-4 py-3 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <div className="w-4 h-4 border-2 border-blue-400 border-t-blue-600 rounded-full animate-spin"></div>
              <span className="text-sm font-semibold text-blue-700">Memuat data...</span>
            </div>
          )}
        </div>
      </div>

      {/* History List */}
      {histories.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-gray-200">
          <div className="inline-flex p-6 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full mb-6">
            <FileText className="w-16 h-16 text-orange-500" />
          </div>
          <h3 className="text-2xl Fredoka font-bold text-gray-900 mb-2">
            Belum Ada Riwayat
          </h3>
          <p className="text-gray-600 font-medium max-w-md mx-auto">
            Tidak ditemukan transaksi pada filter yang dipilih. Coba ubah periode filter.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {histories.map((history, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-orange-300 p-6 shadow-md hover:shadow-xl transition-all"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-5">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                      <Store className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg Fredoka font-bold text-gray-900">
                        {history.stan.nama_stan}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(history.tanggal).toLocaleDateString("id-ID", {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg w-fit">
                    <span className="text-xs text-gray-500 font-semibold">ID Transaksi:</span>
                    <span className="text-sm text-gray-900 font-bold">#{history.id_transaksi}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 bg-green-100 text-green-600 border-green-300 font-bold text-sm whitespace-nowrap">
                  <CheckCircle className="w-4 h-4" />
                  Selesai
                </div>
              </div>

              <div className="border-t-2 border-gray-100 my-4" />

              {/* Items List */}
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-orange-500" />
                  Detail Pesanan
                </h4>
                
                {history.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-orange-50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {item.nama_menu}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        Jumlah: {item.qty} item
                      </p>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      Rp {item.subtotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-200 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">Total Pembayaran</span>
                  <span className="text-2xl Fredoka font-black text-orange-600">
                    Rp {history.total_harga.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Download Button */}
              <button
                onClick={() => handleDownloadInvoice(history.id_transaksi)}
                disabled={downloadingId === history.id_transaksi}
                className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group/download"
              >
                {downloadingId === history.id_transaksi ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mengunduh...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5 group-hover/download:animate-bounce" />
                    Download Invoice
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}