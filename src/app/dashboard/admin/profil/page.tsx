"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { get } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookie";
import { AdminProfileResponse } from "@/app/types";
import { put, drop } from "@/lib/api-bridge";
import { removeCookie } from "@/lib/client-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CustomToast from "@/components/ui/CustomToast";
import { storeCookie } from "@/lib/client-cookie";
import axios from "axios";
import { Trash, Edit, ArrowLeft, User, Store, Phone, Shield, AlertTriangle, Sparkles } from "lucide-react";
import EditProfilModal from "@/components/dashboard/admin/Profil/profil-modal";
import chefProfil from "../../../../../public/Chefff.svg"

export default function ProfileView() {
    const [profile, setProfile] = useState<AdminProfileResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [showEdit, setShowEdit] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleting, setDeleting] = useState(false);


    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = getCookie("token");
            if (!token) throw new Error("Token tidak ditemukan");

            const res = await get<AdminProfileResponse>("/user/profil", token);

            if (!res.status) throw new Error(res.message);

            setProfile(res.data);
            updateAdminCookies(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    function updateAdminCookies(data: AdminProfileResponse) {
        storeCookie("username", data.username);

        if (data.stan) {
            storeCookie("nama_stan", data.stan.nama_stan);
            storeCookie("nama_pemilik", data.stan.nama_pemilik);
            storeCookie("telp", data.stan.telp);
        }
    }

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

    const router = useRouter();

    const handleDeleteUser = async () => {
        if (!profile) return;

        const token = getCookie("token");
        if (!token) return;

        try {
            setDeleting(true);

            const res = await drop(
                `/user/delete/${profile.id}`,
                token
            );

            if (!res.status) {
                toast(
                    <CustomToast
                        type="warning"
                        message={res.message ?? "Gagal Menghapus Akun"}
                    />,
                    {
                        containerId: "ToastDeleteAdmin",
                        className: "bg-yellow-400 rounded-xl shadow-lg",
                        icon: false,
                    }
                );
                return;
            }

            toast(
                <CustomToast
                    type="success"
                    message="Akun Berhasil Dihapus"
                />,
                {
                    containerId: "ToastDeleteAdmin",
                    className: "p-0 bg-transparent shadow-none",
                    icon: false,
                    autoClose: 1500,
                }
            );

            removeCookie("token");
            removeCookie("username");
            removeCookie("nama_stan");
            removeCookie("nama_pemilik");
            removeCookie("telp");

            router.replace("/");

        } catch (err: unknown) {
            let message = "Terjadi kesalahan server";

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message ?? err.message;
            }

            toast(
                <CustomToast type="error" message={message} />,
                {
                    containerId: "ToastDeleteAdmin",
                    className:
                        "bg-red-400 border border-white/10 rounded-xl shadow-xl",
                    icon: false,
                }
            );
        } finally {
            setDeleting(false);
            setShowDeleteConfirm(false);
        }
    };



    if (loading) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full mb-4 animate-pulse">
                        <User className="w-8 h-8 text-orange-500" />
                    </div>
                    <p className="text-gray-600 font-medium">Memuat profil...</p>
                </div>
            </section>
        );
    }

    if (!profile) {
        return (
            <section className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex p-4 bg-red-100 rounded-full mb-4">
                        <AlertTriangle className="w-8 h-8 text-red-500" />
                    </div>
                    <p className="text-red-600 font-medium">Gagal memuat data profil</p>
                </div>
            </section>
        );
    }

    return (
        <>
            <section className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-white py-16 px-4 relative overflow-hidden">
                <div className="absolute -top-20 -right-[2%] w-[400px] h-[400px] bg-yellow-300 dashboard-blob-1 opacity-10"></div>
                <div className="absolute bottom-20 left-[5%] w-[350px] h-[350px] bg-orange-400 dashboard-blob-2 opacity-10"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-300 mb-4">
                            <Sparkles className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-bold text-orange-600 tracking-wide">
                                PROFIL ADMIN
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 border-2 border-gray-200 shadow-xl">
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative mb-6">
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 border-4 border-orange-300 flex items-center justify-center shadow-lg">
                                    <Image
                                        src={chefProfil}
                                        alt="Profil Admin"
                                        className="rounded-full w-28 h-28"
                                    />
                                </div>
                                <div className="absolute bottom-1 right-1 p-2 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full shadow-lg">
                                    <Shield className="w-5 h-5 text-white" />
                                </div>
                            </div>

                            <div className="text-center">
                                <h1 className="text-3xl Fredoka font-bold text-gray-900 mb-2">
                                    Admin Stan
                                </h1>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-300">
                                    <Shield className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-bold text-orange-700">
                                        Admin
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-center mt-4 max-w-md">
                                Akun admin yang mengelola data stan, menu, dan transaksi pada sistem kantin digital.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-blue-700">
                                        Username
                                    </span>
                                </div>
                                <p className="text-lg font-bold text-blue-900 ml-11">
                                    {profile.username}
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                                        <Shield className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-purple-700">
                                        Role
                                    </span>
                                </div>
                                <p className="text-lg font-bold text-purple-900 ml-11">
                                    Admin
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg">
                                        <Store className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-orange-700">
                                        Nama Stan
                                    </span>
                                </div>
                                <p className="text-lg font-bold text-orange-900 ml-11">
                                    {profile.stan?.nama_stan ?? "-"}
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-green-700">
                                        Nama Pemilik
                                    </span>
                                </div>
                                <p className="text-lg font-bold text-green-900 ml-11">
                                    {profile.stan?.nama_pemilik ?? "-"}
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border-2 border-amber-200 md:col-span-2">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg">
                                        <Phone className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-semibold text-amber-700">
                                        Nomor Telepon
                                    </span>
                                </div>
                                <p className="text-lg font-bold text-amber-900 ml-11">
                                    {profile.stan?.telp ?? "-"}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-gray-100">
                            <Link
                                href="/dashboard/admin"
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-gray-600 bg-white border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                            >
                                <ArrowLeft size={18} />
                                Kembali
                            </Link>

                            <button
                                onClick={() => setShowEdit(true)}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                            >
                                <Edit size={18} />
                                Edit Profil
                            </button>

                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                            >
                                <Trash size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {showEdit && profile && (
                <EditProfilModal
                    profile={profile}
                    onClose={() => setShowEdit(false)}
                    onSubmit={handleUpdateProfile}
                />
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white/15 backdrop-blur w-full max-w-md rounded-3xl p-8 border-2 border-red-500 shadow-2xl">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-gradient-to-br from-red-500 to-rose-500 rounded-full">
                                <AlertTriangle className="w-12 h-12 text-white" />
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-2xl Fredoka font-bold text-white mb-3">
                                Hapus Akun Admin?
                            </h2>
                            <p className="text-white/80 font-medium">
                                Akun ini akan dihapus secara permanen beserta semua data stan dan menu. Tindakan ini <b>tidak dapat dibatalkan</b>.
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={deleting}
                                className="flex-1 px-6 py-3 text-sm font-bold text-white/50 hover:text-white hover:bg-white/20 border-2 border-white/50 rounded-xl transition-all disabled:opacity-50"
                            >
                                Batal
                            </button>

                            <button
                                onClick={handleDeleteUser}
                                disabled={deleting}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl text-sm font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                            >
                                <Trash size={18} />
                                {deleting ? "Menghapus..." : "Hapus Akun"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}