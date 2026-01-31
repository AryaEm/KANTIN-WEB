"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { BASE_API_URL } from "../../../global";
import CustomToast from "@/components/ui/CustomToast";
import { storeCookie } from "@/lib/client-cookie";

export default function RegisterStudentForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
        nama_siswa: "",
        alamat: "",
        telp: "",
        jenis_kelamin: "laki_laki",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
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
                `${BASE_API_URL}/user/register-siswa`,
                form,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (!data.status) {
                toast(
                    <CustomToast type="warning" message={data.message} />,
                    { containerId: "toastLogin" }
                );
                return;
            }

            storeCookie("token", data.token);
            storeCookie("role", data.user.role);
            storeCookie("username", data.user.username);
            storeCookie("nama_siswa", data.siswa.nama_siswa);

            toast(
                <CustomToast type="success" message="Register siswa berhasil" />,
                {
                    containerId: "toastRegisterStan",
                    autoClose: 2000,
                }
            );

            setTimeout(() => {
                router.replace("/dashboard/siswa");
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
                { containerId: "toastLogin" }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none text-white placeholder:text-white/40 focus:border-orange-400 focus:bg-white/15 transition-all text-sm"
                        placeholder="Username"
                        required
                    />
                </div>

                <div>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none text-white placeholder:text-white/40 focus:border-orange-400 focus:bg-white/15 transition-all text-sm"
                        placeholder="Password"
                        required
                    />
                </div>
            </div>

            <div>
                <input
                    name="nama_siswa"
                    value={form.nama_siswa}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none text-white placeholder:text-white/40 focus:border-orange-400 focus:bg-white/15 transition-all text-sm"
                    placeholder="Nama Lengkap"
                    required
                />
            </div>

            <div>
                <input
                    name="telp"
                    value={form.telp}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 outline-none text-white placeholder:text-white/40 focus:border-orange-400 focus:bg-white/15 transition-all text-sm"
                    placeholder="No. Telepon (08xx)"
                    required
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 py-4 font-bold text-white text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? "Mendaftarkan..." : "Create Account"}
            </button>
        </form>
    );
}