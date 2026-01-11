"use client"

import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BASE_API_URL } from "../../../global";
import CustomToast from "@/components/ui/CustomToast";
import { storeCookie } from "@/lib/client-cookie";

export default function RegisterAdminForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
        nama_pemilik: "",
        nama_stan: "",
        telp: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const { data } = await axios.post(
                `${BASE_API_URL}/user/register-admin`,
                form,
                {
                    headers: { "Content-Type": "application/json" },
                }
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
            storeCookie("role", data.user.role);
            storeCookie("username", data.user.username);
            storeCookie("nama_stan", data.stan.nama_stan);
            storeCookie("nama_pemilik", data.stan.nama_pemilik);

            toast(
                <CustomToast type="success" message="Login berhasil" />,
                {
                    containerId: "toastRegisterStan",
                    // className: "p-0 bg-slate-800 shadow-none",
                    icon: false,
                    autoClose: 2000,
                }
            );

            setTimeout(() => {
                router.replace("/dashboard/admin");
            }, 1000);

        } catch (err: unknown) {
            let message = "Terjadi kesalahan server";

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
        <form onSubmit={handleSubmit} className="space-y-3 Poppins">
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs text-white font-medium Poppins">Username</label>
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80 text-sm"
                        placeholder="Username"
                        required
                    />
                </div>

                <div>
                    <label className="text-xs text-white font-medium Poppins">Password</label>
                    <input
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg bg-input border border-white/15 px-4 py-2 outline-none text-white/80 text-sm"
                        placeholder="Password"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="text-xs text-white font-medium Poppins">Nama Pemilik</label>
                <input
                    name="nama_pemilik"
                    value={form.nama_pemilik}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80 text-sm"
                    placeholder="Asepxx"
                    required
                />
            </div>

            <div>
                <label className="text-xs text-white font-medium Poppins">Nama Stan</label>
                <input
                    name="nama_stan"
                    value={form.nama_stan}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80 text-sm"
                    placeholder="Kantin Pakxx"
                    required
                />
            </div>

            <div>
                <label className="text-xs text-white font-medium Poppins">Telp</label>
                <input
                    name="telp"
                    value={form.telp}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80 text-sm"
                    placeholder="08xx"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-teal-500 hover:bg-teal-400 transition-all py-2 font-medium text-black text-sm">
                {loading ? "Mendaftarkan..." : "Daftar sebagai Admin Stan"}
            </button>
        </form>
    );
}
