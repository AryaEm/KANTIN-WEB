"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api-bridge";
import { HistorySiswa } from "@/app/types";
import { getCookie } from "@/lib/client-cookie";
import { Mail, Loader2, Download } from "lucide-react";
import { downloadFile } from "@/lib/api-bridge";

export default function HistoryView() {
  const [histories, setHistories] = useState<HistorySiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

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

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  const handleDownloadInvoice = async (id: number) => {
    console.log("DOWNLOAD ID:", id);

    try {
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
    }
  };


  return (
    <div className="space-y-6 Poppins">

      <div className="mb-6 space-y-4 text-sm">
        <div className="flex flex-wrap gap-3">
          {["all", "month", "week"].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t as any)}
              className={`px-6 py-2.5 rounded-xl font-medium transition
                ${filterType === t
                  ? "bg-teal-500 text-black"
                  : "bg-[#0E1618] text-white hover:bg-white/20 border border-teal-500/20"
                }`}
            >
              {t === "all"
                ? "Semua Waktu"
                : t === "month"
                  ? "Per Bulan"
                  : "Per Minggu"}
            </button>
          ))}
        </div>

        {filterType !== "all" && (
          <div className="flex gap-3 items-end">
            <div>
              <p className="text-white/70 pb-2">Tahun</p>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="bg-[#0E1618] text-teal-100 border border-teal-500/20 rounded-xl px-4 py-2.5 w-36"
              />
            </div>

            {filterType === "month" && (
              <div>
                <p className="text-white/70 pb-2">Bulan</p>
                <input
                  type="number"
                  value={month}
                  onChange={(e) => setMonth(Number(e.target.value))}
                  className="bg-[#0E1618] text-teal-100 border border-teal-500/20 rounded-xl px-4 py-2.5 w-32"
                />
              </div>
            )}

            {filterType === "week" && (
              <div>
                <p className="text-white/70 pb-2">Minggu</p>
                <input
                  type="number"
                  value={week}
                  onChange={(e) => setWeek(Number(e.target.value))}
                  className="bg-[#0E1618] text-teal-100 border border-teal-500/20 rounded-xl px-4 py-2.5 w-32"
                />
              </div>
            )}
          </div>
        )}

        {filterType === "all" && (
          <p className="text-teal-400/70 text-xs">
            Menampilkan seluruh riwayat transaksi tanpa batas waktu.
          </p>
        )}
        {filterType === "month" && (
          <p className="text-teal-400/70 text-xs">
            Menampilkan transaksi pada <b>bulan tertentu</b> di tahun yang dipilih.
          </p>
        )}
        {filterType === "week" && (
          <p className="text-teal-400/70 text-xs">
            Menampilkan transaksi berdasarkan <b>minggu ke-n</b> dalam satu tahun.
          </p>
        )}

        {isFetching && (
          <div className="flex items-center gap-2 text-teal-400 text-xs">
            <Loader2 className="animate-spin" size={14} />
            Memuat data...
          </div>
        )}
      </div>

      {histories.length === 0 ? (
        <div className="flex justify-center">
          <div className="w-full card-bg rounded-2xl p-8 border border-teal-500/20 text-center">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-teal-500/10 flex items-center justify-center">
                <Mail size={24} className="text-white/80" />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">
              Belum Ada Transaksi
            </h3>

            <p className="text-sm text-teal-400/70">
              Tidak ditemukan transaksi pada filter yang dipilih.
            </p>
          </div>
        </div>
      ) : (
        histories.map((history, index) => (
          <div
            key={index}
            className="card-bg rounded-2xl p-6 shadow-lg border border-white/15"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {history.id_transaksi}
                </h2>
                <p className="text-sm text-gray-400">
                  {history.stan.nama_stan} •{" "}
                  {new Date(history.tanggal).toLocaleDateString("id-ID")}
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
                    {item.nama_menu} x{item.qty}
                  </p>
                ))}
              </div>

              <div className="space-y-2 text-right">
                {history.items.map((item, i) => (
                  <p key={i} className="text-white">
                    Rp {item.subtotal.toLocaleString("id-ID")}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="text-white font-semibold">Total</p>
              <p className="text-white font-semibold">
                Rp {history.total_harga.toLocaleString("id-ID")}
              </p>
            </div>
            <button
              onClick={() => handleDownloadInvoice(history.id_transaksi)}
              className="hover:text-black text-sm mt-4 w-fit p-[6px] rounded-md px-4 border border-teal-400 hover:border-transparent hover:bg-teal-400 transition-all text-white flex items-center gap-2"
            >
              <Download size={16} />
              Download Invoice
            </button>

          </div>
        ))
      )}
    </div>
  );
}
