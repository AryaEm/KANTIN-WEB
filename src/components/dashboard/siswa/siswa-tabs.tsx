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
    label: 'Pesanan',
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