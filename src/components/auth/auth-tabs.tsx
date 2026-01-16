'use client';

import Link from 'next/link';

export default function AuthTabs({ mode }: { mode: string }) {
  return (
    <div className="mb-6 flex rounded-xl bg-[#1C2327] p-1 border border-white/15">
      <Link
        href="/auth"
        className={`flex-1 rounded-lg py-2 text-center text-sm transition
          ${mode === 'login' ? 'bg-teal-500 text-black' : 'text-white/60'}`}
      >
        Login
      </Link>
      <Link
        href="/auth?mode=register"
        className={`flex-1 rounded-lg py-2 text-center text-sm transition
          ${mode === 'register' ? 'bg-teal-500 text-black' : 'text-white/60'}`}
      >
        Register
      </Link>
    </div>
  );
}
