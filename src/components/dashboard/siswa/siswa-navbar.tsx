'use client';

import { useRouter } from 'next/navigation';
import { removeCookie } from "@/lib/client-cookie"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChefHat, User, LogOut } from 'lucide-react';

export function StudentNavbar() {
  const router = useRouter();

  const handleLogout = () => {
    removeCookie("token")
    removeCookie("id")
    removeCookie("username")
    removeCookie("nama_siswa")
    removeCookie("nama_pemilik")
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
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0B1113] bg-opacity-50 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-6xl">

        <Link href="/" className="flex items-center gap-px font-bold">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-400">
            <ChefHat className="h-5 w-5 text-primary-foreground text-teal-300" />
          </div>
          <span className="text-lg text-teal-300">KantinPlus</span>
        </Link>

        <div className='flex gap-3'>
          <div className="flex items-center gap-3">
            <Link href={'/dashboard/siswa/profil'}> 
              <Button variant="glass" size="sm" className='rounded-md text-white/70 hover:bg-teal-400 hover:text-slate-950 px-6 outline-none border border-white/50 flex items-center leading-none'>
                <User size={18} className='' /> Profil
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleLogout} size="sm" className='rounded-md text-red-500 hover:bg-red-500/20 p-3 outline-none flex items-center leading-none'>
                <LogOut size={18}/>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}