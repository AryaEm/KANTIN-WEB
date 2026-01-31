'use client';

import { useRouter } from 'next/navigation';
import { removeCookie } from "@/lib/client-cookie"
import Link from 'next/link';
import { ChefHat, LogOut, User } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function AdminNavbar() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="fixed top-0 z-20 w-full border-b border-orange-200 bg-white/10 backdrop-blur shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 max-w-6xl">

          <Link href="/" className="flex items-center gap-2 font-bold group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 group-hover:scale-110 transition-transform">
              <ChefHat className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-display bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">KantinIn</span>
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 hover:scale-110 transition-transform shadow-md"
            >
              <User className="h-5 w-5 text-white" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <Link 
                  href="/dashboard/admin/profil"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50 transition-colors text-gray-700 hover:text-orange-600"
                >
                  <User size={18} />
                  <span className="font-medium">Profil</span>
                </Link>
                
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 w-full text-left border-t border-gray-100"
                >
                  <LogOut size={18} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}