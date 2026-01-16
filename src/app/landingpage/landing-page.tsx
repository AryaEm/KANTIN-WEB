'use client';

import Link from 'next/link';
// import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/ui/navbar';
import {
    // UtensilsCrossed,
    ShoppingBag,
    Clock,
    CreditCard,
    Store,
    Sparkles,
    ArrowRight,
} from 'lucide-react';
// import gprek from "../../../public/geprek.webp"
// import esjeruk from "../../../public/esjeruk.jpg"

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
            <Navbar />
            <section className="pt-48 pb-20 px-4 grid-bg min-h-dvh overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center animate-fade-in relative">

                        {/* <div className="absolute z-10 -bottom-48 -left-40 h-80 w-60">
                            <Image src={gprek} alt='Geprek' className='h-80 w-80 object-cover rounded-lg  shadow-3d border border-teal-400' />
                        </div>
                        <div className="absolute z-10 -bottom-72 -left-24 h-44 w-72">
                            <Image src={esjeruk} alt='esjruk' className='h-full w-full object-cover rounded-lg shadow-3d border border-teal-400' />
                        </div> */}

                        <div className="bg-teal-300/65 h-52 w-52 rounded-full absolute -top-52 -left-40 blur-3xl"></div>
                        <div className="bg-teal-300/90 h-32 w-32 rounded-full absolute -bottom-20 left-[70rem] blur-3xl hidden lg:block"></div>

                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 bg-teal-300/10 border border-teal-300 bg-opacity-70">
                            <Sparkles className="w-4 h-4 text-primary text-white" />
                            <span className="text-sm text-muted-foreground text-white text-opacity-80">
                                Platform Kantin Digital #1
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight text-white">
                            Pesan Makanan
                            <br />
                            <span className="gradient-text text-teal-400">Tanpa Ribet</span>
                        </h1>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 text-white/60">
                            KantinPlus adalah aplikasi kantin digital yang memudahkan siswa
                            memesan makanan dan membantu penjual mengelola pesanan dengan
                            efisien.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:mx-0 mx-12">
                            <Link href="/auth?mode=register">
                                <Button variant="hero" size="xl" className="w-full sm:w-auto bg-teal-300">
                                    Mulai Sekarang
                                    <ArrowRight className="w-5 h-5" />
                                </Button>
                            </Link>

                            <Link href="/auth">
                                <Button variant="glass" size="xl" className="w-full sm:w-auto text-teal-300">
                                    Sudah Punya Akun
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 pb-28 px-4 grid-bg overflow-hidden">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
                            Kenapa <span className="text-teal-300">KantinPlus</span>?
                        </h2>
                        <p className="text-muted-foreground max-w-xl mx-auto text-white/60">
                            Solusi lengkap untuk manajemen kantin sekolah yang modern dan
                            efisien
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 ">
                        {features.map((feature, i) => (
                            <div
                                key={i}
                                className="rounded-xl p-6 py-8 text-center group bg-white/5 border-white/15 hover:border-teal-400 cursor-pointer border hover:scale-105 backdrop-blur transition-all duration-300 lg:mx-0 mx-5"
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className="w-14 h-14 rounded-xl to-cyan-400/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="w-7 h-7 text-primary text-teal-300" />
                                </div>
                                <h3 className="font-display font-semibold mb-2 text-white">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-white/60">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 pb-28 px-4 grid-bg overflow-hidden relative">
                <div className="container mx-auto max-w-6xl border glass-card rounded-lg flex justify-center items-center relative">

                    <div className="text-center my-20 ">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
                            Siap untuk <span className="text-teal-300">Mencoba</span>?
                        </h2>
                        <p className="text-muted-foreground max-w-md mx-auto text-white/60">
                            Bergabung sekarang dan nikmati kemudahan brmemesan makanan di kantin sekolah
                        </p>
                        <Link href="/auth   ">
                            <Button variant="teal" size="xl" className="lg:w-full w-1/2 sm:w-auto mt-6 text-teal-300">
                                Daftar Gratis
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="pb-8 px-4 grid-bg overflow-hidden">
                <div className="container mx-auto text-center text-sm text-muted-foreground text-white/60">
                    © 2026 KantinKu. Dev by <Link href={'https://aryaem.vercel.app'} target='_blank' className='text-teal-300'>Aryaem</Link>.
                </div>
            </footer>
        </>
    );
}