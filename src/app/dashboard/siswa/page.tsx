'use client';

import { useState } from 'react';

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

import { CartItem, Menu } from '@/app/types';

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
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (menu: Menu) => {
    setCart(prev => {
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


  const handleCheckout = async () => {
    if (cart.length === 0) return;

    const token = getCookie('token');
    if (!token) return;

    const payload = {
      items: cart.map(item => ({
        id_menu: item.id_menu,
        qty: item.qty,
      })),
    };

    try {
      const res = await post<OrderResponse>('/order', payload, token);

      if (!res.status) {
        console.error(res.message);
        return;
      }

      // ✅ sukses
      setCart([]);
      setActiveTab('pesanan');

      console.log('TRANSAKSI BERHASIL:', res.data);
    } catch (err) {
      console.error('CHECKOUT ERROR:', err);
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
            />
          )}

          {activeTab === 'pesanan' && <OrderView />}

          {activeTab === 'riwayat' && <HistoryView />}
        </div>
      </section>
    </>
  );
}
