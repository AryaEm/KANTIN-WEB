"use client";

import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookie";

export default function SiswaHeader() {
  const [namaSiswa, setNamaSiswa] = useState<string | null>(null);

  useEffect(() => {
    setNamaSiswa(getCookie("nama_siswa"));
  }, []);

  if (!namaSiswa) return null;

  return (
    <div className="mb-6">
      <h1 className="text-4xl font-bold text-white mb-2">
        Dashboard <span className="text-teal-400">{namaSiswa}</span>.
      </h1>
      <p className="text-sm text-slate-400">
        Selamat datang, Joko!
      </p>
    </div>
  );
}
