import { ShoppingCart, ArrowRight, Sparkles } from "lucide-react";

export default function EmptyCart() {
    return (
        <div className="relative bg-gradient-to-br from-white via-orange-50/30 to-yellow-50/30 rounded-3xl border-2 border-gray-200 p-16 text-center shadow-lg overflow-hidden">
            <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-300 rounded-full opacity-10 blur-3xl"></div>

            <div className="absolute inset-0 opacity-5">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="cart-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <circle cx="15" cy="15" r="1" fill="#F97316"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#cart-grid)"/>
                </svg>
            </div>

            <div className="relative z-10">
                <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                    
                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center shadow-2xl">
                        <ShoppingCart className="w-16 h-16 text-white" strokeWidth={2.5} />
                        
                        <div className="absolute -top-2 -right-2 animate-bounce">
                            <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        </div>
                    </div>

                    <div className="absolute inset-0 border-4 border-orange-300 rounded-full animate-ping opacity-20"></div>
                    <div className="absolute inset-0 border-4 border-yellow-300 rounded-full animate-ping opacity-20" style={{animationDelay: '0.5s'}}></div>
                </div>

                <div className="mb-8">
                    <h3 className="text-4xl Fredoka font-black text-gray-900 mb-3">
                        Keranjang Masih Kosong
                    </h3>
                    <p className="text-lg text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
                        Yuk, mulai belanja! Pilih menu favorit dari stan dan tambahkan ke keranjang 🛒✨
                    </p>
                </div>

                <div className="mt-12 flex justify-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-bounce" style={{animationDelay: '0.4s'}}></div>
                </div>
            </div>

        </div>
    );
}