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

import { Plus, Tag, SquarePen, Trash2 } from "lucide-react";

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
    if (status === "aktif") return "bg-emerald-500/20 text-emerald-400";
    if (status === "belum_aktif") return "bg-yellow-500/20 text-yellow-400";
    return "bg-red-500/20 text-red-400";
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

  if (loading) return <p className="text-white">Loading diskon...</p>;

  return (
    <>
      <div className="space-y-8 Poppins">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Daftar Diskon</h1>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-black px-5 py-2.5 rounded-xl font-semibold text-sm"
          >
            <Plus size={20} /> Tambah Diskon
          </button>
        </div>

        {discounts.length === 0 ? (
          <p className="text-white/60 text-sm">Belum ada diskon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {discounts.map((discount) => (
              <div
                key={discount.id}
                className="card-bg rounded-2xl p-6 border border-white/15"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-teal-500/20 p-3 rounded-xl">
                    <Tag className="text-teal-400" size={24} />
                  </div>

                  <div className="flex justify-between w-full">
                    <div>
                      <h2 className="text-sm font-semibold text-white">
                        {discount.nama_diskon}
                      </h2>
                      <p className="text-3xl font-bold text-teal-400">
                        {discount.persentase_diskon}%
                      </p>
                    </div>

                    <span
                      className={`${statusStyle(discount.status ?? "nonaktif")} py-2 px-3 rounded-xl text-sm h-fit`}
                    >
                      {(discount.status ?? "nonaktif").replace("_", " ")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-gray-400 text-sm">
                    {formatDate(discount.tanggal_awal)} –{" "}
                    {formatDate(discount.tanggal_akhir)}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedDiscount(discount);
                        setShowEditModal(true);
                      }}
                      className="p-2 bg-white/5 rounded-md text-teal-400 border border-transparent hover:border-teal-400 transition-all">
                      <SquarePen size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDiscountId(discount.id);
                        setShowDeleteModal(true);
                      }}
                      className="p-2 bg-red-500 hover:bg-red-600 rounded-md"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
