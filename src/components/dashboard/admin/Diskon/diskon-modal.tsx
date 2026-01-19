"use client";

import { useEffect, useState } from "react";
import { Diskon } from "@/app/types";
import { getCookie } from "@/lib/client-cookie";
import { get, post, drop } from "@/lib/api-bridge";
import { toast } from "react-toastify";
import CustomToast from "@/components/ui/CustomToast";

type Props = {
    menuId: number;
    hasDiscount: boolean;
    activeDiskonId?: number | null; // ⬅️ BUKAN PERSEN
    onClose: () => void;
    onSuccess: () => void;
};

export default function DiskonModal({
    menuId,
    activeDiskonId,
    hasDiscount,
    onClose,
    onSuccess,
}: Props) {
    const token = getCookie("token");
    const [diskonList, setDiskonList] = useState<Diskon[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDiskon = async () => {
            try {
                const res = await get<Diskon[]>("/diskon/available", token);
                if (!res.status) throw new Error(res.message);
                setDiskonList(res.data);
            } catch (err) {
                toast.error("Gagal mengambil diskon");
            } finally {
                setLoading(false);
            }
        };

        fetchDiskon();
    }, []);

    const pasangDiskon = async (idDiskon: number) => {
        const res = await post(
            `/diskon/menu/${menuId}/pasang-diskon/${idDiskon}`,
            {},
            token
        );

        if (!res.status) {
            toast(
                <CustomToast
                    type="warning"
                    message={res.message ?? "error"}
                />,
                {
                    containerId: "toastPasangDiskon",
                    className: "bg-yellow-400 rounded-xl shadow-lg",
                    icon: false,
                }
            );
            return;
        }

        toast(
            <CustomToast
                type="success"
                message="Diskon Berhasil di Pasang pada Menu"
            />,
            {
                containerId: "toastPasangDiskon",
                className: "p-0 bg-transparent shadow-none",
                icon: false,
                autoClose: 1500,
            }
        ); onSuccess();
        onClose();
    };

    const lepasDiskon = async () => {
        if (!activeDiskonId) {
            console.warn("activeDiskonId kosong");
            return;
        }
        const res = await drop(
            `/diskon/menu/${menuId}/lepas-diskon/${activeDiskonId}`,
            token
        );

        if (!res.status) {
            toast(
                <CustomToast
                    type="warning"
                    message={res.message ?? "error"}
                />,
                {
                    containerId: "toastLepasDiskon",
                    className: "bg-yellow-400 rounded-xl shadow-lg",
                    icon: false,
                }
            );
            return;
        }

        toast(
            <CustomToast
                type="success"
                message="Diskon Berhasil di Lepas pada Menu"
            />,
            {
                containerId: "toastLepasDiskon",
                className: "p-0 bg-transparent shadow-none",
                icon: false,
                autoClose: 1500,
            }
        );

        if (!res.status) {
            toast.error(res.message);
            return;
        }

        toast.success("Diskon berhasil dilepas");
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#0E1618] rounded-2xl p-6 w-full max-w-md border border-white/10">
                <h2 className="text-lg font-semibold text-white mb-4">
                    Kelola Diskon Menu
                </h2>

                {hasDiscount ? (
                    <button
                        onClick={lepasDiskon}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                    >
                        Lepas Diskon
                    </button>
                ) : loading ? (
                    <p className="text-white/60 text-sm">Memuat diskon...</p>
                ) : diskonList.length === 0 ? (
                    <p className="text-white/60 text-sm">
                        Tidak ada diskon yang sedang aktif
                    </p>
                ) : (
                    <div className="space-y-2">
                        {diskonList.map((d) => (
                            <button
                                key={d.id}
                                onClick={() => pasangDiskon(d.id)}
                                className="w-full flex justify-between items-center px-4 py-3 rounded-xl bg-white/5 hover:bg-teal-500/20 border border-white/10 hover:border-teal-400 transition"
                            >
                                <div className="text-left">
                                    <p className="text-white font-medium">
                                        {d.nama_diskon}
                                    </p>
                                    <p className="text-xs text-white/50">
                                        Berlaku sampai{" "}
                                        {new Date(d.tanggal_akhir).toLocaleDateString("id-ID")}
                                    </p>
                                </div>

                                <span className="text-teal-400 font-semibold">
                                    {d.persentase_diskon}%
                                </span>
                            </button>
                        ))}
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="mt-4 w-full text-sm text-white/60 hover:text-white"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
}
