"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { storeCookie } from "@/lib/client-cookie"
import { BASE_API_URL } from "../../../global"
import { Eye, EyeOff, User, Lock } from "lucide-react";
import CustomToast from "@/components/ui/CustomToast";
import { toast } from "react-toastify"

interface LoginResponse {
    status: boolean;
    message: string;
    token: string;
    data: {
        id: string;
        username: string;
        role: "admin_stan" | "siswa";
        siswa?: {
            nama_siswa: string;
            telp: string
            jenis_kelamin: "laki_laki" | "perempuan"
            foto: string;
        };
        stan?: {
            nama_pemilik: string;
            nama_stan: string;
            telp: string
            foto: string;
        };
    };
}

export default function LoginForm() {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const router = useRouter()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axios.post<LoginResponse>(
                `${BASE_API_URL}/user/login`,
                { username, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (!data.status) {
                toast(
                    <CustomToast type="warning" message={data.message} />,
                    {
                        containerId: "toastLogin",
                        className:
                            "bg-slate-400 rounded-xl shadow-lg",
                        icon: false,
                    }
                );
                return;
            }

            storeCookie("token", data.token);
            storeCookie("id", data.data.id);
            storeCookie("username", data.data.username);
            storeCookie("role", data.data.role);

            if (data.data.siswa) {
                storeCookie("nama_siswa", data.data.siswa.nama_siswa);
                storeCookie("foto", data.data.siswa.foto);
            }

            if (data.data.stan) {
                storeCookie("nama_pemilik", data.data.stan.nama_pemilik);
                storeCookie("nama_stan", data.data.stan.nama_stan);
                storeCookie("foto", data.data.stan.foto);
            }

            toast(
                <CustomToast type="success" message="Login berhasil" />,
                {
                    containerId: "toastLogin",
                    className: "p-0 bg-transparent shadow-none",
                    icon: false,
                    autoClose: 1500,
                }
            );

            setTimeout(() => {
                if (data.data.role === "admin_stan") {
                    router.replace("/dashboard/admin");
                } else {
                    router.replace("/dashboard/siswa");
                }
            }, 300);

        } catch (err: unknown) {
            let message = "server error"

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.message ?? err.message;
            }

            toast(
                <CustomToast
                    type="error"
                    message={message}
                />,
                {
                    containerId: "toastLogin",
                    className:
                        "bg-red-400 border border-white/10 rounded-xl shadow-xl",
                    icon: false,
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        <User size={20} />
                    </div>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/20 pl-12 pr-4 py-3.5 outline-none text-white placeholder:text-white/40 focus:border-orange-400 focus:bg-white/15 transition-all"
                        placeholder="Username"
                    />
                </div>
            </div>

            <div>
                <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                        <Lock size={20} />
                    </div>
                    <input
                        type={showPassword ? `text` : `password`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl bg-white/10 border border-white/20 pl-12 pr-14 py-3.5 outline-none text-white placeholder:text-white/40 focus:border-orange-400 focus:bg-white/15 transition-all"
                        placeholder="Password"
                    />
                    <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? (
                            <EyeOff className="w-5 h-5 text-white/60" />
                        ) : (
                            <Eye className="w-5 h-5 text-white/60" />
                        )}
                    </button>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 py-4 font-bold text-white text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Loading..." : "Login"}
            </button>
        </form>
    );
}