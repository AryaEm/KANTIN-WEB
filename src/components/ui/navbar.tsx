'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChefHat } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/15 bg-[#0B1113] bg-opacity-5 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 max-w-6xl">

        <Link href="/" className="flex items-center gap-2 font-bold">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-yellow-400">
            <ChefHat className="h-10 rounded-md w-12 p-2 bg-orange-400 text-primary-foreground text-white" />
          </div>
          <span className="text-lg text-orange-400">KantinIn</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link href="/auth">
            <Button variant="glass" size="sm" className='text-orange-500 hover:bg-orange-500 hover:text-white px-6 border border-black/15'>
              Login
            </Button>
          </Link>
          <Link href="/auth?mode=register">
            <Button size="sm" className='text-white bg-orange-500 px-6 hover:scale-105 transition-all duration-300'>Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

