"use client";

import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookie";
import { get } from "@/lib/api-bridge";
import Image from "next/image";
import { Search, Crown, User, ChessKing, Users, TrendingUp, Sparkles, Award, ShoppingBag, DollarSign } from "lucide-react";

type Pelanggan = {
    id_siswa: number;
    nama_siswa: string;
    foto?: string
    telp: string;
    total_transaksi: number;
    total_item: number;
    total_pengeluaran: number;
    terakhir_transaksi: string;
};

const isLangganan = (p: Pelanggan) => p.total_transaksi >= 30;
const isOrangKaya = (p: Pelanggan) => p.total_pengeluaran >= 500_000;

export default function SiswaListView() {
    const [pelanggan, setPelanggan] = useState<Pelanggan[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const token = getCookie("token");

    useEffect(() => {
        const fetchPelanggan = async () => {
            try {
                const res = await get("/order/stan/pelanggan", token);

                if (res?.status) {
                    setPelanggan(res.data as Pelanggan[]);
                }
            } catch (err) {
                console.error("Error fetch pelanggan:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPelanggan();
    }, [token]);

    const filteredPelanggan = pelanggan.filter((p) =>
        `${p.nama_siswa} ${p.telp}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const totalPelanggan = pelanggan.length;
    const totalLangganan = pelanggan.filter(isLangganan).length;
    const totalOrangKaya = pelanggan.filter(isOrangKaya).length;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="inline-flex p-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full mb-4 animate-pulse">
                        <Users className="w-8 h-8 text-orange-500" />
                    </div>
                    <p className="text-gray-600 font-medium">Memuat data pelanggan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl Fredoka font-bold text-gray-900 mb-2">
                    Daftar Siswa & Pelanggan
                </h1>
                <p className="text-gray-600 font-medium">
                    Kelola dan pantau aktivitas pelanggan anda
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 cursor-pointer rounded-2xl p-6 border-2 border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl group-hover:scale-110 transition-transform">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-blue-700 mb-1">
                                Total Pelanggan
                            </p>
                            <h2 className="text-3xl Fredoka font-bold text-blue-900">
                                {totalPelanggan}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 cursor-pointer rounded-2xl p-6 border-2 border-amber-200 hover:border-amber-300 hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl group-hover:scale-110 transition-transform">
                            <Crown className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-amber-700 mb-1">
                                Pelanggan Langganan
                            </p>
                            <h2 className="text-3xl Fredoka font-bold text-amber-900">
                                {totalLangganan}
                            </h2>
                            <p className="text-xs text-amber-600 mt-1">≥30 transaksi</p>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 cursor-pointer border-2 border-green-200 hover:border-green-300 hover:shadow-lg transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform">
                            <ChessKing className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-green-700 mb-1">
                                Orang Kaya
                            </p>
                            <h2 className="text-3xl Fredoka font-bold text-green-900">
                                {totalOrangKaya}
                            </h2>
                            <p className="text-xs text-green-600 mt-1">≥Rp 500.000</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative">
                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                />
                <input
                    type="text"
                    placeholder="Cari nama atau nomor telepon..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white border-2 border-gray-200 rounded-xl py-3 pl-12 pr-4 text-gray-900 font-medium placeholder:text-gray-400 focus:outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100 transition-all"
                />
            </div>

            {filteredPelanggan.length === 0 ? (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-12 border-2 border-gray-200 text-center">
                    <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
                        <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="Fredoka text-xl font-bold text-gray-900 mb-2">
                        {search ? "Pelanggan Tidak Ditemukan" : "Belum Ada Pelanggan"}
                    </h3>
                    <p className="text-gray-500">
                        {search
                            ? `Tidak ada hasil untuk "${search}"`
                            : "Belum ada data pelanggan tersedia"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredPelanggan.map((item) => {
                        const langganan = isLangganan(item);
                        const orangKaya = isOrangKaya(item);

                        return (
                            <div
                                key={item.id_siswa}
                                className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="relative">
                                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-100 to-yellow-100 flex items-center justify-center overflow-hidden border-2 border-orange-200 group-hover:border-orange-300 transition-all">
                                            {item.foto ? (
                                                <Image
                                                    src={item.foto}
                                                    fill
                                                    alt={item.nama_siswa}
                                                    className="object-cover rounded-full"
                                                    unoptimized
                                                />
                                            ) : (
                                                <User className="text-orange-500" size={28} />
                                            )}
                                        </div>

                                        {langganan && !orangKaya && (
                                            <div className="absolute -top-2 -left-2 p-1.5 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full shadow-lg">
                                                <Crown className="text-white" size={16} />
                                            </div>
                                        )}
                                        {orangKaya && !langganan && (
                                            <div className="absolute -top-2 -left-2 p-1.5 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full shadow-lg">
                                                <ChessKing className="text-white" size={16} />
                                            </div>
                                        )}
                                        {orangKaya && langganan && (
                                            <>
                                                <div className="absolute -top-2 -right-2 p-1.5 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full shadow-lg rotate-[20deg]">
                                                    <ChessKing className="text-white" size={14} />
                                                </div>
                                                <div className="absolute -top-2 -left-2 p-1.5 bg-gradient-to-br from-amber-400 to-yellow-400 rounded-full shadow-lg -rotate-[20deg]">
                                                    <Crown className="text-white" size={14} />
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="Fredoka text-lg font-bold text-gray-900 truncate mb-2">
                                            {item.nama_siswa}
                                        </h3>

                                        <div className="flex flex-wrap gap-2">
                                            {langganan && (
                                                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 rounded-lg">
                                                    <Award className="w-3 h-3 text-amber-600" />
                                                    <span className="text-xs font-bold text-amber-700">
                                                        Langganan
                                                    </span>
                                                </div>
                                            )}

                                            {orangKaya && (
                                                <div className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-300 rounded-lg">
                                                    <TrendingUp className="w-3 h-3 text-green-600" />
                                                    <span className="text-xs font-bold text-green-700">
                                                        Orang Kaya
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="w-4 h-4 text-orange-600" />
                                            <span className="text-sm font-medium text-gray-700">
                                                Total Belanja
                                            </span>
                                        </div>
                                        <span className="Fredoka font-bold text-orange-600">
                                            {new Intl.NumberFormat('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                                minimumFractionDigits: 0,
                                            }).format(item.total_pengeluaran)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                                        <div className="flex items-center gap-2">
                                            <ShoppingBag className="w-4 h-4 text-blue-600" />
                                            <span className="text-sm font-medium text-gray-700">
                                                Transaksi
                                            </span>
                                        </div>
                                        <span className="Fredoka text-xl font-bold text-blue-600">
                                            {item.total_transaksi}×
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}