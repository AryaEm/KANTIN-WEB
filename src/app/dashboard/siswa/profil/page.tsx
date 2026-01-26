"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Edit } from "lucide-react";
import { toast } from "react-toastify";

import { get, put } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookie";
import { SiswaProfileResponse } from "@/app/types";
import CustomToast from "@/components/ui/CustomToast";
import EditSiswaProfilModal from "@/components/dashboard/siswa/Profil/profil-modal";

import chefProfil from "../../../../../public/Chefff.svg";

export default function ProfileView() {
  const [profile, setProfile] = useState<SiswaProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);

  const genderLabel = {
    laki_laki: "Laki-laki",
    perempuan: "Perempuan",
  } as const;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = getCookie("token");
      if (!token) throw new Error("Token tidak ditemukan");

      const res = await get<SiswaProfileResponse>("/user/profil", token);

      if (!res.status) throw new Error(res.message);

      setProfile(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateFoto = async (file: File) => {
  if (!profile?.siswa?.id) return;

  const token = getCookie("token");
  const formData = new FormData();
  formData.append("foto", file);

  try {
    const res = await put(
      `/user/siswa/pic/${profile.siswa.id}`,
      formData,
      token
    );

    if (!res.status) {
      toast(
        <CustomToast
          type="warning"
          message={res.message ?? "Gagal update foto profil siswa"}
        />,
        {
          containerId: "toastEditDataProfilSiswa",
          className: "bg-yellow-400 rounded-xl shadow-lg",
          icon: false,
        }
      );
      return;
    }

    await fetchProfile();

    toast(
      <CustomToast
        type="success"
        message="Foto profil berhasil diperbarui"
      />,
      {
        containerId: "toastEditDataProfilSiswa",
        className: "p-0 bg-transparent shadow-none",
        icon: false,
        autoClose: 1500,
      }
    );
  } catch (err: any) {
    toast(
      <CustomToast
        type="error"
        message={err.message ?? "Gagal upload foto"}
      />,
      {
        containerId: "toastEditDataProfilSiswa",
        className: "bg-red-400 border border-white/10 rounded-xl shadow-xl",
        icon: false,
      }
    );
  }
};

  const handleUpdateProfile = async (
    siswaId: number,
    payload: {
      nama_siswa: string;
      telp: string;
      foto?: string;
      jenis_kelamin: string;
      username: string;
      password?: string;
    }
  ) => {
    const token = getCookie("token");

    try {
      const res = await put(
        `/user/update-siswa/${siswaId}`,
        payload,
        token
      );

      if (!res.status) {
        toast(
          <CustomToast
            type="warning"
            message={res.message ?? "Gagal update profil siswa"}
          />,
          { containerId: "toastEditDataSiswa" }
        );
        return;
      }

      await fetchProfile();

      toast(
        <CustomToast
          type="success"
          message="Profil siswa berhasil diperbarui"
        />,
        {
          containerId: "toastEditDataSiswa",
          autoClose: 1500,
        }
      );
    } catch (err) {
      let message = "Terjadi kesalahan server";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message ?? err.message;
      }

      toast(
        <CustomToast type="error" message={message} />,
        { containerId: "toastEditDataSiswa" }
      );
    }
  };

  if (loading) {
    return (
      <section className="min-h-dvh flex items-center justify-center text-zinc-400 bg-primary">
        Memuat profil...
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="min-h-dvh flex items-center justify-center text-red-400 bg-primary">
        Gagal memuat data profil
      </section>
    );
  }

  return (
    <>
      <section className="min-h-dvh w-full grid-bg text-white relative flex justify-center items-center gap-24">
        <div className="relative w-2/5 px-6 pb-6 border-2 rounded-md border-teal-500 bg-primary shadow-2xl">
          <div className="-mt-14 mb-4">
            <div className="w-28 h-28 relative rounded-full bg-zinc-900">
              <Image
                src={profile.siswa?.foto ?? chefProfil}
                alt="Profil"
                width={112}
                height={112}
                className="object-cover w-28 h-28 rounded-full border-4 border-teal-500"
                unoptimized
              />

              <label className="bg-teal-400 h-7 w-7 flex justify-center items-center absolute bottom-1 z-30 right-1 rounded-md cursor-pointer hover:bg-teal-500 transition">
                <Edit size={16} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleUpdateFoto(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">Siswa</h1>
              <span className="text-xs px-2 py-1 rounded-full bg-teal-500/15 text-teal-400">
                Siswa
              </span>
            </div>

            <p className="text-sm text-zinc-400 leading-relaxed">
              Akun siswa untuk melakukan pemesanan dan memantau transaksi
              pada sistem kantin digital.
            </p>

            <div className="flex flex-wrap gap-2 mt-3">
              <MetaItem label="Username" value={profile.username} />
              <MetaItem label="Role" value="Siswa" />
            </div>

            <div className="text-sm mt-6 text-white/80 flex gap-6">
              <div className="flex flex-col gap-2">
                <p className="py-2 pl-3 pr-16">Nama Siswa</p>
                <p className="py-2 pl-3 pr-16">Telp</p>
                <p className="py-2 pl-3 pr-16">Jenis Kelamin</p>
              </div>

              <div className="flex flex-col gap-2 w-1/2">
                <p className="bg-white/3 py-2 rounded-md w-full pl-3 border border-white/20">
                  {profile.siswa?.nama_siswa ?? "-"}
                </p>
                <p className="bg-white/3 py-2 rounded-md w-full pl-3 border border-white/20">
                  {profile.siswa?.telp ?? "-"}
                </p>
                <p className="bg-white/3 py-2 rounded-md w-full pl-3 border border-white/20">
                  {profile.siswa
                    ? genderLabel[profile.siswa.jenis_kelamin]
                    : "-"}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-8 gap-4">
              <Link
                href="/dashboard/siswa"
                className="inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm border border-zinc-800 bg-white/5 hover:bg-white/10 transition"
              >
                Kembali
              </Link>

              <button
                onClick={() => setShowEdit(true)}
                className="inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium text-teal-400 border border-teal-500/40 hover:bg-teal-500/10"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </section>

      {showEdit && profile && (
        <EditSiswaProfilModal
          profile={profile}
          onClose={() => setShowEdit(false)}
          onSubmit={handleUpdateProfile}
        />
      )}
    </>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
      <span className="text-zinc-500">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
