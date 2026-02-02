"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../global";
import { getCookie } from "@/lib/client-cookie";
import { Check, X, Clock, Package, CheckCircle, AlertCircle, User, Calendar, Receipt, ShoppingBag } from "lucide-react";
import { OrderStatus, Order } from "@/app/types";
import { toast } from "react-toastify";
import CustomToast from "@/components/ui/CustomToast";

export default function OrderView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  type OrderFilter = "default" | "belum_dikonfirmasi" | "proses";
  const [filterStatus, setFilterStatus] = useState<OrderFilter>("default");

  const token = getCookie("token");

  const fetchOrders = useCallback(async (filter: OrderFilter = "default") => {
    if (!token) return;

    try {
      const res = await axios.get(
        `${BASE_API_URL}/order/history/stan`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params:
            filter === "default"
              ? {}
              : { status: filter },
        }
      );

      const data = res.data.data;
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("FETCH ORDER ERROR:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    fetchOrders(filterStatus);
  }, [filterStatus, fetchOrders]);

  const confirmOrder = async (id: number) => {
    try {
      const res = await axios.put(
        `${BASE_API_URL}/order/update/${id}`,
        { status: "proses" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.status) {
        toast(
          <CustomToast
            type="warning"
            message={"Gagal Update Transaksi"}
          />,
          {
            containerId: "toastUpdateStatusOrder",
            className: "bg-yellow-400 rounded-xl shadow-lg",
            icon: false,
          }
        );
        return;
      }
      fetchOrders(filterStatus);
      toast(
        <CustomToast
          type="success"
          message="Status Transaksi Berhasil di Update"
        />,
        {
          containerId: "toastUpdateStatusOrder",
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
          containerId: "toastRejectOrder",
          className:
            "bg-red-400 border border-white/10 rounded-xl shadow-xl",
          icon: false,
        }
      );
    }
  };

  const finishOrder = async (id: number) => {
    try {
      const res = await axios.put(
        `${BASE_API_URL}/order/update/${id}`,
        { status: "selesai" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.status) {
        toast(
          <CustomToast
            type="warning"
            message={"Gagal Update Transaksi"}
          />,
          {
            containerId: "toastUpdateStatusOrder",
            className: "bg-yellow-400 rounded-xl shadow-lg",
            icon: false,
          }
        );
        return;
      }
      fetchOrders(filterStatus);
      toast(
        <CustomToast
          type="success"
          message="Status Transaksi Berhasil di Update"
        />,
        {
          containerId: "toastUpdateStatusOrder",
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
          containerId: "toastUpdateStatusOrder",
          className:
            "bg-red-400 border border-white/10 rounded-xl shadow-xl",
          icon: false,
        }
      );
    }
  };

  const rejectOrder = async (id: number) => {
    try {
      const res = await axios.patch(
        `${BASE_API_URL}/order/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.status) {
        toast(
          <CustomToast
            type="warning"
            message={"Reject Gagal"}
          />,
          {
            containerId: "toastRejectOrder",
            className: "bg-yellow-400 rounded-xl shadow-lg",
            icon: false,
          }
        );
        return;
      }
      fetchOrders(filterStatus);

      toast(
        <CustomToast
          type="success"
          message="Transaksi Berhasil di Tolak"
        />,
        {
          containerId: "toastRejectOrder",
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
          containerId: "toastRejectOrder",
          className:
            "bg-red-400 border border-white/10 rounded-xl shadow-xl",
          icon: false,
        }
      );
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const statusStyle = (status: OrderStatus) => {
    switch (status) {
      case "belum_dikonfirmasi":
        return {
          bg: "bg-gradient-to-br from-amber-50 to-orange-50",
          border: "border-amber-300",
          text: "text-amber-700",
          icon: <Clock className="w-4 h-4" />,
        };
      case "proses":
        return {
          bg: "bg-gradient-to-br from-blue-50 to-cyan-50",
          border: "border-blue-300",
          text: "text-blue-700",
          icon: <Package className="w-4 h-4" />,
        };
      case "selesai":
        return {
          bg: "bg-gradient-to-br from-green-50 to-emerald-50",
          border: "border-green-300",
          text: "text-green-700",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "ditolak":
        return {
          bg: "bg-gradient-to-br from-red-50 to-rose-50",
          border: "border-red-300",
          text: "text-red-700",
          icon: <AlertCircle className="w-4 h-4" />,
        };
    }
  };

  const statusLabel = (status: OrderStatus) => {
    switch (status) {
      case "belum_dikonfirmasi":
        return "Menunggu Konfirmasi";
      case "proses":
        return "Sedang Diproses";
      case "selesai":
        return "Selesai";
      case "ditolak":
        return "Ditolak";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-flex p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full mb-4 animate-pulse">
            <ShoppingBag className="w-8 h-8 text-orange-500" />
          </div>
          <p className="text-gray-600 font-medium">Memuat pesanan...</p>
        </div>
      </div>
    );
  }

  const filterButtons = [
    {
      value: "default" as OrderFilter,
      label: "Semua Pesanan",
      icon: <Receipt className="w-4 h-4" />,
    },
    {
      value: "belum_dikonfirmasi" as OrderFilter,
      label: "Belum Dikonfirmasi",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      value: "proses" as OrderFilter,
      label: "Sedang Diproses",
      icon: <Package className="w-4 h-4" />,
    },
  ];

  return (
    <div className="space-y-6">

      <div className="flex justify-between lg:items-center flex-col lg:flex-row">
        <h1 className="text-3xl Fredoka font-bold text-gray-900 mb-4 lg:mb-0">Daftar Pesanan</h1>
        <div className="flex gap-3 flex-wrap">
          {filterButtons.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterStatus(filter.value)}
              className={`flex items-center gap-2 px-5 py-3 text-sm transition-all
              font-bold rounded-xl whitespace-nowrap border-2
              ${filterStatus === filter.value
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

      {orders.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 border-2 border-gray-200 text-center">
          <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
            <ShoppingBag className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="Fredoka text-xl font-bold text-gray-900 mb-2">
            Belum Ada Pesanan
          </h3>
          <p className="text-gray-500">
            {filterStatus === "default"
              ? "Belum ada pesanan masuk"
              : `Tidak ada pesanan dengan status "${filterButtons.find((f) => f.value === filterStatus)?.label}"`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusInfo = statusStyle(order.status);
            return (
              <div
                key={order.id_transaksi}
                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
              >
                <div className="flex justify-between items-start mb-4 lg:flex-row flex-col-reverse">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="inline-flex p-2 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-lg">
                        <Receipt className="w-4 h-4 text-orange-600" />
                      </div>
                      <h3 className="Fredoka text-lg font-bold text-gray-900">
                        {order.kode_transaksi}
                      </h3>
                    </div>

                    <div className="flex flex-col gap-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{order.siswa.nama_siswa}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(order.tanggal)}</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`flex items-center gap-2 px-6 lg:px-4 lg:py-2 py-4 rounded-full mb-4 lg:mb-0 border-2 ${statusInfo.border} ${statusInfo.bg}`}
                  >
                    {statusInfo.icon}
                    <span className={`text-sm font-bold ${statusInfo.text}`}>
                      {statusLabel(order.status)}
                    </span>
                  </div>
                </div>

                <div className="border-t-2 border-gray-100 my-4"></div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, i) => (
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
                        Rp {item.subtotal.toLocaleString("id-ID")}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between lg:items-center items-end pt-4 border-t-2 border-gray-100 flex-col lg:flex-row">
                  <div className="flex items-center gap-2 mb-4 lg:mb-0">
                    <span className="text-gray-600 font-medium">Total Pembayaran:</span>
                    <span className="Fredoka text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                      Rp {order.total_harga.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    {order.status === "belum_dikonfirmasi" && (
                      <>
                        <button
                          onClick={() => confirmOrder(order.id_transaksi)}
                          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                          <Check size={18} />
                          Konfirmasi
                        </button>
                        <button
                          onClick={() => rejectOrder(order.id_transaksi)}
                          className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                        >
                          <X size={18} />
                          Tolak
                        </button>
                      </>
                    )}

                    {order.status === "proses" && (
                      <button
                        onClick={() => finishOrder(order.id_transaksi)}
                        className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                      >
                        <Check size={18} />
                        Selesai
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}