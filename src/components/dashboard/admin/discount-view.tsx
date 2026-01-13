"use client";

import { useEffect, useState } from "react";
import { Discount } from "@/app/types";
import { get, post } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookie";
import AddDiskonModal from "./Diskon/add-diskon-modal";
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
  const [showModal, setShowModal] = useState(false);

  const statusStyle = (status: Discount["status"]) => {
    if (status === "aktif") return "bg-emerald-500/20 text-emerald-400";
    if (status === "belum_aktif") return "bg-yellow-500/20 text-yellow-400";
    return "bg-red-500/20 text-red-400";
  };

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const token = getCookie("token");
        const res = await get<Discount[]>("/diskon/status", token);

        if (!res.status) throw new Error(res.message);

        setDiscounts(res.data);
      } catch (error) {
        console.error("Gagal mengambil diskon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  const handleAddMenu = async (data: {
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
          <CustomToast
            type="warning"
            message={res.message ?? "Server error"}
          />,
          {
            containerId: "toastAddDiscount",
            className: "bg-yellow-400 rounded-xl shadow-lg",
            icon: false,
          }
        );
        return;
      }

      setDiscounts((prev) => [res.data, ...prev]);
      setShowModal(false);

      toast(
        <CustomToast
          type="success"
          message="Diskon berhasil ditambahkan"
        />,
        {
          containerId: "toastAddDiscount",
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
          containerId: "toastAddDiscount",
          className:
            "bg-red-400 border border-white/10 rounded-xl shadow-xl",
          icon: false,
        }
      );
    }
  };

  if (loading) {
    return <p className="text-white">Loading diskon...</p>;
  }

  return (
    <>
      <div className="space-y-8 Poppins">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Daftar Diskon</h1>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-black px-5 py-2.5 rounded-xl font-medium">
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
                className="card-bg shadow-2xl rounded-2xl p-6 border border-white/15 hover:border-teal-400 transition-al duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-teal-500/20 p-3 rounded-xl">
                    <Tag className="text-teal-400" size={24} />
                  </div>

                  <div className="flex justify-between w-full Poppins">
                    <div>
                      <h2 className="text-sm font-semibold text-white mb-px">
                        {discount.nama_diskon}
                      </h2>
                      <p className="text-3xl font-bold text-teal-400">
                        {discount.persentase_diskon}%
                      </p>
                    </div>
                    <p className={`${statusStyle(discount.status ?? "nonaktif")} h-fit py-2 px-3 rounded-full text-sm font-medium`}>
                      {(discount.status ?? "nonaktif").replace("_", " ")}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <p className="text-gray-400 text-sm">
                    {formatDate(discount.tanggal_awal)} – {formatDate(discount.tanggal_akhir)}
                  </p>

                  <div className="flex gap-4">
                    <button className="text-white hover:text-teal-400 p-2 rounded-md bg-white/5 transition-all border border-transparent hover:border-teal-400">
                      <SquarePen size={18} />
                    </button>
                    <button className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-md">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {
        showModal && (
          <AddDiskonModal
            onClose={() => setShowModal(false)}
            onSubmit={handleAddMenu}
          />
        )
      }
    </>
  );
}
