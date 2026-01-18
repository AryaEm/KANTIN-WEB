"use client";

import { useEffect, useState } from "react";
import { get, drop } from "@/lib/api-bridge"
import { HistorySiswa } from "@/app/types";
import { getCookie } from "@/lib/client-cookie";
import { OrderStatus } from "@/app/types";
import CustomToast from "@/components/ui/CustomToast";
import { toast } from "react-toastify";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function OrderView() {
  const [histories, setHistories] = useState<HistorySiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);


  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = getCookie("token");
        const res = await get<HistorySiswa[]>("/order/history/siswa/ongoing", token);

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

  const handleDelete = async (id: number) => {

    try {
      const token = getCookie("token");
      const res = await drop(`/order/delete/${id}`, token);

      if (!res.status) {
        toast(
          <CustomToast
            type="warning"
            message={res.message ?? "File Maksimal 5mb"}
          />,
          {
            containerId: "toastDeleteOrder",
            className: "bg-yellow-400 rounded-xl shadow-lg",
            icon: false,
          }
        );
        return;
      }

      setHistories((prev) =>
        prev.filter((item) => item.id_transaksi !== id)
      );

      toast(
        <CustomToast
          type="success"
          message="Transaksi Berhasil Dihapus/Dibatalkan"
        />,
        {
          containerId: "toastDeleteOrder",
          className: "p-0 bg-transparent shadow-none",
          icon: false,
          autoClose: 1500,
        }
      );

    } catch (err: unknown) {
      let message = "Terjadi kesalahan server";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message ?? err.message;
      }

      toast(
        <CustomToast type="error" message={message} />,
        {
          containerId: "toastDeleteOrder",
          className:
            "bg-red-400 border border-white/10 rounded-xl shadow-xl",
          icon: false,
        }
      );
    }
  };


  const statusStyle = (status: OrderStatus) => {
    switch (status) {
      case "belum_dikonfirmasi":
        return "bg-yellow-500/20 text-yellow-400";
      case "proses":
        return "bg-teal-500/20 text-teal-400";
      case "ditolak":
        return "bg-red-500/20 text-red-400";
    }
  };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (histories.length === 0) {
    return (
      <p className="text-white text-lg font-semibold">
        Tidak ada transaksi saat ini
      </p>
    );
  }

  return (
    <>
      <div className="space-y-6 Poppins">
        <p className="text-white text-lg font-semibold">Belum ada riwayat transaksi</p>
        {histories.map((history, index) => (
          <div
            key={index}
            className="card-bg rounded-2xl p-6 shadow-lg border border-white/15 relative"
          >

            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-white">{history.id_transaksi}</h2>
                <p className="text-sm text-gray-400">
                  {history.stan.nama_stan} • {history.tanggal}
                </p>
              </div>

              <span className={`px-4 py-1 rounded-full text-sm bg-emerald-500/20 text-emerald-400 ${statusStyle(
                history.status
              )}`}
              >
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

            {history.status === "ditolak" && (
              <button
                onClick={() => {
                  setSelectedId(history.id_transaksi);
                  setShowConfirm(true);
                }} className="p-2 text-sm rounded-full outline-none bg-red-500/70 text-white hover:bg-red-500/90 transition-all absolute -top-3 -right-3"
              >
                <Trash2 size={18} />
              </button>
            )}
            {history.status === "belum_dikonfirmasi" && (
              <button
                onClick={() => {
                  setSelectedId(history.id_transaksi);
                  setShowConfirm(true);
                }} className="w-full py-3 mt-4 text-sm rounded-md outline-none text-red-500 hover:text-white tracking-wide font-semibold border-2 border-red-500 hover:bg-red-500/90 transition-all -top-3 -right-3"
              >
                Batalkan Pesanan
              </button>
            )}  
          </div>
        ))}
      </div>

      {
        showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setShowConfirm(false)}
            />

            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 w-full max-w-sm border border-red-400/50 shadow-xl">
              <h3 className="text-lg font-semibold text-white">
                Hapus Transaksi?
              </h3>

              <p className="text-sm text-gray-400 mt-2">
                Yakin ingin menghapus transaksi ini?
                Tindakan ini tidak dapat dibatalkan.
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 text-sm rounded-md
                     bg-slate-700 text-white
                     hover:bg-slate-600 transition"
                >
                  Batal
                </button>

                <button
                  onClick={() => {
                    if (selectedId) handleDelete(selectedId);
                    setShowConfirm(false);
                  }}
                  className="px-4 py-2 text-sm rounded-md
                     bg-red-500 text-white
                     hover:bg-red-600 transition"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}
