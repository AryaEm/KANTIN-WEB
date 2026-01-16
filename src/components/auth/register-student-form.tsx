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
        <form onSubmit={handleSubmit} className="space-y-3 Poppins">
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs text-white font-medium Poppins">Username</label>
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                        placeholder="Username"
                    />
                </div>

                <div>
                    <label className="text-xs text-white font-medium Poppins">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="mt-1 w-full rounded-lg bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                        placeholder="Password"
                    />
                </div>
            </div>

            <div>
                <label className="text-xs text-white font-medium Poppins">Nama Lengkap</label>
                <input
                    name="nama_siswa"
                    value={form.nama_siswa}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                    placeholder="Asepxx"
                />
            </div>

            <div>
                <label className="text-xs text-white font-medium Poppins">Telp</label>
                <input
                    name="telp"
                    value={form.telp}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg text-sx bg-input border border-white/15 px-4 py-2 outline-none text-white/80"
                    placeholder="08xx"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-lg bg-teal-500 py-2 font-medium text-black">
                {loading ? "Mendaftarkan..." : "Daftar sebagai Siswa"}
            </button>
        </form>
    );
}
