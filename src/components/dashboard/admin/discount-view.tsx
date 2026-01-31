"use client";

import { useEffect, useState } from "react";
import { Discount } from "@/app/types";
import { get, post, drop, put } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookie";
import AddDiskonModal from "./Diskon/add-diskon-modal";
import DelDiscountModal from "./Diskon/delete-discount-modal";
import EditDiskonModal from "./Diskon/edit-discount-modal";
import CustomToast from "@/components/ui/CustomToast";
import { toast } from "react-toastify";
import axios from "axios";

import { Plus, Tag, SquarePen, Trash2, Calendar, Percent, Sparkles, Clock, CheckCircle, XCircle } from "lucide-react";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function DiscountView() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDiscountId, setSelectedDiscountId] = useState<number | null>(null);

  const statusStyle = (status: Discount["status"]) => {
    if (status === "aktif") {
      return {
        bg: "bg-gradient-to-br from-green-50 to-emerald-50",
        border: "border-green-300",
        text: "text-green-700",
        icon: <CheckCircle className="w-4 h-4" />,
      };
    }
    if (status === "belum_aktif") {
      return {
        bg: "bg-gradient-to-br from-amber-50 to-orange-50",
        border: "border-amber-300",
        text: "text-amber-700",
        icon: <Clock className="w-4 h-4" />,
      };
    }
    return {
      bg: "bg-gradient-to-br from-red-50 to-rose-50",
      border: "border-red-300",
      text: "text-red-700",
      icon: <XCircle className="w-4 h-4" />,
    };
  };

  const statusLabel = (status: Discount["status"]) => {
    if (status === "aktif") return "Aktif";
    if (status === "belum_aktif") return "Belum Aktif";
    return "Nonaktif";
  };

  const fetchDiscounts = async () => {
    try {
      const token = getCookie("token");
      const res = await get<Discount[]>("/diskon/status", token);

      if (!res.status) throw new Error(res.message);
      setDiscounts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const handleAddDiscount = async (data: {
    nama_diskon: string;
    persentase_diskon: string;
    tanggal_awal: string;
    tanggal_akhir: string;
  }) => {
    const token = getCookie("token");

    try {
      const res = await post<Discount>("/diskon/create", data, token);

      if (!res.status) {
        toast(
          <CustomToast type="warning" message={res.message ?? "Server error"} />,
          { containerId: "toastAddDiscount", className: "bg-yellow-400", icon: false }
        );
        return;
      }

      setDiscounts((prev) => [res.data, ...prev]);
      setShowAddModal(false);

      toast(
        <CustomToast type="success" message="Diskon berhasil ditambahkan" />,
        { containerId: "toastAddDiscount", autoClose: 1500, icon: false }
      );
    } catch (err: unknown) {
      let message = "Terjadi kesalahan server";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message ?? err.message;
      }

      toast(
        <CustomToast type="error" message={message} />,
        { containerId: "toastAddDiscount", icon: false }
      );
    }
  };

  const handleDeleteDiscount = async () => {
    if (!selectedDiscountId) return;

    try {
      const token = getCookie("token");
      const res = await drop(`/diskon/delete/${selectedDiscountId}`, token);

      if (!res.status) {
        toast(
          <CustomToast type="warning" message={res.message ?? "Gagal menghapus"} />,
          { containerId: "toastDeleteDiscount", icon: false }
        );
        return;
      }

      setDiscounts((prev) =>
        prev.filter((d) => d.id !== selectedDiscountId)
      );

      toast(
        <CustomToast type="success" message="Diskon berhasil dihapus" />,
        { containerId: "toastDeleteDiscount", autoClose: 1500, icon: false }
      );

      setShowDeleteModal(false);
      setSelectedDiscountId(null);
    } catch (err: unknown) {
      let message = "Gagal menghapus diskon";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message ?? err.message;
      }

      toast(
        <CustomToast type="error" message={message} />,
        { containerId: "toastDeleteDiscount", icon: false }
      );
    }
  };

  const handleEditDiscount = async (
    id: number,
    data: Partial<{
      nama_diskon: string;
      persentase_diskon: number;
      tanggal_awal: string;
      tanggal_akhir: string;
    }>
  ) => {
    try {
      const token = getCookie("token");

      const res = await put(`/diskon/update/${id}`, data, token);

      if (!res.status) {
        toast(
          <CustomToast type="warning" message={res.message ?? "Gagal update"} />,
          { containerId: "toastEditDiscount", icon: false }
        );
        return;
      }

      setDiscounts((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, ...data } : d
        )
      );

      toast(
        <CustomToast type="success" message="Diskon berhasil diperbarui" />,
        { containerId: "toastEditDiscount", autoClose: 1500, icon: false }
      );

      setShowEditModal(false);
      setSelectedDiscount(null);
    } catch (err) {
      let message = "Terjadi kesalahan server";
      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message ?? err.message;
      }

      toast(
        <CustomToast type="error" message={message} />,
        { containerId: "toastEditDiscount", icon: false }
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
            <div className="inline-flex p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full mb-4 animate-pulse">
              <Tag className="w-8 h-8 text-orange-500" />
            </div>
          <p className="text-gray-600 font-medium">Memuat daftar diskon...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl Fredoka font-bold text-gray-900">
              Daftar Diskon Aktif
            </h1>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            <Plus size={20} />
            Tambah Diskon
          </button>
        </div>

        {discounts.length === 0 ? (
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 border-2 border-gray-200 text-center">
            <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
              <Tag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="Lato text-xl font-bold text-gray-900 mb-2">
              Belum Ada Diskon
            </h3>
            <p className="text-gray-500 mb-4">
              Mulai tambahkan diskon untuk menarik lebih banyak pelanggan
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all"
            >
              <Plus size={18} />
              Buat Diskon Pertama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discounts.map((discount) => {
              const statusInfo = statusStyle(discount.status ?? "nonaktif");
              return (
                <div
                  key={discount.id}
                  className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 ">
                      <div className="p-3 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-xl group-hover:scale-110 transition-transform">
                        <Tag className="text-orange-600" size={24} />
                      </div>
                      <div>
                        <h2 className="Fredoka text-lg font-bold text-gray-900 tracking-wide">
                          {discount.nama_diskon}
                        </h2>
                        <div className="flex items-center gap-1">
                          <span className="Fredoka text-3xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                            {discount.persentase_diskon}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border-2 ${statusInfo.border} ${statusInfo.bg}`}
                    >
                      {statusInfo.icon}
                      <span className={`text-xs font-bold ${statusInfo.text}`}>
                        {statusLabel(discount.status ?? "nonaktif")}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-3 border border-gray-100 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-orange-500" />
                      <span className="font-medium">
                        {formatDate(discount.tanggal_awal)}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="font-medium">
                        {formatDate(discount.tanggal_akhir)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t-2 border-gray-100">
                    <button
                      onClick={() => {
                        setSelectedDiscount(discount);
                        setShowEditModal(true);
                      }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 rounded-xl font-bold text-sm hover:shadow-lg hover:scale-105 transition-all"
                    >
                      <SquarePen size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDiscountId(discount.id);
                        setShowDeleteModal(true);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddDiskonModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddDiscount}
        />
      )}

      {showDeleteModal && (
        <DelDiscountModal
          onClose={() => setShowDeleteModal(false)}
          onSubmit={handleDeleteDiscount}
        />
      )}

      {showEditModal && selectedDiscount && (
        <EditDiskonModal
          discount={selectedDiscount}
          onClose={() => {
            setShowEditModal(false);
            setSelectedDiscount(null);
          }}
          onSubmit={handleEditDiscount}
        />
      )}
    </>
  );
}