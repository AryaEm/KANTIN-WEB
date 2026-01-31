'use client';

import { AdminTab } from '@/app/dashboard/admin/page';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, Tag, History, Users } from 'lucide-react';

interface Props {
  activeTab: AdminTab;
  onChange: (tab: AdminTab) => void;
}

const tabs: {
  label: string;
  value: AdminTab;
  icon: React.ElementType;
}[] = [
  {
    label: 'Summary',
    value: 'summary',
    icon: LayoutDashboard,
  },
  {
    label: 'Menu',
    value: 'menu',
    icon: UtensilsCrossed,
  },
  {
    label: 'Diskon',
    value: 'discount',
    icon: Tag,
  },
  {
    label: 'Pesanan',
    value: 'order',
    icon: ClipboardList,
  },
  {
    label: 'History',
    value: 'history',
    icon: History,
  },
  {
    label: 'Siswa',
    value: 'siswa',
    icon: Users,
  },
];

export default function AdminTabs({ activeTab, onChange }: Props) {
  return (
    <div className="flex gap-3 overflow-auto relative z-10 p-2">
      {tabs.map(tab => {
        const Icon = tab.icon;

        return (  
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-2 px-5 py-3 text-sm transition-all
              font-bold rounded-xl whitespace-nowrap border-2
              ${
                activeTab === tab.value
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-transparent scale-105'
                  : 'text-gray-600 bg-white border-gray-200 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-600'
              }`}
          >
            <Icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}