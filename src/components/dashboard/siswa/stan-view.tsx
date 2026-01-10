'use client'

import { useState } from 'react'
import { stans } from '@/data/stan'
import StanCard from '@/components/dashboard/siswa/stan-card'
import StanHeader from '@/components/dashboard/siswa/stan-header'
import MenuCard from '@/components/dashboard/siswa/menu-card'
import { ChevronLeft } from 'lucide-react'
import { Stan } from '@/app/types'

export default function StanPage({
  addToCart,
}: {
  addToCart: (menu: any) => void;
}) {
  const [selectedStan, setSelectedStan] = useState<Stan | null>(null)

  return (
    <main className="text-white Poppins">
      {!selectedStan ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xl">
          {stans.map((stan) => (
            <StanCard
              key={stan.id}
              stan={stan}
              onClick={() => setSelectedStan(stan)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          <button
            onClick={() => setSelectedStan(null)}
            className="text-sm text-white/70 hover:text-white flex items-center transition-all"
          >
            <ChevronLeft className='mr-2' />Kembali ke Daftar Stan
          </button>

          <StanHeader
            name={selectedStan.name}
            owner={selectedStan.owner}
          />

          <h3 className="text-xl font-semibold">Menu Tersedia</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedStan.menus.map((menu) => (
              <MenuCard key={menu.id} menu={menu} onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  )
}
