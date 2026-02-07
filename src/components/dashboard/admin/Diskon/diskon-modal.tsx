"use client";

import { useEffect, useState } from "react";
import { Diskon } from "@/app/types";
import { getCookie } from "@/lib/client-cookie";
import { get, post, drop } from "@/lib/api-bridge";
import { toast } from "react-toastify";
import CustomToast from "@/components/ui/CustomToast";
import { Tag, X, Percent, Calendar, TrendingDown } from "lucide-react";

type Props = {
    menuId: number;
    hasDiscount: boolean;
    activeDiskonId?: number | null;
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
        ); 
        onSuccess();
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

        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/15 backdrop-blur rounded-3xl p-8 w-full max-w-md shadow-2xl border-2 border-orange-500">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-3 items-center">
                        <div className="p-2 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl">
                            <Tag size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="Fredoka tracking-wide text-2xl font-bold text-white">Kelola Diskon</h2>
                            <p className="text-sm text-white/65">Atur diskon untuk menu ini</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-black/20 rounded-xl transition-colors"
                    >
                        <X className="text-white" size={24} />
                    </button>
                </div>

                {hasDiscount ? (
                    <div className="space-y-4">
                        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500 rounded-2xl p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingDown className="w-5 h-5 text-red-600" />
                                <p className="font-bold text-white/90">Menu ini sudah memiliki diskon aktif</p>
                            </div>
                            <p className="text-sm text-white/90">Lepas diskon untuk menghapus potongan harga dari menu ini</p>
                        </div>
                        
                        <button
                            onClick={lepasDiskon}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                        >
                            Lepas Diskon
                        </button>
                    </div>
                ) : loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-600 font-medium">Memuat diskon...</p>
                    </div>
                ) : diskonList.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                            <Percent className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium mb-2">Tidak ada diskon aktif</p>
                        <p className="text-sm text-gray-500">Buat diskon baru di menu Diskon</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-white/90 mb-3">Pilih diskon yang akan dipasang:</p>
                        
                        {diskonList.map((d) => (
                            <button
                                key={d.id}
                                onClick={() => pasangDiskon(d.id)}
                                className="w-full flex justify-between items-center px-5 py-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-yellow-200/20 hover:from-orange-500/20 hover:to-yellow-200/20 border-2 border-orange-500 hover:border-orange-400 transition-all group"
                            >
                                <div className="text-left flex-1">
                                    <p className="font-bold text-white mb-1">
                                        {d.nama_diskon}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-white/90">
                                        <Calendar className="w-3 h-3" />
                                        <span>
                                            Berlaku sampai{" "}
                                            {new Date(d.tanggal_akhir).toLocaleDateString("id-ID")}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-xl font-bold group-hover:scale-110 transition-transform">
                                    <span>{d.persentase_diskon}%</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                <button
                    onClick={onClose}
                    className="mt-6 w-full text-sm font-semibold text-white/60 hover:text-black py-3 bg-white/5 border border-white/15 hover:bg-white transition-all duration-300 rounded-lg"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
}