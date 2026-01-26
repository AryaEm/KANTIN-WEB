"use client";

import { useEffect, useState } from "react";
import { SiswaProfileResponse } from "@/app/types";

type Props = {
    profile: SiswaProfileResponse;
    onClose: () => void;
    onSubmit: (
        siswaId: number,
        payload: {
            nama_siswa: string;
            telp: string;
            jenis_kelamin: "laki_laki" | "perempuan";
            foto?: string;
            username: string;
            password?: string;
        }
    ) => Promise<void>;
};

export default function EditSiswaProfilModal({ profile, onClose, onSubmit }: Props) {
    const [username, setUsername] = useState(profile.username);
    const [namaSiswa, setNamaSiswa] = useState(profile.siswa?.nama_siswa ?? "");
    const [telp, setTelp] = useState(profile.siswa?.telp ?? "");
    const [jenisKelamin, setjenisKelamin] = useState(profile.siswa?.jenis_kelamin ?? "");
    const [foto, setFoto] = useState(profile.siswa?.foto ?? "");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setUsername(profile.username);
        setNamaSiswa(profile.siswa?.nama_siswa ?? "");
        setTelp(profile.siswa?.telp ?? "");
        setjenisKelamin(profile.siswa?.jenis_kelamin ?? "");
        setFoto(profile.siswa?.foto ?? "");
        setPassword("");
    }, [profile.id]);

    const handleSubmit = () => {
        if (!profile.siswa) return;

        setSubmitting(true);
        onSubmit(profile.siswa.id, {
            username,
            nama_siswa: namaSiswa,
            telp,
            jenis_kelamin: jenisKelamin as "laki_laki" | "perempuan",
            password: password || undefined,
        });
        setSubmitting(false);

        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white/10 border border-teal-400/50 backdrop-blur-lg p-6 rounded-2xl w-full max-w-md space-y-4">
                <h2 className="text-lg font-semibold text-white">
                    Edit Profil Siswa
                </h2>

                <input
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                />

                <input
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={namaSiswa}
                    onChange={(e) => setNamaSiswa(e.target.value)}
                    placeholder="Nama Stan"
                />

                <input
                    className="w-full p-2 rounded-md bg-white/10 text-white"
                    value={jenisKelamin}
                    onChange={(e) => setjenisKelamin(e.target.value)}
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
