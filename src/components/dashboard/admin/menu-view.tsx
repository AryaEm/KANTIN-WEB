"use client"

import { AdminStanMenu } from "@/app/types";
import { useEffect, useState } from "react";
import { get, post, drop, put } from "@/lib/api-bridge";
import { getCookie } from "@/lib/client-cookie";
import Image from "next/image";
import AddMenuModal from "./Menu/add-menu-modal";
import DelMenuModal from "./Menu/delete-menu-modal";
import EditMenuModal from "./Menu/edit-menu-modal";
import DiskonModal from "./Diskon/diskon-modal";
import CustomToast from "@/components/ui/CustomToast";
import { toast } from "react-toastify";
import axios from "axios";
import { Plus, SquarePen, Tag, Trash2, UtensilsCrossed } from "lucide-react";

export default function MenuView() {
    const [menus, setMenus] = useState<AdminStanMenu[]>([])
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState<AdminStanMenu | null>(null)
    const [showDiskonModal, setShowDiskonModal] = useState(false);
    const [selectedMenuForDiskon, setSelectedMenuForDiskon] = useState<AdminStanMenu | null>(null);

    const statusStyle = (status: AdminStanMenu["status"]) =>
        status === "tersedia"
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-red-500/20 text-red-400";

    const fetchMenus = async () => {
        try {
            const token = getCookie("token");
            const res = await get<AdminStanMenu[]>("/menu/menu-admin", token);

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
            const res = await post<AdminStanMenu>("/menu/add", formData, token);

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
                return;
            }

            await fetchMenus();

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

    const handleDeleteMenu = async () => {
        if (!selectedMenuId) return;

        try {
            const token = getCookie("token");

            const res = await drop(
                `/menu/delete/${selectedMenuId}`,
                token
            );

            if (!res.status) {
                toast(
                    <CustomToast
                        type="warning"
                        message={res.message ?? "File Maksimal 5mb"}
                    />,
                    {
                        containerId: "toastDeleteMenu",
                        className: "bg-yellow-400 rounded-xl shadow-lg",
                        icon: false,
                    }
                );
                return;
            }

            setMenus((prev) =>
                prev.filter((menu) => menu.id !== selectedMenuId)
            );

            toast(
                <CustomToast
                    type="success"
                    message="Menu berhasil dihapus"
                />,
                {
                    containerId: "toastDeleteMenu",
                    className: "p-0 bg-transparent shadow-none",
                    icon: false,
                    autoClose: 1500,
                }
            );

            setShowDeleteModal(false);
            setSelectedMenuId(null);
        } catch (err: unknown) {
            let message = "Gagal menghapus menu";

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message ?? err.message;
            }

            toast(
                <CustomToast type="error" message={message} />,
                {
                    containerId: "toastDeleteMenu",
                    className:
                        "bg-red-400 border border-white/10 rounded-xl shadow-xl",
                    icon: false,
                }
            );
        }
    };

    const handleUpdateMenu = async (id: number, formData: FormData) => {
        const token = getCookie("token");

        try {
            const res = await put<AdminStanMenu>(
                `/menu/update/${id}`,
                formData,
                token
            );

            if (!res.status) {
                toast(
                    <CustomToast
                        type="warning"
                        message={res.message ?? "File Maksimal 5mb"}
                    />,
                    {
                        containerId: "toastEditMenu",
                        className: "bg-yellow-400 rounded-xl shadow-lg",
                        icon: false,
                    }
                );
                return;
            }

            await fetchMenus();

            setShowEditModal(false);
            setSelectedMenu(null);

            toast(
                <CustomToast type="success" message="Menu berhasil diperbarui" />,
                { containerId: "toastEditMenu", autoClose: 1500, icon: false }
            );
        } catch (err: any) {
            let message = "Gagal update menu";

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message ?? err.message;
            }

            toast(
                <CustomToast type="error" message={message} />,
                { containerId: "toastEditMenu", icon: false }
            );
        }
    };


    if (loading) {
        return <p className="text-white">Loading menu...</p>;
    }
    const getFinalPrice = (price: number, discount?: number) => {
        if (!discount || discount <= 0) return price;
        return Math.round(price - (price * discount) / 100);
    };

    return (
        <>
            <div className="space-y-8 Poppins">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-medium text-white">Daftar Menu</h1>

                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-teal-500 tracking-wide hover:bg-teal-600 text-black px-5 py-2.5 rounded-xl font-semibold outline-none text-sm">
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
                                className="card-bg rounded-2xl relative overflow-hidden shadow-lg border border-white/15 hover:border-teal-400/40 cursor-pointer hover:shadow hover:shadow-teal-300/20 transition-all duration-300 hover:scale-105"
                            >
                                {menu.discount > 0 && (
                                    <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-teal-500/70 text-white border border-teal-400 backdrop-blur">
                                        {menu.discount}%
                                    </span>
                                )}

                                <div className="h-40 overflow-hidden bg-gradient-to-br from-teal-900 to-slate-900 flex items-center justify-center">
                                    {menu.image ? (
                                        <Image
                                            src={`${menu.image}?v=${menu.id}-${menu.price}`}
                                            alt={menu.name}
                                            width={400}
                                            height={160}
                                            className="w-full object-cover object-center"
                                            unoptimized
                                        />
                                    ) : (
                                        <UtensilsCrossed className="text-teal-400" size={48} />
                                    )}
                                </div>

                                <div className="border border-teal-400 absolute top-[6px] left-[6px] text-white py-px text-sm px-3 rounded-xl bg-black/30">{menu.jenis_menu}</div>

                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h2 className="text-lg font-semibold text-white">
                                                {menu.name}
                                            </h2>
                                            <p className="text-sm text-gray-400">{menu.description}</p>
                                        </div>

                                        <span
                                            className={`px-3 py-1 rounded-full tracking-wide text-sm ${statusStyle(
                                                menu.status
                                            )}`}
                                        >
                                            {menu.status}
                                        </span>
                                    </div>

                                    <div className="flex gap-2 items-center">
                                        <span className="text-xl font-bold text-teal-400">
                                            Rp {getFinalPrice(menu.price, menu.discount).toLocaleString("id-ID")}
                                        </span>
                                        {menu.discount > 0 && (
                                            <span className="text-sm text-white/40 line-through">
                                                Rp {Number(menu.price).toLocaleString("id-ID")}
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2 justify-between">
                                        <button
                                            onClick={() => {
                                                setSelectedMenu(menu);
                                                setShowEditModal(true);
                                            }}
                                            className="text-white text-sm hover:text-teal-400 outline-none py-[6px] bg-white/5 rounded-md border border-transparent hover:border-teal-400 flex gap-2 w-full justify-center items-center">
                                            <SquarePen size={15} /> Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedMenu(menu);
                                                setShowDiskonModal(true);
                                            }}
                                            className="text-white text-sm hover:text-teal-400  outline-none py-[6px] bg-white/5 rounded-md border border-transparent hover:border-teal-400 flex gap-2 w-full justify-center items-center">
                                            <Tag size={15} />
                                            {menu.discount > 0 ? "lepas Diskon" : "Pasang Diskon"}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedMenuId(menu.id);
                                                setShowDeleteModal(true);
                                            }} className="text-red-500 hover:text-red-600 border border-transparent hover:border-red-600 outline-none py-[6px] px-3 bg-white/5 rounded-md ">
                                            <Trash2 size={15} />
                                        </button>
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

            {showDeleteModal && (
                <DelMenuModal
                    onClose={() => setShowDeleteModal(false)}
                    onSubmit={handleDeleteMenu}
                />
            )}
            {showEditModal && selectedMenu && (
                <EditMenuModal
                    menu={selectedMenu}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedMenu(null);
                    }}
                    onSubmit={handleUpdateMenu}
                />
            )}
            {showDiskonModal && selectedMenu && (
                <DiskonModal
                    menuId={selectedMenu.id}
                    hasDiscount={selectedMenu.discount > 0}
                    activeDiskonId={selectedMenu.activeDiskonId} 
                    onClose={() => {
                        setShowDiskonModal(false);
                        setSelectedMenu(null);
                    }}
                    onSuccess={fetchMenus}
                />
            )}


        </>
    );
}
