"use client";

import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookie";
import { get } from "@/lib/api-bridge";
import Image from "next/image";
import { Search, Crown, User, ChessKing } from "lucide-react";

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

    return (
        <div className="space-y-8 Poppins">
            <h1 className="text-2xl font-semibold text-white">
                Daftar Siswa / Pelanggan
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-bg p-6 rounded-2xl border border-white/10">
                    <p className="text-white/70">Total Pelanggan</p>
                    <h2 className="text-3xl font-bold text-teal-400 mt-2">
                        {totalPelanggan}
                    </h2>
                </div>

                <div className="card-bg p-6 rounded-2xl border border-white/10">
                    <p className="text-white/70 flex items-center gap-2">
                        <Crown size={18} className="text-yellow-400" />
                        Langganan (30x transaksi)
                    </p>
                    <h2 className="text-3xl font-bold text-yellow-400 mt-2">
                        {totalLangganan}
                    </h2>
                </div>

                <div className="card-bg p-6 rounded-2xl border border-white/10">
                    <p className="text-white/70 flex items-center gap-2">
                        <ChessKing size={18} className="text-green-400" />
                        Orang Kaya (pengeluaran 500rb)
                    </p>
                    <h2 className="text-3xl font-bold text-green-400 mt-2">
                        {totalOrangKaya}
                    </h2>
                </div>
            </div>

            <div className="relative">
                <Search
                    className="absolute left-4 top-3 text-white/50"
                    size={18}
                />
                <input
                    type="text"
                    placeholder="Cari nama atau telp..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-[#0E1618] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPelanggan.map((item) => {
                    const langganan = isLangganan(item);
                    const orangKaya = isOrangKaya(item);

                    return (
                        <div
                            key={item.id_siswa}
                            className="card-bg rounded-2xl p-6 border border-white/10 shadow-xl flex justify-between items-center"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center gap-1 relative">
                                    <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center overflow-hidden">
                                        {item.foto ? (
                                            <Image src={item.foto} fill alt={item.nama_siswa} className="h-full w-full object-cover rounded-full" unoptimized/>
                                        ) : (
                                            <User className="text-white/60" size={18} />
                                        )}
                                    </div>
                                    {langganan && !orangKaya && (
                                        <Crown className="text-yellow-400 absolute -top-3 " size={18} />
                                    )}
                                    {orangKaya && !langganan && (
                                        <ChessKing className="text-green-400 absolute -top-3" size={18} />
                                    )}
                                    {orangKaya && langganan && (
                                        <>
                                            <ChessKing className="text-green-400 absolute -top-3 right-1 rotate-[20deg]" size={18} />
                                            <Crown className="text-yellow-400 absolute -top-3 left-1 -rotate-[20deg]" size={18} />
                                        </>
                                    )}

                                </div>

                                <div className="flex flex-col gap-[4px]">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="text-white font-semibold">
                                            {item.nama_siswa}
                                        </h3>

                                        {langganan && (
                                            <span className="bg-yellow-400/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full">
                                                Langganan
                                            </span>
                                        )}

                                        {orangKaya && (
                                            <span className="bg-green-400/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                                                Orang Kaya
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-white/60 text-sm">
                                        Total pengeluaran: <span className="text-teal-400">{new Intl.NumberFormat('id-ID', {
                                            style: 'currency',
                                            currency: 'IDR'
                                        }).format(item.total_pengeluaran)}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-teal-400 font-bold text-lg">
                                    {item.total_transaksi}
                                </p>
                                <p className="text-white/50 text-sm">transaksi</p>
                            </div>
                        </div>
                    );
                })}

                {filteredPelanggan.length === 0 && (
                    <p className="text-white/50 col-span-full text-center">
                        Data pelanggan tidak ditemukan
                    </p>
                )}
            </div>
        </div>
    );
}
