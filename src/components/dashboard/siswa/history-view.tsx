"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api-bridge"
import { HistorySiswa } from "@/app/types";
import { getCookie } from "@/lib/client-cookie";

export default function HistoryView() {
  const [histories, setHistories] = useState<HistorySiswa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = getCookie("token");
        const res = await get<HistorySiswa[]>("/order/history/siswa", token);

        if (res.status) {
          setHistories(res.data);
        }
      } catch (error) {
        console.error("Fetch history error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (histories.length === 0) {
    return (
      <p className="text-white text-lg font-semibold">
        Belum ada riwayat transaksi
      </p>
    );
  }

  return (
    <div className="space-y-6 Poppins">
      <p className="text-white text-lg font-semibold">Belum ada riwayat transaksi</p>
      {histories.map((history, index) => (
        <div
          key={index}
          className="card-bg rounded-2xl p-6 shadow-lg border border-white/15"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold text-white">{history.id_transaksi}</h2>
              <p className="text-sm text-gray-400">
                {history.stan.nama_stan} • {history.tanggal}
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
        </div>
      ))}
    </div>
  );
}
