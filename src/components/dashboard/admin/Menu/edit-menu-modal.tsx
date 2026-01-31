"use client";

import { useState, useEffect } from "react";
import { AdminStanMenu } from "@/app/types";
import Image from "next/image";
import { ImagePlus, X, SquarePen } from "lucide-react";

type Props = {
    menu: AdminStanMenu;
    onClose: () => void;
    onSubmit: (id: number, formData: FormData) => Promise<void>;
};

export default function EditMenuModal({ menu, onClose, onSubmit }: Props) {
    const [namaMenu, setNamaMenu] = useState(menu.name);
    const [harga, setHarga] = useState(menu.price.toString());
    const [jenis, setJenis] = useState<AdminStanMenu["jenis_menu"]>(menu.jenis_menu);
    const [deskripsi, setDeskripsi] = useState(menu.description ?? "");
    const [status, setStatus] = useState<AdminStanMenu["status"]>(menu.status);
    const [foto, setFoto] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        setNamaMenu(menu.name);
        setHarga(menu.price.toString());
        setJenis(menu.jenis_menu);
        setDeskripsi(menu.description ?? "");
        setStatus(menu.status);
        setFoto(null);
        setPreviewUrl(null);
    }, [menu.id]);

    const handleSubmit = () => {
        const formData = new FormData();

        formData.append("nama_menu", namaMenu);
        formData.append("harga", harga);
        formData.append("jenis", jenis);
        formData.append("deskripsi", deskripsi);
        formData.append("status", status);

        if (foto) formData.append("foto", foto);

        onSubmit(menu.id, formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/15 backdrop-blur rounded-3xl p-8 mt-8 w-full max-w-4xl shadow-2xl border-2 border-orange-500 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-3 items-center">
                        <div className="p-2 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl">
                            <SquarePen size={24} className="text-white" />
                        </div>
                        <div>
                            <h2 className="Fredoka tracking-wide text-2xl font-bold text-white">Edit Menu</h2>
                            <p className="text-sm text-white/65">Perbarui informasi menu</p>
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
                                className="w-full p-3 rounded-xl bg-white/15 border-2 border-white/15 text-white font-medium outline-none focus:border-orange-400 placeholder:text-white/50 transition-all"
                                value={namaMenu}
                                onChange={(e) => setNamaMenu(e.target.value)}
                                placeholder="Nama menu"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-bold text-white/90">Harga</label>
                            <input
                                type="number"
                                className="w-full p-3 rounded-xl bg-white/15 border-2 border-white/15 text-white font-medium outline-none focus:border-orange-400 placeholder:text-white/50 transition-all"
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                                placeholder="Harga"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-bold text-white/90">Kategori</label>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setJenis("makanan")}
                                    className={`flex-1 p-3 rounded-xl font-bold transition-all border-2 ${jenis === "makanan"
                                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-transparent shadow-lg"
                                            : "bg-white/15 text-white/90 border-white/15 hover:border-orange-300"
                                        }`}>
                                    Makanan
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setJenis("minuman")}
                                    className={`flex-1 p-3 rounded-xl font-bold transition-all border-2 ${jenis === "minuman"
                                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-transparent shadow-lg"
                                            : "bg-white/15 text-white/90 border-white/15 hover:border-orange-300"
                                        }`}>
                                    Minuman
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 text-sm font-bold text-white/90">Status</label>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setStatus("tersedia")}
                                    className={`flex-1 p-3 rounded-xl font-bold transition-all border-2 ${status === "tersedia"
                                        ? "bg-green-500 text-white border-transparent shadow-lg"
                                            : "bg-white/15 text-white/90 border-white/15 hover:border-green-300"
                                        }`}>
                                    Tersedia
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStatus("habis")}
                                    className={`flex-1 p-3 rounded-xl font-bold transition-all border-2 ${status === "habis"
                                        ? "bg-red-500 text-white border-transparent shadow-lg"
                                            : "bg-white/15 text-white/90 border-white/15 hover:border-red-400"
                                        }`}>
                                    Habis
                                </button>
                            </div>
                        </div>


                    </div>

                    <div className="space-y-5">
                        <div>
                            <label className="block mb-2 text-sm font-bold text-white/90">Deskripsi</label>
                            <textarea
                                className="w-full p-3 rounded-xl bg-white/15 border-2 border-white/15 text-white font-medium outline-none focus:border-orange-400 placeholder:text-white/50 transition-all"
                                value={deskripsi}
                                onChange={(e) => setDeskripsi(e.target.value)}
                                placeholder="Deskripsi"
                                rows={3}
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-bold text-white/90">Foto Menu</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] ?? null;
                                    setFoto(file);
                                    if (file) setPreviewUrl(URL.createObjectURL(file));
                                }}
                                className="hidden"
                                id="foto-upload-edit"
                            />
                            <label
                                htmlFor="foto-upload-edit"
                                className="flex items-center justify-center w-full h-[180px] rounded-2xl border-2 border-dashed border-white/15 hover:border-orange-400 bg-white/15 hover:bg-orange-500/15 cursor-pointer transition-all group"
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
                                ) : menu.image ? (
                                    <div className="relative w-full h-full p-4">
                                        <Image
                                            src={menu.image}
                                            alt="Current"
                                            width={100}
                                            height={100}
                                            className="w-full h-full object-cover rounded-xl"
                                            unoptimized
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
                                        <p className="text-gray-700 font-bold mb-2">Upload Foto Menu</p>
                                        <p className="text-gray-500 text-sm">PNG, JPG hingga 5MB</p>
                                    </div>
                                )}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 text-white/60 font-bold bg-white/5 hover:bg-white hover:text-black/70 border-2 border-white/60 rounded-xl transition-all"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    );
}