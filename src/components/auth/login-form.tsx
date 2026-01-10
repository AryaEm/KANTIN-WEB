import Link from "next/link";

export default function LoginForm() {
    return (
        <form className="space-y-4">
            <div>
                <label className="text-xs text-white font-medium Poppins">Username</label>
                <input
                    className="mt-1 w-full rounded-lg bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                    placeholder="Masukkan username"
                />
            </div>

            <div>
                <label className="text-xs text-white font-medium Poppins">Password</label>
                <input
                    type="password"
                    className="mt-1 w-full rounded-lg bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                    placeholder="Masukkan password"
                />
            </div>

            <Link href={'/dashboard/siswa'}>
                <button className="mt-4 w-full rounded-lg bg-teal-500 py-2 font-medium text-black">
                    Login
                </button>
            </Link>
        </form>
    );
}