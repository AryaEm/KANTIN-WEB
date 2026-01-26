"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { get } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookie";
import { AdminProfileResponse } from "@/app/types";
import { put } from "@/lib/api-bridge";
import { toast } from "react-toastify";
import CustomToast from "@/components/ui/CustomToast";
import axios from "axios";
import EditProfilModal from "@/components/dashboard/admin/Profil/profil-modal";
import chefProfil from "../../../../../public/Chefff.svg"

export default function ProfileView() {
    const [profile, setProfile] = useState<AdminProfileResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = getCookie("token");

            if (!token) {
                throw new Error("Token tidak ditemukan");
            }

            const res = await get<AdminProfileResponse>(
                "/user/profil",
                token
            );

            if (!res.status) {
                throw new Error(res.message);
            }

            setProfile(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (
        stanId: number,
        payload: {
            nama_stan: string;
            nama_pemilik: string;
            telp: string;
            username: string;
            password?: string;
        }
    ) => {
        const token = getCookie("token");

        try {
            const res = await put(
                `/user/update-admin-stan/${stanId}`,
                payload,
                token
            );

            if (!res.status) {
                toast(
                    <CustomToast
                        type="warning"
                        message={res.message ?? "Gagal Update Profil Admin"}
                    />,
                    {
                        containerId: "toastEditDataAdmin",
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
                    message="Profil Admin Berhasil Diperbarui"
                />,
                {
                    containerId: "toastEditDataAdmin",
                    className: "p-0 bg-transparent shadow-none",
                    icon: false,
                    autoClose: 1500,
                }
            );
        } catch (err: unknown) {
            let message = "Terjadi kesalahan server";

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message ?? err.message;
            }

            toast(
                <CustomToast type="error" message={message} />,
                {
                    containerId: "toastEditDataAdmin",
                    className:
                        "bg-red-400 border border-white/10 rounded-xl shadow-xl",
                    icon: false,
                }
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

                <div className="relative px-6 pb-6 border-2 rounded-md border-teal-500 bg-primary shadow-2xl">
                    <div className="-mt-14 mb-4">
                        <div className="w-28 h-28 rounded-full bg-zinc-900 border-4 border-teal-500 flex items-center justify-center text-xl font-semibold">
                            <Image src={chefProfil} alt="Profil" className="rounded-full" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 max-w-lg">
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Admin Stan
                            </h1>
                            <span className="text-xs px-2 py-1 rounded-full bg-teal-500/15 text-teal-400">
                                Admin
                            </span>
                        </div>

                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Akun administrator yang mengelola data stan, menu, dan transaksi
                            pada sistem kantin digital.
                        </p>

                        <div className="flex flex-wrap gap-2 mt-3">
                            <MetaItem label="Username" value={profile.username} />
                            <MetaItem label="Role" value="Admin" />
                        </div>

                        <div className="text-sm Poppins mt-6 text-white/80 flex gap-6">
                            <div className="flex flex-col gap-2">
                                <p className="py-2 rounded-md pl-3 pr-16">Nama Stan</p>
                                <p className="py-2 rounded-md pl-3 pr-16">Nama Pemilik</p>
                                <p className="py-2 rounded-md pl-3 pr-16">Telp</p>
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                                <p className="bg-white/3 py-2 rounded-md w-full pl-3 border border-white/20">{profile.stan?.nama_stan ?? "-"}</p>
                                <p className="bg-white/3 py-2 rounded-md w-full pl-3 border border-white/20"> {profile.stan?.nama_pemilik ?? "-"}</p>
                                <p className="bg-white/3 py-2 rounded-md w-full pl-3 border border-white/20">{profile.stan?.telp ?? "-"}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-8 gap-4 Poppins tracking-wide">
                            <Link
                                href="/dashboard/admin"
                                className="inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm border border-zinc-800 bg-white/5 hover:bg-white/10 hover:text-white transition"
                            >
                                Kembali
                            </Link>

                            <button
                                onClick={() => setShowEdit(true)}
                                className="inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium text-teal-400 transition-all border border-teal-500/40 hover:bg-teal-500/10"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {
                showEdit && profile && (
                    <EditProfilModal
                        profile={profile}
                        onClose={() => setShowEdit(false)}
                        onSubmit={handleUpdateProfile}
                    />
                )
            }
        </>
    );
}

function MetaItem({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
            <span className="text-zinc-500">{label}:</span>
            <span>{value}</span>
        </div>
    );
}
