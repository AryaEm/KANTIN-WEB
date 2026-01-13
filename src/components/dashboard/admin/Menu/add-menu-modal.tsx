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
    // const [jenis, setJenis] = useState<"makanan" | "minuman">("makanan");

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

        for (const pair of fd.entries()) {
            console.log(pair[0], pair[1]);
        }

        onSubmit(fd);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 Poppins">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md space-y-4">
                <div className="flex justify-between items-center">
                    <div className=" flex gap-3 items-center">
                        <ChefHat size={15} className="bg-teal-400 h-10 w-10 p-2 rounded-full text-white" />
                        <h2 className="text-white font-semibold text-xl">Tambah <span className="text-teal-400">Menu</span>.</h2>
                    </div>
                    <button onClick={onClose}>
                        <X className="text-white" />
                    </button>
                </div>
                <div>
                    <p className="mb-2 text-white/70 font-semibold text-sm">Nama Menu</p>
                    <input
                        name="nama_menu"
                        placeholder=""
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white/20 text-black/70 font-semibold outline-none"
                    />
                </div>
                <div>
                    <p className="mb-2 text-white/70 font-semibold text-sm">Harga</p>
                    <input
                        name="harga"
                        type="number"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white/20 text-black/70 font-semibold outline-none"
                    />
                </div>
                <div>
                    <p className="mb-2 text-white/70 font-semibold text-sm">Kategori</p>
                    {/* <select
                        name="jenis"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white/20 text-black/70 font-semibold outline-none"
                    >
                        <option value="makanan" className="bg-[#5F6061] font-semibold">Makanan</option>
                        <option value="minuman" className="bg-[#5F6061] font-semibold">Minuman</option>
                    </select> */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setForm({ ...form, jenis: "makanan" })}
                            className={`p-2 w-full rounded font-semibold bg-white/20 transition${form.jenis === "makanan"
                                ? "bg-teal-400 text-black border-2 border-teal-400"
                                : "bg-white/20 text-white/50 border border-white/50 outline-none"}`}>
                            Makanan
                        </button>

                        <button
                            type="button"
                            onClick={() => setForm({ ...form, jenis: "minuman" })}
                            className={`p-2 w-full rounded font-semibold bg-white/20 transition${form.jenis === "minuman"
                                ? "bg-teal-400 text-black border-2 border-teal-400"
                                : "bg-white/20 text-white/50 border border-white/50 outline-none"}`}>
                            Minuman
                        </button>
                    </div>
                </div>


                <div>
                    <p className="mb-2 text-white/70 font-semibold text-sm">Deskripsi</p>
                    <textarea
                        name="deskripsi"
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-white/20 text-black/70 font-semibold outline-none"
                    />
                </div>

                <div className="relative w-full max-w-md">
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
                        }} className="hidden"
                        id="foto-upload"
                    />
                    <label
                        htmlFor="foto-upload"
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-xl border-2 border-dashed border-white/20 hover:border-primary/50 bg-white/5 hover:bg-white/10 cursor-pointer transition-all duration-300 group"
                    >
                        {previewUrl ? (
                            <div className="relative w-full px-4">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    width={100}
                                    height={100}
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-sm">Ganti Foto</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                    <ImagePlus className="w-6 h-6 text-white/60 group-hover:text-primary transition-colors" />
                                </div>
                                <div className="text-left">
                                    <p className="text-white/80 text-sm font-medium">Upload Foto Menu</p>
                                    <p className="text-white/40 text-xs">PNG, JPG hingga 5MB</p>
                                </div>
                            </>
                        )}
                    </label>
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
