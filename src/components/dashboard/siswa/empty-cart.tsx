import { ShoppingCart } from "lucide-react";

export default function EmptyCart() {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-20 text-center shadow-xl Poppins">
            <div className="text-5xl mb-4 flex justify-center">
                <ShoppingCart size={60} className="text-white/70" />
            </div>
            <h3 className="text-3xl font-semibold text-white">Keranjang Kosong</h3>
            <p className="text-white/50 mt-2 tracking-wide">
                Pilih menu dari stan untuk mulai memesan
            </p>
        </div>
    );
}
