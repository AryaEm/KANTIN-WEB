"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api-bridge";
import { HistoryItem } from "@/app/types";
import { getCookie } from "@/lib/client-cookie";
import { Mail } from "lucide-react";

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
          setHistories([]); // reset biar UI aman
          return;
        }

        setHistories(res.data ?? res ?? []);
      } catch (err) {
        console.error("Gagal ambil history:", err);
        setHistories([]); // fallback
      }
    };

    fetchHistory();
  }, [filterType, year, month, week]);

  useEffect(() => {
    if (filterType === "all") return;

    if (filterType === "month") {
      setWeek(1); // reset minggu
    }

    if (filterType === "week") {
      setMonth(new Date().getMonth() + 1); // reset bulan
    }
  }, [filterType]);


  return (
    <div className="space-y-6 Poppins">
      <div className="mb-6 space-y-4 text-sm">

        {/* Filter Button */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setFilterType("all")}
            className={`px-6 py-2.5 rounded-xl font-medium transition
            ${filterType === "all"
                ? "bg-teal-500 text-black outline-none"
                : "bg-[#0E1618] text-white hover:bg-white/20 border border-teal-500/20 outline-none"
              }`}>
            Semua Waktu
          </button>

          <button
            onClick={() => setFilterType("month")}
            className={`px-6 py-2.5 rounded-xl font-medium transition
            ${filterType === "month"
                ? "bg-teal-500 text-black outline-none"
                : "bg-[#0E1618] text-white hover:bg-white/20 border border-teal-500/20 outline-none"
              }`}>
            Per Bulan
          </button>

          <button
            onClick={() => setFilterType("week")}
            className={`px-6 py-2.5 rounded-xl font-medium transition
            ${filterType === "week"
                ? "bg-teal-500 text-black outline-none"
                : "bg-[#0E1618] text-white hover:bg-white/20 border border-teal-500/20 outline-none"
              }`}>
            Per Minggu
          </button>
        </div>

        {filterType !== "all" && (
          <div className="flex gap-3 items-end">
            <div>
              <p className="text-white/70 pb-2">Tahun</p>
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
                className="bg-[#0E1618] text-teal-100 border border-teal-500/20 rounded-xl px-4 py-2.5 w-36"
              />
            </div>

            {filterType === "month" && (
              <div>
                <p className="text-white/70 pb-2">Bulan</p>
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
                  className="bg-[#0E1618] text-teal-100 border border-teal-500/20 rounded-xl px-4 py-2.5 w-32"
                />
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
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 1 && val <= 53) setWeek(val);
                  }}
                  placeholder="1 - 53"
                  className="bg-[#0E1618] text-teal-100 border border-teal-500/20 rounded-xl px-4 py-2.5 w-32"
                />
              </div>
            )}
          </div>
        )}

        {/* Keterangan */}
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
                  {new Date(history.tanggal).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
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
