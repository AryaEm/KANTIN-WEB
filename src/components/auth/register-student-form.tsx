export default function RegisterStudentForm() {
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
                <label className="text-xs text-white font-medium Poppins">Nama Lengkap</label>
                <input
                    className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                    placeholder="Asepxx"
                />
            </div>

            <div>
                <label className="text-xs text-white font-medium Poppins">Telp</label>
                <input
                    className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                    placeholder="08xx"
                />
            </div>

            <button className="mt-2 w-full rounded-lg bg-teal-500 py-2 font-medium text-black">
                Daftar sebagai Siswa
            </button>
        </form>
    );
}
