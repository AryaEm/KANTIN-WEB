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
  | 'order'
  | 'menu'
  | 'discount'
  | 'history'
  | 'pelanggan'

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('summary');

  return (
    <>
      <AdminNavbar />
      <section className="pb-8 pt-24 lg:px-40 px-4 bg-primary min-h-dvh overflow-hidden">
        <AdminHeader />

        <AdminTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="mt-8">
          {activeTab === 'summary' && <SummaryView />}
          {activeTab === 'order' && <OrderView />}
          {activeTab === 'menu' && <MenuView />}
          {activeTab === 'discount' && <DiscountView />}
          {activeTab === 'history' && <HistoryView />}
          {activeTab === 'pelanggan' && <SiswaListView />}
        </div>
      </section>
    </>

  );
}
