"use client";

import { useEffect, useState } from "react";
import { get } from "@/lib/api-bridge";
import { HistoryItem } from "@/app/types";
import { getCookie } from "@/lib/client-cookie";

export default function HistoryView() {
  const [histories, setHistories] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = getCookie("token");
        const res = await get<HistoryItem[]>("/order/history/stan/selesai", token);

        if (!res.status) throw new Error(res.message);

        setHistories(res.data);
      } catch (err) {
        console.error("Gagal ambil history:", err);
      }
    };

    fetchHistory();
  }, []);


  return (
    <div className="space-y-6 Poppins">
      {histories.map((history, index) => (
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
      ))}
    </div>
  );
}
