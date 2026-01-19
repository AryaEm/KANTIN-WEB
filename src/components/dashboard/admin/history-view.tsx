"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api-bridge";
import { HistoryItem } from "@/app/types";
import { getCookie } from "@/lib/client-cookie";
import { ArrowDown, Mail } from "lucide-react";

export default function HistoryView() {
  const [histories, setHistories] = useState<HistoryItem[]>([]);
  const [filterType, setFilterType] = useState<"all" | "month" | "week">("all");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [week, setWeek] = useState<number>(1);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = getCookie("token");
        if (!token) return;

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

        const res = await get<any[]>(url, token);

        if (Array.isArray(res)) {
          setHistories(res);
          return;
        }

        if (res?.status === false) {
          throw new Error(res.message || "Gagal mengambil data");
        }

        setHistories(res.data ?? []);
      } catch (err) {
        console.error("Gagal ambil history:", err);
      }
    };

    fetchHistory();
  }, [filterType, year, month, week]);


  return (
    <div className="space-y-6 Poppins">
      <div className="mb-4 space-y-3 text-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <p className="text-white/70 pb-2">Kategori</p>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className=" bg-[#0E1618] text-teal-100 border appearance-none border-teal-500/20 rounded-lg pr-10 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/40 ">
              <option value="all">Semua Waktu</option>
              <option value="month">Per Bulan</option>
              <option value="week">Per Minggu</option>
            </select>
            <ArrowDown size={18} className="pointer-events-none absolute top-10 right-2 text-teal-500/70" />
          </div>

          {filterType !== "all" && (
            <div>
              <p className="text-white/70 pb-2">Tahun</p>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                placeholder="Tahun (contoh: 2025)"
                className="bg-[#0E1618] text-teal-100 border appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border-teal-500/20 rounded-lg px-4 py-2.5 w-36 placeholder:text-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-500/40 " />
            </div>
          )}

          {filterType === "month" && (
            <div>
              <p className="text-white/70 pb-2">Bulan</p>
              <input
                type="number"
                min={1}
                max={12}
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                placeholder="Bulan (1–12)"
                className="bg-[#0E1618] text-teal-100 border appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border-teal-500/20 rounded-lg px-4 py-2.5 w-36 placeholder:text-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-500/40 " />
            </div>
          )}

          {filterType === "week" && (
            <div>
              <p className="text-white/70 pb-2">Minggu</p>
              <input
                type="number"
                min={1}
                max={53}
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                placeholder="Minggu ke- (1–53)"
                className="bg-[#0E1618] text-teal-100 border appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border-teal-500/20 rounded-lg px-4 py-2.5 w-40 placeholder:text-teal-400/50 focus:outline-none focus:ring-2 focus:ring-teal-500/40 " />
            </div>
          )}
        </div>

        {filterType === "month" && (
          <p className="text-teal-400/70 text-xs">
            Menampilkan transaksi pada <b>bulan tertentu</b> di tahun yang dipilih.
            Contoh: Bulan 5 Tahun 2025.
          </p>
        )}

        {filterType === "week" && (
          <p className="text-teal-400/70 text-xs">
            Minggu mengikuti standar <b>ISO Week</b> (Minggu 1–53).
            Contoh: Minggu ke-3 Tahun 2025.
          </p>
        )}

        {filterType === "all" && (
          <p className="text-teal-400/70 text-xs">
            Menampilkan seluruh riwayat transaksi tanpa batas waktu.
          </p>
        )}
      </div>

      {histories.length === 0 ? (
        <div className="flex justify-center">
          <div className="w-full card-bg rounded-2xl p-8 border border-teal-500/20 text-center shadow-lg">
            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-teal-500/10 flex items-center justify-center">
                <Mail size={24} className="text-white/80" />
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-2">
              Belum Ada Transaksi
            </h3>

            <p className="text-sm text-teal-400/70 leading-relaxed">
              Tidak ditemukan riwayat transaksi pada
              {filterType === "month" && " bulan"}
              {filterType === "week" && " minggu"}
              {filterType === "all" && " periode ini"}.
              <br />
              Coba ubah filter atau tunggu hingga ada transaksi baru.
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
                  {history.kode_transaksi}
                </h2>

                <p className="text-sm text-gray-400">
                  {history.siswa.nama_siswa} -{" "}
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
                  <p key={i} className="text-white">
                    {item.nama_menu} x{item.qty}
                  </p>
                ))}
              </div>

              <div className="space-y-2 text-right">
                {history.items.map((item, i) => (
                  <p key={i} className="text-white">
                    Rp {item.harga_satuan.toLocaleString("id-ID")}
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
          </div>
        ))
      )}

    </div>
  );
}
