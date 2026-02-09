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
    // const [selectedMenuForDiskon, setSelectedMenuForDiskon] = useState<AdminStanMenu | null>(null);

    const statusStyle = (status: AdminStanMenu["status"]) =>
        status === "tersedia"
            ? "bg-green-100 text-green-700 border-green-300"
            : "bg-red-100 text-red-700 border-red-300";

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
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="inline-flex p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full mb-4 animate-pulse">
                        <UtensilsCrossed className="w-8 h-8 text-orange-500" />
                    </div>
                    <p className="text-gray-600 font-medium">Loading menu...</p>
                </div>
            </div>
        );
    }

    const getFinalPrice = (price: number, discount?: number) => {
        if (!discount || discount <= 0) return price;
        return Math.round(price - (price * discount) / 100);
    };

    return (
        <>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl Fredoka font-bold text-gray-900">Daftar Menu</h1>

                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                        <Plus size={20} /> Tambah Menu
                    </button>
                </div>

                {menus.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border-2 border-gray-200">
                        <UtensilsCrossed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium text-lg">Belum ada menu.</p>
                        <p className="text-gray-400 text-sm mt-2">Klik "Tambah Menu" untuk membuat menu pertama</p>
                    </div>
                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {menus.map((menu) => (

                            <div
                                key={menu.id}
                                className="bg-white rounded-3xl relative overflow-hidden shadow-md border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 group"
                            >
                                {menu.discount > 0 && (
                                    <div className="absolute top-4 right-4 z-10">
                                        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                                            -{menu.discount}%
                                        </div>
                                    </div>
                                )}

                                <div className="h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center relative">
                                    {menu.image ? (
                                        <Image
                                            src={`${menu.image}?v=${menu.id}-${menu.price}`}
                                            alt={menu.name}
                                            width={400}
                                            height={192}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            unoptimized
                                        />
                                    ) : (
                                        <UtensilsCrossed className="text-orange-300" size={64} />
                                    )}

                                    {/* Category Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur text-gray-700 text-xs font-bold rounded-full border-2 border-gray-200">
                                            {menu.jenis_menu}
                                        </span> 
                                    </div>
                                </div>

                                <div className="p-5 space-y-4 h-[28dvh] flex flex-col justify-between">
                                    <div className="flex justify-between items-start gap-3">
                                        <div className="flex-1">
                                            <h2 className="text-xl Fredoka tracking-wide font-bold text-gray-900 mb-1">
                                                {menu.name}
                                            </h2>
                                            <p className="text-sm text-gray-500 line-clamp-2">{menu.description}</p>
                                        </div>

                                        <span
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 whitespace-nowrap ${statusStyle(
                                                menu.status
                                            )}`}
                                        >
                                            {menu.status}
                                        </span>
                                    </div>

                                    <div>
                                        <div className="flex gap-2 items-center mb-2">
                                            <span className="text-2xl Fredoka font-bold text-orange-600">
                                                Rp {getFinalPrice(menu.price, menu.discount).toLocaleString("id-ID")}
                                            </span>
                                            {menu.discount > 0 && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    Rp {Number(menu.price).toLocaleString("id-ID")}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex gap-2 pt-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedMenu(menu);
                                                    setShowEditModal(true);
                                                }}
                                                className="flex-1 text-gray-700 text-sm font-semibold hover:text-orange-600 py-2.5 bg-gray-100 hover:bg-orange-50 rounded-xl border-2 border-gray-200 hover:border-orange-300 flex gap-2 justify-center items-center transition-all">
                                                <SquarePen size={16} /> Edit
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedMenu(menu);
                                                    setShowDiskonModal(true);
                                                }}
                                                className="flex-1 text-gray-700 text-sm font-semibold hover:text-yellow-600 py-2.5 bg-gray-100 hover:bg-yellow-50 rounded-xl border-2 border-gray-200 hover:border-yellow-300 flex gap-2 justify-center items-center transition-all">
                                                <Tag size={16} />
                                                {menu.discount > 0 ? "Lepas" : "Diskon"}
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedMenuId(menu.id);
                                                    setShowDeleteModal(true);
                                                }}
                                                className="text-red-600 hover:text-white py-2.5 px-3 bg-red-50 hover:bg-red-500 rounded-xl border-2 border-red-200 hover:border-red-500 transition-all">
                                                <Trash2 size={16} />
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