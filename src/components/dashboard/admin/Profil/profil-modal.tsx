"use client";

import { useEffect, useState } from "react";
import { AdminProfileResponse } from "@/app/types";

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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white/10 border border-teal-400/50 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md space-y-4">
                <h2 className="text-lg font-semibold text-white">
                    Edit Profil Admin
                </h2>

                <input
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />

                <input
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={namaStan}
                    onChange={(e) => setNamaStan(e.target.value)}
                    placeholder="Nama Stan"
                />

                <input
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={namaPemilik}
                    onChange={(e) => setNamaPemilik(e.target.value)}
                    placeholder="Nama Pemilik"
                />

                <input
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={telp}
                    onChange={(e) => setTelp(e.target.value)}
                    placeholder="No Telp"
                />

                <input
                    type="password"
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password baru"
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
