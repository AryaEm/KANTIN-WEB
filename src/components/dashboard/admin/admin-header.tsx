"use client";

import { getCookie } from "@/lib/client-cookie";

export default function AdminHeader() {
  const nama_pemilik = getCookie("nama_pemilik");

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-white mb-2">
        Dashboard <span className="text-teal-400">{nama_pemilik}</span>
      </h1>
      <p className="text-sm text-slate-400">
        Kelola pesanan dan menu stan Anda
      </p>
    </div>
  );
}