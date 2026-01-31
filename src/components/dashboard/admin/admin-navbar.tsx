'use client';

import { useRouter } from 'next/navigation';
import { removeCookie } from "@/lib/client-cookie"
import Link from 'next/link';
import { ChefHat, LogOut, User } from 'lucide-react';

export function AdminNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    removeCookie("token")
    removeCookie("id")
    removeCookie("username")
    removeCookie("nama_pemilik")
    removeCookie("nama_siswa")
    removeCookie("nama_stan")
    removeCookie("role")
    removeCookie("telp")
    removeCookie("alamat")
    removeCookie("jenis_kelamin")
    removeCookie("foto")
    removeCookie("cart")
    removeCookie("user")

    router.replace("/");
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-orange-200 bg-white/10 backdrop-blur shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 max-w-6xl">

          <Link href="/" className="flex items-center gap-2 font-bold group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 group-hover:scale-110 transition-transform">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-display bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">KantinPlus</span>
          </Link>

          <div className='flex gap-3'>
            <div className="flex items-center gap-3">
              <Link href={'/dashboard/admin/profil'}>
                <button className='px-4 py-2 bg-gray-100 hover:bg-orange-100 border-2 border-gray-200 hover:border-orange-300 text-gray-700 hover:text-orange-600 font-semibold rounded-xl transition-all flex items-center gap-2'>
                  <User size={18} /> Profil
                </button>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className='p-2.5 bg-red-50 hover:bg-red-100 border-2 border-red-200 hover:border-red-300 text-red-600 rounded-xl transition-all'
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}