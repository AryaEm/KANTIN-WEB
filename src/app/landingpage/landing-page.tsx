'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/ui/navbar';
import {
    ShoppingBag,
    Clock,
    CreditCard,
    Store,
    Sparkles,
    ArrowRight,
    Zap,
    Star,
} from 'lucide-react';

type Feature = {
    icon: React.ElementType;
    title: string;
    description: string;
};

const features: Feature[] = [
    {
        icon: Store,
        title: 'Pilihan Stan',
        description: 'Jelajahi berbagai stan makanan dan minuman di kantin sekolah',
    },
    {
        icon: ShoppingBag,
        title: 'Pesan Mudah',
        description: 'Pesan makanan favoritmu dengan mudah tanpa antri panjang',
    },
    {
        icon: Clock,
        title: 'Realtime Status',
        description: 'Pantau status pesananmu secara realtime dari handphone',
    },
    {
        icon: CreditCard,
        title: 'Diskon Menarik',
        description: 'Nikmati berbagai promo dan diskon menarik setiap hari',
    },
];

export default function Page() {
    return (
        <>
            <style jsx global>{`
               
            `}</style>

            <Navbar />

            <section className="relative min-h-screen bg-white overflow-hidden pt-28 pb-20 px-6">

                <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-yellow-300 blob-shape opacity-20 animate-blob"></div>
                <div className="lg:block lg:absolute hidden bottom-32 left-[5%] w-[400px] h-[400px] bg-orange-400 blob-shape opacity-15 animate-blob" style={{ animationDelay: '2s' }}></div>
                <div className="lg:absolute lg:block hidden bottom-24 right-[10%] w-[400px] h-[400px] bg-yellow-400 blob-shape opacity-10 animate-blob" style={{ animationDelay: '4s' }}></div>

                <div className="absolute top-40 left-[30%] text-orange-400 opacity-30 animate-float">
                    <Zap size={40} />
                </div>
                <div className="absolute bottom-40 right-20 text-yellow-500 opacity-30 animate-float" style={{ animationDelay: '1s' }}>
                    <Star size={35} />
                </div>

                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8 opacity-0 animate-slide-up">
                            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 border-2 border-orange-300">
                                <Sparkles className="w-5 h-5 text-orange-500" />
                                <span className="text-sm font-bold text-orange-600 tracking-wide">
                                    #1 PLATFORM KANTIN DIGITAL
                                </span>
                            </div>

                            <h1 className="text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-[0.95] tracking-normal Lato">
                                <span className="text-gray-900">Pesan</span>
                                <br />
                                <span className="text-gray-900">Makanan</span>
                                <br />
                                <span className="relative inline-block">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-400">
                                        Tanpa Ribet!
                                    </span>
                                    <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                                        <path d="M2 10C50 5 100 2 150 5C200 8 250 4 298 7" stroke="url(#gradient)" strokeWidth="4" strokeLinecap="round" />
                                        <defs>
                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#f97316" />
                                                <stop offset="50%" stopColor="#eab308" />
                                                <stop offset="100%" stopColor="#f97316" />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                                Platform kantin digital yang memudahkan siswa memesan makanan dan membantu penjual mengelola pesanan dengan efisien.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/auth?mode=register">
                                    <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-300">
                                        <span className="relative z-10 flex items-center gap-2">
                                            Mulai Sekarang
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </button>
                                </Link>

                                <Link href="/auth">
                                    <button className="px-8 py-4 bg-white border border-black/10 text-black/80 hover:text-black font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-50">
                                        Sudah Punya Akun
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="relative opacity-0 animate-slide-up stagger-2 hidden lg:block">
                            <div className="relative w-full aspect-square">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-300 opacity-90 animate-float">
                                    <Image src="/Preview3.svg" alt='Preview' fill className='object-cover rounded-full border border-orange-500/20' />
                                </div>

                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-2xl bg-white shadow-2xl flex items-center justify-center transform rotate-12 animate-float" style={{ animationDelay: '0.5s' }}>
                                    <ShoppingBag className="w-12 h-12 text-orange-500" />
                                </div>

                                <div className="absolute bottom-10 left-20 w-20 h-20 rounded-2xl bg-white shadow-2xl flex items-center justify-center transform -rotate-12 animate-float" style={{ animationDelay: '1s' }}>
                                    <Clock className="w-10 h-10 text-yellow-600" />
                                </div>

                                <div className="absolute top-1/3 right-0 w-20 h-20 rounded-2xl bg-white shadow-2xl flex items-center justify-center transform rotate-6 animate-float" style={{ animationDelay: '1.5s' }}>
                                    <Store className="w-10 h-10 text-orange-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-28 px-6 bg-orange-50 overflow-hidden">
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="text-center mb-20 opacity-0 animate-slide-up">
                        <div className="inline-block mb-4">
                            <span className="Fredoka text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-600 to-yellow-500 bg-clip-text text-transparent">
                                Kenapa KantinIn?
                            </span>
                        </div>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Solusi lengkap untuk manajemen kantin sekolah yang modern dan efisien
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className={`group relative opacity-0 animate-slide-up stagger-${i + 1}`}
                            >
                                <div className="relative h-full p-8 bg-white rounded-3xl border-3 border-gray-900 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-400 flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                                        <feature.icon className="w-8 h-8 text-white" />
                                    </div>

                                    <h3 className="Fredoka text-2xl font-bold text-gray-900 mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-3xl"></div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </section>

            <section className="relative py-28 px-6 bg-white overflow-hidden">
                <div className="container mx-auto max-w-5xl relative z-10">
                    <div className="relative p-12 lg:p-16 bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 rounded-[3rem] shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl"></div>
                        </div>

                        <div className="relative text-center space-y-8">
                            <div className="inline-block">
                                <h2 className="Fredoka text-5xl lg:text-6xl font-bold text-white mb-4">
                                    Siap untuk Mencoba?
                                </h2>
                                <div className="h-2 w-32 mx-auto bg-white rounded-full"></div>
                            </div>

                            <p className="text-xl text-white/95 max-w-2xl mx-auto font-medium">
                                Bergabung sekarang dan nikmati kemudahan memesan makanan di kantin sekolah
                            </p>

                            <Link href="/auth?mode=register">
                                <button className="group px-10 py-5 bg-white text-orange-600 font-bold text-xl rounded-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl mt-4">
                                    <span className="flex items-center gap-2">
                                        Daftar Gratis Sekarang
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-6 px-6 border-t border-black/10">
                <div className="container mx-auto text-center">
                    <p className="text-gray-600 font-medium">
                        © 2026 KantinIn. Dev by{' '}
                        <Link
                            href={'https://aryaem.vercel.app'}
                            target='_blank'
                            className='text-orange-600 font-bold hover:text-orange-700 transition-colors'
                        >
                            Aryaem
                        </Link>
                        .
                    </p>
                </div>
            </footer>
        </>
    );
}