"use client"

import { useState } from "react";
import { X, Tag, Percent, Calendar } from "lucide-react";

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
        <div className="fixed min-h-dvh inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 ">
            <div className="bg-white/15 backdrop-blur w-full max-w-md rounded-3xl p-8 border-2 border-orange-500 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl">
                            <Tag className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl Fredoka tracking-wide font-bold text-white">
                            Tambah Diskon
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
                            name="nama_diskon"
                            placeholder="Contoh: Diskon Ramadan"
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-orange-400 placeholder:text-white/50 transition-all"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
                            <Percent className="w-4 h-4" />
                            Persentase Diskon
                        </label>
                        <input
                            name="persentase_diskon"
                            type="number"
                            placeholder="Contoh: 20"
                            min="0"
                            max="100"
                            onChange={handleChange}
                            className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-orange-400 placeholder:text-white/50 transition-all"
                        />
                    </div>

                    {/* Tanggal Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
                                <Calendar className="w-4 h-4" />
                                Tanggal Awal
                            </label>
                            <input
                                name="tanggal_awal"
                                type="date"
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-orange-400 transition-all"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
                                <Calendar className="w-4 h-4" />
                                Tanggal Akhir
                            </label>
                            <input
                                name="tanggal_akhir"
                                type="date"
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-orange-400 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 text-sm font-bold text-white/50 hover:text-orange-500 hover:bg-white/80 border-2 border-white/50 rounded-xl transition-all"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                        Simpan Diskon
                    </button>
                </div>
            </div>
        </div>
    );
}