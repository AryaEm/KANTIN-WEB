"use client";

import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookie";

export default function AdminHeader() {
  const [namaPemilik, setNamaPemilik] = useState<string | null>(null);

  useEffect(() => {
    setNamaPemilik(getCookie("nama_pemilik"));
  }, []);

  if (!namaPemilik) return null;

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-white mb-2">
        Dashboard <span className="text-teal-400">{namaPemilik}</span>.
      </h1>
      <p className="text-sm text-slate-400">
        Kelola pesanan dan menu stan Anda
      </p>
    </div>
  );
}