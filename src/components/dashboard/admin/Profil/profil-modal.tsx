"use client";

import { useEffect, useState } from "react";
import { AdminProfileResponse } from "@/app/types";
import { X, User, Store, Phone, Lock, Edit } from "lucide-react";

type Props = {
    profile: AdminProfileResponse;
    onClose: () => void;
    onSubmit: (
        stanId: number,
        payload: {
            nama_stan: string;
            nama_pemilik: string;
            telp: string;
            username: string;
            password?: string;
        }
    ) => Promise<void>;
};

export default function EditProfilModal({ profile, onClose, onSubmit }: Props) {
    const [username, setUsername] = useState(profile.username);
    const [namaStan, setNamaStan] = useState(profile.stan?.nama_stan ?? "");
    const [namaPemilik, setNamaPemilik] = useState(profile.stan?.nama_pemilik ?? "");
    const [telp, setTelp] = useState(profile.stan?.telp ?? "");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setUsername(profile.username);
        setNamaStan(profile.stan?.nama_stan ?? "");
        setNamaPemilik(profile.stan?.nama_pemilik ?? "");
        setTelp(profile.stan?.telp ?? "");
        setPassword("");
    }, [profile.id]);

    const handleSubmit = async () => {
        if (!profile.stan) return;

        await onSubmit(profile.stan.id, {
            username,
            nama_stan: namaStan,
            nama_pemilik: namaPemilik,
            telp,
            password: password || undefined,
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/15 backdrop-blur w-full max-w-md rounded-3xl p-8 border-2 border-blue-500 shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                            <Edit className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl Fredoka tracking-wide font-bold text-white">
                            Edit Profil Admin
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
                    {/* Username */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
                            <User className="w-4 h-4" />
                            Username
                        </label>
                        <input
                            className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-blue-400 placeholder:text-white/50 transition-all"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Masukkan username"
                        />
                    </div>

                    {/* Nama Stan */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
                            <Store className="w-4 h-4" />
                            Nama Stan
                        </label>
                        <input
                            className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-blue-400 placeholder:text-white/50 transition-all"
                            value={namaStan}
                            onChange={(e) => setNamaStan(e.target.value)}
                            placeholder="Masukkan nama stan"
                        />
                    </div>

                    {/* Nama Pemilik */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
                            <User className="w-4 h-4" />
                            Nama Pemilik
                        </label>
                        <input
                            className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-blue-400 placeholder:text-white/50 transition-all"
                            value={namaPemilik}
                            onChange={(e) => setNamaPemilik(e.target.value)}
                            placeholder="Masukkan nama pemilik"
                        />
                    </div>

                    {/* Nomor Telepon */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
                            <Phone className="w-4 h-4" />
                            Nomor Telepon
                        </label>
                        <input
                            className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-blue-400 placeholder:text-white/50 transition-all"
                            value={telp}
                            onChange={(e) => setTelp(e.target.value)}
                            placeholder="Masukkan nomor telepon"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
                            <Lock className="w-4 h-4" />
                            Password Baru (opsional)
                        </label>
                        <input
                            type="password"
                            className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-blue-400 placeholder:text-white/50 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Kosongkan jika tidak ingin mengubah"
                        />
                        <p className="text-xs text-white/60 mt-1 ml-1">
                            * Kosongkan jika tidak ingin mengubah password
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 text-sm font-bold text-white/50 hover:text-blue-500 hover:bg-white/80 border-2 border-white/50 rounded-xl transition-all"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                        Simpan Perubahan
                    </button>
                </div>
            </div>
        </div>
    );
}