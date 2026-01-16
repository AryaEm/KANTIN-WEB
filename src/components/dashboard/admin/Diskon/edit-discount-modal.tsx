"use client";

import { useState } from "react";
import { Discount } from "@/app/types";

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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur border border-teal-400/50 p-6 rounded-2xl w-full max-w-md space-y-5">
                <h2 className="text-lg font-semibold text-white">
                    Edit Diskon
                </h2>

                <input
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={namaDiskon}
                    onChange={(e) => setNamaDiskon(e.target.value)}
                    placeholder="Nama diskon"
                />

                <input
                    type="number"
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={persentase}
                    onChange={(e) => setPersentase(e.target.value)}
                    placeholder="Persentase"
                />

                <div className="flex gap-3">
                    <input
                        type="date"
                        className="w-full p-2 rounded-md bg-white/10 text-white"
                        value={tanggalAwal}
                        onChange={(e) => setTanggalAwal(e.target.value)}
                    />
                    <input
                        type="date"
                        className="w-full p-2 rounded-md bg-white/10 text-white"
                        value={tanggalAkhir}
                        onChange={(e) => setTanggalAkhir(e.target.value)}
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm rounded-md bg-white/10 text-white"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm rounded-md bg-teal-500 text-black font-semibold"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}
