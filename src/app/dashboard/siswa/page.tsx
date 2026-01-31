'use client';

import { useState, useEffect } from 'react';

import SiswaHeader from '@/components/dashboard/siswa/siswa-header';
import SiswaTabs from '@/components/dashboard/siswa/siswa-tabs';
import { getCookie } from '@/lib/client-cookie';
import axios from 'axios';
import { post } from '@/lib/api-bridge';
import StanView from '@/components/dashboard/siswa/stan-view';
import HistoryView from '@/components/dashboard/siswa/history-view';
import CartView from '@/components/dashboard/siswa/cart-view';
import OrderView from '@/components/dashboard/siswa/order-view';
import { StudentNavbar } from '@/components/dashboard/siswa/siswa-navbar';
import { toast } from 'react-toastify';
import CustomToast from '@/components/ui/CustomToast';
import Cookies from "js-cookie";
import { CartItem, Menu } from '@/app/types';
import { loadCart, saveCart, clearCart } from "@/lib/cart-cookie";

export type SiswaTab =
  | 'stan'
  | 'keranjang'
  | 'pesanan'
  | 'riwayat';

type OrderResponse = {
  order_id: number;
};

export default function SiswaDashboardPage() {
  const [activeTab, setActiveTab] = useState<SiswaTab>('stan');
  const [cart, setCart] = useState<CartItem[]>(() => loadCart());
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const addToCart = (menu: Menu) => {
    setCart(prev => {

      if (prev.length > 0 && prev[0].stan_id !== menu.id_stan) {
        toast(
          <CustomToast
            type="warning"
            message="Satu transaksi hanya boleh dari satu stan"
          />,
          {
            containerId: "toastOrder",
            icon: false,
          }
        );
        return prev;
      }

      const exist = prev.find(i => i.id_menu === menu.id);

      const diskon = menu.discount ?? 0;
      const hargaSetelahDiskon =
        diskon > 0
          ? menu.price - (menu.price * diskon) / 100
          : menu.price;

      if (exist) {
        return prev.map(i =>
          i.id_menu === menu.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [
        ...prev,
        {
          id_menu: menu.id,
          stan_id: menu.id_stan,
          nama_menu: menu.name,
          foto: menu.image ?? null,
          harga_asli: menu.price,
          harga_setelah_diskon: hargaSetelahDiskon,
          diskon_persen: diskon,
          qty: 1,
        },
      ];
    });
  };

  useEffect(() => {
    saveCart(cart);
  }, [cart]);



  const handleCheckout = async () => {
    if (cart.length === 0 || isCheckingOut) return;

    const token = getCookie('token');
    if (!token) return;

    setIsCheckingOut(true);

    const payload = {
      items: cart.map(item => ({
        id_menu: item.id_menu,
        qty: item.qty,
      })),
    };

    try {
      const res = await post<OrderResponse>('/order', payload, token);

      if (!res.status) {
        toast(
          <CustomToast
            type="warning"
            message={res.message ?? "Terjadi kesalahan"}
          />,
          {
            containerId: "toastOrder",
            className: "bg-yellow-400 rounded-xl shadow-lg",
            icon: false,
          }
        );
        return;
      }

      setCart([]);
      clearCart();
      setActiveTab('pesanan');

      toast(
        <CustomToast type="success" message="Transaksi berhasil" />,
        {
          containerId: "toastOrder",
          className: "p-0 bg-transparent shadow-none",
          icon: false,
          autoClose: 1500,
        }
      );
    } catch (err: unknown) {
      let message = "Terjadi kesalahan server";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message ?? err.message;
      }

      toast(
        <CustomToast type="error" message={message} />,
        {
          containerId: "toastOrder",
          className:
            "bg-red-400 border border-white/10 rounded-xl shadow-xl",
          icon: false,
        }
      );
    } finally {
      setIsCheckingOut(false);
    }
  };


  return (
    <>
      <StudentNavbar />

      <section className="pb-8 pt-24 lg:px-40 px-4 bg-primary min-h-dvh overflow-hidden">
        <SiswaHeader />

        <SiswaTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-8">
          {activeTab === 'stan' && (
            <StanView addToCart={addToCart} />
          )}

          {activeTab === 'keranjang' && (
            <CartView
              cart={cart}
              setCart={setCart}
              onCheckout={handleCheckout}
              loading={isCheckingOut}
            />
          )}

          {activeTab === 'pesanan' && <OrderView />}

          {activeTab === 'riwayat' && <HistoryView />}
        </div>
      </section>
    </>
  );
}
