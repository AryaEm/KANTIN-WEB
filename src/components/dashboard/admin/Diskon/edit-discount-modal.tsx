"use client";

import { useState } from "react";
import { Discount } from "@/app/types";
import { X, Tag, Percent, Calendar, Save } from "lucide-react";

interface Props {
    discount: Discount;
    onClose: () => void;
    onSubmit: (
        id: number,
        data: Partial<{
            nama_diskon: string;
            persentase_diskon: number;
            tanggal_awal: string;
            tanggal_akhir: string;
        }>
    ) => void;
}

export default function EditDiskonModal({
    discount,
    onClose,
    onSubmit,
}: Props) {
    const [namaDiskon, setNamaDiskon] = useState(discount.nama_diskon);
    const [persentase, setPersentase] = useState(
        discount.persentase_diskon.toString()
    );
    const [tanggalAwal, setTanggalAwal] = useState(
        discount.tanggal_awal.split("T")[0]
    );
    const [tanggalAkhir, setTanggalAkhir] = useState(
        discount.tanggal_akhir.split("T")[0]
    );

    const handleSubmit = () => {
        const payload: any = {};

        if (namaDiskon !== discount.nama_diskon)
            payload.nama_diskon = namaDiskon;

        if (Number(persentase) !== discount.persentase_diskon)
            payload.persentase_diskon = Number(persentase);

        if (tanggalAwal !== discount.tanggal_awal.split("T")[0])
            payload.tanggal_awal = tanggalAwal;

        if (tanggalAkhir !== discount.tanggal_akhir.split("T")[0])
            payload.tanggal_akhir = tanggalAkhir;

        if (Object.keys(payload).length === 0) {
            onClose();
            return;
        }

        onSubmit(discount.id, payload);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/15 backdrop-blur w-full max-w-md rounded-3xl p-8 border-2 border-orange-500 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl">
                            <Tag className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl Fredoka tracking-wide font-bold text-white">
                            Edit Diskon
                        </h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-lg transition-all"
                    >
                        <X className="text-white w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
                            <Tag className="w-4 h-4" />
                            Nama Diskon
                        </label>
                        <input
                            className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-orange-400 transition-all"
                            value={namaDiskon}
                            onChange={(e) => setNamaDiskon(e.target.value)}
                            placeholder="Nama diskon"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
                            <Percent className="w-4 h-4" />
                            Persentase Diskon
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="100"
                            className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-orange-400 transition-all"
                            value={persentase}
                            onChange={(e) => setPersentase(e.target.value)}
                            placeholder="Persentase"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
                                <Calendar className="w-4 h-4" />
                                Tanggal Awal
                            </label>
                            <input
                                type="date"
                                className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-orange-400 transition-all"
                                value={tanggalAwal}
                                onChange={(e) => setTanggalAwal(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
                                <Calendar className="w-4 h-4" />
                                Tanggal Akhir
                            </label>
                            <input
                                type="date"
                                className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-orange-400 transition-all"
                                value={tanggalAkhir}
                                onChange={(e) => setTanggalAkhir(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 text-sm font-bold text-white/50 hover:text-orange-500 hover:bg-white/80 border-2 border-white/50 rounded-xl transition-all"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-br from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                        <Save size={18} />
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}