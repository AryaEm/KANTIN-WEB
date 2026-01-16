"use client"

import { useState } from "react";
import { X, ChefHat } from "lucide-react";

export default function AddDiskonModal({
    onClose,
    onSubmit,
}: {
    onClose: () => void;
    onSubmit: (data: {
        nama_diskon: string;
        persentase_diskon: string;
        tanggal_awal: string;
        tanggal_akhir: string;
    }) => void;
}) {
    const [form, setForm] = useState({
        nama_diskon: "",
        persentase_diskon: "",
        tanggal_awal: "",
        tanggal_akhir: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSubmit({
            nama_diskon: form.nama_diskon,
            persentase_diskon: form.persentase_diskon,
            tanggal_awal: form.tanggal_awal,
            tanggal_akhir: form.tanggal_akhir,
        });
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 Poppins">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-3 items-center">
                        <ChefHat size={15} className="bg-teal-400 h-10 w-10 p-2 rounded-full text-white" />
                        <h2 className="text-white font-semibold text-xl">Tambah <span className="text-teal-400">Diskon</span>.</h2>
                    </div>
                    <button onClick={onClose}>
                        <X className="text-white" />
                    </button>
                </div>

                <div>
                    <p className="mb-2 text-white/70 font-semibold text-sm">Nama Diskon</p>
                    <input
                        name="nama_diskon"
                        placeholder="...."
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white/20 text-black/70 font-semibold outline-none"
                    />
                </div>

                <div>
                    <p className="mb-2 text-white/70 font-semibold text-sm">Persentase Diskon</p>
                    <input
                        name="persentase_diskon"
                        type="number"
                        placeholder="0"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white/20 text-black/70 font-semibold outline-none"
                    />
                </div>

                <div className="flex gap-4 justify-between">
                    <div className="w-full">
                        <p className="mb-2 text-white/70 font-semibold text-sm">Tanggal Awal</p>
                        <input
                            name="tanggal_awal"
                            type="date"
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-white/20 text-black/70 font-semibold outline-none"
                        />
                    </div>

                    <div className="w-full">
                        <p className="mb-2 text-white/70 font-semibold text-sm">Tanggal Akhir</p>
                        <input
                            name="tanggal_akhir"
                            type="date"
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-white/20 text-black/70 font-semibold outline-none"
                        />
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-teal-500 hover:bg-teal-400 transition-all text-black py-2 rounded-xl font-medium outline-none"
                >
                    Simpan
                </button>
            </div>
        </div>
    );
}
