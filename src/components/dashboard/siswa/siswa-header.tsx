"use client";

import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookie";
import { Sparkles, ShoppingBag, Clock, TrendingUp, History, DollarSign } from "lucide-react";

export default function SiswaHeader() {
  const [namaSiswa, setNamaSiswa] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNamaSiswa(getCookie("nama_siswa"));
  }, []);

  if (!mounted || !namaSiswa) return null;

  return (
    <div className="mb-8 relative">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-300 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>

      <div className="relative bg-gradient-to-br from-white via-orange-50/50 to-yellow-50/50 rounded-3xl border-2 border-orange-200 shadow-xl p-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white mb-6 shadow-lg animate-bounce-slow">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span className="text-xs font-bold tracking-wider">
              STUDENT DASHBOARD
            </span>
          </div>

          <div className="mb-6">
            <h1 className="text-5xl lg:text-6xl Fredoka font-black mb-3 leading-tight">
              <span className="text-gray-900">Halo, </span>
              <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent animate-gradient">
                {namaSiswa}
              </span>
              <span className="inline-block animate-wave ml-2">👋</span>
            </h1>

            <p className="text-xl text-gray-600 font-semibold max-w-2xl">
              Siap memesan makanan lezat hari ini? Jelajahi stan favorit dan nikmati hidangan terbaik! 🍜✨
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 opacity-10">
          <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" stroke="#F97316" strokeWidth="2" />
            <circle cx="100" cy="100" r="60" stroke="#EAB308" strokeWidth="2" />
            <circle cx="100" cy="100" r="40" stroke="#F97316" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}