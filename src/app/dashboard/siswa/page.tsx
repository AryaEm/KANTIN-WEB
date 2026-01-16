'use client';

import { useState } from 'react';

import SiswaHeader from '@/components/dashboard/siswa/siswa-header';
import SiswaTabs from '@/components/dashboard/siswa/siswa-tabs';

import StanView from '@/components/dashboard/siswa/stan-view';
import HistoryView from '@/components/dashboard/siswa/history-view';
import CartView from '@/components/dashboard/siswa/cart-view'
import OrderView from '@/components/dashboard/siswa/order-view';
import { StudentNavbar } from '@/components/dashboard/siswa/siswa-navbar';

import { CartItem, Menu } from '@/app/types';

export type SiswaTab =
  | 'stan'
  | 'keranjang'
  | 'pesanan'
  | 'riwayat'

export default function SiswaDashboardPage() {
  const [activeTab, setActiveTab] = useState<SiswaTab>('stan');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (menu: Menu) => {
    setCart(prev => {
      const exist = prev.find(i => i.id === menu.id);

      const finalPrice = menu.discount
        ? menu.price - (menu.price * menu.discount) / 100
        : menu.price;

      if (exist) {
        return prev.map(i =>
          i.id === menu.id ? { ...i, qty: i.qty + 1 } : i
        );
      }

      return [
        ...prev,
        {
          id: menu.id,
          name: menu.name,
          price: finalPrice,
          originalPrice: menu.discount ? menu.price : undefined,
          qty: 1,
        },
      ];
    });
  };

  return (
    <>
      <StudentNavbar />
      <section className="pb-8 pt-24 px-40 bg-primary min-h-dvh">
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
            <CartView cart={cart} setCart={setCart} />
          )}

          {activeTab === 'pesanan' && <OrderView />}

          {activeTab === 'riwayat' && <HistoryView />}
        </div>
      </section>
    </>

  );
}
