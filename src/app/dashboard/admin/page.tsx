'use client';

import { useState } from 'react';

import AdminHeader from '@/components/dashboard/admin/admin-header';
import AdminTabs from '@/components/dashboard/admin/admin-tabs';

import SummaryView from '@/components/dashboard/admin/summary-view';
import SiswaListView from '@/components/dashboard/admin/siswa-list-view';
import OrderView from '@/components/dashboard/admin/order-view';
import MenuView from '@/components/dashboard/admin/menu-view';
import DiscountView from '@/components/dashboard/admin/discount-view';
import HistoryView from '@/components/dashboard/admin/history-view';
import { AdminNavbar } from '@/components/dashboard/admin/admin-navbar';

export type AdminTab =
  | 'summary'
  | 'menu'
  | 'order'
  | 'discount'
  | 'history'
  | 'siswa'

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('summary');

  return (
    <>
      <AdminNavbar />
      <section className="pb-8 pt-24 lg:px-40 px-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-white min-h-screen relative overflow-hidden">
        <div className="absolute -top-20 -right-[2%] w-[400px] h-[400px] bg-yellow-300 dashboard-blob-1 opacity-10"></div>

        <AdminHeader />

        <AdminTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-8">
          {activeTab === 'summary' && <SummaryView />}
          {activeTab === 'menu' && <MenuView />}
          {activeTab === 'order' && <OrderView />}
          {activeTab === 'discount' && <DiscountView />}
          {activeTab === 'history' && <HistoryView />}
          {activeTab === 'siswa' && <SiswaListView />}
        </div>
      </section>
    </>
  );
}