'use client';

import { AdminTab } from '@/app/dashboard/admin/page';
import { LayoutDashboard, ClipboardList, UtensilsCrossed, Tag, History } from 'lucide-react';

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
    label: 'Pesanan',
    value: 'order',
    icon: ClipboardList,
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
    label: 'History',
    value: 'history',
    icon: History,
  },
];

export default function AdminTabs({ activeTab, onChange }: Props) {
  return (
    <div className="flex gap-4">
      {tabs.map(tab => {
        const Icon = tab.icon;

        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`flex items-center gap-2 px-6 py-2 text-sm transition
              font-medium rounded-md
              ${
                activeTab === tab.value
                  ? 'bg-teal-500 text-black outline-none'
                  : 'text-slate-300 bg-slate-800/70 hover:bg-teal-500 border border-white/15 outline-none'
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
