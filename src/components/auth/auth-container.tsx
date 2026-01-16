'use client';

import AuthTabs from './auth-tabs';
import LoginForm from './login-form';
import RegisterSelector from './register-selector';
import { ChefHat, ChevronLeft } from 'lucide-react';
import Link from 'next/link';


export default function AuthContainer({ mode }: { mode: string }) {
    return (
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#10171A] p-8 backdrop-blur form-shadow">


            <Link href={'/'} className="flex text-white/60 absolute -top-10 left-0 font-medium"><ChevronLeft /> Kembali ke beranda  </Link>

            <div className="mb-6 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-teal-300">
                    <ChefHat className='text-white' />
                </div>
            </div>

            <h1 className="text-center text-3xl font-bold text-white">
                {mode === 'login' ? 'Selamat Datang' : 'Buat Akun'}
            </h1>
            <p className="mb-6 text-center   text-sm text-white/60">
                {mode === 'login'
                    ? 'Masuk ke akun KantinPlus Anda'
                    : 'Daftar untuk mulai menggunakan KantinPlus'}
            </p>

            <AuthTabs mode={mode} />

            {mode === 'login' ? <LoginForm /> : <RegisterSelector />}
        </div>
    );
}
