"use client"

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { storeCookie } from "@/lib/client-cookie"
import { BASE_API_URL } from "../../../global"
import { Eye, EyeOff } from "lucide-react";
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
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-xs text-white font-medium Poppins">Username</label>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 w-full rounded-lg bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                    placeholder="Masukkan username"
                />
            </div>

            <div className="relative flex justify-between items-end gap-2">
                <div className="w-full">
                    <label className="text-xs text-white font-medium Poppins">Password</label>
                    <input
                        type={showPassword ? `text` : `password`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full rounded-lg bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                        placeholder="Masukkan password"
                    />
                </div>
                <div className="cursor-pointer bg-input p-3 flex rounded-lg items-center border border-white/15 justify-center h-10 w-10" onClick={() => setShowPassword(!showPassword)}>
                    {
                        showPassword ?
                            <EyeOff className="text-xl text-zinc-200" /> :
                            <Eye className="text-xl text-zinc-200" />
                    }
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full rounded-lg bg-teal-500 py-2 font-medium text-black">
                {loading ? "Loading..." : "Login"}
            </button>


        </form>
    );
}