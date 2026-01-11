"use client"

import { useState } from "react";
import { X } from "lucide-react";


export default function AddMenuModal({
    onClose,
    onSubmit,
}: {
    onClose: () => void;
    onSubmit: (data: FormData) => void;
}) {
    const [form, setForm] = useState({
        nama_menu: "",
        harga: "",
        jenis: "makanan",
        deskripsi: "",
    });
    const [foto, setFoto] = useState<File | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const fd = new FormData();
        fd.append("nama_menu", form.nama_menu);
        fd.append("harga", form.harga);
        fd.append("jenis", form.jenis);
        fd.append("deskripsi", form.deskripsi);
        if (foto) fd.append("foto", foto);

        onSubmit(fd);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-white font-semibold">Tambah Menu</h2>
                    <button onClick={onClose}>
                        <X className="text-white" />
                    </button>
                </div>

                <input
                    name="nama_menu"
                    placeholder="Nama menu"
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-white/30 text-black/ outline-none"
                />

                <input
                    name="harga"
                    type="number"
                    placeholder="Harga"
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-white/30 text-black/ outline-none"
                />

                <select
                    name="jenis"
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-white/30 text-black/ outline-none"
                >
                    <option value="makanan">Makanan</option>
                    <option value="minuman">Minuman</option>
                </select>

                <textarea
                    name="deskripsi"
                    placeholder="Deskripsi"
                    onChange={handleChange}
                    className="w-full p-2 rounded bg-white/30 text-black/ outline-none"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFoto(e.target.files?.[0] || null)}
                    className="text-white text-sm"
                />

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
