"use client"

import { useState } from "react";
import Image from "next/image";
import { X, ChefHat, ImagePlus } from "lucide-react";

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
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/15 backdrop-blur rounded-3xl p-8 mt-8 w-full max-w-4xl shadow-2xl border-2 border-orange-500 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-3 items-center">
                        <div className="p-2 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl">
                            <ChefHat size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="Fredoka tracking-wide text-2xl font-bold text-white">Tambah Menu</h2>
                            <p className="text-sm text-white/65">Buat menu baru untuk stan Anda</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-black/20 rounded-xl transition-colors"
                    >
                        <X className="text-white" size={24} />
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-5">
                        <div>
                            <label className="block mb-2 text-sm font-bold text-white/90">Nama Menu</label>
                            <input
                                name="nama_menu"
                                placeholder="Contoh: Nasi Goreng Spesial"
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-medium outline-none focus:border-orange-400 transition-all placeholder:text-white/50"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-bold text-white/90">Harga</label>
                            <input
                                name="harga"
                                type="number"
                                placeholder="15000"
                                onChange={handleChange}
                                className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-medium outline-none focus:border-orange-400 transition-all placeholder:text-white/50"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-bold text-white/90">Kategori</label>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setForm({ ...form, jenis: "makanan" })}
                                    className={`flex-1 p-3 rounded-xl font-bold transition-all border-2 ${
                                        form.jenis === "makanan"
                                            ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-transparent shadow-lg"
                                            : "bg-white/15 text-white/90 border-white/15 hover:border-orange-300"
                                    }`}>
                                    Makanan
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setForm({ ...form, jenis: "minuman" })}
                                    className={`flex-1 p-3 rounded-xl font-bold transition-all border-2 ${
                                        form.jenis === "minuman"
                                            ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-transparent shadow-lg"
                                            : "bg-white/15 text-white/90 border-white/15 hover:border-orange-300"
                                    }`}>
                                    Minuman
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-bold text-white/90">Deskripsi</label>
                            <textarea
                                name="deskripsi"
                                placeholder="Deskripsi menu..."
                                onChange={handleChange}
                                rows={3}
                                className="w-full p-3 rounded-xl bg-white/15 border-2 border-white/15 text-white font-medium outline-none focus:border-orange-400 transition-all resize-none placeholder:text-white/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block mb-2 text-sm font-bold text-white/90">Foto Menu</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setFoto(file);

                                    if (file) {
                                        const url = URL.createObjectURL(file);
                                        setPreviewUrl(url);
                                    } else {
                                        setPreviewUrl(null);
                                    }
                                }} 
                                className="hidden"
                                id="foto-upload"
                            />
                            <label
                                htmlFor="foto-upload"
                                className="flex items-center justify-center w-full h-full min-h-[320px] rounded-2xl border-2 border-dashed border-white/15 hover:border-orange-400 bg-white/15 hover:bg-orange-500/15 cursor-pointer transition-all group"
                            >
                                {previewUrl ? (
                                    <div className="relative w-full h-full p-4">
                                        <Image
                                            src={previewUrl}
                                            alt="Preview"
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity m-4">
                                            <span className="text-white font-bold">Ganti Foto</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center p-8">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                            <ImagePlus className="w-10 h-10 text-orange-600" />
                                        </div>
                                        <p className="text-white/90 font-bold mb-2">Upload Foto Menu</p>
                                        <p className="text-white/65 text-sm">PNG, JPG hingga 5MB</p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full mt-6 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white py-3.5 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                    Simpan Menu
                </button>
            </div>
        </div>
    );
}