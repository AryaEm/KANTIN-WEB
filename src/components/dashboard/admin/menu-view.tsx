import { Plus, SquarePen, Tag, Trash2, UtensilsCrossed } from "lucide-react";

type MenuItem = {
    id: number;
    name: string;
    category: "makanan" | "minuman";
    price: number;
    status: "tersedia" | "habis";
};

export default function MenuView() {
    const menus: MenuItem[] = [
        {
            id: 1,
            name: "Nasi Goreng Spesial",
            category: "makanan",
            price: 15000,
            status: "tersedia",
        },
        {
            id: 2,
            name: "Mie Ayam Bakso",
            category: "makanan",
            price: 12000,
            status: "tersedia",
        },
        {
            id: 3,
            name: "Es Teh Manis",
            category: "minuman",
            price: 4000,
            status: "tersedia",
        },
    ];

    const statusStyle = (status: MenuItem["status"]) => {
        return status === "tersedia"
            ? "bg-emerald-500/20 text-emerald-400"
            : "bg-red-500/20 text-red-400";
    };

    return (
        <div className="space-y-8 Poppins">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-medium text-white">Daftar Menu</h1>

                <button className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-black px-5 py-2.5 rounded-xl font-medium outline-none">
                    <Plus size={20} /> Tambah Menu
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menus.map((menu) => (
                    <div
                        key={menu.id}
                        className="card-bg rounded-2xl overflow-hidden shadow-lg border border-white/15 hover:shadow hover:shadow-teal-300/20 transition-all duration-300 hover:scale-105"
                    >
                        <div className="h-40 bg-gradient-to-br from-teal-900 to-slate-900 flex items-center justify-center">
                            <UtensilsCrossed className="text-teal-400" size={48} />
                        </div>

                        <div className="p-5 space-y-3">
                            <div className="flex justify-between items-start pb-2">
                                <div>
                                    <h2 className="text-lg font-semibold text-white">
                                        {menu.name}
                                    </h2>
                                    <p className="text-sm text-gray-400">{menu.category}</p>
                                </div>

                                <span
                                    className={`px-3 py-1 rounded-full text-sm ${statusStyle(
                                        menu.status
                                    )}`}
                                >
                                    {menu.status}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <p className="text-xl font-bold text-teal-400">
                                    Rp {menu.price.toLocaleString("id-ID")}
                                </p>

                                <div className="flex gap-4 pt-2">
                                    <button className="text-white hover:text-teal-400 outline-none  ">
                                        <SquarePen size={18} />
                                    </button>
                                    <button className="text-white hover:text-teal-400 outline-none  ">
                                        <Tag size={18} />
                                    </button>
                                    <button className="text-red-500 hover:text-red-600 outline-none ">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
