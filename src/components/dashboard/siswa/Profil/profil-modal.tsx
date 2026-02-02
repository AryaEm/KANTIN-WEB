"use client";

import { useEffect, useState } from "react";
import { SiswaProfileResponse } from "@/app/types";
import { X, User, Phone, UserCircle, Lock, Edit } from "lucide-react";

type Props = {
  profile: SiswaProfileResponse;
  onClose: () => void;
  onSubmit: (
    siswaId: number,
    payload: {
      nama_siswa: string;
      telp: string;
      jenis_kelamin: "laki_laki" | "perempuan";
      username: string;
      password?: string;
    }
  ) => Promise<void>;
};

export default function EditSiswaProfilModal({ profile, onClose, onSubmit }: Props) {
  const [username, setUsername] = useState(profile.username);
  const [namaSiswa, setNamaSiswa] = useState(profile.siswa?.nama_siswa ?? "");
  const [telp, setTelp] = useState(profile.siswa?.telp ?? "");
  const [jenisKelamin, setJenisKelamin] = useState(profile.siswa?.jenis_kelamin ?? "laki_laki");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setUsername(profile.username);
    setNamaSiswa(profile.siswa?.nama_siswa ?? "");
    setTelp(profile.siswa?.telp ?? "");
    setJenisKelamin(profile.siswa?.jenis_kelamin ?? "laki_laki");
    setPassword("");
  }, [profile.id]);

  const handleSubmit = async () => {
    if (!profile.siswa) return;

    try {
      setSubmitting(true);

      await onSubmit(profile.siswa.id, {
        username,
        nama_siswa: namaSiswa,
        telp,
        jenis_kelamin: jenisKelamin as "laki_laki" | "perempuan",
        password: password || undefined,
      });

      onClose();
    } finally {
      setSubmitting(false);
    }
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
              Edit Profil Siswa
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

          {/* Nama Siswa */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
              <User className="w-4 h-4" />
              Nama Siswa
            </label>
            <input
              className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-blue-400 placeholder:text-white/50 transition-all"
              value={namaSiswa}
              onChange={(e) => setNamaSiswa(e.target.value)}
              placeholder="Masukkan nama siswa"
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

          {/* Jenis Kelamin */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-white/90 font-semibold text-sm">
              <UserCircle className="w-4 h-4" />
              Jenis Kelamin
            </label>
            <select
              className="w-full p-3 rounded-xl bg-white/20 border-2 border-white/15 text-white font-semibold outline-none focus:border-blue-400 transition-all cursor-pointer"
              value={jenisKelamin}
              onChange={(e) => setJenisKelamin(e.target.value as "laki_laki" | "perempuan")}
            >
              <option value="laki_laki" className="bg-gray-800 text-white">
                Laki-laki
              </option>
              <option value="perempuan" className="bg-gray-800 text-white">
                Perempuan
              </option>
            </select>
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
            disabled={submitting}
            className="flex-1 px-6 py-3 text-sm font-bold text-white/50 hover:text-blue-500 hover:bg-white/80 border-2 border-white/50 rounded-xl transition-all disabled:opacity-50"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {submitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
}