"use client";

import { useState } from "react";
import { MenuItem } from "@/app/types";
import Image from "next/image";
import { ImagePlus } from "lucide-react";

interface Props {
    menu: MenuItem;
    onClose: () => void;
    onSubmit: (id: number, data: FormData) => void;
}

export default function EditMenuModal({ menu, onClose, onSubmit }: Props) {
    const [namaMenu, setNamaMenu] = useState(menu.nama_menu);
    const [harga, setHarga] = useState(menu.harga.toString());
    const [jenis, setJenis] = useState<MenuItem["jenis"]>(menu.jenis);
    const [deskripsi, setDeskripsi] = useState(menu.deskripsi ?? "");
    const [status, setStatus] = useState<MenuItem["status"]>(menu.status);
    const [foto, setFoto] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);


    const handleSubmit = () => {
        const formData = new FormData();

        if (namaMenu !== menu.nama_menu)
            formData.append("nama_menu", namaMenu);

        if (Number(harga) !== menu.harga)
            formData.append("harga", harga);

        if (jenis !== menu.jenis)
            formData.append("jenis", jenis);

        if (deskripsi !== (menu.deskripsi ?? ""))
            formData.append("deskripsi", deskripsi);

        if (status !== menu.status)
            formData.append("status", status);

        if (foto)
            formData.append("foto", foto);

        if ([...formData.keys()].length === 0) {
            onClose();
            return;
        }

        onSubmit(menu.id, formData);
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white/10 border border-teal-400/50 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md space-y-4">
                <h2 className="text-lg font-semibold text-white">Edit Menu</h2>

                <input
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={namaMenu}
                    onChange={(e) => setNamaMenu(e.target.value)}
                    placeholder="Nama menu"
                />

                <input
                    type="number"
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    placeholder="Harga"
                />

                <select
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={jenis}
                    onChange={(e) => setJenis(e.target.value as any)}
                >
                    <option value="makanan">Makanan</option>
                    <option value="minuman">Minuman</option>
                </select>

                <textarea
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    placeholder="Deskripsi"
                />

                <select
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                >
                    <option value="tersedia">Tersedia</option>
                    <option value="habis">Habis</option>
                </select>

                {/* <div className="relative w-full max-w-md">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFoto(e.target.files?.[0] ?? null)}
                        className="hidden"
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
                </div> */}

                
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFoto(e.target.files?.[0] ?? null)}
          className="text-white text-sm"
        />

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
