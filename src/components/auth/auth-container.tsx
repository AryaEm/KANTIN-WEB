'use client';

import LoginForm from './login-form';
import RegisterSelector from './register-selector';
import { ChefHat, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function AuthContainer({ mode }: { mode: string }) {
    return (
        <>
            <div className="min-h-screen auth-background relative flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

                <Link
                    href={'/'}
                    className="absolute top-6 left-2 flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors z-50 group px-4"
                >
                    <ChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Kembali
                </Link>

                <div className="relative z-10 w-full max-w-xl ml-8 lg:ml-20 xl:ml-36 px-6 lg:px-0">
                    <div className="bg-gray-900/40 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 shadow-2xl border border-white/10 animate-fade-in-left relative">


                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500">
                                    <ChefHat className='text-white' size={24} />
                                </div>
                                <h2 className="font-display text-2xl font-bold text-white">KantinIn</h2>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-3">
                                {mode === 'login' ? 'Welcome Back!' : 'Create New Account'}
                            </h1>
                            <p className="text-white/70">
                                {mode === 'login' ? (
                                    <>
                                        Already have an account?{' '}
                                        <Link href="/auth?mode=register" className="text-orange-400 hover:text-orange-300 font-semibold">
                                            Register
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        Already have an account?{' '}
                                        <Link href="/auth" className="text-orange-400 hover:text-orange-300 font-semibold">
                                            Login
                                        </Link>
                                    </>
                                )}
                            </p>
                        </div>


                        {mode === 'login' ? <LoginForm /> : <RegisterSelector />}


                    </div>
                </div>

                <div className="hidden xl:block absolute right-20 bottom-20 text-white max-w-md">
                    <h3 className="font-display text-3xl font-bold mb-2">
                        Pesan Makanan <span className="text-yellow-400">Tanpa Ribet</span>
                    </h3>
                    <p className="text-white/80 text-lg">
                        Platform kantin digital terbaik!
                    </p>
                </div>
            </div>
        </>
    );
}