'use client';

// import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { removeCookie } from "@/lib/client-cookie"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChefHat, LogOut, LogOutIcon, LucideLogOut } from 'lucide-react';

export function AdminNavbar() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const token = getCookie("token");
  //   setIsLoggedIn(!!token);
  // }, []);

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

    // setIsLoggedIn(false);

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

        <div className="flex items-center gap-3">
          <Button onClick={handleLogout} variant="glass" size="sm" className='rounded-md text-red-500 hover:bg-red-500 hover:text-slate-950 px-6 outline-none border border-red-500/50 flex items-center leading-none'>
            <LogOut size={18} className=''/> Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}

