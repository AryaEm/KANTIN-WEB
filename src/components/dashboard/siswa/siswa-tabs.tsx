'use client';

import { SiswaTab } from '@/app/dashboard/siswa/page';
import { Store, ShoppingCart, Clock, History } from 'lucide-react';

interface Props {
  activeTab: SiswaTab;
  onChange: (tab: SiswaTab) => void;
}

const tabs: {
  label: string;
  value: SiswaTab;
  icon: React.ElementType;
}[] = [
  {
    label: 'Stan',
    value: 'stan',
    icon: Store,
  },
  {
    label: 'Keranjang',
    value: 'keranjang',
    icon: ShoppingCart,
  },
  {
    label: 'pesanan',
    value: 'pesanan',
    icon: Clock,
  },

  {
    label: 'Riwayat',
    value: 'riwayat',
    icon: History,
  },
];

export default function SiswaTabs({ activeTab, onChange }: Props) {
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
