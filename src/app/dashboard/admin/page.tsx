'use client';

import { useState } from 'react';
// import dynamic from 'next/dynamic';

import AdminHeader from '@/components/dashboard/admin/admin-header';
import AdminTabs from '@/components/dashboard/admin/admin-tabs';

import SummaryView from '@/components/dashboard/admin/summary-view';
import OrderView from '@/components/dashboard/admin/order-view';
import MenuView from '@/components/dashboard/admin/menu-view';
import DiscountView from '@/components/dashboard/admin/discount-view';
import HistoryView from '@/components/dashboard/admin/history-view';
import { AdminNavbar } from '@/components/dashboard/admin/admin-navbar';

// const AdminHeader = dynamic(() => import("@/components/dashboard/admin/admin-header"), {
//   ssr: false,
// });

export type AdminTab =
  | 'summary'
  | 'order'
  | 'menu'
  | 'discount'
  | 'history';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('summary');

  return (
    <>
      <AdminNavbar />
      <section className="pb-8 pt-24 px-40 bg-primary min-h-dvh">
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
        </div>
      </section>
    </>

  );
}
