"use client"

import { MenuItem } from "@/app/types";
import { useEffect, useState } from "react";
import { get, post } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookie";
import Image from "next/image";
import AddMenuModal from "./Menu/add-menu-modal";
import CustomToast from "@/components/ui/CustomToast";
import { toast } from "react-toastify";
import axios from "axios";
import { Plus, SquarePen, Tag, Trash2, UtensilsCrossed } from "lucide-react";

export default function MenuView() {
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const statusStyle = (status: MenuItem["status"]) =>
        status === "tersedia"
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-red-500/20 text-red-400";

    const fetchMenus = async () => {
        try {
            const token = getCookie("token");
            const res = await get<MenuItem[]>("/menu/menu-admin", token);

            if (!res.status) throw new Error(res.message);
            setMenus(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMenus();
    }, []);

    const handleAddMenu = async (formData: FormData) => {
        const token = getCookie("token");

        try {
            const res = await post<MenuItem>("/menu/add", formData, token);

            if (!res.status) {
                toast(
                    <CustomToast
                        type="warning"
                        message={res.message ?? "File Maksimal 5mb"}
                    />,
                    {
                        containerId: "toastAddMenu",
                        className: "bg-yellow-400 rounded-xl shadow-lg",
                        icon: false,
                    }
                );
                return; // ⬅️ PENTING
            }

            setMenus((prev) => [res.data, ...prev]);
            setShowModal(false);

            toast(
                <CustomToast
                    type="success"
                    message="Menu berhasil ditambahkan"
                />,
                {
                    containerId: "toastAddMenu",
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
                    containerId: "toastAddMenu",
                    className:
                        "bg-red-400 border border-white/10 rounded-xl shadow-xl",
                    icon: false,
                }
            );
        }
    };

    if (loading) {
        return <p className="text-white">Loading menu...</p>;
    }
    return (
        <>
            <div className="space-y-8 Poppins">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-medium text-white">Daftar Menu</h1>

                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-black px-5 py-2.5 rounded-xl font-medium outline-none text-sm">
                        <Plus size={20} /> Tambah Menu
                    </button>
                </div>

                {menus.length === 0 ? (
                    <p className="text-white/60 text-sm">Belum ada menu.</p>
                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menus.map((menu) => (

                            <div
                                key={menu.id}
                                className="card-bg rounded-2xl overflow-hidden shadow-lg border border-white/15 hover:shadow hover:shadow-teal-300/20 transition-all duration-300 hover:scale-105"
                            >

                                <div className="h-40 overflow-hidden bg-gradient-to-br from-teal-900 to-slate-900 flex items-center justify-center">
                                    {menu.foto ? (
                                        <Image
                                            src={menu.foto}
                                            alt={menu.nama_menu}
                                            width={400}
                                            height={160}
                                            className="w-full object-cover object-center"
                                            unoptimized
                                        />
                                    ) : (
                                        <UtensilsCrossed className="text-teal-400" size={48} />
                                    )}
                                </div>

                                <div className="p-5 space-y-3">
                                    <div className="flex justify-between items-start pb-2">
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">
                                                {menu.nama_menu}
                                            </h2>
                                            <p className="text-sm text-gray-400">{menu.jenis}</p>
                                        </div>

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm ${statusStyle(
                                                menu.status
                                            )}`}
                                        >
                                            {menu.status}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <p className="text-xl font-bold text-teal-400">
                                            Rp {menu.harga.toLocaleString("id-ID")}
                                        </p>

                                        <div className="flex gap-3 pt-2">
                                            <button className="text-white hover:text-teal-400 outline-none p-[10px] bg-white/5 rounded-md border border-transparent hover:border-teal-400">
                                                <SquarePen size={18} />
                                            </button>
                                            <button className="text-white hover:text-teal-400 outline-none p-[10px] bg-white/5 rounded-md border border-transparent hover:border-teal-400">
                                                <Tag size={18} />
                                            </button>
                                            <button className="text-red-500 hover:text-red-600 border border-transparent hover:border-red-600 outline-none p-[10px] bg-white/5 rounded-md ">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showModal && (
                <AddMenuModal
                    onClose={() => setShowModal(false)}
                    onSubmit={handleAddMenu}
                />
            )}

        </>
    );
}
