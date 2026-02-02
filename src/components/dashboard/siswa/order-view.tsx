"use client";

import { useEffect, useState } from "react";
import { get, drop } from "@/lib/api-bridge"
import { HistorySiswa } from "@/app/types";
import { getCookie } from "@/lib/client-cookie";
import { OrderStatus } from "@/app/types";
import CustomToast from "@/components/ui/CustomToast";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Trash2,
  Clock,
  Store,
  Calendar,
  ShoppingBag,
  AlertCircle,
  X,
  CheckCircle,
  XCircle,
  Loader
} from "lucide-react";

export default function OrderView() {
  const [histories, setHistories] = useState<HistorySiswa[]>([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

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
    setDeleting(true);
    try {
      const token = getCookie("token");
      const res = await drop(`/order/delete/${id}`, token);

      if (!res.status) {
        toast(
          <CustomToast
            type="warning"
            message={res.message ?? "error"}
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
    } finally {
      setDeleting(false);
    }
  };

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case "belum_dikonfirmasi":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-600",
          border: "border-yellow-300",
          icon: Clock,
          label: "Menunggu Konfirmasi"
        };
      case "proses":
        return {
          bg: "bg-blue-100",
          text: "text-blue-600",
          border: "border-blue-300",
          icon: Loader,
          label: "Sedang Diproses"
        };
      case "ditolak":
        return {
          bg: "bg-red-100",
          text: "text-red-600",
          border: "border-red-300",
          icon: XCircle,
          label: "Ditolak"
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-600",
          border: "border-gray-300",
          icon: AlertCircle,
          label: status
        };
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600 font-semibold text-lg">Memuat pesanan...</p>
      </div>
    );
  }

  if (histories.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex p-6 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-orange-500" />
        </div>
        <h3 className="text-2xl Fredoka font-bold text-gray-900 mb-2">
          Belum Ada Pesanan
        </h3>
        <p className="text-gray-600 font-medium max-w-md mx-auto">
          Pesanan yang sedang diproses akan muncul di sini. Yuk mulai pesan makanan favoritmu!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6 Poppins">
        <div className="bg-gradient-to-br from-white via-orange-50/50 to-yellow-50/50 rounded-2xl border-2 border-orange-200 p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-lg">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl Fredoka font-bold text-gray-900">Kelola Pesanan</h2>
              </div>
            </div>

          </div>
        </div>

        {histories.map((history, index) => {
          const statusConfig = getStatusConfig(history.status);
          const StatusIcon = statusConfig.icon;

          return (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-orange-300 p-6 shadow-md hover:shadow-xl transition-all"
            >
              {history.status === "ditolak" && (
                <button
                  onClick={() => {
                    setSelectedId(history.id_transaksi);
                    setShowConfirm(true);
                  }}
                  className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all z-10"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}

              <div className="flex justify-between flex-col-reverse lg:flex-row items-start mb-5">
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
                        <span>{history.tanggal}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg w-fit ">
                    <span className="text-xs text-gray-500 font-semibold">ID Transaksi:</span>
                    <span className="text-sm text-gray-900 font-bold">#{history.id_transaksi}</span>
                  </div>
                </div>

                <div className={`flex items-center gap-2 px-4 mb-4 lg:w-fit w-full lg:mb-0 py-4 lg:py-2 rounded-xl border-2 ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border} font-bold text-sm whitespace-nowrap`}>
                  <StatusIcon className="w-4 h-4" />
                  {statusConfig.label}
                </div>
              </div>

              <div className="border-t-2 border-gray-100 my-4" />

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

              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-200">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900">Total Pembayaran</span>
                  <span className="text-2xl Fredoka font-black text-orange-600">
                    Rp {history.total_harga.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {history.status === "belum_dikonfirmasi" && (
                <button
                  onClick={() => {
                    setSelectedId(history.id_transaksi);
                    setShowConfirm(true);
                  }}
                  className="w-full mt-4 py-3 rounded-xl font-bold text-red-600 bg-white border-2 border-red-300 hover:bg-red-50 hover:border-red-400 transition-all flex items-center justify-center gap-2 group/cancel"
                >
                  <X className="w-5 h-5 group-hover/cancel:rotate-90 transition-transform" />
                  Batalkan Pesanan
                </button>
              )}
            </div>
          );
        })}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !deleting && setShowConfirm(false)}
          />

          <div className="relative bg-white/15 backdrop-blur rounded-2xl p-6 w-full max-w-md shadow-2xl border-2 border-red-500 animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>

            <h3 className="text-xl Fredoka font-bold text-white text-center mb-2 tracking-wide">
              Batalkan Transaksi?
            </h3>

            <p className="text-sm text-white/65 text-center mb-6 font-medium tracking-wide">
              Yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.
            </p>

            <div className="flex gap-3">
              <button
                disabled={deleting}
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-3 text-sm font-bold rounded-xl bg-white/5 text-white/70 hover:bg-white border-2 hover:text-red-500 border-white/15 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>

              <button
                disabled={deleting}
                onClick={() => {
                  if (selectedId) handleDelete(selectedId);
                  setShowConfirm(false);
                }}
                className="flex-1 px-4 py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Menghapus...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}