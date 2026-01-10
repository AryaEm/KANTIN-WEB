export default function RegisterAdminForm() {
    return (
        <form className="space-y-3 Poppins">
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs text-white font-medium Poppins">Username</label>
                    <input
                        className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                        placeholder="Username"
                    />
                </div>

                <div>
                    <label className="text-xs text-white font-medium Poppins">Password</label>
                    <input
                        type="password"
                        className="mt-1 w-full rounded-lg bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                        placeholder="Password"
                    />
                </div>
            </div>

            <div>
                <label className="text-xs text-white font-medium Poppins">Nama Pemilik</label>
                <input
                    className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                    placeholder="Asepxx"
                />
            </div>

            <div>
                <label className="text-xs text-white font-medium Poppins">Nama Stan</label>
                <input
                    className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                    placeholder="Kantin Pakxx"
                />
            </div>

            <div>
                <label className="text-xs text-white font-medium Poppins">Telp</label>
                <input
                    className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                    placeholder="08xx"
                />
            </div>

            <button className="w-full rounded-lg bg-teal-500 py-2 font-medium text-black">
                Daftar sebagai Admin Stan
            </button>
        </form>
    );
}
