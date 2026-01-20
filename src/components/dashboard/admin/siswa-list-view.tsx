"use client"

import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookie";
import { get } from "@/lib/api-bridge";
import { Search, Crown, User, ChessKing } from "lucide-react";

export default function SiswaListView() {
    const siswa = [
        {
            nama: "Ahmad Rizki",
            email: "ahmad@school.id",
            transaksi: 45,
            langganan: true,
            orang_kaya: false
        },
        {
            nama: "Siti Nurhaliza",
            email: "siti@school.id",
            transaksi: 32,
            langganan: true,
            orang_kaya: false
        },
        {
            nama: "Budi Santoso",
            email: "budi@school.id",
            transaksi: 8,
            langganan: false,
            orang_kaya: true
        },
        {
            nama: "Diana Putri",
            email: "diana@school.id",
            transaksi: 15,
            langganan: false,
            orang_kaya: true
        },
        {
            nama: "Eko Prasetyo",
            email: "eko@school.id",
            transaksi: 28,
            langganan: true,
            orang_kaya: false
        },
        {
            nama: "Eko Prasetyo",
            email: "eko@school.id",
            transaksi: 28,
            langganan: false,
            orang_kaya: false
        },
        {
            nama: "Eko Prasetyo",
            email: "eko@school.id",
            transaksi: 28,
            langganan: false,
            orang_kaya: false
        },
        {
            nama: "Eko Prasetyo",
            email: "eko@school.id",
            transaksi: 28,
            langganan: false,
            orang_kaya: false
        },
        {
            nama: "Eko Prasetyo",
            email: "eko@school.id",
            transaksi: 28,
            langganan: false,
            orang_kaya: false
        },
        {
            nama: "Eko Prasetyo",
            email: "eko@school.id",
            transaksi: 28,
            langganan: false,
            orang_kaya: false
        },
        {
            nama: "Eko Prasetyo",
            email: "eko@school.id",
            transaksi: 28,
            langganan: false,
            orang_kaya: false
        },
        {
            nama: "Eko Prasetyo",
            email: "eko@school.id",
            transaksi: 28,
            langganan: false,
            orang_kaya: false
        },
    ];

    return (
        <div className="space-y-8 Poppins">

            {/* Header */}
            <h1 className="text-2xl font-semibold text-white">Daftar Siswa</h1>

            {/* Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-bg p-6 rounded-2xl border border-white/10">
                    <p className="text-white/70">Total Siswa</p>
                    <h2 className="text-3xl font-bold text-teal-400 mt-2">15</h2>
                </div>

                <div className="card-bg p-6 rounded-2xl border border-white/10">
                    <p className="text-white/70 flex items-center gap-2">
                        <Crown size={18} className="text-yellow-400" />
                        Pelanggan Langganan
                    </p>
                    <h2 className="text-3xl font-bold text-yellow-400 mt-2">6</h2>
                </div>

                <div className="card-bg p-6 rounded-2xl border border-white/10">
                    <p className="text-white/70 flex gap-2">
                        <ChessKing size={18} className="text-green-400" />
                        Orang Kaya
                    </p>
                    <h2 className="text-3xl font-bold text-teal-400 mt-2">2</h2>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-3 text-white/50" size={18} />
                    <input
                        type="text"
                        placeholder="Cari nama atau email..."
                        className="w-full bg-[#0E1618] border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
                    />
                </div>

                <div className="flex gap-3">
                    <button className="bg-teal-500 text-black px-6 py-2.5 rounded-xl font-medium">
                        Semua
                    </button>
                    <button className="bg-white/10 text-white px-6 py-2.5 rounded-xl">
                        Langganan
                    </button>
                    <button className="bg-white/10 text-white px-6 py-2.5 rounded-xl">
                        Biasa
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {siswa.map((item, index) => (
                    <div
                        key={index}
                        className="card-bg rounded-2xl p-6 border border-white/10 shadow-xl flex justify-between items-center"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-teal-500/10 flex items-center justify-center">
                                {item.langganan ? (
                                    <Crown className="text-yellow-400" />
                                ) : (
                                    <User className="text-white/60" />
                                )}
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-white font-semibold">{item.nama}</h3>
                                    {item.langganan && (
                                        <span className="bg-yellow-400/20 text-yellow-400 text-xs px-2 py-0.5 rounded-full">
                                            Langganan
                                        </span>
                                    )}
                                </div>
                                <p className="text-white/60 text-sm">{item.email}</p>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-teal-400 font-bold text-lg">
                                {item.transaksi}
                            </p>
                            <p className="text-white/50 text-sm">transaksi</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}