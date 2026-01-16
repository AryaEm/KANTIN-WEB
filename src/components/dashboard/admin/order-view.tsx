"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BASE_API_URL } from "../../../../global";
import { getCookie } from "@/lib/client-cookie";
import { Check, X } from "lucide-react";
import { OrderStatus, Order } from "@/app/types";

export default function OrderView() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const token = getCookie("token");

 const fetchOrders = useCallback(async () => {
  if (!token) return;

  try {
    const res = await axios.get(`${BASE_API_URL}/order/history/stan`, {
      headers: { Authorization: `Bearer ${token}` },
    });

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

  const confirmOrder = async (id: number) => {
    try {
      await axios.put(
        `${BASE_API_URL}/order/update/${id}`,
        { status: "proses" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
    } catch (error) {
      console.error("CONFIRM ORDER ERROR:", error);
    }
  };

  const finishOrder = async (id: number) => {
    try {
      await axios.put(
        `${BASE_API_URL}/order/update/${id}`,
        { status: "selesai" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
    } catch (error) {
      console.error("FINISH ORDER ERROR:", error);
    }
  };

  const rejectOrder = async (id: number) => {
    try {
      await axios.patch(
        `${BASE_API_URL}/order/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
    } catch (error) {
      console.error("REJECT ORDER ERROR:", error);
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const statusStyle = (status: OrderStatus) => {
    switch (status) {
      case "belum_dikonfirmasi":
        return "bg-yellow-500/20 text-yellow-400";
      case "proses":
        return "bg-teal-500/20 text-teal-400";
      case "selesai":
        return "bg-green-500/20 text-green-400";
      case "ditolak":
        return "bg-red-500/20 text-red-400";
    }
  };

  if (loading) {
    return <p className="text-white">Loading Pesanan...</p>;
  }
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div
          key={order.id_transaksi}
          className="card-bg rounded-2xl p-6 border border-teal-300/25 Poppins shadow-2xl"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-semibold mb-px text-white">{order.kode_transaksi}</h2>
              <p className="text-xs text-gray-400 mt-px">
                {order.siswa.nama_siswa} - {formatDate(order.tanggal)}
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm ${statusStyle(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          <hr className="my-4 border-white/10" />

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <p key={i} className="text-white/80">
                  {item.nama_menu} x{item.qty}
                </p>
              ))}
            </div>

            <div className="space-y-2 text-right">
              {order.items.map((item, i) => (
                <p key={i} className="text-white">
                  Rp {item.subtotal.toLocaleString("id-ID")}
                </p>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-white font-semibold">
              Total: Rp {order.total_harga.toLocaleString("id-ID")}
            </p>

            <div className="flex lg:flex-row flex-col gap-3">
              {order.status === "belum_dikonfirmasi" && (
                <>
                  <button
                    onClick={() => confirmOrder(order.id_transaksi)}
                    className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-2 lg:rounded-xl rounded-md font-medium text-xs outline-none">
                    <Check size={18} className="mr-[4px]" />
                    Konfirmasi
                  </button>
                  <button
                    onClick={() => rejectOrder(order.id_transaksi)}
                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-6 justify-center py-2 lg:rounded-xl rounded-md font-medium text-xs outline-none">
                    <X size={18} className="mr-[4px]" />
                    Tolak
                  </button>
                </>
              )}

              {order.status === "proses" && (
                <button
                  onClick={() => finishOrder(order.id_transaksi)}
                  className="flex items-center bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-2 lg:rounded-xl rounded-md font-medium text-xs outline-none">
                  <Check size={18} className="mr-[4px]" />
                  Selesai
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
