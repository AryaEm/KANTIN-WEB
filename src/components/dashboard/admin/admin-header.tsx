"use client";

import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookie";
import { Sparkles } from "lucide-react";

export default function AdminHeader() {
  const [namaPemilik, setNamaPemilik] = useState<string | null>(null);
  const [namaStan, setNamaStan] = useState<string | null>(null);

  useEffect(() => {
    setNamaPemilik(getCookie("nama_pemilik"));
    setNamaStan(getCookie("nama_stan"));
  }, []);

  if (!namaPemilik) return null;

  return (
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-300 mb-4">
        <Sparkles className="w-4 h-4 text-orange-500" />
        <span className="text-sm font-bold text-orange-600 tracking-wide">
          ADMIN DASHBOARD
        </span>
      </div>
      
      <h1 className="text-4xl lg:text-5xl Fredoka font-bold text-gray-900 mb-3 leading-tight">
        Selamat Datang,{" "}
        <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
          {namaPemilik}
        </span>
        !
      </h1>
      
      <p className="text-lg text-black/60 font-medium">
        {namaStan ? `Kelola ${namaStan} dengan mudah` : "Kelola pesanan dan menu stan Anda"}
      </p>
    </div>
  );
}