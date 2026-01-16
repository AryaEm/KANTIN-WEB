'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChefHat } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0B1113] bg-opacity-50 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 max-w-6xl">

        <Link href="/" className="flex items-center gap-px font-bold">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-cyan-400">
            <ChefHat className="h-5 w-5 text-primary-foreground text-teal-300" />
          </div>
          <span className="text-lg text-teal-300">KantinPlus</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/auth">
            <Button variant="glass" size="sm" className='text-teal-300 hover:bg-teal-300 hover:text-slate-950 px-6'>
              Login
            </Button>
          </Link>
          <Link href="/auth?mode=register">
            <Button size="sm" className='text-slate-950 bg-teal-300/80 px-6 hover:scale-105 transition-all duration-300'>Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

